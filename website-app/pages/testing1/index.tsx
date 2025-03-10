// pages/index.tsx
import { useEffect, useState } from 'react';

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);
  const [connectionStatus, setConnectionStatus] = useState<'connecting' | 'connected' | 'disconnected'>('disconnected');
  const [backendUrl, setBackendUrl] = useState<string>('');

  useEffect(() => {
    // Get the backend URL from environment variable
    const envBackendUrl = process.env.NEXT_PUBLIC_BACKEND_URL || 'http://localhost:3000';
    setBackendUrl(envBackendUrl);
    
    // For debugging - log the URL we're trying to connect to
    console.log(`Backend URL from env: ${envBackendUrl}`);
    
    // Try connecting to the SSE endpoint
    try {
      setConnectionStatus('connecting');
      
      // First, try the /api/sse/events endpoint (from your backend)
      const sseUrl = `${envBackendUrl}/api/sse/events`;
      console.log(`Connecting to SSE endpoint: ${sseUrl}`);
      
      const eventSource = new EventSource(sseUrl, { withCredentials: false });
      
      // Log when connection opens
      eventSource.onopen = () => {
        console.log('SSE connection opened');
        setConnectionStatus('connected');
        setMessages(prev => [...prev, `Connected to ${sseUrl}`]);
      };
      
      // Handle generic messages
      eventSource.onmessage = (event) => {
        console.log('Raw SSE message:', event.data);
        try {
          const data = JSON.parse(event.data);
          setMessages(prev => [...prev, `Message: ${JSON.stringify(data)}`]);
        } catch {
          // Removed the unused parameter completely
          setMessages(prev => [...prev, `Raw message: ${event.data}`]);
        }
      };
      
      // Handle errors
      eventSource.onerror = (error) => {
        console.error('SSE connection error:', error);
        setConnectionStatus('disconnected');
        setMessages(prev => [...prev, `Connection error. Reconnecting...`]);
        
        // Try to reconnect after a delay
        setTimeout(() => {
          eventSource.close();
          // We'll let the useEffect run again to reconnect
        }, 5000);
      };
      
      // Cleanup on unmount
      return () => {
        console.log('Closing SSE connection');
        eventSource.close();
        setConnectionStatus('disconnected');
      };
    } catch (error) {
      console.error('Error setting up SSE:', error);
      setConnectionStatus('disconnected');
      setMessages(prev => [...prev, `Setup error: ${error instanceof Error ? error.message : String(error)}`]);
    }
  }, []);

  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Server-Sent Events (SSE) Demo</h1>
      
      <div className="mb-4">
        <span className="font-semibold mr-2">Status:</span>
        <span className={`px-2 py-1 rounded text-white ${
          connectionStatus === 'connected' ? 'bg-green-500' : 
          connectionStatus === 'connecting' ? 'bg-yellow-500' : 'bg-red-500'
        }`}>
          {connectionStatus}
        </span>
      </div>
      
      <div className="mb-4">
        <span className="font-semibold mr-2">Backend URL:</span>
        <span>{backendUrl}</span>
      </div>
      
      <div className="border rounded-md p-4 bg-gray-50 dark:bg-gray-900 h-80 overflow-y-auto">
        {messages.length === 0 ? (
          <p className="text-gray-500">Waiting for messages...</p>
        ) : (
          <ul className="space-y-2">
            {messages.map((msg, i) => (
              <li key={i} className="border-b pb-2">{msg}</li>
            ))}
          </ul>
        )}
      </div>
    </div>
  );
}


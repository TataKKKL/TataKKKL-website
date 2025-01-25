// pages/index.tsx
import { useEffect, useState } from 'react';

interface SSEMessage {
  message: string;
  timestamp: string;
}

export default function Home() {
  const [messages, setMessages] = useState<string[]>([]);

  useEffect(() => {
    // Create a new EventSource pointing to our SSE endpoint
    const eventSource = new EventSource('/api/sse');

    // "connected" event (sent once when connection opens)
    const handleConnected = (event: MessageEvent) => {
      console.log('SSE connection established:', event.data);
      setMessages((prev) => [...prev, `Connected: ${event.data}`]);
    };

    // "ping" event (sent every 5 seconds)
    const handlePing = (event: MessageEvent) => {
      const newData = JSON.parse(event.data) as SSEMessage;
      console.log('Received SSE ping:', newData);
      setMessages((prev) => [
        ...prev,
        `Ping: ${newData.message} at ${newData.timestamp}`,
      ]);
    };

    // Add event listeners
    eventSource.addEventListener('connected', handleConnected);
    eventSource.addEventListener('ping', handlePing);

    // Cleanup on unmount
    return () => {
      eventSource.removeEventListener('connected', handleConnected);
      eventSource.removeEventListener('ping', handlePing);
      eventSource.close();
    };
  }, []);

  return (
    <div style={{ padding: '20px' }}>
      <h1>Server-Sent Events (SSE) Demo (TypeScript)</h1>
      <ul>
        {messages.map((msg, i) => (
          <li key={i}>{msg}</li>
        ))}
      </ul>
    </div>
  );
}


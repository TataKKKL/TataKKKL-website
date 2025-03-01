import { Router } from 'express';
import { Server as HttpServer } from 'http';
import { WebSocket, WebSocketServer } from 'ws';

const router = Router();

// Track active WebSocket connections
const clients = new Set<WebSocket>();

// Track the ping interval
let pingInterval: NodeJS.Timeout | null = null;

// Initialize WebSocket server
export function initWebSocket(server: HttpServer) {
  const wss = new WebSocketServer({ server });

  wss.on('connection', (ws: WebSocket) => {
    // Add client to active connections
    clients.add(ws);
    console.log('WebSocket client connected - total clients:', clients.size);
    
    // Send initial connection message
    ws.send(JSON.stringify({ 
      type: 'connection', 
      message: 'Connected to WebSocket server' 
    }));
    
    // Start the ping interval if needed
    startPingInterval();

    // Handle incoming messages from clients
    ws.on('message', (message: string) => {
      try {
        const data = JSON.parse(message.toString());
        console.log('Received message:', data);
        
        // You can handle specific message types here
        // For example, echo back the message
        ws.send(JSON.stringify({ 
          type: 'echo', 
          message: data,
          timestamp: new Date().toISOString()
        }));
      } catch (error) {
        console.error('Error parsing message:', error);
      }
    });

    // Handle connection closing
    ws.on('close', () => {
      clients.delete(ws);
      console.log('WebSocket client disconnected - remaining clients:', clients.size);
      
      // Stop the ping interval if no clients are connected
      stopPingInterval();
    });

    // Handle errors
    ws.on('error', (error) => {
      console.error('WebSocket error:', error);
      clients.delete(ws);
    });
  });

  return wss;
}

// Start the ping interval if it's not already running
function startPingInterval() {
  if (pingInterval === null && clients.size > 0) {
    console.log('Starting ping interval - clients connected:', clients.size);
    pingInterval = setInterval(() => {
      sendToAll({ 
        type: 'ping', 
        message: 'Server heartbeat', 
        timestamp: new Date().toISOString() 
      });
    }, 1000);
  }
}

// Stop the ping interval if no clients are connected
function stopPingInterval() {
  if (pingInterval !== null && clients.size === 0) {
    console.log('Stopping ping interval - no clients connected');
    clearInterval(pingInterval);
    pingInterval = null;
  }
}

// Helper function to send message to all connected clients
export const sendToAll = (data: any) => {
  const message = JSON.stringify(data);
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      client.send(message);
    }
  });
};

// This endpoint can be used to check WebSocket status
router.get('/status', (req, res) => {
  res.json({
    active: clients.size,
    status: 'running'
  });
});

export default router;
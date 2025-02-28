import { Router, Request, Response } from 'express';

const router = Router();

// Store active SSE connections
const clients = new Set<Response>();

// Track the ping interval
let pingInterval: NodeJS.Timeout | null = null;

// Start the ping interval if it's not already running
function startPingInterval() {
  if (pingInterval === null && clients.size > 0) {
    console.log('Starting ping interval - clients connected:', clients.size);
    pingInterval = setInterval(() => {
      sendEventToAll({ 
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

router.get('/events', (req: Request, res: Response) => {
  // Set headers for SSE
  res.writeHead(200, {
    'Content-Type': 'text/event-stream',
    'Connection': 'keep-alive',
    'Cache-Control': 'no-cache'
  });

  // Send initial connection established message
  res.write(`data: ${JSON.stringify({ type: 'connection', message: 'Connected to SSE' })}\n\n`);

  // Add client to active connections
  clients.add(res);
  console.log('Client connected - total clients:', clients.size);
  
  // Start the ping interval if needed
  startPingInterval();

  // Remove client when connection closes
  req.on('close', () => {
    clients.delete(res);
    console.log('Client disconnected - remaining clients:', clients.size);
    
    // Stop the ping interval if no clients are connected
    stopPingInterval();
  });
});

// Helper function to send events to all connected clients
export const sendEventToAll = (eventData: any) => {
  clients.forEach(client => {
    client.write(`data: ${JSON.stringify(eventData)}\n\n`);
  });
};

export default router; 
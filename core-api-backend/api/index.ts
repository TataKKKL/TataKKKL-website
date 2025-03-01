import express from 'express';
import cors from 'cors';
import { createServer } from 'http';
import routes from './routes';
import { initWebSocket } from './routes/websocket';

const app = express();
const server = createServer(app);

app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  credentials: true
}));

// Disable response buffering
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('X-Accel-Buffering', 'no');
  next();
});

app.use('/api', routes);

// Initialize WebSocket server
initWebSocket(server);

// Start the server
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  server.listen(PORT, () => {
    console.log(`HTTP Server running on port ${PORT}`);
    console.log(`WebSocket Server running on ws://localhost:${PORT}`);
  });
}

export default server; // Export the HTTP server instead of the Express app
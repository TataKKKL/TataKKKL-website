import type { NextApiRequest, NextApiResponse } from 'next';

export default function handler(req: NextApiRequest, res: NextApiResponse) {
  // Set SSE headers
  res.setHeader('Content-Type', 'text/event-stream');
  res.setHeader('Cache-Control', 'no-cache, no-transform');
  res.setHeader('Connection', 'keep-alive');

  // Send an initial event
  res.write('event: connected\n');
  res.write('data: Hello from SSE!\n\n');

  // Send a "ping" event every 5 seconds
  const intervalId = setInterval(() => {
    const data = {
      message: 'Hello from server',
      timestamp: new Date().toISOString(),
    };
    res.write('event: ping\n');
    res.write(`data: ${JSON.stringify(data)}\n\n`);
  }, 5000);

  // Cleanup when the client disconnects
  req.on('close', () => {
    clearInterval(intervalId);
    res.end();
  });
}

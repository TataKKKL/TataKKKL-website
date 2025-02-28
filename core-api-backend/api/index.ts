import express from 'express';
import cors from 'cors';
import routes from './routes';

const app = express();
app.use(cors({
  origin: process.env.CORS_ORIGIN || '*',
  // Important for SSE
  credentials: true
}));

// Disable response buffering for SSE
app.use((req, res, next) => {
  res.setHeader('Cache-Control', 'no-cache');
  res.setHeader('X-Accel-Buffering', 'no');
  next();
});

app.use('/api', routes);

// Add this section to make the app listen on a port when run directly
if (process.env.NODE_ENV !== 'test') {
  const PORT = process.env.PORT || 3000;
  app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
  });
}

export default app;
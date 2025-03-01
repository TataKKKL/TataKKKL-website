import { Router } from 'express';
import helloRoutes from './hello.routes';
import sseRouter from './sse';
import websocketRouter from './websocket';

const router = Router();
router.use('/hello', helloRoutes);
router.use('/sse', sseRouter);
router.use('/ws', websocketRouter); // Add WebSocket routes

export default router;
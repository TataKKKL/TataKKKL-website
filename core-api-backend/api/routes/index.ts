import { Router } from 'express';
import helloRoutes from './hello.routes';
import sseRouter from './sse';

const router = Router();
router.use('/hello', helloRoutes);
router.use('/sse', sseRouter);
export default router;
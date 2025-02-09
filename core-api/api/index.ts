// api/index.ts
import express, { Request, Response } from 'express';
import cors from 'cors';

interface Data {
  name: string;
}

const app = express();
app.use(cors());

app.get('/api/hello', (req: Request, res: Response<Data>) => {
  res.status(200).json({ name: 'John Doe' });
});


export default app;
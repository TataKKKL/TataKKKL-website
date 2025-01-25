// pages/api/webhook/route.tsx
import { NextApiRequest, NextApiResponse } from 'next';

export default async function handler(
 req: NextApiRequest,
 res: NextApiResponse
) {
 if (req.method !== 'POST') {
   return res.status(405).json({ message: 'Method not allowed' });
 }

 try {
   console.log('GitHub Event:', req.headers['x-github-event']);
   console.log('Payload:', req.body);

   return res.status(200).json({ success: true });
 } catch (error) {
   console.error('Webhook error:', error);
   return res.status(400).json({ error: 'Invalid request' });
 }
}
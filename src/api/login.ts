import type { VercelRequest, VercelResponse } from '@vercel/node';

const DEMO_EMAIL = 'test@demo.com';
const DEMO_PASSWORD = '123456';

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    res.status(405).json({ error: 'Method Not Allowed' });
    return;
  }

  const { email, password } = req.body || {};

  if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
    res.status(200).json({
      user: { email },
      token: 'demo-token',
    });
  } else {
    res.status(401).json({ error: 'Credenciales inválidas' });
  }
} 
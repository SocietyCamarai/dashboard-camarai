import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';

const DEMO_EMAIL = 'test@demo.com';
const DEMO_PASSWORD = '123456';

const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access-secret-demo';
const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh-secret-demo';
const ACCESS_TOKEN_EXPIRES_IN = '15m';
const REFRESH_TOKEN_EXPIRES_IN = '7d';

// Almacenamiento en memoria de refresh tokens válidos por usuario (id)
declare global {
  // eslint-disable-next-line no-var
  var validRefreshTokens: Record<number, Set<string>> | undefined;
}
const validRefreshTokens: Record<number, Set<string>> = global.validRefreshTokens || (global.validRefreshTokens = {});
// // Ejemplo con base de datos:
// // await db.refreshTokens.insert({ userId, token });
// // await db.refreshTokens.delete({ userId, token });
// // await db.refreshTokens.find({ userId });

// Rate limiting simple en memoria por IP
const loginAttempts: Record<string, { count: number; lastAttempt: number }> = {};
const MAX_ATTEMPTS = 5;
const WINDOW_MS = 15 * 60 * 1000; // 15 minutos
// // Ejemplo con Redis/base de datos:
// // await redis.incr(ip), await redis.expire(ip, WINDOW_MS/1000)

const allowedOrigins = [
  process.env.DASHBOARD_ORIGIN || '',
  'http://localhost:3000'
];

export default function handler(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin;
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
    res.setHeader('Vary', 'Origin');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
  }
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    res.setHeader('Access-Control-Allow-Credentials', 'true');
    return res.status(200).end();
  }
  if (!origin || !allowedOrigins.includes(origin)) {
    return res.status(403).json({ error: 'Forbidden' });
  }
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  // Rate limiting por IP
  const ip = req.headers['x-forwarded-for']?.toString().split(',')[0] || req.socket?.remoteAddress || 'unknown';
  const now = Date.now();
  if (!loginAttempts[ip] || now - loginAttempts[ip].lastAttempt > WINDOW_MS) {
    loginAttempts[ip] = { count: 1, lastAttempt: now };
  } else {
    loginAttempts[ip].count++;
    loginAttempts[ip].lastAttempt = now;
  }
  if (loginAttempts[ip].count > MAX_ATTEMPTS) {
    return res.status(429).json({ error: 'Too many login attempts. Try again later.' });
  }
  const { email, password } = req.body || {};
  if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
    const user = {
      id: 1,
      email: DEMO_EMAIL,
      nombre: 'Demo',
      apellidos: 'User',
      telefono: '600123456',
      foto: null,
      empresa_id: 101,
      establecimiento_id: 201,
      ultimo_login: new Date().toISOString(),
      estado: 'activo',
      created_at: new Date('2023-01-01T10:00:00Z').toISOString(),
      updated_at: new Date().toISOString(),
    };
    const accessToken = jwt.sign(
      { user },
      ACCESS_TOKEN_SECRET,
      { expiresIn: ACCESS_TOKEN_EXPIRES_IN }
    );
    // Generar refresh token único
    const refreshToken = jwt.sign(
      { userId: user.id, rand: Math.random().toString(36).slice(2) },
      REFRESH_TOKEN_SECRET,
      { expiresIn: REFRESH_TOKEN_EXPIRES_IN }
    );
    // Guardar refresh token en memoria
    if (!validRefreshTokens[user.id]) validRefreshTokens[user.id] = new Set();
    validRefreshTokens[user.id].add(refreshToken);
    // // Ejemplo con base de datos:
    // // await db.refreshTokens.insert({ userId: user.id, token: refreshToken });
    const isLocalhost = origin?.includes('localhost');
    const secureFlag = isLocalhost ? '' : ' Secure;';
    res.setHeader(
      'Set-Cookie',
      `refreshToken=${refreshToken}; HttpOnly; Path=/; SameSite=Strict;${secureFlag} Max-Age=604800`
    );
    res.status(200).json({
      accessToken,
    });
  } else {
    res.status(401).json({ error: 'Credenciales inválidas' });
  }
}
import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh-secret-demo';
const ACCESS_TOKEN_SECRET = process.env.ACCESS_TOKEN_SECRET || 'access-secret-demo';
const ACCESS_TOKEN_EXPIRES_IN = '15m';

// Compartido con login.ts (en producción, extraer a módulo común)
declare global {
  // eslint-disable-next-line no-var
  var validRefreshTokens: Record<number, Set<string>> | undefined;
}
const validRefreshTokens: Record<number, Set<string>> = global.validRefreshTokens || (global.validRefreshTokens = {});
// // Ejemplo con base de datos:
// // await db.refreshTokens.find({ userId });
// // await db.refreshTokens.delete({ userId, token });
// // await db.refreshTokens.insert({ userId, token });

function parseCookies(cookieHeader?: string): Record<string, string> {
  if (!cookieHeader) return {};
  return Object.fromEntries(
    cookieHeader.split(';').map(cookie => {
      const [key, ...v] = cookie.trim().split('=');
      return [key, decodeURIComponent(v.join('='))];
    })
  );
}

export default function handler(req: VercelRequest, res: VercelResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }
  const cookies = parseCookies(req.headers.cookie);
  const refreshToken = cookies.refreshToken;
  if (!refreshToken) {
    return res.status(401).json({ error: 'No refresh token' });
  }
  try {
    const { userId } = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as { userId: number };
    // Validar refresh token en memoria
    if (!validRefreshTokens[userId] || !validRefreshTokens[userId].has(refreshToken)) {
      return res.status(401).json({ error: 'Invalid refresh token' });
    }
    // Rotar: eliminar el usado
    validRefreshTokens[userId].delete(refreshToken);
    // // Ejemplo con base de datos:
    // // await db.refreshTokens.delete({ userId, token: refreshToken });
    // Generar y guardar nuevo refresh token
    const newRefreshToken = jwt.sign(
      { userId, rand: Math.random().toString(36).slice(2) },
      REFRESH_TOKEN_SECRET,
      { expiresIn: '7d' }
    );
    validRefreshTokens[userId].add(newRefreshToken);
    // // Ejemplo con base de datos:
    // // await db.refreshTokens.insert({ userId, token: newRefreshToken });
    // Usuario hardcodeado demo
    const user = {
      id: userId,
      email: 'test@demo.com',
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
    const accessToken = jwt.sign({ user }, ACCESS_TOKEN_SECRET, { expiresIn: ACCESS_TOKEN_EXPIRES_IN });
    // Set cookie con Secure solo si no es localhost
    const origin = req.headers.origin;
    const isLocalhost = origin?.includes('localhost');
    const secureFlag = isLocalhost ? '' : ' Secure;';
    res.setHeader(
      'Set-Cookie',
      `refreshToken=${newRefreshToken}; HttpOnly; Path=/; SameSite=Strict;${secureFlag} Max-Age=604800`
    );
    return res.status(200).json({ accessToken });
  } catch {
    return res.status(401).json({ error: 'Invalid refresh token' });
  }
} 
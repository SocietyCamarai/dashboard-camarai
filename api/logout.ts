import type { VercelRequest, VercelResponse } from '@vercel/node';
import jwt from 'jsonwebtoken';

const REFRESH_TOKEN_SECRET = process.env.REFRESH_TOKEN_SECRET || 'refresh-secret-demo';

declare global {
  // eslint-disable-next-line no-var
  var validRefreshTokens: Record<number, Set<string>> | undefined;
}
const validRefreshTokens: Record<number, Set<string>> = global.validRefreshTokens || (global.validRefreshTokens = {});

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
    res.setHeader('Set-Cookie', 'refreshToken=; HttpOnly; Path=/; SameSite=Strict; Secure; Max-Age=0');
    return res.status(200).json({ message: 'Logged out' });
  }
  try {
    const { userId } = jwt.verify(refreshToken, REFRESH_TOKEN_SECRET) as { userId: number };

    // ===> [AQUÍ] ELIMINAR TODOS LOS REFRESHTOKENS DEL USUARIO EN TU SERVICIO EXTERNO
    // Ejemplo:
    // await fetch('https://tu-api.com/refreshTokens/deleteAll', {
    //   method: 'POST',
    //   headers: { 'Content-Type': 'application/json' },
    //   body: JSON.stringify({ userId }),
    // });

    // Eliminar todos los refresh tokens del usuario
    delete validRefreshTokens[userId];
    // // Ejemplo con base de datos:
    // // await db.refreshTokens.deleteMany({ userId });
    res.setHeader('Set-Cookie', 'refreshToken=; HttpOnly; Path=/; SameSite=Strict; Secure; Max-Age=0');
    return res.status(200).json({ message: 'Logged out' });
  } catch {
    res.setHeader('Set-Cookie', 'refreshToken=; HttpOnly; Path=/; SameSite=Strict; Secure; Max-Age=0');
    return res.status(200).json({ message: 'Logged out' });
  }
} 
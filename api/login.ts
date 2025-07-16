import type { VercelRequest, VercelResponse } from '@vercel/node';

const DEMO_EMAIL = 'test@demo.com';
const DEMO_PASSWORD = '123456';

// ✅ Lista de orígenes permitidos
// Usa una variable de entorno personalizada para producción
const allowedOrigins = [
  process.env.DASHBOARD_ORIGIN || '', // Debes definir DASHBOARD_ORIGIN en Vercel (por ejemplo: https://dashboard-camarai.vercel.app)
  'http://localhost:3000' // Tu entorno local con Vite (ajusta el puerto si es necesario)
];

export default function handler(req: VercelRequest, res: VercelResponse) {
  const origin = req.headers.origin;

  // Si el origen está en nuestra lista, lo añadimos a la cabecera
  if (origin && allowedOrigins.includes(origin)) {
    res.setHeader('Access-Control-Allow-Origin', origin);
  }

  // CORS preflight
  if (req.method === 'OPTIONS') {
    res.setHeader('Access-Control-Allow-Methods', 'POST, OPTIONS');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
    return res.status(200).end();
  }

  // Comprobación de origen para peticiones reales
  if (!origin || !allowedOrigins.includes(origin)) {
    return res.status(403).json({ error: 'Forbidden' });
  }

  // ... el resto de tu lógica de la API ...
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method Not Allowed' });
  }

  const { email, password } = req.body || {};

  if (email === DEMO_EMAIL && password === DEMO_PASSWORD) {
    res.status(200).json({
      user: {
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
      },
      token: 'demo-token',
    });
  } else {
    res.status(401).json({ error: 'Credenciales inválidas' });
  }
}
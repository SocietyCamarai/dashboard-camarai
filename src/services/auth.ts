export interface User {
  id: number;
  email: string;
  nombre: string;
  apellidos: string | null;
  telefono: string;
  foto: string | null;
  empresa_id: number | null;
  establecimiento_id: number | null;
  ultimo_login: string | null;
  estado: string;
  created_at: string;
  updated_at: string;
}

export interface LoginResponse {
  accessToken: string;
}

export async function loginRequest(email: string, password: string): Promise<LoginResponse> {
  const response = await fetch('/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
    credentials: 'include', // Para recibir la cookie httpOnly
  });
  if (!response.ok) throw new Error('Credenciales inválidas');
  return response.json();
} 
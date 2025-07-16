export interface LoginResponse {
  user: { email: string };
  token: string;
}

export async function loginRequest(email: string, password: string): Promise<LoginResponse> {
  const response = await fetch('http://localhost:3000/api/login', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  });
  if (!response.ok) throw new Error('Credenciales inválidas');
  return response.json();
} 
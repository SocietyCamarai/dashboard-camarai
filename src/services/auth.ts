import type { IUsuario } from '../types/database.types';

export interface User extends IUsuario {
    onboardingCompleto: boolean;
}

export interface LoginResponse {
    user: User;
    accessToken: string;
    refreshToken: string;
}

export interface RegisterRequest {
    email: string;
    password: string;
    nombre: string;
    apellido?: string;
    telefono?: string;
}

export interface RegisterResponse {
    message: string;
    user?: User;
}

export interface RefreshTokenResponse {
    accessToken: string;
}

export interface LogoutResponse {
    message: string;
}

export interface OnboardingResponse {
    message: string;
    user: User;
    accessToken: string;
    refreshToken: string;
}

// Función para obtener el access token del localStorage
const getStoredToken = (): string | null => {
    return localStorage.getItem('accessToken');
};

// Función para guardar solo el access token en localStorage
const storeAccessToken = (accessToken: string): void => {
    localStorage.setItem('accessToken', accessToken);
};

// Función para limpiar solo el access token del localStorage
export const clearAccessToken = (): void => {
    localStorage.removeItem('accessToken');
};

export async function loginRequest(email: string, password: string): Promise<LoginResponse> {
    const response = await fetch('/api/login', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password })
    });

    const data = await response.json();
    if (!response.ok) {
        // Lanzar error con el mensaje real del backend y adjuntar status/data
        const error = new Error(data?.message || data?.error || 'Credenciales inválidas') as Error & { response?: { status: number; data: unknown } };
        error.response = { status: response.status, data };
        throw error;
    }

    // Guardar solo el access token en localStorage
    // El refresh token se maneja automáticamente en cookies httpOnly
    storeAccessToken(data.accessToken);

    return data;
}

export async function registerRequest(userData: RegisterRequest): Promise<RegisterResponse> {
    const response = await fetch('/api/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(userData)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.error || 'Error en el registro');
    }

    return response.json();
}

export async function refreshTokenRequest(): Promise<RefreshTokenResponse> {
    // El refresh token se envía automáticamente en cookies
    const response = await fetch('/api/refresh-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include' // Incluir cookies automáticamente
    });

    if (!response.ok) {
        const errorData = await response.json();
        const error = new Error(errorData.error || 'Error al refrescar token') as Error & { response?: { status: number; data: unknown } };
        error.response = { status: response.status, data: errorData };
        throw error;
    }

    const data = await response.json();

    // Actualizar el access token en localStorage
    storeAccessToken(data.accessToken);

    return data;
}

export async function logoutRequest(): Promise<LogoutResponse> {
    const accessToken = getStoredToken();

    if (!accessToken) {
        // Si no hay token, simplemente limpiar localStorage
        clearAccessToken();
        return { message: 'Logout exitoso' };
    }

    try {
        const response = await fetch('/api/logout', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ token: accessToken }),
            credentials: 'include' // Incluir cookies para eliminar refresh token
        });

        if (!response.ok) {
            const errorData = await response.json();
            throw new Error(errorData.error || 'Error en logout');
        }

        // Solo limpiar access token si la petición fue exitosa
        // El refresh token se elimina automáticamente en cookies
        clearAccessToken();

        return response.json();
    } catch (error) {
        // Si hay error de red, limpiar access token de todas formas
        clearAccessToken();
        throw error;
    }
}

export async function completeOnboardingRequest(formData: { [key: string]: unknown }): Promise<OnboardingResponse> {
    const token = getCurrentToken();
    if (!token) throw new Error('No hay token de acceso disponible');

    const response = await fetch('/api/onboarding', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
        },
        body: JSON.stringify(formData)
    });

    if (!response.ok) {
        const errorData = await response.json();
        throw new Error(errorData.message || 'Error al completar el onboarding');
    }

    const data: OnboardingResponse = await response.json();
    storeAccessToken(data.accessToken);
    return data;
}

// Función para obtener el token actual
export const getCurrentToken = (): string | null => {
    return getStoredToken();
};

// Función helper para detectar errores de token expirado
export const isTokenExpiredError = (error: unknown): boolean => {
    if (!(error instanceof Error)) return false;

    const errorMessage = error.message.toLowerCase();
    const isExpiredMessage = errorMessage.includes('token expirado') ||
        errorMessage.includes('token de acceso requerido') ||
        errorMessage.includes('token inválido');

    // También verificar el status code si está disponible
    const has401Status = (error as { response?: { status?: number } }).response?.status === 401;

    return isExpiredMessage || has401Status;
};

// Función simplificada para refresh automático
export const refreshAccessToken = async (): Promise<string> => {
    const response = await fetch('/api/refresh-token', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        credentials: 'include' // Importante: envía cookies automáticamente
    });

    if (!response.ok) {
        throw new Error('Error al refrescar token');
    }

    const data = await response.json();
    const newAccessToken = data.accessToken;

    // Actualizar el access token en localStorage
    storeAccessToken(newAccessToken);

    return newAccessToken;
};

// Función para validar token con el backend
export async function validateTokenRequest(): Promise<{ user: User }> {
    const accessToken = getStoredToken();

    if (!accessToken) {
        throw new Error('No hay token de acceso disponible');
    }

    // Decodificar el token para obtener el ID del usuario
    const tokenPayload = JSON.parse(atob(accessToken.split('.')[1]));
    const userId = tokenPayload.id;

    const response = await fetch('/api/validate-token', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ user_id: userId })
    });

    if (!response.ok) {
        const errorData = await response.json();
        const error = new Error(errorData.message || errorData.error || 'Error al validar token') as Error & { response?: { status: number; data: unknown } };
        error.response = { status: response.status, data: errorData };
        throw error;
    }

    return response.json();
}

// Función para limpiar las cookies de autenticación
export const clearCookies = (): void => {
    // Limpiar cookies relacionadas con la autenticación
    // Nota: Las cookies httpOnly solo pueden ser eliminadas por el servidor
    // Esta función limpia las cookies que pueden ser accedidas desde el cliente

    // Intentar eliminar cookies comunes de autenticación
    const cookiesToClear = [
        'refreshToken',
        'auth_token',
        'session',
        'token'
    ];

    cookiesToClear.forEach(cookieName => {
        // Eliminar cookie estableciendo fecha de expiración en el pasado
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;`;
        document.cookie = `${cookieName}=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/; domain=${window.location.hostname};`;
    });

    // También limpiar el access token del localStorage
    clearAccessToken();
}; 

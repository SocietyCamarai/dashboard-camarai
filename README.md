# CamarAI Dashboard

Un dashboard moderno construido con React, Vite y TypeScript, enfocado en autenticación segura, experiencia de usuario optimizada y mejores prácticas de seguridad.

---

## Tabla de Contenidos
- [Características](#características)
- [Guía Rápida de Inicio](#guía-rápida-de-inicio)
- [Sistema de Autenticación](#sistema-de-autenticación)
- [Seguridad y Mejoras](#seguridad-y-mejoras)
- [Endpoints Backend y API](#endpoints-backend-y-api)
- [Pruebas y Troubleshooting](#pruebas-y-troubleshooting)
- [Variables de Entorno y Configuración](#variables-de-entorno-y-configuración)
- [Notas Técnicas y Recomendaciones](#notas-técnicas-y-recomendaciones)

---

## Características
- **Interfaz de Autenticación Moderna**: Login/registro con opciones sociales (Google, Microsoft)
- **Persistencia de Sesión**: El usuario permanece logueado entre recargas
- **Refresh Automático de Tokens**: Mantiene la sesión activa de forma segura
- **Logout Seguro**: Limpieza completa de datos y tokens
- **Protección de Rutas**: Acceso restringido a rutas privadas
- **Responsive y Dark Mode**: Adaptado a todos los dispositivos y preferencias de tema
- **Animaciones y Estética**: Fondo animado y estilos modernos con Tailwind CSS
- **PWA Ready**: Manifest y favicons incluidos

---

## Guía Rápida de Inicio

1. Instala dependencias:
   ```bash
   npm install
   ```
2. Inicia el servidor de desarrollo:
   ```bash
   npx vercel dev
   ```
3. Abre tu navegador en la URL mostrada en la terminal.

Para producción:
```bash
npm run build
npx vercel --prod
```
Los archivos generados estarán en `dist/`.

---

## Sistema de Autenticación

### Flujo General
- **Login/Register** → Obtención de tokens y datos de usuario
- **Validación Inicial** → Se valida el token con el backend en cada carga
- **Refresh Automático** → Cada 14 minutos, el token se refresca automáticamente
- **Logout** → Limpieza de tokens y datos, cierre de sesión seguro
- **Redirección centralizada** → Todas las redirecciones tras login, logout y onboarding se gestionan desde un único hook (`useRedirect`), evitando duplicidad y facilitando el mantenimiento.
- **Getters locales** → El estado de autenticación y la necesidad de onboarding se determinan de forma local y segura en el contexto, sin depender de funciones externas.

### Estructura de Archivos Clave
- `api/login.ts`, `api/register.ts`, `api/refresh-token.ts`, `api/logout.ts`, `api/validate-token.ts` (API routes Vercel)
- `src/context/AuthContext.tsx`, `src/hooks/useAuth.ts`, `src/hooks/useTokenRefresh.ts`, `src/services/auth.ts` (lógica de autenticación)
- `src/components/ProtectedRoute.tsx`, `src/pages/Login.tsx` (UI y protección de rutas)

### Uso Básico
- Envuelve tu app con `<AuthProvider>`
- Usa el hook `useAuth` para acceder a usuario, login, logout, etc.
- Protege rutas con `<ProtectedRoute />`
- Usa `useTokenRefresh` en el layout principal para refresh automático

### Almacenamiento Seguro
- **Access Token**: Solo en localStorage (expira en 15 min)
- **Refresh Token**: En cookie HttpOnly, Secure, SameSite=Strict (expira en 7 días)
- **NO se almacenan datos del usuario** en localStorage

---

## Seguridad y Mejoras

### Implementaciones Clave
- **Cookies HttpOnly** para refresh tokens (inaccesibles desde JS)
- **Access tokens** solo para uso inmediato en localStorage
- **Validación automática** con backend en cada carga
- **Eliminación de datos del usuario** en localStorage (solo tokens)
- **Protección XSS y CSRF**: Cookies seguras y SameSite=Strict
- **Logout robusto**: Limpieza solo tras respuesta exitosa del backend
- **Optimización de peticiones**: Una sola validación al cargar, refresh cada 14 min
- **Centralización de redirecciones**: Toda la lógica de redirección tras login, logout y onboarding se gestiona desde el hook `useRedirect` para evitar duplicidad y facilitar el mantenimiento.
- **Getters locales robustos**: El estado de autenticación (`isAuthenticated`) y la necesidad de onboarding (`needsOnboarding`) se gestionan como getters locales en el contexto, eliminando dependencias externas y posibles inconsistencias.
- **Limpieza de código muerto y duplicado**: Se eliminaron funciones, imports y lógica duplicada o no utilizada en el contexto de autenticación, servicios y SidebarProvider, asegurando un código más limpio y mantenible.

### Beneficios
- Imposible manipular datos del usuario desde el frontend
- Datos siempre actualizados desde el backend
- Tokens gestionados y limpiados automáticamente
- Experiencia de usuario fluida y segura

---

## Endpoints Backend y API

### Endpoints Principales (Backend Docker)
- `POST /register` – Registro de usuario
- `POST /login` – Login de usuario
- `POST /refresh-token` – Refresh de access token
- `POST /logout` – Logout seguro
- `POST /validate-token` – Validación de token y obtención de datos actualizados

#### Ejemplo de Respuesta de Login
```json
{
  "message": "Login exitoso.",
  "accessToken": "jwt_token_here",
  "user": { "id": 1, "email": "usuario@ejemplo.com", ... }
}
```

#### Ejemplo de Respuesta de Validación
```json
{
  "user": { "id": 1, "email": "usuario@ejemplo.com", ... }
}
```

### Endpoint validate-token
- **Autenticación**: Bearer Token en header
- **Body**: `{ "user_id": 123 }` (opcional, debe coincidir con el token)
- **Respuestas**: 200 OK (usuario), 401/403/404/500 según error
- **Flujo**: Middleware valida token → verifica permisos → consulta n8n → retorna datos actualizados

#### Implementación n8n
```js
if (action === "get-user-by-id") {
  // Consulta la base de datos y retorna el usuario
}
```

---

## Pruebas y Troubleshooting

### Pruebas Recomendadas
- Token válido → retorna usuario
- Token expirado → error 401
- Token inválido → error 403
- user_id incorrecto → error 403
- Usuario inexistente → error 404

### Troubleshooting
- **"useAuth debe usarse dentro de AuthProvider"**: Verifica el wrapper
- **"Credenciales inválidas"**: Backend debe estar corriendo y endpoints funcionando
- **Tokens no se refrescan**: Usa `useTokenRefresh` en el layout
- **Usuario no persiste**: Verifica localStorage y consola
- **Doble petición de validación**: Usa la versión optimizada de `useTokenRefresh`

---

## Variables de Entorno y Configuración

### Frontend
- `BACKEND_URL` – URL del backend Docker

### Backend Docker
- `JWT_SECRET`, `JWT_REFRESH_SECRET` – Claves seguras para JWT
- `N8N_WEBHOOK_URL` – Webhook de n8n para consulta de usuario

### Producción
- `NODE_ENV=production` – Habilita Secure flag en cookies

---

## Notas Técnicas y Recomendaciones

- **No almacenes datos sensibles** en el frontend
- **Valida siempre los tokens** en el backend
- **Implementa rate limiting** en endpoints de autenticación
- **Audita y registra** cada validación para trazabilidad
- **Mantén actualizado el flujo de seguridad** según mejores prácticas

---

## Créditos y Licencia
Desarrollado por el equipo CamarAI. Basado en mejores prácticas de seguridad y experiencia de usuario.

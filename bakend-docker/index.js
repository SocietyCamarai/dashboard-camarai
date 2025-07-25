// if (process.env.NODE_ENV !== 'production') {
//   require('dotenv').config();
// }
const express = require('express');
const cors = require('cors');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const axios = require('axios');

const app = express();
app.use(cors());

// URL del Webhook de n8n
const N8N_WEBHOOK_URL = 'https://bot1.camarai.es/webhook/auth';

// 1. REGISTRO DE USUARIO
app.post('/register', express.json(), async (req, res) => {
    try {
        const { email, password, nombre, apellido, telefono } = req.body;
        if (!email || !password || !nombre) {
            return res.status(400).json({ message: 'Email, contraseña y nombre son requeridos.' });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const n8nPayload = {
            action: "register",
            data: {
                email,
                password: hashedPassword,
                nombre,
                apellido,
                telefono
            }
        };

        // Registrar usuario en n8n
        await axios.post(N8N_WEBHOOK_URL, n8nPayload);

        // Hacer login automático tras registro
        const n8nLoginPayload = {
            action: "login",
            data: {
                user: { email }
            }
        };
        const response = await axios.post(N8N_WEBHOOK_URL, n8nLoginPayload);
        const user = response.data;

        if (!user) {
            return res.status(401).json({ message: 'No se pudo obtener el usuario tras registro.' });
        }

        // Generar tokens
        const tokenPayload = {
            id: user.id,
            email: user.email,
            rol_id: user.rol_id,
            estado: user.estado,
            onboardingCompleto: !!user.empresa_id
        };
        const accessToken = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

        // Guardar el refresh token en n8n
        const n8nStoreTokenPayload = {
            action: "store-refresh-token",
            data: {
                user: {
                    user_id: user.id,
                    token: refreshToken
                }
            }
        };
        await axios.post(N8N_WEBHOOK_URL, n8nStoreTokenPayload);

        // Preparar el objeto de perfil para el frontend
        const userProfile = {
            id: user.id,
            email: user.email,
            nombre: user.nombre,
            apellidos: user.apellidos,
            telefono: user.telefono,
            foto: user.foto,
            empresa_id: user.empresa_id,
            establecimiento_id: user.establecimiento_id,
            rol_id: user.rol_id,
            estado: user.estado,
            onboardingCompleto: !!user.empresa_id
        };

        res.status(200).json({
            message: 'Registro exitoso',
            accessToken,
            refreshToken,
            user: userProfile
        });
    } catch (error) {
        // CORRECCIÓN: Manejo de errores estandarizado.
        if (error.response) {
            // Si n8n respondió con un error (ej. 409), lo reenviamos.
            console.error("Error /register:", error.response.data);
            return res.status(error.response.status).json(error.response.data);
        }
        // Si fue un error de red u otro, enviamos un 500 genérico.
        console.error("Error de red/servidor en /register:", error.message);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
});

// 2. LOGIN DE USUARIO (MODIFICADO PARA SOPORTAR ONBOARDING RESTRINGIDO)
app.post('/login', express.json(), async (req, res) => {
    try {
        const { email, password } = req.body;
        if (!email || !password) {
            return res.status(400).json({ message: 'Email y contraseña son requeridos.' });
        }

        const n8nLoginPayload = {
            action: "login",
            data: {
                user: { email }
            }
        };
        
        const response = await axios.post(N8N_WEBHOOK_URL, n8nLoginPayload);
        const user = response.data;

        if (!user) {
            return res.status(401).json({ message: 'Credenciales inválidas.' });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            return res.status(401).json({ message: 'Credenciales inválidas.' });
        }

        // Enriquecer el payload del token con estado y flag de onboarding
        const tokenPayload = {
            id: user.id,
            email: user.email,
            rol_id: user.rol_id,
            estado: user.estado,
            onboardingCompleto: !!user.empresa_id
        };
        const accessToken = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });

        // Guardar el refresh token en n8n
        const n8nStoreTokenPayload = {
            action: "store-refresh-token",
            data: {
                user: {
                    user_id: user.id,
                    token: refreshToken
                }
            }
        };
        await axios.post(N8N_WEBHOOK_URL, n8nStoreTokenPayload);

        // Preparar el objeto de perfil para el frontend
        const userProfile = {
            id: user.id,
            email: user.email,
            nombre: user.nombre,
            apellidos: user.apellidos,
            telefono: user.telefono,
            foto: user.foto,
            empresa_id: user.empresa_id,
            establecimiento_id: user.establecimiento_id,
            rol_id: user.rol_id,
            estado: user.estado,
            onboardingCompleto: !!user.empresa_id
        };

        res.json({
            message: 'Login exitoso.',
            accessToken,
            refreshToken,
            user: userProfile
        });
    } catch (error) {
        if (error.response) {
            console.error("Error desde n8n en /login:", error.response.data);
            return res.status(error.response.status).json(error.response.data);
        }
        console.error("Error de red/servidor en /login:", error.message);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
});

// 3. REFRESCAR TOKEN DE ACCESO
app.post('/refresh-token', express.json(), async (req, res) => {
    const { token } = req.body;
    if (!token) {
        return res.status(401).json({ message: "No se proveyó un token de refresco." });
    }

    try {
        const decodedUser = jwt.verify(token, process.env.JWT_REFRESH_SECRET);

        const n8nGetTokenPayload = {
            action: "get-refresh-token",
            data: {
                user_id: decodedUser.id
            }
        };
        
        const response = await axios.post(N8N_WEBHOOK_URL, n8nGetTokenPayload);
        const tokenFromDb = response.data;

        if (!tokenFromDb || tokenFromDb.refresh_token !== token) {
            return res.status(403).json({ message: "Refresh token no es válido o ha sido revocado." });
        }
        
        const newAccessToken = jwt.sign(
            { id: decodedUser.id, email: decodedUser.email },
            process.env.JWT_SECRET,
            { expiresIn: '15m' }
        );

        res.json({ accessToken: newAccessToken });

    } catch (err) {
        // Este catch maneja errores de JWT (expirado, inválido) y errores de Axios.
        if (err.response) {
            console.error("Error /refresh-token:", err.response.data);
            return res.status(err.response.status).json(err.response.data);
        }
        // Si el error es de JWT (ej. TokenExpiredError), no tendrá 'response'.
        console.error("Error de JWT o red en /refresh-token:", err.message);
        res.status(403).json({ message: "Refresh token inválido o expirado." });
    }
});

// 4. LOGOUT
app.post('/logout', express.json(), async (req, res) => {
    const { token } = req.body;

    try {
        const decoded = jwt.decode(token);
        if (!decoded || !decoded.id) {
            return res.status(200).json({ message: "Logout procesado." });
        }

        const n8nLogoutPayload = {
            action: "store-refresh-token",
            data: {
                user: {
                    user_id: decoded.id,
                    token: null
                }
            }
        };
        
        const response = await axios.post(N8N_WEBHOOK_URL, n8nLogoutPayload);
        res.status(response.status).json(response.data);

    } catch (error) {
        // CORRECCIÓN: Manejo de errores estandarizado.
        if (error.response) {
            console.error("Error /logout:", error.response.data);
            return res.status(error.response.status).json(error.response.data);
        }
        console.error("Error de red/servidor en /logout:", error.message);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
});

// --- MIDDLEWARE Y RUTAS PROTEGIDAS ---

const authenticateToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1]; // Bearer TOKEN

    if (token == null) {
        return res.status(401).json({ message: 'Token de acceso requerido' });
    }

    jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
        if (err) {
            if (err.name === 'TokenExpiredError') {
                return res.status(401).json({ message: 'Token expirado' });
            }
            return res.status(403).json({ message: 'Token inválido' });
        }
        req.user = user;
        next();
    });
};
// --- NUEVO MIDDLEWARE DE AUTORIZACIÓN ---
const checkAccess = (req, res, next) => {
    if (req.user.onboardingCompleto) {
        return next();
    }
    // Lista blanca de rutas permitidas durante el onboarding
    const allowedRoutes = ['/api/onboarding', '/api/logout', '/validate-token'];
    if (allowedRoutes.some(route => req.path.startsWith(route))) {
        return next();
    }
    return res.status(403).json({ message: 'Acceso denegado. Se requiere completar el onboarding.' });
};
// 5. VALIDAR TOKEN DE ACCESO
app.post('/validate-token', express.json(), authenticateToken, async (req, res) => {
    try {
        // El middleware authenticateToken ya verificó el token
        // Extraer el ID del usuario del token decodificado
        const userId = req.user.id;
        // console.log(userId)
        
        // Verificar que el ID del usuario en el token coincida con el del body (si se proporciona)
        const { user_id } = req.body || {};
        if (user_id && user_id !== userId) {
            return res.status(403).json({ message: "No tienes permisos para acceder a este usuario." });
        }
        
        const n8nGetUserPayload = {
            action: "get-user-by-id",
            data: {
                user_id: userId
            }
        };
        
        // Hacer la petición a n8n para obtener los datos actualizados del usuario
        const response = await axios.post(N8N_WEBHOOK_URL, n8nGetUserPayload);
        const user = response.data;
        // console.log(response)
        
        if (!user) {
            return res.status(404).json({ message: "Usuario no encontrado." });
        }
        
        // Preparar el objeto de perfil para el frontend
        const userProfile = {
            id: user.id,
            email: user.email,
            nombre: user.nombre,
            apellidos: user.apellidos,
            telefono: user.telefono,
            foto: user.foto,
            empresa_id: user.empresa_id,
            establecimiento_id: user.establecimiento_id,
            rol_id: user.rol_id,
            onboardingCompleto: !!user.empresa_id // <-- Añadido flag
        };
        
        res.json({ user: userProfile });
        
    } catch (error) {
        if (error.response) {
            console.error("Error /validate-token:", error.response.data);
            return res.status(error.response.status).json(error.response.data);
        }
        console.error("Error de red/servidor en /validate-token:", error.message);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
});


app.get('/profile', authenticateToken, (req, res) => {
    
    res.json({
        message: '¡Bienvenido a tu perfil! Esta es una ruta protegida.',
        user: req.user
    });
});

// --- NUEVA RUTA PARA COMPLETAR EL ONBOARDING ---
app.post('/api/onboarding', express.json(), authenticateToken, checkAccess, async (req, res) => {
    try {
        const userId = req.user.id;
        const onboardingData = req.body;
        // 1. Enviar datos a n8n para finalizar el onboarding
        const n8nFinishOnboardingPayload = {
            action: "finish-onboarding",
            data: {
                user_id: userId,
                ...onboardingData
            }
        };
        const onboardingResponse = await axios.post(N8N_WEBHOOK_URL, n8nFinishOnboardingPayload);
        if (onboardingResponse.status !== 200) {
            return res.status(onboardingResponse.status).json(onboardingResponse.data);
        }
        // 2. Obtener el usuario actualizado desde n8n
        const n8nLoginPayload = {
            action: "login",
            data: {
                user: { email: req.user.email }
            }
        };
        const userResponse = await axios.post(N8N_WEBHOOK_URL, n8nLoginPayload);
        const user = userResponse.data;
        if (!user) {
            return res.status(404).json({ message: 'Usuario no encontrado tras onboarding.' });
        }
        // 3. Generar nuevos tokens con el estado actualizado
        const tokenPayload = {
            id: user.id,
            email: user.email,
            rol_id: user.rol_id,
            estado: user.estado,
            onboardingCompleto: !!user.empresa_id
        };
        const accessToken = jwt.sign(tokenPayload, process.env.JWT_SECRET, { expiresIn: '15m' });
        const refreshToken = jwt.sign({ id: user.id, email: user.email }, process.env.JWT_REFRESH_SECRET, { expiresIn: '7d' });
        // 4. Guardar el nuevo refresh token en n8n
        const n8nStoreTokenPayload = {
            action: "store-refresh-token",
            data: {
                user: {
                    user_id: user.id,
                    token: refreshToken
                }
            }
        };
        await axios.post(N8N_WEBHOOK_URL, n8nStoreTokenPayload);
        // 5. Preparar el objeto de perfil actualizado
        const userProfile = {
            id: user.id,
            email: user.email,
            nombre: user.nombre,
            apellidos: user.apellidos,
            telefono: user.telefono,
            foto: user.foto,
            empresa_id: user.empresa_id,
            establecimiento_id: user.establecimiento_id,
            rol_id: user.rol_id,
            estado: user.estado,
            onboardingCompleto: !!user.empresa_id
        };
        res.status(200).json({
            message: 'Onboarding completado exitosamente.',
            accessToken,
            refreshToken,
            user: userProfile
        });
    } catch (error) {
        if (error.response) {
            console.error("Error en /api/onboarding:", error.response.data);
            return res.status(error.response.status).json(error.response.data);
        }
        console.error("Error de red/servidor en /api/onboarding:", error.message);
        res.status(500).json({ message: 'Error interno del servidor.' });
    }
});

// --- RUTA PROTEGIDA DE EJEMPLO (DASHBOARD) ---
app.get('/api/dashboard/data', authenticateToken, checkAccess, (req, res) => {
    res.json({ secretData: 'some important dashboard data' });
});


// --- INICIO DEL SERVIDOR ---
const PORT = process.env.PORT || 3001;
app.listen(PORT, () => {
    console.log(`Servidor de autenticación corriendo en el puerto ${PORT}`);
});
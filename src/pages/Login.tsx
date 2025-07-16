import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';
import { useTheme } from '../hooks/useTheme';
import '../assets/styles/login.css';

const logoGif = '/login/loading_v3.gif';
const googleIcon = 'https://cdn.iconscout.com/icon/free/png-256/free-google-icon-download-in-svg-png-gif-file-formats--logo-social-media-1507807.png';
const microsoftIcon = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png';

// Custom component to replace a-hole element
const AHole: React.FC<React.HTMLAttributes<HTMLElement>> = ({ children, ...props }) => {
  return React.createElement('a-hole', props, children);
};

const Login: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();
  const { currentTheme, isDarkTheme } = useTheme();
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerName, setRegisterName] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [registerError, setRegisterError] = useState('');

  const handleTab = (tabName: 'login' | 'register') => setTab(tabName);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(loginEmail, loginPassword);
      navigate('/dashboard/home');
    } catch {
      setError('Email o contraseña incorrectos');
    }
  };

  const handleRegister = (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError('Registro simulado (no implementado)');
  };

  // Determinar colores según el tema
  const textColor = currentTheme.colors.text;
  const cardBg = currentTheme.colors.sidebar;
  const borderColor = currentTheme.colors.primary;
  const inputBg = isDarkTheme(currentTheme) ? currentTheme.colors.background : '#fff';
  const inputText = currentTheme.colors.text;
  const inputBorder = currentTheme.colors.border;

  return (
    <div
      className="min-h-screen w-full flex items-center justify-center bg-black"
      style={{ color: textColor }}
    >
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <AHole className="absolute inset-0 w-full h-full">
          <canvas className="js-canvas"></canvas>
          <div className="aura"></div>
        </AHole>
      </div>
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full max-w-3xl">
        <div className="hidden md:flex items-center justify-center pr-8">
          <div className="rounded-3xl shadow-2xl bg-gray-900 w-[360px] h-[738px] flex items-center justify-center">
            <div className="w-full h-full rounded-2xl bg-cover bg-center" style={{ backgroundImage: "url('https://framerusercontent.com/images/77EciliJVU8turb59IhflF0Maug.png?scale-down-to=2048')" }}></div>
          </div>
        </div>
        <div
          className="w-full max-w-sm p-6 rounded-xl shadow-xl flex flex-col justify-center"
          style={{ background: cardBg, borderLeft: `5px solid ${borderColor}`, fontSize: '90%' }}
        >
          <div className="flex flex-col items-center mb-8">
            <img src={logoGif} alt="CamarAI Logo" className="h-32 w-auto mb-2" />
          </div>
          <div className="flex mb-8 border-b-2" style={{ borderColor: currentTheme.colors.textSecondary }}>
            <button
              className={`flex-1 text-lg font-semibold transition-all ${tab === 'login' ? 'border-b-2' : ''}`}
              style={{
                borderColor: tab === 'login' ? borderColor : 'transparent',
                color: tab === 'login' ? borderColor : currentTheme.colors.textSecondary,
                background: tab === 'login'
                  ? `linear-gradient(to right, ${currentTheme.colors.primary} 0%, #E879F9 50%, ${currentTheme.colors.primary} 100%)`
                  : 'none',
                WebkitBackgroundClip: tab === 'login' ? 'text' : undefined,
                WebkitTextFillColor: tab === 'login' ? 'transparent' : undefined,
              }}
              onClick={() => handleTab('login')}
            >
              Iniciar Sesión
            </button>
            <button
              className={`flex-1 py-3 text-lg font-semibold transition-all ${tab === 'register' ? 'border-b-2' : ''}`}
              style={{
                borderColor: tab === 'register' ? borderColor : 'transparent',
                color: tab === 'register' ? borderColor : currentTheme.colors.textSecondary,
                background: tab === 'register'
                  ? `linear-gradient(to right, ${currentTheme.colors.primary} 0%, #E879F9 50%, ${currentTheme.colors.primary} 100%)`
                  : 'none',
                WebkitBackgroundClip: tab === 'register' ? 'text' : undefined,
                WebkitTextFillColor: tab === 'register' ? 'transparent' : undefined,
              }}
              onClick={() => handleTab('register')}
            >
              Registrarse
            </button>
          </div>
          {/* Login Form */}
          {tab === 'login' && (
            <form className="space-y-5" id="login-form" onSubmit={handleLogin}>
              <div>
                <label htmlFor="login-email" className="block mb-2 font-medium" style={{ color: textColor }}>Correo electrónico</label>
                <input
                  type="email"
                  id="login-email"
                  className="w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2"
                  style={{ background: inputBg, color: inputText, borderColor: inputBorder }}
                  required
                  value={loginEmail}
                  onChange={e => setLoginEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="login-password" className="block mb-2 font-medium" style={{ color: textColor }}>Contraseña</label>
                <input
                  type="password"
                  id="login-password"
                  className="w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2"
                  style={{ background: inputBg, color: inputText, borderColor: inputBorder }}
                  required
                  value={loginPassword}
                  onChange={e => setLoginPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="w-full py-3 rounded-md font-semibold" style={{ background: borderColor, color: '#fff' }}>Iniciar Sesión</button>
              <div className="text-center mt-2">
                <a href="#" className="text-sm underline" style={{ color: borderColor }}>¿Olvidaste tu contraseña?</a>
              </div>
              <div className="mt-6">
                <button type="button" className="w-full flex items-center justify-center py-2 mb-2 border rounded-md" style={{ background: inputBg, color: inputText, borderColor: inputBorder }} disabled>
                  <img src={googleIcon} alt="Google" className="w-5 h-5 mr-2" />
                  Continuar con Google
                </button>
                <button type="button" className="w-full flex items-center justify-center py-2 border rounded-md" style={{ background: inputBg, color: inputText, borderColor: inputBorder }} disabled>
                  <img src={microsoftIcon} alt="Microsoft" className="w-5 h-5 mr-2" />
                  Continuar con Microsoft
                </button>
              </div>
              {error && <div className="text-red-500 text-center text-sm mt-2">{error}</div>}
              <div className="mt-4 text-sm text-center" style={{ color: currentTheme.colors.textSecondary }}>
                <b>Demo:</b> test@demo.com / 123456
              </div>
            </form>
          )}
          {/* Register Form */}
          {tab === 'register' && (
            <form className="space-y-5" id="register-form" onSubmit={handleRegister}>
              <div>
                <label htmlFor="register-name" className="block mb-2 font-medium" style={{ color: textColor }}>Nombre completo</label>
                <input
                  type="text"
                  id="register-name"
                  className="w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2"
                  style={{ background: inputBg, color: inputText, borderColor: inputBorder }}
                  required
                  value={registerName}
                  onChange={e => setRegisterName(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="register-email" className="block mb-2 font-medium" style={{ color: textColor }}>Correo electrónico</label>
                <input
                  type="email"
                  id="register-email"
                  className="w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2"
                  style={{ background: inputBg, color: inputText, borderColor: inputBorder }}
                  required
                  value={registerEmail}
                  onChange={e => setRegisterEmail(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="register-password" className="block mb-2 font-medium" style={{ color: textColor }}>Contraseña</label>
                <input
                  type="password"
                  id="register-password"
                  className="w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2"
                  style={{ background: inputBg, color: inputText, borderColor: inputBorder }}
                  required
                  value={registerPassword}
                  onChange={e => setRegisterPassword(e.target.value)}
                />
              </div>
              <div>
                <label htmlFor="register-confirm-password" className="block mb-2 font-medium" style={{ color: textColor }}>Confirmar contraseña</label>
                <input
                  type="password"
                  id="register-confirm-password"
                  className="w-full px-4 py-3 rounded-md border focus:outline-none focus:ring-2"
                  style={{ background: inputBg, color: inputText, borderColor: inputBorder }}
                  required
                  value={registerConfirmPassword}
                  onChange={e => setRegisterConfirmPassword(e.target.value)}
                />
              </div>
              <button type="submit" className="w-full py-3 rounded-md font-semibold" style={{ background: borderColor, color: '#fff' }} disabled>Crear cuenta</button>
              <div className="mt-6">
                <button type="button" className="w-full flex items-center justify-center py-2 mb-2 border rounded-md" style={{ background: inputBg, color: inputText, borderColor: inputBorder }} disabled>
                  <img src={googleIcon} alt="Google" className="w-5 h-5 mr-2" />
                  Registrarse con Google
                </button>
                <button type="button" className="w-full flex items-center justify-center py-2 border rounded-md" style={{ background: inputBg, color: inputText, borderColor: inputBorder }} disabled>
                  <img src={microsoftIcon} alt="Microsoft" className="w-5 h-5 mr-2" />
                  Registrarse con Microsoft
                </button>
              </div>
              {registerError && <div className="text-red-500 text-center text-sm mt-2">{registerError}</div>}
            </form>
          )}
        </div>
      </div>
    </div>
  );
};

export default Login; 
import React, { useState } from 'react';
import { useAuth } from '../hooks/useAuth';
// import { useRedirect } from '../hooks/useRedirect';
import { useTheme } from '../hooks/useTheme';
import '../assets/styles/login.css';
// import '../styles/login.css';
const logoGif = '/login/loading_v3.gif';
const googleIcon = 'https://cdn.iconscout.com/icon/free/png-256/free-google-icon-download-in-svg-png-gif-file-formats--logo-social-media-1507807.png';
const microsoftIcon = 'https://upload.wikimedia.org/wikipedia/commons/thumb/4/44/Microsoft_logo.svg/2048px-Microsoft_logo.svg.png';

// Custom component to replace a-hole element
const AHole: React.FC<React.HTMLAttributes<HTMLElement>> = ({ children, ...props }) => {
  return React.createElement('a-hole', props, children);
};

const Login: React.FC = () => {
  const { login, register, isLoading } = useAuth();
  // const { handleRedirect } = useRedirect();
  const { currentTheme, isDarkTheme } = useTheme();
  const [tab, setTab] = useState<'login' | 'register'>('login');
  const [loginEmail, setLoginEmail] = useState('');
  const [loginPassword, setLoginPassword] = useState('');
  const [registerFirstName, setRegisterFirstName] = useState('');
  const [registerLastName, setRegisterLastName] = useState('');
  const [registerPhone, setRegisterPhone] = useState('');
  const [registerEmail, setRegisterEmail] = useState('');
  const [registerPassword, setRegisterPassword] = useState('');
  const [registerConfirmPassword, setRegisterConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [registerError, setRegisterError] = useState('');

  // Elimina el useEffect que redirige si isAuthenticated

  const handleTab = (tabName: 'login' | 'register') => setTab(tabName);

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    try {
      await login(loginEmail, loginPassword);
      // handleRedirect('LOGIN_SUCCESS');
    } catch (err) {
      if (err instanceof Error && err.message === 'usuario-inactivo') {
        // handleRedirect('ONBOARDING_REQUIRED');
        // No mostrar mensaje de error
      } else {
        setError('Pasaporte denegado. Revisa tus credenciales.');
      }
    }
  };

  const handleRegister = async (e: React.FormEvent) => {
    e.preventDefault();
    setRegisterError('');

    if (registerPassword !== registerConfirmPassword) {
      setRegisterError('Las contraseñas no coinciden');
      return;
    }

    try {
      await register({
        email: registerEmail,
        password: registerPassword,
        nombre: registerFirstName,
        apellido: registerLastName,
        telefono: registerPhone
      });
      // El login automático tras registro ya redirige
    } catch (error) {
      if (error instanceof Error && error.message === 'usuario-inactivo') {
        // handleRedirect('ONBOARDING_REQUIRED');
      } else {
        setRegisterError(error instanceof Error ? error.message : 'Error en el registro');
      }
    }
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
      className="h-[100dvh] w-full flex items-center justify-center bg-black overflow-y-hidden"
      style={{ color: textColor }}
    >
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <AHole className="absolute inset-0 w-full h-full">
          <canvas className="js-canvas"></canvas>
          <div className="aura"></div>
        </AHole>
      </div>
      <div className="relative z-10 flex flex-col md:flex-row items-center justify-center w-full max-w-[90vw] h-full">
        <div className="hidden md:flex items-center justify-center pr-8">
          <div
            className="rounded-3xl shadow-2xl w-[min(360px,40vw)] h-[min(700px,80vh)] max-w-[360px] max-h-[700px] flex items-center justify-center"
            style={{
              backgroundColor: currentTheme.colors.sidebar,
              aspectRatio: '360/700'
            }}
          >
            <div className="w-full h-full rounded-2xl bg-cover bg-center" style={{ backgroundImage: "url('https://framerusercontent.com/images/77EciliJVU8turb59IhflF0Maug.png?scale-down-to=2048')" }}></div>
          </div>
        </div>
        <div
          className="w-full max-w-sm h-auto md:h-[min(700px,80vh)] rounded-2xl shadow-xl flex flex-col overflow-hidden"
          style={{ background: cardBg, borderLeft: `5px solid ${borderColor}`, fontSize: '90%' }}
        >
          {/* Header fijo: Logo + Tabs */}
          <div className="flex flex-col items-center pt-6 pb-4 flex-shrink-0">
            <img src={logoGif} alt="CamarAI Logo" className="h-20 w-auto mb-2" />
            <div className="flex w-full border-b-2 px-6" style={{ borderColor: currentTheme.colors.textSecondary }}>
              <button
                className={`flex-1 text-base font-semibold transition-all py-2 ${tab === 'login' ? 'border-b-2' : ''}`}
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
                className={`flex-1 text-base font-semibold transition-all py-2 ${tab === 'register' ? 'border-b-2' : ''}`}
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
          </div>
          {/* Área scrolleable: solo inputs */}
          <div className="flex-1 overflow-y-auto px-6 my-6 custom-input-scrollbar">
            {tab === 'login' && (
              <form className="flex flex-col w-full" id="login-form" onSubmit={handleLogin}>
                <div className="w-full space-y-4">
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
                  <div className="text-center mt-2">
                    <a href="#" className="text-sm underline" style={{ color: borderColor }}>¿Olvidaste tu contraseña?</a>
                  </div>
                  <div className="text-sm text-center" style={{ color: currentTheme.colors.textSecondary }}>
                    <b>Demo:<br /></b> MAIL: testuser1@example.com<br />PASS: supersecretpassword123
                  </div>
                  {error && <div className="text-center text-sm mt-2" style={{ color: currentTheme.colors.error }}>{error}</div>}
                </div>
              </form>
            )}
            {tab === 'register' && (
              <form className="flex flex-col w-full" id="register-form" onSubmit={handleRegister}>
                <div className="w-full space-y-4">
                  <div>
                    <div className="flex flex-col md:flex-row gap-2">
                      <div className="flex-1">
                        <label htmlFor="register-firstname" className="block mb-1 font-medium" style={{ color: textColor }}>Nombre</label>
                        <input
                          type="text"
                          id="register-firstname"
                          className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2"
                          style={{ background: inputBg, color: inputText, borderColor: inputBorder }}
                          required
                          value={registerFirstName}
                          onChange={e => setRegisterFirstName(e.target.value)}
                        />
                      </div>
                      <div className="flex-1">
                        <label htmlFor="register-lastname" className="block mb-1 font-medium" style={{ color: textColor }}>Apellido</label>
                        <input
                          type="text"
                          id="register-lastname"
                          className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2"
                          style={{ background: inputBg, color: inputText, borderColor: inputBorder }}
                          required
                          value={registerLastName}
                          onChange={e => setRegisterLastName(e.target.value)}
                        />
                      </div>
                    </div>
                    <div className="mt-2">
                      <label htmlFor="register-phone" className="block mb-1 font-medium" style={{ color: textColor }}>Teléfono</label>
                      <input
                        type="tel"
                        id="register-phone"
                        className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2"
                        style={{ background: inputBg, color: inputText, borderColor: inputBorder }}
                        required
                        value={registerPhone}
                        onChange={e => setRegisterPhone(e.target.value)}
                      />
                    </div>
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
                  {registerError && <div className="text-center text-sm mt-2" style={{ color: currentTheme.colors.error }}>{registerError}</div>}
                </div>
              </form>
            )}
          </div>
          {/* Botones fijos abajo */}
          <div className="sticky bottom-0 left-0 w-full px-6 pb-6 pt-2 z-10 rounded-b-xl" style={{ background: cardBg, borderTop: `1px solid ${currentTheme.colors.border}` }}>
            {tab === 'login' && (
              <div className="flex flex-col gap-2 w-full">
                <button
                  type="submit"
                  form="login-form"
                  className="w-full py-3 rounded-md font-semibold"
                  style={{ background: borderColor, color: '#fff' }}
                  disabled={isLoading}
                >
                  {isLoading ? 'Iniciando sesión...' : 'Iniciar Sesión'}
                </button>
                <button type="button" className="w-full flex items-center justify-center py-2 mb-2 border rounded-md" style={{ background: inputBg, color: inputText, borderColor: inputBorder }} disabled>
                  <img src={googleIcon} alt="Google" className="w-5 h-5 mr-2" />
                  Continuar con Google
                </button>
                <button type="button" className="w-full flex items-center justify-center py-2 border rounded-md" style={{ background: inputBg, color: inputText, borderColor: inputBorder }} disabled>
                  <img src={microsoftIcon} alt="Microsoft" className="w-5 h-5 mr-2" />
                  Continuar con Microsoft
                </button>
              </div>
            )}
            {tab === 'register' && (
              <div className="flex flex-col gap-2 w-full">
                <button
                  type="submit"
                  form="register-form"
                  className="w-full py-3 rounded-md font-semibold"
                  style={{ background: borderColor, color: '#fff' }}
                  disabled={isLoading}
                >
                  {isLoading ? 'Creando cuenta...' : 'Crear cuenta'}
                </button>
                <button type="button" className="w-full flex items-center justify-center py-2 mb-2 border rounded-md" style={{ background: inputBg, color: inputText, borderColor: inputBorder }} disabled>
                  <img src={googleIcon} alt="Google" className="w-5 h-5 mr-2" />
                  Registrarse con Google
                </button>
                <button type="button" className="w-full flex items-center justify-center py-2 border rounded-md" style={{ background: inputBg, color: inputText, borderColor: inputBorder }} disabled>
                  <img src={microsoftIcon} alt="Microsoft" className="w-5 h-5 mr-2" />
                  Registrarse con Microsoft
                </button>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;

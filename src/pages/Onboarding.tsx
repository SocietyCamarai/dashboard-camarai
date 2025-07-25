import React, { useState } from 'react';
import { useTheme } from '../hooks/useTheme';
import { useAuth } from '../hooks/useAuth';
import { useRedirect } from '../context/useRedirect';
import { completeOnboardingRequest } from '../services/auth';

const AHole: React.FC<React.HTMLAttributes<HTMLElement>> = ({ children, ...props }) => {
  return React.createElement('a-hole', props, children);
};

const Onboarding: React.FC = () => {
  const { updateUserState, user } = useAuth();
  const { currentTheme } = useTheme();
  const { handleRedirect } = useRedirect();
  const [step, setStep] = useState(0);
  const [maxStep, setMaxStep] = useState(0);
  const [empresa, setEmpresa] = useState({ nombre: '', cif: '' });
  const [establecimiento, setEstablecimiento] = useState({ nombre: '', tipo: '' });
  const [zona, setZona] = useState({ nombre: '' });
  const [mesas, setMesas] = useState({ tipo: '', cantidad: '' });
  const [confirmado, setConfirmado] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const cardBg = 'linear-gradient(135deg, #181c27 0%, #23283a 100%)';
  const inputBg = '#23283a';

  const steps = [
    { label: 'Empresa' },
    { label: 'Establecimiento' },
    { label: 'Zona' },
    { label: 'Mesas' },
    { label: 'Confirmar' }
  ];

  // Redirigir si el usuario ya completó el onboarding
  React.useEffect(() => {
    if (user && user.onboardingCompleto) {
      handleRedirect('DASHBOARD');
    }
  }, [user, handleRedirect]);

  const handleNext = () => {
    setStep(s => {
      const next = s + 1;
      setMaxStep(m => Math.max(m, next));
      return next;
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    if (step === 4) {
      setLoading(true);
      try {
        const formData = { empresa, establecimiento, zona, mesas };
        const response = await completeOnboardingRequest(formData);
        updateUserState(response.user);
        setConfirmado(true);
        setTimeout(() => handleRedirect('ONBOARDING_SUCCESS'), 1200);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Error al completar el onboarding');
      } finally {
        setLoading(false);
      }
      return;
    }
    let isValid = false;
    let cantidad = 0;
    switch (step) {
      case 0:
        isValid = empresa.nombre.trim() !== '' && empresa.cif.trim() !== '';
        break;
      case 1:
        isValid = establecimiento.nombre.trim() !== '' && establecimiento.tipo.trim() !== '';
        break;
      case 2:
        isValid = zona.nombre.trim() !== '';
        break;
      case 3:
        cantidad = parseInt(mesas.cantidad);
        isValid = mesas.tipo.trim() !== '' && !isNaN(cantidad) && cantidad > 0;
        break;
    }
    if (isValid) {
      handleNext();
    }
  };

  return (
    <div className="min-h-screen w-full flex items-center justify-center relative bg-black" style={{ zIndex: 0 }}>
      {/* Línea de tiempo visual */}

      {/* Fondo animado AHole */}
      <div className="fixed inset-0 w-full h-full z-0 pointer-events-none">
        <AHole className="absolute inset-0 w-full h-full">
          <canvas className="js-canvas"></canvas>
          <div className="aura"></div>
        </AHole>
      </div>
      {/* Botón de cerrar sesión fijo en la esquina inferior izquierda */}
      <button
        type="button"
        className="fixed left-4 bottom-4 z-50 bg-red-600 hover:bg-red-700 text-white font-bold py-2 px-5 rounded-lg shadow-lg transition focus:outline-none focus:ring-2 focus:ring-red-400"
        onClick={() => {
          if (typeof window !== 'undefined') {
            localStorage.clear();
          }
          if (typeof window !== 'undefined') {
            window.location.href = '/login';
          }
        }}
        aria-label="Cerrar sesión"
      >
        Cerrar sesión
      </button>
      {/* Caja principal centrada */}
      <div className="relative z-10 flex items-center justify-center w-full max-w-xl">
        <div className="rounded-2xl shadow-xl pl-3 w-full max-w-xl mx-auto" style={{ background: currentTheme.colors.primary }}>
          <div 
            className="rounded-2xl shadow-xl p-8 w-full max-w-xl mx-auto min-h-[450px]"
            style={{ background: cardBg }}
          >
            {/* Línea de tiempo visual (ahora dentro del card) */}
            <div className="w-full flex items-center justify-center z-20 mb-8">
              <div className="w-full max-w-xl px-4">
                <div className="flex items-center w-full ">
                  {steps.map((stepObj, idx) => (
                    <React.Fragment key={stepObj.label}>
                      {/* Círculo */}
                      <button
                        type="button"
                        className={`flex flex-col items-center z-20 focus:outline-none transition-colors duration-200 pointer-events-auto ${idx < step ? 'text-green-400' : idx === step ? 'text-purple-400' : 'text-gray-400'}`}
                        onClick={() => { if (idx <= maxStep) setStep(idx); }}
                        disabled={idx > maxStep}
                        style={{ background: 'none', border: 'none', cursor: idx <= maxStep ? 'pointer' : 'default' }}
                      >
                        <div className={`w-6 h-6 rounded-full flex items-center justify-center font-bold border-2 transition-colors duration-200 ${idx < step ? 'bg-green-400 border-green-400 text-white' : idx === step ? 'bg-purple-400 border-purple-400 text-white' : 'bg-gray-700 border-gray-400'}`}>
                          {idx + 1}
                        </div>
                      </button>
                      {/* Stick solo si no es el último */}
                      {idx < steps.length - 1 && (
                        <div className={`flex-1 h-1 transition-colors duration-200 z-10 ${idx < step ? 'bg-green-400' : 'bg-gray-700'}`} />
                      )}
                    </React.Fragment>
                  ))}
                </div>
              </div>
            </div>
            <form onSubmit={handleSubmit} className="flex flex-col h-full" style={{ minHeight: '350px' }}>
              {/* Paso 0: Empresa */}
              {step === 0 && (
                <>
                  <div className="w-full rounded-lg py-4 px-2 flex items-center justify-center mb-8" style={{ background: inputBg }}>
                    <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text">
                      ¿Cual es tu Empresa?
                    </h2>
                  </div>
                  <div className="flex flex-col gap-y-5">
                    <div>
                      <label className="block mb-2 font-semibold bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text">
                        Nombre Empresa
                      </label>
                      <input
                        className="w-full px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-purple-400 placeholder-gray-200 text-sm"
                        placeholder="Escribe aquí .."
                        value={empresa.nombre}
                        onChange={e => setEmpresa({ ...empresa, nombre: e.target.value })}
                        style={{ background: inputBg, color: '#fff' }}
                      />
                    </div>
                    <div>
                      <label className="block mb-2 font-semibold bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text">
                        CIF
                      </label>
                      <input
                        className="w-full px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-purple-400 placeholder-gray-200 text-sm"
                        placeholder="Escribe aquí .."
                        value={empresa.cif}
                        onChange={e => setEmpresa({ ...empresa, cif: e.target.value })}
                        style={{ background: inputBg, color: '#fff' }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between mt-auto pt-8">
                    {step > 0 ? (
                      <button
                        type="button"
                        className="px-4 py-2 rounded-lg font-semibold text-lg transition bg-gray-700 text-white"
                        onClick={() => setStep(s => Math.max(0, s - 1))}
                      >
                        Atrás
                      </button>
                    ) : <div />}
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg font-semibold text-lg transition"
                      style={{ background: currentTheme.colors.primary, color: '#fff' }}
                    >
                      Siguiente
                    </button>
                  </div>
                </>
              )}
              {/* Paso 1: Establecimiento */}
              {step === 1 && (
                <>
                  <div className="w-full rounded-lg py-4 px-2 flex items-center justify-center mb-8" style={{ background: inputBg }}>
                    <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text">
                      ¿Datos del Establecimiento?
                    </h2>
                  </div>
                  <div className="flex flex-col gap-y-5">
                    <div>
                      <label className="block mb-2 font-semibold bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text">
                        Nombre del Establecimiento
                      </label>
                      <input
                        className="w-full px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-purple-400 placeholder-gray-200 text-sm"
                        placeholder="Escribe aquí .."
                        value={establecimiento.nombre}
                        onChange={e => setEstablecimiento({ ...establecimiento, nombre: e.target.value })}
                        style={{ background: inputBg, color: '#fff' }}
                      />
                    </div>
                    <div>
                      <label className="block mb-2 font-semibold bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text">
                        Tipo de Establecimiento
                      </label>
                      <input
                        className="w-full px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-purple-400 placeholder-gray-200 text-sm"
                        placeholder="Escribe aquí .."
                        value={establecimiento.tipo}
                        onChange={e => setEstablecimiento({ ...establecimiento, tipo: e.target.value })}
                        style={{ background: inputBg, color: '#fff' }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between mt-auto pt-8">
                    {step > 0 ? (
                      <button
                        type="button"
                        className="px-4 py-2 rounded-lg font-semibold text-lg transition bg-gray-700 text-white"
                        onClick={() => setStep(s => Math.max(0, s - 1))}
                      >
                        Atrás
                      </button>
                    ) : <div />}
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg font-semibold text-lg transition"
                      style={{ background: currentTheme.colors.primary, color: '#fff' }}
                    >
                      Siguiente
                    </button>
                  </div>
                </>
              )}
              {/* Paso 2: Zona */}
              {step === 2 && (
                <>
                  <div className="w-full rounded-lg py-4 px-2 flex items-center justify-center mb-8" style={{ background: inputBg }}>
                    <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text">
                      ¿Zonas del Establecimiento?
                    </h2>
                  </div>
                  <div>
                    <label className="block mb-2 font-semibold bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text">
                      Nombre de la zona
                    </label>
                    <input
                      className="w-full px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-purple-400 placeholder-gray-200 text-sm"
                      placeholder="Escribe aquí .."
                      value={zona.nombre}
                      onChange={e => setZona({ nombre: e.target.value })}
                      style={{ background: inputBg, color: '#fff' }}
                    />
                  </div>
                  <div className="flex justify-between mt-auto pt-8">
                    {step > 0 ? (
                      <button
                        type="button"
                        className="px-4 py-2 rounded-lg font-semibold text-lg transition bg-gray-700 text-white"
                        onClick={() => setStep(s => Math.max(0, s - 1))}
                      >
                        Atrás
                      </button>
                    ) : <div />}
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg font-semibold text-lg transition"
                      style={{ background: currentTheme.colors.primary, color: '#fff' }}
                    >
                      Siguiente
                    </button>
                  </div>
                </>
              )}
              {/* Paso 3: Mesas */}
              {step === 3 && (
                <>
                  <div className="w-full rounded-lg py-4 px-2 flex items-center justify-center mb-8" style={{ background: inputBg }}>
                    <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text">
                      ¿Mesas de la Zona?
                    </h2>
                  </div>
                  <div className="flex flex-col gap-y-5">
                    <div>
                      <label className="block mb-2 font-semibold bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text">
                        Tipo de mesa
                      </label>
                      <input
                        className="w-full px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-purple-400 placeholder-gray-200 text-sm"
                        placeholder="Escribe aquí .."
                        value={mesas.tipo}
                        onChange={e => setMesas({ ...mesas, tipo: e.target.value })}
                        style={{ background: inputBg, color: '#fff' }}
                      />
                    </div>
                    <div>
                      <label className="block mb-2 font-semibold bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text">
                        Cantidad de mesas
                      </label>
                      <input
                        className="w-full px-4 py-3 rounded-lg border-none focus:ring-2 focus:ring-purple-400 placeholder-gray-200 text-sm"
                        placeholder="Escribe aquí .."
                        type="number"
                        min="1"
                        step="1"
                        value={mesas.cantidad}
                        onChange={e => {
                          const value = parseInt(e.target.value);
                          if (value > 0) {
                            setMesas({ ...mesas, cantidad: e.target.value });
                          }
                        }}
                        onBlur={e => {
                          const value = parseInt(e.target.value);
                          if (value <= 0 || isNaN(value)) {
                            setMesas({ ...mesas, cantidad: '' });
                          }
                        }}
                        style={{ background: inputBg, color: '#fff' }}
                      />
                    </div>
                  </div>
                  <div className="flex justify-between mt-auto pt-8">
                    {step > 0 ? (
                      <button
                        type="button"
                        className="px-4 py-2 rounded-lg font-semibold text-lg transition bg-gray-700 text-white"
                        onClick={() => setStep(s => Math.max(0, s - 1))}
                      >
                        Atrás
                      </button>
                    ) : <div />}
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg font-semibold text-lg transition"
                      style={{ background: currentTheme.colors.primary, color: '#fff' }}
                    >
                      Siguiente
                    </button>
                  </div>
                </>
              )}
              {/* Paso 4: Confirmación */}
              {step === 4 && (
                <>
                  <div className="w-full rounded-lg py-4 px-2 flex items-center justify-center mb-8" style={{ background: inputBg }}>
                    <h2 className="text-3xl font-bold text-center bg-gradient-to-r from-pink-400 to-purple-400 text-transparent bg-clip-text">
                      Confirmación
                    </h2>
                  </div>
                  <div className="mb-6">
                    <h3 className="font-semibold mb-2 text-white">Revisa tus datos:</h3>
                    <ul className="text-sm space-y-1 text-white">
                      <li><b>Empresa:</b> {empresa.nombre} ({empresa.cif})</li>
                      <li><b>Establecimiento:</b> {establecimiento.nombre} ({establecimiento.tipo})</li>
                      <li><b>Zona:</b> {zona.nombre}</li>
                      <li><b>Mesas:</b> {mesas.tipo} - {mesas.cantidad}</li>
                    </ul>
                  </div>
                  <div className="flex justify-between mt-auto pt-8">
                    {step > 0 ? (
                      <button
                        type="button"
                        className="px-4 py-2 rounded-lg font-semibold text-lg transition bg-gray-700 text-white"
                        onClick={() => setStep(s => Math.max(0, s - 1))}
                      >
                        Atrás
                      </button>
                    ) : <div />}
                    <button
                      type="submit"
                      className="px-4 py-2 rounded-lg font-semibold text-lg transition"
                      style={{ background: currentTheme.colors.primary, color: '#fff' }}
                      disabled={loading}
                    >
                      Confirmar
                    </button>
                  </div>
                  {confirmado && (
                    <div className="mt-6 text-green-500 font-semibold text-center">
                      ¡Datos guardados correctamente!
                    </div>
                  )}
                  {error && <div className="text-red-500 text-sm text-center mt-2">{error}</div>}
                </>
              )}
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Onboarding;
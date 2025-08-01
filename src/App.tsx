import { BrowserRouter as Router, Routes, Route, Navigate, useParams } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import { RedirectProvider } from './context/RedirectProvider';
import ProtectedRoute from './components/ProtectedRoute';
import GuestRoute from './components/GuestRoute';
import OnboardingRoute from './components/OnboardingRoute';
import Layout from './components/layout/Layout';
import { Home, Comandas, Ambientes, PlanoMesas, Promociones, KDS, SettingsAccount, Settings } from './pages';
import Login from './pages/Login';
import Onboarding from './pages/Onboarding';
import { useAuth } from './hooks/useAuth';

function DashboardRoutes() {
  // Extraer la sección de la URL: /dashboard/:section
  const { section } = useParams<{ section?: string }>();
  const currentSection = section || 'home';

  let content;
  switch (currentSection) {
    case 'home':
      content = <Home />;
      break;
    case 'comandas':
      content = <Comandas />;
      break;
    case 'ambientes':
      content = <Ambientes />;
      break;
    case 'plano-mesas':
      content = <PlanoMesas />;
      break;
    case 'carta':
      content = <div className="p-6"><h1 className="text-2xl font-bold">Carta</h1><p>Página en desarrollo...</p></div>;
      break;
    case 'categorias':
      content = <div className="p-6"><h1 className="text-2xl font-bold">Categorías</h1><p>Página en desarrollo...</p></div>;
      break;
    case 'productos':
      content = <div className="p-6"><h1 className="text-2xl font-bold">Productos</h1><p>Página en desarrollo...</p></div>;
      break;
    case 'ingredientes':
      content = <div className="p-6"><h1 className="text-2xl font-bold">Ingredientes</h1><p>Página en desarrollo...</p></div>;
      break;
    case 'personal':
      content = <div className="p-6"><h1 className="text-2xl font-bold">Personal</h1><p>Página en desarrollo...</p></div>;
      break;
    case 'reportes':
      content = <div className="p-6"><h1 className="text-2xl font-bold">Reportes</h1><p>Página en desarrollo...</p></div>;
      break;
    case 'inventario':
      content = <div className="p-6"><h1 className="text-2xl font-bold">Inventario</h1><p>Página en desarrollo...</p></div>;
      break;
    case 'reservas':
      content = <div className="p-6"><h1 className="text-2xl font-bold">Reservas</h1><p>Página en desarrollo...</p></div>;
      break;
    case 'promociones':
      content = <Promociones />;
      break;
    case 'kds':
      content = <KDS />;
      break;
    default:
      content = <Home />;
  }

  return (
    <Layout currentPage={currentSection}>
      {content}
    </Layout>
  );
}

function SettingsRoutes() {
  // Extraer la sección de la URL: /settings/:section
  const { section } = useParams<{ section?: string }>();
  const currentSection = section || 'main';

  let content;
  switch (currentSection) {
    case 'main':
      content = <Settings />;
      break;
    case 'account':
      content = <SettingsAccount />;
      break;
    default:
      content = <Settings />;
  }

  return (
    <Layout currentPage="settings">
      {content}
    </Layout>
  );
}

function AppContent() {
  const { isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-black">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Rutas públicas solo para no autenticados */}
      <Route element={<GuestRoute />}>
        <Route path="/login" element={<Login />} />
      </Route>

      {/* Rutas de onboarding */}
      <Route element={<OnboardingRoute />}>
        <Route path="/onboarding" element={<Onboarding />} />
      </Route>

      {/* Rutas protegidas */}
      <Route element={<ProtectedRoute />}>
        <Route path="/dashboard/home" element={<DashboardRoutes />} />
        <Route path="/dashboard/:section" element={<DashboardRoutes />} />
        <Route path="/dashboard" element={<Navigate to="/dashboard/home" replace />} />
        <Route path="/settings/main" element={<SettingsRoutes />} />
        <Route path="/settings/:section" element={<SettingsRoutes />} />
        <Route path="/settings" element={<Navigate to="/settings/main" replace />} />
        <Route path="/" element={<Navigate to="/dashboard/home" replace />} />e 
      </Route>

      {/* Catch-all */}
      <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
    </Routes>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <RedirectProvider>
            <AppContent />
          </RedirectProvider>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;

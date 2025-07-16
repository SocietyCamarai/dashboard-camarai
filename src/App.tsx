import { BrowserRouter as Router, Routes, Route, Navigate, useNavigate, useLocation } from 'react-router-dom';
import { ThemeProvider } from './context/ThemeContext';
import { AuthProvider } from './context/AuthContext';
import ProtectedRoute from './components/ProtectedRoute';
import Layout from './components/layout/Layout';
import { Home, Page2 } from './pages';
import Login from './pages/Login';

function DashboardRoutes() {
  const location = useLocation();
  const navigate = useNavigate();
  // Extraer la sección de la URL: /dashboard/:section
  const section = location.pathname.split('/')[2] || 'home';

  const handlePageChange = (page: string) => {
    navigate(`/dashboard/${page}`);
  };

  let content;
  switch (section) {
    case 'home':
      content = <Home />;
      break;
    case 'tables':
    case 'store':
    case 'qr':
    case 'locations':
    case 'legal':
    case 'brands':
    case 'promotions':
    case 'schedules':
    case 'kds':
    case 'whatsapp':
    case 'instagram':
    case 'facebook':
    case 'webchat':
    case 'maps':
    case 'printers':
    case 'team':
    case 'events':
    case 'orders':
    case 'settings':
    case 'billing':
    case 'reports':
      content = <Page2 />;
      break;
    default:
      content = <Home />;
  }

  return (
    <Layout currentPage={section} onPageChange={handlePageChange}>
      {content}
    </Layout>
  );
}

function App() {
  return (
    <AuthProvider>
      <ThemeProvider>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />
            <Route element={<ProtectedRoute />}>
              <Route path="/dashboard/home" element={<DashboardRoutes />} />
              <Route path="/dashboard/:section" element={<DashboardRoutes />} />
              <Route path="/dashboard" element={<Navigate to="/dashboard/home" replace />} />
              <Route path="/" element={<Navigate to="/dashboard/home" replace />} />
            </Route>
            <Route path="*" element={<Navigate to="/dashboard/home" replace />} />
          </Routes>
        </Router>
      </ThemeProvider>
    </AuthProvider>
  );
}

export default App;

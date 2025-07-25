import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const GuestRoute: React.FC = () => {
  const { isAuthenticated, needsOnboarding } = useAuth();

  if (isAuthenticated) {
    return needsOnboarding
      ? <Navigate to="/onboarding" replace />
      : <Navigate to="/dashboard/home" replace />;
  }

  return <Outlet />;
};

export default GuestRoute; 
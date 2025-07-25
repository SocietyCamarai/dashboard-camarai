import { Navigate, Outlet } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const OnboardingRoute: React.FC = () => {
  const { isAuthenticated, needsOnboarding } = useAuth();

  if (!isAuthenticated) return <Navigate to="/login" replace />;
  if (!needsOnboarding) return <Navigate to="/dashboard/home" replace />;

  return <Outlet />;
};

export default OnboardingRoute; 
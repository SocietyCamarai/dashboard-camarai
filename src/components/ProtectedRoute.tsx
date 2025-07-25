import React from 'react';
import { Navigate, Outlet, useLocation } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';
import { Loader } from './loader/Loader';

const ProtectedRoute: React.FC = () => {
  const { user, isLoading, isAuthenticated, needsOnboarding } = useAuth();
  const location = useLocation();

  if (isLoading) {
    return (
      <div className="flex items-center justify-center w-full h-full">
        <Loader size={64} />
      </div>
    );
  }

  if (!isAuthenticated || !user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  const isOnboardingRoute = location.pathname.startsWith('/onboarding');

  if (needsOnboarding && !isOnboardingRoute) {
    return <Navigate to="/onboarding" replace />;
  }

  if (!needsOnboarding && isOnboardingRoute) {
    return <Navigate to="/dashboard/home" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute; 
import React from 'react';
import { useNavigate } from 'react-router-dom';
import { RedirectContext } from './RedirectContext';
import type { RedirectStatus } from './redirectTypes';

export const RedirectProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const navigate = useNavigate();

  const handleRedirect = (status: RedirectStatus) => {
    switch (status) {
      case 'LOGIN_SUCCESS':
        navigate('/dashboard/home');
        break;
      case 'ONBOARDING_REQUIRED':
        navigate('/onboarding');
        break;
      case 'ONBOARDING_SUCCESS':
        navigate('/dashboard/home');
        break;
      case 'TOKEN_EXPIRED':
        navigate('/login');
        break;
      case 'LOGOUT':
        navigate('/login');
        break;
      case 'UNAUTHORIZED':
        navigate('/login');
        break;
      case 'DASHBOARD':
        navigate('/dashboard/home');
        break;
      case 'HOME':
        navigate('/');
        break;
      case 'ERROR':
        navigate('/error');
        break;
      default:
        break;
    }
  };

  return (
    <RedirectContext.Provider value={{ handleRedirect }}>
      {children}
    </RedirectContext.Provider>
  );
}; 
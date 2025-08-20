import React from 'react';
import type { AmbientePlano } from '../../types/compatibility.types';

interface TabContentProps {
  ambiente: AmbientePlano;
  isActive: boolean;
  children: React.ReactNode;
}

export const TabContent: React.FC<TabContentProps> = ({
  ambiente,
  isActive,
  children
}) => {
  if (!isActive) return null;

  return (
    <div
      data-state={isActive ? 'active' : 'inactive'}
      data-orientation="horizontal"
      role="tabpanel"
      aria-labelledby={`trigger-${ambiente.id}`}
      id={`content-${ambiente.id}`}
      className="ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 m-0"
    >
      {children}
    </div>
  );
}; 

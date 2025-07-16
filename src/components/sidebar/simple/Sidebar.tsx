import React from 'react';
import { useTheme } from '../../../hooks/useTheme';
import { TeamSelector } from './TeamSelector';
import { Navigation } from './Navigation';
import { UserProfile } from './UserProfile';

interface SimpleSidebarProps {
  currentPage: string;
  isOpen: boolean;
}

export const SimpleSidebar: React.FC<SimpleSidebarProps> = ({ 
  currentPage, 
  isOpen
}) => {
  const { currentTheme, isDarkTheme } = useTheme();

  return (
    <aside 
      className={`fixed left-0 top-0 h-screen flex flex-col items-center font-dm-sans transition-all duration-300 ease-in-out z-50 w-24 ${
        // Mobile responsive classes
        isOpen ? 'translate-x-0' : '-translate-x-full lg:translate-x-0'
      }`}
      style={{
        backgroundColor: isDarkTheme(currentTheme) 
          ? 'rgba(17, 24, 39, 0.8)' 
          : 'rgba(255, 255, 255, 0.8)',
        backdropFilter: 'blur(20px)',
        WebkitBackdropFilter: 'blur(20px)',
        borderRight: `1px solid ${currentTheme.colors.border}40`,
        height: '100dvh', // Dynamic viewport height for mobile
        maxHeight: '100dvh',
        overflow: 'hidden',
      }}
    >
      <TeamSelector />
      <Navigation currentPage={currentPage} />
      <UserProfile />
    </aside>
  );
}; 
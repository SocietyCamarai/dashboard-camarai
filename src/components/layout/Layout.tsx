import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { useNavigation } from '../../context';
import { useSidebar } from '../../hooks/useSidebar';
import Sidebar from '../sidebar/Sidebar';
import ThemeSelector from '../themeSelector/ThemeSelector';
import { NavigationProvider, SidebarProvider } from '../../context';
import { TeamMenu, UserSubmenu } from '../sidebar/shared';
import { XIcon, MenuIcon } from '../icons';
import type { LayoutProps } from '../../types';

const LayoutContent: React.FC<LayoutProps> = ({ children, currentPage, onPageChange }) => {
  const { currentTheme, isDarkTheme } = useTheme();
  const { navigationType } = useNavigation();
  const { 
    isSidebarOpen, 
    setIsSidebarOpen, 
    toggleSidebar,
    isThemeSelectorOpen, 
    setIsThemeSelectorOpen,
    isUserMenuOpen,
    setIsUserMenuOpen,
    isTeamMenuOpen,
    setIsTeamMenuOpen
  } = useSidebar();

  return (
    <div 
      className="min-h-screen flex font-dm-sans"
      style={{ 
        backgroundColor: currentTheme.colors.background,
        height: '100dvh',
        overflow: 'hidden',
      }}
    >
      {/* Mobile Overlay */}
      {isSidebarOpen && (
        <div 
          className="fixed inset-0 z-40 lg:hidden backdrop-blur-sm"
          style={{
            backgroundColor: isDarkTheme(currentTheme) 
              ? 'rgba(0, 0, 0, 0.3)' 
              : 'rgba(255, 255, 255, 0.3)'
          }}
          onClick={() => setIsSidebarOpen(false)}
        />
      )}
      
      {/* Sidebar */}
      <Sidebar 
        currentPage={currentPage} 
        onPageChange={onPageChange} 
        isOpen={isSidebarOpen}
        onClose={() => setIsSidebarOpen(false)}
      />

      {/* Team Menu - Outside sidebar */}
      <TeamMenu 
        isOpen={isTeamMenuOpen}
        onClose={() => setIsTeamMenuOpen(false)}
        position={navigationType}
      />

      {/* User Submenu - Outside sidebar */}
      <UserSubmenu 
        isOpen={isUserMenuOpen}
        onClose={() => setIsUserMenuOpen(false)}
        position={navigationType}
      />
      
      {/* Main Content */}
      <main
        className={`flex-1 p-4 sm:p-5 font-dm-sans transition-all duration-300 ease-in-out overflow-y-auto ${
          navigationType === 'simple' ? 'lg:ml-24' : 'lg:ml-64'
        }`}
        style={{ 
          backgroundColor: currentTheme.colors.background,
          height: '100dvh',
        }}
      >
        {/* Mobile Header with Dual Button (Hamburger/X) */}
        <div className="lg:hidden mb-4">
          <button
            onClick={toggleSidebar}
            className="p-2 rounded-lg transition-colors duration-200 hover:bg-opacity-10"
            style={{ 
              backgroundColor: `${currentTheme.colors.primary}20`,
              color: currentTheme.colors.text 
            }}
          >
            {isSidebarOpen ? (
              // X icon when sidebar is open
              <XIcon className="w-6 h-6" />
            ) : (
              // Hamburger icon when sidebar is closed
              <MenuIcon className="w-6 h-6" />
            )}
          </button>
        </div>
        
        {children}
      </main>

      {/* Theme Selector - Outside of everything */}
      <ThemeSelector 
        isOpen={isThemeSelectorOpen} 
        onClose={() => setIsThemeSelectorOpen(false)} 
        closeOnBackdropClick={true}
      />
    </div>
  );
};

const Layout: React.FC<LayoutProps> = ({ children, currentPage, onPageChange }) => {
  return (
    <NavigationProvider>
      <SidebarProvider>
        <LayoutContent currentPage={currentPage} onPageChange={onPageChange}>
          {children}
        </LayoutContent>
      </SidebarProvider>
    </NavigationProvider>
  );
};

export default Layout; 
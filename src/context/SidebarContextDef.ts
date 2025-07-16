import type { ReactNode } from 'react';

export interface SidebarContextType {
  // Sidebar states
  isSidebarOpen: boolean;
  setIsSidebarOpen: (open: boolean) => void;
  toggleSidebar: () => void;

  // Logout handler for user menu
  handleLogout: () => void;
  
  // Theme selector state
  isThemeSelectorOpen: boolean;
  setIsThemeSelectorOpen: (open: boolean) => void;
  
  // User menu states
  isUserMenuOpen: boolean;
  setIsUserMenuOpen: (open: boolean) => void;
  isUserMenuOpenDetailed: boolean;
  setIsUserMenuOpenDetailed: (open: boolean) => void;
  
  // Team menu states
  isTeamMenuOpen: boolean;
  setIsTeamMenuOpen: (open: boolean) => void;
  selectedTeam: string;
  setSelectedTeam: (team: string) => void;

  // Handlers
  handleUserMenuToggle: () => void;
  handleTeamMenuToggle: () => void;
  handleTeamChange: (teamName: string) => void;
  handleOpenThemeSelector: () => void;

}

export interface SidebarProviderProps {
  children: ReactNode;
} 
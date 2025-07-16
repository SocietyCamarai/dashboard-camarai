import React, { useState } from 'react';
import type { SidebarProviderProps } from './SidebarContextDef';
import { SidebarContext } from './SidebarContext';
import { useAuth } from '../hooks/useAuth';
import { useNavigate } from 'react-router-dom';

export const SidebarProvider: React.FC<SidebarProviderProps> = ({ children }) => {
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [isThemeSelectorOpen, setIsThemeSelectorOpen] = useState(false);
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const [isUserMenuOpenDetailed, setIsUserMenuOpenDetailed] = useState(false);
  const [isTeamMenuOpen, setIsTeamMenuOpen] = useState(false);
  const [selectedTeam, setSelectedTeam] = useState('Camarai');

  const { logout } = useAuth();
  const navigate = useNavigate();

  const toggleSidebar = () => {
    setIsSidebarOpen(!isSidebarOpen);
  };

  const handleUserMenuToggle = () => {
    setIsUserMenuOpen(!isUserMenuOpen);
  };

  const handleTeamMenuToggle = () => {
    setIsTeamMenuOpen(!isTeamMenuOpen);
  };

  const handleTeamChange = (teamName: string) => {
    setSelectedTeam(teamName);
    setIsTeamMenuOpen(false);
  };

  const handleOpenThemeSelector = () => {
    setIsThemeSelectorOpen(true);
    setIsUserMenuOpen(false);
    setIsUserMenuOpenDetailed(false);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  const value = {
    isSidebarOpen,
    setIsSidebarOpen,
    toggleSidebar,
    isThemeSelectorOpen,
    setIsThemeSelectorOpen,
    isUserMenuOpen,
    setIsUserMenuOpen,
    isUserMenuOpenDetailed,
    setIsUserMenuOpenDetailed,
    isTeamMenuOpen,
    setIsTeamMenuOpen,
    selectedTeam,
    setSelectedTeam,
    handleUserMenuToggle,
    handleTeamMenuToggle,
    handleTeamChange,
    handleOpenThemeSelector,
    handleLogout,
  };

  return (
    <SidebarContext.Provider value={value}>
      {children}
    </SidebarContext.Provider>
  );
}; 
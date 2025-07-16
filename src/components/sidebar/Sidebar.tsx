import React from 'react';
import { useNavigation } from '../../context';
import { SimpleSidebar } from './simple';
import { DetailedSidebar } from './detailed';
import type { SidebarProps } from '../../types';

const Sidebar: React.FC<SidebarProps> = ({ 
  currentPage, 
  isOpen = false, 
  onClose
}) => {
  const { navigationType } = useNavigation();

  if (navigationType === 'simple') {
    return (
      <SimpleSidebar
        currentPage={currentPage}
        isOpen={isOpen}
      />
    );
  }

  return (
    <DetailedSidebar
      currentPage={currentPage}
      isOpen={isOpen}
      onClose={onClose}
    />
  );
};

export default Sidebar; 
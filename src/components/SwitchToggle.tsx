import React from 'react';
import { useTheme } from '../hooks/useTheme';

interface SwitchToggleProps {
  isActive: boolean;
  onToggle: () => void;
  size?: 'sm' | 'md' | 'lg';
  disabled?: boolean;
  className?: string;
}

export const SwitchToggle: React.FC<SwitchToggleProps> = ({
  isActive,
  onToggle,
  size = 'md',
  disabled = false,
  className = ''
}) => {
  const { currentTheme } = useTheme();

  const sizeClasses = {
    sm: 'w-10 h-6',
    md: 'w-12 h-7',
    lg: 'w-14 h-8'
  };

  const circleSizeClasses = {
    sm: 'w-4 h-4',
    md: 'w-5 h-5',
    lg: 'w-6 h-6'
  };

  const circlePositionClasses = {
    sm: isActive ? 'translate-x-5' : 'translate-x-1',
    md: isActive ? 'translate-x-6' : 'translate-x-1',
    lg: isActive ? 'translate-x-7' : 'translate-x-1'
  };

  return (
    <button
      onClick={onToggle}
      disabled={disabled}
      className={`
        relative inline-flex items-center rounded-full transition-all duration-300 ease-in-out
        ${sizeClasses[size]}
        ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer hover:scale-105'}
        ${className}
      `}
      style={{
        backgroundColor: isActive 
          ? currentTheme.colors.primary 
          : currentTheme.colors.border,
        filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.1))'
      }}
      onMouseEnter={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'scale(1.05)';
        }
      }}
      onMouseLeave={(e) => {
        if (!disabled) {
          e.currentTarget.style.transform = 'scale(1)';
        }
      }}
    >
      <div
        className={`
          ${circleSizeClasses[size]}
          ${circlePositionClasses[size]}
          bg-white rounded-full transition-all duration-300 ease-in-out
          shadow-sm
        `}
      />
    </button>
  );
}; 
import React from 'react';
import { useTheme } from '../../hooks/useTheme';

export const Loader: React.FC<{ size?: number }> = ({ size = 48 }) => {
  const { currentTheme } = useTheme();
  return (
    <div className="flex items-center justify-center w-full h-full">
      <div
        className="animate-spin rounded-full border-4 border-t-4"
        style={{
          width: size,
          height: size,
          borderColor: `${currentTheme.colors.primary}33`,
          borderTopColor: currentTheme.colors.primary,
        }}
      />
    </div>
  );
}; 
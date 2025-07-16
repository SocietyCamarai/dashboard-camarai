import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import type { HeaderProps } from '../../types/components';

const Header: React.FC<HeaderProps> = ({ title }) => {
  const { currentTheme } = useTheme();

  // function hexToRgba(hex: string | undefined, opacity: number) {
  //   if (!hex || !hex.startsWith('#') || hex.length !== 7) return 'rgba(0,0,0,0)';
  //   const r = parseInt(hex.slice(1, 3), 16);
  //   const g = parseInt(hex.slice(3, 5), 16);
  //   const b = parseInt(hex.slice(5, 7), 16);
  //   return `rgba(${r}, ${g}, ${b}, ${opacity})`;
  // }

  return (
    <>
      <header 
        className="mb-8 p-6 rounded-lg"
        style={{
          backgroundColor: currentTheme.colors.sidebar,
        }}
      >
        <h1
          className="text-[2.2rem] text-left inline-block"
          style={{
            background: 'linear-gradient(to right, rgb(155, 110, 253), rgb(240, 118, 140), rgb(120, 163, 237))',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text',
            color: 'transparent',
            fontFamily: "'Inter var', system-ui, -apple-system, sans-serif",
            fontWeight: 600,
            // scale: '1.05',
            letterSpacing: '-0.03em',
          }}
        >
          {title}
        </h1>
      </header>
      
      {/* <style>
        {`
          .gradient-text {
            background: linear-gradient(
              to right, 
              var(--gradient-primary), 
              var(--gradient-secondary), 
              var(--gradient-primary)
            );
            -webkit-background-clip: text;
            -webkit-text-fill-color: transparent;
            background-clip: text;
            color: transparent;
            font-family: 'Inter var', system-ui, -apple-system, sans-serif;
            font-weight: 600;
          }
        `}
      </style> */}
    </>
  );
};

export default Header; 
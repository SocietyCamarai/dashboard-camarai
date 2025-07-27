import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import type { HeaderProps } from '../../types/components';

const Header: React.FC<HeaderProps> = ({ title, className, rounded = true }) => {
  const { currentTheme } = useTheme();

  return (
    <>
      <header
        className={`p-4 ${rounded ? 'rounded-lg' : ''}`}
        style={{
          backgroundColor: `${rounded ? currentTheme.colors.sidebar : ''}`,
        }}
      >
        <div className="inline-block">
          <h1
            className={`text-left ${className ? ` ${className}` : 'text-[2.2rem]'}`}
            style={{
              background: 'linear-gradient(to right, rgb(155, 110, 253), rgb(240, 118, 140), rgb(120, 163, 237))',
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
              backgroundClip: 'text',
              color: 'transparent',
              fontFamily: "'Inter var', system-ui, -apple-system, sans-serif",
              fontWeight: 600,
              letterSpacing: '-0.03em',
            }}
          >
            {title}
          </h1>
          <div
            className="mt-1 ml-4"
            style={{
              width: '35px',
              height: '2.5px',
              background: 'linear-gradient(to right, rgb(155, 110, 253), rgb(240, 118, 140))',
              borderRadius: '1px',
            }}
          />
        </div>
      </header>
    </>
  );
};

export default Header; 
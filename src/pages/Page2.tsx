import React from 'react';
import { useTheme } from '../hooks/useTheme';

const Page2: React.FC = () => {
  const { currentTheme } = useTheme();

  return (
    <div
      className="p-5 rounded-lg border font-dm-sans"
      style={{
        backgroundColor: currentTheme.colors.background,
        borderColor: currentTheme.colors.border,
      }}
    >
      <h1 
        className="text-3xl font-bold mb-5 font-dm-sans"
        style={{ color: currentTheme.colors.text }}
      >
        Contenido de la Sección
      </h1>
      
      <p 
        className="text-base leading-relaxed font-dm-sans"
        style={{ color: currentTheme.colors.textSecondary }}
      >
        Esta es la segunda página del dashboard. Aquí puedes agregar contenido diferente al de la primera página.
      </p>
      
      <div className="mt-5 grid grid-cols-1 md:grid-cols-2 gap-4">
        <div 
          className="p-4 rounded-md font-dm-sans"
          style={{ 
            backgroundColor: currentTheme.colors.sidebar,
            border: `1px solid ${currentTheme.colors.border}`
          }}
        >
          <h3 
            className="text-lg font-semibold mb-3 font-dm-sans"
            style={{ color: currentTheme.colors.primary }}
          >
            Sección A
          </h3>
          <p 
            className="text-sm font-dm-sans"
            style={{ color: currentTheme.colors.textSecondary }}
          >
            Contenido de la sección A
          </p>
        </div>
        
        <div 
          className="p-4 rounded-md font-dm-sans"
          style={{ 
            backgroundColor: currentTheme.colors.sidebar,
            border: `1px solid ${currentTheme.colors.border}`
          }}
        >
          <h3 
            className="text-lg font-semibold mb-3 font-dm-sans"
            style={{ color: currentTheme.colors.primary }}
          >
            Sección B
          </h3>
          <p 
            className="text-sm font-dm-sans"
            style={{ color: currentTheme.colors.textSecondary }}
          >
            Contenido de la sección B
          </p>
        </div>
      </div>
    </div>
  );
};

export default Page2; 
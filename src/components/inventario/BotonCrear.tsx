import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { CirclePlusIcon } from '../icons';


interface BotonCrearProps {
  onClick?: () => void;
  texto?: string;
  icono?: React.ReactNode;
}

/**
 * Botón simplificado para crear elementos
 * Eliminados props innecesarios (variant, disabled) para mejor rendimiento
 */
export default function BotonCrear({ 
  onClick, 
  texto = 'Crear Ingrediente', 
}: BotonCrearProps) {
  const { currentTheme } = useTheme();



  return (
        <button
          className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 bg-primary text-primary-foreground hover:bg-primary/90 h-10 px-4 py-2"
          style={{
            backgroundColor: currentTheme.colors.primary,
            color: '#ffffff',
          }}
          onClick={onClick}
        >
          <CirclePlusIcon className="mr-2" />
          {texto}
        </button>
  );
}



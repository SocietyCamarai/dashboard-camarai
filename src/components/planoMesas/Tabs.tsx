import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { PlusIcon } from '../icons';
import type { TabProps } from '../../types/components';

interface TabsProps {
  ambientes: Array<{ id: string; nombre: string }>;
  ambienteActivo: string;
  onAmbienteChange: (id: string) => void;
  onAñadirAmbiente: () => void;
}

const Tab: React.FC<TabProps> = ({ id, nombre, activo, onSelect }) => {
  const { currentTheme } = useTheme();

  return (
    <button
      type="button"
      role="tab"
      aria-selected={activo}
      aria-controls={`content-${id}`}
      data-state={activo ? 'active' : 'inactive'}
      id={`trigger-${id}`}
      className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 data-[state=active]:bg-background data-[state=active]:text-foreground data-[state=active]:shadow-sm`}
      style={{
        backgroundColor: activo ? currentTheme.colors.background : 'transparent',
        color: activo ? currentTheme.colors.text : currentTheme.colors.textSecondary,
        borderColor: currentTheme.colors.border,
      }}
      onClick={() => onSelect(id)}
    >
      {nombre}
    </button>
  );
};

export const Tabs: React.FC<TabsProps> = ({
  ambientes,
  ambienteActivo,
  onAmbienteChange,
  onAñadirAmbiente
}) => {
  const { currentTheme } = useTheme();

  return (
    <div className="flex items-center gap-2 mb-4">
      <div
        role="tablist"
        aria-orientation="horizontal"
        className="inline-flex h-10 items-center justify-center rounded-md bg-muted p-1 text-muted-foreground"
        style={{
          backgroundColor: currentTheme.colors.border + '20',
        }}
      >
        {ambientes.map((ambiente) => (
          <Tab
            key={ambiente.id}
            id={ambiente.id}
            nombre={ambiente.nombre}
            activo={ambienteActivo === ambiente.id}
            onSelect={onAmbienteChange}
          />
        ))}
      </div>
      
      <button
        className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-10 w-10"
        style={{
          borderColor: currentTheme.colors.border,
          backgroundColor: currentTheme.colors.background,
          color: currentTheme.colors.text,
        }}
        onClick={onAñadirAmbiente}
        title="Añadir ambiente"
      >
        <PlusIcon className="h-4 w-4" />
      </button>
    </div>
  );
}; 
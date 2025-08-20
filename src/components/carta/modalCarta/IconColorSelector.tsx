import React, { useState, useEffect, useMemo } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import {
  UtensilsIcon,
  MicIcon,
  CoffeeIcon,
  TrashIcon,
  SunIcon,
  SmartphoneIcon,
} from '../../icons';
import type { ICarta } from '../../../types/database.types';

interface IconColorSelectorProps {
  carta: ICarta | null;
  isOpen: boolean;
  onClose: () => void;
  onSave: (carta: ICarta) => void;
  buttonRef?: React.RefObject<HTMLButtonElement>;
}

const iconosDisponibles = [
  { id: 'utensils', nombre: 'Cubiertos', icon: UtensilsIcon },
  { id: 'mic', nombre: 'Micrófono', icon: MicIcon },
  { id: 'coffee', nombre: 'Café', icon: CoffeeIcon },
  { id: 'trash', nombre: 'Basura', icon: TrashIcon },
  { id: 'sun', nombre: 'Terraza', icon: SunIcon },
  { id: 'smartphone', nombre: 'Empresa', icon: SmartphoneIcon }
];

const coloresDisponibles = [
  { id: 'blue', color: 'rgb(120, 163, 237)', nombre: 'Azul' },
  { id: 'purple', color: 'rgb(155, 110, 253)', nombre: 'Morado' },
  { id: 'pink', color: 'rgb(240, 118, 140)', nombre: 'Rosa' },
  { id: 'orange', color: 'rgb(247, 183, 49)', nombre: 'Naranja' },
  { id: 'green', color: 'rgb(76, 175, 80)', nombre: 'Verde' },
  { id: 'indigo', color: 'rgb(33, 150, 243)', nombre: 'Índigo' }
];

const IconColorSelector: React.FC<IconColorSelectorProps> = ({
  carta,
  isOpen,
  onClose,
  onSave,
  buttonRef
}) => {
  const { currentTheme } = useTheme();
  const [iconoSeleccionado, setIconoSeleccionado] = useState(carta?.icono || 'utensils');
  const [colorSeleccionado, setColorSeleccionado] = useState(carta?.colorBorde || 'rgb(120, 163, 237)');

  useEffect(() => {
    if (carta && isOpen) {
      setIconoSeleccionado(carta.icono || 'utensils');
      setColorSeleccionado(carta.colorBorde || 'rgb(120, 163, 237)');
    }
  }, [carta, isOpen]);

  const modalPosition = useMemo(() => {
    if (!buttonRef?.current || !isOpen) {
      return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    }

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const modalWidth = 320; // max-w-sm equivalent
    const modalHeight = 250; // more realistic height
    const viewportHeight = window.innerHeight;
    const threshold65Percent = viewportHeight * 0.65;

    let top = buttonRect.bottom + 8; // 8px gap below button
    let left = buttonRect.left;

    // Adjust horizontal position if modal would go off screen
    if (left + modalWidth > window.innerWidth) {
      left = window.innerWidth - modalWidth - 16;
    }
    if (left < 16) {
      left = 16;
    }

    // Improved vertical positioning logic
    // If button is below 65% of viewport height OR modal would go below viewport
    if (buttonRect.top > threshold65Percent || top + modalHeight > viewportHeight - 16) {
      // Show above button with proper spacing
      top = buttonRect.top - modalHeight - 8;

      // Ensure modal doesn't go above viewport
      if (top < 16) {
        top = 16;
      }
    }

    return { top: `${top}px`, left: `${left}px` };
  }, [buttonRef, isOpen]);

  if (!isOpen || !carta) return null;

  const handleIconChange = (nuevoIcono: string) => {
    setIconoSeleccionado(nuevoIcono);
    if (carta) {
      const cartaActualizada: ICarta = {
        ...carta,
        icono: nuevoIcono,
        colorBorde: colorSeleccionado
      };
      onSave(cartaActualizada);
    }
  };

  const handleColorChange = (nuevoColor: string) => {
    setColorSeleccionado(nuevoColor);
    if (carta) {
      const cartaActualizada: ICarta = {
        ...carta,
        icono: iconoSeleccionado,
        colorBorde: nuevoColor
      };
      onSave(cartaActualizada);
    }
  };

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div
      className="fixed inset-0 z-50"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
      onClick={handleBackdropClick}
    >
      <div
        className="absolute bg-white rounded-lg shadow-xl w-80 p-5"
        style={{
          backgroundColor: currentTheme.colors.sidebar,
          ...modalPosition
        }}
        onClick={(e) => e.stopPropagation()}
      >
        {/* <div className="flex justify-between items-center mb-4">
          <h3 className="text-lg font-semibold" style={{ color: currentTheme.colors.text }}>
            Personalizar Carta
          </h3>
          <button
            onClick={onClose}
            className="p-1 rounded"
            style={{ color: currentTheme.colors.textSecondary }}
          >
            <XIcon size={20} />
          </button>
        </div> */}

        <div className="mb-2">
          <h4 className="text-sm font-medium mb-2" style={{ color: currentTheme.colors.text }}>
            Icono
          </h4>
          <div className="grid grid-cols-6 gap-2">
            {iconosDisponibles.map((icono) => {
              const IconComponent = icono.icon;
              const isSelected = iconoSeleccionado === icono.id;
              return (
                <button
                  key={icono.id}
                  onClick={() => handleIconChange(icono.id)}
                  className={`p-2 rounded border flex items-center justify-center ${isSelected ? 'border-blue-500 bg-blue-100' : 'border-gray-300'
                    }`}
                  style={{
                    borderColor: isSelected ? currentTheme.colors.primary : currentTheme.colors.border,
                    backgroundColor: isSelected ? currentTheme.colors.primary : 'transparent'

                  }}
                >
                  <IconComponent
                    size={16}
                    style={{
                      color: isSelected ? currentTheme.colors.sidebar : currentTheme.colors.text

                    }}
                  />
                </button>
              );
            })}
          </div>
        </div>

        <div className="mb-6">
          <h4 className="text-sm font-medium mb-2" style={{ color: currentTheme.colors.text }}>
            Color
          </h4>
          <div className="grid grid-cols-6 gap-2">
            {coloresDisponibles.map((color) => {
              const isSelected = colorSeleccionado === color.color;
              return (
                <button
                  key={color.id}
                  onClick={() => handleColorChange(color.color)}
                  className="w-8 h-8 rounded-full"
                  style={{
                    backgroundColor: color.color,
                    border: isSelected ? `2px solid ${currentTheme.colors.primary}` : 'none'
                  }}
                />
              );
            })}
          </div>
        </div>

        {/* <div className="flex justify-end">
          <button
            onClick={onClose}
            className="px-4 py-2 border rounded"
            style={{ 
              borderColor: currentTheme.colors.border,
              color: currentTheme.colors.text
            }}
          >
            Cerrar
          </button>
        </div> */}
      </div>
    </div>
  );
};

export default IconColorSelector;

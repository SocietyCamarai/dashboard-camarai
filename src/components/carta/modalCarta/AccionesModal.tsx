import React from 'react';
import { useTheme } from '../../../hooks/useTheme';
import { TrashIcon, CopyIcon } from '../../icons';
import type { ICarta } from '../../../types/database.types';

interface AccionesModalProps {
  carta: ICarta | null;
  isOpen: boolean;
  onClose: () => void;
  onGestionar: (carta: ICarta) => void;
  onDuplicar: (carta: ICarta) => void;
  onEliminar: (carta: ICarta) => void;
  buttonRef?: React.RefObject<HTMLButtonElement>;
}

const AccionesModal: React.FC<AccionesModalProps> = ({
  carta,
  isOpen,
  onClose,
  onGestionar,
  onDuplicar,
  onEliminar,
  buttonRef
}) => {
  const { currentTheme } = useTheme();

  if (!isOpen || !carta) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const getModalPosition = () => {
    if (!buttonRef?.current) {
      return { top: '50%', left: '50%', transform: 'translate(-50%, -50%)' };
    }

    const buttonRect = buttonRef.current.getBoundingClientRect();
    const modalWidth = 0;
    const modalHeight = 0;

    let top = buttonRect.bottom + 8;
    let left = buttonRect.left;

    if (left + modalWidth > window.innerWidth) {
      left = window.innerWidth - modalWidth - 16;
    }
    if (left < 16) {
      left = 16;
    }

    if (top + modalHeight > window.innerHeight) {
      top = buttonRect.top - modalHeight - 8;
    }

    return { top: `${top}px`, left: `${left}px` };
  };

  const modalPosition = getModalPosition();

  const handleGestionar = () => {
    onGestionar(carta);
    onClose();
  };

  const handleDuplicar = () => {
    onDuplicar(carta);
    onClose();
  };

  const handleEliminar = () => {
    onEliminar(carta);
    onClose();
  };

  const [isHovered, setIsHovered] = React.useState(false);

  return (
    <div
      className="fixed inset-0 z-50"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.1)' }}
      onClick={handleBackdropClick}
    >
      <div
        className="absolute bg-white rounded-lg shadow-xl w-48 py-2"
        style={{
          backgroundColor: currentTheme.colors.sidebar,
          border: `1px solid ${currentTheme.colors.border}`,
          ...modalPosition
        }}
      >
        <div className="px-3 py-2 border-b" style={{ borderColor: currentTheme.colors.border }}>
          <h4 className="text-sm font-medium" style={{ color: currentTheme.colors.text }}>
            Acciones
          </h4>
        </div>

        <div className="py-1">
          <button
            onClick={handleGestionar}
            className={`w-full px-3 py-2 text-left text-sm flex items-center gap-2 transition-colors ${isHovered ? 'bg-[color]' : 'hover:bg-gray-50'
              }`}
            style={{ color: currentTheme.colors.text }}
            onMouseEnter={() => setIsHovered(true)}
            onMouseLeave={() => setIsHovered(false)}
          >
            {/* contenido */}
          </button>

          <button
            onClick={handleDuplicar}
            disabled
            className="w-full px-3 py-2 text-left text-sm flex items-center gap-2 opacity-50 cursor-not-allowed"
            style={{ color: currentTheme.colors.textSecondary }}
          >
            <CopyIcon size={16} />
            Duplicar (Próximamente)
          </button>

          <button
            onClick={handleEliminar}
            className="w-full px-3 py-2 text-left text-sm flex items-center gap-2 hover:bg-red-50 transition-colors"
            style={{ color: currentTheme.colors.error }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${currentTheme.colors.error}10`;
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = 'transparent';
            }}
          >
            <TrashIcon size={16} />
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default AccionesModal;

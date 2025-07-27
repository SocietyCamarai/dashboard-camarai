import React from 'react';
import { useTheme } from '../../hooks/useTheme';

interface ConfirmarEliminacionModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  nombreAmbiente: string;
}

const ConfirmarEliminacionModal: React.FC<ConfirmarEliminacionModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  nombreAmbiente
}) => {
  const { currentTheme } = useTheme();
  

  
  if (!isOpen) return null;

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleConfirm = () => {
    onConfirm();
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 backdrop-blur-[1px] flex items-center justify-center z-50 p-4"
      style={{ backgroundColor: 'rgba(0, 0, 0, 0.5)' }}
      onClick={handleBackdropClick}
    >
      <div className="rounded-lg shadow-xl max-w-lg p-6" style={{ backgroundColor: currentTheme.colors.sidebar }}>
        {/* Header */}
        <div className="mb-4">
          <h3 className="text-lg font-semibold" style={{ color: currentTheme.colors.text }}>
            ¿Estás seguro que quieres eliminar este ambiente?
          </h3>
        </div>

        {/* Content */}
        <div className="mb-6">
          <p className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>
            Esta acción no se puede deshacer. Esto eliminará permanentemente el ambiente{' '}
            <span className="font-medium" style={{ color: currentTheme.colors.text }}>"{nombreAmbiente}"</span> y todas sus mesas.
          </p>
        </div>

        {/* Actions */}
        <div className="flex justify-end space-x-3">
          <button
            onClick={onClose}
            className="px-4 py-2 text-sm font-medium border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 hover:scale-[1.02]"
            style={{ 
              color: currentTheme.colors.textSecondary,
              backgroundColor: currentTheme.colors.background,
              borderColor: currentTheme.colors.border,
              transition: 'all 0.2s ease-in-out'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${currentTheme.colors.primary || '#3b82f6'}10`;
              e.currentTarget.style.borderColor = currentTheme.colors.primary || '#3b82f6';
              e.currentTarget.style.color = currentTheme.colors.primary || '#3b82f6';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = currentTheme.colors.background || '#ffffff';
              e.currentTarget.style.borderColor = currentTheme.colors.border || '#e5e7eb';
              e.currentTarget.style.color = currentTheme.colors.textSecondary || '#6b7280';
            }}
          >
            Cancelar
          </button>
          <button
            onClick={handleConfirm}
            className="px-4 py-2 text-sm font-medium border border-transparent rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2 transition-all duration-200 hover:scale-[1.02]"
            style={{ 
              color: currentTheme.colors.white,
              backgroundColor: currentTheme.colors.error,
              transition: 'all 0.2s ease-in-out'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = `${currentTheme.colors.error || '#ef4444'}dd`;
              e.currentTarget.style.transform = 'scale(1.02)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = currentTheme.colors.error || '#ef4444';
              e.currentTarget.style.transform = 'scale(1)';
            }}
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmarEliminacionModal; 
import React, { useRef, useEffect, useState } from 'react';
import { useTheme } from '../../hooks/useTheme';

interface AccionesSubmenuProps {
  isOpen: boolean;
  onClose: () => void;
  selectedItems: any[];
  onEdit?: (item: any) => void;
  onDelete?: (items: any[]) => void;
  showEdit?: boolean;
  showDelete?: boolean;
  position?: { x: number; y: number };
}

export default function AccionesSubmenu({
  isOpen,
  onClose,
  selectedItems,
  onEdit,
  onDelete,
  showEdit = true,
  showDelete = true,
  position = { x: 0, y: 0 }
}: AccionesSubmenuProps) {
  const { currentTheme } = useTheme();
  const submenuRef = useRef<HTMLDivElement>(null);
  const [isVisible, setIsVisible] = useState(false);

  // Animación de aparición suave
  useEffect(() => {
    if (isOpen) {
      setTimeout(() => setIsVisible(true), 10);
    } else {
      setIsVisible(false);
    }
  }, [isOpen]);

  // Manejar eventos para cerrar el submenu
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (submenuRef.current && !submenuRef.current.contains(event.target as Node)) {
        onClose();
      }
    };

    const handleEscape = (event: KeyboardEvent) => {
      if (event.key === 'Escape' && isOpen) {
        onClose();
      }
    };

    if (isOpen) {
      document.addEventListener('mousedown', handleClickOutside);
      document.addEventListener('keydown', handleEscape);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
      document.removeEventListener('keydown', handleEscape);
    };
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  const handleEdit = () => {
    if (selectedItems.length === 1 && onEdit) {
      onEdit(selectedItems[0]);
      onClose();
    }
  };

  const handleDelete = () => {
    if (selectedItems.length > 0 && onDelete) {
      onDelete(selectedItems);
      onClose();
    }
  };

  const canEdit = selectedItems.length === 1 && showEdit;
  const canDelete = selectedItems.length > 0 && showDelete;

  return (
    <div 
      ref={submenuRef}
      className={`fixed z-50 min-w-48 rounded-lg shadow-lg border transition-all duration-200 ${
        isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
      }`}
      style={{
        backgroundColor: currentTheme.colors.sidebar,
        borderColor: currentTheme.colors.border,
        left: position.x,
        top: position.y + 8,
        boxShadow: '0 10px 25px rgba(0, 0, 0, 0.1), 0 4px 6px rgba(0, 0, 0, 0.05)',
        transformOrigin: 'top left'
      }}
    >
      {/* Header con contador */}
      <div 
        className="px-3 py-2 border-b text-xs font-medium"
        style={{ 
          borderColor: currentTheme.colors.border,
          color: currentTheme.colors.textSecondary 
        }}
      >
        {selectedItems.length === 1 
          ? '1 elemento seleccionado'
          : `${selectedItems.length} elementos seleccionados`
        }
      </div>

      {/* Opciones */}
      <div className="py-1">
        {/* Opción Editar */}
        {showEdit && (
          <button
            onClick={handleEdit}
            disabled={!canEdit}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm text-left transition-colors ${
              canEdit 
                ? 'hover:bg-blue-50 dark:hover:bg-blue-900/20 text-blue-600 dark:text-blue-400' 
                : 'opacity-50 cursor-not-allowed'
            }`}
            style={{
              color: canEdit ? undefined : currentTheme.colors.textSecondary
            }}
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            <span>Editar</span>
          </button>
        )}

        {/* Opción Eliminar */}
        {showDelete && (
          <button
            onClick={handleDelete}
            disabled={!canDelete}
            className={`w-full flex items-center gap-3 px-3 py-2 text-sm text-left transition-colors ${
              canDelete 
                ? 'hover:bg-red-50 dark:hover:bg-red-900/20 text-red-600 dark:text-red-400' 
                : 'opacity-50 cursor-not-allowed'
            }`}
            style={{
              color: canDelete ? undefined : currentTheme.colors.textSecondary
            }}
          >
            <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
            </svg>
            <span>
              Eliminar {selectedItems.length > 1 ? `(${selectedItems.length})` : ''}
            </span>
          </button>
        )}
      </div>
    </div>
  );
}
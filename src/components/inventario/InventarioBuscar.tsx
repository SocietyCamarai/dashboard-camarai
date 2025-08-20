import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';

interface InventarioBuscarProps {
  placeholder?: string;
  onSearch?: (value: string) => void;
  value?: string;
  onChange?: (value: string) => void;
  className?: string;
}

export default function InventarioBuscar({ 
  placeholder = 'Buscar ingrediente...', 
  onSearch,
  value,
  onChange,
  className = ''
}: InventarioBuscarProps) {
  const { currentTheme } = useTheme();
  const [searchValue, setSearchValue] = useState(value || '');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = e.target.value;
    setSearchValue(newValue);
    onChange?.(newValue);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSearch?.(searchValue);
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      onSearch?.(searchValue);
    }
  };

  return (
    <form onSubmit={handleSubmit} className={`relative ${className}`}>
      <div className="relative">
        {/* Icono de búsqueda */}
        <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
          <svg 
            className="h-5 w-5" 
            style={{ color: currentTheme.colors.textSecondary }}
            fill="none" 
            viewBox="0 0 24 24" 
            stroke="currentColor"
          >
            <path 
              strokeLinecap="round" 
              strokeLinejoin="round" 
              strokeWidth={2} 
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" 
            />
          </svg>
        </div>
        
        {/* Input de búsqueda */}
        <input
          type="text"
          value={searchValue}
          onChange={handleInputChange}
          onKeyDown={handleKeyDown}
          placeholder={placeholder}
          style={{
            backgroundColor: currentTheme.colors.background,
            borderColor: currentTheme.colors.border,
            color: currentTheme.colors.text
          }}
          className="
            block w-full pl-10 pr-3 py-2.5
            border rounded-lg
            focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
            transition-all duration-200
            text-sm max-w-80
          "
        />
        
        {/* Botón de limpiar (aparece cuando hay texto) */}
        {searchValue && (
          <button
            type="button"
            onClick={() => {
              setSearchValue('');
              onChange?.('');
              onSearch?.('');
            }}
            style={{ color: currentTheme.colors.textSecondary }}
            className="absolute inset-y-0 right-0 pr-3 flex items-center hover:opacity-70 transition-colors"
          >
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        )}
      </div>
    </form>
  );
}
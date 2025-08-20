import React, { useState, useEffect, useRef } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import { SearchIcon, ChevronDownIcon, CheckIcon } from '../../icons';

interface DropdownOption {
    value: string;
    label: string;
    category?: string;
}

interface CustomDropdownProps {
    options: DropdownOption[] | { [category: string]: string[] };
    selectedValues: string[];
    onSelectionChange: (values: string[]) => void;
    placeholder?: string;
    searchable?: boolean;
    multiSelect?: boolean;
    maxSelections?: number;
    className?: string;
    error?: string;
}

const CustomDropdown: React.FC<CustomDropdownProps> = ({
    options,
    selectedValues,
    onSelectionChange,
    placeholder = 'Seleccionar...',
    searchable = true,
    multiSelect = true,
    maxSelections,
    className = '',
    error
}) => {
    const { currentTheme } = useTheme();
    const [isOpen, setIsOpen] = useState(false);
    const [searchTerm, setSearchTerm] = useState('');
    const dropdownRef = useRef<HTMLDivElement>(null);

    // Normalizar opciones a formato estándar
    const normalizedOptions: DropdownOption[] = Array.isArray(options)
        ? options
        : Object.entries(options).flatMap(([category, items]) =>
            items.map(item => ({ value: item, label: item, category }))
        );

    // Filtrar opciones por búsqueda
    const filteredOptions = searchable && searchTerm
        ? normalizedOptions.filter(option =>
            option.label.toLowerCase().includes(searchTerm.toLowerCase())
        )
        : normalizedOptions;

    // Agrupar opciones por categoría
    const groupedOptions = filteredOptions.reduce((acc, option) => {
        const category = option.category || 'Sin categoría';
        if (!acc[category]) acc[category] = [];
        acc[category].push(option);
        return acc;
    }, {} as { [key: string]: DropdownOption[] });

    // Manejar selección/deselección
    const toggleSelection = (value: string) => {
        if (!multiSelect) {
            onSelectionChange([value]);
            setIsOpen(false);
            return;
        }

        const isSelected = selectedValues.includes(value);
        let newSelection: string[];

        if (isSelected) {
            newSelection = selectedValues.filter(v => v !== value);
        } else {
            if (maxSelections && selectedValues.length >= maxSelections) {
                return; // No permitir más selecciones
            }
            newSelection = [...selectedValues, value];
        }

        onSelectionChange(newSelection);
    };

    // Cerrar dropdown al hacer clic fuera
    useEffect(() => {
        const handleClickOutside = (event: MouseEvent) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
                setIsOpen(false);
                setSearchTerm('');
            }
        };

        if (isOpen) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [isOpen]);

    return (
        <div ref={dropdownRef} className={`relative ${className}`}>
            {/* Selector principal */}
            <div
                className={`min-h-[42px] border rounded-lg px-3 py-2 cursor-pointer transition-colors ${error ? 'border-red-500' : 'hover:border-purple-400'
                    }`}
                style={{
                    backgroundColor: currentTheme.colors.background,
                    borderColor: error ? '#ef4444' : currentTheme.colors.border,
                    color: currentTheme.colors.text
                }}
                onClick={() => setIsOpen(!isOpen)}
            >
                {selectedValues.length > 0 ? (
                    <div className="flex flex-wrap gap-1">
                        {selectedValues.map(value => {
                            const option = normalizedOptions.find(opt => opt.value === value);
                            const displayText = option ? option.label : value;
                            return (
                                <span
                                    key={value}
                                    className="inline-flex items-center gap-1 px-2 py-1 bg-purple-100 text-purple-800 text-xs rounded-md"
                                >
                                    {displayText}
                                    {multiSelect && (
                                        <button
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleSelection(value);
                                            }}
                                            className="hover:bg-purple-200 rounded-full p-0.5"
                                        >
                                            <ChevronDownIcon className="w-3 h-3" />
                                        </button>
                                    )}
                                </span>
                            );
                        })}
                    </div>
                ) : (
                    <span style={{ color: currentTheme.colors.textSecondary }}>
                        {placeholder}
                    </span>
                )}

                {/* Icono de flecha */}
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2">
                    <ChevronDownIcon
                        className={`w-4 h-4 transition-transform ${isOpen ? 'rotate-180' : ''}`}
                    />
                </div>
            </div>

            {/* Dropdown */}
            {isOpen && (
                <div
                    className="absolute z-50 w-full mt-1 border rounded-lg shadow-lg max-h-64 overflow-y-auto"
                    style={{
                        backgroundColor: currentTheme.colors.background,
                        borderColor: currentTheme.colors.border
                    }}
                >
                    {/* Barra de búsqueda */}
                    {searchable && (
                        <div className="p-2 border-b" style={{ borderColor: currentTheme.colors.border }}>
                            <div className="relative">
                                <SearchIcon
                                    className="absolute left-2 top-1/2 transform -translate-y-1/2 text-gray-400"
                                    size={16}
                                />
                                <input
                                    type="text"
                                    placeholder="Buscar..."
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="w-full pl-8 pr-2 py-1 text-sm focus:outline-none hover:border-current"
                                    style={{
                                        backgroundColor: currentTheme.colors.background,
                                        color: currentTheme.colors.text
                                    }}
                                    onClick={(e) => e.stopPropagation()}
                                />
                            </div>
                        </div>
                    )}

                    {/* Opciones agrupadas */}
                    {Object.entries(groupedOptions).map(([category, categoryOptions]) => (
                        <div key={category}>
                            {Object.keys(groupedOptions).length > 1 && (
                                <div
                                    className="px-3 py-2 text-xs font-semibold"
                                    style={{
                                        color: currentTheme.colors.textSecondary,
                                        backgroundColor: currentTheme.colors.background
                                    }}
                                >
                                    {category}
                                </div>
                            )}
                            {categoryOptions.map(option => {
                                const isSelected = selectedValues.includes(option.value);
                                const isDisabled = maxSelections && !isSelected && selectedValues.length >= maxSelections;

                                return (
                                    <div
                                        key={option.value}
                                        className={`px-3 py-2 text-sm cursor-pointer transition-colors ${isDisabled ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-100 dark:hover:bg-gray-600/10'
                                            } ${isSelected ? 'bg-purple-50 dark:bg-purple-900/10' : ''}`}
                                        style={{ color: currentTheme.colors.text }}
                                        onClick={() => !isDisabled && toggleSelection(option.value)}
                                    >
                                        <div className="flex items-center justify-between">
                                            <span>{option.label}</span>
                                            {isSelected && (
                                                <CheckIcon className="w-4 h-4 text-purple-600" />
                                            )}
                                        </div>
                                    </div>
                                );
                            })}
                        </div>
                    ))}

                    {filteredOptions.length === 0 && (
                        <div className="px-3 py-4 text-sm text-center" style={{ color: currentTheme.colors.textSecondary }}>
                            No se encontraron opciones
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default CustomDropdown;

import React, { useState, useMemo, useEffect, useRef, useCallback } from 'react';
import { MoreHorizontal, AlertIcon } from '../icons';
import { useTheme } from '../../hooks/useTheme';
import InventarioBuscar from './InventarioBuscar';
import BotonCrear from './BotonCrear';
import InventarioPagination from './InventarioPagination';

interface ContenedorInventarioProps {
  headers: string[];
  data: any[];
  searchPlaceholder?: string;
  createButtonText?: string;
  onCreateClick?: () => void;
  onRowClick?: (item: any) => void;
  itemsPerPage?: number;
  onSelectionChange?: (selectedItems: any[]) => void;
  onEdit?: (item: any) => void;
  onDelete?: (items: any[]) => void;
}

export default function ContenedorInventario({
  headers,
  data,
  searchPlaceholder = 'Buscar...',
  createButtonText = 'Crear Producto',
  onCreateClick,
  onRowClick,
  itemsPerPage = 10,
  onSelectionChange,
  onEdit,
  onDelete
}: ContenedorInventarioProps) {
  const { currentTheme, isDarkTheme } = useTheme();
  const isCurrentThemeDark = isDarkTheme(currentTheme);
  const [searchTerm, setSearchTerm] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedItems, setSelectedItems] = useState<Set<number>>(new Set());
  const [selectAll, setSelectAll] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<number | null>(null);
  const [openSelectionDropdown, setOpenSelectionDropdown] = useState(false);
  const [dropdownPosition, setDropdownPosition] = useState<{ [key: number]: { right: string, left?: string, top: string } }>({});
  const [selectionDropdownPosition, setSelectionDropdownPosition] = useState<{ right: string, left?: string, top: string }>({ right: '-8px', top: 'calc(100% + 8px)' });

  const dropdownRefs = useRef<{ [key: number]: HTMLDivElement | null }>({});
  const selectionDropdownRef = useRef<HTMLDivElement | null>(null);

  // Función para calcular la posición óptima del dropdown
  const calculateDropdownPosition = useCallback((buttonElement: HTMLElement) => { //dropdownElement: HTMLElement
    const buttonRect = buttonElement.getBoundingClientRect();
    // const dropdownRect = dropdownElement.getBoundingClientRect();
    const viewportWidth = window.innerWidth;
    const viewportHeight = window.innerHeight;




    let position = {
      right: '-8px',
      left: undefined as string | undefined,
      top: 'calc(100% + 8px)'
    };

    // Verificar si el dropdown se sale por la derecha
    if (buttonRect.right - 160 < 0) {
      // Si se sale por la derecha, posicionarlo a la izquierda del botón
      position.right = '';
      position.left = '-8px';
    } else if (buttonRect.left + 160 > viewportWidth) {
      // Si se sale por la derecha del viewport, ajustar hacia la izquierda
      const overflow = (buttonRect.left + 160) - viewportWidth;
      position.right = `${-8 + overflow + 20}px`;
    }

    // Verificar si el dropdown se sale por abajo
    if (buttonRect.bottom + 120 > viewportHeight) {
      // Si se sale por abajo, posicionarlo arriba del botón
      position.top = 'auto';
      position = { ...position, bottom: 'calc(100% + 8px)' } as any;
    }

    return position;
  }, []);

  // Filtrar datos basado en el término de búsqueda
  const filteredData = useMemo(() => {
    if (!searchTerm) return data;

    return data.filter(item =>
      Object.values(item).some(value =>
        String(value).toLowerCase().includes(searchTerm.toLowerCase())
      )
    );
  }, [data, searchTerm]);

  // Calcular datos paginados
  const totalPages = Math.ceil(filteredData.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const paginatedData = filteredData.slice(startIndex, startIndex + itemsPerPage);

  // Resetear página cuando cambia la búsqueda
  React.useEffect(() => {
    setCurrentPage(1);
  }, [searchTerm]);

  // Manejar cambios en la selección
  React.useEffect(() => {
    const selectedData = paginatedData.filter((_, index) => selectedItems.has(index));
    onSelectionChange?.(selectedData);
  }, [selectedItems, paginatedData, onSelectionChange]);

  // Actualizar estado de "seleccionar todo" basado en selecciones individuales
  React.useEffect(() => {
    if (paginatedData.length === 0) {
      setSelectAll(false);
      return;
    }

    const allSelected = paginatedData.every((_, index) => selectedItems.has(index));
    setSelectAll(allSelected);
  }, [selectedItems, paginatedData]);

  // Cerrar dropdowns al hacer clic fuera
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      const target = event.target as Node;
      const dropdownElements = document.querySelectorAll('[data-dropdown]');
      const selectionDropdownElement = document.querySelector('[data-selection-dropdown]');
      let clickedInsideDropdown = false;

      dropdownElements.forEach(element => {
        if (element.contains(target)) {
          clickedInsideDropdown = true;
        }
      });

      if (selectionDropdownElement && selectionDropdownElement.contains(target)) {
        clickedInsideDropdown = true;
      }

      if (!clickedInsideDropdown) {
        setOpenDropdown(null);
        setOpenSelectionDropdown(false);
        setDropdownPosition({});
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Manejar redimensionamiento de ventana para recalcular posiciones
  useEffect(() => {
    const handleResize = () => {
      // Recalcular posiciones de dropdowns abiertos
      if (openDropdown !== null) {
        const buttonElement = document.querySelector(`[data-dropdown]:nth-child(${openDropdown + 1}) button`);
        const dropdownElement = dropdownRefs.current[openDropdown];
        if (buttonElement && dropdownElement) {
          const position = calculateDropdownPosition(buttonElement as HTMLElement);//dropdownElement
          setDropdownPosition(prev => ({
            ...prev,
            [openDropdown]: position
          }));
        }
      }

      if (openSelectionDropdown) {
        const buttonElement = document.querySelector('[data-selection-dropdown] button');
        const dropdownElement = selectionDropdownRef.current;
        if (buttonElement && dropdownElement) {
          const position = calculateDropdownPosition(buttonElement as HTMLElement);//dropdownElement
          setSelectionDropdownPosition(position);
        }
      }
    };

    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [openDropdown, openSelectionDropdown, calculateDropdownPosition]);

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handlePageChange = (page: number) => {
    setCurrentPage(page);
  };

  const handleSelectAll = () => {
    if (selectAll) {
      // Deseleccionar todos los items de la página actual
      const newSelected = new Set(selectedItems);
      paginatedData.forEach((_, index) => {
        newSelected.delete(index);
      });
      setSelectedItems(newSelected);
    } else {
      // Seleccionar todos los items de la página actual
      const newSelected = new Set(selectedItems);
      paginatedData.forEach((_, index) => {
        newSelected.add(index);
      });
      setSelectedItems(newSelected);
    }
  };

  const handleItemSelect = (index: number) => {
    const newSelected = new Set(selectedItems);
    if (newSelected.has(index)) {
      newSelected.delete(index);
    } else {
      newSelected.add(index);
    }
    setSelectedItems(newSelected);
  };

  const handleDropdownToggle = (rowIndex: number, buttonElement?: HTMLElement) => {
    if (openDropdown === rowIndex) {
      setOpenDropdown(null);
      setDropdownPosition(prev => {
        const newPos = { ...prev };
        delete newPos[rowIndex];
        return newPos;
      });
    } else {
      setOpenDropdown(rowIndex);

      // Calcular posición después de que el dropdown se renderice
      setTimeout(() => {
        const dropdownElement = dropdownRefs.current[rowIndex];
        if (buttonElement && dropdownElement) {
          const position = calculateDropdownPosition(buttonElement);//dropdownElement
          setDropdownPosition(prev => ({
            ...prev,
            [rowIndex]: position
          }));
        }
      }, 10);
    }
  };

  const handleSelectionDropdownToggle = (buttonElement?: HTMLElement) => {
    if (openSelectionDropdown) {
      setOpenSelectionDropdown(false);
    } else {
      setOpenSelectionDropdown(true);

      // Calcular posición después de que el dropdown se renderice
      setTimeout(() => {
        const dropdownElement = selectionDropdownRef.current;
        if (buttonElement && dropdownElement) {
          const position = calculateDropdownPosition(buttonElement);//dropdownElement
          setSelectionDropdownPosition(position);
        }
      }, 10);
    }
  };

  const handleAction = (action: string, item: any) => {
    console.log(`${action} para item:`, item);
    setOpenDropdown(null);
    if (action === 'edit' && onEdit) {
      onEdit(item);
    } else if (action === 'delete' && onDelete) {
      onDelete([item]);
    }
  };

  const handleSelectionAction = (action: string) => {
    const selectedData = getSelectedItemsData();
    console.log(`${action} para selección:`, selectedData);
    setOpenSelectionDropdown(false);

    if (action === 'delete' && onDelete && selectedData.length > 0) {
      onDelete(selectedData);
      setSelectedItems(new Set());
      setSelectAll(false);
    }
  };



  // Obtener los items seleccionados actuales
  const getSelectedItemsData = () => {
    return paginatedData.filter((_, index) => selectedItems.has(index));
  };

  // Detectar el tipo de datos basado en las propiedades del primer elemento
  const dataType = useMemo(() => {
    if (data.length === 0) return 'unknown';
    const firstItem = data[0];

    if (firstItem.hasOwnProperty('producto') && firstItem.hasOwnProperty('imagen')) {
      return 'productos';
    } else if (firstItem.hasOwnProperty('categoria') && firstItem.hasOwnProperty('productos')) {
      return 'categorias';
    } else if (firstItem.hasOwnProperty('ingrediente')) {
      return 'ingredientes';
    }
    return 'unknown';
  }, [data]);

  const renderCellContent = (value: any, header: string, item?: any) => {
    if (header === 'Disponible') {
      return (
        <span className="inline-flex px-3 py-[3px] text-xs font-semibold rounded-md" style={{
          backgroundColor: value === 'Sí' || value === 'Si' || value === true ? '#dcfce7' : '#fef2f2',
          color: value === 'Sí' || value === 'Si' || value === true
            ? (isCurrentThemeDark ? '#22c55e' : '#14532d')
            : (isCurrentThemeDark ? '#ef4444' : '#b91c1c'),
          border: value === 'Sí' || value === 'Si' || value === true ? '1px solid #bbf7d0' : '1px solid #fecaca'
        }}>
          {value === 'Sí' || value === 'Si' || value === true ? 'Sí' : 'No'}
        </span>
      );
    }

    if (header === 'Stock' && item) {
      const stockValue = item.stockValue || parseFloat(String(value).split(' ')[0]) || 0;
      const unit = item.unit || String(value).split(' ')[1] || '';

      // Verificar si está en nivel de alerta crítica
      if (item.alert && stockValue <= item.alert) {
        return (
          <div className="relative group">
            <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-md" style={{
              backgroundColor: 'rgba(220, 38, 38, 0.2)',
              color: isCurrentThemeDark ? '#f87171' : '#dc2626'
            }}>
              <AlertIcon className="w-3 h-3 mr-1" />
              {value}
            </span>
            <div className="absolute z-50 hidden group-hover:block px-3 py-2 text-xs rounded-lg shadow-xl border whitespace-nowrap -top-16 left-1/2 transform -translate-x-1/2" style={{
              backgroundColor: currentTheme.colors.sidebar,
              borderColor: currentTheme.colors.border,
              color: currentTheme.colors.text
            }}>
              <div className="text-center">
                <div className="font-semibold mb-1">Alerta de stock mínimo: {item.alert} {unit}</div>

              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent" style={{
                borderTopColor: currentTheme.colors.border
              }}></div>
            </div>
          </div>
        );
      }
      // Verificar si está en nivel de advertencia
      else if (item.warning && stockValue <= item.warning) {
        return (
          <div className="relative group">
            <span className="inline-flex items-center px-2 py-1 text-xs font-semibold rounded-md" style={{
              backgroundColor: 'rgba(251, 146, 60, 0.2)',
              color: isCurrentThemeDark ? '#fb923c' : '#b45309'
            }}>
              <AlertIcon className="w-3 h-3 mr-1" />
              {value}
            </span>
            <div className="absolute z-50 hidden group-hover:block px-3 py-2 text-xs rounded-lg shadow-xl border whitespace-nowrap -top-16 left-1/2 transform -translate-x-1/2" style={{
              backgroundColor: currentTheme.colors.sidebar,
              borderColor: currentTheme.colors.border,
              color: currentTheme.colors.text
            }}>
              <div className="text-center">
                <div className="font-semibold mb-1">Alerta de stock bajo: {item.warning} {unit}</div>

              </div>
              <div className="absolute top-full left-1/2 transform -translate-x-1/2 w-0 h-0 border-l-4 border-r-4 border-t-4 border-transparent" style={{
                borderTopColor: currentTheme.colors.border
              }}></div>
            </div>
          </div>
        );
      }
    }

    // Para Stock sin alertas, aplicar font-semibold también
    if (header === 'Stock') {
      return <span className="font-semibold">{String(value)}</span>;
    }

    // Aplicar semibold a datos principales (no a acciones ni elementos especiales)
    if (header !== 'Acciones' && header !== 'Disponible') {
      return <span className="font-semibold">{String(value)}</span>;
    }

    return String(value);
  };

  return (
    <div className="w-full space-y-4 rounded-2xl p-5"
      style={{ backgroundColor: currentTheme.colors.sidebar }}>
      {/* Header con búsqueda y botón crear */}
      <div className="flex flex-row gap-3 justify-between items-center px-1 pt-4">
        <div className="flex-1 max-w-md">
          <InventarioBuscar
            placeholder={searchPlaceholder}
            onSearch={handleSearch}
            onChange={handleSearch}
          />
        </div>
        <div className="flex gap-2 items-center">
          {/* Botón de acciones masivas - aparece cuando hay elementos seleccionados */}
          {selectedItems.size > 0 && (
            <div data-selection-dropdown className="relative">
              <button
                onClick={(e) => handleSelectionDropdownToggle(e.currentTarget)}
                className="flex items-center gap-2 px-4 py-2 bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors"
              >
                <svg className="w-4 h-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 5v.01M12 12v.01M12 19v.01M12 6a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2zm0 7a1 1 0 110-2 1 1 0 010 2z" />
                </svg>
                Acciones ({selectedItems.size})
              </button>

              {/* Selection Dropdown Menu */}
              {openSelectionDropdown && (
                <div
                  ref={selectionDropdownRef}
                  className="absolute min-w-[200px] rounded-md shadow-lg border z-50"
                  style={{
                    backgroundColor: currentTheme.colors.sidebar,
                    borderColor: currentTheme.colors.border,
                    right: selectionDropdownPosition.right,
                    left: selectionDropdownPosition.left,
                    top: selectionDropdownPosition.top,
                    bottom: (selectionDropdownPosition as any).bottom
                  }}
                >
                  <div className="py-1">
                    <div
                      className="px-3 py-2 text-sm font-medium border-b"
                      style={{
                        color: currentTheme.colors.textSecondary,
                        borderColor: currentTheme.colors.border
                      }}
                    >
                      {selectedItems.size === 1
                        ? '1 elemento seleccionado'
                        : `${selectedItems.size} elementos seleccionados`
                      }
                    </div>
                    <button
                      className="block w-full text-left px-3 py-2 text-sm transition-colors"
                      style={{
                        color: isCurrentThemeDark ? '#f87171' : '#dc2626'
                      }}
                      onMouseEnter={(e) => {
                        e.currentTarget.style.backgroundColor = '#fef2f2';
                      }}
                      onMouseLeave={(e) => {
                        e.currentTarget.style.backgroundColor = 'transparent';
                      }}
                      onClick={() => handleSelectionAction('delete')}
                    >
                      <div className="flex items-center gap-3">
                        <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                        </svg>
                        <span>Eliminar ({selectedItems.size})</span>
                      </div>
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
          <BotonCrear
            texto={createButtonText}
            onClick={onCreateClick}
            icono={
              <svg className="w-5 h-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
              </svg>
            }
          />
        </div>
      </div>

      {/* Tabla */}
      <div className="overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead
              style={{ backgroundColor: currentTheme.colors.sidebar }}
            >
              <tr className="border-b" style={{ borderBottomColor: currentTheme.colors.border }}>
                {/* Checkbox para seleccionar todo */}
                <th
                  style={{ color: currentTheme.colors.textSecondary }}
                  className="px-4 py-2 text-left text-sm font-medium tracking-wider w-12"
                >
                  <input
                    type="checkbox"
                    checked={selectAll}
                    onChange={handleSelectAll}
                    className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 focus:ring-2"
                  />
                </th>
                {headers.map((header, index) => {
                  let widthClass = '';
                  if (header === 'Nombre Categoría' || header === 'PRODUCTO' || header === 'Producto') {
                    widthClass = 'w-1/2';
                  } else if (header === 'Productos' || header === 'CATEGORÍA' || header === 'Categoría') {
                    widthClass = 'w-1/3';
                  } else if (header === 'Acciones') {
                    widthClass = 'w-16';
                  }

                  return (
                    <th
                      key={index}
                      style={{ color: currentTheme.colors.textSecondary }}
                      className={`px-4 py-2 text-left text-sm font-medium tracking-wider ${widthClass}`}
                    >
                      {header}
                    </th>
                  );
                })}
              </tr>
            </thead>
            <tbody
              style={{ borderColor: currentTheme.colors.border }}
            >
              {paginatedData.length > 0 ? (
                paginatedData.map((item, rowIndex) => (
                  <tr
                    key={rowIndex}
                    className="hover:bg-gray-100/20 dark:hover:bg-gray-600/15 transition-colors border-b"
                    style={{ borderBottomColor: currentTheme.colors.border }}
                  >
                    {/* Checkbox individual */}
                    <td
                      style={{ color: currentTheme.colors.text }}
                      className={`px-4 py-3 text-sm w-12 ${selectedItems.has(rowIndex) ? 'bg-purple-50/30 dark:bg-purple-900/10' : ''
                        }`}
                    >
                      <input
                        type="checkbox"
                        checked={selectedItems.has(rowIndex)}
                        onChange={() => handleItemSelect(rowIndex)}
                        className="rounded border-gray-300 text-purple-600 focus:ring-purple-500 focus:ring-2"
                      />
                    </td>
                    {headers.map((header, colIndex) => {
                      // Mapeo inteligente de headers a propiedades del objeto basado en el tipo de datos
                      const getValueForHeader = (header: string, item: any, dataType: string) => {
                        if (dataType === 'productos') {
                          const productMappings: { [key: string]: string } = {
                            'Producto': 'producto',
                            'Categoría': 'categoria',
                            'Precio Venta': 'precioVenta',
                            'Costo Escandallo': 'costoEscandallo',
                            'Margen': 'margen',
                            'Impuesto': 'impuesto',
                            'Disponible': 'disponible',
                            'Acciones': 'acciones'
                          };

                          const mappedKey = productMappings[header];
                          if (mappedKey && item[mappedKey] !== undefined) {
                            return item[mappedKey];
                          }
                        } else if (dataType === 'categorias') {
                          const categoriaMappings: { [key: string]: string } = {
                            'Nombre Categoría': 'categoria',
                            'Productos': 'productos',
                            'Acciones': 'acciones'
                          };

                          const mappedKey = categoriaMappings[header];
                          if (mappedKey && item[mappedKey] !== undefined) {
                            return item[mappedKey];
                          }
                        } else if (dataType === 'ingredientes') {
                          const ingredienteMappings: { [key: string]: string } = {
                            'Ingrediente': 'ingrediente',
                            'Stock': 'stock',
                            'Costo Unitario': 'costoUnitario',
                            'Impuesto': 'impuesto',
                            'Acciones': 'acciones'
                          };

                          const mappedKey = ingredienteMappings[header];
                          if (mappedKey && item[mappedKey] !== undefined) {
                            return item[mappedKey];
                          }
                        }

                        // Fallback genérico
                        const key = header.toLowerCase().replace(/\s+/g, '').replace(/[^a-z0-9]/gi, '');
                        return item[key] || item[header] || '-';
                      };

                      let value = getValueForHeader(header, item, dataType);

                      return (
                        <td
                          key={colIndex}
                          onClick={() => header !== 'Acciones' && onRowClick?.(item)}
                          style={{ color: currentTheme.colors.text }}
                          className={`px-4 py-3 text-sm break-words ${headers[colIndex] === 'Nombre Categoría' || headers[colIndex] === 'PRODUCTO' || headers[colIndex] === 'Producto' ? 'w-1/2' :
                            headers[colIndex] === 'Productos' || headers[colIndex] === 'CATEGORÍA' || headers[colIndex] === 'Categoría' ? 'w-1/3' :
                              headers[colIndex] === 'Acciones' ? 'w-16' : ''
                            } ${onRowClick && header !== 'Acciones' ? 'cursor-pointer' : ''
                            } ${selectedItems.has(rowIndex) ? 'bg-purple-50/30 dark:bg-purple-900/10' : ''
                            }`}
                        >
                          {colIndex === 0 && dataType === 'productos' && item.imagen ? (
                            <div className="flex items-center">
                              <div className="flex-shrink-0 h-8 w-8">
                                <img
                                  style={{ backgroundColor: currentTheme.colors.background }}
                                  className="h-8 w-8 rounded-lg object-cover"
                                  src={item.imagen}
                                  alt={String(value)}
                                  onError={(e) => {
                                    const target = e.target as HTMLImageElement;
                                    target.style.display = 'none';
                                  }}
                                />
                              </div>
                              <div className="ml-3">
                                <div className="font-semibold">{value}</div>
                              </div>
                            </div>
                          ) : header === 'Acciones' ? (
                            <div className="flex justify-end">
                              <div data-dropdown className="relative">
                                <button
                                  onClick={(e) => {
                                    e.stopPropagation();
                                    handleDropdownToggle(rowIndex, e.currentTarget);
                                  }}
                                  className="text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors p-1 rounded "
                                >
                                  <MoreHorizontal className="w-5 h-5" style={{ color: currentTheme.colors.text }} />
                                </button>

                                {/* Individual Item Dropdown Menu */}
                                {openDropdown === rowIndex && (
                                  <div
                                    ref={(el) => {
                                      if (el) {
                                        dropdownRefs.current[rowIndex] = el;
                                      }
                                    }}
                                    className="absolute min-w-[160px] rounded-md shadow-lg border z-50"
                                    style={{
                                      backgroundColor: currentTheme.colors.sidebar,
                                      borderColor: currentTheme.colors.border,
                                      right: dropdownPosition[rowIndex]?.right || '-8px',
                                      left: dropdownPosition[rowIndex]?.left,
                                      top: dropdownPosition[rowIndex]?.top || 'calc(100% + 8px)',
                                      bottom: (dropdownPosition[rowIndex] as any)?.bottom
                                    }}
                                  >
                                    <div className="py-1">
                                      <button
                                        className="block w-full text-left px-3 py-2 text-sm hover:bg-blue-50 dark:hover:bg-blue-900/20 transition-colors text-blue-600 dark:text-blue-400"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleAction('edit', item);
                                        }}
                                      >
                                        <div className="flex items-center gap-3">
                                          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
                                          </svg>
                                          <span>Editar</span>
                                        </div>
                                      </button>
                                      <button
                                        className="block w-full text-left px-3 py-2 text-sm hover:bg-red-50 dark:hover:bg-red-900/20 transition-colors text-red-600 dark:text-red-400"
                                        onClick={(e) => {
                                          e.stopPropagation();
                                          handleAction('delete', item);
                                        }}
                                      >
                                        <div className="flex items-center gap-3">
                                          <svg className="w-4 h-4 flex-shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 7l-.867 12.142A2 2 0 0116.138 21H7.862a2 2 0 01-1.995-1.858L5 7m5 4v6m4-6v6m1-10V4a1 1 0 00-1-1h-4a1 1 0 00-1 1v3M4 7h16" />
                                          </svg>
                                          <span>Eliminar</span>
                                        </div>
                                      </button>
                                    </div>
                                  </div>
                                )}
                              </div>
                            </div>
                          ) : (
                            renderCellContent(value, header, item)
                          )}
                        </td>
                      );
                    })}
                  </tr>
                ))
              ) : (
                <tr>
                  <td
                    colSpan={headers.length + 1}
                    style={{ color: currentTheme.colors.textSecondary }}
                    className="px-4 py-8 text-center"
                  >
                    <div className="flex flex-col items-center">
                      <svg
                        style={{ color: currentTheme.colors.textSecondary }}
                        className="w-10 h-10 mb-3 opacity-50"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={1} d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                      </svg>
                      <p className="text-base font-medium mb-1">No se encontraron resultados</p>
                      <p className="text-xs">Intenta ajustar tu búsqueda o filtros</p>
                    </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* Paginación */}
      {totalPages > 1 && (
        <div className="px-4 pb-4">
          <InventarioPagination
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
            totalItems={filteredData.length}
            itemsPerPage={itemsPerPage}
          />
        </div>
      )}


    </div>
  );
}

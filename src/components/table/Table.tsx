import React, { useState, useEffect } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { ChevronLeft, ChevronRight, MoreHorizontal } from '../icons';

// Tipos para los datos de la tabla
interface OrderData {
  order: string;
  time: string;
  table: string;
  name: string;
  total: string;
  status: 'Completado' | 'En Progreso' | 'Cancelado';
}

interface TableProps {
  data?: OrderData[];
  title?: string;
}

// Datos mockup basados en la imagen
const mockData: OrderData[] = [
  { order: '42', time: '14:30', table: '07', name: 'Alice Smith', total: '€350', status: 'En Progreso' },
  { order: '18', time: '09:45', table: '12', name: 'Michael Johnson', total: '€150', status: 'Cancelado' },
  { order: '33', time: '11:15', table: '09', name: 'Emily Davis', total: '€500', status: 'Completado' },
  { order: '29', time: '16:00', table: '05', name: 'Chris Brown', total: '€250', status: 'Completado' },
  { order: '37', time: '13:00', table: '10', name: 'Sarah Wilson', total: '€400', status: 'Completado' },
];

const Table: React.FC<TableProps> = ({ 
  data = mockData, 
  title = "Comandas Recientes" 
}) => {
  const { currentTheme } = useTheme();
  const [currentPage, setCurrentPage] = useState(1);
  const [selectedOrders, setSelectedOrders] = useState<Set<string>>(new Set());
  const [isAnimating, setIsAnimating] = useState(false);
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [openHeaderDropdown, setOpenHeaderDropdown] = useState(false);
  
  const itemsPerPage = 5;
  const totalPages = Math.ceil(data.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentOrders = data.slice(startIndex, startIndex + itemsPerPage);
  
  // Generar números de página
  const pageNumbers = Array.from({ length: totalPages }, (_, i) => i + 1);
  
  const paginate = (page: number) => {
    if (page < 1 || page > totalPages) return;
    
    setIsAnimating(true);
    // Usar requestIdleCallback si está disponible, sino requestAnimationFrame
    const scheduleCallback = window.requestIdleCallback || requestAnimationFrame;
    scheduleCallback(() => {
      setTimeout(() => {
        setCurrentPage(page);
        setIsAnimating(false);
      }, 150);
    });
  };
  
  const handleSelectOrder = (orderId: string) => {
    const newSelected = new Set(selectedOrders);
    if (newSelected.has(orderId)) {
      newSelected.delete(orderId);
    } else {
      newSelected.add(orderId);
    }
    setSelectedOrders(newSelected);
  };
  
  const handleSelectAll = () => {
    if (selectedOrders.size === currentOrders.length) {
      setSelectedOrders(new Set());
    } else {
      setSelectedOrders(new Set(currentOrders.map(order => order.order)));
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Completado':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'En Progreso':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Cancelado':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  // Cerrar dropdown al hacer clic fuera (optimizado)
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      // Usar requestIdleCallback si está disponible, sino requestAnimationFrame
      const scheduleCallback = window.requestIdleCallback || requestAnimationFrame;
      scheduleCallback(() => {
        const target = event.target as Node;
        const dropdownElements = document.querySelectorAll('[data-dropdown]');
        const headerDropdownElement = document.querySelector('[data-header-dropdown]');
        let clickedInsideDropdown = false;
        
        dropdownElements.forEach(element => {
          if (element.contains(target)) {
            clickedInsideDropdown = true;
          }
        });
        
        if (headerDropdownElement && headerDropdownElement.contains(target)) {
          clickedInsideDropdown = true;
        }
        
        if (!clickedInsideDropdown) {
          setOpenDropdown(null);
          setOpenHeaderDropdown(false);
        }
      });
    };

    document.addEventListener('mousedown', handleClickOutside, { passive: true });
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDropdownToggle = (orderId: string) => {
    // Si el dropdown actual está abierto para esta orden, lo cerramos
    if (openDropdown === orderId) {
      setOpenDropdown(null);
    } else {
      // Si está cerrado o abierto para otra orden, abrimos este
      setOpenDropdown(orderId);
    }
  };

  const handleAction = (_action: string, _orderId: string) => {
    setOpenDropdown(null);
  };

  const handleHeaderDropdownToggle = () => {
    setOpenHeaderDropdown(!openHeaderDropdown);
  };

  const handleHeaderAction = (_action: string) => {
    setOpenHeaderDropdown(false);
  };
  
  const cardBackground = currentTheme.colors.background;
  const cardBorder = currentTheme.colors.border;
  const textColor = currentTheme.colors.text;
  const textSecondaryColor = currentTheme.colors.textSecondary;
  const primaryColor = currentTheme.colors.primary;
  
  return (
    <div 
      className="bg-card rounded-lg border shadow-sm"
      style={{
        backgroundColor: cardBackground,
        borderColor: cardBorder,
      }}
    >
      {/* Header */}
      <div className="flex flex-row items-center justify-between p-6 border-b" style={{ borderColor: cardBorder }}>
        <div>
          <h3 
            className="text-lg font-bold"
            style={{ color: textSecondaryColor }}
          >
            {title}
          </h3>
          <div 
            className="mt-2 h-1 w-8 rounded-sm"
            style={{ backgroundColor: primaryColor }}
          />
        </div>
        <div className="flex gap-2">
          {/* Select de exportación */}
          <div className="relative">
            <select 
              className="w-[180px] px-3 py-2 text-sm border rounded-md appearance-none cursor-pointer"
              style={{
                backgroundColor: cardBackground,
                borderColor: cardBorder,
                color: textColor,
              }}
              defaultValue="csv"
            >
              <option value="csv">Exportar a CSV</option>
              <option value="pdf">Exportar a PDF</option>
              <option value="xlsx">Exportar a XLSX</option>
              <option value="json">Exportar a JSON</option>
            </select>
            <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </div>
          </div>
          
          {/* Botón de más opciones */}
          <div data-header-dropdown className="relative">
            <button
              className="p-2 border rounded-md hover:bg-opacity-10 transition-colors"
              style={{
                borderColor: cardBorder,
                color: textColor,
              }}
              onClick={handleHeaderDropdownToggle}
            >
              <MoreHorizontal className="h-4 w-4" />
            </button>
            
            {/* Header Dropdown Menu */}
            {openHeaderDropdown && (
              <div 
                className="absolute right-0 top-full mt-1 z-50 min-w-[200px] rounded-md shadow-lg border"
                style={{
                  backgroundColor: cardBackground,
                  borderColor: cardBorder,
                }}
              >
                <div className="py-1">
                  <button
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-opacity-10 transition-colors"
                    style={{ color: textColor }}
                    onClick={() => handleHeaderAction('Exportar todo')}
                  >
                    Exportar todo
                  </button>
                  <button
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-opacity-10 transition-colors"
                    style={{ color: textColor }}
                    onClick={() => handleHeaderAction('Exportar selección')}
                  >
                    Exportar selección
                  </button>
                  <button
                    className="block w-full text-left px-3 py-2 text-sm hover:bg-opacity-10 transition-colors"
                    style={{ color: textColor }}
                    onClick={() => handleHeaderAction('Marcar selección como completada')}
                  >
                    Marcar selección como completada
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
      
      {/* Contenido de la tabla */}
      <div className="p-6">
        <table className="w-full">
          <thead>
            <tr 
              className="border-b"
              style={{ borderColor: cardBorder }}
            >
              <th className="w-[40px] text-left pb-2">
                <input
                  type="checkbox"
                  className="w-4 h-4 rounded border-2 cursor-pointer"
                  style={{
                    borderColor: primaryColor,
                    accentColor: primaryColor,
                  }}
                  checked={selectedOrders.size === currentOrders.length && currentOrders.length > 0}
                  onChange={handleSelectAll}
                />
              </th>
              <th className="text-left pb-2 text-sm font-medium" style={{ color: textColor }}>Nº orden</th>
              <th className="text-left pb-2 text-sm font-medium" style={{ color: textColor }}>Hora</th>
              <th className="text-left pb-2 text-sm font-medium" style={{ color: textColor }}>Mesa</th>
              <th className="text-left pb-2 text-sm font-medium" style={{ color: textColor }}>Nombre</th>
              <th className="text-left pb-2 text-sm font-medium" style={{ color: textColor }}>Total</th>
              <th className="text-left pb-2 text-sm font-medium" style={{ color: textColor }}>Estado</th>
              <th className="w-[40px]"></th>
            </tr>
          </thead>
          <tbody
            className={`transition-opacity duration-300 ${
              isAnimating ? 'opacity-0' : 'opacity-100'
            }`}
          >
            {currentOrders.map((order, index) => (
              <tr 
                key={order.order}
                className="border-b transition-colors duration-200 cursor-pointer"
                style={{ 
                  borderColor: cardBorder,
                  backgroundColor: index % 2 === 0 ? 'transparent' : `${cardBorder}10`
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${primaryColor}08`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = index % 2 === 0 ? 'transparent' : `${cardBorder}10`;
                }}
                onClick={() => handleSelectOrder(order.order)}
              >
                <td className="py-3">
                  <input
                    type="checkbox"
                    className="w-4 h-4 rounded border-2 cursor-pointer"
                    style={{
                      borderColor: primaryColor,
                      accentColor: primaryColor,
                    }}
                    checked={selectedOrders.has(order.order)}
                    onChange={() => handleSelectOrder(order.order)}
                    onClick={(e) => e.stopPropagation()}
                  />
                </td>
                <td className="py-2 text-sm font-medium" style={{ color: textColor }}>{order.order}</td>
                <td className="py-2 text-sm" style={{ color: textColor }}>{order.time}</td>
                <td className="py-2 text-sm" style={{ color: textColor }}>{order.table}</td>
                <td className="py-2 text-sm" style={{ color: textColor }}>{order.name}</td>
                <td className="py-2 text-sm" style={{ color: textColor }}>{order.total}</td>
                <td className="py-2">
                  <span 
                    className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium border ${getStatusColor(order.status)}`}
                  >
                    {order.status}
                  </span>
                </td>
                <td className="py-2 relative">
                  <div data-dropdown>
                    <button
                      className="p-1 rounded hover:bg-opacity-10 transition-colors"
                      style={{
                        color: textColor,
                      }}
                      onClick={(e) => {
                        e.stopPropagation();
                        handleDropdownToggle(order.order);
                      }}
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </button>
                    
                    {/* Dropdown Menu */}
                    {openDropdown === order.order && (
                      <div 
                        className="absolute right-0 top-full -mt-3 z-50 min-w-[160px] rounded-md shadow-lg border"
                        style={{
                          backgroundColor: cardBackground,
                          borderColor: cardBorder,
                        }}
                      >
                        <div className="py-1">
                          <div 
                            className="px-3 py-2 text-sm font-medium border-b"
                            style={{ 
                              color: textColor,
                              borderColor: cardBorder 
                            }}
                          >
                            Acciones
                          </div>
                          <button
                            className="block w-full text-left px-3 py-2 text-sm hover:bg-opacity-10 transition-colors"
                            style={{ color: textColor }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAction('Ver detalles', order.order);
                            }}
                          >
                            Ver detalles
                          </button>
                          <button
                            className="block w-full text-left px-3 py-2 text-sm hover:bg-opacity-10 transition-colors"
                            style={{ color: textColor }}
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAction('Descargar PDF', order.order);
                            }}
                          >
                            Descargar PDF
                          </button>
                          <div className="border-t" style={{ borderColor: cardBorder }}></div>
                          <button
                            className="block w-full text-left px-3 py-2 text-sm hover:bg-opacity-10 transition-colors text-red-600"
                            onClick={(e) => {
                              e.stopPropagation();
                              handleAction('Cancelar orden', order.order);
                            }}
                          >
                            Cancelar orden
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      
      {/* Footer con paginación */}
      <div className="flex justify-end items-center gap-2 p-6 border-t" style={{ borderColor: cardBorder }}>
        <button
          className="p-2 border rounded-md hover:bg-opacity-10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            borderColor: cardBorder,
            color: textColor,
          }}
          onClick={() => paginate(currentPage - 1)}
          disabled={currentPage === 1}
        >
          <ChevronLeft className="h-4 w-4" />
        </button>
        
        {pageNumbers.map(number => (
          <button
            key={number}
            className={`p-2 w-8 h-8 flex items-center justify-center border rounded-md transition-colors ${
              currentPage === number 
                ? 'text-white' 
                : 'hover:bg-opacity-10'
            }`}
            style={{
              borderColor: cardBorder,
              backgroundColor: currentPage === number ? primaryColor : 'transparent',
              color: currentPage === number ? 'white' : textColor,
            }}
            onClick={() => paginate(number)}
          >
            {number}
          </button>
        ))}
        
        <button
          className="p-2 border rounded-md hover:bg-opacity-10 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
          style={{
            borderColor: cardBorder,
            color: textColor,
          }}
          onClick={() => paginate(currentPage + 1)}
          disabled={currentPage === totalPages}
        >
          <ChevronRight className="h-4 w-4" />
        </button>
      </div>
    </div>
  );
};

export default Table; 
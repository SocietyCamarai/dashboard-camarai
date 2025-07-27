import React, { useState, useEffect, useRef, useCallback } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import type { FiltersAndExportProps } from '../../../types';

const                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                     FiltersAndExport: React.FC<FiltersAndExportProps> = ({
  onDateRangeChange,
  onExportCSV,
  onExportXLS,
  onExportPDF
}) => {
  const { currentTheme } = useTheme();
  const [showDateDropdown, setShowDateDropdown] = useState(false);
  const [showExportDropdown, setShowExportDropdown] = useState(false);
  const [selectedDateRange, setSelectedDateRange] = useState('Últimos 7 días');
  const [selectedExportType, setSelectedExportType] = useState('CSV');
  const [startDate, setStartDate] = useState<Date | null>(null);
  const [endDate, setEndDate] = useState<Date | null>(null);
  const [currentMonth, setCurrentMonth] = useState(new Date());
  
  const dateDropdownRef = useRef<HTMLDivElement>(null);
  const exportDropdownRef = useRef<HTMLDivElement>(null);
  const dateButtonRef = useRef<HTMLButtonElement>(null);
  const exportButtonRef = useRef<HTMLButtonElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      const target = event.target as Node;
      
      // Verificar si el clic fue en el botón del dropdown de fechas
      if (dateButtonRef.current && dateButtonRef.current.contains(target)) {
        return; // No hacer nada si el clic fue en el botón
      }
      
      // Verificar si el clic fue en el botón del dropdown de exportación
      if (exportButtonRef.current && exportButtonRef.current.contains(target)) {
        return; // No hacer nada si el clic fue en el botón
      }
      
      // Cerrar dropdown de fechas si el clic fue fuera
      if (dateDropdownRef.current && !dateDropdownRef.current.contains(target)) {
        setShowDateDropdown(false);
      }
      
      // Cerrar dropdown de exportación si el clic fue fuera
      if (exportDropdownRef.current && !exportDropdownRef.current.contains(target)) {
        setShowExportDropdown(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleDateRangeChange = (value: string) => {
    setSelectedDateRange(value);
    setShowDateDropdown(false);
    setStartDate(null);
    setEndDate(null);
    onDateRangeChange?.(value);
  };

  const handleDateSelect = (date: Date) => {
    if (!startDate || (startDate && endDate)) {
      // Primera selección o nueva selección
      setStartDate(date);
      setEndDate(null);
    } else {
      // Segunda selección - completar el rango
      if (date < startDate) {
        setEndDate(startDate);
        setStartDate(date);
      } else {
        setEndDate(date);
      }
    }
  };

  const handleApplyDateRange = () => {
    if (startDate && endDate) {
      const rangeText = `${startDate.toLocaleDateString('es-ES')} - ${endDate.toLocaleDateString('es-ES')}`;
      setSelectedDateRange(rangeText);
      setShowDateDropdown(false);
      onDateRangeChange?.(rangeText);
    }
  };

  const handleExport = (type: 'csv' | 'xls' | 'pdf') => {
    setShowExportDropdown(false);
    setSelectedExportType(type.toUpperCase());
    switch (type) {
      case 'csv':
        onExportCSV?.();
        break;
      case 'xls':
        onExportXLS?.();
        break;
      case 'pdf':
        onExportPDF?.();
        break;
    }
  };

  const getCurrentMonthDays = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days = [];
    
    // Agregar días del mes anterior para completar la primera semana
    const firstDayOfWeek = firstDay.getDay();
    for (let i = firstDayOfWeek - 1; i >= 0; i--) {
      const prevDate = new Date(year, month, -i);
      days.push({ date: prevDate, isCurrentMonth: false });
    }
    
    // Agregar días del mes actual
    for (let i = 1; i <= lastDay.getDate(); i++) {
      const date = new Date(year, month, i);
      days.push({ date, isCurrentMonth: true });
    }
    
    // Agregar días del mes siguiente para completar la última semana
    const lastDayOfWeek = lastDay.getDay();
    for (let i = 1; i <= 6 - lastDayOfWeek; i++) {
      const nextDate = new Date(year, month + 1, i);
      days.push({ date: nextDate, isCurrentMonth: false });
    }
    
    return days;
  };

  const formatMonth = (date: Date) => {
    return date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  };

  const isDateInRange = (date: Date) => {
    if (!startDate || !endDate) return false;
    return date >= startDate && date <= endDate;
  };

  const isDateSelected = (date: Date) => {
    if (startDate && date.toDateString() === startDate.toDateString()) return true;
    if (endDate && date.toDateString() === endDate.toDateString()) return true;
    return false;
  };

  const changeMonth = (direction: 'prev' | 'next') => {
    setCurrentMonth(prev => {
      const newMonth = new Date(prev);
      if (direction === 'prev') {
        newMonth.setMonth(newMonth.getMonth() - 1);
      } else {
        newMonth.setMonth(newMonth.getMonth() + 1);
      }
      return newMonth;
    });
  };

  const handleDateDropdownToggle = useCallback(() => {
    setShowDateDropdown(prev => !prev);
    // Cerrar el otro dropdown si está abierto
    setShowExportDropdown(false);
  }, []);

  const handleExportDropdownToggle = useCallback(() => {
    setShowExportDropdown(prev => !prev);
    // Cerrar el otro dropdown si está abierto
    setShowDateDropdown(false);
  }, []);

  return (
    <section 
      className="p-6 rounded-lg"
      style={{
        backgroundColor: currentTheme.colors.sidebar,
      }}
      aria-labelledby="filters-heading"
    >
      <h2 
        id="filters-heading"
        className="text-xl font-semibold mb-4"
        style={{ color: currentTheme.colors.text }}
      >
        Filtros y Reportes
      </h2>
      
      <div className="flex flex-col lg:flex-row gap-6 items-end">
        {/* Filtros de fecha */}
        <div className="flex-1">
          <label 
            htmlFor="date-range"
            className="block text-sm font-medium mb-2"
            style={{ color: currentTheme.colors.text }}
          >
            Rango de fechas
          </label>
          <div className="relative">
            <button
              ref={dateButtonRef}
              type="button"
              className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center justify-between"
              style={{
                backgroundColor: currentTheme.colors.background,
                color: currentTheme.colors.text,
                borderColor: currentTheme.colors.border || '#e5e7eb'
              }}
              onClick={handleDateDropdownToggle}
            >
              <div className="flex items-center gap-2">
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 7V3m8 4V3m-9 8h10M5 21h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v12a2 2 0 002 2z" />
                </svg>
                <span>{selectedDateRange}</span>
              </div>
              <svg className={`w-4 h-4 transition-transform ${showDateDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showDateDropdown && (
              <div 
                className="absolute top-full left-0 mt-1 w-96 rounded-lg shadow-lg z-50" 
                ref={dateDropdownRef}
                style={{
                  backgroundColor: currentTheme.colors.background,
                  border: `1px solid ${currentTheme.colors.border || '#e5e7eb'}`
                }}
              >
                <div className="p-4">
                  <div className="grid grid-cols-2 gap-4">
                    {/* Opciones predefinidas a la izquierda */}
                    <div>
                      <h3 
                        className="font-medium mb-3 text-sm"
                        style={{ color: currentTheme.colors.text }}
                      >
                        Rangos predefinidos
                      </h3>
                      <div className="space-y-2">
                        <button
                          className="w-full text-left px-3 py-2 rounded text-sm transition-colors"
                          style={{
                            color: currentTheme.colors.text,
                            backgroundColor: 'transparent'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = currentTheme.colors.primary + '20';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                          onClick={() => handleDateRangeChange('Últimos 7 días')}
                        >
                          Últimos 7 días
                        </button>
                        <button
                          className="w-full text-left px-3 py-2 rounded text-sm transition-colors"
                          style={{
                            color: currentTheme.colors.text,
                            backgroundColor: 'transparent'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = currentTheme.colors.primary + '20';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                          onClick={() => handleDateRangeChange('Últimos 30 días')}
                        >
                          Últimos 30 días
                        </button>
                        <button
                          className="w-full text-left px-3 py-2 rounded text-sm transition-colors"
                          style={{
                            color: currentTheme.colors.text,
                            backgroundColor: 'transparent'
                          }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = currentTheme.colors.primary + '20';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                          onClick={() => handleDateRangeChange('Últimos 90 días')}
                        >
                          Últimos 90 días
                        </button>
                      </div>
                      
                      {/* Rango personalizado */}
                      {(startDate || endDate) && (
                        <div className="mt-4 pt-4" style={{ borderTop: `1px solid ${currentTheme.colors.border || '#e5e7eb'}` }}>
                          <div 
                            className="text-sm mb-2"
                            style={{ color: currentTheme.colors.textSecondary || currentTheme.colors.text }}
                          >
                            {startDate && `Desde: ${startDate.toLocaleDateString('es-ES')}`}
                            {endDate && ` Hasta: ${endDate.toLocaleDateString('es-ES')}`}
                          </div>
                          <button
                            className="w-full px-3 py-2 rounded text-sm transition-colors"
                            style={{
                              backgroundColor: currentTheme.colors.primary,
                              color: '#ffffff'
                            }}
                            onMouseEnter={(e) => {
                              e.currentTarget.style.backgroundColor = currentTheme.colors.primaryDark || currentTheme.colors.primary;
                            }}
                            onMouseLeave={(e) => {
                              e.currentTarget.style.backgroundColor = currentTheme.colors.primary;
                            }}
                            onClick={handleApplyDateRange}
                            disabled={!startDate || !endDate}
                          >
                            Aplicar rango
                          </button>
                        </div>
                      )}
                    </div>
                    
                    {/* Calendario a la derecha */}
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <button 
                          className="p-1 rounded transition-colors"
                          style={{ color: currentTheme.colors.text }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = currentTheme.colors.primary + '20';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                          onClick={() => changeMonth('prev')}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                          </svg>
                        </button>
                        <span 
                          className="font-medium text-sm"
                          style={{ color: currentTheme.colors.text }}
                        >
                          {formatMonth(currentMonth)}
                        </span>
                        <button 
                          className="p-1 rounded transition-colors"
                          style={{ color: currentTheme.colors.text }}
                          onMouseEnter={(e) => {
                            e.currentTarget.style.backgroundColor = currentTheme.colors.primary + '20';
                          }}
                          onMouseLeave={(e) => {
                            e.currentTarget.style.backgroundColor = 'transparent';
                          }}
                          onClick={() => changeMonth('next')}
                        >
                          <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                          </svg>
                        </button>
                      </div>
                      
                      <div className="grid grid-cols-7 gap-1 text-xs">
                        {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(day => (
                          <div 
                            key={day} 
                            className="p-1 text-center font-medium text-xs"
                            style={{ color: currentTheme.colors.textSecondary || currentTheme.colors.text }}
                          >
                            {day}
                          </div>
                        ))}
                        
                        {getCurrentMonthDays().map(({ date, isCurrentMonth }, index) => (
                          <button
                            key={index}
                            className="p-1 text-center rounded text-xs transition-colors"
                            style={{
                              color: !isCurrentMonth 
                                ? (currentTheme.colors.textSecondary || currentTheme.colors.text) + '50'
                                : isDateSelected(date)
                                  ? '#ffffff'
                                  : isDateInRange(date)
                                    ? currentTheme.colors.primary
                                    : currentTheme.colors.text,
                              backgroundColor: isDateSelected(date)
                                ? currentTheme.colors.primary
                                : isDateInRange(date)
                                  ? currentTheme.colors.primary + '20'
                                  : 'transparent'
                            }}
                            onMouseEnter={(e) => {
                              if (isCurrentMonth && !isDateSelected(date)) {
                                e.currentTarget.style.backgroundColor = currentTheme.colors.primary + '30';
                              }
                            }}
                            onMouseLeave={(e) => {
                              if (!isDateSelected(date) && !isDateInRange(date)) {
                                e.currentTarget.style.backgroundColor = 'transparent';
                              } else if (isDateInRange(date) && !isDateSelected(date)) {
                                e.currentTarget.style.backgroundColor = currentTheme.colors.primary + '20';
                              }
                            }}
                            onClick={() => handleDateSelect(date)}
                          >
                            {date.getDate()}
                          </button>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Exportación */}
        <div className="flex gap-2">
          <div className="relative">
            <button
              ref={exportButtonRef}
              type="button"
              className="px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
              style={{
                backgroundColor: currentTheme.colors.background,
                color: currentTheme.colors.text,
                borderColor: currentTheme.colors.border || '#e5e7eb'
              }}
              onClick={handleExportDropdownToggle}
            >
              <span>Exportar a {selectedExportType}</span>
              <svg className={`w-4 h-4 transition-transform ${showExportDropdown ? 'rotate-180' : ''}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
            
            {showExportDropdown && (
              <div 
                className="absolute top-full right-0 mt-1 rounded-lg shadow-lg z-50 min-w-[150px]" 
                ref={exportDropdownRef}
                style={{
                  backgroundColor: currentTheme.colors.background,
                  border: `1px solid ${currentTheme.colors.border || '#e5e7eb'}`
                }}
              >
                <div className="py-1">
                  <button
                    className="w-full text-left px-4 py-2 transition-colors"
                    style={{
                      color: currentTheme.colors.text,
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = currentTheme.colors.primary + '20';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    onClick={() => handleExport('csv')}
                  >
                    Exportar a CSV
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 transition-colors"
                    style={{
                      color: currentTheme.colors.text,
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = currentTheme.colors.primary + '20';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    onClick={() => handleExport('xls')}
                  >
                    Exportar a XLS
                  </button>
                  <button
                    className="w-full text-left px-4 py-2 transition-colors"
                    style={{
                      color: currentTheme.colors.text,
                      backgroundColor: 'transparent'
                    }}
                    onMouseEnter={(e) => {
                      e.currentTarget.style.backgroundColor = currentTheme.colors.primary + '20';
                    }}
                    onMouseLeave={(e) => {
                      e.currentTarget.style.backgroundColor = 'transparent';
                    }}
                    onClick={() => handleExport('pdf')}
                  >
                    Exportar a PDF
                  </button>
                </div>
              </div>
            )}
          </div>
          
          <button
            type="button"
            className="px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
            style={{
              backgroundColor: currentTheme.colors.background,
              color: currentTheme.colors.text,
              borderColor: currentTheme.colors.border || '#e5e7eb'
            }}
            onClick={() => handleExport(selectedExportType.toLowerCase() as 'csv' | 'xls' | 'pdf')}
          >
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
            </svg>
            <span>Exportar</span>
          </button>
        </div>
      </div>
    </section>
  );
};

export default FiltersAndExport; 
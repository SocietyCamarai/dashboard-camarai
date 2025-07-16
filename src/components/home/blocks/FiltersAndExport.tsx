import React, { useState } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import type { FiltersAndExportProps } from '../../../types';

const FiltersAndExport: React.FC<FiltersAndExportProps> = ({
  onDateRangeChange,
  // onExportCSV,
  // onExportXLS,
  // onExportPDF
}) => {
  const { currentTheme } = useTheme();
  const [showCustomDates, setShowCustomDates] = useState(false);
  const [startDate, setStartDate] = useState('');
  const [endDate, setEndDate] = useState('');

  const handleDateRangeChange = (value: string) => {
    if (value === 'custom') {
      setShowCustomDates(true);
    } else {
      setShowCustomDates(false);
      onDateRangeChange?.(value);
    }
  };

  const handleApplyCustomDates = () => {
    if (startDate && endDate) {
      onDateRangeChange?.(`${startDate} to ${endDate}`);
    }
  };

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
      
      <div className="flex flex-col lg:flex-row gap-6">
        {/* Filtros de fecha */}
        <div className="flex-1">
          <label 
            htmlFor="date-range"
            className="block text-sm font-medium mb-2"
            style={{ color: currentTheme.colors.text }}
          >
            Rango de fechas
          </label>
          <div className="space-y-3">
            <select 
              id="date-range" 
              className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
              style={{
                backgroundColor: currentTheme.colors.background,
                color: currentTheme.colors.text,
                borderColor: currentTheme.colors.border || '#e5e7eb'
              }}
              onChange={(e) => handleDateRangeChange(e.target.value)}
              defaultValue="7"
            >
              <option value="today">Hoy</option>
              <option value="yesterday">Ayer</option>
              <option value="7">Últimos 7 días</option>
              <option value="30">Últimos 30 días</option>
              <option value="thisMonth">Este mes</option>
              <option value="lastMonth">Mes anterior</option>
              <option value="custom">Personalizado</option>
            </select>
            
            {showCustomDates && (
              <div className="flex flex-col sm:flex-row gap-2 items-center w-full">
                <div className="flex flex-row sm:flex-row gap-2 items-center w-full">
                  <input 
                    type="date" 
                    className="flex-1 px-2 sm:px-3 py-1 sm:py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    style={{
                      backgroundColor: currentTheme.colors.background,
                      color: currentTheme.colors.text,
                      borderColor: currentTheme.colors.border || '#e5e7eb'
                    }}
                    aria-label="Fecha inicial"
                    value={startDate}
                    onChange={(e) => setStartDate(e.target.value)}
                  />
                  <span 
                    className="text-center text-sm sm:text-base flex-shrink-0"
                    style={{ color: currentTheme.colors.text }}
                  >
                    -
                  </span>
                  <input 
                    type="date" 
                    className="flex-1 px-2 sm:px-3 py-1 sm:py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 text-sm sm:text-base"
                    style={{
                      backgroundColor: currentTheme.colors.background,
                      color: currentTheme.colors.text,
                      borderColor: currentTheme.colors.border || '#e5e7eb'
                    }}
                    aria-label="Fecha final"
                    value={endDate}
                    onChange={(e) => setEndDate(e.target.value)}
                  />
                </div>
                <button 
                  className="px-3 sm:px-4 py-1 sm:py-2 rounded-md font-medium transition-colors text-sm sm:text-base w-full sm:w-auto flex-shrink-0 mt-2 sm:mt-0"
                  style={{
                    backgroundColor: currentTheme.colors.primary,
                    color: '#ffffff'
                  }}
                  onClick={handleApplyCustomDates}
                >
                  Aplicar
                </button>
              </div>
            )}
          </div>
        </div>

        {/* Exportación */}

      </div>
    </section>
  );
};

export default FiltersAndExport; 
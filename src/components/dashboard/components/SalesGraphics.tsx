import React, { useState, useEffect } from 'react';
import { useTheme } from '../../../hooks/useTheme';
// import TimeRangeSelector from './TimeRangeSelector'; // Comentado: componente no existe
// import SalesChart from './SalesChart'; // Comentado: componente no existe
import type { SalesChartData } from '../types';

interface SalesGraphicsProps {
  initialTimeRange?: string;
}

const SalesGraphics: React.FC<SalesGraphicsProps> = ({
  initialTimeRange = 'horas'
}) => {
  const { currentTheme } = useTheme();
  const [selectedRange] = useState<string>(initialTimeRange);
  const [chartData, setChartData] = useState<SalesChartData | null>(null);
  const [loading, setLoading] = useState(true);

  // Datos mockup más realistas basados en las imágenes
  const mockData: Record<string, SalesChartData> = {
    horas: {
      period: 'horas',
      sales: 1250,
      orders: 45,
      averageTicket: 27.8,
      date: new Date().toISOString(),
      value: 1250,
      label: 'Horas',
      data: [
        { label: '00:00', value: 120 },
        { label: '03:00', value: 80 },
        { label: '06:00', value: 60 },
        { label: '09:00', value: 200 },
        { label: '12:00', value: 0 },
        { label: '15:00', value: 450 },
        { label: '18:00', value: 750 },
        { label: '21:00', value: 600 }
      ],
      totalSales: 2260,
      averageSales: 282.5,
      maxValue: 800
    },
    dias: {
      period: 'dias',
      sales: 8400,
      orders: 120,
      averageTicket: 70.0,
      date: new Date().toISOString(),
      value: 8400,
      label: 'Días',
      data: [
        { label: 'Lun', value: 1200 },
        { label: 'Mar', value: 1800 },
        { label: 'Mié', value: 1500 },
        { label: 'Jue', value: 2200 },
        { label: 'Vie', value: 2800 },
        { label: 'Sáb', value: 3200 },
        { label: 'Dom', value: 2100 }
      ],
      totalSales: 14800,
      averageSales: 2114.29,
      maxValue: 3500
    },
    meses: {
      period: 'meses',
      sales: 45000,
      orders: 850,
      averageTicket: 52.9,
      date: new Date().toISOString(),
      value: 45000,
      label: 'Meses',
      data: [
        { label: 'Ene', value: 45000 },
        { label: 'Feb', value: 52000 },
        { label: 'Mar', value: 48000 },
        { label: 'Abr', value: 55000 },
        { label: 'May', value: 62000 },
        { label: 'Jun', value: 58000 },
        { label: 'Jul', value: 65000 },
        { label: 'Ago', value: 70000 },
        { label: 'Sep', value: 68000 },
        { label: 'Oct', value: 72000 },
        { label: 'Nov', value: 75000 },
        { label: 'Dic', value: 80000 }
      ],
      totalSales: 720000,
      averageSales: 60000,
      maxValue: 85000
    }
  };

  useEffect(() => {
    const loadChartData = async () => {
      setLoading(true);
      // Simular carga de datos
      setTimeout(() => {
        setChartData(mockData[selectedRange]);
        setLoading(false);
      }, 300);
    };

    loadChartData();
  }, [selectedRange, mockData]);

  // const handleRangeChange = (range: string) => {
  //   setSelectedRange(range);
  // };

  if (loading) {
    return (
      <div
        className="p-6 rounded-lg border"
        style={{
          backgroundColor: currentTheme.colors.background,
          borderColor: currentTheme.colors.border,
        }}
      >
        <div className="flex justify-center items-center py-12">
          <div
            className="text-sm"
            style={{ color: currentTheme.colors.textSecondary }}
          >
            Cargando datos de ventas...
          </div>
        </div>
      </div>
    );
  }

  if (!chartData) {
    return (
      <div
        className="p-6 rounded-lg border"
        style={{
          backgroundColor: currentTheme.colors.background,
          borderColor: currentTheme.colors.border,
        }}
      >
        <div className="flex justify-center items-center py-12">
          <div
            className="text-sm"
            style={{ color: currentTheme.colors.textSecondary }}
          >
            No hay datos disponibles
          </div>
        </div>
      </div>
    );
  }

  return (
    <div
      className="p-6 rounded-lg border"
      style={{
        backgroundColor: currentTheme.colors.cardForeground,
        borderColor: currentTheme.colors.border,
      }}
    >
      {/* Header mejorado */}
      <div className="flex justify-between items-start mb-8">
        <div className="flex-1">
          <h3
            className="text-xl font-bold mb-2"
            style={{ color: currentTheme.colors.text }}
          >
            Ventas por {selectedRange === 'horas' ? 'Hora' : selectedRange === 'dias' ? 'Día' : 'Mes'}
          </h3>
          <p
            className="text-sm leading-relaxed"
            style={{ color: currentTheme.colors.textSecondary }}
          >
            Rendimiento de ventas de las comandas completadas o en progreso durante el {selectedRange === 'horas' ? 'día' : selectedRange === 'dias' ? 'período' : 'año'}.
          </p>
        </div>
        <div className="ml-6">
          {/* <TimeRangeSelector
            selectedRange={selectedRange}
            onRangeChange={handleRangeChange}
          /> */}
          <div className="text-sm px-3 py-1 rounded" style={{ backgroundColor: currentTheme.colors.primary, color: currentTheme.colors.white }}>
            {selectedRange || 'horas'}
          </div>
        </div>
      </div>

      {/* Chart con mejor espaciado */}
      <div>
        {/* <SalesChart
          data={chartData.data}
          maxValue={chartData.maxValue}
          height={280}
        /> */}
        <div
          className="flex items-center justify-center h-70 rounded-lg border-2 border-dashed"
          style={{
            borderColor: currentTheme.colors.border,
            backgroundColor: currentTheme.colors.background,
            height: '280px'
          }}
        >
          <p style={{ color: currentTheme.colors.textSecondary }}>
            SalesChart component - En desarrollo
          </p>
        </div>
      </div>
    </div>
  );
};

export default SalesGraphics; 

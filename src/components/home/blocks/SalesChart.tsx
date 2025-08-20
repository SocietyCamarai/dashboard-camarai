import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../../hooks/useTheme';
import type { SalesChartProps, OrderData, ChartData, ChartPeriod } from '../../../types/components/charts';
import PeriodSelector from './PeriodSelector';

// Función para generar datos de ventas simulados por hora
const generateHourlySalesData = (): ChartData[] => {
  const data: ChartData[] = [];

  for (let hour = 0; hour < 24; hour++) {
    let sales = 0;

    // Simular picos de ventas en horarios específicos
    if (hour >= 8 && hour <= 10) {
      // Desayuno
      sales = Math.random() * 200 + 100;
    } else if (hour >= 12 && hour <= 14) {
      // Almuerzo
      sales = Math.random() * 400 + 200;
    } else if (hour >= 19 && hour <= 22) {
      // Cena
      sales = Math.random() * 500 + 300;
    } else if (hour >= 6 && hour <= 23) {
      // Horario normal
      sales = Math.random() * 150 + 50;
    } else {
      // Horario nocturno
      sales = Math.random() * 30 + 10;
    }

    data.push({
      date: `${hour.toString().padStart(2, '0')}:00`,
      value: Math.round(sales),
      label: `${hour.toString().padStart(2, '0')}:00`,
      total: Math.round(sales)
    });
  }

  return data;
};

// Función para generar datos de ventas por día
const generateDailySalesData = (): ChartData[] => {
  const data: ChartData[] = [];
  const now = new Date();
  const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

  for (let i = 1; i <= daysInMonth; i++) {
    const date = new Date(now.getFullYear(), now.getMonth(), i);
    const dayOfWeek = date.getDay();
    const weekendBoost = (dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0) ? Math.random() * 300 + 150 : 0;
    const baseRevenue = 200;
    const randomNoise = (Math.random() - 0.5) * 80;
    const totalRevenue = baseRevenue + weekendBoost + randomNoise;

    data.push({
      date: i.toString(),
      value: Math.max(50, Math.round(totalRevenue)),
      label: i.toString(),
      total: Math.max(50, Math.round(totalRevenue))
    });
  }

  return data;
};

// Función para procesar datos según el período
const processOrderData = (_orders: OrderData[], period: ChartPeriod): ChartData[] => {
  switch (period) {
    case 'horas':
      return generateHourlySalesData();
    case 'días':
      return generateDailySalesData();
    case 'meses': {
      // Generar datos de los últimos 6 meses
      const data: ChartData[] = [];
      const nowMonths = new Date();
      for (let i = 5; i >= 0; i--) {
        const date = new Date(nowMonths);
        date.setMonth(date.getMonth() - i);
        data.push({
          date: date.toLocaleDateString('es-ES', { month: 'short' }),
          value: Math.round(Math.random() * 50000 + 30000),
          label: date.toLocaleDateString('es-ES', { month: 'short' }),
          total: Math.round(Math.random() * 50000 + 30000)
        });
      }
      return data;
    }
    case 'años': {
      // Generar datos de los últimos 3 años
      const yearData: ChartData[] = [];
      const nowYears = new Date();
      for (let i = 2; i >= 0; i--) {
        const year = nowYears.getFullYear() - i;
        yearData.push({
          date: year.toString(),
          value: Math.round(Math.random() * 500000 + 300000),
          label: year.toString(),
          total: Math.round(Math.random() * 500000 + 300000)
        });
      }
      return yearData;
    }
    default:
      return generateHourlySalesData();
  }
};

// Componente de tooltip personalizado
const CustomTooltip = ({ active, payload, label }: {
  active?: boolean;
  payload?: Array<{ value: number; payload: { label?: string } }>;
  label?: string;
}) => {
  const { currentTheme } = useTheme();

  if (active && payload && payload.length) {
    return (
      <div
        className="rounded-lg border p-2 shadow-sm"
        style={{
          backgroundColor: currentTheme.colors.background,
          borderColor: currentTheme.colors.border
        }}
      >
        <div className="grid grid-cols-1 gap-1 text-center">
          <span
            className="text-sm font-bold"
            style={{ color: currentTheme.colors.textSecondary }}
          >
            {payload[0].payload.label ? `Día ${label}` : label}
          </span>
          <span
            className="font-bold text-primary"
            style={{ color: currentTheme.colors.primary }}
          >
            €{payload[0].value.toFixed(0)}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

const SalesChart: React.FC<SalesChartProps> = ({
  data = [],
  period = 'horas',
  className = '',
  onPeriodChange
}) => {
  const { currentTheme } = useTheme();

  const chartData = useMemo(() => {
    return processOrderData(data as OrderData[], period);
  }, [data, period]);

  // const maxValue = Math.max(...chartData.map(item => item.total || 0));
  // const yAxisDomain = [0, Math.ceil(maxValue * 1.2 / 100) * 100];

  const handlePeriodChange = (newPeriod: ChartPeriod) => {
    if (onPeriodChange) {
      onPeriodChange(newPeriod);
    }
  };

  // Función para formatear los ticks del eje X según el período
  const tickFormatter = (value: string) => {
    if (period === 'horas') {
      // Para horas, mostrar solo cada 3 horas
      const hour = parseInt(value);
      if (hour % 3 === 0) {
        return value;
      }
      return '';
    }
    return value;
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        className="rounded-lg border h-[400px]"
        style={{
          backgroundColor: currentTheme.colors.sidebar,
          borderColor: currentTheme.colors.border
        }}
      >
        <div className="p-6 border-b" style={{ borderColor: currentTheme.colors.border }}>
          <div className="flex justify-between items-start mb-2">
            <div>
              <h3
                className="text-lg font-semibold mb-2"
                style={{ color: currentTheme.colors.text }}
              >
                Ventas por Hora
              </h3>
              <p
                className="text-sm"
                style={{ color: currentTheme.colors.textSecondary }}
              >
                Rendimiento de ventas de las comandas completadas o en progreso durante el día.
              </p>
            </div>
            <PeriodSelector
              period={period}
              onPeriodChange={handlePeriodChange}
            />
          </div>
        </div>

        <div className="h-[300px] w-full p-6">
          {chartData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%" style={{ overflow: 'visible' }}>
              <AreaChart
                data={chartData}
                margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="colorTotal" x1="0" y1="0" x2="0" y2="1">
                    <stop
                      offset="5%"
                      stopColor={currentTheme.colors.primary}
                      stopOpacity={0.6}
                    />
                    <stop
                      offset="95%"
                      stopColor={currentTheme.colors.primary}
                      stopOpacity={0.1}
                    />
                  </linearGradient>
                </defs>

                <XAxis
                  dataKey="label"
                  stroke={currentTheme.colors.textSecondary}
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={tickFormatter}
                  interval={period === 'horas' ? 2 : 'preserveStartEnd'}
                  tick={{ fill: currentTheme.colors.textSecondary }}
                />

                <YAxis
                  stroke={currentTheme.colors.textSecondary}
                  fontSize={12}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `€${value}`}
                  domain={[0, 800]}
                  tick={{ fill: currentTheme.colors.textSecondary }}
                />

                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />

                <Area
                  type="monotone"
                  dataKey="total"
                  stroke={currentTheme.colors.primary}
                  fill="url(#colorTotal)"
                  strokeWidth={2}
                  fillOpacity={1}
                />
              </AreaChart>
            </ResponsiveContainer>
          ) : (
            <div
              className="flex items-center justify-center h-full"
              style={{ color: currentTheme.colors.textSecondary }}
            >
              No hay datos de ventas para el período seleccionado.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SalesChart; 

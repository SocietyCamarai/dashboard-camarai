import React, { useMemo } from 'react';
import { AreaChart, Area, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../../hooks/useTheme';
import type { TooltipProps } from '../../../types/components/charts';

interface MonthlyIncomeData {
  day: number;
  income: number;
}

interface MonthlyIncomeChartProps {
  className?: string;
  month?: string;
  year?: string;
}

const CustomTooltip = ({ active, payload, label }: TooltipProps) => {
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
            Día {label}
          </span>
          <span
            className="font-bold text-primary"
            style={{ color: currentTheme.colors.primary }}
          >
            €{(payload[0] as { value: number }).value.toFixed(0)}
          </span>
        </div>
      </div>
    );
  }
  return null;
};

const MonthlyIncomeChart: React.FC<MonthlyIncomeChartProps> = ({
  className = '',
  month = 'Junio',
  year = '2024'
}) => {
  const { currentTheme } = useTheme();

  // Generar datos de ingresos para el mes
  const incomeData = useMemo(() => {
    const data: MonthlyIncomeData[] = [];
    const now = new Date();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(now.getFullYear(), now.getMonth(), i);
      const dayOfWeek = date.getDay();

      // Simular patrones de ingresos realistas
      let baseIncome = 300;

      // Boost de fin de semana
      if (dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0) {
        baseIncome += Math.random() * 400 + 200;
      }

      // Variación aleatoria
      const randomVariation = (Math.random() - 0.5) * 200;
      const totalIncome = Math.max(100, Math.round(baseIncome + randomVariation));

      data.push({
        day: i,
        income: totalIncome,
      });
    }
    return data;
  }, []);

  // Función para formatear los ticks del eje X
  const tickFormatter = (value: number) => {
    // Mostrar solo algunos días para evitar sobrecarga
    if ([1, 2, 3, 4, 5, 6, 7, 8, 9, 11, 13, 15, 17, 19, 21, 23, 25, 27, 29, 31].includes(value)) {
      return value.toString();
    }
    return '';
  };

  return (
    <div className={`lg:col-span-2 h-64 rounded-lg border flex flex-col ${className}`} style={{
      backgroundColor: currentTheme.colors.sidebar,
      borderColor: currentTheme.colors.border
    }}>
      <div className="p-4 border-b" style={{ borderColor: currentTheme.colors.border }}>
        <div className="flex justify-between items-center">
          <div>
            <h3
              className="text-sm font-medium mb-1"
              style={{ color: currentTheme.colors.textSecondary }}
            >
              Ingresos del Mes
            </h3>
            <p
              className="text-xs"
              style={{ color: currentTheme.colors.textSecondary }}
            >
              Ingresos generados durante el mes seleccionado.
            </p>
          </div>
          <div className="flex items-center gap-2">
            <select
              className="px-2 py-1 text-xs border rounded-md"
              style={{
                backgroundColor: currentTheme.colors.background,
                borderColor: currentTheme.colors.border,
                color: currentTheme.colors.text
              }}
            >
              <option>{month}</option>
            </select>
            <select
              className="px-2 py-1 text-xs border rounded-md"
              style={{
                backgroundColor: currentTheme.colors.background,
                borderColor: currentTheme.colors.border,
                color: currentTheme.colors.text
              }}
            >
              <option>{year}</option>
            </select>
            <button
              className="p-1 rounded-md hover:bg-gray-100"
              style={{
                backgroundColor: currentTheme.colors.background,
                color: currentTheme.colors.textSecondary
              }}
            >
              <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
              </svg>
            </button>
          </div>
        </div>
      </div>

      <div className="flex-grow p-4">
        <div className="h-full w-full">
          {incomeData.length > 0 ? (
            <ResponsiveContainer width="100%" height="100%" style={{ overflow: 'visible' }}>
              <AreaChart
                data={incomeData}
                margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
              >
                <defs>
                  <linearGradient id="incomeGradient" x1="0" y1="0" x2="0" y2="1">
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
                  dataKey="day"
                  stroke={currentTheme.colors.textSecondary}
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={tickFormatter}
                  tick={{ fill: currentTheme.colors.textSecondary }}
                  interval={0}
                />

                <YAxis
                  stroke={currentTheme.colors.textSecondary}
                  fontSize={10}
                  tickLine={false}
                  axisLine={false}
                  tickFormatter={(value) => `€${value}`}
                  domain={[0, 800]}
                  tick={{ fill: currentTheme.colors.textSecondary }}
                />

                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />

                <Area
                  type="monotone"
                  dataKey="income"
                  stroke={currentTheme.colors.primary}
                  fill="url(#incomeGradient)"
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
              No hay datos de ingresos para el período seleccionado.
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default MonthlyIncomeChart; 

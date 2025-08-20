import React, { useMemo } from 'react';
import { BarChart, Bar, XAxis, YAxis, Tooltip, ResponsiveContainer } from 'recharts';
import { useTheme } from '../../../hooks/useTheme';
import type { ReservationsChartProps, ReservationData, TooltipProps } from '../../../types/components/charts';

// Componente de tooltip personalizado
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
            {(payload[0] as { value: number }).value} reservas
          </span>
        </div>
      </div>
    );
  }
  return null;
};

const ReservationsChart: React.FC<ReservationsChartProps> = ({
  className = '',
  month = 'Junio',
  year = '2024'
}) => {
  const { currentTheme } = useTheme();

  // Generar datos de reservas para el mes
  const reservationsData = useMemo(() => {
    const data: ReservationData[] = [];
    const now = new Date();
    const daysInMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0).getDate();

    for (let i = 1; i <= daysInMonth; i++) {
      const date = new Date(now.getFullYear(), now.getMonth(), i);
      const dayOfWeek = date.getDay();

      // Simular patrones de reservas realistas
      let baseReservations = 15;

      // Boost de fin de semana
      if (dayOfWeek === 5 || dayOfWeek === 6 || dayOfWeek === 0) {
        baseReservations += Math.random() * 15 + 10;
      }

      // Variación aleatoria
      const randomVariation = (Math.random() - 0.5) * 8;
      const totalReservations = Math.max(5, Math.round(baseReservations + randomVariation));

      data.push({
        date: i.toString(),
        day: i,
        reservations: totalReservations,
      });
    }
    return data;
  }, []);

  // Función para formatear los ticks del eje X
  const tickFormatter = (value: number) => {
    // Mostrar todos los días del 01 al 31 como en la imagen
    return value.toString().padStart(2, '0');
  };

  return (
    <div className={`lg:col-span-2 ${className}`}>
      <div
        className="rounded-lg border text-card-foreground shadow-sm bg-card h-full flex flex-col"
        style={{
          backgroundColor: currentTheme.colors.sidebar,
          borderColor: currentTheme.colors.border
        }}
      >
        <div className="flex flex-col space-y-1.5 p-6">
          <div className="flex justify-between items-center">
            <h3
              className="tracking-tight text-sm font-medium text-muted-foreground"
              style={{ color: currentTheme.colors.textSecondary }}
            >
              Número de Reservas
            </h3>
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
          <p
            className="text-xs text-muted-foreground"
            style={{ color: currentTheme.colors.textSecondary }}
          >
            Evolución del número de reservas para el período seleccionado.
          </p>
        </div>

        <div className="flex-grow p-4 pt-0">
          <div className="h-[240px] w-full">
            {reservationsData.length > 0 ? (
              <ResponsiveContainer width="100%" height="100%" style={{ overflow: 'visible' }}>
                <BarChart
                  data={reservationsData}
                  margin={{ top: 5, right: 10, left: -10, bottom: 0 }}
                >
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
                    fontSize={12}
                    tickLine={false}
                    axisLine={false}
                    tickFormatter={(value) => value.toString()}
                    domain={[0, 40]}
                    tick={{ fill: currentTheme.colors.textSecondary }}
                  />

                  <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />

                  <Bar
                    dataKey="reservations"
                    fill={currentTheme.colors.primary}
                    radius={[2, 2, 0, 0]}
                  />
                </BarChart>
              </ResponsiveContainer>
            ) : (
              <div
                className="flex items-center justify-center h-full"
                style={{ color: currentTheme.colors.textSecondary }}
              >
                No hay datos de reservas para el período seleccionado.
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ReservationsChart; 

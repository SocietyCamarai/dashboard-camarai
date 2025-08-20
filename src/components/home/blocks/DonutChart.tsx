import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useTheme } from '../../../hooks/useTheme';
import type { DonutChartProps } from '../../../types/components/charts';

const RADIAN = Math.PI / 180;

const renderCustomizedLabel = ({ cx, cy, midAngle, innerRadius, outerRadius, percent }: {
  cx?: number;
  cy?: number;
  midAngle?: number;
  innerRadius?: number;
  outerRadius?: number;
  percent?: number;
}) => {
  if (!cx || !cy || !midAngle || !innerRadius || !outerRadius || !percent) return null;
  const radius = innerRadius + (outerRadius - innerRadius) * 0.5;
  const x = cx + radius * Math.cos(-midAngle * RADIAN);
  const y = cy + radius * Math.sin(-midAngle * RADIAN);

  if (percent < 0.05) return null; // No mostrar etiquetas para segmentos muy pequeños

  return (
    <text x={x} y={y} fill="white" textAnchor="middle" dominantBaseline="central" className="text-xs font-bold">
      {`${(percent * 100).toFixed(0)}%`}
    </text>
  );
};

const DonutChart: React.FC<DonutChartProps> = ({
  data,
  title,
  className = ''
}) => {
  const { currentTheme } = useTheme();

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: { name: string; value: number; color: string } }> }) => {
    if (active && payload && payload.length) {
      const data = payload[0].payload;
      return (
        <div
          className="rounded-lg border p-2 shadow-sm"
          style={{
            backgroundColor: currentTheme.colors.background,
            borderColor: currentTheme.colors.border
          }}
        >
          <div className="flex flex-col">
            <span
              className="font-bold"
              style={{ color: currentTheme.colors.text }}
            >
              {data.name}
            </span>
            <span
              className="text-sm"
              style={{ color: data.color }}
            >
              Aforo: {data.value} ({data.value}%)
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

  if (!data || data.length === 0) {
    return (
      <div className={`h-64 rounded-lg border flex flex-col ${className}`} style={{
        backgroundColor: currentTheme.colors.background,
        borderColor: currentTheme.colors.border
      }}>
        <div className="p-4 border-b" style={{ borderColor: currentTheme.colors.border }}>
          <h3
            className="text-sm font-medium"
            style={{ color: currentTheme.colors.textSecondary }}
          >
            {title}
          </h3>
        </div>
        <div className="flex-grow p-4 flex items-center justify-center">
          <p
            className="text-center"
            style={{ color: currentTheme.colors.textSecondary }}
          >
            No hay datos de aforo disponibles.
          </p>
        </div>
      </div>
    );
  }

  return (
    <div className={`h-64 rounded-lg border flex flex-col ${className}`} style={{
      backgroundColor: currentTheme.colors.sidebar,
      borderColor: currentTheme.colors.border
    }}>
      <div className="p-4 border-b" style={{ borderColor: currentTheme.colors.border }}>
        <h3
          className="text-sm font-medium"
          style={{ color: currentTheme.colors.textSecondary }}
        >
          {title}
        </h3>
      </div>

      <div className="flex-grow p-4">
        <div className="w-full h-[190px] flex items-center justify-center">
          <ResponsiveContainer width="100%" height="100%" style={{ overflow: 'visible' }}>
            <PieChart>
              <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
              <Pie
                data={data}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={renderCustomizedLabel}
                outerRadius="92%"
                innerRadius="68%"
                fill="#8884d8"
                dataKey="value"
                stroke={currentTheme.colors.sidebar}
                strokeWidth={3}
              >
                {data.map((entry, index) => {
                  const typedEntry = entry as { color: string };
                  return <Cell key={`cell-${index}`} fill={typedEntry.color} />;
                })}
              </Pie>
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default DonutChart; 

import React from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from 'recharts';
import { useTheme } from '../../../hooks/useTheme';
import type { CostBreakdownProps } from '../../../types/components/charts';

const CostBreakdown: React.FC<CostBreakdownProps> = ({
  data,
  className = ''
}) => {
  const { currentTheme } = useTheme();

  const CustomTooltip = ({ active, payload }: { active?: boolean; payload?: Array<{ payload: { name: string; value: number; color: string } }> }) => {
    if (active && payload && payload.length) {
      const dataPoint = payload[0].payload;
      return (
        <div
          className="rounded-lg border p-2 shadow-sm"
          style={{
            backgroundColor: currentTheme.colors.background,
            borderColor: currentTheme.colors.border
          }}
        >
          <div className="flex flex-col text-center">
            <span
              className="font-bold"
              style={{ color: currentTheme.colors.text }}
            >
              {dataPoint.name}
            </span>
            <span
              className="text-lg font-bold"
              style={{ color: dataPoint.color }}
            >
              {dataPoint.value}%
            </span>
          </div>
        </div>
      );
    }
    return null;
  };

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
          Desglose de Costes
        </h3>
      </div>

      <div className="flex-grow p-4">
        <div className="h-full w-full flex flex-col items-center justify-between">
          <div className="flex flex-wrap justify-center gap-x-4 gap-y-1 text-xs mb-2">
            {(data || []).map((entry, index) => {
              const typedEntry = entry as { color: string; name: string };
              return (
                <div key={`legend-${index}`} className="flex items-center gap-1.5">
                  <span
                    className="h-2 w-2 rounded-full"
                    style={{ backgroundColor: typedEntry.color }}
                  />
                  <span
                    className="text-muted-foreground"
                    style={{ color: currentTheme.colors.textSecondary }}
                  >
                    {typedEntry.name}
                  </span>
                </div>
              );
            })}
          </div>

          <div className="w-full h-[150px]">
            <ResponsiveContainer width="100%" height="100%" style={{ overflow: 'visible' }}>
              <PieChart>
                <Tooltip content={<CustomTooltip />} cursor={{ fill: 'transparent' }} />
                <Pie
                  data={data}
                  cx="50%"
                  cy="70%"
                  startAngle={180}
                  endAngle={0}
                  innerRadius="65%"
                  outerRadius="100%"
                  fill="#8884d8"
                  paddingAngle={2}
                  dataKey="value"
                  stroke={currentTheme.colors.sidebar}
                  strokeWidth={3}
                >
                  {(data || []).map((entry, index) => {
                    const typedEntry = entry as { color: string };
                    return <Cell key={`cell-${index}`} fill={typedEntry.color} />;
                  })}
                </Pie>
              </PieChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default CostBreakdown; 

import React from 'react';
import { useTheme } from '../../../hooks/useTheme';
import StatCard2 from '../charts/StatCard2';
import type { ChartStats2Props } from '../../../types/components/charts';

const ChartStats2: React.FC<ChartStats2Props> = ({ className = '' }) => {
  const { currentTheme } = useTheme();

  return (
    <div className={`py-4 ${className}`}>
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 rounded-lg" style={{
        backgroundColor: currentTheme.colors.background,
      }}>
        <StatCard2
          value="€2.6M"
          label="Ingresos"
          percentage="+4.5%"
          percentageType="positive"
        />
        <StatCard2
          value="6,820"
          label="Ventas Totales"
          percentage="+8.2%"
          percentageType="positive"
        />
        <StatCard2
          value="92%"
          label="Indicador de Salud"
          percentage="-1.8%"
          percentageType="negative"
        />
      </div>
    </div>
  );
};

export default ChartStats2; 
import React from 'react';
import { useTheme } from '../../../hooks/useTheme';
import StatCard from '../charts/StatCard';

const ChartStats: React.FC = () => {
  const { currentTheme } = useTheme();

  return (
    <div className="py-4">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 p-4 rounded-lg" style={{
            backgroundColor: currentTheme.colors.sidebar,
        }}>
            <StatCard
            value="€2.6M"
            label="Ingresos totales"
            percentage="+4.5% respecto a la semana pasada"
            percentageType="positive"
            />
            <StatCard
            value="€455"
            label="Valor medio de pedido"
            percentage="-0.5% respecto a la semana pasada"
            percentageType="negative"
            />
            <StatCard
            value="5,888"
            label="Entradas vendidas"
            percentage="+4.5% respecto a la semana pasada"
            percentageType="positive"
            />
            <StatCard
            value="823,067"
            label="Visitas a la página"
            percentage="+21.2% respecto a la semana pasada"
            percentageType="positive"
            />
        </div>
    </div>
  );
};

export default ChartStats;

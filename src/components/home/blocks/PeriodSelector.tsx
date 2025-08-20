import React from 'react';
import { useTheme } from '../../../hooks/useTheme';
import type { ChartPeriod } from '../../../types/components/charts';

interface PeriodSelectorProps {
  period: ChartPeriod;
  onPeriodChange: (period: ChartPeriod) => void;
  className?: string;
}

const periods: { value: ChartPeriod; label: string }[] = [
  { value: 'horas', label: 'Horas' },
  { value: 'días', label: 'Días' },
  { value: 'meses', label: 'Meses' },
  { value: 'años', label: 'Años' }
];

const PeriodSelector: React.FC<PeriodSelectorProps> = ({
  period,
  onPeriodChange,
  className = ''
}) => {
  const { currentTheme } = useTheme();

  return (
    <div className={`flex items-center gap-2 ${className}`}>
      <select
        value={period}
        onChange={(e) => onPeriodChange(e.target.value as ChartPeriod)}
        className="px-3 py-2 text-sm border rounded-md focus:outline-none focus:ring-2 focus:ring-offset-2"
        style={{
          backgroundColor: currentTheme.colors.background,
          borderColor: currentTheme.colors.border,
          color: currentTheme.colors.text,
          outline: 'none',
          minWidth: '80px'
        }}
      >
        {periods.map((p) => (
          <option key={p.value} value={p.value}>
            {p.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PeriodSelector; 

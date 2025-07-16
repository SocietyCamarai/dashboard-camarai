export interface StatCardProps {
  value: string;
  label: string;
  percentage?: string;
  percentageType?: 'positive' | 'negative';
  className?: string;
} 
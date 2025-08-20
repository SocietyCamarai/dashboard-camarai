import React, { useState } from 'react';
import { useTheme } from '../../../hooks/useTheme';
import type { AforoData, Environment } from '../../../types/dashboard';

interface AforoChartProps {
  data: AforoData;
}

const AforoChart: React.FC<AforoChartProps> = ({ data }) => {
  const { currentTheme } = useTheme();
  const [hoveredSegment, setHoveredSegment] = useState<number | null>(null);

  const radius = 60;
  const strokeWidth = 20; // Más grueso para que los números queden dentro

  const createDonutPath = (startAngle: number, endAngle: number) => {
    const startRadians = (startAngle - 90) * (Math.PI / 180);
    const endRadians = (endAngle - 90) * (Math.PI / 180);

    const x1 = radius * Math.cos(startRadians);
    const y1 = radius * Math.sin(startRadians);
    const x2 = radius * Math.cos(endRadians);
    const y2 = radius * Math.sin(endRadians);

    const largeArcFlag = endAngle - startAngle <= 180 ? 0 : 1;

    return `M ${x1} ${y1} A ${radius} ${radius} 0 ${largeArcFlag} 1 ${x2} ${y2}`;
  };

  interface EnvironmentWithAngles extends Environment {
    startAngle: number;
    endAngle: number;
    path: string;
    percentage: number;
    name: string;
    count?: number;
  }

  const calculateAngles = (): EnvironmentWithAngles[] => {
    let currentAngle = 0;
    return data.environments.map((env: Environment) => {
      const startAngle = currentAngle;
      const percentage = (env.currentOccupancy / env.capacity) * 100;
      const angle = (percentage / 100) * 360;
      currentAngle += angle;
      return {
        ...env,
        startAngle,
        endAngle: currentAngle,
        path: createDonutPath(startAngle, currentAngle),
        percentage: Math.round(percentage)
      };
    });
  };

  const segments = calculateAngles();

  return (
    <div
      className="p-6 rounded-lg border"
      style={{
        backgroundColor: currentTheme.colors.background,
        borderColor: currentTheme.colors.border,
      }}
    >
      {/* Header */}
      <div className="mb-6">
        <h3
          className="text-lg font-semibold"
          style={{ color: currentTheme.colors.text }}
        >
          Aforo Ambientes
        </h3>
      </div>

      {/* Donut Chart */}
      <div className="flex items-center justify-center mb-6">
        <div className="relative">
          <svg width="280" height="280" viewBox="-70 -70 140 140">
            {/* Background circle */}
            <circle
              cx="0"
              cy="0"
              r={radius}
              fill="none"
              stroke={currentTheme.colors.border}
              strokeWidth={strokeWidth}
              opacity="0.3"
            />

            {/* Segments */}
            {segments.map((segment: EnvironmentWithAngles, index: number) => (
              <g key={index}>
                <path
                  d={segment.path}
                  fill="none"
                  stroke={segment.color}
                  strokeWidth={strokeWidth}
                  strokeLinecap="round"
                  onMouseEnter={() => setHoveredSegment(index)}
                  onMouseLeave={() => setHoveredSegment(null)}
                  style={{ cursor: 'pointer' }}
                />

                {/* Percentage labels inside the donut */}
                <text
                  x={Math.cos((segment.startAngle + segment.endAngle) / 2 * Math.PI / 180 - Math.PI / 2) * (radius - 0)}
                  y={Math.sin((segment.startAngle + segment.endAngle) / 2 * Math.PI / 180 - Math.PI / 2) * (radius - 0)}
                  textAnchor="middle"
                  dominantBaseline="middle"
                  fontSize="9"
                  fontWeight="bold"
                  fill={currentTheme.colors.text}
                >
                  {segment.percentage}%
                </text>
              </g>
            ))}
          </svg>

          {/* Hover tooltip */}
          {hoveredSegment !== null && (
            <div
              className="absolute top-0 left-0 bg-black bg-opacity-90 text-white px-3 py-2 rounded text-sm whitespace-nowrap z-10"
              style={{
                transform: 'translate(-50%, -100%)',
                marginTop: '-10px'
              }}
            >
              <div className="font-medium">
                {segments[hoveredSegment].name}
              </div>
              <div className="text-xs opacity-80">
                Aforo: {segments[hoveredSegment].count} ({segments[hoveredSegment].percentage.toFixed(1)}%)
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default AforoChart; 

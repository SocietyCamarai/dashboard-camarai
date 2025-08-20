import React from 'react';
import { useTheme } from '../../../hooks/useTheme';
import type { StatCard2Props } from '../../../types/components/charts';

const StatCard2: React.FC<StatCard2Props> = ({
    value,
    label,
    percentage,
    percentageType,
    className = ''
}) => {
    const { currentTheme, isDarkTheme } = useTheme();

    // Use sidebar background for dark mode, regular background for light mode
    const cardBackground = isDarkTheme(currentTheme)
        ? currentTheme.colors.sidebar
        : currentTheme.colors.background;

    return (
        <article
            className={`
        rounded-xl p-4 shadow transition-transform duration-200
        hover:-translate-y-0.5 hover:shadow-lg
        ${className}
      `}
            style={{
                backgroundColor: cardBackground,
                border: `1px solid ${currentTheme.colors.border}`
            }}
        >
            <div className="flex flex-col">
                <div className="text-left">

                    <p
                        className="text-sm font-medium mb-2"
                        style={{ color: currentTheme.colors.text }}
                    >
                        {label}
                    </p>
                    <p
                        className="text-2xl font-bold mb-1"
                        style={{ color: currentTheme.colors.primary }}
                    >
                        {value}
                    </p>
                </div>
                {percentage && (
                    <div className="text-left">
                        <span
                            className="text-xs font-medium px-2 py-1 rounded-md inline-block"
                            style={{
                                backgroundColor: percentageType === 'positive'
                                    ? 'rgba(74, 222, 128, 0.1)'
                                    : percentageType === 'negative'
                                        ? 'rgba(248, 113, 113, 0.1)'
                                        : 'rgba(74, 222, 128, 0.1)',
                                color: percentageType === 'positive'
                                    ? '#4ade80'
                                    : percentageType === 'negative'
                                        ? '#f87171'
                                        : '#4ade80'
                            }}
                        >
                            {percentage}
                        </span>
                    </div>
                )}
            </div>
        </article>
    );
};

export default StatCard2;

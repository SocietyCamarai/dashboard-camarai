import React from 'react';
import { useTheme } from '../../hooks/useTheme';

interface TabItem {
    label: string;
    value: string;
    icon?: React.ReactNode;
}

interface TabNavigationProps {
    tabs: TabItem[];
    activeTab: string;
    onTabChange: (tabValue: string) => void;
    className?: string;
}

const TabNavigation: React.FC<TabNavigationProps> = ({
    tabs,
    activeTab,
    onTabChange,
    className = ''
}) => {
    const { currentTheme } = useTheme();

    return (
        <div className={`mb-8 ${className}`}>
            {/* Desktop/Tablet View */}
            <div
                className="hidden md:flex justify-center rounded-lg shadow-sm border px-2 py-1 gap-1"
                style={{
                    background: currentTheme.colors.background,
                    borderColor: currentTheme.colors.border,
                }}
            >
                {tabs.map(tab => (
                    <button
                        key={tab.value}
                        className={`flex items-center justify-center gap-2 px-3 py-2 font-medium text-sm rounded-md transition-all duration-200 min-w-0 whitespace-nowrap
              ${activeTab === tab.value
                                ? 'shadow-md border transform scale-105'
                                : 'hover:bg-opacity-50 hover:scale-102'}
            `}
                        style={{
                            color: activeTab === tab.value
                                ? currentTheme.colors.primary
                                : currentTheme.colors.textSecondary,
                            background: activeTab === tab.value
                                ? currentTheme.colors.primary + '15'
                                : 'transparent',
                            borderColor: activeTab === tab.value
                                ? currentTheme.colors.primary
                                : 'transparent',
                            borderWidth: activeTab === tab.value ? 1 : 0,
                            flex: '1 1 auto',
                            maxWidth: '200px'
                        }}
                        onClick={() => onTabChange(tab.value)}
                    >
                        {tab.icon && <span className="flex items-center flex-shrink-0">{tab.icon}</span>}
                        <span className="truncate">{tab.label}</span>
                    </button>
                ))}
            </div>

            {/* Mobile View */}
            <div
                className="md:hidden flex flex-col items-center rounded-lg shadow-sm border p-1 gap-1"
                style={{
                    background: currentTheme.colors.background,
                    borderColor: currentTheme.colors.border,
                }}
            >
                {tabs.map(tab => (
                    <button
                        key={tab.value}
                        className={`flex items-center gap-3 px-4 py-3 font-medium text-sm rounded-md transition-all duration-200
              ${activeTab === tab.value
                                ? 'shadow-md border'
                                : 'hover:bg-opacity-50'}
            `}
                        style={{
                            color: activeTab === tab.value
                                ? currentTheme.colors.primary
                                : currentTheme.colors.textSecondary,
                            background: activeTab === tab.value
                                ? currentTheme.colors.primary + '15'
                                : 'transparent',
                            borderColor: activeTab === tab.value
                                ? currentTheme.colors.primary
                                : 'transparent',
                            borderWidth: activeTab === tab.value ? 1 : 0,
                        }}
                        onClick={() => onTabChange(tab.value)}
                    >
                        {tab.icon && <span className="flex items-center flex-shrink-0">{tab.icon}</span>}
                        <span className="text-left">{tab.label}</span>
                    </button>
                ))}
            </div>
        </div>
    );
};

export default TabNavigation;
export type { TabItem };

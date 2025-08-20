import React from 'react';
import { useTheme } from '../../../hooks/useTheme';
import type { StockAlertProps, StockItem } from '../../../types';

const StockAlert: React.FC<StockAlertProps> = ({
  items = [],
  className = ''
}) => {
  const { currentTheme, isDarkTheme } = useTheme();

  // Use sidebar background for dark mode, regular background for light mode
  const cardBackground = isDarkTheme(currentTheme)
    ? currentTheme.colors.sidebar
    : currentTheme.colors.background;

  const calculateProgressPercentage = (current: number, max: number) => {
    return Math.max(0, Math.min(100, (current / max) * 100));
  };

  const handleRestock = (item: StockItem) => {
    console.log('Reabastecer:', item.name);
    // Aquí se implementaría la lógica para reabastecer
  };

  return (
    <div className={`lg:col-span-1 flex ${className}`}>
      <div
        className="rounded-lg border text-card-foreground shadow-sm bg-card h-full max-h-[500px] w-full flex flex-col"
        style={{
          backgroundColor: cardBackground,
          borderColor: currentTheme.colors.border
        }}
      >
        <div className="flex flex-col space-y-1.5 p-6">
          <h3
            className="tracking-tight flex items-center gap-2 text-base font-bold text-muted-foreground"
            style={{ color: currentTheme.colors.textSecondary }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="24"
              height="24"
              viewBox="0 0 24 24"
              fill="none"
              stroke="currentColor"
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
              className="lucide lucide-triangle-alert h-5 w-5 text-muted-foreground"
              style={{ color: currentTheme.colors.textSecondary }}
            >
              <path d="m21.73 18-8-14a2 2 0 0 0-3.48 0l-8 14A2 2 0 0 0 4 21h16a2 2 0 0 0 1.73-3"></path>
              <path d="M12 9v4"></path>
              <path d="M12 17h.01"></path>
            </svg>
            Alertas de Stock Bajo
          </h3>
        </div>

        <div className="flex-1 overflow-y-auto px-6 pb-6">
          <div className="space-y-6">
            {items.map((item) => {
              const progressPercentage = calculateProgressPercentage(item.currentStock || 0, item.maxStock || 1);

              return (
                <div key={item.id} className="space-y-2">
                  <div className="flex items-center justify-between gap-4 text-sm">
                    <p
                      className="font-semibold truncate"
                      style={{ color: currentTheme.colors.text }}
                    >
                      {item.name}
                    </p>
                    <p
                      className="text-muted-foreground"
                      style={{ color: currentTheme.colors.textSecondary }}
                    >
                      <span
                        className="font-bold text-foreground"
                        style={{ color: currentTheme.colors.text }}
                      >
                        {item.currentStock}
                      </span> / {item.maxStock} {item.unit}
                    </p>
                  </div>

                  <div
                    className="relative w-full overflow-hidden rounded-full bg-secondary h-2"
                    style={{ backgroundColor: currentTheme.colors.border }}
                  >
                    <div
                      className="h-full w-full flex-1 transition-all bg-primary"
                      style={{
                        backgroundColor: currentTheme.colors.primary,
                        transform: `translateX(-${100 - progressPercentage}%)`
                      }}
                    />
                  </div>

                  <button
                    className="inline-flex items-center justify-center whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border border-input bg-background hover:bg-accent hover:text-accent-foreground h-9 rounded-md px-3 w-full"
                    style={{
                      borderColor: currentTheme.colors.border,
                      backgroundColor: currentTheme.colors.background,
                      color: currentTheme.colors.text
                    }}
                    onClick={() => handleRestock(item)}
                  >
                    Reabastecer
                  </button>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
};

export default StockAlert; 

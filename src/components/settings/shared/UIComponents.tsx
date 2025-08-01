import React from 'react';
import { useTheme } from '../../../hooks/useTheme';

// Componentes reutilizables
export const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
  const { currentTheme, isDarkTheme } = useTheme();
  
  const getCardColors = () => {
    if (isDarkTheme(currentTheme)) {
      return {
        backgroundColor: currentTheme.colors.cardBackgroundDark || currentTheme.colors.white,
        borderColor: currentTheme.colors.border,
        color: currentTheme.colors.text
      };
    }
    return {
      backgroundColor: currentTheme.colors.white,
      borderColor: currentTheme.colors.border,
      color: currentTheme.colors.text
    };
  };

  return (
    <div className={`rounded-lg border shadow-sm ${className}`} style={getCardColors()}>
      {children}
    </div>
  );
};

export const CardHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => {
  const { currentTheme } = useTheme();
  
  return (
    <div className="flex flex-col space-y-1.5 p-6">
      <div className="text-2xl leading-none tracking-tight font-bold" style={{ color: currentTheme.colors.textSecondary }}>
        {title}
      </div>
      {subtitle && (
        <div className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>
          {subtitle}
        </div>
      )}
    </div>
  );
};

export const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);

export const CardFooter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentTheme } = useTheme();
  
  return (
    <div className="flex items-center p-6 border-t px-6 py-4" style={{ borderTopColor: currentTheme.colors.border }}>
      {children}
    </div>
  );
};

export const PrimaryButton: React.FC<{ children: React.ReactNode; onClick?: () => void; disabled?: boolean; type?: "button" | "submit" }> = ({ 
  children, 
  onClick, 
  disabled = false, 
  type = "button" 
}) => {
  const { currentTheme, getButtonTextColor } = useTheme();
  
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2"
      style={{
        backgroundColor: currentTheme.colors.primary,
        color: getButtonTextColor(currentTheme)
      }}
    >
      {children}
    </button>
  );
};

export const SecondaryButton: React.FC<{ children: React.ReactNode; onClick?: () => void; disabled?: boolean; type?: "button" | "submit"; className?: string }> = ({ 
  children, 
  onClick, 
  disabled = false, 
  type = "button",
  className = ""
}) => {
  const { currentTheme, isDarkTheme } = useTheme();
  
  const getInputColors = () => {
    if (isDarkTheme(currentTheme)) {
      return {
        backgroundColor: currentTheme.colors.inputBackgroundDark || currentTheme.colors.white,
        borderColor: currentTheme.colors.inputBorderDark || currentTheme.colors.border,
        color: currentTheme.colors.text
      };
    }
    return {
      backgroundColor: currentTheme.colors.white,
      borderColor: currentTheme.colors.border,
      color: currentTheme.colors.text
    };
  };

  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border h-10 px-4 py-2 ${className}`}
      style={getInputColors()}
    >
      {children}
    </button>
  );
};

export const Input: React.FC<{
  id: string;
  label: string;
  value: string;
  onChange: (value: string) => void;
  type?: string;
  autoComplete?: string;
  placeholder?: string;
  maxLength?: number;
}> = ({ id, label, value, onChange, type = "text", autoComplete, placeholder, maxLength }) => {
  const { currentTheme, isDarkTheme } = useTheme();
  
  const getInputColors = () => {
    if (isDarkTheme(currentTheme)) {
      return {
        backgroundColor: currentTheme.colors.inputBackgroundDark || currentTheme.colors.white,
        borderColor: currentTheme.colors.inputBorderDark || currentTheme.colors.border,
        color: currentTheme.colors.text
      };
    }
    return {
      backgroundColor: currentTheme.colors.white,
      borderColor: currentTheme.colors.border,
      color: currentTheme.colors.text
    };
  };

  return (
    <div className="space-y-2">
      <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor={id} style={{ color: currentTheme.colors.text }}>
        {label}
      </label>
      <input
        className="flex h-10 w-full rounded-md border px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
        id={id}
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        autoComplete={autoComplete}
        placeholder={placeholder}
        maxLength={maxLength}
        style={getInputColors()}
      />
    </div>
  );
}; 
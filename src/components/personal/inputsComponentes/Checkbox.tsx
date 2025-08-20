import React from 'react';
import { useTheme } from '../../../hooks/useTheme';

interface CheckboxProps {
    checked: boolean;
    onChange: (checked: boolean) => void;
    disabled?: boolean;
    error?: string;
    label?: string;
    description?: string;
    className?: string;
    variant?: 'checkbox' | 'switch';
}

const Checkbox: React.FC<CheckboxProps> = ({
    checked,
    onChange,
    disabled = false,
    error,
    label,
    description,
    className = '',
    variant = 'checkbox'
}) => {
    const { currentTheme } = useTheme();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.checked);
    };

    const id = React.useId();

    if (variant === 'switch') {
        return (
            <div className={`space-y-2 ${className}`}>
                {/* Description */}
                {description && (
                    <p className="text-xs" style={{ color: currentTheme.colors.textSecondary }}>
                        {description}
                    </p>
                )}

                <div className="flex items-center gap-3">
                    <div className="relative">
                        <input
                            type="checkbox"
                            id={id}
                            checked={checked}
                            onChange={handleChange}
                            disabled={disabled}
                            className="sr-only"
                        />
                        <label
                            htmlFor={id}
                            className={`flex items-center cursor-pointer ${disabled ? 'opacity-50 cursor-not-allowed' : ''}`}
                        >
                            <div className={`relative w-11 h-6 rounded-full transition-colors duration-200 ${checked ? 'bg-purple-600' : 'bg-gray-300'
                                }`}>
                                <div className={`absolute top-0.5 left-0.5 w-5 h-5 bg-white rounded-full transition-transform duration-200 ${checked ? 'translate-x-5' : 'translate-x-0'
                                    }`}></div>
                            </div>
                            {label && (
                                <span className="ml-3 text-sm font-medium" style={{ color: currentTheme.colors.text }}>
                                    {label}
                                </span>
                            )}
                        </label>
                    </div>
                </div>

                {/* Error Message */}
                {error && (
                    <p className="text-xs text-red-500 mt-1">
                        {error}
                    </p>
                )}
            </div>
        );
    }

    return (
        <div className={`space-y-2 ${className}`}>
            {/* Description */}
            {description && (
                <p className="text-xs" style={{ color: currentTheme.colors.textSecondary }}>
                    {description}
                </p>
            )}

            <div className="flex items-center gap-3">
                <input
                    type="checkbox"
                    id={id}
                    checked={checked}
                    onChange={handleChange}
                    disabled={disabled}
                    className={`w-4 h-4 rounded border-2 focus:ring-2 focus:ring-purple-500 focus:ring-offset-0
            transition-all duration-200
            ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}
            ${checked ? 'bg-purple-600 border-purple-600' : 'bg-white'}`}
                    style={{
                        borderColor: error ? '#ef4444' : (checked ? '#8B5CF6' : currentTheme.colors.border)
                    }}
                />
                {label && (
                    <label
                        htmlFor={id}
                        className={`text-sm font-medium ${disabled ? 'opacity-50 cursor-not-allowed' : 'cursor-pointer'}`}
                        style={{ color: currentTheme.colors.text }}
                    >
                        {label}
                    </label>
                )}
            </div>

            {/* Error Message */}
            {error && (
                <p className="text-xs text-red-500 mt-1">
                    {error}
                </p>
            )}

        </div>
    );
};

export default Checkbox;

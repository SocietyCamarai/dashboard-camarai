import React from 'react';
import { useTheme } from '../../../hooks/useTheme';

interface TextInputProps {
    value: string;
    onChange: (value: string) => void;
    onBlur?: () => void;
    type?: 'text' | 'email' | 'tel' | 'password' | 'number' | 'time';
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    error?: string;
    label?: string;
    description?: string;
    className?: string;
    min?: string | number;
    max?: string | number;
    step?: string | number;
    maxLength?: number;
}

const TextInput: React.FC<TextInputProps> = ({
    value,
    onChange,
    onBlur,
    type = 'text',
    placeholder,
    required = false,
    disabled = false,
    error,
    label,
    description,
    className = '',
    min,
    max,
    step,
    maxLength
}) => {
    const { currentTheme } = useTheme();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        onChange(e.target.value);
    };

    return (
        <div className={`space-y-2 ${className}`}>
            {/* Label */}
            {label && (
                <label className="block text-sm font-medium" style={{ color: currentTheme.colors.text }}>
                    {label}
                    {required && <span className="text-red-500 ml-1">*</span>}
                </label>
            )}

            {/* Description */}
            {description && (
                <p className="text-xs" style={{ color: currentTheme.colors.textSecondary }}>
                    {description}
                </p>
            )}

            {/* Input */}
            <input
                type={type}
                value={value}
                onChange={handleChange}
                onBlur={onBlur}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                min={min}
                max={max}
                step={step}
                maxLength={maxLength}
                className={`w-full px-3 py-2 border rounded-lg
          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
          transition-all duration-200
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${error ? 'border-red-500' : ''}`}
                style={{
                    backgroundColor: currentTheme.colors.background,
                    borderColor: error ? '#ef4444' : currentTheme.colors.border,
                    color: currentTheme.colors.text
                }}
            />

            {/* Error Message */}
            {error && (
                <p className="text-xs text-red-500 mt-1">
                    {error}
                </p>
            )}
        </div>
    );
};

export default TextInput;

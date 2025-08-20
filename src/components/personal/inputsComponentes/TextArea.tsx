import React from 'react';
import { useTheme } from '../../../hooks/useTheme';

interface TextAreaProps {
    value: string;
    onChange: (value: string) => void;
    onBlur?: () => void;
    placeholder?: string;
    required?: boolean;
    disabled?: boolean;
    error?: string;
    label?: string;
    description?: string;
    className?: string;
    rows?: number;
    maxLength?: number;
    resize?: boolean;
}

const TextArea: React.FC<TextAreaProps> = ({
    value,
    onChange,
    onBlur,
    placeholder,
    required = false,
    disabled = false,
    error,
    label,
    description,
    className = '',
    rows = 4,
    maxLength,
    resize = false
}) => {
    const { currentTheme } = useTheme();

    const handleChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
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

            {/* TextArea */}
            <textarea
                value={value}
                onChange={handleChange}
                onBlur={onBlur}
                placeholder={placeholder}
                required={required}
                disabled={disabled}
                rows={rows}
                maxLength={maxLength}
                className={`w-full px-3 py-2 border rounded-lg
          focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent
          transition-all duration-200
          ${disabled ? 'opacity-50 cursor-not-allowed' : ''}
          ${error ? 'border-red-500' : ''}
          ${!resize ? 'resize-none' : ''}`}
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

export default TextArea;

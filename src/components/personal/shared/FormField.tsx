import React from 'react';
import { useTheme } from '../../../hooks/useTheme';

interface FormFieldProps {
    label: string;
    error?: string;
    required?: boolean;
    children: React.ReactNode;
    className?: string;
    description?: string;
}

const FormField: React.FC<FormFieldProps> = ({
    label,
    error,
    required = false,
    children,
    className = '',
    description
}) => {
    const { currentTheme } = useTheme();

    return (
        <div className={`space-y-1 ${className}`}>
            <label
                className="block text-sm font-medium"
                style={{ color: currentTheme.colors.text }}
            >
                {label}
                {required && (
                    <span className="text-red-500 ml-1">*</span>
                )}
            </label>

            {description && (
                <p
                    className="text-xs mb-2"
                    style={{ color: currentTheme.colors.textSecondary }}
                >
                    {description}
                </p>
            )}

            <div className="relative">
                {children}
            </div>

            {error && (
                <p className="text-red-500 text-xs mt-1 flex items-center gap-1">
                    <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7 4a1 1 0 11-2 0 1 1 0 012 0zm-1-9a1 1 0 00-1 1v4a1 1 0 102 0V6a1 1 0 00-1-1z" clipRule="evenodd" />
                    </svg>
                    {error}
                </p>
            )}
        </div>
    );
};

export default FormField;

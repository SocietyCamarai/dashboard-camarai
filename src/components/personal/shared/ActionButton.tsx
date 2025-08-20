import React from 'react';
import { SpinnerIcon } from '../../icons';

interface ActionButtonProps {
    onClick: () => void;
    disabled?: boolean;
    loading?: boolean;
    loadingText?: string;
    children: React.ReactNode;
    icon?: React.ReactNode;
    className?: string;
}

const ActionButton: React.FC<ActionButtonProps> = ({
    onClick,
    disabled = false,
    loading = false,
    loadingText = 'Cargando...',
    children,
    icon,
    className = ''
}) => {
    return (
        <button
            onClick={onClick}
            disabled={disabled || loading}
            className={`flex items-center gap-2 px-4 py-2 bg-purple-600 text-white rounded-lg hover:bg-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed ${className}`}
        >
            {loading ? (
                <>
                    <SpinnerIcon className="w-4 h-4" />
                    {loadingText}
                </>
            ) : (
                <>
                    {icon && icon}
                    {children}
                </>
            )}
        </button>
    );
};

export default ActionButton;

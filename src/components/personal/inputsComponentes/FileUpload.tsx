import React from 'react';
import { useTheme } from '../../../hooks/useTheme';
import { PlusIcon } from '../../icons';

interface FileUploadProps {
    onFileChange: (file: File | null) => void;
    accept?: string;
    multiple?: boolean;
    disabled?: boolean;
    error?: string;
    label?: string;
    description?: string;
    className?: string;
    currentFile?: File | null;
    placeholder?: string;
    maxSize?: number; // in MB
}

const FileUpload: React.FC<FileUploadProps> = ({
    onFileChange,
    accept = 'image/*',
    multiple = false,
    disabled = false,
    error,
    label,
    description,
    className = '',
    currentFile,
    placeholder = 'Seleccionar archivo',
    maxSize
}) => {
    const { currentTheme } = useTheme();
    const inputRef = React.useRef<HTMLInputElement>(null);

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0] || null;

        if (file && maxSize && file.size > maxSize * 1024 * 1024) {
            alert(`El archivo es demasiado grande. Tamaño máximo: ${maxSize}MB`);
            return;
        }

        onFileChange(file);
    };

    const handleClick = () => {
        if (!disabled && inputRef.current) {
            inputRef.current.click();
        }
    };

    const handleRemove = (e: React.MouseEvent) => {
        e.stopPropagation();
        onFileChange(null);
        if (inputRef.current) {
            inputRef.current.value = '';
        }
    };

    return (
        <div className={`space-y-2 ${className}`}>
            {/* Label */}
            {label && (
                <label className="block text-sm font-medium" style={{ color: currentTheme.colors.text }}>
                    {label}
                </label>
            )}

            {/* Description */}
            {description && (
                <p className="text-xs" style={{ color: currentTheme.colors.textSecondary }}>
                    {description}
                </p>
            )}

            {/* File Upload Area */}
            <div
                className={`flex flex-col items-center justify-center border-2 border-dashed rounded-lg p-8 h-48 cursor-pointer transition-all duration-200
          ${disabled ? 'opacity-50 cursor-not-allowed' : 'hover:border-purple-400'}
          ${error ? 'border-red-500' : ''}`}
                style={{
                    borderColor: error ? '#ef4444' : currentTheme.colors.border,
                    backgroundColor: currentTheme.colors.background
                }}
                onClick={handleClick}
            >
                <input
                    ref={inputRef}
                    type="file"
                    accept={accept}
                    multiple={multiple}
                    onChange={handleFileChange}
                    disabled={disabled}
                    className="hidden"
                />

                {currentFile ? (
                    <div className="text-center relative">
                        <div className="w-16 h-16 mx-auto mb-2 bg-gray-200 rounded flex items-center justify-center">
                            <span className="text-xs text-gray-500">
                                {currentFile.type.startsWith('image/') ? 'IMG' : 'FILE'}
                            </span>
                        </div>
                        <p className="text-sm mb-2" style={{ color: currentTheme.colors.text }}>
                            {currentFile.name}
                        </p>
                        <button
                            type="button"
                            onClick={handleRemove}
                            className="text-xs px-2 py-1 bg-red-500 text-white rounded hover:bg-red-600 transition-colors"
                        >
                            Eliminar
                        </button>
                    </div>
                ) : (
                    <div className="text-center">
                        <div className="w-16 h-16 mx-auto mb-2 bg-gray-200 rounded flex items-center justify-center">
                            <PlusIcon className="w-8 h-8 text-gray-400" />
                        </div>
                        <p className="text-sm cursor-pointer" style={{ color: currentTheme.colors.primary }}>
                            {placeholder}
                        </p>
                        <p className="text-xs mt-1" style={{ color: currentTheme.colors.textSecondary }}>
                            {currentFile ? 'Archivo seleccionado' : 'Ningún archivo seleccionado'}
                            {maxSize && ` (Máx. ${maxSize}MB)`}
                        </p>
                    </div>
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

export default FileUpload;

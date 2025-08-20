import React, { useCallback, useRef } from 'react';
import { PictureIcon } from '../icons';
import { useTheme } from '../../hooks/useTheme';

interface ProfileImageUploadProps {
    image?: string | null;
    onImageUpload?: (event: React.ChangeEvent<HTMLInputElement>) => void;
    onImageRemove?: () => void;
    size?: 'small' | 'medium' | 'large';
    shape?: 'square' | 'rounded' | 'circle';
    alt?: string;
    maxSize?: number; // en MB
    allowedTypes?: string[];
    className?: string;
    showEditButton?: boolean;
    disabled?: boolean;
}

const ProfileImageUpload: React.FC<ProfileImageUploadProps> = ({
    image,
    onImageUpload,
    size = 'medium',
    shape = 'rounded',
    alt = 'Foto de perfil',
    maxSize = 5,
    allowedTypes = ['image/jpeg', 'image/png', 'image/webp'],
    className = '',
    showEditButton = true,
    disabled = false
}) => {
    const { currentTheme } = useTheme();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Configuración de tamaños
    const sizeClasses = {
        small: 'w-16 h-16',
        medium: 'w-24 h-24',
        large: 'w-32 h-32'
    };

    const shapeClasses = {
        square: 'rounded-none',
        rounded: 'rounded-lg',
        circle: 'rounded-full'
    };

    const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
        if (disabled) return;

        const file = event.target.files?.[0];
        if (!file) return;

        // Validaciones
        const maxSizeBytes = maxSize * 1024 * 1024;

        if (!allowedTypes.includes(file.type)) {
            alert(`Formato no válido. Use: ${allowedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')}`);
            return;
        }

        if (file.size > maxSizeBytes) {
            alert(`La imagen es demasiado grande. Máximo ${maxSize}MB.`);
            return;
        }

        // Llamar al callback proporcionado
        if (onImageUpload) {
            onImageUpload(event);
        }

        // Limpiar el input para permitir subir la misma imagen de nuevo
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, [maxSize, allowedTypes, onImageUpload, disabled]);

    const triggerFileInput = () => {
        if (disabled) return;
        fileInputRef.current?.click();
    };

    return (
        <div className={`relative inline-block ${className}`}>
            <div
                className={`${sizeClasses[size]} ${shapeClasses[shape]} flex items-center justify-center overflow-hidden transition-all duration-200 select-none outline-none focus:outline-none ${!disabled && !image ? 'cursor-pointer hover:opacity-80' : 'cursor-default'}`}
                style={{ background: currentTheme.colors.background }}
                onClick={!image ? triggerFileInput : undefined}
                onMouseDown={(e) => e.preventDefault()}
                tabIndex={-1}
            >
                {image ? (
                    <img
                        src={image}
                        alt={alt}
                        className={`object-cover w-full h-full ${shapeClasses[shape]} select-none`}
                        draggable={false}
                        onMouseDown={(e) => e.preventDefault()}
                    />
                ) : (
                    <div className="text-center p-2 pointer-events-none">
                        <PictureIcon className="w-6 h-6 mx-auto mb-1 text-gray-400" />
                        <div className="text-gray-400 text-xs">Foto del empleado</div>
                        <div className="text-gray-500 text-xs mt-1">
                            {allowedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')}
                        </div>
                        <div className="text-gray-500 text-xs">Máx. {maxSize}MB</div>
                    </div>
                )}
            </div>

            {/* Botón flotante para cambiar imagen */}
            {showEditButton && !disabled && (
                <button
                    className="absolute bottom-0.5 right-0.5 rounded-full p-1 shadow hover:shadow-md transition-shadow select-none"
                    style={{ backgroundColor: currentTheme.colors.primary }}
                    onClick={(e) => {
                        e.stopPropagation();
                        triggerFileInput();
                    }}
                    title="Cambiar imagen"
                    type="button"
                >
                    <PictureIcon className="w-5 h-5 text-white" />
                </button>
            )}

            {/* Input oculto */}
            <input
                ref={fileInputRef}
                type="file"
                accept={allowedTypes.join(',')}
                onChange={handleImageUpload}
                className="hidden"
                disabled={disabled}
            />
        </div>
    );
};

export default ProfileImageUpload;

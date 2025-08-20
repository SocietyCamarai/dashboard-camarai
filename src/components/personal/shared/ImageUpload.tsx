import React, { useCallback, useRef } from 'react';
import { PictureIcon } from '../../icons';
import { useTheme } from '../../../hooks/useTheme';

interface ImageUploadProps {
    image?: string | null;
    onImageUpload: (imageUrl: string) => void;
    onImageRemove: () => void;
    size?: 'small' | 'medium' | 'large';
    shape?: 'square' | 'circle';
    label?: string;
    maxSize?: number; // en MB
    allowedTypes?: string[];
    className?: string;
}

const ImageUpload: React.FC<ImageUploadProps> = ({
    image,
    onImageUpload,
    onImageRemove,
    size = 'medium',
    shape = 'square',
    label = 'Subir imagen',
    maxSize = 5,
    allowedTypes = ['image/jpeg', 'image/png', 'image/webp'],
    className = ''
}) => {
    const { currentTheme } = useTheme();
    const fileInputRef = useRef<HTMLInputElement>(null);

    // Configuración de tamaños
    const sizeClasses = {
        small: 'w-16 h-16',
        medium: 'w-32 h-32',
        large: 'w-48 h-48'
    };

    const shapeClasses = {
        square: 'rounded-lg',
        circle: 'rounded-full'
    };

    const handleImageUpload = useCallback((event: React.ChangeEvent<HTMLInputElement>) => {
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

        const reader = new FileReader();
        reader.onload = (e) => {
            const imageUrl = e.target?.result as string;
            onImageUpload(imageUrl);
        };
        reader.readAsDataURL(file);

        // Limpiar el input para permitir subir la misma imagen de nuevo
        if (fileInputRef.current) {
            fileInputRef.current.value = '';
        }
    }, [maxSize, allowedTypes, onImageUpload]);

    const triggerFileInput = () => {
        fileInputRef.current?.click();
    };

    return (
        <div className={`flex flex-col items-center space-y-4 ${className}`}>
            <div className="relative group">
                <div
                    className={`${sizeClasses[size]} ${shapeClasses[shape]} border-2 border-dashed flex items-center justify-center overflow-hidden transition-all duration-200 hover:border-purple-400 cursor-pointer`}
                    style={{
                        borderColor: currentTheme.colors.border,
                        backgroundColor: currentTheme.colors.background
                    }}
                    onClick={triggerFileInput}
                >
                    {image ? (
                        <>
                            <img
                                src={image}
                                alt={label}
                                className={`w-full h-full object-cover ${shapeClasses[shape]}`}
                            />
                            {/* Overlay para eliminar imagen */}
                            <div className="absolute inset-0 bg-black bg-opacity-50 opacity-0 group-hover:opacity-100 transition-opacity duration-200 flex items-center justify-center">
                                <button
                                    onClick={(e) => {
                                        e.stopPropagation();
                                        onImageRemove();
                                    }}
                                    className="text-white text-xs px-2 py-1 bg-red-500 rounded hover:bg-red-600 transition-colors"
                                >
                                    Eliminar
                                </button>
                            </div>
                        </>
                    ) : (
                        <div className="text-center p-4">
                            <PictureIcon className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                            <div className="text-gray-400 text-xs">{label}</div>
                            <div className="text-gray-500 text-xs mt-1">
                                {allowedTypes.map(type => type.split('/')[1].toUpperCase()).join(', ')}
                            </div>
                            <div className="text-gray-500 text-xs">Máx. {maxSize}MB</div>
                        </div>
                    )}
                </div>

                {/* Botón flotante para cambiar imagen */}
                {image && (
                    <button
                        className="absolute bottom-2 right-2 p-2 bg-purple-600 text-white rounded-full hover:bg-purple-700 transition-colors shadow-lg"
                        onClick={triggerFileInput}
                        title="Cambiar imagen"
                    >
                        <PictureIcon className="w-4 h-4" />
                    </button>
                )}
            </div>

            {/* Input oculto */}
            <input
                ref={fileInputRef}
                type="file"
                accept={allowedTypes.join(',')}
                onChange={handleImageUpload}
                className="hidden"
            />
        </div>
    );
};

export default ImageUpload;

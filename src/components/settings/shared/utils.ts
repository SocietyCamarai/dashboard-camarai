import { useTheme } from '../../../hooks/useTheme';

// Función helper para obtener los colores correctos de los campos de entrada
export const getInputColors = () => {
  const { currentTheme, isDarkTheme } = useTheme();
  
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

// Función helper para obtener los colores correctos de las tarjetas
export const getCardColors = () => {
  const { currentTheme, isDarkTheme } = useTheme();
  
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

// Función para manejar cambios en objetos de datos
export const handleDataChange = <T extends Record<string, any>>(
  data: T,
  field: keyof T,
  value: string,
  setData: (data: T) => void
) => {
  setData({
    ...data,
    [field]: value
  });
};

// Función para manejar cambio de archivos de imagen
export const handleImageChange = (
  event: React.ChangeEvent<HTMLInputElement>,
  onUpdate: (imageUrl: string) => void
) => {
  const file = event.target.files?.[0];
  if (file) {
    const imageUrl = URL.createObjectURL(file);
    onUpdate(imageUrl);
  }
};

// Función para generar IDs únicos
export const generateId = (): number => {
  return Date.now() + Math.random();
};

// Función para formatear fechas
export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('es-ES', {
    year: 'numeric',
    month: '2-digit',
    day: '2-digit'
  });
};

// Función para validar email
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return emailRegex.test(email);
};

// Función para validar teléfono
export const isValidPhone = (phone: string): boolean => {
  const phoneRegex = /^[\+]?[0-9\s\-\(\)]{9,}$/;
  return phoneRegex.test(phone);
}; 
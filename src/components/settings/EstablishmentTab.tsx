import React, { useRef } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { SwitchToggle } from '../SwitchToggle';
import { Trash2Icon } from '../icons';

interface EstablishmentData {
  name: string;
  type: string;
  address: string;
  postalCode: string;
  city: string;
  province: string;
  country: string;
  phone: string;
  email: string;
  hours: string;
}

interface EstablishmentTabProps {
  establishmentData: EstablishmentData;
  onUpdateEstablishmentData: (data: EstablishmentData) => void;
  isActive: boolean;
  onToggleActive: (active: boolean) => void;
  logo: string;
  onUpdateLogo: (logo: string) => void;
}

// Componentes reutilizables
const Card: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => {
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

const CardHeader: React.FC<{ title: string; subtitle?: string }> = ({ title, subtitle }) => {
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

const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`p-6 pt-0 ${className}`}>
    {children}
  </div>
);

const CardFooter: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { currentTheme } = useTheme();
  
  return (
    <div className="flex items-center p-6 border-t px-6 py-4" style={{ borderTopColor: currentTheme.colors.border }}>
      {children}
    </div>
  );
};



const SecondaryButton: React.FC<{ children: React.ReactNode; onClick?: () => void; disabled?: boolean; type?: "button" | "submit"; className?: string }> = ({ 
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

const Input: React.FC<{
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

export const EstablishmentTab: React.FC<EstablishmentTabProps> = ({ 
  establishmentData, 
  onUpdateEstablishmentData, 
  isActive, 
  onToggleActive, 
  logo, 
  onUpdateLogo 
}) => {
  const { currentTheme, getButtonTextColor } = useTheme();
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Manejar cambio de logo del establecimiento
  const handleLogoChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // Validar tipo de archivo
      const allowedTypes = ['image/jpeg', 'image/jpg', 'image/png', 'image/gif', 'image/webp'];
      if (!allowedTypes.includes(file.type)) {
        alert('Solo se permiten archivos de imagen (JPEG, PNG, GIF, WebP)');
        return;
      }
      
      // Validar tamaño (máximo 5MB)
      const maxSize = 5 * 1024 * 1024; // 5MB
      if (file.size > maxSize) {
        alert('El archivo es demasiado grande. Máximo 5MB');
        return;
      }
      
      const imageUrl = URL.createObjectURL(file);
      onUpdateLogo(imageUrl);
    }
  };

  // Sanitizar entrada de texto
  const sanitizeInput = (input: string): string => {
    return input.trim().replace(/[<>]/g, '');
  };

  // Validar email
  const isValidEmail = (email: string): boolean => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  // Validar teléfono
  const isValidPhone = (phone: string): boolean => {
    const phoneRegex = /^[\+]?[0-9\s\-\(\)]{9,}$/;
    return phoneRegex.test(phone);
  };

  // Manejar cambios en los datos del establecimiento
  const handleDataChange = (field: keyof EstablishmentData, value: string) => {
    // Validar datos específicos
    if (field === 'email' && value && !isValidEmail(value)) {
      alert('Por favor, introduce un email válido');
      return;
    }

    if (field === 'phone' && value && !isValidPhone(value)) {
      alert('Por favor, introduce un teléfono válido');
      return;
    }

    // Sanitizar valor
    const sanitizedValue = sanitizeInput(value);

    onUpdateEstablishmentData({
      ...establishmentData,
      [field]: sanitizedValue
    });
  };

  return (
    <Card>
      <CardHeader title="Datos del Establecimiento" />
      <CardContent>
        {/* Bloque de Identidad del Establecimiento */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <span className="relative flex shrink-0 overflow-hidden rounded-md h-24 w-24">
              <img className="aspect-square h-full w-full rounded-md" alt="Establishment Logo" data-ai-hint="restaurant logo" src={logo} />
            </span>
            <button
              className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 absolute bottom-0 right-0 rounded-full h-8 w-8"
              type="button"
              onClick={() => logoInputRef.current?.click()}
              style={{
                backgroundColor: currentTheme.colors.primary,
                color: getButtonTextColor(currentTheme),
                borderColor: currentTheme.colors.border
              }}
            >
              <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-camera h-4 w-4">
                <path d="M14.5 4h-5L7 7H4a2 2 0 0 0-2 2v9a2 2 0 0 0 2 2h16a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-3l-2.5-3z"></path>
                <circle cx="12" cy="13" r="3"></circle>
              </svg>
            </button>
            <input
              className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm hidden"
              accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
              type="file"
              ref={logoInputRef}
              onChange={handleLogoChange}
            />
          </div>
          <div className="grid gap-1.5 flex-grow text-center md:text-left">
            <h2 className="text-2xl font-bold" style={{ color: currentTheme.colors.text }}>{establishmentData.name}</h2>
            <p style={{ color: currentTheme.colors.textSecondary }}>{establishmentData.type}</p>
          </div>
        </div>

        {/* Campos del Formulario */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            id="name"
            label="Nombre"
            value={establishmentData.name}
            onChange={(value) => handleDataChange('name', value)}
            autoComplete="organization"
          />
          <Input
            id="type"
            label="Tipo"
            value={establishmentData.type}
            onChange={(value) => handleDataChange('type', value)}
            autoComplete="organization-title"
          />
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="address" style={{ color: currentTheme.colors.text }}>Dirección</label>
            <input
              className="flex h-10 w-full rounded-md border px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              id="address"
              value={establishmentData.address}
              onChange={(e) => handleDataChange('address', e.target.value)}
              autoComplete="street-address"
              style={{
                backgroundColor: currentTheme.colors.inputBackgroundDark || currentTheme.colors.white,
                borderColor: currentTheme.colors.border,
                color: currentTheme.colors.text
              }}
            />
          </div>
          <Input
            id="postalCode"
            label="Código Postal"
            value={establishmentData.postalCode}
            onChange={(value) => handleDataChange('postalCode', value)}
            autoComplete="postal-code"
          />
          <Input
            id="city"
            label="Ciudad"
            value={establishmentData.city}
            onChange={(value) => handleDataChange('city', value)}
            autoComplete="address-level2"
          />
          <Input
            id="province"
            label="Provincia"
            value={establishmentData.province}
            onChange={(value) => handleDataChange('province', value)}
            autoComplete="address-level1"
          />
          <Input
            id="country"
            label="País"
            value={establishmentData.country}
            onChange={(value) => handleDataChange('country', value)}
            autoComplete="country"
          />
          <Input
            id="establishment-phone"
            label="Teléfono"
            value={establishmentData.phone}
            onChange={(value) => handleDataChange('phone', value)}
            type="tel"
            autoComplete="tel"
          />
          <Input
            id="establishment-email"
            label="Email"
            value={establishmentData.email}
            onChange={(value) => handleDataChange('email', value)}
            type="email"
            autoComplete="email"
          />
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="hours" style={{ color: currentTheme.colors.text }}>Horario</label>
            <textarea
              className="flex min-h-[80px] w-full rounded-md border px-3 py-2 text-base ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              id="hours"
              value={establishmentData.hours}
              onChange={(e) => handleDataChange('hours', e.target.value)}
              style={{
                backgroundColor: currentTheme.colors.inputBackgroundDark || currentTheme.colors.white,
                borderColor: currentTheme.colors.border,
                color: currentTheme.colors.text
              }}
            />
          </div>
          <div className="flex items-center space-x-2">
            <SwitchToggle
              isActive={isActive}
              onToggle={() => onToggleActive(!isActive)}
              size="md"
            />
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" style={{ color: currentTheme.colors.text }}>Establecimiento Activo</label>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <div className="flex justify-between">
          <SecondaryButton>
            Guardar Cambios
          </SecondaryButton>
          <SecondaryButton onClick={() => {}}>
            <Trash2Icon />
            Eliminar Establecimiento
          </SecondaryButton>
        </div>
      </CardFooter>
    </Card>
  );
}; 
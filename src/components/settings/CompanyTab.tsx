import React, { useRef } from 'react';
import { useTheme } from '../../hooks/useTheme';

interface CompanyData {
  commercialName: string;
  legalName: string;
  nif: string;
  website: string;
  address: string;
}

interface CompanyTabProps {
  companyData: CompanyData;
  onUpdateCompanyData: (data: CompanyData) => void;
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

const PrimaryButton: React.FC<{ children: React.ReactNode; onClick?: () => void; disabled?: boolean; type?: "button" | "submit" }> = ({ 
  children, 
  onClick, 
  disabled = false, 
  type = "button" 
}) => {
  const { currentTheme, getButtonTextColor } = useTheme();
  
  return (
    <button
      type={type}
      disabled={disabled}
      onClick={onClick}
      className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-10 px-4 py-2"
      style={{
        backgroundColor: currentTheme.colors.primary,
        color: getButtonTextColor(currentTheme)
      }}
    >
      {children}
    </button>
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

export const CompanyTab: React.FC<CompanyTabProps> = ({ 
  companyData, 
  onUpdateCompanyData, 
  logo, 
  onUpdateLogo 
}) => {
  const { currentTheme, getButtonTextColor } = useTheme();
  const logoInputRef = useRef<HTMLInputElement>(null);

  // Manejar cambio de logo de la empresa
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

  // Validar NIF español
  const isValidNIF = (nif: string): boolean => {
    const nifRegex = /^[0-9]{8}[A-Z]$|^[A-Z][0-9]{7}[A-Z]$|^[0-9]{8}[A-Z][0-9]$/;
    return nifRegex.test(nif.toUpperCase());
  };

  // Validar URL
  const isValidURL = (url: string): boolean => {
    try {
      new URL(url);
      return true;
    } catch {
      return false;
    }
  };

  // Manejar cambios en los datos de la empresa
  const handleDataChange = (field: keyof CompanyData, value: string) => {
    // Validar datos específicos
    if (field === 'nif' && value && !isValidNIF(value)) {
      alert('Por favor, introduce un NIF válido');
      return;
    }

    if (field === 'website' && value && !isValidURL(value)) {
      alert('Por favor, introduce una URL válida');
      return;
    }

    // Sanitizar valor
    const sanitizedValue = sanitizeInput(value);

    onUpdateCompanyData({
      ...companyData,
      [field]: sanitizedValue
    });
  };

  return (
    <Card>
      <CardHeader title="Información de la Empresa" />
      <CardContent>
        {/* Bloque de Identidad de la Empresa */}
        <div className="flex flex-col md:flex-row items-center gap-6">
          <div className="relative">
            <span className="relative flex shrink-0 overflow-hidden rounded-md h-24 w-24">
              {typeof logo === 'string' && logo.length === 1 ? (
                <span className="flex h-full w-full items-center justify-center rounded-md bg-muted">{logo}</span>
              ) : (
                <img className="aspect-square h-full w-full rounded-md" alt="Company Logo" src={logo} />
              )}
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
              className="h-10 w-full rounded-md border px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm hidden"
              accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
              type="file"
              ref={logoInputRef}
              onChange={handleLogoChange}
              style={{
                backgroundColor: currentTheme.colors.white,
                borderColor: currentTheme.colors.border,
                color: currentTheme.colors.text
              }}
            />
          </div>
          <div className="grid gap-1.5 flex-grow text-center md:text-left">
            <h2 className="text-2xl font-bold" style={{ color: currentTheme.colors.text }}>{companyData.commercialName}</h2>
            <p style={{ color: currentTheme.colors.textSecondary }}>{companyData.legalName}</p>
          </div>
        </div>

        {/* Campos del Formulario y Plan */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <Input
            id="compName"
            label="Nombre Comercial"
            value={companyData.commercialName}
            onChange={(value) => handleDataChange('commercialName', value)}
          />
          <Input
            id="compLegalName"
            label="Razón Social"
            value={companyData.legalName}
            onChange={(value) => handleDataChange('legalName', value)}
          />
          <Input
            id="compNif"
            label="NIF"
            value={companyData.nif}
            onChange={(value) => handleDataChange('nif', value)}
          />
          <Input
            id="compWebsite"
            label="Sitio Web"
            value={companyData.website}
            onChange={(value) => handleDataChange('website', value)}
          />
          <div className="space-y-2 md:col-span-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="compAddress" style={{ color: currentTheme.colors.text }}>Dirección Fiscal</label>
            <input
              className="flex h-10 w-full rounded-md border px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm"
              id="compAddress"
              value={companyData.address}
              onChange={(e) => handleDataChange('address', e.target.value)}
              style={{
                backgroundColor: currentTheme.colors.inputBackgroundDark || currentTheme.colors.white,
                borderColor: currentTheme.colors.border,
                color: currentTheme.colors.text
              }}
            />
          </div>
          <div className="space-y-2">
            <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" style={{ color: currentTheme.colors.text }}>Plan Actual</label>
            <p className="text-lg font-semibold" style={{ color: currentTheme.colors.primary }}>Profesional</p>
            <p className="text-xs" style={{ color: currentTheme.colors.textSecondary }}>Renueva el: 31/12/2024</p>
          </div>
          <div className="space-y-2 self-end">
            <SecondaryButton>
              Cambiar de Plan
            </SecondaryButton>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <PrimaryButton>
          Guardar Cambios
        </PrimaryButton>
      </CardFooter>
    </Card>
  );
}; 
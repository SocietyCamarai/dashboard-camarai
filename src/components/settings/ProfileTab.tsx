import React, { useState, useRef } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { CameraIcon, ChevronDownIcon } from '../icons';

interface User {
  id: number;
  email: string;
  nombre: string;
  apellidos: string;
  telefono: string;
  foto: string;
  estado: 'activo' | 'inactivo';
  onboardingCompleto: boolean;
}

interface ProfileTabProps {
  user: User;
  onUpdateUser: (userData: Partial<User>) => void;
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

export const ProfileTab: React.FC<ProfileTabProps> = ({ user, onUpdateUser }) => {
  const { currentTheme, getButtonTextColor } = useTheme();
  const fileInputRef = useRef<HTMLInputElement>(null);
  
  const [isLoading, setIsLoading] = useState(false);
  const [firstName, setFirstName] = useState(user?.nombre || '');
  const [lastName, setLastName] = useState(user?.apellidos || '');
  const [email, setEmail] = useState(user?.email || '');
  const [phone, setPhone] = useState(user?.telefono || '');
  const [password, setPassword] = useState('');
  const [pin, setPin] = useState('');
  const [status] = useState(user?.estado === 'activo' ? 'Activo' : 'Inactivo');
  const [avatar, setAvatar] = useState(user?.foto || 'https://placehold.co/40x40');

  // Manejar cambio de avatar
  const handleAvatarChange = (event: React.ChangeEvent<HTMLInputElement>) => {
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
      setAvatar(imageUrl);
    }
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

  // Sanitizar entrada de texto
  const sanitizeInput = (input: string): string => {
    return input.trim().replace(/[<>]/g, '');
  };

  // Manejar envío del formulario
  const handleSubmit = async (event: React.FormEvent) => {
    event.preventDefault();
    
    // Rate limiting - prevenir múltiples envíos
    if (isLoading) return;
    
    setIsLoading(true);

    try {
      // Validar datos antes de enviar
      if (!firstName.trim() || !lastName.trim()) {
        alert('El nombre y apellidos son obligatorios');
        return;
      }

      if (!isValidEmail(email)) {
        alert('Por favor, introduce un email válido');
        return;
      }

      if (phone && !isValidPhone(phone)) {
        alert('Por favor, introduce un teléfono válido');
        return;
      }

      // Sanitizar datos
      const sanitizedData = {
        nombre: sanitizeInput(firstName),
        apellidos: sanitizeInput(lastName),
        email: email.toLowerCase().trim(),
        telefono: sanitizeInput(phone)
      };

      // Actualizar usuario con los datos sanitizados
      onUpdateUser(sanitizedData);

      // Solo incluir password y pin si no están vacíos
      if (password.trim()) {
        // Aquí se manejaría la actualización de contraseña
      }
      if (pin.trim()) {
        // Aquí se manejaría la actualización de PIN
      }

      // Simular delay de red (optimizado para evitar bloqueos)
      await new Promise(resolve => {
        // Usar requestIdleCallback si está disponible, sino requestAnimationFrame
        const scheduleCallback = window.requestIdleCallback || requestAnimationFrame;
        scheduleCallback(() => {
          setTimeout(resolve, 1000);
        });
      });
      
      onUpdateUser({
        ...user,
        ...sanitizedData,
        estado: status === 'Activo' ? 'activo' : 'inactivo'
      });

      // Limpiar campos de contraseña
      setPassword('');
      setPin('');
    } catch (error) {
      console.error('Error al actualizar perfil:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card>
      <CardHeader title="Información del Perfil" />
      <form onSubmit={handleSubmit}>
        <CardContent className="space-y-6">
          <div className="flex flex-col md:flex-row items-center gap-6">
            <div className="relative">
              <span className="relative flex shrink-0 overflow-hidden rounded-md h-24 w-24">
                <img className="aspect-square h-full w-full rounded-md" alt="@user" data-ai-hint="profile user" src={avatar} />
              </span>
              <button
                type="button"
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 absolute bottom-0 right-0 rounded-full h-8 w-8"
                onClick={() => fileInputRef.current?.click()}
                style={{
                  backgroundColor: currentTheme.colors.primary,
                  color: getButtonTextColor(currentTheme)
                }}
              >
                <CameraIcon />
                <span className="sr-only">Cambiar foto</span>
              </button>
              <input
                ref={fileInputRef}
                className="h-10 w-full rounded-md border border-input bg-background px-3 py-2 text-base ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium file:text-foreground placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 md:text-sm hidden"
                accept="image/jpeg,image/jpg,image/png,image/gif,image/webp"
                type="file"
                onChange={handleAvatarChange}
              />
            </div>
            <div className="grid gap-1.5 flex-grow text-center md:text-left">
              <h2 className="text-2xl font-bold" style={{ color: currentTheme.colors.text }}>Fénix Samarai</h2>
              <p style={{ color: currentTheme.colors.textSecondary }}>fenix@camarai.es</p>
              <p className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>Último login: 12/07/2024 10:30 AM</p>
            </div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <Input
              id="firstName"
              label="Nombre"
              value={firstName}
              onChange={setFirstName}
              autoComplete="given-name"
            />
            <Input
              id="lastName"
              label="Apellidos"
              value={lastName}
              onChange={setLastName}
              autoComplete="family-name"
            />
            <Input
              id="profile-email"
              label="Email"
              value={email}
              onChange={setEmail}
              type="email"
              autoComplete="email"
            />
            <Input
              id="profile-phone"
              label="Teléfono"
              value={phone}
              onChange={setPhone}
              type="tel"
              autoComplete="tel"
            />
            <Input
              id="password"
              label="Contraseña"
              value={password}
              onChange={setPassword}
              type="password"
              placeholder="••••••••"
              autoComplete="off"
            />
            <Input
              id="pin"
              label="PIN de seguridad"
              value={pin}
              onChange={setPin}
              type="password"
              placeholder="••••"
              maxLength={4}
              autoComplete="off"
            />
            <div className="space-y-2">
              <label className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70" htmlFor="status" style={{ color: currentTheme.colors.text }}>Estado</label>
              <button
                type="button"
                role="combobox"
                aria-controls="radix-«rff»"
                aria-expanded="false"
                aria-autocomplete="none"
                dir="ltr"
                data-state="closed"
                className="flex h-10 w-full items-center justify-between rounded-md border px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring focus:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50 [&>span]:line-clamp-1"
                style={{
                  backgroundColor: currentTheme.colors.inputBackgroundDark || currentTheme.colors.white,
                  borderColor: currentTheme.colors.border,
                  color: currentTheme.colors.text
                }}
              >
                <span style={{ pointerEvents: 'none', color: currentTheme.colors.text }}>{status}</span>
                <ChevronDownIcon />
              </button>
            </div>
          </div>
        </CardContent>
        <CardFooter>
          <PrimaryButton type="submit" disabled={isLoading}>
            {isLoading ? 'Guardando...' : 'Guardar Cambios'}
          </PrimaryButton>
        </CardFooter>
      </form>
    </Card>
  );
}; 
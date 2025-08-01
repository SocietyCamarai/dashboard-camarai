import React, { useState } from 'react';
import { useTheme } from '../../hooks/useTheme';
import { EllipsisVerticalIcon, CirclePlusIcon } from '../icons';
import { Card, CardHeader, CardContent, CardFooter, PrimaryButton } from './shared/UIComponents';

interface Provider {
  id: number;
  name: string;
  contact: string;
  email: string;
  phone: string;
}

interface ProvidersTabProps {
  providers: Provider[];
  onUpdateProviders: (providers: Provider[]) => void;
}

export const ProvidersTab: React.FC<ProvidersTabProps> = ({ providers, onUpdateProviders }) => {
  const { currentTheme } = useTheme();
  const [isAddingProvider, setIsAddingProvider] = useState(false);
  const [newProvider, setNewProvider] = useState<Omit<Provider, 'id'>>({
    name: '',
    contact: '',
    email: '',
    phone: ''
  });

  // Manejar eliminación de proveedor
  const handleDeleteProvider = (providerId: number) => {
    onUpdateProviders(providers.filter(provider => provider.id !== providerId));
  };

  // Manejar edición de proveedor
  const handleEditProvider = (_providerId: number) => {
    // Aquí se implementaría la lógica para editar un proveedor
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

  // Manejar añadir nuevo proveedor
  const handleAddProvider = () => {
    if (!newProvider.name.trim()) {
      alert('El nombre del proveedor es obligatorio');
      return;
    }

    if (!newProvider.contact.trim()) {
      alert('El contacto es obligatorio');
      return;
    }

    if (!newProvider.email.trim()) {
      alert('El email es obligatorio');
      return;
    }

    if (!isValidEmail(newProvider.email)) {
      alert('Por favor, introduce un email válido');
      return;
    }

    if (!newProvider.phone.trim()) {
      alert('El teléfono es obligatorio');
      return;
    }

    if (!isValidPhone(newProvider.phone)) {
      alert('Por favor, introduce un teléfono válido');
      return;
    }

    // Sanitizar datos
    const sanitizedProvider: Provider = {
      id: Date.now() + Math.random(),
      name: sanitizeInput(newProvider.name),
      contact: sanitizeInput(newProvider.contact),
      email: newProvider.email.toLowerCase().trim(),
      phone: sanitizeInput(newProvider.phone)
    };

    onUpdateProviders([...providers, sanitizedProvider]);
    setNewProvider({ name: '', contact: '', email: '', phone: '' });
    setIsAddingProvider(false);
  };

  // Manejar cambios en el formulario de nuevo proveedor
  const handleNewProviderChange = (field: keyof Omit<Provider, 'id'>, value: string) => {
    setNewProvider(prev => ({
      ...prev,
      [field]: value
    }));
  };

  return (
    <Card>
      <CardHeader title="Proveedores" />
      <CardContent>
        {/* Lista de proveedores existentes */}
        {providers.map((provider) => (
          <div key={provider.id} className="p-4 border rounded-lg space-y-4 mb-4" style={{ borderColor: currentTheme.colors.border }}>
            <div className="flex justify-between items-start">
              <div>
                <h3 className="font-semibold" style={{ color: currentTheme.colors.text }}>{provider.name}</h3>
                <p className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>Contacto: {provider.contact}</p>
              </div>
              <button 
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-8 w-8" 
                type="button" 
                aria-haspopup="menu" 
                aria-expanded="false" 
                data-state="closed" 
                style={{ color: currentTheme.colors.textSecondary }}
                onClick={() => handleEditProvider(provider.id)}
              >
                <EllipsisVerticalIcon />
              </button>
            </div>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-1">
                <label className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-xs" style={{ color: currentTheme.colors.textSecondary }}>Email</label>
                <p className="text-sm" style={{ color: currentTheme.colors.text }}>{provider.email}</p>
              </div>
              <div className="space-y-1">
                <label className="font-medium peer-disabled:cursor-not-allowed peer-disabled:opacity-70 text-xs" style={{ color: currentTheme.colors.textSecondary }}>Teléfono</label>
                <p className="text-sm" style={{ color: currentTheme.colors.text }}>{provider.phone}</p>
              </div>
            </div>
            <div className="flex gap-2">
              <button
                className="text-xs px-2 py-1 rounded border"
                style={{ 
                  borderColor: currentTheme.colors.border,
                  color: currentTheme.colors.textSecondary,
                  backgroundColor: currentTheme.colors.inputBackgroundDark || currentTheme.colors.white
                }}
                onClick={() => handleEditProvider(provider.id)}
              >
                Editar
              </button>
              <button
                className="text-xs px-2 py-1 rounded border"
                style={{ 
                  borderColor: currentTheme.colors.error,
                  color: currentTheme.colors.error,
                  backgroundColor: currentTheme.colors.inputBackgroundDark || currentTheme.colors.white
                }}
                onClick={() => handleDeleteProvider(provider.id)}
              >
                Eliminar
              </button>
            </div>
          </div>
        ))}

        {/* Formulario para añadir nuevo proveedor */}
        {isAddingProvider && (
          <div className="p-4 border rounded-lg space-y-4" style={{ borderColor: currentTheme.colors.border }}>
            <h4 className="font-semibold" style={{ color: currentTheme.colors.text }}>Nuevo Proveedor</h4>
            <div className="grid md:grid-cols-2 gap-4">
              <div className="space-y-2">
                <label className="text-sm font-medium" style={{ color: currentTheme.colors.text }}>Nombre</label>
                <input
                  className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                  value={newProvider.name}
                  onChange={(e) => handleNewProviderChange('name', e.target.value)}
                  style={{
                    backgroundColor: currentTheme.colors.white,
                    borderColor: currentTheme.colors.border,
                    color: currentTheme.colors.text
                  }}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" style={{ color: currentTheme.colors.text }}>Contacto</label>
                <input
                  className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                  value={newProvider.contact}
                  onChange={(e) => handleNewProviderChange('contact', e.target.value)}
                  style={{
                    backgroundColor: currentTheme.colors.white,
                    borderColor: currentTheme.colors.border,
                    color: currentTheme.colors.text
                  }}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" style={{ color: currentTheme.colors.text }}>Email</label>
                <input
                  className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                  type="email"
                  value={newProvider.email}
                  onChange={(e) => handleNewProviderChange('email', e.target.value)}
                  style={{
                    backgroundColor: currentTheme.colors.white,
                    borderColor: currentTheme.colors.border,
                    color: currentTheme.colors.text
                  }}
                />
              </div>
              <div className="space-y-2">
                <label className="text-sm font-medium" style={{ color: currentTheme.colors.text }}>Teléfono</label>
                <input
                  className="flex h-10 w-full rounded-md border px-3 py-2 text-sm"
                  type="tel"
                  value={newProvider.phone}
                  onChange={(e) => handleNewProviderChange('phone', e.target.value)}
                  style={{
                    backgroundColor: currentTheme.colors.white,
                    borderColor: currentTheme.colors.border,
                    color: currentTheme.colors.text
                  }}
                />
              </div>
            </div>
            <div className="flex gap-2">
              <PrimaryButton onClick={handleAddProvider}>
                Guardar Proveedor
              </PrimaryButton>
              <button
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 border h-10 px-4 py-2"
                onClick={() => {
                  setIsAddingProvider(false);
                  setNewProvider({ name: '', contact: '', email: '', phone: '' });
                }}
                style={{
                  backgroundColor: currentTheme.colors.white,
                  borderColor: currentTheme.colors.border,
                  color: currentTheme.colors.text
                }}
              >
                Cancelar
              </button>
            </div>
          </div>
        )}
      </CardContent>
      <CardFooter>
        {!isAddingProvider && (
          <PrimaryButton onClick={() => setIsAddingProvider(true)}>
            <CirclePlusIcon />
            Añadir Proveedor
          </PrimaryButton>
        )}
      </CardFooter>
    </Card>
  );
}; 
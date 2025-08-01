import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { SwitchToggle } from '../SwitchToggle';
import { EllipsisVerticalIcon } from '../icons';
import { Card, CardHeader, CardContent, CardFooter, SecondaryButton } from './shared/UIComponents';

interface Integration {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  icon: 'whatsapp' | 'facebook' | 'instagram' | 'square';
}

interface IntegrationsTabProps {
  integrations: Integration[];
  onUpdateIntegrations: (integrations: Integration[]) => void;
}

export const IntegrationsTab: React.FC<IntegrationsTabProps> = ({ integrations, onUpdateIntegrations }) => {
  const { currentTheme } = useTheme();

  // Manejar toggle de integraciones
  const handleIntegrationToggle = (integrationId: number) => {
    onUpdateIntegrations(
      integrations.map(integration => 
        integration.id === integrationId 
          ? { ...integration, isActive: !integration.isActive }
          : integration
      )
    );
  };

  // Obtener icono de integración según el tipo
  const getIntegrationIcon = (iconType: string) => {
    switch (iconType) {
      case 'whatsapp':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-message-circle h-4 w-4" style={{ color: '#25D366' }}>
            <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
          </svg>
        );
      case 'facebook':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-facebook h-4 w-4" style={{ color: '#1877F2' }}>
            <path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"></path>
          </svg>
        );
      case 'instagram':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-instagram h-4 w-4" style={{ color: '#E4405F' }}>
            <rect width="20" height="20" x="2" y="2" rx="5" ry="5"></rect>
            <path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"></path>
            <line x1="17.5" x2="17.51" y1="6.5" y2="6.5"></line>
          </svg>
        );
      case 'square':
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-credit-card h-4 w-4" style={{ color: '#00C851' }}>
            <rect width="20" height="14" x="2" y="5" rx="2"></rect>
            <line x1="2" x2="22" y1="10" y2="10"></line>
          </svg>
        );
      default:
        return (
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-settings h-4 w-4">
            <path d="M12.22 2h-.44a2 2 0 0 0-2 2v.18a2 2 0 0 1-1 1.73l-.43.25a2 2 0 0 1-2 0l-.15-.08a2 2 0 0 0-2.73.73l-.22.38a2 2 0 0 0 .73 2.73l.15.1a2 2 0 0 1 1 1.72v.51a2 2 0 0 1-1 1.74l-.15.09a2 2 0 0 0-.73 2.73l.22.38a2 2 0 0 0 2.73.73l.15-.08a2 2 0 0 1 2 0l.43.25a2 2 0 0 1 1 1.73V20a2 2 0 0 0 2 2h.44a2 2 0 0 0 2-2v-.18a2 2 0 0 1 1-1.73l.43-.25a2 2 0 0 1 2 0l.15.08a2 2 0 0 0 2.73-.73l.22-.39a2 2 0 0 0-.73-2.73l-.15-.08a2 2 0 0 1-1-1.74v-.5a2 2 0 0 1 1-1.74l.15-.09a2 2 0 0 0 .73-2.73l-.22-.38a2 2 0 0 0-2.73-.73l-.15.08a2 2 0 0 1-2 0l-.43-.25a2 2 0 0 1-1-1.73V4a2 2 0 0 0-2-2z"></path>
            <circle cx="12" cy="12" r="3"></circle>
          </svg>
        );
    }
  };

  // Manejar configuración de integración
  const handleConfigureIntegration = (_integrationId: number) => {
    // Aquí se implementaría la lógica para configurar una integración
  };

  return (
    <Card>
      <CardHeader title="Integraciones" />
      <CardContent>
        {integrations.map((integration) => (
          <div key={integration.id} className="flex items-center justify-between p-4 border rounded-lg mb-4" style={{ borderColor: currentTheme.colors.border }}>
            <div className="flex items-center gap-4">
              {getIntegrationIcon(integration.icon)}
              <div>
                <h3 className="font-semibold" style={{ color: currentTheme.colors.text }}>{integration.name}</h3>
                <p className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>{integration.description}</p>
              </div>
            </div>
            <div className="flex items-center gap-2">
              <SwitchToggle
                isActive={integration.isActive}
                onToggle={() => handleIntegrationToggle(integration.id)}
                size="sm"
              />
              <button 
                className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-8 w-8" 
                type="button" 
                aria-haspopup="menu" 
                aria-expanded="false" 
                data-state="closed" 
                style={{ color: currentTheme.colors.textSecondary }}
                onClick={() => handleConfigureIntegration(integration.id)}
              >
                <EllipsisVerticalIcon />
              </button>
            </div>
          </div>
        ))}

        {/* Información adicional sobre integraciones */}
        <div className="mt-6 p-4 border rounded-lg" style={{ borderColor: currentTheme.colors.border }}>
          <h4 className="font-semibold mb-2" style={{ color: currentTheme.colors.text }}>¿Necesitas más integraciones?</h4>
          <p className="text-sm mb-3" style={{ color: currentTheme.colors.textSecondary }}>
            Conecta tu negocio con más plataformas y herramientas para optimizar tus operaciones.
          </p>
          <div className="grid md:grid-cols-2 gap-4 text-sm">
            <div>
              <h5 className="font-medium mb-1" style={{ color: currentTheme.colors.text }}>Integraciones Disponibles:</h5>
              <ul className="space-y-1" style={{ color: currentTheme.colors.textSecondary }}>
                <li>• Google My Business</li>
                <li>• TripAdvisor</li>
                <li>• Deliveroo</li>
                <li>• Uber Eats</li>
                <li>• Glovo</li>
              </ul>
            </div>
            <div>
              <h5 className="font-medium mb-1" style={{ color: currentTheme.colors.text }}>Próximamente:</h5>
              <ul className="space-y-1" style={{ color: currentTheme.colors.textSecondary }}>
                <li>• Shopify</li>
                <li>• WooCommerce</li>
                <li>• Mailchimp</li>
                <li>• HubSpot</li>
                <li>• Zapier</li>
              </ul>
            </div>
          </div>
        </div>
      </CardContent>
      <CardFooter>
        <SecondaryButton>
          Ver más integraciones
        </SecondaryButton>
      </CardFooter>
    </Card>
  );
}; 
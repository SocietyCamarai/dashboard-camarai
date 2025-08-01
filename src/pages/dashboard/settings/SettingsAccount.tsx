import React, { useState, useEffect } from 'react';
import { useSearchParams } from 'react-router-dom';
import { useTheme } from '../../../hooks/useTheme';
import { 
  ProfileTab, 
  DevicesTab, 
  EstablishmentTab, 
  CompanyTab, 
  ProvidersTab, 
  IntegrationsTab, 
  TaxesTab 
} from '../../../components/settings';
import { Header } from '../../../components';

// Interfaces específicas
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

interface Device {
  id: number;
  name: string;
  model: string;
  isActive: boolean;
  connectionType: 'wifi' | 'cable';
}

interface Devices {
  printers: Device[];
  kds: Device[];
  pos: Device[];
  cashRegisters: Device[];
}

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

interface CompanyData {
  commercialName: string;
  legalName: string;
  nif: string;
  website: string;
  address: string;
}

interface Provider {
  id: number;
  name: string;
  contact: string;
  email: string;
  phone: string;
}

interface Integration {
  id: number;
  name: string;
  description: string;
  isActive: boolean;
  icon: 'whatsapp' | 'facebook' | 'instagram' | 'square';
}

interface Tax {
  id: number;
  name: string;
  percentage: string;
}

interface Tab {
  id: string;
  label: string;
  icon: React.ComponentType<{ style?: React.CSSProperties }>;
}

// Iconos SVG como componentes funcionales con soporte para props style
const UsersIcon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users h-4 w-4 mr-2" style={style}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
  </svg>
);

const StoreIcon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-store h-4 w-4 mr-2" style={style}>
    <path d="m2 7 4.41-4.41A2 2 0 0 1 7.83 2h8.34a2 2 0 0 1 1.42.59L22 7"></path>
    <path d="M4 12v8a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2v-8"></path>
    <path d="M15 22v-4a2 2 0 0 0-2-2h-2a2 2 0 0 0-2 2v4"></path>
    <path d="M2 7h20"></path>
    <path d="M22 7v3a2 2 0 0 1-2 2a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 16 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 12 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 8 12a2.7 2.7 0 0 1-1.59-.63.7.7 0 0 0-.82 0A2.7 2.7 0 0 1 4 12a2 2 0 0 1-2-2V7"></path>
  </svg>
);

const PrinterIcon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-printer h-4 w-4 mr-2" style={style}>
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
    <path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"></path>
    <rect x="6" y="14" width="12" height="8" rx="1"></rect>
  </svg>
);

const Building2Icon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-building2 h-4 w-4 mr-2" style={style}>
    <path d="M6 22V4a2 2 0 0 1 2-2h8a2 2 0 0 1 2 2v18Z"></path>
    <path d="M6 12H4a2 2 0 0 0-2 2v6a2 2 0 0 0 2 2h2"></path>
    <path d="M18 9h2a2 2 0 0 1 2 2v9a2 2 0 0 1-2 2h-2"></path>
    <path d="M10 6h4"></path>
    <path d="M10 10h4"></path>
    <path d="M10 14h4"></path>
    <path d="M10 18h4"></path>
  </svg>
);

const PlugIcon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-plug h-4 w-4 mr-2" style={style}>
    <path d="M12 22v-5"></path>
    <path d="M9 8V2"></path>
    <path d="M15 8V2"></path>
    <path d="M18 8v5a4 4 0 0 1-4 4h-4a4 4 0 0 1-4-4V8Z"></path>
  </svg>
);

const PercentIcon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-percent h-4 w-4 mr-2" style={style}>
    <line x1="19" x2="5" y1="5" y2="19"></line>
    <circle cx="6.5" cy="6.5" r="2.5"></circle>
    <circle cx="17.5" cy="17.5" r="2.5"></circle>
  </svg>
);



// Mock del hook useAuth
const useAuth = () => {
  return {
    user: {
      id: 1,
      email: 'fenix@camarai.es',
      nombre: 'Fénix',
      apellidos: 'Samarai',
      telefono: '+34 600 000 000',
      foto: 'https://placehold.co/40x40',
      estado: 'activo' as const,
      onboardingCompleto: true
    } as User,
    isLoading: false,
    isAuthenticated: true,
    needsOnboarding: false,
    updateUserState: () => {}
  };
};



// Definición de las pestañas
const tabs: Tab[] = [
  { id: 'profile', label: 'Perfil', icon: UsersIcon },
  { id: 'establishment', label: 'Establecimiento', icon: StoreIcon },
  { id: 'devices', label: 'Dispositivos', icon: PrinterIcon },
  { id: 'company', label: 'Empresa', icon: Building2Icon },
  { id: 'providers', label: 'Proveedores', icon: UsersIcon },
  { id: 'integrations', label: 'Integraciones', icon: PlugIcon },
  { id: 'taxes', label: 'Impuestos', icon: PercentIcon }
];

export const SettingsAccount: React.FC = () => {
  const { user, updateUserState } = useAuth();
  const [searchParams] = useSearchParams();
  const { currentTheme } = useTheme();
  


  // Estados del formulario
  const [activeTab, setActiveTab] = useState('profile');

  // Estados del formulario del establecimiento
  const [establishmentData, setEstablishmentData] = useState<EstablishmentData>({
    name: 'Camarai.es',
    type: 'Restaurante',
    address: 'Calle Ficticia 123',
    postalCode: '28080',
    city: 'Madrid',
    province: 'Madrid',
    country: 'España',
    phone: '+34 910 000 000',
    email: 'contacto@camarai-central.es',
    hours: 'L-V: 12:00-23:00, S-D: 12:00-00:00'
  });
  const [isEstablishmentActive, setIsEstablishmentActive] = useState(true);
  const [establishmentLogo, setEstablishmentLogo] = useState('https://i.ibb.co/RGH5f12/Group-57.png');

  // Estados para dispositivos con datos de ejemplo
  const [devices, setDevices] = useState<Devices>({
    printers: [
      { id: 1, name: 'Impresora de Barra', model: 'Epson TM-T20III', isActive: true, connectionType: 'wifi' }
    ],
    kds: [
      { id: 1, name: 'KDS Cocina', model: 'Generic 15" KDS', isActive: true, connectionType: 'cable' }
    ],
    pos: [
      { id: 1, name: 'POS Principal', model: 'Square Terminal', isActive: true, connectionType: 'wifi' }
    ],
    cashRegisters: [
      { id: 1, name: 'Caja Registradora', model: 'Generic Cash Register', isActive: false, connectionType: 'cable' }
    ]
  });

  // Estados para datos de la empresa
  const [companyData, setCompanyData] = useState<CompanyData>({
    commercialName: 'Grupo Camarai',
    legalName: 'Camarai Hostelería S.L.',
    nif: 'B12345678',
    website: 'https://camarai.es',
    address: 'Paseo de la Castellana, 1'
  });
  const [companyLogo, setCompanyLogo] = useState('C');

  // Estados para proveedores
  const [providers, setProviders] = useState<Provider[]>([
    {
      id: 1,
      name: 'Carnes de la Sierra',
      contact: 'Juan Pérez',
      email: 'pedidos@carnesdelasierra.es',
      phone: '+34 912 345 678'
    },
    {
      id: 2,
      name: 'Vinos y Licores El Celler',
      contact: 'Ana García',
      email: 'ana.g@celler.com',
      phone: '+34 934 567 890'
    }
  ]);

  // Estados para integraciones
  const [integrations, setIntegrations] = useState<Integration[]>([
    {
      id: 1,
      name: 'WhatsApp',
      description: 'Notificaciones de reservas y pedidos.',
      isActive: true,
      icon: 'whatsapp'
    },
    {
      id: 2,
      name: 'Facebook',
      description: 'Conecta tu página de Facebook.',
      isActive: false,
      icon: 'facebook'
    },
    {
      id: 3,
      name: 'Instagram',
      description: 'Vincula tu perfil y gestiona mensajes.',
      isActive: false,
      icon: 'instagram'
    },
    {
      id: 4,
      name: 'Square POS',
      description: 'Sistema de punto de venta.',
      isActive: true,
      icon: 'square'
    }
  ]);

  // Estados para impuestos
  const [taxes, setTaxes] = useState<Tax[]>([
    {
      id: 1,
      name: 'IVA General',
      percentage: '21%'
    },
    {
      id: 2,
      name: 'IVA Reducido',
      percentage: '10%'
    },
    {
      id: 3,
      name: 'Exento',
      percentage: '0%'
    }
  ]);

  // Leer el parámetro tab de la URL y cambiar la pestaña activa
  useEffect(() => {
    const tabParam = searchParams.get('tab');
    if (tabParam && tabs.some(tab => tab.id === tabParam)) {
      setActiveTab(tabParam);
    }
  }, [searchParams]);

  // Componentes reutilizables
  const TabPanel: React.FC<{ children: React.ReactNode; isActive: boolean; tabId: string }> = ({ children, isActive, tabId }) => (
    <div 
      data-state={isActive ? "active" : "inactive"} 
      data-orientation="horizontal" 
      role="tabpanel" 
      aria-labelledby={`radix-«rf6»-trigger-${tabId}`} 
      id={`radix-«rf6»-content-${tabId}`} 
      tabIndex={0} 
      className="mt-2 ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2"
      hidden={!isActive}
    >
      {children}
    </div>
  );

  return (
    <main className="flex flex-1 flex-col gap-4 p-4 pt-0 md:gap-8 md:p-8 md:pt-0" style={{ backgroundColor: currentTheme.colors.background }}>
      <Header title={tabs.find(tab => tab.id === activeTab)?.label || 'Configuración'} />
      <div dir="ltr" data-orientation="horizontal" className="w-full">
        <div className="overflow-x-auto pb-2 custom-scrollbar">
          <div 
            role="tablist" 
            aria-orientation="horizontal" 
            className="inline-flex h-10 items-center justify-center rounded-md p-1 mb-4" 
            tabIndex={0} 
            data-orientation="horizontal" 
            style={{ 
              outline: 'none',
              backgroundColor: currentTheme.colors.sidebar,
              color: currentTheme.colors.textSecondary
            }}
          >
            {tabs.map((tab) => (
              <button
                key={tab.id}
                type="button"
                role="tab"
                aria-selected={activeTab === tab.id}
                aria-controls={`radix-«rf6»-content-${tab.id}`}
                data-state={activeTab === tab.id ? 'active' : 'inactive'}
                id={`radix-«rf6»-trigger-${tab.id}`}
                className={`inline-flex items-center justify-center whitespace-nowrap rounded-sm px-3 py-1.5 text-sm font-medium ring-offset-background transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 ${activeTab === tab.id ? 'shadow-sm' : ''}`}
                style={{
                  backgroundColor: activeTab === tab.id ? currentTheme.colors.primary : 'transparent',
                  color: activeTab === tab.id ? currentTheme.colors.white : currentTheme.colors.textSecondary
                }}
                tabIndex={-1}
                data-orientation="horizontal"
                data-radix-collection-item=""
                onClick={() => setActiveTab(tab.id)}
              >
                <tab.icon style={{ color: 'currentColor' }} />
                {tab.label}
              </button>
            ))}
          </div>
        </div>

                {/* Panel de la pestaña Perfil */}
        <TabPanel isActive={activeTab === 'profile'} tabId="profile">
          <ProfileTab 
            user={user} 
            onUpdateUser={updateUserState} 
          />
        </TabPanel>

                {/* Panel de la pestaña Establecimiento */}
        <TabPanel isActive={activeTab === 'establishment'} tabId="establishment">
          <EstablishmentTab 
            establishmentData={establishmentData}
            onUpdateEstablishmentData={setEstablishmentData}
            isActive={isEstablishmentActive}
            onToggleActive={setIsEstablishmentActive}
            logo={establishmentLogo}
            onUpdateLogo={setEstablishmentLogo}
          />
        </TabPanel>

        {/* Panel de la pestaña Dispositivos */}
        <TabPanel isActive={activeTab === 'devices'} tabId="devices">
          <DevicesTab 
            devices={devices} 
            onUpdateDevices={setDevices} 
          />
        </TabPanel>

                {/* Panel de la pestaña Empresa */}
        <TabPanel isActive={activeTab === 'company'} tabId="company">
          <CompanyTab 
            companyData={companyData}
            onUpdateCompanyData={setCompanyData}
            logo={companyLogo}
            onUpdateLogo={setCompanyLogo}
          />
        </TabPanel>

        {/* Panel de la pestaña Proveedores */}
        <TabPanel isActive={activeTab === 'providers'} tabId="providers">
          <ProvidersTab 
            providers={providers}
            onUpdateProviders={setProviders}
          />
        </TabPanel>

        {/* Panel de la pestaña Integraciones */}
        <TabPanel isActive={activeTab === 'integrations'} tabId="integrations">
          <IntegrationsTab 
            integrations={integrations}
            onUpdateIntegrations={setIntegrations}
          />
        </TabPanel>

        {/* Panel de la pestaña Impuestos */}
        <TabPanel isActive={activeTab === 'taxes'} tabId="taxes">
          <TaxesTab 
            taxes={taxes}
            onUpdateTaxes={setTaxes}
          />
        </TabPanel>
        {/* Paneles de otras pestañas (ocultos) */}
        {/* 
        {tabs.slice(1).map((tab) => (
          <TabPanel key={tab.id} isActive={activeTab === tab.id} tabId={tab.id}>
            <div>Contenido de {tab.label}</div>
          </TabPanel>
        ))} */}
      </div>
    </main>
  );
};

export default SettingsAccount; 
import React from 'react';
import { useTheme } from '../../hooks/useTheme';
import { SwitchToggle } from '../SwitchToggle';
import { 
  MonitorIcon, 
  WifiIcon, 
  CableIcon, 
  EllipsisVerticalIcon, 
  CirclePlusIcon 
} from '../icons';

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

interface DevicesTabProps {
  devices: Devices;
  onUpdateDevices: (devices: Devices) => void;
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
    <div className={`rounded-lg border shadow-sm flex flex-col ${className}`} style={getCardColors()}>
      {children}
    </div>
  );
};

const CardHeader: React.FC<{ title: string; subtitle: string; icon: React.ComponentType<{ style?: React.CSSProperties }> }> = ({ title, subtitle, icon: Icon }) => {
  const { currentTheme } = useTheme();
  
  return (
    <div className="flex flex-col space-y-1.5 p-6">
      <div className="flex items-center gap-4">
        <Icon style={{ color: currentTheme.colors.text }} />
        <div>
          <div className="text-2xl leading-none tracking-tight font-bold" style={{ color: currentTheme.colors.textSecondary }}>{title}</div>
          <div className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>{subtitle}</div>
        </div>
      </div>
    </div>
  );
};

const CardContent: React.FC<{ children: React.ReactNode; className?: string }> = ({ children, className = "" }) => (
  <div className={`p-6 pt-0 flex-grow space-y-3 ${className}`}>
    {children}
  </div>
);

const SecondaryButton: React.FC<{ children: React.ReactNode; onClick?: () => void; className?: string }> = ({ 
  children, 
  onClick, 
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
      onClick={onClick}
      className={`inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 border h-10 px-4 py-2 w-full ${className}`}
      style={getInputColors()}
    >
      {children}
    </button>
  );
};

// Iconos SVG como componentes funcionales con soporte para props style
const PrinterIcon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-printer h-4 w-4 mr-2" style={style}>
    <path d="M6 18H4a2 2 0 0 1-2-2v-5a2 2 0 0 1 2-2h16a2 2 0 0 1 2 2v5a2 2 0 0 1-2 2h-2"></path>
    <path d="M6 9V3a1 1 0 0 1 1-1h10a1 1 0 0 1 1 1v6"></path>
    <rect x="6" y="14" width="12" height="8" rx="1"></rect>
  </svg>
);

const UsersIcon: React.FC<{ style?: React.CSSProperties }> = ({ style }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-users h-4 w-4 mr-2" style={style}>
    <path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2"></path>
    <circle cx="9" cy="7" r="4"></circle>
    <path d="M22 21v-2a4 4 0 0 0-3-3.87"></path>
    <path d="M16 3.13a4 4 0 0 1 0 7.75"></path>
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

export const DevicesTab: React.FC<DevicesTabProps> = ({ devices, onUpdateDevices }) => {
  const { currentTheme } = useTheme();

  // Obtener icono de conexión según el tipo
  const getConnectionIcon = (connectionType: string) => {
    switch (connectionType) {
      case 'wifi':
        return <WifiIcon />;
      case 'cable':
        return <CableIcon />;
      default:
        return <WifiIcon />;
    }
  };

  // Obtener color del icono de conexión
  const getConnectionColor = (connectionType: string) => {
    switch (connectionType) {
      case 'wifi':
        return currentTheme.colors.primary;
      case 'cable':
        return currentTheme.colors.textSecondary;
      default:
        return currentTheme.colors.primary;
    }
  };

  // Manejar toggle de dispositivos
  const handleDeviceToggle = (category: keyof Devices, deviceId: number) => {
    const updatedDevices = {
      ...devices,
      [category]: devices[category].map(device => 
        device.id === deviceId 
          ? { ...device, isActive: !device.isActive }
          : device
      )
    };
    onUpdateDevices(updatedDevices);
  };

  // Manejar añadir dispositivo
  const handleAddDevice = (_category: keyof Devices) => {
    // Aquí se implementaría la lógica para añadir dispositivo
  };

  return (
    <div className="grid gap-6 md:grid-cols-2">
      {/* Tarjeta de Impresoras */}
      <Card>
        <CardHeader 
          title="Impresoras" 
          subtitle="Tickets, comandas y facturas." 
          icon={PrinterIcon} 
        />
        <CardContent>
          {devices.printers.map((device) => (
            <div key={device.id} className="flex items-center justify-between p-3 border rounded-lg" style={{ backgroundColor: currentTheme.colors.inputBackgroundDark || currentTheme.colors.white, borderColor: currentTheme.colors.border }}>
              <div className="flex items-center gap-3">
                <div style={{ color: getConnectionColor(device.connectionType) }}>
                  {getConnectionIcon(device.connectionType)}
                </div>
                <div>
                  <p className="font-semibold" style={{ color: currentTheme.colors.text }}>{device.name}</p>
                  <p className="text-xs" style={{ color: currentTheme.colors.textSecondary }}>{device.model}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <SwitchToggle
                  isActive={device.isActive}
                  onToggle={() => handleDeviceToggle('printers', device.id)}
                  size="sm"
                />
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-8 w-8" type="button" style={{ color: currentTheme.colors.textSecondary }}>
                  <EllipsisVerticalIcon />
                </button>
              </div>
            </div>
          ))}
        </CardContent>
        <div className="p-6 pt-0">
          <SecondaryButton onClick={() => handleAddDevice('printers')}>
            <CirclePlusIcon />
            Añadir Impresora
          </SecondaryButton>
        </div>
      </Card>
      
      {/* Tarjeta de Pantallas de Cocina (KDS) */}
      <Card>
        <CardHeader 
          title="Pantallas de Cocina (KDS)" 
          subtitle="Agiliza los pedidos en cocina." 
          icon={MonitorIcon} 
        />
        <CardContent>
          {devices.kds.map((device) => (
            <div key={device.id} className="flex items-center justify-between p-3 border rounded-lg" style={{ backgroundColor: currentTheme.colors.inputBackgroundDark || currentTheme.colors.white, borderColor: currentTheme.colors.border }}>
              <div className="flex items-center gap-3">
                <div style={{ color: getConnectionColor(device.connectionType) }}>
                  {getConnectionIcon(device.connectionType)}
                </div>
                <div>
                  <p className="font-semibold" style={{ color: currentTheme.colors.text }}>{device.name}</p>
                  <p className="text-xs" style={{ color: currentTheme.colors.textSecondary }}>{device.model}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <SwitchToggle
                  isActive={device.isActive}
                  onToggle={() => handleDeviceToggle('kds', device.id)}
                  size="sm"
                />
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-8 w-8" type="button" style={{ color: currentTheme.colors.textSecondary }}>
                  <EllipsisVerticalIcon />
                </button>
              </div>
            </div>
          ))}
        </CardContent>
        <div className="p-6 pt-0">
          <SecondaryButton onClick={() => handleAddDevice('kds')}>
            <CirclePlusIcon />
            Añadir Pantallas de Cocina (KDS)
          </SecondaryButton>
        </div>
      </Card>
      
      {/* Tarjeta de POS */}
      <Card>
        <CardHeader 
          title="POS" 
          subtitle="Puntos de venta (Point of Sale)." 
          icon={UsersIcon} 
        />
        <CardContent>
          {devices.pos.map((device) => (
            <div key={device.id} className="flex items-center justify-between p-3 border rounded-lg" style={{ backgroundColor: currentTheme.colors.inputBackgroundDark || currentTheme.colors.white, borderColor: currentTheme.colors.border }}>
              <div className="flex items-center gap-3">
                <div style={{ color: getConnectionColor(device.connectionType) }}>
                  {getConnectionIcon(device.connectionType)}
                </div>
                <div>
                  <p className="font-semibold" style={{ color: currentTheme.colors.text }}>{device.name}</p>
                  <p className="text-xs" style={{ color: currentTheme.colors.textSecondary }}>{device.model}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <SwitchToggle
                  isActive={device.isActive}
                  onToggle={() => handleDeviceToggle('pos', device.id)}
                  size="sm"
                />
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-8 w-8" type="button" style={{ color: currentTheme.colors.textSecondary }}>
                  <EllipsisVerticalIcon />
                </button>
              </div>
            </div>
          ))}
        </CardContent>
        <div className="p-6 pt-0">
          <SecondaryButton onClick={() => handleAddDevice('pos')}>
            <CirclePlusIcon />
            Añadir POS
          </SecondaryButton>
        </div>
      </Card>
      
      {/* Tarjeta de Cajas Registradoras */}
      <Card>
        <CardHeader 
          title="Cajas Registradoras" 
          subtitle="Gestión de efectivo y pagos." 
          icon={Building2Icon} 
        />
        <CardContent>
          {devices.cashRegisters.map((device) => (
            <div key={device.id} className="flex items-center justify-between p-3 border rounded-lg" style={{ backgroundColor: currentTheme.colors.inputBackgroundDark || currentTheme.colors.white, borderColor: currentTheme.colors.border }}>
              <div className="flex items-center gap-3">
                <div style={{ color: getConnectionColor(device.connectionType) }}>
                  {getConnectionIcon(device.connectionType)}
                </div>
                <div>
                  <p className="font-semibold" style={{ color: currentTheme.colors.text }}>{device.name}</p>
                  <p className="text-xs" style={{ color: currentTheme.colors.textSecondary }}>{device.model}</p>
                </div>
              </div>
              <div className="flex items-center gap-1">
                <SwitchToggle
                  isActive={device.isActive}
                  onToggle={() => handleDeviceToggle('cashRegisters', device.id)}
                  size="sm"
                />
                <button className="inline-flex items-center justify-center gap-2 whitespace-nowrap rounded-md text-sm font-medium ring-offset-background transition-colors focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:pointer-events-none disabled:opacity-50 [&_svg]:pointer-events-none [&_svg]:size-4 [&_svg]:shrink-0 h-8 w-8" type="button" style={{ color: currentTheme.colors.textSecondary }}>
                  <EllipsisVerticalIcon />
                </button>
              </div>
            </div>
          ))}
        </CardContent>
        <div className="p-6 pt-0">
          <SecondaryButton onClick={() => handleAddDevice('cashRegisters')}>
            <CirclePlusIcon />
            Añadir Cajas Registradora
          </SecondaryButton>
        </div>
      </Card>
    </div>
  );
}; 
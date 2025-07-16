import React from 'react';
import { useTheme } from '../../../hooks/useTheme';
import { useNavigate } from 'react-router-dom';
import {
  HomeIcon, GridIcon, ShoppingBagIcon, QRIcon, LocationIcon, DocumentIcon,
  BookIcon, GiftIcon, ClockIcon, MonitorIcon, MessageIcon, InstagramIcon,
  FacebookIcon, ChatIcon, MapIcon, PrinterIcon, UsersIcon, CalendarIcon,
  PackageIcon, SettingsIcon, ReceiptIcon, ChartIcon
} from '../../icons';

const mainMenuItems = [
  { id: 'home', label: 'Inicio', icon: HomeIcon },
  { id: 'tables', label: 'Plano de mesas', icon: GridIcon },
  { id: 'store', label: 'Tienda', icon: ShoppingBagIcon },
  { id: 'qr', label: 'QR', icon: QRIcon },
  { id: 'locations', label: 'Ubicaciones', icon: LocationIcon },
  { id: 'legal', label: 'Entidades Legales', icon: DocumentIcon },
  { id: 'brands', label: 'Marcas virtuales', icon: BookIcon },
  { id: 'promotions', label: 'Promociones', icon: GiftIcon },
  { id: 'schedules', label: 'Horarios', icon: ClockIcon },
  { id: 'kds', label: 'KDS', icon: MonitorIcon },
  { id: 'whatsapp', label: 'WhatsApp', icon: MessageIcon },
  { id: 'instagram', label: 'Instagram', icon: InstagramIcon },
  { id: 'facebook', label: 'Facebook', icon: FacebookIcon },
  { id: 'webchat', label: 'WebChat', icon: ChatIcon },
  { id: 'maps', label: 'Google Maps', icon: MapIcon },
  { id: 'printers', label: 'Impresoras', icon: PrinterIcon },
  { id: 'team', label: 'Equipo', icon: UsersIcon },
  { id: 'events', label: 'Eventos', icon: CalendarIcon },
  { id: 'orders', label: 'Órdenes', icon: PackageIcon },
  { id: 'settings', label: 'Ajustes', icon: SettingsIcon },
  { id: 'billing', label: 'Facturación', icon: ReceiptIcon },
  { id: 'reports', label: 'Reportes', icon: ChartIcon },
];

export const Navigation: React.FC<{ currentPage: string }> = ({ currentPage }) => {
  const { currentTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <nav className="flex-1 overflow-y-auto scrollbar-minimal min-h-0">
      <div className="w-full flex flex-col items-center gap-4 py-4">
        {mainMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <div key={item.id} className="w-full flex flex-col items-center">
              <button
                onClick={() => navigate(`/dashboard/${item.id}`)}
                className={`w-12 h-12 rounded-full flex items-center justify-center transition-colors duration-200 ${
                  isActive
                    ? 'shadow-lg'
                    : 'hover:bg-opacity-10'
                }`}
                style={{  
                  backgroundColor: isActive ? currentTheme.colors.primary : 'transparent',
                  color: isActive ? '#fff' : currentTheme.colors.textSecondary,
                }}
              >
                <Icon className="w-6 h-6" />
              </button>
              <span 
                className="text-xs mt-2 text-center leading-tight max-w-19 break-words"
                style={{ 
                  color: isActive ? currentTheme.colors.primary : currentTheme.colors.textSecondary,
                }}
              >
                {item.label}
              </span>
            </div>
          );
        })}
      </div>
    </nav>
  );
}; 
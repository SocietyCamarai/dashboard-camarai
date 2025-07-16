import React from 'react';
import { useTheme } from '../../../hooks/useTheme';
import { useNavigate } from 'react-router-dom';
import {
  HomeIcon, GridIcon, ShoppingBagIcon, QRIcon, LocationIcon, DocumentIcon,
  BookIcon, GiftIcon, ClockIcon, MonitorIcon, MessageIcon, InstagramIcon,
  FacebookIcon, ChatIcon, MapIcon, PrinterIcon, UsersIcon, CalendarIcon,
  PackageIcon, SettingsIcon, ReceiptIcon, ChartIcon, HelpIcon, ZapIcon
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

const upcomingEvents = [
  'San Valentín',
  'Comunión Sandra',
  'Fiestas del Pueblo',
  'Noche de San Juan'
];

export const Navigation: React.FC<{ currentPage: string }> = ({ currentPage }) => {
  const { currentTheme } = useTheme();
  const navigate = useNavigate();

  return (
    <nav className="flex-1 overflow-y-auto px-4 scrollbar-minimal min-h-0">
      <div className="space-y-1">
        {mainMenuItems.map((item) => {
          const Icon = item.icon;
          const isActive = currentPage === item.id;
          return (
            <button
              key={item.id}
              onClick={() => navigate(`/dashboard/${item.id}`)}
              className="w-full flex items-center gap-3 px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200"
              style={{
                backgroundColor: isActive ? currentTheme.colors.primary : 'transparent',
                color: isActive ? '#ffffff' : currentTheme.colors.text,
              }}
              onMouseEnter={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = currentTheme.colors.border;
                }
              }}
              onMouseLeave={(e) => {
                if (!isActive) {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }
              }}
            >
              <Icon className="w-5 h-5" />
              <span>{item.label}</span>
            </button>
          );
        })}
      </div>

      {/* Upcoming Events Section */}
      <div className="mt-8">
        <h3 
          className="text-xs font-semibold uppercase tracking-wider mb-3 px-3"
          style={{ color: currentTheme.colors.textSecondary }}
        >
          Próximos eventos
        </h3>
        <div className="space-y-1">
          {upcomingEvents.map((event, index) => (
            <button
              key={index}
              className="w-full text-left px-3 py-2 text-sm rounded-lg transition-colors duration-200"
              style={{
                color: currentTheme.colors.textSecondary,
              }}
              onMouseEnter={(e) => {
                e.currentTarget.style.backgroundColor = currentTheme.colors.border;
                e.currentTarget.style.color = currentTheme.colors.text;
              }}
              onMouseLeave={(e) => {
                e.currentTarget.style.backgroundColor = 'transparent';
                e.currentTarget.style.color = currentTheme.colors.textSecondary;
              }}
            >
              {event}
            </button>
          ))}
        </div>
      </div>

      {/* Support Section */}
      <div className="mt-8 space-y-1">
        <button 
          className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors duration-200"
          style={{ color: currentTheme.colors.textSecondary }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = currentTheme.colors.border;
            e.currentTarget.style.color = currentTheme.colors.text;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = currentTheme.colors.textSecondary;
          }}
        >
          <HelpIcon className="w-5 h-5" />
          <span>Soporte</span>
        </button>
        <button 
          className="w-full flex items-center gap-3 px-3 py-2 text-sm rounded-lg transition-colors duration-200"
          style={{ color: currentTheme.colors.textSecondary }}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = currentTheme.colors.border;
            e.currentTarget.style.color = currentTheme.colors.text;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = 'transparent';
            e.currentTarget.style.color = currentTheme.colors.textSecondary;
          }}
        >
          <ZapIcon className="w-5 h-5" />
          <span>Registro de cambios</span>
        </button>
      </div>
    </nav>
  );
}; 
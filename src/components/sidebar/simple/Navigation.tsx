import React from 'react';
import { useTheme } from '../../../hooks/useTheme';
import {
  HouseIcon,
  ClipboardListIcon,
  ViewIcon,
  LayoutGridIcon,
  ShoppingBagIcon,
  QrCodeIcon,
  MapPinIcon,
  FileTextIcon,
  TagsIcon,
  BadgePercentIcon,
  ClockIcon,
  LaptopIcon,
  MessageSquareIcon,
  InstagramIcon,
  FacebookIcon,
  BotIcon,
  MapIcon,
  PrinterIcon,
  UsersIcon,
  CalendarIcon
} from '../../icons';
import { Link } from 'react-router-dom';

const mainMenuItems = [
  { href: '/dashboard/home', label: 'Inicio', icon: HouseIcon },
  { href: '/dashboard/comandas', label: 'Comandas', icon: ClipboardListIcon },
  { href: '/dashboard/ambientes', label: 'Ambientes', icon: ViewIcon },
  { href: '/dashboard/plano-mesas', label: 'Plano de mesas', icon: LayoutGridIcon },
  { href: '/dashboard/tienda', label: 'Tienda', icon: ShoppingBagIcon },
  { href: '/dashboard/qr', label: 'QR', icon: QrCodeIcon },
  { href: '/dashboard/ubicaciones', label: 'Ubicaciones', icon: MapPinIcon },
  { href: '/dashboard/entidades-legales', label: 'Entidades Legales', icon: FileTextIcon },
  { href: '/dashboard/marcas-virtuales', label: 'Marcas virtuales', icon: TagsIcon },
  { href: '/dashboard/promociones', label: 'Promociones', icon: BadgePercentIcon },
  { href: '/dashboard/horarios', label: 'Horarios', icon: ClockIcon },
  { href: '/dashboard/kds', label: 'KDS', icon: LaptopIcon },
  { href: '/dashboard/whatsapp', label: 'WhatsApp', icon: MessageSquareIcon },
  { href: '/dashboard/instagram', label: 'Instagram', icon: InstagramIcon },
  { href: '/dashboard/facebook', label: 'Facebook', icon: FacebookIcon },
  { href: '/dashboard/webchat', label: 'WebChat', icon: BotIcon },
  { href: '/dashboard/google-maps', label: 'Google Maps', icon: MapIcon },
  { href: '/dashboard/impresoras', label: 'Impresoras', icon: PrinterIcon },
  { href: '/dashboard/equipo', label: 'Equipo', icon: UsersIcon },
  { href: '/dashboard/eventos', label: 'Eventos', icon: CalendarIcon },
];

export const Navigation: React.FC<{ currentPage: string }> = ({ currentPage }) => {
  const { currentTheme } = useTheme();
  
  // Función auxiliar para obtener colores de iconos
  const getIconColors = (isActive: boolean) => {
    return {
      color: isActive ? currentTheme.colors.primary : currentTheme.colors.text,
      hoverColor: currentTheme.colors.primary,
      secondaryColor: currentTheme.colors.textSecondary,
      activeColor: currentTheme.colors.primary,
      inactiveColor: currentTheme.colors.text,
      transition: 'color 0.2s ease-in-out'
    };
  };
  
  return (
    <nav className="flex-1 overflow-y-auto scrollbar-hidden min-h-0">
      <ul data-sidebar="menu" className="flex w-full min-w-0 flex-col gap-1">
        {mainMenuItems.map((item) => {
          const Icon = item.icon;
          // Extraer la sección del href (ej: '/dashboard/ambientes' -> 'ambientes')
          const itemSection = item.href.split('/').pop() || '';
          const isActive = currentPage === itemSection;
          const iconColors = getIconColors(isActive);
          
          return (
            <li key={item.href} data-sidebar="menu-item" className="group/menu-item relative flex justify-center">
              <Link to={item.href}>
                <button
                  data-sidebar="menu-button"
                  data-size="default"
                  data-active={isActive ? 'true' : 'false'}
                  className="flex items-center justify-center w-12 h-12 rounded-lg transition-colors duration-200 hover:bg-sidebar-accent focus-visible:ring-2"
                  data-state="closed"
                  style={{
                    color: iconColors.color,
                    backgroundColor: isActive ? currentTheme.colors.sidebar : 'transparent',
                    transition: 'all 0.2s ease-in-out'
                  }}
                  onMouseEnter={(e) => {
                    e.currentTarget.style.color = iconColors.hoverColor;
                    e.currentTarget.style.backgroundColor = `${currentTheme.colors.primary}10`;
                  }}
                  onMouseLeave={(e) => {
                    e.currentTarget.style.color = iconColors.color;
                    e.currentTarget.style.backgroundColor = isActive ? currentTheme.colors.sidebar : 'transparent';
                  }}
                >
                  <Icon 
                    size={24} 
                    className="shrink-0 transition-colors duration-200" 
                    style={{ 
                      color: iconColors.color,
                      transition: iconColors.transition
                    }}
                  />
                </button>
              </Link>
            </li>
          );
        })}
      </ul>
    </nav>
  );
}; 
import React from 'react';
import { useTheme } from '../../../hooks/useTheme';
import {
  CustomInicioIcon,
  CustomComandasIcon,
  CustomAmbientesIcon,
  CustomPlanoMesasIcon,
  CustomCartaIcon,
  CustomCategoriasIcon,
  CustomProductosIcon,
  CustomIngredientesIcon,
  CustomKDSIcon,
  CustomPersonalIcon,
  CustomReportesIcon,
  CustomInventarioIcon,
  CustomReservasIcon,
  CustomPromocionesIcon,
  CustomConfiguracionIcon
} from '../../icons';
import { Link } from 'react-router-dom';

const mainMenuItems = [
  { href: '/dashboard/home', label: 'Inicio', icon: CustomInicioIcon },
  { href: '/dashboard/comandas', label: 'Comandas', icon: CustomComandasIcon },
  { href: '/dashboard/ambientes', label: 'Ambientes', icon: CustomAmbientesIcon },
  { href: '/dashboard/plano-mesas', label: 'Plano de mesas', icon: CustomPlanoMesasIcon },
  { href: '/dashboard/carta', label: 'Carta', icon: CustomCartaIcon },
  { href: '/dashboard/categorias', label: 'Categorías', icon: CustomCategoriasIcon },
  { href: '/dashboard/productos', label: 'Productos', icon: CustomProductosIcon },
  { href: '/dashboard/ingredientes', label: 'Ingredientes', icon: CustomIngredientesIcon },
  { href: '/dashboard/kds', label: 'KDS', icon: CustomKDSIcon },
  { href: '/dashboard/personal', label: 'Personal', icon: CustomPersonalIcon },
  { href: '/dashboard/reportes', label: 'Reportes', icon: CustomReportesIcon },
  { href: '/dashboard/inventario', label: 'Inventario', icon: CustomInventarioIcon },
  { href: '/dashboard/reservas', label: 'Reservas', icon: CustomReservasIcon },
  { href: '/dashboard/promociones', label: 'Promociones', icon: CustomPromocionesIcon },
  { href: '/settings', label: 'Configuración', icon: CustomConfiguracionIcon }
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
          // Para configuración, comparar con 'settings', para el resto con la sección
          const isActive = item.href.startsWith('/settings') 
            ? currentPage === 'settings' 
            : currentPage === itemSection;
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
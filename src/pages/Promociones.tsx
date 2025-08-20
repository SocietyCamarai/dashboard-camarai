// import React from 'react';

// const Promociones: React.FC = () => (
//   <div className="flex flex-col items-center justify-center h-full">
//     <h1 className="text-2xl font-bold mb-2">Promociones</h1>
//     <p className="text-gray-500">Esta es la página de Promociones.</p>
//   </div>
// );

// export default Promociones; 
import React, { useEffect, useState } from 'react';
import { Header, SwitchToggle } from '../components';
import { useTheme } from '../hooks/useTheme';
import { MoreHorizontal, PlusIcon, SearchIcon, DownloadIcon } from '../components/icons';

// Types for promotion data
interface CampaignData {
  id: string;
  name: string;
  type: 'Descuento %' | '2x1' | 'Oferta Especial' | 'Regalo';
  status: 'Activa' | 'Finalizada' | 'Borrador' | 'Inactiva';
  audience: string;
  launchDate: string;
  isActive: boolean;
}

interface CampaignFormData {
  name: string;
  promotionType: string;
  promotionTarget: 'category' | 'product';
  category: string;
  product: string;
  customerBehavior: string;
  maxImpact: string;
  message: string;
  launchDate: string;
  launchTime: string;
  endDate: string;
}

// Mock data for campaigns
const mockCampaigns: CampaignData[] = [
  {
    id: '1',
    name: '20% Descuento Fin de Semana',
    type: 'Descuento %',
    status: 'Activa',
    audience: '42 clientes',
    launchDate: '2024-07-15 a las 10:00',
    isActive: true
  },
  {
    id: '2',
    name: '2x1 en Postres',
    type: '2x1',
    status: 'Finalizada',
    audience: '153 clientes',
    launchDate: '2024-07-01 a las 12:00',
    isActive: false
  },
  {
    id: '3',
    name: 'Menú del Día Especial',
    type: 'Oferta Especial',
    status: 'Borrador',
    audience: '0 clientes',
    launchDate: '2024-07-20 a las 11:00',
    isActive: false
  },
  {
    id: '4',
    name: 'Cena Gratis para Cumpleañeros',
    type: 'Regalo',
    status: 'Inactiva',
    audience: '28 clientes',
    launchDate: '2024-01-01 a las 09:00',
    isActive: false
  }
];

// Search Filters Component
const SearchFilters: React.FC = () => {
  const { currentTheme } = useTheme();
  const [searchTerm, setSearchTerm] = useState('');
  const [typeFilter, setTypeFilter] = useState('');
  const [statusFilter, setStatusFilter] = useState('');

  return (
    <section
      className="p-6 rounded-lg mb-6"
      style={{
        backgroundColor: currentTheme.colors.sidebar,
      }}
    >
      <h2
        className="text-xl font-semibold mb-4"
        style={{ color: currentTheme.colors.text }}
      >
        Filtros de Búsqueda
      </h2>

      <div className="flex flex-col lg:flex-row gap-4">
        {/* Search input */}
        <div className="flex-1 relative">
          <SearchIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4" style={{ color: currentTheme.colors.textSecondary }} />
          <input
            type="text"
            placeholder="Buscar por nombre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-10 pr-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              backgroundColor: currentTheme.colors.background,
              borderColor: currentTheme.colors.border,
              color: currentTheme.colors.text
            }}
          />
        </div>

        {/* Type filter */}
        <div className="relative">
          <select
            value={typeFilter}
            onChange={(e) => setTypeFilter(e.target.value)}
            className="px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer min-w-[180px]"
            style={{
              backgroundColor: currentTheme.colors.background,
              borderColor: currentTheme.colors.border,
              color: currentTheme.colors.text
            }}
          >
            <option value="">Filtrar por tipo</option>
            <option value="Descuento %">Descuento %</option>
            <option value="2x1">2x1</option>
            <option value="Oferta Especial">Oferta Especial</option>
            <option value="Regalo">Regalo</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: currentTheme.colors.textSecondary }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>

        {/* Status filter */}
        <div className="relative">
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value)}
            className="px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer min-w-[180px]"
            style={{
              backgroundColor: currentTheme.colors.background,
              borderColor: currentTheme.colors.border,
              color: currentTheme.colors.text
            }}
          >
            <option value="">Filtrar por estado</option>
            <option value="Activa">Activa</option>
            <option value="Finalizada">Finalizada</option>
            <option value="Borrador">Borrador</option>
            <option value="Inactiva">Inactiva</option>
          </select>
          <div className="absolute inset-y-0 right-0 flex items-center pr-2 pointer-events-none">
            <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: currentTheme.colors.textSecondary }}>
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
            </svg>
          </div>
        </div>
      </div>
    </section>
  );
};

// Lightweight Date Picker Modal (single date) reusing calendar logic from FiltersAndExport
const DatePickerModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSelect: (dateText: string) => void;
  initialDate?: string; // expected dd/mm/aaaa
}> = ({ isOpen, onClose, onSelect, initialDate }) => {
  const { currentTheme } = useTheme();
  const [currentMonth, setCurrentMonth] = useState(() => {
    if (initialDate) {
      const [dd, mm, yyyy] = initialDate.split('/').map(Number);
      const parsed = new Date(yyyy || 0, (mm || 1) - 1, dd || 1);
      return isNaN(parsed.getTime()) ? new Date() : parsed;
    }
    return new Date();
  });

  if (!isOpen) return null;

  const getMonthMatrix = () => {
    const year = currentMonth.getFullYear();
    const month = currentMonth.getMonth();
    const firstDay = new Date(year, month, 1);
    const lastDay = new Date(year, month + 1, 0);
    const days: { date: Date; inMonth: boolean }[] = [];

    const firstWeekday = firstDay.getDay();
    for (let i = firstWeekday - 1; i >= 0; i--) {
      days.push({ date: new Date(year, month, -i), inMonth: false });
    }
    for (let d = 1; d <= lastDay.getDate(); d++) {
      days.push({ date: new Date(year, month, d), inMonth: true });
    }
    const lastWeekday = lastDay.getDay();
    for (let i = 1; i <= 6 - lastWeekday; i++) {
      days.push({ date: new Date(year, month + 1, i), inMonth: false });
    }
    return days;
  };

  const formatMonth = (date: Date) => date.toLocaleDateString('es-ES', { month: 'long', year: 'numeric' });
  const toText = (date: Date) => {
    const dd = String(date.getDate()).padStart(2, '0');
    const mm = String(date.getMonth() + 1).padStart(2, '0');
    const yyyy = date.getFullYear();
    return `${dd}/${mm}/${yyyy}`;
  };

  return (
    <>
      <div className="fixed inset-0 z-50 backdrop-blur-sm" style={{ backgroundColor: 'rgba(0,0,0,0.15)' }} onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="rounded-lg shadow-lg border w-full max-w-md" style={{ backgroundColor: currentTheme.colors.background, borderColor: currentTheme.colors.border }}>
          <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: currentTheme.colors.border }}>
            <h3 className="text-lg font-semibold" style={{ color: currentTheme.colors.text }}>Seleccionar fecha</h3>
            <button className="p-1 rounded" onClick={onClose} style={{ color: currentTheme.colors.textSecondary }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </div>
          <div className="p-4">
            <div className="flex items-center justify-between mb-3">
              <button className="p-1 rounded" style={{ color: currentTheme.colors.text }} onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() - 1, 1))}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" /></svg>
              </button>
              <span className="font-medium text-sm" style={{ color: currentTheme.colors.text }}>{formatMonth(currentMonth)}</span>
              <button className="p-1 rounded" style={{ color: currentTheme.colors.text }} onClick={() => setCurrentMonth(prev => new Date(prev.getFullYear(), prev.getMonth() + 1, 1))}>
                <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" /></svg>
              </button>
            </div>
            <div className="grid grid-cols-7 gap-1 text-xs mb-1">
              {['Su', 'Mo', 'Tu', 'We', 'Th', 'Fr', 'Sa'].map(d => (
                <div key={d} className="text-center font-medium" style={{ color: currentTheme.colors.textSecondary }}>{d}</div>
              ))}
            </div>
            <div className="grid grid-cols-7 gap-1">
              {getMonthMatrix().map(({ date, inMonth }, idx) => (
                <button
                  key={idx}
                  className="p-2 rounded text-xs"
                  style={{
                    color: inMonth ? currentTheme.colors.text : currentTheme.colors.textSecondary + '80',
                    backgroundColor: 'transparent',
                    border: `1px solid ${currentTheme.colors.border}`
                  }}
                  onClick={() => { onSelect(toText(date)); onClose(); }}
                >
                  {date.getDate()}
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

// Lightweight Time Picker Modal
const TimePickerModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSelect: (timeText: string) => void; // --:-- 24h
}> = ({ isOpen, onClose, onSelect }) => {
  const { currentTheme } = useTheme();
  if (!isOpen) return null;

  const times: string[] = [];
  for (let h = 0; h < 24; h++) {
    for (let m = 0; m < 60; m += 15) {
      times.push(`${String(h).padStart(2, '0')}:${String(m).padStart(2, '0')}`);
    }
  }

  return (
    <>
      <div className="fixed inset-0 z-50 backdrop-blur-sm" style={{ backgroundColor: 'rgba(0,0,0,0.15)' }} onClick={onClose} />
      <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
        <div className="rounded-lg shadow-lg border w-full max-w-sm max-h-[70vh] overflow-auto" style={{ backgroundColor: currentTheme.colors.background, borderColor: currentTheme.colors.border }}>
          <div className="flex items-center justify-between p-4 border-b" style={{ borderColor: currentTheme.colors.border }}>
            <h3 className="text-lg font-semibold" style={{ color: currentTheme.colors.text }}>Seleccionar hora</h3>
            <button className="p-1 rounded" onClick={onClose} style={{ color: currentTheme.colors.textSecondary }}>
              <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><line x1="18" y1="6" x2="6" y2="18" /><line x1="6" y1="6" x2="18" y2="18" /></svg>
            </button>
          </div>
          <div className="p-4 grid grid-cols-3 gap-2">
            {times.map(t => (
              <button key={t} className="px-3 py-2 rounded border text-sm" style={{ color: currentTheme.colors.text, borderColor: currentTheme.colors.border }} onClick={() => { onSelect(t); onClose(); }}>
                {t}
              </button>
            ))}
          </div>
        </div>
      </div>
    </>
  );
};

// Campaigns Table Component
const CampaignsTable: React.FC<{
  campaigns: CampaignData[];
  onToggleCampaign: (campaignId: string) => void;
  onCreateCampaign: () => void;
  onEditCampaign: (campaignId: string) => void;
  onDuplicateCampaign: (campaignId: string) => void;
  onDeleteCampaign: (campaignId: string) => void;
}> = ({ campaigns, onToggleCampaign, onCreateCampaign, onEditCampaign, onDuplicateCampaign, onDeleteCampaign }) => {
  const { currentTheme } = useTheme();
  const [openDropdown, setOpenDropdown] = useState<string | null>(null);
  const [activeMenuEl, setActiveMenuEl] = useState<HTMLElement | null>(null);
  const [dropdownPosition, setDropdownPosition] = useState<'above' | 'below'>('below');

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'Activa':
        return 'bg-green-100 text-green-800 border-green-200';
      case 'Finalizada':
        return 'bg-gray-100 text-gray-800 border-gray-200';
      case 'Borrador':
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'Inactiva':
        return 'bg-red-100 text-red-800 border-red-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  const handleDropdownToggle = (campaignId: string, event: React.MouseEvent) => {
    if (openDropdown === campaignId) {
      setOpenDropdown(null);
      setActiveMenuEl(null);
    } else {
      const button = event.currentTarget;
      const rect = button.getBoundingClientRect();
      const dropdownHeight = 120; // Altura aproximada del dropdown (3 opciones)

      // Calcular espacio disponible arriba y abajo
      const spaceAbove = rect.top;
      const spaceBelow = window.innerHeight - rect.bottom;

      // Si no hay suficiente espacio abajo para el dropdown completo, posicionar arriba
      const shouldPositionAbove = spaceBelow < dropdownHeight && spaceAbove > dropdownHeight;
      setDropdownPosition(shouldPositionAbove ? 'above' : 'below');
      setActiveMenuEl((button.parentElement as HTMLElement) || null);
      setOpenDropdown(campaignId);
    }
  };

  // Cerrar al pulsar fuera
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (!openDropdown) return;
      if (activeMenuEl && !activeMenuEl.contains(e.target as Node)) {
        setOpenDropdown(null);
        setActiveMenuEl(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [openDropdown, activeMenuEl]);

  return (
    <div
      className="bg-card rounded-lg border shadow-sm"
      style={{
        backgroundColor: currentTheme.colors.background,
        borderColor: currentTheme.colors.border,
      }}
    >
      {/* Header */}
      <div className="flex flex-row items-center justify-between p-6 border-b" style={{ borderColor: currentTheme.colors.border }}>
        <div>
          <h3
            className="text-lg font-bold"
            style={{ color: currentTheme.colors.textSecondary }}
          >
            Campañas
          </h3>
          <div
            className="mt-2 h-1 w-8 rounded-sm"
            style={{ backgroundColor: currentTheme.colors.primary }}
          />
        </div>
        <div className="flex gap-2">
          {/* Export button */}
          <button
            className="px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
            style={{
              backgroundColor: currentTheme.colors.background,
              borderColor: currentTheme.colors.border,
              color: currentTheme.colors.text
            }}
          >
            <DownloadIcon className="h-4 w-4" style={{ color: currentTheme.colors.text }} />
            <span>Exportar</span>
          </button>

          {/* Create Campaign button */}
          <button
            onClick={onCreateCampaign}
            className="px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
            style={{
              backgroundColor: currentTheme.colors.primary,
              color: 'white'
            }}
          >
            <PlusIcon className="h-4 w-4" style={{ color: 'white' }} />
            <span>Crear Campaña</span>
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr
              className="border-b"
              style={{ borderColor: currentTheme.colors.border }}
            >
              <th
                className="text-left py-3 px-4 font-medium"
                style={{ color: currentTheme.colors.textSecondary }}
              >
                Estado
              </th>
              <th
                className="text-left py-3 px-4 font-medium"
                style={{ color: currentTheme.colors.textSecondary }}
              >
                Nombre Campaña
              </th>
              <th
                className="text-left py-3 px-4 font-medium"
                style={{ color: currentTheme.colors.textSecondary }}
              >
                Tipo
              </th>
              <th
                className="text-left py-3 px-4 font-medium"
                style={{ color: currentTheme.colors.textSecondary }}
              >
                Estado
              </th>
              <th
                className="text-left py-3 px-4 font-medium"
                style={{ color: currentTheme.colors.textSecondary }}
              >
                Audiencia
              </th>
              <th
                className="text-left py-3 px-4 font-medium"
                style={{ color: currentTheme.colors.textSecondary }}
              >
                Lanzamiento
              </th>
              <th
                className="text-left py-3 px-4 font-medium"
                style={{ color: currentTheme.colors.textSecondary }}
              >

              </th>
            </tr>
          </thead>
          <tbody>
            {campaigns.map((campaign) => (
              <tr
                key={campaign.id}
                className="border-b hover:bg-opacity-5 transition-colors"
                style={{
                  borderColor: currentTheme.colors.border,
                  backgroundColor: 'transparent'
                }}
                onMouseEnter={(e) => {
                  e.currentTarget.style.backgroundColor = `${currentTheme.colors.primary}05`;
                }}
                onMouseLeave={(e) => {
                  e.currentTarget.style.backgroundColor = 'transparent';
                }}
              >
                <td className="py-3 px-4">
                  <SwitchToggle
                    isActive={campaign.isActive}
                    onToggle={() => onToggleCampaign(campaign.id)}
                    size="sm"
                    disabled={campaign.status === 'Finalizada' || campaign.status === 'Borrador'}
                  />
                </td>
                <td className="py-3 px-4">
                  <span style={{ color: currentTheme.colors.text }}>
                    {campaign.name}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span style={{ color: currentTheme.colors.text }}>
                    {campaign.type}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span className={`px-2 py-1 rounded-full text-xs font-medium border ${getStatusColor(campaign.status)}`}>
                    {campaign.status}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span style={{ color: currentTheme.colors.text }}>
                    {campaign.audience}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <span style={{ color: currentTheme.colors.text }}>
                    {campaign.launchDate}
                  </span>
                </td>
                <td className="py-3 px-4">
                  <div className="relative">
                    <button
                      className="p-1 rounded hover:bg-opacity-10 transition-colors"
                      style={{ color: currentTheme.colors.textSecondary }}
                      onClick={(e) => handleDropdownToggle(campaign.id, e)}
                    >
                      <MoreHorizontal className="h-4 w-4" style={{ color: currentTheme.colors.textSecondary }} />
                    </button>

                    {openDropdown === campaign.id && (
                      <div
                        className={`absolute right-0 z-50 min-w-[150px] rounded-md shadow-lg border ${dropdownPosition === 'above' ? 'bottom-full mb-1' : 'top-full mt-1'
                          }`}
                        style={{
                          backgroundColor: currentTheme.colors.background,
                          borderColor: currentTheme.colors.border,
                        }}
                      >
                        <div className="py-1">
                          <button
                            className="block w-full text-left px-3 py-2 text-sm hover:bg-opacity-10 transition-colors"
                            style={{ color: currentTheme.colors.text }}
                            onClick={() => {
                              onEditCampaign(campaign.id);
                              setOpenDropdown(null);
                            }}
                          >
                            Editar
                          </button>
                          <button
                            className="block w-full text-left px-3 py-2 text-sm hover:bg-opacity-10 transition-colors"
                            style={{ color: currentTheme.colors.text }}
                            onClick={() => {
                              onDuplicateCampaign(campaign.id);
                              setOpenDropdown(null);
                            }}
                          >
                            Duplicar
                          </button>
                          <button
                            className="block w-full text-left px-3 py-2 text-sm hover:bg-opacity-10 transition-colors"
                            style={{ color: currentTheme.colors.text }}
                            onClick={() => {
                              onDeleteCampaign(campaign.id);
                              setOpenDropdown(null);
                            }}
                          >
                            Eliminar
                          </button>
                        </div>
                      </div>
                    )}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {/* Pagination */}
      <div className="flex items-center justify-between p-4 border-t" style={{ borderColor: currentTheme.colors.border }}>
        <div style={{ color: currentTheme.colors.textSecondary }}>
          Mostrando 1-{campaigns.length} de {campaigns.length} campañas
        </div>
      </div>
    </div>
  );
};

// Create Campaign Modal Component
const CreateCampaignModal: React.FC<{
  isOpen: boolean;
  onClose: () => void;
  onSave: (campaignData: CampaignFormData) => void;
}> = ({ isOpen, onClose, onSave }) => {
  const { currentTheme, isDarkTheme } = useTheme();
  const [formData, setFormData] = useState<CampaignFormData>({
    name: '',
    promotionType: '',
    promotionTarget: 'category',
    category: '',
    product: '',
    customerBehavior: 'Clientes de los últimos 90 días',
    maxImpact: '',
    message: '¡Hola {nombre_cliente}! No te pierdas nuestro 20% de descuento en {nombre_producto_ofertado} hasta el {fecha_fin_oferta}.',
    launchDate: '',
    launchTime: '',
    endDate: ''
  });

  const [productSearch, setProductSearch] = useState('');
  const [openDatePicker, setOpenDatePicker] = useState<null | 'launch' | 'end'>(null);
  const [openTimePicker, setOpenTimePicker] = useState<boolean>(false);
  const mockProducts = [
    'Tiramisú',
    'Cheesecake',
    'Brownie',
    'Café Americano',
    'Latte',
    'Capuchino',
    'Pizza Margarita',
    'Hamburguesa Clásica',
    'Ensalada César',
    'Sushi Roll',
    'Raviolis de Espinaca'
  ];
  const filteredProducts = productSearch.trim()
    ? mockProducts.filter(p => p.toLowerCase().includes(productSearch.toLowerCase())).slice(0, 8)
    : [];

  if (!isOpen) return null;

  const handleInputChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const handleSave = () => {
    onSave(formData);
    onClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 backdrop-blur-md" style={{ backgroundColor: isDarkTheme(currentTheme) ? 'rgba(0, 0, 0, 0.4)' : 'rgba(255, 255, 255, 0.5)' }}>
      <div
        className="bg-card rounded-lg border shadow-lg w-full max-w-4xl max-h-[90vh] overflow-y-auto"
        style={{
          backgroundColor: currentTheme.colors.background,
          borderColor: currentTheme.colors.border,
        }}
      >
        {/* Header */}
        <div className="flex items-center justify-between p-6 border-b" style={{ borderColor: currentTheme.colors.border }}>
          <div>
            <h2
              className="text-2xl font-bold"
              style={{ color: currentTheme.colors.text }}
            >
              Crear Nueva Campaña de WhatsApp
            </h2>
            <p
              className="text-sm mt-1"
              style={{ color: currentTheme.colors.textSecondary }}
            >
              Configura los detalles de tu nueva campaña. Se enviará únicamente a través de WhatsApp.
            </p>
          </div>
          <button
            onClick={onClose}
            className="p-2 rounded-full hover:bg-opacity-10 transition-colors"
            style={{ color: currentTheme.colors.textSecondary }}
          >
            <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: currentTheme.colors.textSecondary }}>
              <line x1="18" y1="6" x2="6" y2="18"></line>
              <line x1="6" y1="6" x2="18" y2="18"></line>
            </svg>
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Campaign Details */}
          <div className="space-y-4">
            <h3
              className="text-lg font-semibold"
              style={{ color: currentTheme.colors.text }}
            >
              Detalles de la Campaña
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: currentTheme.colors.text }}
                >
                  Nombre de la Campaña
                </label>
                <input
                  type="text"
                  placeholder="Ej: Descuento Verano"
                  value={formData.name}
                  onChange={(e) => handleInputChange('name', e.target.value)}
                  className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{
                    backgroundColor: currentTheme.colors.background,
                    borderColor: currentTheme.colors.border,
                    color: currentTheme.colors.text
                  }}
                />
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: currentTheme.colors.text }}
                >
                  Tipo de Promoción
                </label>
                <select
                  value={formData.promotionType}
                  onChange={(e) => handleInputChange('promotionType', e.target.value)}
                  className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                  style={{
                    backgroundColor: currentTheme.colors.background,
                    borderColor: currentTheme.colors.border,
                    color: currentTheme.colors.text
                  }}
                >
                  <option value="">Selecciona un tipo</option>
                  <option value="Descuento %">Descuento %</option>
                  <option value="2x1">2x1</option>
                  <option value="Oferta Especial">Oferta Especial</option>
                  <option value="Regalo">Regalo</option>
                </select>
              </div>
            </div>
          </div>

          {/* Promotion Type */}
          <div className="space-y-4">
            <h3
              className="text-lg font-semibold"
              style={{ color: currentTheme.colors.text }}
            >
              ¿Qué se promociona?
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <button
                onClick={() => handleInputChange('promotionTarget', 'category')}
                className={`p-4 border-2 rounded-lg text-left transition-colors ${formData.promotionTarget === 'category'
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-300'
                  }`}
                style={{
                  backgroundColor: formData.promotionTarget === 'category'
                    ? 'rgba(147, 51, 234, 0.1)'
                    : currentTheme.colors.background,
                  borderColor: formData.promotionTarget === 'category'
                    ? '#8b5cf6'
                    : currentTheme.colors.border
                }}
              >
                <div className="flex items-center gap-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: currentTheme.colors.text }}>
                    <path d="m12.83 2.18a2 2 0 0 0-1.66 0L2.6 6.08a1 1 0 0 0 0 1.83l8.58 3.91a2 2 0 0 0 1.66 0l8.58-3.9a1 1 0 0 0 0-1.83z"></path>
                    <path d="M2 12a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 12"></path>
                    <path d="M2 17a1 1 0 0 0 .58.91l8.6 3.91a2 2 0 0 0 1.65 0l8.58-3.9A1 1 0 0 0 22 17"></path>
                  </svg>
                  <span style={{ color: currentTheme.colors.text }}>Una Categoría</span>
                </div>
              </button>

              <button
                onClick={() => handleInputChange('promotionTarget', 'product')}
                className={`p-4 border-2 rounded-lg text-left transition-colors ${formData.promotionTarget === 'product'
                  ? 'border-purple-500 bg-purple-50'
                  : 'border-gray-300'
                  }`}
                style={{
                  backgroundColor: formData.promotionTarget === 'product'
                    ? 'rgba(147, 51, 234, 0.1)'
                    : currentTheme.colors.background,
                  borderColor: formData.promotionTarget === 'product'
                    ? '#8b5cf6'
                    : currentTheme.colors.border
                }}
              >
                <div className="flex items-center gap-3">
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: currentTheme.colors.text }}>
                    <path d="M16.466 7.5C15.643 4.237 13.952 2 12 2 9.239 2 7 6.477 7 12s2.239 10 5 10c.342 0 .677-.069 1-.2"></path>
                    <path d="m15.194 13.707 3.306 3.307a1 1 0 0 1 0 1.414l-1.586 1.586a1 1 0 0 1-1.414 0l-3.307-3.306"></path>
                    <path d="M10 9h.01"></path>
                  </svg>
                  <span style={{ color: currentTheme.colors.text }}>Un Producto</span>
                </div>
              </button>
            </div>

            {formData.promotionTarget === 'category' && (
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: currentTheme.colors.text }}
                >
                  Categoría a promocionar
                </label>
                <select
                  value={formData.category}
                  onChange={(e) => handleInputChange('category', e.target.value)}
                  className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                  style={{
                    backgroundColor: currentTheme.colors.background,
                    borderColor: currentTheme.colors.border,
                    color: currentTheme.colors.text
                  }}
                >
                  <option value="">Selecciona una categoría...</option>
                  <option value="Postres">Postres</option>
                  <option value="Bebidas">Bebidas</option>
                  <option value="Platos Principales">Platos Principales</option>
                  <option value="Entradas">Entradas</option>
                </select>
              </div>
            )}

            {formData.promotionTarget === 'product' && (
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: currentTheme.colors.text }}
                >
                  Producto a promocionar
                </label>
                <div className="relative">
                  <input
                    type="text"
                    placeholder="Buscar producto..."
                    value={productSearch}
                    onChange={(e) => setProductSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{
                      backgroundColor: currentTheme.colors.background,
                      borderColor: currentTheme.colors.border,
                      color: currentTheme.colors.text
                    }}
                  />
                  <svg className="absolute left-3 top-1/2 transform -translate-y-1/2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: currentTheme.colors.textSecondary }}>
                    <circle cx="11" cy="11" r="8"></circle>
                    <path d="m21 21-4.35-4.35"></path>
                  </svg>

                  {productSearch && filteredProducts.length > 0 && (
                    <div
                      className="absolute z-10 mt-2 w-full rounded-md border shadow-lg max-h-56 overflow-auto"
                      style={{
                        backgroundColor: currentTheme.colors.background,
                        borderColor: currentTheme.colors.border
                      }}
                    >
                      {filteredProducts.map((p) => (
                        <button
                          key={p}
                          className="w-full text-left px-3 py-2 hover:bg-opacity-10"
                          style={{ color: currentTheme.colors.text }}
                          onClick={() => {
                            handleInputChange('product', p);
                            setProductSearch(p);
                          }}
                        >
                          {p}
                        </button>
                      ))}
                    </div>
                  )}
                </div>

                {formData.product && (
                  <div className="mt-2 text-sm" style={{ color: currentTheme.colors.textSecondary }}>
                    Seleccionado: <span style={{ color: currentTheme.colors.text }}>{formData.product}</span>
                  </div>
                )}
              </div>
            )}
          </div>

          {/* Audience */}
          <div className="space-y-4">
            <h3
              className="text-lg font-semibold"
              style={{ color: currentTheme.colors.text }}
            >
              ¿A quién se envía?
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: currentTheme.colors.text }}
                >
                  Comportamiento del Cliente
                </label>
                <select
                  value={formData.customerBehavior}
                  onChange={(e) => handleInputChange('customerBehavior', e.target.value)}
                  className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 appearance-none cursor-pointer"
                  style={{
                    backgroundColor: currentTheme.colors.background,
                    borderColor: currentTheme.colors.border,
                    color: currentTheme.colors.text
                  }}
                >
                  <option value="Clientes de los últimos 90 días">Clientes de los últimos 90 días</option>
                  <option value="Clientes de los últimos 30 días">Clientes de los últimos 30 días</option>
                  <option value="Todos los clientes">Todos los clientes</option>
                </select>
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: currentTheme.colors.text }}
                >
                  Impactar a un máximo de
                </label>
                <input
                  type="text"
                  placeholder="Sin límite"
                  value={formData.maxImpact}
                  onChange={(e) => handleInputChange('maxImpact', e.target.value)}
                  className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
                  style={{
                    backgroundColor: currentTheme.colors.background,
                    borderColor: currentTheme.colors.border,
                    color: currentTheme.colors.text
                  }}
                />
              </div>
            </div>

            <div className="flex items-center gap-2 text-sm" style={{ color: currentTheme.colors.textSecondary }}>
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: currentTheme.colors.textSecondary }}>
                <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                <circle cx="12" cy="7" r="4"></circle>
              </svg>
              Se enviará a un estimado de 42 clientes.
            </div>
          </div>

          {/* Message */}
          <div className="space-y-4">
            <h3
              className="text-lg font-semibold"
              style={{ color: currentTheme.colors.text }}
            >
              Mensaje de la Campaña
            </h3>

            <textarea
              value={formData.message}
              onChange={(e) => handleInputChange('message', e.target.value)}
              rows={4}
              className="w-full px-3 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500 resize-none"
              style={{
                backgroundColor: currentTheme.colors.background,
                borderColor: currentTheme.colors.border,
                color: currentTheme.colors.text
              }}
            />

            <div className="text-sm" style={{ color: currentTheme.colors.textSecondary }}>
              Variables disponibles: {formData.promotionTarget === 'category' ? '{nombre_cliente}, {nombre_categoria}, {fecha_fin_oferta}' : '{nombre_cliente}, {nombre_producto_ofertado}, {fecha_fin_oferta}'}
            </div>
          </div>

          {/* Scheduling */}
          <div className="space-y-4">
            <h3
              className="text-lg font-semibold"
              style={{ color: currentTheme.colors.text }}
            >
              Programación
            </h3>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: currentTheme.colors.text }}
                >
                  Fecha de Lanzamiento
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setOpenDatePicker('launch')}
                    className="w-full px-3 py-2 pr-10 rounded-md border text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ backgroundColor: currentTheme.colors.background, borderColor: currentTheme.colors.border, color: currentTheme.colors.text }}
                  >
                    {formData.launchDate || 'dd/mm/aaaa'}
                  </button>
                  <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: currentTheme.colors.textSecondary }}>
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: currentTheme.colors.text }}
                >
                  Hora de Lanzamiento
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setOpenTimePicker(true)}
                    className="w-full px-3 py-2 pr-10 rounded-md border text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ backgroundColor: currentTheme.colors.background, borderColor: currentTheme.colors.border, color: currentTheme.colors.text }}
                  >
                    {formData.launchTime || '--:--'}
                  </button>
                  <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: currentTheme.colors.textSecondary }}>
                    <circle cx="12" cy="12" r="10"></circle>
                    <polyline points="12,6 12,12 16,14"></polyline>
                  </svg>
                </div>
              </div>

              <div>
                <label
                  className="block text-sm font-medium mb-2"
                  style={{ color: currentTheme.colors.text }}
                >
                  Fecha de Fin de la Oferta
                </label>
                <div className="relative">
                  <button
                    type="button"
                    onClick={() => setOpenDatePicker('end')}
                    className="w-full px-3 py-2 pr-10 rounded-md border text-left focus:outline-none focus:ring-2 focus:ring-blue-500"
                    style={{ backgroundColor: currentTheme.colors.background, borderColor: currentTheme.colors.border, color: currentTheme.colors.text }}
                  >
                    {formData.endDate || 'dd/mm/aaaa'}
                  </button>
                  <svg className="absolute right-3 top-1/2 transform -translate-y-1/2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" style={{ color: currentTheme.colors.textSecondary }}>
                    <rect width="18" height="18" x="3" y="4" rx="2" ry="2"></rect>
                    <line x1="16" y1="2" x2="16" y2="6"></line>
                    <line x1="8" y1="2" x2="8" y2="6"></line>
                    <line x1="3" y1="10" x2="21" y2="10"></line>
                  </svg>
                </div>
              </div>
            </div>
          </div>
          {/* Pickers */}
          <DatePickerModal
            isOpen={openDatePicker === 'launch'}
            onClose={() => setOpenDatePicker(null)}
            onSelect={(date) => handleInputChange('launchDate', date)}
            initialDate={formData.launchDate}
          />
          <DatePickerModal
            isOpen={openDatePicker === 'end'}
            onClose={() => setOpenDatePicker(null)}
            onSelect={(date) => handleInputChange('endDate', date)}
            initialDate={formData.endDate}
          />
          <TimePickerModal
            isOpen={openTimePicker}
            onClose={() => setOpenTimePicker(false)}
            onSelect={(time) => handleInputChange('launchTime', time)}
          />
        </div>

        {/* Footer */}
        <div className="flex items-center justify-end gap-3 p-6 border-t" style={{ borderColor: currentTheme.colors.border }}>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              backgroundColor: currentTheme.colors.background,
              borderColor: currentTheme.colors.border,
              color: currentTheme.colors.text
            }}
          >
            Cancelar
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 rounded-md border focus:outline-none focus:ring-2 focus:ring-blue-500"
            style={{
              backgroundColor: currentTheme.colors.background,
              borderColor: currentTheme.colors.border,
              color: currentTheme.colors.text
            }}
          >
            Guardar Borrador
          </button>
          <button
            onClick={handleSave}
            className="px-4 py-2 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 flex items-center gap-2"
            style={{
              backgroundColor: currentTheme.colors.primary,
              color: 'white'
            }}
          >
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" style={{ color: 'white' }}>
              <path d="m22 2-7 20-4-9-9-4 20-7z"></path>
              <path d="M22 2 11 13"></path>
            </svg>
            Guardar y Programar
          </button>
        </div>
      </div>
    </div>
  );
};

const Promociones: React.FC = () => {
  const [campaigns, setCampaigns] = useState<CampaignData[]>(mockCampaigns);
  const [isModalOpen, setIsModalOpen] = useState(false);

  const handleToggleCampaign = (campaignId: string) => {
    setCampaigns(prevCampaigns =>
      prevCampaigns.map(campaign => {
        if (campaign.id !== campaignId) return campaign;
        const nextIsActive = !campaign.isActive;
        const nextStatus: CampaignData['status'] = nextIsActive ? 'Activa' : 'Inactiva';
        return { ...campaign, isActive: nextIsActive, status: nextStatus };
      })
    );
  };

  const handleEditCampaign = (campaignId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    if (campaign) {
      console.log('Editando campaña:', campaign);
      // Aquí se abriría el modal de edición con los datos de la campaña
      alert(`Editando campaña: ${campaign.name}`);
    }
  };

  const handleDuplicateCampaign = (campaignId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    if (campaign) {
      const duplicatedCampaign: CampaignData = {
        ...campaign,
        id: Date.now().toString(),
        name: `${campaign.name} (Copia)`,
        status: 'Borrador',
        isActive: false
      };
      setCampaigns(prev => [...prev, duplicatedCampaign]);
      alert(`Campaña duplicada: ${duplicatedCampaign.name}`);
    }
  };

  const handleDeleteCampaign = (campaignId: string) => {
    const campaign = campaigns.find(c => c.id === campaignId);
    if (campaign && confirm(`¿Estás seguro de que quieres eliminar la campaña "${campaign.name}"?`)) {
      setCampaigns(prev => prev.filter(c => c.id !== campaignId));
      alert(`Campaña eliminada: ${campaign.name}`);
    }
  };

  const handleCreateCampaign = (campaignData: CampaignFormData) => {
    const newCampaign: CampaignData = {
      id: Date.now().toString(),
      name: campaignData.name,
      type: campaignData.promotionType as CampaignData['type'],
      status: 'Borrador',
      audience: '42 clientes',
      launchDate: campaignData.launchDate,
      isActive: false
    };
    setCampaigns(prev => [...prev, newCampaign]);
  };

  return (
    <div className="w-full h-full">
      <div className="mb-8">
        <Header title="Gestión de Promociones y Campañas" />
      </div>
      <div className="flex flex-col gap-4">
        <SearchFilters />
        <CampaignsTable
          campaigns={campaigns}
          onToggleCampaign={handleToggleCampaign}
          onCreateCampaign={() => setIsModalOpen(true)}
          onEditCampaign={handleEditCampaign}
          onDuplicateCampaign={handleDuplicateCampaign}
          onDeleteCampaign={handleDeleteCampaign}
        />
      </div>

      <CreateCampaignModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleCreateCampaign}
      />
    </div>
  );
};

export default Promociones; 

import type { StockItem, OrderData, TeamMember, DonutSegment, CostBreakdownItem } from '../../../types/components/charts';

export const mockStockItems: StockItem[] = [
  {
    id: '1',
    name: 'Solomillo de Ternera',
    quantity: 1,
    alert: true,
    currentStock: 1,
    maxStock: 2,
    unit: 'kg'
  },
  {
    id: '2',
    name: 'Merluza de Pincho',
    quantity: 1,
    alert: true,
    currentStock: 1,
    maxStock: 2,
    unit: 'kg'
  },
  {
    id: '3',
    name: 'Chocolate Negro 70%',
    quantity: 0,
    alert: true,
    currentStock: 0.5,
    maxStock: 1,
    unit: 'kg'
  },
  {
    id: '4',
    name: 'Café en Grano',
    quantity: 1,
    alert: true,
    currentStock: 1,
    maxStock: 2,
    unit: 'kg'
  },
  {
    id: '5',
    name: 'Pechuga de Pollo',
    quantity: 3,
    alert: false,
    currentStock: 3,
    maxStock: 5,
    unit: 'kg'
  },
  {
    id: '6',
    name: 'Pan de Masa Madre (hogaza)',
    quantity: 3,
    alert: false,
    currentStock: 3,
    maxStock: 4,
    unit: 'unidades'
  },
  {
    id: '7',
    name: 'Tomate Pera',
    quantity: 4,
    alert: false,
    currentStock: 4,
    maxStock: 5,
    unit: 'kg'
  },
  {
    id: '8',
    name: 'Aceite de Oliva Virgen Extra',
    quantity: 4,
    alert: false,
    currentStock: 4,
    maxStock: 5,
    unit: 'l'
  },
  {
    id: '9',
    name: 'Huevo Campero (unidad)',
    quantity: 30,
    alert: false,
    currentStock: 30,
    maxStock: 36,
    unit: 'unidades'
  }
];

export const mockOrderData: OrderData[] = [
  {
    id: '42',
    time: '14:30',
    total: '€350',
    status: 'En Progreso',
    table: '07',
    customerName: 'Alice Smith'
  },
  {
    id: '18',
    time: '09:45',
    total: '€150',
    status: 'Cancelado',
    table: '12',
    customerName: 'Michael Johnson'
  },
  {
    id: '33',
    time: '11:15',
    total: '€500',
    status: 'Completado',
    table: '09',
    customerName: 'Emily Davis'
  },
  {
    id: '29',
    time: '16:00',
    total: '€250',
    status: 'Completado',
    table: '05',
    customerName: 'Chris Brown'
  },
  {
    id: '37',
    time: '13:00',
    total: '€400',
    status: 'Completado',
    table: '10',
    customerName: 'Sarah Wilson'
  },
  {
    id: '22',
    time: '17:30',
    total: '€600',
    status: 'Completado',
    table: '02',
    customerName: 'David Lee'
  },
  {
    id: '43',
    time: '14:35',
    total: '€320',
    status: 'En Progreso',
    table: '07',
    customerName: 'Jane Doe'
  },
  {
    id: '44',
    time: '15:00',
    total: '€120',
    status: 'Completado',
    table: '03',
    customerName: 'Laura White'
  }
];

export const mockTeamMembers: TeamMember[] = [
  {
    id: '1',
    name: 'Laura García',
    score: 100,
    avatar: 'https://images.unsplash.com/photo-1539605480396-a61f99da1041?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw2fHxwcm9maWxlJTIwcGVyc29ufGVufDB8fHx8MTc1NDUwOTQxNXww&ixlib=rb-4.1.0&q=80&w=1080',
    sales: '€20.000',
    percentage: 100
  },
  {
    id: '2',
    name: 'Carlos Pérez',
    score: 93,
    avatar: 'https://images.unsplash.com/photo-1633332755192-727a05c4013d?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHwxfHxwcm9maWxlJTIwcGVyc29ufGVufDB8fHx8MTc1NDUwOTQxNXww&ixlib=rb-4.1.0&q=80&w=1080',
    sales: '€18.500',
    percentage: 93
  },
  {
    id: '3',
    name: 'Ana Martínez',
    score: 85,
    avatar: 'https://images.unsplash.com/photo-1531123414780-f74242c2b052?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3NDE5ODJ8MHwxfHNlYXJjaHw5fHxwcm9maWxlJTIwcGVyc29ufGVufDB8fHx8MTc1NDUwOTQxNXww&ixlib=rb-4.1.0&q=80&w=1080',
    sales: '€17.000',
    percentage: 85
  }
];

export const mockDonutData: DonutSegment[] = [
  {
    name: 'Salón Principal',
    value: 50,
    color: '#78A3ED' // blue
  },
  {
    name: 'Terraza',
    value: 25,
    color: '#F7B731' // orange
  },
  {
    name: 'Barra',
    value: 25,
    color: '#F0768C' // pink
  }
];

export const mockCostBreakdownData: CostBreakdownItem[] = [
  {
    category: 'Ingredientes',
    name: 'Ingredientes',
    amount: 4500,
    percentage: 45,
    value: 45,
    color: '#6B46C1' // darkest purple
  },
  {
    category: 'Personal',
    name: 'Personal',
    amount: 2500,
    percentage: 25,
    value: 25,
    color: '#7B61FF' // medium dark purple
  },
  {
    category: 'Alquiler',
    name: 'Alquiler',
    amount: 1500,
    percentage: 15,
    value: 15,
    color: '#8D7BFF' // medium purple
  },
  {
    category: 'Suministros',
    name: 'Suministros',
    amount: 1000,
    percentage: 10,
    value: 10,
    color: '#A092FF' // light purple
  },
  {
    category: 'Marketing',
    name: 'Marketing',
    amount: 500,
    percentage: 5,
    value: 5,
    color: '#B3A8FF' // lightest purple
  }
]; 

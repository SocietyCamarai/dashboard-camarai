# Componentes de Personal

Este directorio contiene todos los componentes relacionados con la gestión de personal, migrados desde la carpeta `personal-componente-a-migrar`.

## Estructura

```
src/components/personal/
├── index.ts                           # Exportaciones principales
├── TabNavigation.tsx                  # Navegación por pestañas
├── ProfileImageUpload.tsx             # Subida de imagen de perfil
├── ConfiguracionPersonalModal.tsx     # Modal principal de configuración
├── inputsComponentes/                 # Componentes de formulario
│   ├── index.ts
│   ├── TextInput.tsx
│   ├── TextArea.tsx
│   ├── Select.tsx
│   ├── Checkbox.tsx
│   └── FileUpload.tsx
├── shared/                           # Componentes compartidos
│   ├── index.ts
│   ├── FormField.tsx
│   ├── ActionButton.tsx
│   ├── DataTable.tsx
│   ├── CustomDropdown.tsx
│   └── ImageUpload.tsx
└── componentesDelModal/              # Componentes del modal
    ├── InformacionPersonal.tsx
    ├── Horarios.tsx
    ├── Fichajes.tsx
    ├── Disponibilidad.tsx
    └── ContratosDocumentos.tsx
```

## Componentes Principales

### ConfiguracionPersonalModal
Modal principal que contiene toda la funcionalidad de gestión de personal con navegación por pestañas.

**Props:**
- `empleado?: Empleado` - Datos del empleado a editar
- `isOpen: boolean` - Estado de apertura del modal
- `onClose: () => void` - Función para cerrar el modal
- `onSave: (empleado: Empleado) => void` - Función para guardar cambios
- `onDelete?: (empleado: Empleado) => void` - Función para eliminar empleado

### TabNavigation
Componente de navegación por pestañas reutilizable.

**Props:**
- `tabs: TabItem[]` - Array de pestañas
- `activeTab: string` - Pestaña activa
- `onTabChange: (tabValue: string) => void` - Función de cambio de pestaña

## Componentes de Formulario

### TextInput
Input de texto con validación y estilos temáticos.

### TextArea
Área de texto con validación y estilos temáticos.

### Select
Selector desplegable con opciones.

### Checkbox
Checkbox con variantes (checkbox/switch).

### FileUpload
Subida de archivos con validación.

## Componentes Compartidos

### FormField
Wrapper para campos de formulario con label y manejo de errores.

### DataTable
Tabla de datos genérica con soporte para acciones.

### CustomDropdown
Dropdown personalizado con búsqueda y selección múltiple.

### ImageUpload
Subida de imágenes con preview.

### ActionButton
Botón de acción con estados de carga.

## Uso

```tsx
import { ConfiguracionPersonalModal } from '../components/personal';

const MiComponente = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [empleado, setEmpleado] = useState<Empleado>();

  const handleSave = (empleadoData: Empleado) => {
    // Lógica para guardar empleado
    console.log('Empleado guardado:', empleadoData);
  };

  return (
    <ConfiguracionPersonalModal
      empleado={empleado}
      isOpen={isModalOpen}
      onClose={() => setIsModalOpen(false)}
      onSave={handleSave}
    />
  );
};
```

## Página de Ejemplo

Se incluye una página de ejemplo en `src/pages/Personal.tsx` que muestra cómo usar todos los componentes de personal en una interfaz completa.

## Notas de Migración

- Todos los componentes han sido migrados manteniendo la funcionalidad original
- Las rutas de importación han sido actualizadas para funcionar con la nueva estructura
- Se han agregado los iconos necesarios (`PictureIcon`, `SpinnerIcon`) al archivo de iconos
- Los componentes utilizan el sistema de temas existente
- Se mantiene la compatibilidad con TypeScript

## Dependencias

- React
- TypeScript
- Tailwind CSS
- Sistema de temas del proyecto
- Iconos del proyecto

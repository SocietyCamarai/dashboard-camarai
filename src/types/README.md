# Types Organization

This directory contains all TypeScript type definitions organized into logical subfolders for better maintainability and discoverability.

## Structure

```
src/types/
├── index.ts              # Main exports - imports from all subfolders
├── theme/                # Theme-related types
│   ├── index.ts         # Theme exports
│   ├── theme.ts         # Theme and ThemeContextType
│   └── provider.ts      # ThemeProviderProps
├── layout/              # Layout-related types
│   ├── index.ts         # Layout exports
│   └── layout.ts        # LayoutProps and SidebarProps
├── navigation/          # Navigation-related types
│   ├── index.ts         # Navigation exports
│   └── navigation.ts    # NavigationType and NavigationContextType
├── components/          # Component-specific types
│   ├── index.ts         # Component exports
│   ├── filters.ts       # FiltersAndExportProps
│   ├── header.ts        # HeaderProps
│   └── themeSelector.ts # ThemeSelectorProps
└── ui/                  # UI-related types
    ├── index.ts         # UI exports
    └── icons.ts         # IconProps
```

## Usage

### Import from main types index
```typescript
import type { Theme, LayoutProps, NavigationType, FiltersAndExportProps, IconProps } from '../types';
```

### Import from specific subfolder
```typescript
import type { Theme, ThemeContextType } from '../types/theme';
import type { LayoutProps, SidebarProps } from '../types/layout';
import type { NavigationType, NavigationContextType } from '../types/navigation';
import type { FiltersAndExportProps, HeaderProps } from '../types/components';
import type { IconProps } from '../types/ui';
```

## Type Categories

### Theme Types (`/theme`)
- **Theme**: Defines theme structure with colors
- **ThemeContextType**: Context type for theme management
- **ThemeProviderProps**: Props for ThemeProvider component

### Layout Types (`/layout`)
- **LayoutProps**: Props for main layout component
- **SidebarProps**: Props for sidebar component

### Navigation Types (`/navigation`)
- **NavigationType**: Union type for navigation modes ('simple' | 'detailed')
- **NavigationContextType**: Context type for navigation state

### Component Types (`/components`)
- **FiltersAndExportProps**: Props for filters and export component
- **HeaderProps**: Props for header component
- **ThemeSelectorProps**: Props for theme selector component

### UI Types (`/ui`)
- **IconProps**: Props for icon components

## Benefits of This Organization

1. **Discoverability**: Easy to find types by their purpose
2. **Maintainability**: Related types are grouped together
3. **Scalability**: Easy to add new types in appropriate categories
4. **Import Clarity**: Clear import paths indicate type purpose
5. **Separation of Concerns**: UI, business logic, and component types are separated

## Adding New Types

When adding new types:

1. **Determine the category** (theme, layout, navigation, components, ui)
2. **Create or update** the appropriate type file
3. **Update the index.ts** in the subfolder to export the new type
4. **Update the main index.ts** if the type should be available from the main import
5. **Update this README** to document the new type

## Migration Notes

- All existing imports from `../types` continue to work
- New imports can use specific subfolder paths for better clarity
- Component-specific interfaces have been moved from inline definitions to the types system 
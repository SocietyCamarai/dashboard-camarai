export interface LayoutProps {
  children: React.ReactNode;
  currentPage: string;
  onPageChange: (page: string) => void;
}

export interface SidebarProps {
  currentPage: string;
  onPageChange?: (page: string) => void;
  isOpen?: boolean;
  onClose?: () => void;
} 
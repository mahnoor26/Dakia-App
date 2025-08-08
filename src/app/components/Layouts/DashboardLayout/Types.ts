import { ReactNode } from "react";

export interface DashboardLayoutProps {
  children: ReactNode;
}

export interface HeaderProps {
  onMenuClick: () => void;
}

export interface SidebarProps {
  isOpen: boolean;
  onClose: () => void;
}


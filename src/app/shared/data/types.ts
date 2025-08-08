import { ReactNode } from 'react';

export interface FooterLink {
    name: string;
}

export interface SocialImage {
    icon: string;
    label: string;
}

export interface HeaderLink {
    name: string;
    path: string;
}

export interface SocialButton {
    name: string;
}

export interface NavItem {
    name: string;
    baseLink: string;
    activeLink: string;
    icon?: ReactNode;
}

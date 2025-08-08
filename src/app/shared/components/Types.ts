import { ModalProps } from '@mantine/core';

export interface ProtectedRouteProps {
    children: React.ReactNode;
}

export interface SectionTitlesProps {
    title: string;
}

export interface BaseModalProps extends Omit<ModalProps, 'title'> {
    children: React.ReactNode;
    trigger?: (open: () => void) => React.ReactNode;
    modalTitle?: string;
    opened: boolean;
    onClose: () => void;
}

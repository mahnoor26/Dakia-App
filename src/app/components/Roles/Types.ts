export interface Permission {
    id: number;
    name: string;
}

export interface PermissionsModalProps {
    permissions: Permission[];
    trigger: (open: () => void) => React.ReactNode;
}

export interface Role {
    id: number;
    name: string;
    description: string;
    permissions: Array<{ id: number }>;
}

export interface RoleModal {
    id?: number;
    name: string;
    description: string;
    permissions: number[];
}

export interface RoleModalProps {
    mode: 'add' | 'edit';
    opened: boolean;
    onClose: () => void;
    onSubmit: (values: RoleModal) => Promise<void>;
    isSubmitting: boolean;
    error?: string | null;
    roleToEdit?: RoleModal | null;
}

export interface PermissionsApiResponse {
    data: {
        data: {
            permissions: Array<{
                id: number;
                name: string;
                guard_name?: string;
                created_at?: string;
                updated_at?: string;
            }>;
        };
    };
}

export interface GroupedPermission {
    id: number;
    name: string;
    verb: string;
    isSelected: boolean;
}

export interface RoleFormProps {
    initialValues?: any;
    onSubmit: (values: RoleFormValues) => void;
    isSubmitting?: boolean;
}

export interface RoleFormValues {
    name: string;
    description: string;
    permissions: number[];
}

export interface TableActionsProps {
    onEdit?: () => void;
    onDelete?: () => void;
    hideEdit?: boolean;
    hideDelete?: boolean;
}

export interface TableColumn<T> {
    id: string;
    header: string;
    accessor: (item: T) => React.ReactNode;
    width?: string | number;
    textAlign?: 'left' | 'center' | 'right';
}

export interface TableProps<T> {
    data: T[];
    columns: {
        id: string;
        header: string;
        accessor: (item: T) => React.ReactNode;
        width?: string;
        textAlign?: 'left' | 'center' | 'right';
    }[];
    loading?: boolean;
}

export interface Role {
    id: number;
    name: string;
}

export interface User {
    id: number;
    name: string;
    email: string;
    roles: Role[];
}

export interface UserFormProps {
    initialValues: {
        roleId: string;
        name: string;
        email: string;
        password?: string;
    };
    onSubmit: (values: any) => void;
    roles: Array<{ value: string; label: string }>;
    isEditing?: boolean;
}

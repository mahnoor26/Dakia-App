export interface Permission {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
    pivot: {
        role_id: number;
        permission_id: number;
    };
}

export interface Role {
    id: number;
    company_id: number;
    name: string;
    description: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
    permissions: Permission[];
    pivot: {
        model_type: string;
        model_id: number;
        role_id: number;
        company_id: number;
    };
}

export interface Company {
    id: number;
    name: string;
    email: string;
    address: string | null;
    phoneNumber: string | null;
    website: string | null;
    logo: string | null;
    created_at: string;
    updated_at: string;
}

export interface User {
    data: any;
    id: number;
    company_id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    created_at: string;
    updated_at: string;
    twilio_phone_number: string | null;
    roles: Role[];
}

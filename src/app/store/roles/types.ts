// src/pages/Users/types.ts
export interface Permission {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
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
        updated_at: string;
    };
}

export interface RolesResponse {
    success: boolean;
    data: {
        roles: Role[];
    };
}

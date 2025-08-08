export interface Permission {
    id: number;
    name: string;
    guard_name: string;
    created_at: string;
    updated_at: string;
    pivot?: {
        model_type: string;
        model_id: number;
        permission_id: number;
        company_id: number;
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
        updated_at: string;
    };
}

export interface User {
    id: number;
    company_id: number;
    name: string;
    email: string;
    email_verified_at: string | null;
    twilio_phone_number: string | null;
    created_at: string;
    updated_at: string;
    roles: Role[];
}

export interface UsersListResponse {
    success: boolean;
    data: {
        users: User[];
    };
}

export interface UserCreateRequest {
    roleId: number;
    name: string;
    email: string;
    password: string;
}

export interface UserUpdateRequest extends UserCreateRequest {
    id: number;
}

export interface UserDeleteRequest {
    id: number;
}

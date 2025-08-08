import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAuthHeaders } from '../../shared/helpers/Headers';
import { baseQuery } from '../../shared/helpers/BaseQuery';
import { RolesResponse } from './types';

export interface RoleCreateRequest {
    name: string;
    description: string;
    permissions: Array<number>;
}

export interface RoleUpdateRequest extends RoleCreateRequest {
    id: number;
}

export interface RoleDeleteRequest {
    id: number | undefined;
}

export const roleApi = createApi({
    reducerPath: 'roleApi',
    baseQuery: baseQuery,
    tagTypes: ['Roles'],
    endpoints: (builder) => ({
        getRolesList: builder.query<RolesResponse, void>({
            query: () => ({
                url: '/api/roles/list',
                headers: getAuthHeaders(),
            }),
            providesTags: ['Roles'],
        }),
        getPermissions: builder.query<RolesResponse, void>({
            query: () => ({
                url: '/api/roles/permissions',
                headers: getAuthHeaders(),
            }),
            providesTags: ['Roles'],
        }),
        createRole: builder.mutation<{}, RoleCreateRequest>({
            query: (body) => ({
                url: '/api/roles/create',
                method: 'POST',
                body,
                headers: getAuthHeaders(),
            }),
            invalidatesTags: ['Roles'],
        }),

        updateRole: builder.mutation<{}, RoleUpdateRequest>({
            query: ({ id, ...body }) => ({
                url: `/api/roles/update/${id}`,
                method: 'PUT',
                body,
                headers: getAuthHeaders(),
            }),
            invalidatesTags: ['Roles'],
        }),

        deleteRole: builder.mutation<{}, RoleDeleteRequest>({
            query: ({ id }) => ({
                url: `/api/roles/delete/${id}`,
                method: 'DELETE',
                headers: getAuthHeaders(),
            }),
            invalidatesTags: ['Roles'],
        }),
    }),
});

export const { useGetRolesListQuery, useGetPermissionsQuery, useCreateRoleMutation, useUpdateRoleMutation, useDeleteRoleMutation } = roleApi;

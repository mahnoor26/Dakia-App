import { createApi } from '@reduxjs/toolkit/query/react';
import { baseQuery } from '../../shared/helpers/BaseQuery';
import { getAuthHeaders } from '../../shared/helpers/Headers';
import { UserCreateRequest, UserDeleteRequest, UsersListResponse, UserUpdateRequest } from './types';

export const userApi = createApi({
    reducerPath: 'userApi',
    baseQuery: baseQuery,
    tagTypes: ['Users'],
    endpoints: (builder) => ({
        getUsersList: builder.query<UsersListResponse, void>({
            query: () => ({
                url: '/api/users/list',
                headers: getAuthHeaders(),
            }),
            providesTags: ['Users'],
        }),

        createUser: builder.mutation<{}, UserCreateRequest>({
            query: (body) => ({
                url: '/api/users/create',
                method: 'POST',
                body,
                headers: getAuthHeaders(),
            }),
            invalidatesTags: ['Users'],
        }),

        updateUser: builder.mutation<{}, UserUpdateRequest>({
            query: ({ id, ...body }) => ({
                url: `/api/users/update/${id}`,
                method: 'PUT',
                body,
                headers: getAuthHeaders(),
            }),
            invalidatesTags: ['Users'],
        }),

        deleteUser: builder.mutation<{}, UserDeleteRequest>({
            query: ({ id }) => ({
                url: `/api/users/delete/${id}`,
                method: 'DELETE',
                headers: getAuthHeaders(),
            }),
            invalidatesTags: ['Users'],
        }),
    }),
});

export const { useGetUsersListQuery, useCreateUserMutation, useUpdateUserMutation, useDeleteUserMutation } = userApi;

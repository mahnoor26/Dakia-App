import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { getAuthHeaders } from '../../shared/helpers/Headers';
import { baseQuery } from '../../shared/helpers/BaseQuery';
import { User } from './types';

export const authApi = createApi({
    reducerPath: 'authApi',
    baseQuery: baseQuery,
    endpoints: (builder) => ({
        register: builder.mutation<User, { name: string; password_confirmation: string; email: string; password: string }>({
            query: (body) => ({
                url: '/api/auth/register',
                method: 'POST',
                body,
            }),
        }),
        login: builder.mutation<User, { email: string; password: string }>({
            query: (body) => ({
                url: '/api/auth/login',
                method: 'POST',
                body,
            }),
        }),
        verifyEmail: builder.query<any, { id: string; hash: string }>({
            query: ({ id, hash }) => ({
                url: `/api/auth/verify-email/${id}/${hash}`,
                headers: getAuthHeaders(),
            }),
        }),
        getUser: builder.query<User, void>({
            query: () => ({
                url: `/api/user`,
                headers: getAuthHeaders(),
            }),
        }),
    }),
});

export const { useRegisterMutation, useLoginMutation, useGetUserQuery, useVerifyEmailQuery } = authApi;

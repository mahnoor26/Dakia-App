import { fetchBaseQuery } from '@reduxjs/toolkit/dist/query';

export const baseQuery = fetchBaseQuery({
    baseUrl: 'https://dakia-backend-fd3404a4389a.herokuapp.com',
});

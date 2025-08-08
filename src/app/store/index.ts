import { configureStore } from '@reduxjs/toolkit';
import { authApi } from './auth/authApi';
import { authSlice } from './userSlice';
import { uiSlice } from './uiSlice';
import { userApi } from './user/userApi';
import { roleApi } from './roles/roleApi';

export const store = configureStore({
    reducer: {
        [authApi.reducerPath]: authApi.reducer,
        [userApi.reducerPath]: userApi.reducer,
        [roleApi.reducerPath]: roleApi.reducer,
        auth: authSlice.reducer,
        ui: uiSlice.reducer,
    },
    middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(authApi.middleware).concat(userApi.middleware).concat(roleApi.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

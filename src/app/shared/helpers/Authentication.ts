import { RootState } from '../../store';

export const isAuthenticated = (state: RootState) => {
    return !!state.auth.token;
};

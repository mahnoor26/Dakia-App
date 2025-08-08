import { createSlice } from '@reduxjs/toolkit';

interface UIState {
    sidebarOpened: boolean;
    selectedMenu: string;
}

const initialState: UIState = {
    sidebarOpened: true,
    selectedMenu: 'User Management',
};

export const uiSlice = createSlice({
    name: 'ui',
    initialState,
    reducers: {
        toggleSidebar: (state) => {
            state.sidebarOpened = !state.sidebarOpened;
        },
        setSelectedMenu: (state, action) => {
            state.selectedMenu = action.payload;
        },
    },
});

export const { toggleSidebar, setSelectedMenu } = uiSlice.actions;
export default uiSlice.reducer;

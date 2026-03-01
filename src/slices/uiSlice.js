// toast notifications and dark/light mode toggle
import { createSlice } from '@reduxjs/toolkit';

const savedMode = localStorage.getItem('ca_theme') || 'light';

const uiSlice = createSlice({
  name: 'ui',
  initialState: {
    snackbar: null,        // { message, severity }
    themeMode: savedMode,  // 'dark' | 'light'
  },
  reducers: {
    showSnackbar(state, { payload }) {
      state.snackbar = payload;
    },
    toggleTheme(state) {
      state.themeMode = state.themeMode === 'dark' ? 'light' : 'dark';
      localStorage.setItem('ca_theme', state.themeMode);
    },
  },
});

export const { showSnackbar, toggleTheme } = uiSlice.actions;
export default uiSlice.reducer;

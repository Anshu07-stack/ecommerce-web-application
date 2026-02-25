import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  loading: {},
  cartDrawer: false,
  notification: null
};

const uiSlice = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    setLoading: (state, action) => {
      const { key, isLoading } = action.payload;
      state.loading[key] = isLoading;
    },
    
    toggleCartDrawer: (state) => {
      state.cartDrawer = !state.cartDrawer;
    },
    
    showNotification: (state, action) => {
      state.notification = action.payload;
    },
    
    hideNotification: (state) => {
      state.notification = null;
    }
  }
});

export const { 
  setLoading, 
  toggleCartDrawer, 
  showNotification, 
  hideNotification 
} = uiSlice.actions;

export default uiSlice.reducer;
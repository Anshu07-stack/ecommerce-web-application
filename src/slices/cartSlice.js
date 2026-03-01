import { createSlice } from '@reduxjs/toolkit';

function loadCart() {
  try {
    return JSON.parse(localStorage.getItem('ca_cart')) || { items: [] };
  } catch {
    return { items: [] };
  }
}

function saveCart(state) {
  localStorage.setItem('ca_cart', JSON.stringify({ items: state.items }));
}

const cartSlice = createSlice({
  name: 'cart',
  initialState: loadCart(),
  reducers: {
    addToCart(state, { payload }) {
      const existing = state.items.find(item => item.id === payload.id);
      if (existing) {
        existing.quantity += 1;
      } else {
        state.items.push({
          id: payload.id,
          title: payload.title,
          price: payload.price,
          thumbnail: payload.thumbnail,
          quantity: 1,
        });
      }
      saveCart(state);
    },

    removeFromCart(state, { payload: id }) {
      state.items = state.items.filter(item => item.id !== id);
      saveCart(state);
    },

    increaseQuantity(state, { payload: id }) {
      const item = state.items.find(i => i.id === id);
      if (item) {
        item.quantity += 1;
        saveCart(state);
      }
    },

    decreaseQuantity(state, { payload: id }) {
      const item = state.items.find(i => i.id === id);
      if (!item) return;
      if (item.quantity === 1) {
        state.items = state.items.filter(i => i.id !== id);
      } else {
        item.quantity -= 1;
      }
      saveCart(state);
    },
  },
});

export const { addToCart, removeFromCart, increaseQuantity, decreaseQuantity } = cartSlice.actions;
export default cartSlice.reducer;

import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  user: null,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    register: (state, action) => {
      const { name, email, password } = action.payload;
      const userData = { name, email, password };
      localStorage.setItem(email, JSON.stringify(userData));
    },
    login: (state, action) => {
      const { email, password } = action.payload;
      const storedUser = JSON.parse(localStorage.getItem(email));
      if (storedUser && storedUser.password === password) {
        state.user = storedUser;
        state.isAuthenticated = true;
      } else {
        alert('Invalid email or password');
      }
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;
    },
  },
});

export const { register, login, logout } = authSlice.actions;
export default authSlice.reducer;

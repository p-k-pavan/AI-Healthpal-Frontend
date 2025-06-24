import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import axios from 'axios';

export const useAuthStore = create(
  persist(
    (set) => ({
      user: null,
      token: null,
      isAuthenticated: false,
      status: 'idle', 
      
      setStatus: (status) => set({ status }),
      
      login: async (email, password) => {
        set({ status: 'loading' });
        try {
          const response = await axios.post('http://localhost:5000/api/auth/login', 
            { email, password },
            { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
          );
          
          set({
            user: response.data.user,
            token: response.data.token,
            isAuthenticated: true,
            status: 'success'
          });
          return { success: true, data: response.data };
        } catch (error) {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            status: 'error'
          });
          throw error;
        }
      },
      
      register: async (userData) => {
        set({ status: 'loading' });
        try {
          const response = await axios.post('http://localhost:5000/api/auth/register', 
            userData,
            { withCredentials: true, headers: { 'Content-Type': 'application/json' } }
          );
          
          set({
            user: response.data.user,
            token: response.data.token,
            isAuthenticated: true,
            status: 'success'
          });
          return { success: true, data: response.data };
        } catch (error) {
          set({ status: 'error' });
          throw error;
        }
      },
      
      logout: async () => {
        try {
          await axios.post('http://localhost:5000/api/auth/logout', 
            {},
            { withCredentials: true }
          );
        } finally {
          set({
            user: null,
            token: null,
            isAuthenticated: false,
            status: 'idle'
          });
        }
      },
      
      checkAuth: async () => {
        set({ status: 'loading' });
        try {
          const response = await axios.get('http://localhost:5000/api/auth/check', 
            { withCredentials: true }
          );
          
          set({
            user: response.data.user,
            isAuthenticated: true,
            status: 'success'
          });
          return true;
        } catch {
          set({
            user: null,
            isAuthenticated: false,
            status: 'idle'
          });
          return false;
        }
      }
    }),
    {
      name: 'ai-healthpal-auth',
      storage: createJSONStorage(() => sessionStorage),
      partialize: (state) => ({ 
        user: state.user,
        token: state.token,
        isAuthenticated: state.isAuthenticated
      })
    }
  )
);
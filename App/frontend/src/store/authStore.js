import { create } from 'zustand';
import axios from 'axios';

import CouchDbAuthService from '../couchdb/authService.js'; 

const couchdbAuth = new CouchDbAuthService("http://localhost:5984");
axios.defaults.withCredentials = true;


export const useAuthStore = create((set) => ({
    couchdb: null,
    user: null,
    isAuthenticated: false,
    error: null,
    isLoading: false,
    isCheckingAuth: true,
    
    login: async (email, password) => {
        set({ isLoading: true, error: null });
        try {
            const user = await couchdbAuth.login(email, password);
            set({ user: user, isAuthenticated: true, error: null, isLoading: false });
        } catch (error) {
            set({ error: "Login failed: " + error.response.data.message, isLoading: false });
            //throw error;
        }
    },
    logout: async () => {
		set({ isLoading: true, error: null });
		try {
			await couchdbAuth.logout();
			set({ user: null, isAuthenticated: false, error: null, isLoading: false });
		} catch (error) {
			set({ error: "Error logging out", isLoading: false });
			//throw error;
		}
	},
    checkAuth: async () => {
        set({ isCheckingAuth: true, error: null });
        try {
            await couchdbAuth.getSession();
            set({ isAuthenticated: true, isCheckingAuth: false, error: null });
        } catch (error) {
            set({ error: error.response, isAuthenticated: false, isCheckingAuth: false });
            //throw error;
        }
    },
}));
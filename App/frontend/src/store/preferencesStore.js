import { create } from 'zustand';

import CouchDbPreferencesService from '../couchdb/preferencesService.js';
const couchdbPreferences = new CouchDbPreferencesService('http://localhost:5984');

export const usePreferencesStore = create((set) => ({
  fontSize:
  isLoading: false,
  error: null,
  
  getPreference: async (preferenceType) => {
    set({ isLoading: true, error: null });
    try {
      const preference = await couchdbPreferences.getUserPreference(null, preferenceType);
      set({ preference });
    } catch (error) {
      set({ error: 'Error getting preference', isLoading: false });
      //throw error;
    }
  },
  getUserPreferences: async () => {
    set({ isLoading: true, error: null });
    try {
      const preferences = await couchdbPreferences.getUserPreferences(null);
      set({ preferences });
    } catch (error) {
      set({ error: 'Error getting user preferences', isLoading: false });
      //throw error;
    }
  },
  setPreference: async (preferenceType, value) => {
    set({ isLoading: true, error: null });
    try {
      const preference = await couchdbPreferences.saveUserPreference(null, preferenceType, value);
      set({ preference });
    } catch (error) {
      set({ error: 'Error setting preference', isLoading: false });
      //throw error;
    }
  },
  setPreferences: async (preferences) => {
    set({ isLoading: true, error: null });
    try {
      const preference = await couchdbPreferences.saveUserPreferences(null, preferences);
      set({ preference });
    } catch (error) {
      set({ error: 'Error setting preferences', isLoading: false });
      //throw error;
    }
  },
  })
);
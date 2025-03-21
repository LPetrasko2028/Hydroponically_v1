import { create } from 'zustand';

import CouchDbPreferencesService from '../couchdb/preferencesService.js';
const couchdbPreferences = new CouchDbPreferencesService('http://localhost:5984');

export const usePreferencesStore = create((set) => ({
  theme: "dark",
  fontSize: 14,
  contrast: false,
  reducedMotion: false,

  isLoading: false,
  error: null,
  getUserPreferences: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const preferences = await couchdbPreferences.getUserPreferences(userId, null);
      set({
        theme: preferences.theme,
        fontSize: preferences.fontSize,
        contrast: preferences.contrast,
        reducedMotion: preferences.reducedMotion,
        isLoading: false,
      });
    } catch (error) {
      set({ error: "Error getting user preferences", isLoading: false });
      throw error;
    }
  },
  setPreference: async (userId, preferenceType, value) => {
    set({ isLoading: true, error: null });
    try {
      const preference = await couchdbPreferences.saveUserPreference(
        null,
        preferenceType,
        value
      );
      set({ [preferenceType]: value, isLoading: false });
    } catch (error) {
      set({ error: "Error setting preference", isLoading: false });
      throw error;
    }
  },
  setPreferences: async (userId, preferences) => {
    set({ isLoading: true, error: null });
    try {
      const preference = await couchdbPreferences.saveUserPreferences(
        null,
        preferences
      );
      set({ isLoading: false });
    } catch (error) {
      set({ error: "Error setting preferences", isLoading: false });
      throw error;
    }
  },
}));
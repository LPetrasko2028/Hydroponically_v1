import { create } from 'zustand';

import preferenceService from '../couchdb/preferencesServicePouchDB.js';

export const usePreferencesStore = create((set) => ({
  theme: "dark",
  fontSize: 100,
  contrast: false,
  reducedMotion: false,

  isLoading: false,
  error: null,
  setTheme: (theme) => set({ theme: theme }),
  setFontSize: (fontSize) => set({ fontSize }),
  setContrast: (contrast) => set({ contrast }),
  setReducedMotion: (reducedMotion) => set({ reducedMotion }),

  getUserPreferences: async (userId) => {
    set({ isLoading: true, error: null });
    try {
      const preferences = await preferenceService.getUserPreferences(userId);
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
  setPreferences: async (userId, preferences) => {
    set({ isLoading: true, error: null });
    try {
      await preferenceService.saveUserPreferences(userId, preferences);
      set({
        isLoading: false,
        theme: preferences.theme,
        fontSize: preferences.fontSize,
        contrast: preferences.contrast,
        reducedMotion: preferences.reducedMotion,
      });
    } catch (error) {
      set({ error: "Error setting preferences", isLoading: false });
      throw error;
    }
  },
}));
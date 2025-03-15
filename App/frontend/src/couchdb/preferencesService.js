// preferences-service.js
import axios from 'axios';
import { toast } from 'react-hot-toast';

class CouchDbPreferencesService {
  constructor(couchdbUrl, dbName = 'user_preferences') {
    this.baseUrl = couchdbUrl;
    this.dbName = dbName;
    this.axios = axios.create({
      baseURL: `${couchdbUrl}/${dbName}`,
      withCredentials: true, // Important for cookie-based auth
      headers: {
        'Content-Type': 'application/json'
      }
    });
    
    // Add request interceptor for loading states
    this.axios.interceptors.request.use(
      (config) => {
        // Create a unique request ID for tracking
        const requestId = new Date().getTime();
        config.requestId = requestId;
        
        // Optional: Show loading toast
        toast.loading('Loading preferences...', { id: `loading-${requestId}` });
        
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    
    // Add response interceptor for error handling
    this.axios.interceptors.response.use(
      (response) => {
        // Dismiss the loading toast
        const requestId = response.config.requestId;
        toast.dismiss(`loading-${requestId}`);
        
        return response;
      },
      (error) => {
        // Dismiss loading toast
        const requestId = error.config?.requestId;
        if (requestId) {
          toast.dismiss(`loading-${requestId}`);
        }
        
        // Show error toast with appropriate message
        const errorMessage = error.response?.data?.reason || 
                             error.response?.data?.message || 
                             error.message || 
                             'Failed to load preferences';
        toast.error(errorMessage);
        
        return Promise.reject(error);
      }
    );
  }
  /**
   * Get user preferences
   * @param {string} userId - The user ID
   * @param {string} [preferenceType] - Optional specific preference type
   * @returns {Promise<Object>} - The user preferences
   */
  async getUserPreferences(userId, preferenceType = null) {
    try {
      if (preferenceType) {
        // Get specific preference document
        const docId = `${userId}:${preferenceType}`;
        try {
          const response = await this.axios.get(`/${encodeURIComponent(docId)}`);
          return response.data;
        } catch (error) {
          if (error.response && error.response.status === 404) {
            // Document doesn't exist yet
            return null;
          }
          throw error;
        }
      } else {
        // Get all preferences for user
        const response = await this.axios.get('/_design/preferences/_view/by_user', {
          params: {
            key: JSON.stringify(userId),
            include_docs: true
          }
        });
        
        // Extract the actual documents from the view response
        const preferences = {};
        if (response.data && response.data.rows) {
          response.data.rows.forEach(row => {
            if (row.doc && row.doc.preferenceType) {
              preferences[row.doc.preferenceType] = row.doc.value;
            }
          });
        }
        
        return preferences;
      }
    } catch (error) {
      console.error('Error getting user preferences:', error);
      throw error;
    }
  }

  async saveUserPreference(userId, preferenceType, value) {
    try {
      // Document ID format: userId:preferenceType
      const docId = `${userId}:${preferenceType}`;
      
      // Try to get existing document first to get _rev if it exists
      let existingDoc = null;
      try {
        const getResponse = await this.axios.get(`/${encodeURIComponent(docId)}`);
        if (getResponse.status === 200) {
          existingDoc = getResponse.data;
        }
      } catch (error) {
        if (error.response && error.response.status !== 404) {
          throw error;
        }
        // 404 is expected if document doesn't exist yet
      }
      
      // Prepare document
      const doc = {
        _id: docId,
        userId,
        preferenceType,
        value,
        type: 'user_preference',
        updatedAt: new Date().toISOString()
      };
      
      // Add revision if document exists
      if (existingDoc && existingDoc._rev) {
        doc._rev = existingDoc._rev;
      }
      
      // Save document
      const response = await this.axios.put(`/${encodeURIComponent(docId)}`, doc);
      
      // Show success toast
      toast.success(`${preferenceType} preference saved`);
      
      return response.data;
    } catch (error) {
      console.error(`Error saving ${preferenceType} preference:`, error);
      throw error;
    }
  }

  /**
   * Save multiple user preferences at once
   * @param {string} userId - The user ID
   * @param {Object} preferences - Object with preference types as keys and values
   * @returns {Promise<Object>} - The bulk update response
   */
  async saveUserPreferences(userId, preferences) {
    try {
      // Get all existing documents first
      const existingPrefs = await this.getUserPreferences(userId);
      
      // Prepare bulk docs array
      const docs = [];
      
      for (const [preferenceType, value] of Object.entries(preferences)) {
        const docId = `${userId}:${preferenceType}`;
        const doc = {
          _id: docId,
          userId,
          preferenceType,
          value,
          type: 'user_preference',
          updatedAt: new Date().toISOString()
        };
        
        // Add revision if document exists
        if (existingPrefs && 
            existingPrefs[preferenceType] && 
            existingPrefs[preferenceType]._rev) {
          doc._rev = existingPrefs[preferenceType]._rev;
        }
        
        docs.push(doc);
      }
      
      // Use bulk API to update all at once
      const response = await this.axios.post('/_bulk_docs', { docs });
      
      toast.success('Preferences saved');
      
      return response.data;
    } catch (error) {
      console.error('Error saving multiple preferences:', error);
      throw error;
    }
  }
}

export default CouchDbPreferencesService;
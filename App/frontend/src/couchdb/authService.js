// auth-service.js
import axios from 'axios';
import { toast } from 'react-hot-toast';

class CouchDbAuthService {
  constructor(couchdbUrl) {
    this.baseUrl = couchdbUrl;
    this.axios = axios.create({
      baseURL: couchdbUrl,
      withCredentials: true, // Important for cookie-based auth
      headers: {
        'Content-Type': 'application/json'
      }
    });
    this.axios.interceptors.request.use(
      (config) => {
        // You can show a loading toast for all requests
        // or use the unique request ID to track specific requests
        const requestId = new Date().getTime();
        config.requestId = requestId;
        
        // Optional: Show loading toast
        toast.loading('Loading...', { id: `loading-${requestId}` });
        
        return config;
      },
      (error) => {
        return Promise.reject(error);
      }
    );
    
    // Add response interceptor
    this.axios.interceptors.response.use(
      (response) => {
        // Dismiss the loading toast if it exists
        const requestId = response.config.requestId;
        toast.dismiss(`loading-${requestId}`);
        
        // Show success toast (optional, you might not want this for every request)
        //toast.success('Request successful!');
        
        return response;
      },
      (error) => {
        // Dismiss loading toast
        const requestId = error.config?.requestId;
        if (requestId) {
          toast.dismiss(`loading-${requestId}`);
        }
        
        // Show error toast
        const errorMessage = error.response?.data?.message || error.message || 'An error occurred';
        toast.error(errorMessage);
        
        return Promise.reject(error);
      }
    );
  }

  /**
   * Log in to CouchDB
   * @param {string} username - The username
   * @param {string} password - The password
   * @returns {Promise<Object>} - The session response
   */
  async login(username, password) {
    // add include docs to the query
    try {
      const response = await this.axios.post("/_session", {
        name: username,
        password: password,
      });

      console.log("response", response);
      // If successfully logged in, the response will include authentication cookie
      if (response.status === 200) {
        // Store username for future reference if needed
        localStorage.setItem("couchdb_username", username);
        return response.data;
      } else {
        throw new Error("Login failed");
      }
    } catch (error) {
      console.error("Login error:", error);
      error.message = "Login failed: " + error.message;
      throw error;
    }
  }

  /**
   * Log out from CouchDB
   * @returns {Promise<Object>} - The logout response
   */
  async logout() {
    try {
      const response = await this.axios.delete('/_session');
      if (response.status === 200) {
        localStorage.removeItem('couchdb_username');
        return response.data;
      } else {
        throw new Error('Logout failed');
      }
    } catch (error) {
      console.error('Logout error:', error);
      throw error;
    }
  }

  /**
   * Get current session information
   * @returns {Promise<Object>} - The session information
   */
  async getSession() {
    try {
      const response = await this.axios.get('/_session');
      //console.log('Session:', response.data);
      console.log('Raw response:', response);
      if (response.data.userCtx.name === null) {
        throw new Error('Not logged in');
      }
      return response.data.userCtx;
    } catch (error) {
      console.error('Get session error:', error);
      
      throw error;
    }
  }

  /**
   * Sign up a new user
   * @param {string} username - The username
   * @param {string} password - The password
   * @param {Object} metadata - Additional user metadata
   * @returns {Promise<Object>} - The user creation response
   */
  async signUp(username, password, metadata = {}) {
    try {
      // New user document
      const userDoc = {
        _id: `org.couchdb.user:${username}`,
        name: username,
        password: password,
        roles: metadata.roles || [],
        type: 'user',
        ...metadata
      };

      // Create the user in the _users database
      const response = await this.axios.put(`/_users/org.couchdb.user:${username}`, userDoc);
      return response.data;
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  }

  /**
   * Change user password
   * @param {string} username - The username
   * @param {string} password - The new password
   * @returns {Promise<Object>} - The password change response
   */
  async changePassword(username, password) {
    try {
      // First get the user document
      const response = await this.axios.get(`/_users/org.couchdb.user:${username}`);
      const userDoc = response.data;
      
      // Update the password
      userDoc.password = password;
      
      // Put the updated document
      const updateResponse = await this.axios.put(
        `/_users/org.couchdb.user:${username}`,
        userDoc,
        {
          headers: {
            'If-Match': userDoc._rev // Important for document update
          }
        }
      );
      
      return updateResponse.data;
    } catch (error) {
      console.error('Change password error:', error);
      throw error;
    }
  }

//   /**
//    * Create a PouchDB instance with authentication cookies
//    * @param {string} dbName - The database name
//    * @returns {PouchDB} - An authenticated PouchDB instance
//    */
//   createAuthenticatedDb(dbName) {
//     return new PouchDB(`${this.baseUrl}/${dbName}`, {
//       skip_setup: true,
//       fetch: (url, opts) => {
//         opts.credentials = 'include'; // Include cookies in requests
//         return fetch(url, opts);
//       }
//     });
//   }
}

export default CouchDbAuthService;
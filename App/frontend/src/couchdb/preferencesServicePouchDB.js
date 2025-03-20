// preferences-service.js

//import PouchDBFind from 'pouchdb-find';
//PouchDB.plugin(PouchDBFind);

import { toast } from 'react-hot-toast';
import { CouchDB_URL } from "../URLs.js";
import process from 'process';

const setupDB = async (couchdbUrl, dbName) => {
  // Create a local PouchDB instance that syncs with the remote CouchDB
  const db = PouchDB(dbName);
  const remoteDb = await PouchDB(`${couchdbUrl}/${dbName}`, {
    fetch: (url, opts) => {
      opts.credentials = 'include'; // Important for cookie-based auth
      return PouchDB.fetch(url, opts);
    }
  });

  const setupSync = async (db, remoteDb) => {
    // Set up two-way sync with remote database
    db.sync(remoteDb, {
      live: true,
      retry: true
    }).on('change', (change) => {
      console.log('Sync change:', change);
    }).on('error', (err) => {
      console.error('Sync error:', err);
      toast.error('Sync error: ' + (err.message || 'Unknown error'));
    });
  };
  // Set up sync with remote database
  await setupSync(db, remoteDb);

  return db;
};

const db = await setupDB(CouchDB_URL, 'user_preferences');

export const getUserPreferences = async (userId) => {
  try {
    toast.loading('Loading preferences...', { id: 'loading-prefs' });

    const result = await db.query('preferences/by_user', {
      key: userId,
      include_docs: true
    });

    // Extract the actual documents from the view response
    const preferences = {};
    if (result && result.rows) {
      result.rows.forEach(row => {
        if (row.doc && row.doc.preferenceType) {
          preferences[row.doc.preferenceType] = row.doc;
        }
      });
    }

    toast.dismiss('loading-prefs');
    return preferences;
  } catch (error) {
    toast.dismiss('loading-prefs');
    console.error('Error getting user preferences:', error);
    toast.error('Error loading preferences: ' + (error.message || 'Unknown error'));
    throw error;
  }
};

export const saveUserPreferences = async (userId, preferences) => {
  try {
    toast.loading("Saving preferences...", { id: "saving-prefs" });
    // Get all existing documents first to preserve _rev values
    const existingPrefs = await getUserPreferences(userId);

    // Prepare bulk docs array
    const docs = [];
    for (const [preferenceType, value] of Object.entries(preferences)) {
      const docId = `${userId}:${preferenceType}`;
      const doc = {
        _id: docId,
        userId,
        preferenceType,
        value,
        type: "user_preference",
        updatedAt: new Date().toISOString(),
      };

      // Add revision if document exists
      if (
        existingPrefs &&
        existingPrefs[preferenceType] &&
        existingPrefs[preferenceType]._rev
      ) {
        doc._rev = existingPrefs[preferenceType]._rev;
      }

      docs.push(doc);
    }

    // Use bulk API to update all at once
    const response = await db.bulkDocs(docs);

    toast.dismiss("saving-prefs");
    toast.success("Preferences saved");

    return response;
  } catch (error) {
    toast.dismiss("saving-prefs");
    console.error("Error saving multiple preferences:", error);
    toast.error(
      "Error saving preferences: " + (error.message || "Unknown error")
    );
    throw error;
  }
};

// Clean up resources when service is no longer needed
export const destroy = async () => {
  if (db.sync) {
    db.sync.cancel();
  }
  return db.close();
};

process.on('SIGINT', async () => {
  await destroy();
  process.exit(0);
});

export default { getUserPreferences, saveUserPreferences, destroy };




//   class PouchDbPreferencesService {
//     constructor(
//       couchdbUrl = "http://localhost:5984",
//       dbName = "user_preferences"
//     ) {
//       this.baseUrl = couchdbUrl;
//       this.dbName = dbName;

//       // Create a local PouchDB instance that syncs with the remote CouchDB
//       this.db = new PouchDB(dbName);
//       this.remoteDb = async () =>
//         await new PouchDB(`${couchdbUrl}/${dbName}`, {
//           fetch: (url, opts) => {
//             opts.credentials = "include"; // Important for cookie-based auth
//             return PouchDB.fetch(url, opts);
//           },
//         });

//       // Set up sync with remote database
//       this.setupSync();
//     }

//     setupSync() {
//       // Set up two-way sync with remote database
//       this.sync = this.db
//         .sync(this.remoteDb, {
//           live: true,
//           retry: true,
//         })
//         .on("change", (change) => {
//           console.log("Sync change:", change);
//         })
//         .on("error", (err) => {
//           console.error("Sync error:", err);
//           toast.error("Sync error: " + (err.message || "Unknown error"));
//         });
//     }
//     /**
//      * Get user preferences
//      * @param {string} userId - The user ID
//      * @param {string} [preferenceType] - Optional specific preference type
//      * @returns {Promise<Object>} - The user preferences
//      */
//     async getUserPreferences(userId, preferenceType = null) {
//       try {
//         toast.loading("Loading preferences...", { id: "loading-prefs" });

//         if (preferenceType) {
//           // Get specific preference document
//           const docId = `${userId}:${preferenceType}`;
//           try {
//             const doc = await this.db.get(docId);
//             toast.dismiss("loading-prefs");
//             return doc;
//           } catch (error) {
//             toast.dismiss("loading-prefs");
//             if (error.status === 404) {
//               // Document doesn't exist yet
//               return null;
//             }
//             toast.error(
//               "Error loading preference: " + (error.message || "Unknown error")
//             );
//             throw error;
//           }
//         } else {
//           // Get all preferences for user
//           const result = await this.db.query("preferences/by_user", {
//             key: userId,
//             include_docs: true,
//           });

//           // Extract the actual documents from the view response
//           const preferences = {};
//           if (result && result.rows) {
//             result.rows.forEach((row) => {
//               if (row.doc && row.doc.preferenceType) {
//                 preferences[row.doc.preferenceType] = row.doc;
//               }
//             });
//           }

//           toast.dismiss("loading-prefs");
//           return preferences;
//         }
//       } catch (error) {
//         toast.dismiss("loading-prefs");
//         console.error("Error getting user preferences:", error);
//         toast.error(
//           "Error loading preferences: " + (error.message || "Unknown error")
//         );
//         throw error;
//       }
//     }

//     async saveUserPreference(userId, preferenceType, value) {
//       try {
//         const loadingId = `saving-pref-${preferenceType}`;
//         toast.loading(`Saving ${preferenceType} preference...`, {
//           id: loadingId,
//         });

//         // Document ID format: userId:preferenceType
//         const docId = `${userId}:${preferenceType}`;

//         // Try to get existing document first to get _rev if it exists
//         let doc = {
//           _id: docId,
//           userId,
//           preferenceType,
//           value,
//           type: "user_preference",
//           updatedAt: new Date().toISOString(),
//         };

//         try {
//           const existingDoc = await this.db.get(docId);
//           doc._rev = existingDoc._rev;
//         } catch (error) {
//           if (error.status !== 404) {
//             throw error;
//           }
//           // 404 is expected if document doesn't exist yet
//         }

//         // Save document
//         const response = await this.db.put(doc);

//         // Show success toast
//         toast.dismiss(loadingId);
//         toast.success(`${preferenceType} preference saved`);

//         return response;
//       } catch (error) {
//         toast.dismiss(`saving-pref-${preferenceType}`);
//         console.error(`Error saving ${preferenceType} preference:`, error);
//         toast.error(
//           `Error saving preference: ${error.message || "Unknown error"}`
//         );
//         throw error;
//       }
//     }

//     /**
//      * Save multiple user preferences at once
//      * @param {string} userId - The user ID
//      * @param {Object} preferences - Object with preference types as keys and values
//      * @returns {Promise<Object>} - The bulk update response
//      */
//     async saveUserPreferences(userId, preferences) {
//       try {
//         toast.loading("Saving preferences...", { id: "saving-prefs" });

//         // Get all existing documents first to preserve _rev values
//         const existingPrefs = await this.getUserPreferences(userId);

//         // Prepare bulk docs array
//         const docs = [];

//         for (const [preferenceType, value] of Object.entries(preferences)) {
//           const docId = `${userId}:${preferenceType}`;
//           const doc = {
//             _id: docId,
//             userId,
//             preferenceType,
//             value,
//             type: "user_preference",
//             updatedAt: new Date().toISOString(),
//           };

//           // Add revision if document exists
//           if (
//             existingPrefs &&
//             existingPrefs[preferenceType] &&
//             existingPrefs[preferenceType]._rev
//           ) {
//             doc._rev = existingPrefs[preferenceType]._rev;
//           }

//           docs.push(doc);
//         }

//         // Use bulk API to update all at once
//         const response = await this.db.bulkDocs(docs);

//         toast.dismiss("saving-prefs");
//         toast.success("Preferences saved");

//         return response;
//       } catch (error) {
//         toast.dismiss("saving-prefs");
//         console.error("Error saving multiple preferences:", error);
//         toast.error(
//           "Error saving preferences: " + (error.message || "Unknown error")
//         );
//         throw error;
//       }
//     }

//     // Clean up resources when service is no longer needed
//     destroy() {
//       if (this.sync) {
//         this.sync.cancel();
//       }
//       return this.db.close();
//     }
//   };

// export default PouchDbPreferencesService;
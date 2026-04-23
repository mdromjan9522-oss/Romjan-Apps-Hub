/* =============================================================
   ROMJAN APPS — backend-api.js (Flexible Sync Utility)
   Supports: 
   1. Node.js Backend (Recommended for Security)
   2. Direct Firebase SDK (For hosting like InfinityFree)
   ============================================================= */

// --- CONFIGURATION ---
const SYNC_MODE = 'DIRECT'; // Options: 'API' (Node.js) or 'DIRECT' (Firebase SDK)
const API_BASE  = '/api'; // Use full URL if API is hosted elsewhere (e.g., https://api.yoursite.com/api)

// Firebase Client Config (Only needed if SYNC_MODE is 'DIRECT')
const FIREBASE_CLIENT_CONFIG = {
  apiKey: "AIzaSyBJpPNB2rg2LkbBvTuOK77h2SiD48QGZFU",
  authDomain: "romjan-apps-hub.firebaseapp.com",
  projectId: "romjan-apps-hub",
  storageBucket: "romjan-apps-hub.firebasestorage.app",
  messagingSenderId: "1077652856222",
  appId: "1:1077652856222:web:ed5ec7b2166c26c25d0a8f"
};
// ---------------------

// --- INTERNAL FIREBASE INITIALIZATION ---
let _db = null;
if (SYNC_MODE === 'DIRECT') {
  if (typeof firebase !== 'undefined') {
    if (FIREBASE_CLIENT_CONFIG.apiKey === "YOUR_API_KEY") {
      console.warn("REMOTE_DB: Please update FIREBASE_CLIENT_CONFIG in firebase-config.js for DIRECT mode.");
    } else {
      firebase.initializeApp(FIREBASE_CLIENT_CONFIG);
      _db = firebase.firestore();
    }
  } else {
    console.error("REMOTE_DB: Firebase SDK not found. Make sure to include Firebase scripts in your HTML.");
  }
}

/**
 * Global Database Sync Utility
 */
const REMOTE_DB = {
  // Check if we are in API mode
  isApi: () => SYNC_MODE === 'API',

  // Internal helper for API calls
  _call: async (path, options = {}) => {
    try {
      const res = await fetch(`${API_BASE}${path}`, options);
      if (!res.ok) throw new Error(`HTTP Error: ${res.status}`);
      return await res.json();
    } catch (e) {
      console.error(`API Call Failed (${path}):`, e);
      throw e;
    }
  },

  // Internal helper for Direct Firestore
  _directGet: async (collection) => {
    if (!_db) throw new Error("Firestore not initialized");
    try {
      const snap = await _db.collection(collection).get();
      return snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (e) { console.error(`Firestore Error (${collection}):`, e); throw e; }
  },

  _directSave: async (collection, data) => {
    if (!_db) throw new Error("Firestore not initialized");
    try {
      const { id, ...payload } = data;
      await _db.collection(collection).doc(id).set(payload, { merge: true });
    } catch (e) { console.error(`Firestore Save Error (${collection}):`, e); throw e; }
  },

  _directDelete: async (collection, id) => {
    if (!_db) throw new Error("Firestore not initialized");
    try {
      await _db.collection(collection).doc(id).delete();
    } catch (e) { console.error(`Firestore Delete Error (${collection}):`, e); throw e; }
  },

  // Sync all apps
  getApps: async () => {
    if (REMOTE_DB.isApi()) return await REMOTE_DB._call('/apps') || [];
    return await REMOTE_DB._directGet('apps');
  },

  // Save/Update an app
  saveApp: async (app) => {
    if (REMOTE_DB.isApi()) {
      await REMOTE_DB._call('/apps', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(app)
      });
    } else {
      await REMOTE_DB._directSave('apps', app);
    }
  },

  // Delete an app
  deleteApp: async (id) => {
    if (REMOTE_DB.isApi()) {
      await REMOTE_DB._call(`/apps/${id}`, { method: 'DELETE' });
    } else {
      await REMOTE_DB._directDelete('apps', id);
    }
  },

  // Users
  getUsers: async () => {
    if (REMOTE_DB.isApi()) return await REMOTE_DB._call('/users') || [];
    return await REMOTE_DB._directGet('users');
  },

  saveUser: async (user) => {
    if (REMOTE_DB.isApi()) {
      await REMOTE_DB._call('/users', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(user)
      });
    } else {
      await REMOTE_DB._directSave('users', user);
    }
  },

  deleteUser: async (id) => {
    if (REMOTE_DB.isApi()) {
      await REMOTE_DB._call(`/users/${id}`, { method: 'DELETE' });
    } else {
      await REMOTE_DB._directDelete('users', id);
    }
  },

  // Admins
  getAdmins: async () => {
    if (REMOTE_DB.isApi()) return await REMOTE_DB._call('/admins') || [];
    return await REMOTE_DB._directGet('admins');
  },

  saveAdmin: async (admin) => {
    if (REMOTE_DB.isApi()) {
      await REMOTE_DB._call('/admins', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(admin)
      });
    } else {
      await REMOTE_DB._directSave('admins', admin);
    }
  },

  deleteAdmin: async (id) => {
    if (REMOTE_DB.isApi()) {
      await REMOTE_DB._call(`/admins/${id}`, { method: 'DELETE' });
    } else {
      await REMOTE_DB._directDelete('admins', id);
    }
  },

  // Categories
  getCategories: async () => {
    if (REMOTE_DB.isApi()) return await REMOTE_DB._call('/categories') || [];
    return await REMOTE_DB._directGet('categories');
  },

  saveCategory: async (cat) => {
    if (REMOTE_DB.isApi()) {
      await REMOTE_DB._call('/categories', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(cat)
      });
    } else {
      await REMOTE_DB._directSave('categories', cat);
    }
  },

  deleteCategory: async (id) => {
    if (REMOTE_DB.isApi()) {
      await REMOTE_DB._call(`/categories/${id}`, { method: 'DELETE' });
    } else {
      await REMOTE_DB._directDelete('categories', id);
    }
  },

  // Social Links
  getSocialLinks: async () => {
    if (REMOTE_DB.isApi()) return await REMOTE_DB._call('/social') || [];
    return await REMOTE_DB._directGet('social_links');
  },

  saveSocialLink: async (link) => {
    if (REMOTE_DB.isApi()) {
      await REMOTE_DB._call('/social', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(link)
      });
    } else {
      await REMOTE_DB._directSave('social_links', link);
    }
  },

  deleteSocialLink: async (id) => {
    if (REMOTE_DB.isApi()) {
      await REMOTE_DB._call(`/social/${id}`, { method: 'DELETE' });
    } else {
      await REMOTE_DB._directDelete('social_links', id);
    }
  }
};

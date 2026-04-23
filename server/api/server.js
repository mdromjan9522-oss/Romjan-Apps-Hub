const express = require('express');
const cors = require('cors');
const admin = require('firebase-admin');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Firebase Admin
if (!admin.apps.length) {
  const serviceAccount = process.env.FIREBASE_SERVICE_ACCOUNT 
    ? JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT) 
    : null;

  if (serviceAccount) {
    admin.initializeApp({
      credential: admin.credential.cert(serviceAccount)
    });
  } else {
    // Fallback for local development if PROJECT_ID is provided
    admin.initializeApp({
      projectId: process.env.FIREBASE_PROJECT_ID || "romjan-apps-hub",
    });
  }
}

const db = admin.firestore();

// API Endpoints
app.get('/api/apps', async (req, res) => {
  try {
    const snap = await db.collection('apps').orderBy('createdAt', 'desc').get();
    const apps = snap.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    res.json(apps);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/apps', async (req, res) => {
  try {
    const { id, ...data } = req.body;
    await db.collection('apps').doc(id).set(data);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/apps/:id', async (req, res) => {
  try {
    await db.collection('apps').doc(req.params.id).delete();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/users', async (req, res) => {
  try {
    const snap = await db.collection('users').get();
    res.json(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/users', async (req, res) => {
  try {
    const { id, ...data } = req.body;
    await db.collection('users').doc(id).set(data);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/users/:id', async (req, res) => {
  try {
    await db.collection('users').doc(req.params.id).delete();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/admins', async (req, res) => {
  try {
    const snap = await db.collection('admins').get();
    res.json(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/admins', async (req, res) => {
  try {
    const { id, ...data } = req.body;
    await db.collection('admins').doc(id).set(data);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/admins/:id', async (req, res) => {
  try {
    await db.collection('admins').doc(req.params.id).delete();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/categories', async (req, res) => {
  try {
    const snap = await db.collection('categories').get();
    res.json(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/categories', async (req, res) => {
  try {
    const { id, ...data } = req.body;
    await db.collection('categories').doc(id).set(data);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/categories/:id', async (req, res) => {
  try {
    await db.collection('categories').doc(req.params.id).delete();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.get('/api/social', async (req, res) => {
  try {
    const snap = await db.collection('social_links').get();
    res.json(snap.docs.map(doc => ({ id: doc.id, ...doc.data() })));
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.post('/api/social', async (req, res) => {
  try {
    const { id, ...data } = req.body;
    await db.collection('social_links').doc(id).set(data);
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

app.delete('/api/social/:id', async (req, res) => {
  try {
    await db.collection('social_links').doc(req.params.id).delete();
    res.json({ success: true });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = app;

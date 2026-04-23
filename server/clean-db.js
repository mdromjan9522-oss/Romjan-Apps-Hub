require('dotenv').config();
const admin = require('firebase-admin');

async function cleanCollections() {
  try {
    const saContent = process.env.FIREBASE_SERVICE_ACCOUNT;
    if (!saContent) {
      console.error("Error: FIREBASE_SERVICE_ACCOUNT is missing in .env");
      return;
    }

    const serviceAccount = JSON.parse(saContent);
    
    if (!admin.apps.length) {
      admin.initializeApp({
        credential: admin.credential.cert(serviceAccount)
      });
    }

    const db = admin.firestore();
    const collectionsToClean = ['apps', 'categories', 'social_links', 'users'];

    console.log("🚀 Cleaning Firestore collections (Admin collection is safe)...");

    for (const collectionName of collectionsToClean) {
      const snapshot = await db.collection(collectionName).get();
      if (snapshot.empty) {
        console.log(`- ${collectionName}: Already empty.`);
        continue;
      }

      const batch = db.batch();
      snapshot.docs.forEach((doc) => {
        batch.delete(doc.ref);
      });

      await batch.commit();
      console.log(`✅ ${collectionName}: Deleted ${snapshot.size} documents.`);
    }

    console.log("\n✨ All specified collections have been cleared successfully!");

  } catch (error) {
    console.error("❌ Error during cleaning:", error.message);
  }
}

cleanCollections();

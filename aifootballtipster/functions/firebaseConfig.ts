// Important: This file should be treated as a secret and not exposed to the client.
// It is intended for use in serverless functions (e.g., on Netlify).

import { initializeApp, getApps, cert } from 'firebase-admin/app';
import { getFirestore } from 'firebase-admin/firestore';

// --- IMPORTANT ACTION REQUIRED ---
// 1. Go to your Firebase project settings > Service accounts.
// 2. Click "Generate new private key" and download the JSON file.
// 3. Open the JSON file and copy its contents.
// 4. In your Netlify project settings, go to Build & deploy > Environment.
// 5. Create a new environment variable called `FIREBASE_SERVICE_ACCOUNT_KEY`.
// 6. Paste the entire JSON content as the value for this variable.
// 7. Your `FIREBASE_PROJECT_ID` is visible in your Firebase project settings.
//    Create another environment variable in Netlify with this value.

let serviceAccount: any = null;
try {
  if (process.env.FIREBASE_SERVICE_ACCOUNT_KEY) {
    serviceAccount = JSON.parse(process.env.FIREBASE_SERVICE_ACCOUNT_KEY);
  }
} catch (error) {
  console.error("Failed to parse FIREBASE_SERVICE_ACCOUNT_KEY. Make sure it's a valid JSON string.", error);
  serviceAccount = null;
}


if (!getApps().length) {
  if (serviceAccount) {
    initializeApp({
      credential: cert(serviceAccount),
      projectId: process.env.FIREBASE_PROJECT_ID,
    });
  } else {
    // This will likely happen in local development if env vars aren't set.
    // The functions will fail gracefully in this case.
    console.warn("Firebase Admin SDK not initialized. Missing or invalid environment variables.");
  }
}

export const db = serviceAccount ? getFirestore() : null;
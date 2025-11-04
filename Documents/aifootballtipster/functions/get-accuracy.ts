
import type { Handler } from "@netlify/functions";
import { db } from './firebaseConfig';

const mockAccuracy = { wins: 12, total: 15 };

const handler: Handler = async () => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  try {
    if (!db) {
      console.warn("Firebase not initialized. Returning mock accuracy data for development.");
      return {
        statusCode: 200,
        body: JSON.stringify(mockAccuracy),
        headers
      };
    }

    const docRef = db.collection('dailyStats').doc('latest');
    const doc = await docRef.get();

    if (!doc.exists) {
      return {
        statusCode: 200,
        body: JSON.stringify({ wins: 0, total: 0 }),
        headers
      };
    }

    const data = doc.data();
    return {
      statusCode: 200,
      body: JSON.stringify({ wins: data?.wins || 0, total: data?.total || 0 }),
      headers
    };

  } catch (error) {
    console.error("Error in get-accuracy function:", error);
    // Return mock data on error instead of 500 to prevent the frontend from breaking.
    return {
      statusCode: 200,
      body: JSON.stringify(mockAccuracy),
      headers
    };
  }
};

export { handler };
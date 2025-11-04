import type { PredictionData, GroundingChunk } from '../types';

/**
 * Fetches an AI-powered match prediction from the backend Netlify function.
 * This function also handles saving the prediction to the database on the server-side.
 * @param teamA The name of the home team.
 * @param teamB The name of the away team.
 * @param gender The gender category for the match ('Men' or 'Women').
 * @returns A promise that resolves to the prediction data, analyst breakdown, and sources.
 */
export async function getMatchPrediction(teamA: string, teamB: string, gender: 'Men' | 'Women'): Promise<{ predictionData: PredictionData; analystBreakdown: string; sources: GroundingChunk[] } | null> {
  try {
    const response = await fetch('/.netlify/functions/save-prediction', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ teamA, teamB, gender }),
    });

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'The server returned an unreadable error.' }));
      throw new Error(errorData.message || 'The server returned an error.');
    }

    const data = await response.json();
    return data;

  } catch (error) {
    console.error("Error fetching match prediction from service:", error);
    if (error instanceof Error) {
        throw new Error(`Failed to get prediction: ${error.message}`);
    }
    throw new Error("An unknown error occurred while getting the prediction.");
  }
}

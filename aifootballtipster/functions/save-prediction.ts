
import type { Handler, HandlerEvent } from "@netlify/functions";
import { GoogleGenAI } from "@google/genai";
import type { PredictionData, GroundingChunk } from '../types';
import { db } from './firebaseConfig';

const GEMINI_API_KEY = process.env.API_KEY;

// Mock data to be used when the API key is not available
const mockPredictionData: PredictionData = {
    winner: { teamA: 60, draw: 15, teamB: 25 },
    totalGoals: { line: 2.5, overProbability: 70 },
    totalCorners: { line: 9.5, overProbability: 45 },
    bothTeamsToScore: { yesProbability: 65 },
    goalScorers: "Harry Kane",
    doubleOfTheDay: "Man City to win & Over 2.5 Goals",
    winningCombo: "Man City & BTTS"
};
const mockAnalystBreakdown = "### Mock Analysis\n\n**This is a mock analysis.** The model is currently running in offline mode because the Gemini API key is not configured. Please set the `API_KEY` environment variable in your Netlify settings or `.env` file to get live predictions from the AI model. \n\n* Team A is in great form.\n* Team B has some key players injured.";
const mockSources: GroundingChunk[] = [];


const handler: Handler = async (event: HandlerEvent) => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Methods': 'POST, OPTIONS',
    'Content-Type': 'application/json'
  };

  if (event.httpMethod === 'OPTIONS') {
    return { statusCode: 204, headers };
  }

  if (event.httpMethod !== 'POST') {
    return { statusCode: 405, body: JSON.stringify({ message: 'Method Not Allowed' }), headers };
  }

  try {
    if (!GEMINI_API_KEY) {
        console.warn("Gemini API key is missing. Returning mock prediction data for development.");
        // Add a small delay to simulate network latency for a better UX
        await new Promise(resolve => setTimeout(resolve, 1000));
        return {
            statusCode: 200,
            body: JSON.stringify({
                predictionData: mockPredictionData,
                analystBreakdown: mockAnalystBreakdown,
                sources: mockSources,
            }),
            headers,
        };
    }

    const ai = new GoogleGenAI({ apiKey: GEMINI_API_KEY });

    if (!event.body) {
      return { statusCode: 400, body: JSON.stringify({ message: 'Request body is missing' }), headers };
    }
    const { teamA, teamB, gender } = JSON.parse(event.body);

    if (!teamA || !teamB || !gender) {
      return { statusCode: 400, body: JSON.stringify({ message: 'Missing required fields: teamA, teamB, gender' }), headers };
    }

    const prompt = `
      Analyze the upcoming ${gender}'s soccer match between ${teamA} (Team A) and ${teamB} (Team B).
      Act as an expert soccer analyst. Use Google Search to get the most up-to-date information on team form, player injuries, head-to-head records, and any other relevant news.

      You MUST return a single valid JSON object and nothing else. The JSON should not be enclosed in markdown backticks.
      The JSON object must contain two top-level keys: "predictions" and "analystBreakdown".

      - "analystBreakdown": A concise summary of your findings and reasoning for the predictions, in Markdown format.
      - "predictions": A JSON object with your final predictions. Ensure all probability values are percentages from 0 to 100.
      
      The "predictions" object must have the following structure:
      {
        "winner": { "teamA": number, "draw": number, "teamB": number },
        "totalGoals": { "line": number, "overProbability": number },
        "totalCorners": { "line": number, "overProbability": number },
        "bothTeamsToScore": { "yesProbability": number },
        "goalScorers": "A string listing one or two likely anytime goal scorers. e.g., 'Erling Haaland'",
        "doubleOfTheDay": "string",
        "winningCombo": "string"
      }
    `;

    const response = await ai.models.generateContent({
      model: "gemini-2.5-flash",
      contents: prompt,
      config: {
        tools: [{ googleSearch: {} }],
      },
    });

    const text = (response.text ?? '').trim();
    if (!text) {
        throw new Error("Received an empty response from the model.");
    }
    
    let jsonString = text;
    if (jsonString.startsWith('```json')) {
        jsonString = jsonString.substring(7, jsonString.length - 3).trim();
    }

    const parsedResponse = JSON.parse(jsonString);

    const predictionData: PredictionData = parsedResponse.predictions;
    const analystBreakdown: string = parsedResponse.analystBreakdown;
    const sources: GroundingChunk[] = response.candidates?.[0]?.groundingMetadata?.groundingChunks || [];

    if (db) {
        const predictionRecord = {
            teamA,
            teamB,
            gender,
            prediction: predictionData,
            createdAt: new Date(),
            status: 'pending',
        };
        await db.collection('predictions').add(predictionRecord);
    } else {
        console.warn("Firestore is not initialized. Prediction not saved.");
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ predictionData, analystBreakdown, sources }),
      headers
    };

  } catch (error) {
    console.error("Error in save-prediction function:", error);
    const errorMessage = error instanceof Error ? error.message : "An unknown server error occurred.";
    return {
      statusCode: 500,
      body: JSON.stringify({ message: errorMessage }),
      headers
    };
  }
};

export { handler };

import type { Handler } from "@netlify/functions";
import type { LiveMatch } from '../types';

const API_KEY = process.env.THESPORTSDB_API_KEY;

// Mock data to be used when the API key is not available
const mockLiveScores: LiveMatch[] = [
  { idEvent: '1', strHomeTeam: 'Man City', strAwayTeam: 'Arsenal', intHomeScore: '1', intAwayScore: '0', strStatus: "65'" },
  { idEvent: '2', strHomeTeam: 'Liverpool', strAwayTeam: 'Chelsea', intHomeScore: '2', intAwayScore: '2', strStatus: "HT" },
  { idEvent: '3', strHomeTeam: 'Real Madrid', strAwayTeam: 'Barcelona', intHomeScore: null, intAwayScore: null, strStatus: "19:00" },
  { idEvent: '4', strHomeTeam: 'Juventus', strAwayTeam: 'AC Milan', intHomeScore: '0', intAwayScore: '0', strStatus: "21'" },
];

const PREFERRED_LEAGUE_IDS = [
  '4328', // English Premier League
  '4329', // English Championship
  '4334', // French Ligue 1
  '4335', // Spanish La Liga
  '4331', // German Bundesliga
  '4470', // South African Premier Division
  '4480', // UEFA Champions League
];

const handler: Handler = async () => {
  const headers = {
    'Access-Control-Allow-Origin': '*',
    'Content-Type': 'application/json'
  };

  if (!API_KEY) {
    console.warn("TheSportsDB API key is missing. Returning mock live scores for development.");
    return {
      statusCode: 200,
      body: JSON.stringify(mockLiveScores),
      headers
    };
  }

  try {
     const promises = PREFERRED_LEAGUE_IDS.map(leagueId =>
      fetch(`https://www.thesportsdb.com/api/v2/json/${API_KEY}/livescore.php?l=${leagueId}`)
        .then(res => {
          if (!res.ok) {
            console.warn(`Failed to fetch scores for league ${leagueId}. Status: ${res.status}`);
            return { events: null };
          }
          return res.json();
        })
        .catch(err => {
            console.error(`Error fetching scores for league ${leagueId}:`, err);
            return { events: null };
        })
    );
    
    const results = await Promise.all(promises);

    const allMatches = results
      .filter(result => result && result.events)
      .flatMap(result => result.events as LiveMatch[]);

    return {
      statusCode: 200,
      body: JSON.stringify(allMatches),
      headers
    };

  } catch (error) {
    console.error("Error in get-live-scores function:", error);
    // Return mock data on any failure to prevent frontend errors
    return {
      statusCode: 200,
      body: JSON.stringify(mockLiveScores),
      headers
    };
  }
};

export { handler };
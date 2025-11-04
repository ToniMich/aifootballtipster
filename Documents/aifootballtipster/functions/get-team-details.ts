
import type { Handler, HandlerEvent } from "@netlify/functions";
import type { Team } from '../types';

const API_KEY = process.env.THESPORTSDB_API_KEY;

const teamCache = new Map<string, Team | null>();

const handler: Handler = async (event: HandlerEvent) => {
    const headers = {
      'Access-Control-Allow-Origin': '*',
      'Content-Type': 'application/json'
    };
    
    if (!API_KEY) {
        console.warn("TheSportsDB API key is missing on the server. Cannot fetch team details.");
        return { statusCode: 204, headers }; // No content
    }
    
    const teamName = event.queryStringParameters?.team;

    if (!teamName) {
        return { 
          statusCode: 400, 
          body: JSON.stringify({ message: 'Team name query parameter is required.' }), 
          headers 
        };
    }

    if (teamCache.has(teamName)) {
        const cachedTeam = teamCache.get(teamName);
        return {
          statusCode: 200,
          body: JSON.stringify(cachedTeam),
          headers
        };
    }

    try {
        const response = await fetch(`https://www.thesportsdb.com/api/v2/json/${API_KEY}/searchteams.php?t=${encodeURIComponent(teamName)}`);
        if (!response.ok) {
            console.error(`Failed to fetch team details for ${teamName}. Status: ${response.status}`);
            return { statusCode: 204, headers };
        }

        const data = await response.json();
        const team = data?.teams?.[0] || null;
        
        teamCache.set(teamName, team);
        
        return {
          statusCode: 200,
          body: JSON.stringify(team),
          headers
        };

    } catch (error) {
        console.error(`Error fetching team details for ${teamName}:`, error);
        teamCache.set(teamName, null);
        return { statusCode: 204, headers };
    }
};

export { handler };
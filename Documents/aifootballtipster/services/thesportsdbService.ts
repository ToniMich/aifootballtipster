import type { LiveMatch, Team } from '../types';

// This client-side cache helps avoid refetching team details during the same session.
const teamCache = new Map<string, Team | null>();

/**
 * Fetches live soccer scores from the backend Netlify function.
 * @returns A promise that resolves to an array of live matches.
 */
export async function getLiveScores(): Promise<LiveMatch[]> {
  try {
    const response = await fetch('/.netlify/functions/get-live-scores');

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({ message: 'Failed to fetch live scores.' }));
      throw new Error(errorData.message || 'The server returned an error while fetching live scores.');
    }

    const data: LiveMatch[] = await response.json();
    return data;
  } catch (error) {
    console.error("Error fetching live scores from service:", error);
    // Re-throw the error so the component can handle it
    throw error;
  }
}

/**
 * Fetches team details (like the badge URL) from the backend Netlify function.
 * Caches results to prevent redundant API calls.
 * @param teamName The name of the team to fetch details for.
 * @returns A promise that resolves to the team details or null if not found.
 */
export async function getTeamDetails(teamName: string): Promise<Team | null> {
    const normalizedTeamName = teamName.toLowerCase();
    if (teamCache.has(normalizedTeamName)) {
        return teamCache.get(normalizedTeamName) ?? null;
    }
    
    try {
        const response = await fetch(`/.netlify/functions/get-team-details?team=${encodeURIComponent(teamName)}`);

        // A 204 status means no content, which is a valid response for a team not found.
        if (response.status === 204) {
            teamCache.set(normalizedTeamName, null);
            return null;
        }

        if (!response.ok) {
            const errorData = await response.json().catch(() => ({ message: 'Failed to fetch team details.' }));
            throw new Error(errorData.message);
        }

        const team: Team | null = await response.json();
        teamCache.set(normalizedTeamName, team);
        return team;
    } catch (error) {
        console.error(`Error fetching details for ${teamName}:`, error);
        teamCache.set(normalizedTeamName, null); // Cache failure to avoid refetching
        return null; // Return null on error to not break the UI
    }
}

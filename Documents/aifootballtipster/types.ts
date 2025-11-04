export interface WinnerPrediction {
  teamA: number;
  draw: number;
  teamB: number;
}

export interface OverUnderPrediction {
  line: number;
  overProbability: number;
}

export interface BooleanPrediction {
  yesProbability: number;
}

export interface PredictionData {
  winner: WinnerPrediction;
  totalGoals: OverUnderPrediction;
  totalCorners: OverUnderPrediction;
  bothTeamsToScore: BooleanPrediction;
  goalScorers: string;
  doubleOfTheDay: string;
  winningCombo: string;
}

export interface GroundingChunk {
  web?: {
    // Fix: Made properties optional to match the type from @google/genai SDK.
    uri?: string;
    title?: string;
  };
  maps?: {
    // Fix: Made properties optional to match the type from @google/genai SDK.
    uri?: string;
    title?: string;
  };
}

export interface LiveMatch {
  idEvent: string;
  strHomeTeam: string;
  strAwayTeam: string;
  intHomeScore: string | null;
  intAwayScore: string | null;
  strStatus: string;
}

export interface Team {
  idTeam: string;
  strTeam: string;
  strTeamBadge: string;
}

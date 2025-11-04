
import React from 'react';
import type { PredictionData, Team } from '../types';
import WinnerBet from './WinnerBet';
import OverUnderBet from './OverUnderBet';
import BooleanBet from './BooleanBet';
import ComboBet from './ComboBet';

interface BestBetsProps {
  data: PredictionData;
  teams: { teamA: string; teamB: string };
  teamDetails: { teamA: Team | null, teamB: Team | null };
}

const BestBets: React.FC<BestBetsProps> = ({ data, teams, teamDetails }) => {
  return (
    <section>
      <h3 className="text-2xl font-bold mb-6 text-center">Best Bets</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="md:col-span-2">
          <WinnerBet winner={data.winner} teams={teams} teamDetails={teamDetails} />
        </div>
        
        <OverUnderBet 
            title="Total Goals" 
            line={data.totalGoals.line} 
            overProbability={data.totalGoals.overProbability} 
        />
        
        <OverUnderBet 
            title="Total Corners" 
            line={data.totalCorners.line} 
            overProbability={data.totalCorners.overProbability} 
        />

        <BooleanBet 
            title="Both Teams To Score" 
            yesProbability={data.bothTeamsToScore.yesProbability}
        />

        <ComboBet title="Anytime Goal Scorer" value={data.goalScorers} />
        
        <ComboBet title="Double of the Day" value={data.doubleOfTheDay} />
        
        <ComboBet title="Winning Combo" value={data.winningCombo} />

      </div>
    </section>
  );
};

export default BestBets;

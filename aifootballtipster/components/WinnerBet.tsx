import React from 'react';
import type { WinnerPrediction, Team } from '../types';
import { SoccerIcon } from './icons/SoccerIcon';

interface WinnerBetProps {
  winner: WinnerPrediction;
  teams: { teamA: string; teamB: string };
  teamDetails: { teamA: Team | null, teamB: Team | null };
}

const BetBar: React.FC<{ label: string; value: number; color: string }> = ({ label, value, color }) => (
  <div className="flex flex-col items-center w-full">
    <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-8 relative overflow-hidden">
      <div 
        className={`${color} h-8 rounded-full transition-all duration-500`} 
        style={{ width: `${value}%` }}
      ></div>
      <span className="absolute inset-0 flex items-center justify-center text-sm font-bold text-white mix-blend-difference">
        {value.toFixed(1)}%
      </span>
    </div>
    <span className="mt-2 text-sm font-semibold text-gray-700 dark:text-gray-300 truncate w-full px-1">{label}</span>
  </div>
);


const WinnerBet: React.FC<WinnerBetProps> = ({ winner, teams, teamDetails }) => {
  return (
    <div className="bg-white dark:bg-slate-900/70 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700">
      <h4 className="text-lg font-bold mb-4 text-center text-green-600">Match Winner</h4>
      <div className="flex items-end justify-between gap-4">
        {/* Team A Column */}
        <div className="flex flex-col items-center flex-grow text-center w-1/3">
            {teamDetails?.teamA?.strTeamBadge ? (
                <img src={teamDetails.teamA.strTeamBadge} alt={`${teams.teamA} logo`} className="h-12 w-12 mb-2 object-contain" />
            ) : (
                <div className="h-12 w-12 mb-2 flex items-center justify-center">
                    <SoccerIcon className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                </div>
            )}
            <BetBar label={teams.teamA} value={winner.teamA} color="bg-blue-500" />
        </div>

        {/* Draw Column */}
        <div className="flex flex-col items-center flex-grow text-center w-1/3">
            <div className="h-12 w-12 mb-2 flex items-center justify-center font-bold text-gray-500 dark:text-gray-400 text-lg"></div>
            <BetBar label="Draw" value={winner.draw} color="bg-[#93A5AD]" />
        </div>

        {/* Team B Column */}
        <div className="flex flex-col items-center flex-grow text-center w-1/3">
            {teamDetails?.teamB?.strTeamBadge ? (
                <img src={teamDetails.teamB.strTeamBadge} alt={`${teams.teamB} logo`} className="h-12 w-12 mb-2 object-contain" />
            ) : (
                <div className="h-12 w-12 mb-2 flex items-center justify-center">
                    <SoccerIcon className="h-8 w-8 text-gray-400 dark:text-gray-500" />
                </div>
            )}
            <BetBar label={teams.teamB} value={winner.teamB} color="bg-[#cc5500]" />
        </div>
      </div>
    </div>
  );
};

export default WinnerBet;
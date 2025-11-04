import React, { useState, useRef, useEffect } from 'react';
import { teams } from '../data/teams';

interface TeamInputProps {
  onSubmit: (teamA: string, teamB: string, gender: 'Men' | 'Women') => void;
  isLoading: boolean;
  onReset: () => void;
}

const TeamInput: React.FC<TeamInputProps> = ({ onSubmit, isLoading, onReset }) => {
  const [teamA, setTeamA] = useState('');
  const [teamB, setTeamB] = useState('');
  const [gender, setGender] = useState<'Men' | 'Women'>('Men');

  const [suggestionsA, setSuggestionsA] = useState<string[]>([]);
  const [suggestionsB, setSuggestionsB] = useState<string[]>([]);
  const [activeInput, setActiveInput] = useState<'A' | 'B' | null>(null);

  const containerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (containerRef.current && !containerRef.current.contains(event.target as Node)) {
        setActiveInput(null);
      }
    };
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const handleInputChange = (value: string, teamSetter: React.Dispatch<React.SetStateAction<string>>, suggestionsSetter: React.Dispatch<React.SetStateAction<string[]>>) => {
    teamSetter(value);
    if (value) {
      const filteredSuggestions = teams.filter(team =>
        team.toLowerCase().includes(value.toLowerCase())
      ).slice(0, 5); // Limit to top 5 suggestions
      suggestionsSetter(filteredSuggestions);
    } else {
      suggestionsSetter([]);
    }
  };

  const handleSuggestionClick = (team: string, teamSetter: React.Dispatch<React.SetStateAction<string>>, suggestionsSetter: React.Dispatch<React.SetStateAction<string[]>>) => {
    teamSetter(team);
    suggestionsSetter([]);
    setActiveInput(null);
  };


  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit(teamA, teamB, gender);
  };

  const inactiveBtnClasses = "bg-gray-200 text-gray-700 dark:bg-slate-700/50 dark:text-gray-300 border-transparent hover:bg-gray-300 dark:hover:bg-slate-600/50";

  const menBtnClasses = gender === 'Men' 
    ? "bg-blue-600 text-white border-blue-500" 
    : inactiveBtnClasses;
  const womenBtnClasses = gender === 'Women' 
    ? "bg-pink-600 text-white border-pink-500" 
    : inactiveBtnClasses;


  return (
    <div ref={containerRef} className="bg-white dark:bg-slate-900/70 p-6 sm:p-8 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700">
      <h2 className="text-3xl font-bold text-center mb-6 text-gray-900 dark:text-white">The Predictor</h2>
      
      <div className="flex justify-center items-center mb-6">
          <div className="flex rounded-lg border-2 border-gray-300 dark:border-slate-600 p-1">
              <button
                  onClick={() => setGender('Men')}
                  className={`px-6 py-2 rounded-md text-sm font-semibold transition-colors border ${menBtnClasses}`}>
                  ♂ Men
              </button>
              <button
                  onClick={() => setGender('Women')}
                  className={`px-6 py-2 rounded-md text-sm font-semibold transition-colors border ${womenBtnClasses}`}>
                  ♀ Women
              </button>
          </div>
      </div>

      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col sm:flex-row items-start gap-4">
            <div className="w-full relative">
                <label htmlFor="home-team" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Home Team</label>
                <input
                  id="home-team"
                  type="text"
                  value={teamA}
                  onChange={(e) => handleInputChange(e.target.value, setTeamA, setSuggestionsA)}
                  onFocus={() => setActiveInput('A')}
                  placeholder="e.g., Manchester United"
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-slate-800/60 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  disabled={isLoading}
                  autoComplete="off"
                />
                {activeInput === 'A' && suggestionsA.length > 0 && (
                  <ul className="absolute z-10 w-full bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg">
                    {suggestionsA.map((team) => (
                      <li
                        key={team}
                        onClick={() => handleSuggestionClick(team, setTeamA, setSuggestionsA)}
                        className="px-4 py-2 text-gray-800 dark:text-white cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                      >
                        {team}
                      </li>
                    ))}
                  </ul>
                )}
            </div>
            <span className="text-gray-600 dark:text-gray-300 font-bold mt-10 hidden sm:block">VS</span>
             <div className="w-full relative">
                <label htmlFor="away-team" className="block text-sm font-medium text-gray-600 dark:text-gray-300 mb-1">Away Team</label>
                <input
                  id="away-team"
                  type="text"
                  value={teamB}
                  onChange={(e) => handleInputChange(e.target.value, setTeamB, setSuggestionsB)}
                  onFocus={() => setActiveInput('B')}
                  placeholder="e.g., Liverpool"
                  className="w-full px-4 py-3 bg-gray-100 dark:bg-slate-800/60 border border-gray-300 dark:border-slate-600 rounded-lg text-gray-900 dark:text-white placeholder:text-gray-500 dark:placeholder:text-gray-400 focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent transition-all"
                  disabled={isLoading}
                   autoComplete="off"
                />
                {activeInput === 'B' && suggestionsB.length > 0 && (
                   <ul className="absolute z-10 w-full bg-white dark:bg-slate-800 border border-gray-300 dark:border-slate-600 rounded-lg mt-1 max-h-48 overflow-y-auto shadow-lg">
                    {suggestionsB.map((team) => (
                      <li
                        key={team}
                        onClick={() => handleSuggestionClick(team, setTeamB, setSuggestionsB)}
                        className="px-4 py-2 text-gray-800 dark:text-white cursor-pointer hover:bg-gray-100 dark:hover:bg-slate-700 transition-colors"
                      >
                        {team}
                      </li>
                    ))}
                  </ul>
                )}
            </div>
        </div>

        {isLoading ? (
          <div className="flex w-full gap-2">
            <button
              type="button"
              disabled
              className="flex-[9] px-6 py-4 bg-gray-500 text-white font-bold rounded-lg cursor-not-allowed"
            >
              Analyzing...
            </button>
            <button
              type="button"
              onClick={onReset}
              className="flex-[1] px-4 py-4 bg-[#cc5500] text-white font-bold rounded-lg hover:opacity-90 transition-opacity"
            >
              Reset
            </button>
          </div>
        ) : (
          <button
            type="submit"
            disabled={!teamA || !teamB}
            className="w-full px-6 py-4 bg-green-600 text-white font-bold rounded-lg hover:bg-green-500 disabled:bg-gray-500 disabled:cursor-not-allowed transition-colors focus:outline-none focus:ring-2 focus:ring-green-400 focus:ring-offset-2 focus:ring-offset-gray-100 dark:focus:ring-offset-slate-900"
          >
            Get AI Prediction
          </button>
        )}
      </form>
    </div>
  );
};

export default TeamInput;
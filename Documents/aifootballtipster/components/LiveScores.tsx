import React, { useState, useEffect, useCallback } from 'react';
import type { LiveMatch } from '../types';
import { getLiveScores } from '../services/thesportsdbService';
import { RefreshIcon } from './icons/RefreshIcon';
import { LoaderIcon } from './icons/LoaderIcon';

const LiveScores: React.FC = () => {
  const [scores, setScores] = useState<LiveMatch[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');

  const fetchScores = useCallback(async (isInitialLoad = false) => {
    if (isInitialLoad) {
      setIsLoading(true);
    }
    setError(null);
    try {
      const liveScores = await getLiveScores();
      setScores(liveScores);
      setLastUpdated(new Date().toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' }));
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An unknown error occurred.');
    } finally {
      if (isInitialLoad) {
        setIsLoading(false);
      }
    }
  }, []);

  useEffect(() => {
    fetchScores(true); // Initial fetch
    const intervalId = setInterval(() => fetchScores(false), 60000); // Refresh every 60 seconds
    return () => clearInterval(intervalId);
  }, [fetchScores]);

  const renderContent = () => {
    if (isLoading) {
      return (
        <div className="flex flex-col items-center justify-center text-center py-4">
          <LoaderIcon className="w-8 h-8 animate-spin text-green-500" />
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Fetching live scores...</p>
        </div>
      );
    }

    if (error) {
      return (
        <div className="text-center py-4">
          <p className="text-red-500 dark:text-red-400 text-sm">{error}</p>
        </div>
      );
    }

    if (scores.length === 0) {
      return (
        <div className="text-center py-4">
          <p className="text-gray-500 dark:text-gray-400">No live matches found right now.</p>
        </div>
      );
    }

    return (
      <div className="space-y-3">
        {scores.map((match) => (
          <div key={match.idEvent} className="text-sm border-b border-gray-200 dark:border-slate-700/50 pb-2 last:border-b-0 last:pb-0">
            <div className="flex justify-between items-center">
                <span className="font-semibold text-gray-700 dark:text-gray-300 truncate w-2/5">{match.strHomeTeam}</span>
                <span className="font-bold text-lg text-gray-900 dark:text-white">{match.intHomeScore ?? '0'} - {match.intAwayScore ?? '0'}</span>
                <span className="font-semibold text-gray-700 dark:text-gray-300 truncate w-2/5 text-right">{match.strAwayTeam}</span>
            </div>
            <p className="text-xs text-center text-green-600 dark:text-green-400 font-mono mt-1">{match.strStatus}</p>
          </div>
        ))}
      </div>
    );
  };

  return (
    <div className="bg-white dark:bg-slate-900/70 border border-gray-200 dark:border-slate-700 rounded-xl p-6">
      <div className="flex items-center justify-between mb-2">
        <h3 className="text-lg font-bold">Live Scores</h3>
        <button 
            onClick={() => fetchScores(true)} 
            disabled={isLoading}
            className="text-gray-500 dark:text-gray-400 hover:text-gray-900 dark:hover:text-white transition-colors disabled:text-gray-400 dark:disabled:text-gray-600 disabled:cursor-not-allowed"
            aria-label="Refresh live scores"
        >
          <RefreshIcon className={`w-5 h-5 ${isLoading ? 'animate-spin' : ''}`} />
        </button>
      </div>
      <p className="text-xs text-gray-400 dark:text-gray-500 mb-4 h-4">
        {lastUpdated && `Last updated: ${lastUpdated}`}
      </p>
      <div className="border-t border-gray-200 dark:border-slate-700 pt-4">
        {renderContent()}
        <p className="text-xs text-gray-500 dark:text-gray-600 mt-4 text-center">Live score data provided by TheSportsDB.</p>
      </div>
    </div>
  );
};

export default LiveScores;
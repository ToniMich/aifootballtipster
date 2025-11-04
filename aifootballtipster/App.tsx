import React, { useState, useCallback, useRef, useEffect } from 'react';
import type { PredictionData, GroundingChunk, Team } from './types';
import { getMatchPrediction } from './services/predictionService';
import { getTeamDetails } from './services/thesportsdbService';
import TeamInput from './components/TeamInput';
import BestBets from './components/BestBets';
import AnalystBreakdown from './components/AnalystBreakdown';
import PredictionFeedback from './components/PredictionFeedback';
import { LoaderIcon } from './components/icons/LoaderIcon';
import Header from './components/Header';
import Sidebar from './components/Sidebar';

interface GlobalAccuracy {
  wins: number;
  total: number;
}

const App: React.FC = () => {
  const [prediction, setPrediction] = useState<PredictionData | null>(null);
  const [analystBreakdown, setAnalystBreakdown] = useState<string>('');
  const [sources, setSources] = useState<GroundingChunk[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [currentTeams, setCurrentTeams] = useState<{ teamA: string, teamB: string } | null>(null);
  const [teamDetails, setTeamDetails] = useState<{ teamA: Team | null, teamB: Team | null }>({ teamA: null, teamB: null });
  const [globalAccuracy, setGlobalAccuracy] = useState<GlobalAccuracy>({ wins: 0, total: 0 });
  const [feedbackSubmitted, setFeedbackSubmitted] = useState<boolean>(false);
  
  const requestCancelled = useRef(false);
  const [theme, setTheme] = useState<'light' | 'dark'>('dark');

  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') as 'light' | 'dark' | null;
    setTheme(savedTheme || 'dark');

    const fetchAccuracy = async () => {
      try {
        const response = await fetch('/.netlify/functions/get-accuracy');
        if (!response.ok) {
          throw new Error('Failed to fetch accuracy data');
        }
        const data: GlobalAccuracy = await response.json();
        setGlobalAccuracy(data);
      } catch (err) {
        console.error("Could not fetch global accuracy:", err);
      }
    };

    fetchAccuracy();
  }, []);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');
    root.classList.add(theme);
    localStorage.setItem('theme', theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme(prevTheme => prevTheme === 'light' ? 'dark' : 'light');
  };
  
  const handlePrediction = useCallback(async (teamA: string, teamB: string, gender: 'Men' | 'Women') => {
    if (!teamA || !teamB) {
      setError("Please enter both team names.");
      return;
    }
    
    requestCancelled.current = false;
    setIsLoading(true);
    setError(null);
    setPrediction(null);
    setAnalystBreakdown('');
    setSources([]);
    setCurrentTeams({ teamA, teamB });
    setTeamDetails({ teamA: null, teamB: null });
    setFeedbackSubmitted(false); // Reset feedback state for new prediction

    try {
      // Asynchronously fetch team details, but don't block the prediction
      getTeamDetails(teamA).then(details => !requestCancelled.current && setTeamDetails(prev => ({...prev, teamA: details})));
      getTeamDetails(teamB).then(details => !requestCancelled.current && setTeamDetails(prev => ({...prev, teamB: details})));
      
      const predictionResult = await getMatchPrediction(teamA, teamB, gender);

      if (requestCancelled.current) return;

      if (predictionResult) {
        setPrediction(predictionResult.predictionData);
        setAnalystBreakdown(predictionResult.analystBreakdown);
        setSources(predictionResult.sources);
      } else {
        setError("Could not retrieve prediction. The model returned an empty response.");
      }
    } catch (err) {
      if (requestCancelled.current) return;
      console.error(err);
      setError(err instanceof Error ? err.message : "An unknown error occurred.");
    } finally {
      if (requestCancelled.current) return;
      setIsLoading(false);
    }
  }, []);

  const handleReset = useCallback(() => {
    requestCancelled.current = true;
    setIsLoading(false);
    setError(null);
    setPrediction(null);
    setAnalystBreakdown('');
    setSources([]);
    setCurrentTeams(null);
    setTeamDetails({ teamA: null, teamB: null });
    setFeedbackSubmitted(false);
  }, []);
  
  const handleFeedback = (wasCorrect: boolean) => {
    setFeedbackSubmitted(true);
    // In a real app, you might send this feedback to your server
  };

  return (
    <div className="min-h-screen bg-[#f0f4f0] text-gray-800 dark:bg-[#182c25] dark:text-gray-100 font-sans p-4 sm:p-6 lg:p-8 transition-colors duration-300">
      <div className="max-w-7xl mx-auto">
        <Header 
          winningPredictions={globalAccuracy.wins}
          totalPredictions={globalAccuracy.total}
          theme={theme} 
          toggleTheme={toggleTheme} 
        />

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-start">
          <main className="lg:col-span-2 space-y-8">
            <TeamInput onSubmit={handlePrediction} isLoading={isLoading} onReset={handleReset} />

            {isLoading && (
              <div className="flex flex-col items-center justify-center mt-12 text-center p-8 bg-white dark:bg-slate-900/70 rounded-xl border border-gray-200 dark:border-slate-700">
                <LoaderIcon className="w-16 h-16 animate-spin text-green-500" />
                <p className="mt-4 text-xl font-semibold">Analyzing Matchup...</p>
                <p className="text-gray-600 dark:text-gray-400">Using up-to-date data for {currentTeams?.teamA} vs {currentTeams?.teamB}.</p>
              </div>
            )}

            {error && (
              <div className="mt-12 text-center bg-red-100 dark:bg-red-900/50 border border-red-300 dark:border-red-700 p-6 rounded-lg">
                <h3 className="text-xl font-bold text-red-700 dark:text-red-400">An Error Occurred</h3>
                <p className="text-red-600 dark:text-red-300 mt-2">{error}</p>
              </div>
            )}

            {prediction && currentTeams && (
              <div className="space-y-8">
                <BestBets data={prediction} teams={currentTeams} teamDetails={teamDetails} />
                <AnalystBreakdown breakdown={analystBreakdown} sources={sources} />
                {!feedbackSubmitted && <PredictionFeedback onFeedback={handleFeedback} />}
              </div>
            )}
          </main>

          <aside className="hidden lg:block relative">
             <Sidebar />
          </aside>
        </div>
      </div>
    </div>
  );
};

export default App;

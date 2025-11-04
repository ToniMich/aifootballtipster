import React from 'react';
import { AppLogoIcon } from './icons/AppLogoIcon';
import { TargetIcon } from './icons/TargetIcon';
import { SunIcon } from './icons/SunIcon';
import { MoonIcon } from './icons/MoonIcon';

interface HeaderProps {
  totalPredictions: number;
  winningPredictions: number;
  theme: 'light' | 'dark';
  toggleTheme: () => void;
}

const Header: React.FC<HeaderProps> = ({ totalPredictions, winningPredictions, theme, toggleTheme }) => {
  const accuracy = totalPredictions > 0 ? (winningPredictions / totalPredictions) * 100 : 0;

  return (
    <header className="flex items-center justify-between py-4 mb-8">
      <div className="flex items-center gap-3">
        <AppLogoIcon className="w-8 h-8 text-green-500" />
        <h1 className="text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
          AI Football Tipster
        </h1>
      </div>
      <div className="flex items-center gap-4">
        <div 
          className="flex items-center gap-2 px-4 py-2 bg-white/80 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-lg"
          title="Global Daily Accuracy"
        >
          <TargetIcon className="w-5 h-5 text-green-500" />
          <div className="text-sm font-semibold">
            <span className="text-gray-500 dark:text-gray-400 hidden sm:inline">Accuracy: </span>
            <span className="text-gray-900 dark:text-white">{winningPredictions} / {totalPredictions}</span>
            <span className="text-gray-500 dark:text-gray-400"> = </span>
            <span className="text-gray-900 dark:text-white">{accuracy.toFixed(1)}%</span>
          </div>
        </div>
        <button 
          onClick={toggleTheme}
          className="p-2 bg-white/80 dark:bg-slate-800/50 border border-gray-200 dark:border-slate-700 rounded-lg hover:bg-gray-200/50 dark:hover:bg-slate-700/50 transition-colors"
          aria-label="Toggle theme"
        >
          {theme === 'light' ? <MoonIcon className="w-5 h-5 text-gray-800" /> : <SunIcon className="w-5 h-5 text-yellow-300" />}
        </button>
      </div>
    </header>
  );
};

export default Header;
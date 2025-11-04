import React from 'react';

interface OverUnderBetProps {
  title: string;
  line: number;
  overProbability: number;
}

const OverUnderBet: React.FC<OverUnderBetProps> = ({ title, line, overProbability }) => {
  const underProbability = 100 - overProbability;

  return (
    <div className="bg-white dark:bg-slate-900/70 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 text-center h-full flex flex-col justify-between">
      <div>
        <h4 className="text-lg font-bold mb-1 text-green-600">{title}</h4>
        <p className="text-sm text-gray-500 dark:text-gray-400 mb-4">Line: {line}</p>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
          <span className="font-semibold text-gray-800 dark:text-gray-200">Over {line}</span>
          <span className="font-bold text-lg text-green-600">{overProbability.toFixed(1)}%</span>
        </div>
        <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
          <span className="font-semibold text-gray-800 dark:text-gray-200">Under {line}</span>
          <span className="font-bold text-lg text-[#cc5500]">{underProbability.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
};

export default OverUnderBet;
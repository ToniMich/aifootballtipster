import React from 'react';

interface BooleanBetProps {
  title: string;
  yesProbability: number;
}

const BooleanBet: React.FC<BooleanBetProps> = ({ title, yesProbability }) => {
  const noProbability = 100 - yesProbability;

  return (
    <div className="bg-white dark:bg-slate-900/70 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 text-center h-full flex flex-col justify-between">
      <div>
        <h4 className="text-lg font-bold mb-4 text-green-600">{title}</h4>
      </div>
      <div className="space-y-3">
        <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
          <span className="font-semibold text-gray-800 dark:text-gray-200">Yes</span>
          <span className="font-bold text-lg text-green-600">{yesProbability.toFixed(1)}%</span>
        </div>
        <div className="flex justify-between items-center bg-gray-100 dark:bg-gray-700 p-3 rounded-lg">
          <span className="font-semibold text-gray-800 dark:text-gray-200">No</span>
          <span className="font-bold text-lg text-[#cc5500]">{noProbability.toFixed(1)}%</span>
        </div>
      </div>
    </div>
  );
};

export default BooleanBet;
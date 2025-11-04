import React from 'react';

interface ComboBetProps {
  title: string;
  value: string;
}

const ComboBet: React.FC<ComboBetProps> = ({ title, value }) => {
  return (
    <div className="bg-white dark:bg-slate-900/70 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 text-center flex flex-col justify-center h-full">
      <h4 className="text-lg font-bold mb-2 text-green-600">{title}</h4>
      <p className="text-xl font-semibold text-gray-900 dark:text-white">{value}</p>
    </div>
  );
};

export default ComboBet;
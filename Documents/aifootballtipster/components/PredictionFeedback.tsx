import React, { useState } from 'react';
import { ThumbsUpIcon } from './icons/ThumbsUpIcon';
import { ThumbsDownIcon } from './icons/ThumbsDownIcon';

interface PredictionFeedbackProps {
  onFeedback: (wasCorrect: boolean) => void;
}

const PredictionFeedback: React.FC<PredictionFeedbackProps> = ({ onFeedback }) => {
  const [feedbackSent, setFeedbackSent] = useState(false);

  const handleFeedback = (wasCorrect: boolean) => {
    setFeedbackSent(true);
    onFeedback(wasCorrect);
    // Here you would typically send this feedback to a server/analytics service
    console.log(`Feedback received: Prediction was a ${wasCorrect ? 'Win' : 'Loss'}`);
  };

  if (feedbackSent) {
    return (
      <div className="bg-white dark:bg-slate-900/70 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700 text-center">
        <p className="font-semibold text-green-600">Thank you for your feedback!</p>
      </div>
    );
  }

  return (
    <div className="bg-white dark:bg-slate-900/70 p-4 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700">
      <h4 className="text-md font-semibold text-center mb-3 text-gray-700 dark:text-gray-300">Did the prediction win?</h4>
      <div className="flex justify-center gap-4">
        <button
          onClick={() => handleFeedback(true)}
          className="flex items-center gap-2 px-6 py-2 bg-green-100 dark:bg-green-900/50 text-green-700 dark:text-green-300 font-bold rounded-lg hover:bg-green-200 dark:hover:bg-green-800/60 border border-green-200 dark:border-green-700 transition-all"
          aria-label="Prediction was a Win"
        >
          <ThumbsUpIcon className="w-5 h-5" />
          Win
        </button>
        <button
          onClick={() => handleFeedback(false)}
          className="flex items-center gap-2 px-6 py-2 bg-red-100 dark:bg-red-900/50 text-red-700 dark:text-red-300 font-bold rounded-lg hover:bg-red-200 dark:hover:bg-red-800/60 border border-red-200 dark:border-red-700 transition-all"
          aria-label="Prediction was a Loss"
        >
          <ThumbsDownIcon className="w-5 h-5" />
          Loss
        </button>
      </div>
    </div>
  );
};

export default PredictionFeedback;
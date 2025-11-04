import React from 'react';
import { LocationPinIcon } from './icons/LocationPinIcon';
import { PaypalIcon } from './icons/PaypalIcon';
import { XIcon } from './icons/XIcon';

const SupportProject: React.FC = () => {
  const paypalUrl = 'https://paypal.me/gizahhub';

  return (
    <div className="bg-white dark:bg-slate-900/70 border border-gray-200 dark:border-slate-700 rounded-xl p-6">
      <h3 className="flex items-center gap-2 text-lg font-bold mb-4">
        <LocationPinIcon className="w-5 h-5 text-red-500" />
        Support the Project
      </h3>
       <p className="text-sm text-gray-500 dark:text-gray-400 mb-4 text-center">
        If you find this tool helpful, consider supporting its development.
      </p>
      <div className="flex gap-4">
        <a 
          href={paypalUrl}
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 text-white font-bold rounded-lg transition-colors bg-blue-600 hover:bg-blue-500"
          title="Tip with PayPal"
        >
          <PaypalIcon className="w-5 h-5" />
          Tip with PayPal
        </a>
        <a 
          href="https://x.com/intent/tweet?text=Check%20out%20this%20AI%20Football%20Tipster%20for%20soccer%20predictions!&url=https://your-app-url.com" 
          target="_blank" 
          rel="noopener noreferrer" 
          className="flex-1 flex items-center justify-center gap-2 px-4 py-2 bg-sky-500 text-white font-bold rounded-lg hover:bg-sky-400 transition-colors"
        >
          <XIcon className="w-4 h-4" />
          Share on X
        </a>
      </div>
    </div>
  );
};

export default SupportProject;
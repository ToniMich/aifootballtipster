import React from 'react';
import type { GroundingChunk } from '../types';
import { marked } from 'marked';

interface AnalystBreakdownProps {
  breakdown: string;
  sources: GroundingChunk[];
}

const AnalystBreakdown: React.FC<AnalystBreakdownProps> = ({ breakdown, sources }) => {
  const htmlBreakdown = marked(breakdown);

  return (
    <section>
      <div className="bg-white dark:bg-slate-900/70 p-6 rounded-xl shadow-lg border border-gray-200 dark:border-slate-700">
        <h3 className="text-2xl font-bold mb-4 text-center">Analyst Breakdown</h3>
        <div 
          className="prose dark:prose-invert max-w-none prose-p:text-gray-600 dark:prose-p:text-gray-300 prose-headings:text-green-600 prose-strong:text-gray-900 dark:prose-strong:text-white"
          dangerouslySetInnerHTML={{ __html: htmlBreakdown }} 
        />
        
        {sources && sources.length > 0 && (
          <div className="mt-6 pt-4 border-t border-gray-200 dark:border-slate-700">
            <h4 className="text-lg font-semibold mb-2 text-gray-500 dark:text-gray-400">Sources:</h4>
            <ul className="list-disc list-inside space-y-1">
              {/* Fix: Added a check for source.web.uri to ensure href is not undefined. */}
              {sources.map((source, index) => source.web && source.web.uri && (
                <li key={index}>
                  <a 
                    href={source.web.uri} 
                    target="_blank" 
                    rel="noopener noreferrer"
                    className="text-blue-500 dark:text-blue-400 hover:text-blue-700 dark:hover:text-blue-300 hover:underline"
                  >
                    {source.web.title || source.web.uri}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
      </div>
    </section>
  );
};

export default AnalystBreakdown;
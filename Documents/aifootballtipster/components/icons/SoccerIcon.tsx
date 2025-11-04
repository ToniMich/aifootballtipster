import React from 'react';

export const SoccerIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round" 
    {...props}
  >
    <circle cx="12" cy="12" r="10" />
    <polygon points="12 2 15.09 8.26 22 9.27 17 14.14 18.18 21.02 12 17.77 5.82 21.02 7 14.14 2 9.27 8.91 8.26 12 2" />
    <line x1="12" y1="22" x2="12" y2="17.77" />
    <line x1="22" y1="9.27" x2="17" y2="14.14" />
    <line x1="2" y1="9.27" x2="7" y2="14.14" />
    <line x1="15.09" y1="8.26" x2="12" y2="2" />
    <line x1="8.91" y1="8.26" x2="12" y2="2" />
    <line x1="18.18" y1="21.02" x2="12" y2="17.77" />
    <line x1="5.82" y1="21.02" x2="12" y2="17.77" />
  </svg>
);
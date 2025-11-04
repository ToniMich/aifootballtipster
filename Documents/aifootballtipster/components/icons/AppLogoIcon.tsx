import React from 'react';

export const AppLogoIcon: React.FC<React.SVGProps<SVGSVGElement>> = (props) => (
  <svg 
    viewBox="0 0 24 24" 
    fill="currentColor"
    xmlns="http://www.w3.org/2000/svg"
    {...props}
  >
    <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2zm-1 15.59L7.41 14H10v-4H7.41L11 6.41V10h2v4h2.59L13 17.59V14h-2v3.59z" />
    <path d="M11 10.41L7.41 14H10v-4z" opacity="0.3" />
    <path d="M13 13.59L16.59 10H14v4z" opacity="0.3" />
  </svg>
);
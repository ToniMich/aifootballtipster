import React from 'react';
import LiveScores from './LiveScores';
import SupportProject from './SupportProject';

const Sidebar: React.FC = () => {
  return (
    <div className="sticky top-8 space-y-8">
      <LiveScores />
      <SupportProject />
    </div>
  );
};

export default Sidebar;
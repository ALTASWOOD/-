
import React from 'react';

export const Logo: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 100 100" className={className} fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M10 50C10 50 25 20 50 20C75 20 90 50 90 50C90 50 75 80 50 80C25 80 10 50 10 50Z" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round"/>
    <circle cx="50" cy="50" r="15" fill="currentColor" fillOpacity="0.2" stroke="currentColor" strokeWidth="2"/>
    <circle cx="50" cy="50" r="4" fill="currentColor"/>
    <circle cx="50" cy="50" r="25" stroke="currentColor" strokeWidth="1" strokeDasharray="4 4" className="animate-[spin_10s_linear_infinite] origin-center"/>
    <circle cx="70" cy="40" r="2" fill="currentColor" className="animate-pulse"/>
  </svg>
);

export const PlanetIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <circle cx="12" cy="12" r="8" />
    <path d="M2 12h20" />
    <path d="M12 2v20" />
    <path d="M4.93 4.93l14.14 14.14" />
    <path d="M19.07 4.93L4.93 19.07" />
  </svg>
);

export const ProbeIcon: React.FC<{ className?: string }> = ({ className }) => (
  <svg viewBox="0 0 24 24" className={className} fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 2l4 4-4 4-4-4 4-4zM12 10v12M12 22l-4-4M12 22l4-4" />
    <path d="M4 14l3-3 3 3-3 3-3-3zM14 14l3-3 3 3-3 3-3-3z" />
  </svg>
);

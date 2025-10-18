import React from 'react';

const ThumbsDownIcon: React.FC<{ className?: string }> = ({ className }) => (
    <svg 
        xmlns="http://www.w3.org/2000/svg" 
        viewBox="0 0 24 24" 
        fill="none" 
        stroke="currentColor" 
        strokeWidth="2" 
        strokeLinecap="round" 
        strokeLinejoin="round" 
        className={className}
    >
        <path d="M7 14V2" />
        <path d="M18 14v5c0 1.7-1.3 3-3 3s-3-1.3-3-3v-7 2c0 1.7-1.3 3-3 3" />
        <path d="M18 14h3.5c.8 0 1.5-.7 1.5-1.5v-1.1c0-.8-.5-1.4-1.2-1.4H18" />
    </svg>
);

export default ThumbsDownIcon;

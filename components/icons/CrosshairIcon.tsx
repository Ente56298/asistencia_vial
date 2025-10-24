
import React from 'react';

const CrosshairIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <circle cx="12" cy="12" r="10" />
        <path d="M22 12h-4" />
        <path d="M6 12H2" />
        <path d="M12 6V2" />
        <path d="M12 22v-4" />
    </svg>
);

export default CrosshairIcon;
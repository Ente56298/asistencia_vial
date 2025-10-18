import React from 'react';

const WeatherIcon: React.FC = () => (
    <svg xmlns="http://www.w3.org/2000/svg" className="h-full w-full" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
        <path d="M22 17a5 5 0 0 0-10 0"></path>
        <path d="M16 7a3 3 0 0 0-3-3 3 3 0 0 0-3 3"></path>
        <path d="M12 2v2"></path>
        <path d="M5.2 6.2l1.4 1.4"></path>
        <path d="M2 13h2"></path>
        <path d="M5.2 19.8l1.4-1.4"></path>
        <path d="M12 22v-2"></path>
        <path d="M18.8 19.8l-1.4-1.4"></path>
        <path d="M22 13h-2"></path>
        <path d="M18.8 6.2l-1.4 1.4"></path>
    </svg>
);

export default WeatherIcon;
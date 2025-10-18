import React, { useMemo } from 'react';
import { Service, LocationCoords } from '../types';
import RouteIcon from './icons/RouteIcon';

interface SavedRoutePanelProps {
    routePoints: Service[];
    startLocation: LocationCoords;
    onClearRoute: () => void;
    summary: { duration: number; distance: number } | null;
}

// Helper to format distance from meters to a readable string like "15.2 km"
function formatDistance(meters: number): string {
    if (meters < 1000) {
        return `${Math.round(meters)} m`;
    }
    return `${(meters / 1000).toFixed(1)} km`;
}

// Helper to format time from seconds to a readable string like "1h 15min"
function formatTime(seconds: number): string {
    if (seconds < 60) return "< 1 min";
    const hours = Math.floor(seconds / 3600);
    const minutes = Math.round((seconds % 3600) / 60);
    
    let result = '';
    if (hours > 0) {
        result += `${hours}h `;
    }
    if (minutes > 0 || hours === 0) {
        result += `${minutes}min`;
    }
    return result.trim();
}

const SavedRoutePanel: React.FC<SavedRoutePanelProps> = ({ routePoints, startLocation, onClearRoute, summary }) => {
    
    const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
        const button = e.currentTarget;
        const rect = button.getBoundingClientRect();
        const circle = document.createElement('span');
        const diameter = Math.max(button.clientWidth, button.clientHeight);
        const radius = diameter / 2;

        circle.style.width = circle.style.height = `${diameter}px`;
        circle.style.left = `${e.clientX - rect.left - radius}px`;
        circle.style.top = `${e.clientY - rect.top - radius}px`;
        circle.classList.add('ripple');

        const existingRipple = button.querySelector('.ripple');
        if (existingRipple) {
            existingRipple.remove();
        }

        button.appendChild(circle);

        setTimeout(() => {
            circle.remove();
        }, 600);
    };

    const routeSummary = useMemo(() => {
        if (!summary) {
            return {
                totalStops: routePoints.length,
                estimatedTime: 'Calculando...',
                totalDistance: 'Calculando...'
            };
        }
        
        return {
            totalStops: routePoints.length,
            estimatedTime: formatTime(summary.duration),
            totalDistance: formatDistance(summary.distance),
        };

    }, [routePoints, summary]);

    return (
        <div className="fixed bottom-4 right-4 z-30 w-full max-w-xs bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-xl shadow-2xl animate-fade-in-down">
             <header className="p-3 border-b border-gray-700 flex justify-between items-center">
                <h3 className="text-md font-bold text-green-400 flex items-center gap-2">
                    <div className="w-5 h-5"><RouteIcon/></div>
                    Mi Ruta
                </h3>
                <button 
                    onClick={onClearRoute} 
                    onMouseDown={handleMouseDown}
                    className="text-xs text-red-400 hover:text-red-300 font-semibold ripple-effect"
                    aria-label="Limpiar ruta"
                >
                    Limpiar
                </button>
            </header>
            <main className="p-3 max-h-48 overflow-y-auto">
                <ol className="list-decimal list-inside space-y-2 text-sm text-gray-200">
                    <li key="start" className="font-semibold text-gray-400">Mi Ubicación (Inicio)</li>
                    {routePoints.map((point, index) => (
                        <li key={`${point.latitud}-${index}`}>{point.nombre}</li>
                    ))}
                </ol>
            </main>
            <footer className="p-3 border-t border-gray-700 text-xs text-gray-400 space-y-1">
                <div className="flex justify-between">
                    <span>Paradas: <span className="font-bold text-white">{routeSummary.totalStops}</span></span>
                    <span>Tiempo est: <span className="font-bold text-white">{routeSummary.estimatedTime}</span></span>
                </div>
                 <div className="flex justify-between">
                    <span>Distancia Total: <span className="font-bold text-white">{routeSummary.totalDistance}</span></span>
                </div>
            </footer>
        </div>
    );
};

export default SavedRoutePanel;

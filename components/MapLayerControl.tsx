import React from 'react';
import FireIcon from './icons/FireIcon';
import GasStationIcon from './icons/GasStationIcon';

interface MapLayerControlProps {
    showHeatmap: boolean;
    showServices: boolean;
    onToggleHeatmap: () => void;
    onToggleServices: () => void;
    onClose: () => void;
}

const ToggleSwitch: React.FC<{ isEnabled: boolean; onToggle: () => void }> = ({ isEnabled, onToggle }) => {
    return (
        <button
            onClick={onToggle}
            className={`relative inline-flex items-center h-6 rounded-full w-11 transition-colors duration-300 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-800 focus:ring-amber-500 ${
                isEnabled ? 'bg-amber-500' : 'bg-gray-600'
            }`}
        >
            <span
                className={`inline-block w-4 h-4 transform bg-white rounded-full transition-transform duration-300 ${
                    isEnabled ? 'translate-x-6' : 'translate-x-1'
                }`}
            />
        </button>
    );
};


const MapLayerControl: React.FC<MapLayerControlProps> = ({ showHeatmap, showServices, onToggleHeatmap, onToggleServices, onClose }) => {
    
    const handleMouseDown = (e: React.MouseEvent<HTMLButtonElement>) => {
        const button = e.currentTarget;
        // Simple ripple for the close button
        if (button.classList.contains('close-button')) {
            const circle = document.createElement('span');
            const diameter = Math.max(button.clientWidth, button.clientHeight);
            const radius = diameter / 2;
            const rect = button.getBoundingClientRect();
            circle.style.width = circle.style.height = `${diameter}px`;
            circle.style.left = `${e.clientX - rect.left - radius}px`;
            circle.style.top = `${e.clientY - rect.top - radius}px`;
            circle.classList.add('ripple');
            const existingRipple = button.querySelector('.ripple');
            if (existingRipple) existingRipple.remove();
            button.appendChild(circle);
            setTimeout(() => circle.remove(), 600);
        }
    };
    
    return (
        <div className="fixed top-24 right-20 z-30 w-full max-w-xs bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-xl shadow-2xl animate-fade-in-down">
            <header className="p-3 border-b border-gray-700 flex justify-between items-center">
                <h3 className="text-md font-bold text-amber-400">Control de Capas</h3>
                 <button 
                    onClick={onClose} 
                    onMouseDown={handleMouseDown}
                    className="close-button bg-gray-700 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-gray-600 transition-colors ripple-effect text-xl"
                    aria-label="Cerrar control de capas"
                >
                    &times;
                </button>
            </header>
            <main className="p-4 space-y-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 text-red-400"><FireIcon /></div>
                        <span className="font-semibold text-gray-200">Zonas de Riesgo</span>
                    </div>
                    <ToggleSwitch isEnabled={showHeatmap} onToggle={onToggleHeatmap} />
                </div>
                 <div className="flex justify-between items-center">
                    <div className="flex items-center gap-3">
                        <div className="w-6 h-6 text-indigo-400"><GasStationIcon /></div>
                        <span className="font-semibold text-gray-200">Servicios Cercanos</span>
                    </div>
                    <ToggleSwitch isEnabled={showServices} onToggle={onToggleServices} />
                </div>
            </main>
        </div>
    );
};

export default MapLayerControl;
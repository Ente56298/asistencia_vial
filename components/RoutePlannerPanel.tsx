
import React, { useState } from 'react';
import SpinnerIcon from './icons/SpinnerIcon';

interface RoutePlannerPanelProps {
    onClose: () => void;
}

const RoutePlannerPanel: React.FC<RoutePlannerPanelProps> = ({ onClose }) => {
    const [origin, setOrigin] = useState('');
    const [destination, setDestination] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [route, setRoute] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError(null);
        setRoute(null);

        // Mock API call to simulate route planning
        setTimeout(() => {
            if (origin && destination) {
                setRoute(`Ruta optimizada de ${origin} a ${destination}:\n- Tomar Av. Insurgentes Sur.\n- Incorporarse a Viaducto Tlalpan.\n- Seguir las señales hacia la Autopista del Sol.\n- Tiempo estimado: 2h 30min.`);
            } else {
                setError("Por favor, ingrese un origen y un destino.");
            }
            setIsLoading(false);
        }, 1500);
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-40 p-4">
            <div className="relative w-full max-w-2xl h-[90vh] bg-gray-900/80 border border-green-500/30 rounded-2xl shadow-2xl flex flex-col">
                <header className="p-4 border-b border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-green-400">Planificador de Ruta Inteligente</h2>
                    <button onClick={onClose} className="bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600 transition-colors">&times;</button>
                </header>

                <div className="p-6 flex-grow overflow-y-auto">
                    {isLoading && <div className="flex justify-center items-center h-full"><SpinnerIcon className="w-12 h-12" /></div>}
                    {error && <div className="text-center text-red-400 p-4 bg-red-900/50 rounded-lg">{error}</div>}
                    {route && (
                        <div className="bg-gray-800 p-4 rounded-lg">
                            <h3 className="font-bold text-green-400 mb-2">Instrucciones de Ruta</h3>
                            <p className="text-gray-200 whitespace-pre-wrap">{route}</p>
                        </div>
                    )}
                </div>

                <footer className="p-4 border-t border-gray-700 bg-gray-900/50">
                    <form onSubmit={handleSubmit} className="space-y-3">
                        <div>
                            <label htmlFor="origin" className="text-sm font-medium text-gray-300 block mb-1">Origen</label>
                             <input 
                                id="origin"
                                type="text"
                                value={origin}
                                onChange={(e) => setOrigin(e.target.value)}
                                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-green-500 focus:border-green-500"
                                placeholder="Ej: Ángel de la Independencia, CDMX"
                            />
                        </div>
                        <div>
                            <label htmlFor="destination" className="text-sm font-medium text-gray-300 block mb-1">Destino</label>
                             <input 
                                id="destination"
                                type="text"
                                value={destination}
                                onChange={(e) => setDestination(e.target.value)}
                                className="w-full bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-green-500 focus:border-green-500"
                                placeholder="Ej: Pirámides de Teotihuacán"
                            />
                        </div>
                        <button type="submit" className="w-full bg-green-500 text-gray-900 font-bold py-2 px-4 rounded-md hover:bg-green-400 disabled:bg-green-800" disabled={isLoading}>
                            {isLoading ? 'Calculando...' : 'Planificar Ruta'}
                        </button>
                    </form>
                </footer>
            </div>
        </div>
    );
};

export default RoutePlannerPanel;

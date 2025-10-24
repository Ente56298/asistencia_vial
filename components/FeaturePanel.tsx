
import React, { useState, useEffect } from 'react';
// FIX: Changed Part to VehiclePart to use the specific type for vehicle parts.
import { Feature, LocationCoords, VehiclePart, Service, TrafficReport, WeatherReport } from '../types';
import { findParts, getTrafficReport, findServices, getWeatherReport } from '../services/geminiService';
import SpinnerIcon from './icons/SpinnerIcon';
import WrenchIcon from './icons/WrenchIcon';
import TrafficIcon from './icons/TrafficIcon';
import GasStationIcon from './icons/GasStationIcon';
import WeatherIcon from './icons/WeatherIcon';

interface FeaturePanelProps {
    feature: Feature;
    onClose: () => void;
    isLoading: boolean;
    setIsLoading: React.Dispatch<React.SetStateAction<boolean>>;
    error: string | null;
    setError: React.Dispatch<React.SetStateAction<string | null>>;
    results: any;
    setResults: React.Dispatch<React.SetStateAction<any>>;
    currentLocation: LocationCoords | null;
    onAlert: (alert: { type: 'traffic' | 'weather', message: string }) => void;
}

const featureConfig = {
    [Feature.Parts]: {
        title: "Buscar Refacciones",
        icon: <WrenchIcon />,
        color: "slate",
        prompt: "Describe la refacción que necesitas (ej. 'balatas para Tsuru 2010')."
    },
    [Feature.Traffic]: {
        title: "Reporte de Tráfico",
        icon: <TrafficIcon />,
        color: "orange",
        prompt: "Ingresa una ubicación para el reporte (ej. 'Periférico a la altura de San Antonio')."
    },
    [Feature.Weather]: {
        title: "Reporte de Clima",
        icon: <WeatherIcon />,
        color: "blue",
        prompt: "Ingresa una ubicación para el reporte del clima."
    },
    [Feature.Services]: {
        title: "Buscar Servicios Cercanos",
        icon: <GasStationIcon />,
        color: "indigo",
        prompt: "Ej. 'gasolinera', 'taller mecánico', 'hospital'"
    }
};

const FeaturePanel: React.FC<FeaturePanelProps> = ({
    feature,
    onClose,
    isLoading,
    setIsLoading,
    error,
    setError,
    results,
    setResults,
    currentLocation,
    onAlert
}) => {
    const [query, setQuery] = useState('');
    const [radius, setRadius] = useState(5); // Default radius of 5km for services
    const config = featureConfig[feature as keyof typeof featureConfig];

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

    useEffect(() => {
        if ((feature === Feature.Traffic || feature === Feature.Weather) && !query && currentLocation) {
            // Pre-fill traffic query with a generic "current location" text if location is available
            setQuery("mi ubicación actual");
        }
    }, [feature, currentLocation, query]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!query.trim()) return;
        
        setIsLoading(true);
        setError(null);
        setResults(null);

        try {
            let response: any;
            const locationStr = currentLocation ? `lat: ${currentLocation.lat}, lon: ${currentLocation.lon}` : 'Ciudad de México';
            const locationQuery = query === 'mi ubicación actual' ? locationStr : query;
            
            switch (feature) {
                case Feature.Parts:
                    response = await findParts(query);
                    break;
                case Feature.Traffic:
                    response = await getTrafficReport(locationQuery);
                    if (response.alerta_critica) {
                        onAlert({ type: 'traffic', message: response.alerta_critica });
                    }
                    break;
                case Feature.Weather:
                    response = await getWeatherReport(locationQuery);
                    if (response.alerta_critica) {
                        onAlert({ type: 'weather', message: response.alerta_critica });
                    }
                    break;
                case Feature.Services:
                    response = await findServices(query, locationStr, radius);
                    break;
                default:
                    throw new Error("Característica no soportada");
            }
            setResults(response);
        } catch (err: any) {
            setError(err.message || 'Ocurrió un error al procesar la solicitud.');
        } finally {
            setIsLoading(false);
        }
    };

    const renderResults = () => {
        if (!results) return null;

        switch (feature) {
            case Feature.Parts:
                return (
                    <div className="space-y-3">
                        {/* FIX: Cast results to VehiclePart[] to match the updated type. */}
                        {(results as VehiclePart[]).map((part, index) => (
                            <div key={index} className="bg-gray-800 p-4 rounded-lg">
                                <h4 className="font-bold text-white">{part.nombre}</h4>
                                <p className="text-sm text-gray-300 mt-1">{part.descripcion}</p>
                                <div className="text-xs mt-2 flex justify-between items-center">
                                    <span className="text-gray-400">Proveedor: {part.proveedor_sugerido}</span>
                                    <span className="font-semibold text-amber-400">${part.precio_estimado.toFixed(2)} MXN</span>
                                </div>
                            </div>
                        ))}
                    </div>
                );
            case Feature.Traffic:
                const report = results as TrafficReport;
                return (
                    <div className="space-y-4 bg-gray-800 p-4 rounded-lg">
                        <div>
                            <h4 className="font-bold text-white">Resumen del Tráfico</h4>
                            <p className="text-sm text-gray-300 mt-1">{report.resumen}</p>
                        </div>
                        {report.incidentes && report.incidentes.length > 0 && (
                             <div>
                                <h4 className="font-bold text-white">Incidentes</h4>
                                <ul className="list-disc list-inside text-sm text-gray-300 mt-1 space-y-1">
                                    {report.incidentes.map((inc, i) => <li key={i}>{inc}</li>)}
                                </ul>
                            </div>
                        )}
                        {report.rutas_alternas && report.rutas_alternas.length > 0 && (
                             <div>
                                <h4 className="font-bold text-white">Rutas Alternas</h4>
                                <ul className="list-disc list-inside text-sm text-gray-300 mt-1 space-y-1">
                                    {report.rutas_alternas.map((ruta, i) => <li key={i}>{ruta}</li>)}
                                </ul>
                            </div>
                        )}
                    </div>
                );
            case Feature.Weather:
                const weatherReport = results as WeatherReport;
                return (
                    <div className="space-y-4 bg-gray-800 p-4 rounded-lg">
                        <div>
                            <h4 className="font-bold text-white">Clima Actual</h4>
                            <p className="text-3xl font-bold text-blue-300 mt-1">{weatherReport.temperatura_celsius}°C</p>
                            <p className="text-lg text-gray-300">{weatherReport.condiciones}</p>
                        </div>
                         <div>
                            <h4 className="font-bold text-white mt-2">Resumen</h4>
                            <p className="text-sm text-gray-300 mt-1">{weatherReport.resumen}</p>
                        </div>
                    </div>
                );
            case Feature.Services:
                 return (
                    <div className="space-y-3">
                        {(results as Service[]).map((service, index) => (
                            <div key={index} className="bg-gray-800 p-4 rounded-lg">
                                <h4 className="font-bold text-white">{service.nombre}</h4>
                                <p className="text-sm text-gray-300 mt-1">Tipo: {service.tipo}</p>
                                <p className="text-sm text-gray-300">Ubicación: {service.ubicacion_aproximada}</p>
                                {service.telefono && <p className="text-sm text-gray-300">Teléfono: {service.telefono}</p>}
                            </div>
                        ))}
                    </div>
                );
            default:
                return null;
        }
    };
    
    if (!config) return null;

    const colorClasses = {
        slate: { border: 'border-slate-500/30', text: 'text-slate-400', ring: 'focus:ring-slate-500 focus:border-slate-500', button: 'bg-slate-500 hover:bg-slate-400 disabled:bg-slate-800' },
        orange: { border: 'border-orange-500/30', text: 'text-orange-400', ring: 'focus:ring-orange-500 focus:border-orange-500', button: 'bg-orange-500 hover:bg-orange-400 disabled:bg-orange-800' },
        blue: { border: 'border-blue-500/30', text: 'text-blue-400', ring: 'focus:ring-blue-500 focus:border-blue-500', button: 'bg-blue-500 hover:bg-blue-400 disabled:bg-blue-800' },
        indigo: { border: 'border-indigo-500/30', text: 'text-indigo-400', ring: 'focus:ring-indigo-500 focus:border-indigo-500', button: 'bg-indigo-500 hover:bg-indigo-400 disabled:bg-indigo-800' },
    };

    const colors = colorClasses[config.color as keyof typeof colorClasses];

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-40 p-4">
            <div className={`relative w-full max-w-2xl h-[90vh] bg-gray-900/80 border ${colors.border} rounded-2xl shadow-2xl flex flex-col`}>
                <header className="p-4 border-b border-gray-700 flex justify-between items-center">
                    <h2 className={`text-xl font-bold ${colors.text} flex items-center`}>
                        <div className="w-6 h-6 mr-3">{config.icon}</div>
                        {config.title}
                    </h2>
                    <button onClick={onClose} onMouseDown={handleMouseDown} className="bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600 transition-colors ripple-effect">&times;</button>
                </header>

                <main className="p-6 flex-grow overflow-y-auto">
                    {isLoading && <div className="flex justify-center items-center h-full"><SpinnerIcon className="w-12 h-12" /></div>}
                    {error && <div className="text-center text-red-400 p-4 bg-red-900/50 rounded-lg">{error}</div>}
                    {results && renderResults()}
                </main>

                <footer className="p-4 border-t border-gray-700 bg-gray-900/50">
                    <form onSubmit={handleSubmit} className="space-y-3">
                         <div className="flex flex-col sm:flex-row gap-2">
                            <input 
                                type="text"
                                value={query}
                                onChange={(e) => setQuery(e.target.value)}
                                className={`flex-grow bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white ${colors.ring}`}
                                placeholder={config.prompt}
                                disabled={isLoading}
                            />
                            <button type="submit" onMouseDown={handleMouseDown} className={`text-white font-bold py-2 px-4 rounded-md ${colors.button} ripple-effect`} disabled={isLoading || !query.trim()}>
                                {isLoading ? '...' : 'Buscar'}
                            </button>
                        </div>
                        
                        {feature === Feature.Services && (
                            <div className="pt-2">
                                <div className="flex items-center gap-4 px-1">
                                    <label htmlFor="radius-slider" className="text-sm font-medium text-gray-300 whitespace-nowrap">
                                        Radio: <span className="font-bold text-white">{radius} km</span>
                                    </label>
                                    <input
                                        id="radius-slider"
                                        type="range"
                                        min="1"
                                        max="50"
                                        step="1"
                                        value={radius}
                                        onChange={(e) => setRadius(Number(e.target.value))}
                                        className="w-full h-2 bg-gray-600 rounded-lg appearance-none cursor-pointer"
                                        disabled={isLoading}
                                    />
                                </div>
                                <p className="text-xs text-center text-gray-400 pt-3">
                                    La búsqueda se realizará cerca de tu ubicación actual detectada.
                                </p>
                            </div>
                        )}
                    </form>
                </footer>
            </div>
        </div>
    );
};

export default FeaturePanel;

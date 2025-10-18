import React, { useState, useEffect, useRef } from 'react';
import { LocationCoords, AssistanceUnit } from '../types';
import { getRoute } from '../services/mapService';
import SpinnerIcon from './icons/SpinnerIcon';

declare var mapboxgl: any;

// Helper to format time from seconds to a readable string
function formatTime(seconds: number): string {
    if (seconds <= 0) return 'Llegando...';
    if (seconds < 60) return "< 1 min";
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.round(seconds % 60);
    return `${minutes} min ${remainingSeconds}s`;
}

interface AssistanceMonitoringPanelProps {
    userLocation: LocationCoords;
    onComplete: () => void;
}

const AssistanceMonitoringPanel: React.FC<AssistanceMonitoringPanelProps> = ({ userLocation, onComplete }) => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<any | null>(null);
    const unitMarkerRef = useRef<any | null>(null);

    const [unit, setUnit] = useState<AssistanceUnit | null>(null);
    const [eta, setEta] = useState<number | null>(null);
    const [route, setRoute] = useState<any | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [statusMessage, setStatusMessage] = useState('Contactando unidad de asistencia...');

    const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;

    useEffect(() => {
        // 1. Setup mock unit and its starting location
        const mockUnit: AssistanceUnit = {
            id: 'GN-1234',
            type: 'Guardia Nacional - Proximidad',
            operator: 'Oficial R. Martinez',
            plate: 'GN-123-45',
        };
        setUnit(mockUnit);
        
        // Generate a random starting point ~5-10km away
        const startLat = userLocation.lat + (Math.random() - 0.5) * 0.1;
        const startLon = userLocation.lon + (Math.random() - 0.5) * 0.1;
        const startLocation: LocationCoords = { lat: startLat, lon: startLon };

        // 2. Fetch route
        const fetchRoute = async () => {
            try {
                if (!userLocation) return;
                setStatusMessage('Calculando ruta de la unidad...');
                const routeData = await getRoute([startLocation, userLocation]);
                if (routeData) {
                    setRoute(routeData.geometry);
                    setEta(routeData.duration);
                    setIsLoading(false);
                } else {
                    throw new Error('No se pudo calcular la ruta.');
                }
            } catch (error) {
                console.error(error);
                setStatusMessage('Error al obtener la ruta. No se puede iniciar el monitoreo.');
                setIsLoading(false);
            }
        };

        fetchRoute();
    }, [userLocation]);

    // Map Initialization and Simulation Effect
    useEffect(() => {
        if (isLoading || !route || !mapContainerRef.current || mapRef.current || !MAPBOX_TOKEN || !eta) return;

        mapboxgl.accessToken = MAPBOX_TOKEN;
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/navigation-night-v1',
            center: [userLocation.lon, userLocation.lat],
            zoom: 12,
        });

        mapRef.current = map;

        map.on('load', () => {
            // Draw route line
            map.addSource('assistance-route', { type: 'geojson', data: { type: 'Feature', geometry: route } });
            map.addLayer({
                id: 'assistance-route-layer',
                type: 'line',
                source: 'assistance-route',
                layout: { 'line-join': 'round', 'line-cap': 'round' },
                paint: { 'line-color': '#2563eb', 'line-width': 7, 'line-opacity': 0.8, 'line-dasharray': [0, 2] },
            });
            
            // Add user marker
            const userEl = document.createElement('div');
            userEl.className = 'user-location-marker';
            new mapboxgl.Marker(userEl).setLngLat([userLocation.lon, userLocation.lat]).addTo(map);

            // Add unit marker
            const unitEl = document.createElement('div');
            unitEl.className = 'assistance-vehicle-marker';
            const towTruckSVG = `<svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M2 17h11"/><path d="M11 17l2 2"/><path d="M18 17l2-2"/><path d="M22 15V8h-2.2"/><path d="M17 8h-4.8"/><path d="M15 8l-3-3H9L6 8"/><path d="M2 8h4"/><path d="M19 12H5"/><circle cx="5" cy="17" r="2"/><circle cx="15" cy="17" r="2"/></svg>`;
            unitEl.innerHTML = towTruckSVG;

            const routeCoords = route.coordinates;
            unitMarkerRef.current = new mapboxgl.Marker(unitEl).setLngLat(routeCoords[0]).addTo(map);

            // Fit map to bounds
            const bounds = new mapboxgl.LngLatBounds(routeCoords[0], routeCoords[0]);
            bounds.extend([userLocation.lon, userLocation.lat]);
            routeCoords.forEach((coord: number[]) => bounds.extend(coord));
            map.fitBounds(bounds, { padding: 80, duration: 1000 });
            
            // Start simulation
            setStatusMessage('Unidad en camino...');
            const totalSteps = routeCoords.length;
            const initialDuration = eta;
            let currentStep = 0;
            const intervalTime = (initialDuration / totalSteps) * 1000;
            
            const simulationInterval = setInterval(() => {
                currentStep++;
                if (currentStep >= totalSteps) {
                    clearInterval(simulationInterval);
                    setEta(0);
                    setStatusMessage('La unidad ha llegado a tu ubicación.');
                    return;
                }
                
                const nextCoord = routeCoords[currentStep];
                if(unitMarkerRef.current) {
                    unitMarkerRef.current.setLngLat(nextCoord);
                }
                
                // Update ETA
                const progress = currentStep / totalSteps;
                setEta(initialDuration * (1 - progress));

            }, intervalTime);
            
            return () => clearInterval(simulationInterval);
        });
        
        return () => {
            if (mapRef.current) {
                 mapRef.current.remove();
                 mapRef.current = null;
            }
        };

    }, [isLoading, route, userLocation, MAPBOX_TOKEN, eta]);

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

    return (
        <div className="fixed inset-0 bg-black/90 z-50 flex flex-col items-center justify-end sm:justify-center">
            <div ref={mapContainerRef} className="absolute inset-0 z-0"></div>
            
            <div className="relative z-10 w-full max-w-md bg-gray-900/80 backdrop-blur-md border border-gray-700 rounded-t-2xl sm:rounded-2xl shadow-2xl m-0 sm:m-4">
                <header className="p-4 border-b border-gray-700">
                    <h2 className="text-xl font-bold text-white text-center">Monitoreo de Asistencia</h2>
                </header>
                <main className="p-4 space-y-3">
                    {isLoading ? (
                        <div className="flex flex-col items-center justify-center text-white p-4">
                            <SpinnerIcon className="w-8 h-8 mb-2" />
                            <p>{statusMessage}</p>
                        </div>
                    ) : (
                        <>
                            <div>
                                <p className="text-sm text-gray-400">Tiempo estimado de llegada</p>
                                <p className="text-4xl font-bold text-amber-400">
                                    {eta !== null ? formatTime(eta) : '--:--'}
                                </p>
                                <p className="text-sm text-green-400 font-semibold h-5">{statusMessage}</p>
                            </div>
                            <div className="border-t border-gray-700 pt-3">
                                <p className="text-sm text-gray-400">Unidad en camino</p>
                                <p className="font-semibold text-white">{unit?.type}</p>
                                <p className="text-sm text-gray-300">Operador: {unit?.operator} | Placas: {unit?.plate}</p>
                            </div>
                        </>
                    )}
                </main>
                <footer className="p-4 border-t border-gray-700">
                     <button
                        onClick={onComplete}
                        onMouseDown={handleMouseDown}
                        className="w-full bg-red-600 text-white font-bold py-3 px-4 rounded-md hover:bg-red-500 transition-colors ripple-effect disabled:bg-red-800"
                        disabled={isLoading}
                    >
                        {eta !== null && eta <= 0 ? 'Finalizar' : 'Cancelar Asistencia'}
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default AssistanceMonitoringPanel;
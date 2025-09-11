import React, { useRef, useEffect, useState } from 'react';
import { LocationCoords } from '../types';
import { useMapMarkers } from '../hooks/useMapMarkers';
import { useTravelHistory } from '../hooks/useTravelHistory';
import { useRecentLocations } from '../hooks/useRecentLocations';

declare var mapboxgl: any;

interface MapProps {
    location: LocationCoords | null;
    error: string | null;
    showRoute?: { start: { lat: number; lng: number }; end: { lat: number; lng: number } };
    services?: Array<{ id: string; name: string; lat: number; lng: number; type: string; address?: string; phone?: string }>;
}

const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;

const Map: React.FC<MapProps> = ({ location, error, showRoute, services }) => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapRef = useRef<any | null>(null);
    const markerRef = useRef<any | null>(null);
    const [isMapLoaded, setIsMapLoaded] = useState(false);
    const { markers, addMarker, selectMarker, selectedMarker } = useMapMarkers();
    const { addRoute, calculateDistance } = useTravelHistory();
    const { addLocation } = useRecentLocations();
    const serviceMarkersRef = useRef<any[]>([]);

    // Early return with a clear error if the token is missing.
    // This prevents the rest of the component from trying to render an unconfigurable map.
    if (!MAPBOX_TOKEN) {
        return (
            <div className="fixed inset-0 z-30 bg-gray-900 flex items-center justify-center p-4">
                <div className="text-center p-6 bg-red-900/80 rounded-lg backdrop-blur-sm border border-red-700 shadow-2xl max-w-md">
                    <h3 className="text-xl font-bold text-white">Error de Configuración del Mapa</h3>
                    <p className="text-red-200 mt-2 text-sm">
                        El token de acceso de Mapbox no está configurado. El mapa no puede ser mostrado.
                        <br />
                        <span className="text-red-300 font-mono text-xs mt-2 block">Asegúrese de que la variable de entorno MAPBOX_TOKEN esté definida.</span>
                    </p>
                </div>
            </div>
        );
    }

    useEffect(() => {
        if (mapRef.current || !mapContainerRef.current) return; // Initialize map only once

        mapboxgl.accessToken = MAPBOX_TOKEN;
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/dark-v11',
            center: [-99.1332, 19.4326], // Mexico City
            zoom: 5,
        });

        map.on('load', () => {
            mapRef.current = map;
            setIsMapLoaded(true);
        });

        return () => {
            if (mapRef.current) {
                mapRef.current.remove();
                mapRef.current = null;
            }
        };
    }, []);

    useEffect(() => {
        if (!mapRef.current || !location || !isMapLoaded) return;

        const lngLat: [number, number] = [location.lon, location.lat];

        if (markerRef.current) {
            markerRef.current.setLngLat(lngLat);
        } else {
            markerRef.current = new mapboxgl.Marker({
                color: "#3b82f6",
                draggable: false,
            }).setLngLat(lngLat).addTo(mapRef.current);
        }

        mapRef.current.flyTo({
            center: lngLat,
            zoom: 14,
            speed: 1.5,
        });

    }, [location, isMapLoaded]);

    useEffect(() => {
        if (!mapRef.current || !services || !isMapLoaded) return;

        // Clear existing service markers
        serviceMarkersRef.current.forEach(marker => marker.remove());
        serviceMarkersRef.current = [];

        // Add new service markers
        services.forEach(service => {
            const marker = new mapboxgl.Marker({
                color: service.type === 'gas' ? '#f59e0b' : service.type === 'mechanic' ? '#ef4444' : '#10b981'
            })
            .setLngLat([service.lng, service.lat])
            .setPopup(new mapboxgl.Popup().setHTML(`
                <div>
                    <h3>${service.name}</h3>
                    ${service.address ? `<p>${service.address}</p>` : ''}
                    ${service.phone ? `<p>${service.phone}</p>` : ''}
                    <button onclick="navigateToService('${service.id}')" class="bg-blue-500 text-white px-2 py-1 rounded mt-2">Navegar</button>
                </div>
            `))
            .addTo(mapRef.current);

            serviceMarkersRef.current.push(marker);

            addMarker({
                lat: service.lat,
                lng: service.lng,
                title: service.name,
                type: service.type as any,
                details: {
                    address: service.address,
                    phone: service.phone
                }
            });
        });

        // Make navigateToService available globally
        (window as any).navigateToService = (serviceId: string) => {
            const service = services.find(s => s.id === serviceId);
            if (service && location) {
                const distance = calculateDistance(
                    { lat: location.lat, lng: location.lon },
                    { lat: service.lat, lng: service.lng }
                );
                
                if (confirm(`¿Deseas navegar a ${service.name}?`)) {
                    addRoute({
                        startLocation: {
                            lat: location.lat,
                            lng: location.lon,
                            address: 'Mi ubicación'
                        },
                        endLocation: {
                            lat: service.lat,
                            lng: service.lng,
                            address: service.name
                        },
                        timestamp: Date.now(),
                        distance,
                        duration: Math.round(distance * 2)
                    });

                    alert(`Navegando a ${service.name}\nDistancia: ${distance.toFixed(1)}km`);
                }
            }
        };

    }, [services, isMapLoaded, location, addMarker, addRoute, calculateDistance]);

    useEffect(() => {
        if (!mapRef.current || !showRoute || !isMapLoaded) return;

        const routeCoords = [
            [showRoute.start.lng, showRoute.start.lat],
            [showRoute.end.lng, showRoute.end.lat]
        ];

        if (mapRef.current.getSource('route')) {
            mapRef.current.getSource('route').setData({
                type: 'Feature',
                properties: {},
                geometry: {
                    type: 'LineString',
                    coordinates: routeCoords
                }
            });
        } else {
            mapRef.current.addSource('route', {
                type: 'geojson',
                data: {
                    type: 'Feature',
                    properties: {},
                    geometry: {
                        type: 'LineString',
                        coordinates: routeCoords
                    }
                }
            });

            mapRef.current.addLayer({
                id: 'route',
                type: 'line',
                source: 'route',
                layout: {
                    'line-join': 'round',
                    'line-cap': 'round'
                },
                paint: {
                    'line-color': '#3b82f6',
                    'line-width': 4,
                    'line-dasharray': [2, 2]
                }
            });
        }

    }, [showRoute, isMapLoaded]);

    const renderOverlay = () => {
        if (error) {
            return (
                <div className="text-center p-6 bg-red-900/80 rounded-lg backdrop-blur-sm border border-red-700 shadow-2xl max-w-sm">
                    <h3 className="text-xl font-bold text-white">Error de Ubicación</h3>
                    <p className="text-red-200 mt-2 text-sm">{error}</p>
                </div>
            );
        }
        
        if (!location && !error) {
            return (
                <div className="text-center p-6 bg-gray-900/80 rounded-lg backdrop-blur-sm border border-gray-700 shadow-2xl">
                    <h3 className="text-xl font-bold text-white">Obteniendo ubicación...</h3>
                    <p className="text-gray-400 mt-1">Por favor, espera.</p>
                </div>
            );
        }

        return null;
    };

    return (
        <div className="fixed inset-0 z-30 bg-gray-900">
            <div ref={mapContainerRef} className="absolute inset-0" />
            <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
                <div className="pointer-events-auto">
                    {renderOverlay()}
                </div>
            </div>
        </div>
    );
};

export default Map;
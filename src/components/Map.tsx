import React, { useState, useCallback } from 'react';
import Map, { Marker, NavigationControl, GeolocateControl } from 'react-map-gl/mapbox';
import { LocationCoords, TrafficReport } from '../types';
import 'mapbox-gl/dist/mapbox-gl.css';

const MAPBOX_TOKEN = import.meta.env.VITE_MAPBOX_TOKEN;

interface MapProps {
    location?: LocationCoords;
    error?: string;
    trafficReport?: TrafficReport | null;
}

const Map: React.FC<MapProps> = ({ location, error, trafficReport = null }) => {
    const [viewState, setViewState] = useState({
        latitude: location?.lat || 19.4326,
        longitude: location?.lng || -99.1332,
        zoom: 12
    });
    const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);
    const [isOffline, setIsOffline] = useState(false);

    const onGeolocate = useCallback((e: any) => {
        setUserLocation({
            lat: e.coords.latitude,
            lng: e.coords.longitude
        });
    }, []);

    if (!MAPBOX_TOKEN) {
        return (
            <div className="fixed inset-0 z-30 bg-gray-900 flex items-center justify-center p-4">
                <div className="text-center p-6 bg-red-900/80 rounded-lg backdrop-blur-sm border border-red-700 shadow-2xl max-w-md">
                    <h3 className="text-xl font-bold text-white">Error de Configuración del Mapa</h3>
                    <p className="text-red-200 mt-2 text-sm">
                        El token de acceso de Mapbox no está configurado.
                        <br />
                        <span className="text-red-300 font-mono text-xs mt-2 block">Configure VITE_MAPBOX_TOKEN</span>
                    </p>
                </div>
            </div>
        );
    }

    return (
        <div className="relative w-full h-full">
            <Map
                {...viewState}
                onMove={evt => setViewState(evt.viewState)}
                style={{width: '100%', height: '100%'}}
                mapStyle="mapbox://styles/mapbox/dark-v11"
                mapboxAccessToken={MAPBOX_TOKEN}
            >
                {/* User location marker */}
                {userLocation && (
                    <Marker
                        longitude={userLocation.lng}
                        latitude={userLocation.lat}
                        color="#10b981"
                    />
                )}
                
                {/* Target location marker */}
                {location && (
                    <Marker
                        longitude={location.lng}
                        latitude={location.lat}
                        color="#3b82f6"
                    />
                )}
                
                {/* Traffic incident markers */}
                {trafficReport && (
                    <Marker
                        longitude={trafficReport.lng}
                        latitude={trafficReport.lat}
                        color="#ef4444"
                    />
                )}
                
                <NavigationControl position="top-right" />
                <GeolocateControl
                    position="top-right"
                    onGeolocate={onGeolocate}
                    trackUserLocation
                    showUserHeading
                />
            </Map>
            
            {/* Status overlays */}
            {isOffline && (
                <div className="absolute top-4 left-4 bg-yellow-500/90 text-white px-3 py-2 rounded-lg text-sm font-medium">
                    📡 Modo sin conexión
                </div>
            )}
            
            {error && (
                <div className="absolute bottom-4 left-4 bg-red-500/90 text-white px-3 py-2 rounded-lg text-sm">
                    ❌ {error}
                </div>
            )}
        </div>
    );
};

export default Map;
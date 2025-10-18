import React, { useRef, useEffect, useState } from 'react';
import { LocationCoords, Service } from '../types';

// Inform TypeScript about the global mapboxgl object
declare var mapboxgl: any;

interface MapProps {
    center: LocationCoords;
    zoom: number;
    userLocation: LocationCoords | null;
    serviceLocations: Service[] | null;
    onServiceClick: (service: Service) => void;
    onMapClick: () => void;
    routeStops: Service[] | null;
    routeGeometry: any | null; // GeoJSON geometry
    showHeatmap: boolean;
    showServices: boolean;
    selectedService: Service | null;
}

const Map: React.FC<MapProps> = ({ center, zoom, userLocation, serviceLocations, onServiceClick, onMapClick, routeStops, routeGeometry, showHeatmap, showServices, selectedService }) => {
    const mapContainerRef = useRef<HTMLDivElement | null>(null);
    const mapInstanceRef = useRef<any | null>(null);
    const userMarkerRef = useRef<any | null>(null);
    const serviceMarkersRef = useRef<any[]>([]);
    const [mapLoaded, setMapLoaded] = useState(false);
    const MAPBOX_TOKEN = process.env.MAPBOX_TOKEN;

    // Effect for map initialization
    useEffect(() => {
        if (mapInstanceRef.current || !mapContainerRef.current || !MAPBOX_TOKEN) return;

        mapboxgl.accessToken = MAPBOX_TOKEN;
        const map = new mapboxgl.Map({
            container: mapContainerRef.current,
            style: 'mapbox://styles/mapbox/navigation-night-v1',
            center: [center.lon, center.lat],
            zoom: zoom,
        });

        map.addControl(new mapboxgl.NavigationControl());

        map.on('load', async () => {
            try {
                const response = await fetch('/heatmap-data.json');
                if (!response.ok) throw new Error('Network response was not ok');
                const data = await response.json();

                map.addSource('accidents-source', {
                    type: 'geojson',
                    data: data,
                });

                map.addLayer(
                    {
                        id: 'accidents-heatmap',
                        type: 'heatmap',
                        source: 'accidents-source',
                        maxzoom: 15,
                        paint: {
                            'heatmap-intensity': ['interpolate', ['linear'], ['zoom'], 0, 1, 15, 3],
                            'heatmap-color': [
                                'interpolate', ['linear'], ['heatmap-density'],
                                0, 'rgba(0, 0, 255, 0)',
                                0.2, 'rgb(100, 150, 255)',
                                0.5, 'rgb(255, 255, 0)',
                                0.8, 'rgb(255, 100, 0)',
                                1, 'rgb(255, 0, 0)',
                            ],
                            'heatmap-radius': ['interpolate', ['linear'], ['zoom'], 0, 2, 9, 20, 15, 50],
                            'heatmap-opacity': ['interpolate', ['linear'], ['zoom'], 10, 0.9, 15, 0.4],
                        },
                        layout: {
                            'visibility': 'none',
                        },
                    },
                    'road-label-simple'
                );
            } catch (error) {
                console.error('Error loading heatmap data:', error);
            }
            setMapLoaded(true);
            mapInstanceRef.current = map;
        });
        
        map.on('click', onMapClick);

        return () => {
            if (mapInstanceRef.current) {
                mapInstanceRef.current.off('click', onMapClick);
                mapInstanceRef.current.remove();
                mapInstanceRef.current = null;
            }
        };
    }, [center, zoom, MAPBOX_TOKEN, onMapClick]);
    
    // Effect for heatmap visibility
    useEffect(() => {
        if (!mapLoaded || !mapInstanceRef.current) return;
        const map = mapInstanceRef.current;
        
        if (map.getLayer('accidents-heatmap')) {
            map.setLayoutProperty(
                'accidents-heatmap',
                'visibility',
                showHeatmap ? 'visible' : 'none'
            );
        }
    }, [showHeatmap, mapLoaded]);

    // Effect for managing markers (creation and removal)
    useEffect(() => {
        if (!mapLoaded || !mapInstanceRef.current) return;
        const map = mapInstanceRef.current;

        // Manage user marker
        if (userMarkerRef.current) {
            userMarkerRef.current.remove();
        }
        if (userLocation) {
            const el = document.createElement('div');
            el.className = 'user-location-marker';
            el.addEventListener('click', (e) => e.stopPropagation());
            userMarkerRef.current = new mapboxgl.Marker(el)
                .setLngLat([userLocation.lon, userLocation.lat])
                .addTo(map);
        }

        // Manage service markers (creation/destruction)
        serviceMarkersRef.current.forEach(marker => marker.remove());
        serviceMarkersRef.current = [];

        if (serviceLocations && serviceLocations.length > 0 && showServices) {
            const newServiceMarkers: any[] = [];
            const bounds = new mapboxgl.LngLatBounds();
            
            serviceLocations.forEach(service => {
                if (service.latitud && service.longitud) {
                    const el = document.createElement('div');
                    el.className = 'service-location-marker';
                    (el as any)._serviceData = service;
                    
                    el.addEventListener('click', (e) => {
                        e.stopPropagation();
                        map.flyTo({ center: [service.longitud, service.latitud], zoom: 15, speed: 1.5, curve: 1, essential: true });
                        onServiceClick(service);
                    });
                    
                    const marker = new mapboxgl.Marker(el)
                        .setLngLat([service.longitud, service.latitud])
                        .addTo(map);
                    newServiceMarkers.push(marker);
                    bounds.extend([service.longitud, service.latitud]);
                }
            });

            serviceMarkersRef.current = newServiceMarkers;

            if (userLocation) {
                bounds.extend([userLocation.lon, userLocation.lat]);
                map.fitBounds(bounds, { padding: 80, maxZoom: 14, duration: 1000 });
            }
        }
    }, [mapLoaded, userLocation, serviceLocations, showServices, onServiceClick]);

    // Effect for updating marker styles on selection change to allow CSS transitions
    useEffect(() => {
        serviceMarkersRef.current.forEach(marker => {
            const el = marker.getElement();
            const service = (el as any)._serviceData as Service;
            
            el.classList.remove('service-location-marker--selected', 'service-location-marker--unselected');

            if (selectedService) {
                if (selectedService.nombre === service.nombre && selectedService.latitud === service.latitud) {
                    el.classList.add('service-location-marker--selected');
                } else {
                    el.classList.add('service-location-marker--unselected');
                }
            }
        });
    }, [selectedService]);


    // Effect for route geometry
    useEffect(() => {
        if (!mapLoaded || !mapInstanceRef.current) return;
        const map = mapInstanceRef.current;

        const sourceId = 'route-source';
        const layerId = 'route-layer';
        const hasSource = map.getSource(sourceId);

        if (routeGeometry) {
            const geojsonData = {
                type: 'Feature',
                properties: {},
                geometry: routeGeometry,
            };
            if (hasSource) {
                map.getSource(sourceId).setData(geojsonData);
            } else {
                map.addSource(sourceId, {
                    type: 'geojson',
                    data: geojsonData,
                });
                map.addLayer({
                    id: layerId,
                    type: 'line',
                    source: sourceId,
                    layout: { 'line-join': 'round', 'line-cap': 'round' },
                    paint: { 'line-color': '#3887be', 'line-width': 8, 'line-opacity': 0.85 },
                });
            }
        } else {
            if (map.getLayer(layerId)) map.removeLayer(layerId);
            if (hasSource) map.removeSource(sourceId);
        }
    }, [mapLoaded, routeGeometry]);

    return <div ref={mapContainerRef} className="w-full h-full" />;
};

export default Map;
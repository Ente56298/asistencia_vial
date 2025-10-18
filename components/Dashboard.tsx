
import React, { useState, useEffect, useMemo, useCallback } from 'react';
import { User, Feature, AssistanceType, LocationCoords, Service, AppNotification } from '../types';
import Header from './Header';
import FeaturePanel from './FeaturePanel';
import SOSModal from './SOSModal';
import EvaluationPanel from './EvaluationPanel';
import AssistancePanel from './AssistancePanel';
import AgentChatPanel from './AgentChatPanel';
import SubscriptionPanel from './SubscriptionPanel';
import ProfilePanel from './ProfilePanel';
import PartnersPanel from './PartnersPanel';
import AdminPanel from './AdminPanel';
import EvaluationIcon from './icons/EvaluationIcon';
import WrenchIcon from './icons/WrenchIcon';
import TrafficIcon from './icons/TrafficIcon';
import GasStationIcon from './icons/GasStationIcon';
import AssistanceIcon from './icons/AssistanceIcon';
import SOSIcon from './icons/SOSIcon';
import PartnersIcon from './icons/PartnersIcon';
import AdminIcon from './icons/AdminIcon';
import LayersIcon from './icons/LayersIcon';
import Map from './Map';
import ServiceDetailPanel from './ServiceDetailPanel';
import SavedRoutePanel from './SavedRoutePanel';
import WeatherIcon from './icons/WeatherIcon';
import AlertBanner from './AlertBanner';
import { getRoute } from '../services/mapService';
import ConverterIcon from './icons/ConverterIcon';
import ConverterPanel from './ConverterPanel';
import NotificationBanner from './NotificationBanner';
import { getProactiveAlert } from '../services/geminiService';
import MapLayerControl from './MapLayerControl';
import AssistanceMonitoringPanel from './AssistanceMonitoringPanel';

interface DashboardProps {
    user: User;
    onLogout: () => void;
}

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

const FeatureButton: React.FC<{ label: string; icon: React.ReactNode; onClick: () => void; colorClass: string; }> = ({ label, icon, onClick, colorClass }) => (
    <button
        onClick={onClick}
        onMouseDown={handleMouseDown}
        className={`group relative flex flex-col items-center justify-center p-4 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-1 focus:outline-none focus:ring-4 ${colorClass} ripple-effect`}
    >
        <div className={`w-12 h-12 sm:w-16 sm:h-16 mb-2 text-white transition-transform duration-300 group-hover:scale-110`}>
            {icon}
        </div>
        <span className="font-bold text-sm sm:text-base text-center text-white">{label}</span>
    </button>
);


const Dashboard: React.FC<DashboardProps> = ({ user, onLogout }) => {
    const [activeFeature, setActiveFeature] = useState<Feature | null>(null);
    const [isSosModalOpen, setIsSosModalOpen] = useState(false);
    const [isMonitoringAssistance, setIsMonitoringAssistance] = useState(false);
    const [isAssistancePanelOpen, setIsAssistancePanelOpen] = useState(false);
    const [selectedAssistance, setSelectedAssistance] = useState<AssistanceType | null>(null);
    const [isSubscriptionPanelOpen, setIsSubscriptionPanelOpen] = useState(false);
    const [isProfilePanelOpen, setIsProfilePanelOpen] = useState(false);

    // Common state for FeaturePanel
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [results, setResults] = useState<any>(null);
    const [currentLocation, setCurrentLocation] = useState<LocationCoords | null>(null);
    const [serviceMarkers, setServiceMarkers] = useState<Service[] | null>(null);

    // New states for interactive map
    const [selectedService, setSelectedService] = useState<Service | null>(null);
    const [savedRoutePoints, setSavedRoutePoints] = useState<Service[]>([]);
    const [toastNotification, setToastNotification] = useState<string | null>(null);
    const [showHeatmap, setShowHeatmap] = useState(false);
    const [showServices, setShowServices] = useState(true);
    const [isLayerControlOpen, setIsLayerControlOpen] = useState(false);
    const [bannerAlert, setBannerAlert] = useState<{type: 'traffic' | 'weather', message: string} | null>(null);
    const [routeGeometry, setRouteGeometry] = useState<any | null>(null);
    const [routeSummary, setRouteSummary] = useState<{ duration: number; distance: number } | null>(null);
    
    // State for proactive notifications
    const [notifications, setNotifications] = useState<AppNotification[]>([]);


    useEffect(() => {
        if (toastNotification) {
            const timer = setTimeout(() => setToastNotification(null), 3000);
            return () => clearTimeout(timer);
        }
    }, [toastNotification]);

    useEffect(() => {
        // Get user's location
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCurrentLocation({
                    lat: position.coords.latitude,
                    lon: position.coords.longitude,
                });
            },
            () => {
                console.warn("No se pudo obtener la ubicación. Usando ubicación predeterminada.");
                // Fallback to a default location (Mexico City)
                setCurrentLocation({ lat: 19.4326, lon: -99.1332 });
            },
            { enableHighAccuracy: true, timeout: 10000, maximumAge: 0 }
        );
    }, []);
    
    // Proactive Alert Monitoring System
    useEffect(() => {
        const checkForAlerts = async () => {
            if (!currentLocation || !routeGeometry) {
                return; // Only check if user is on an active route
            }

            try {
                const alertText = await getProactiveAlert(currentLocation, routeGeometry);
                if (alertText && alertText !== 'NO_ALERT') {
                    // Avoid adding duplicate notifications
                    if (!notifications.some(n => n.message === alertText)) {
                        const newNotification: AppNotification = {
                            id: `notif_${Date.now()}`,
                            message: alertText,
                            type: 'critical',
                            timestamp: Date.now(),
                        };
                        setNotifications(prev => [...prev, newNotification]);
                    }
                }
            } catch (error) {
                console.error("Error checking for proactive alerts:", error);
            }
        };

        const intervalId = setInterval(checkForAlerts, 30000); // Check every 30 seconds

        return () => clearInterval(intervalId); // Cleanup on component unmount

    }, [currentLocation, routeGeometry, notifications]);

    useEffect(() => {
        if (activeFeature === Feature.Services && results) {
            setServiceMarkers(results as Service[]);
            setShowServices(true); // Automatically show services when a search is made
        } else if (activeFeature !== Feature.Services) {
            setServiceMarkers(null); // Clear markers if another feature is selected
        }
    }, [results, activeFeature]);
    
    // Hide service details if the service layer is turned off
    useEffect(() => {
        if (!showServices) {
            setSelectedService(null);
        }
    }, [showServices]);

    // Effect to calculate route when points change
    useEffect(() => {
        const planRoute = async () => {
            if (savedRoutePoints.length > 0 && currentLocation) {
                const stops = [
                    currentLocation,
                    ...savedRoutePoints.map(p => ({ lat: p.latitud, lon: p.longitud }))
                ];
                try {
                    const routeData = await getRoute(stops);
                    if (routeData) {
                        setRouteGeometry(routeData.geometry);
                        setRouteSummary({ duration: routeData.duration, distance: routeData.distance });
                    }
                } catch (error) {
                    console.error("Error planning route:", error);
                    setToastNotification("No se pudo calcular la ruta.");
                    setRouteGeometry(null);
                    setRouteSummary(null);
                }
            } else {
                setRouteGeometry(null);
                setRouteSummary(null);
            }
        };

        planRoute();
    }, [savedRoutePoints, currentLocation]);


    const openFeature = (feature: Feature) => {
        setResults(null);
        setError(null);
        setSelectedService(null); // Deselect any service when opening a new feature panel
        setActiveFeature(feature);
    };

    const closePanels = () => {
        setActiveFeature(null);
        setIsSosModalOpen(false);
        setIsMonitoringAssistance(false);
        setIsAssistancePanelOpen(false);
        setSelectedAssistance(null);
        setIsSubscriptionPanelOpen(false);
        setIsProfilePanelOpen(false);
        setSelectedService(null);
    };

    const handleSelectAssistance = (type: AssistanceType) => {
        // FIX: Replaced non-existent `AssistanceType.Security` and `AssistanceType.Funeral` with `AssistanceType.Legal` to match the enum definition in `types.ts`.
        const isPremiumFeature = [AssistanceType.Medical, AssistanceType.Legal].includes(type);
        if (isPremiumFeature && user.subscriptionStatus !== 'premium' && user.subscriptionStatus !== 'admin') {
            setIsSubscriptionPanelOpen(true);
        } else {
            setSelectedAssistance(type);
            setIsAssistancePanelOpen(false);
        }
    };
    
    const navigateToFeature = (feature: Feature) => {
        closePanels();
        setTimeout(() => openFeature(feature), 100);
    };

    const handleServiceClick = (service: Service) => {
        setSelectedService(service);
    };

    const handleMapClick = useCallback(() => {
        setSelectedService(null);
    }, []);

    const handleSaveToRoute = (service: Service) => {
        if (savedRoutePoints.some(p => p.nombre === service.nombre && p.latitud === service.latitud)) {
            setToastNotification(`"${service.nombre}" ya está en tu ruta.`);
        } else {
            setSavedRoutePoints(prevPoints => [...prevPoints, service]);
            setToastNotification(`"${service.nombre}" añadido a la ruta.`);
        }
        setSelectedService(null); // Close the panel after adding
    };
    
    const handleClearRoute = () => {
        setSavedRoutePoints([]);
        setToastNotification('Ruta limpiada.');
    };

    const handleDismissNotification = (id: string) => {
        setNotifications(notifications.filter(n => n.id !== id));
    };

    const handleSOSConfirmed = () => {
        setIsSosModalOpen(false);
        setIsMonitoringAssistance(true);
    };
    
    const notificationToShow = useMemo(() => {
        if (!notifications.length) return null;
        // Prioritize showing the most recent critical notification.
        const lastCritical = [...notifications].reverse().find(n => n.type === 'critical');
        if (lastCritical) return lastCritical;
        // Otherwise, show the most recent notification of any type.
        return notifications[notifications.length - 1];
    }, [notifications]);

    return (
        <div className="min-h-screen w-full bg-gray-900 text-white font-sans">
            {currentLocation && !isMonitoringAssistance && (
                <div className="absolute inset-0 z-0">
                    <Map
                        center={currentLocation}
                        zoom={12}
                        userLocation={currentLocation}
                        serviceLocations={serviceMarkers}
                        onServiceClick={handleServiceClick}
                        onMapClick={handleMapClick}
                        routeStops={savedRoutePoints}
                        routeGeometry={routeGeometry}
                        showHeatmap={showHeatmap}
                        showServices={showServices}
                        selectedService={selectedService}
                    />
                </div>
            )}
            
            {notificationToShow && (
                <NotificationBanner 
                    notification={notificationToShow}
                    onDismiss={handleDismissNotification}
                />
            )}
            {bannerAlert && <AlertBanner type={bannerAlert.type} message={bannerAlert.message} onClose={() => setBannerAlert(null)} />}
            {toastNotification && (
                <div className="fixed top-5 left-1/2 -translate-x-1/2 z-[100] bg-green-600/90 border border-green-500 text-white text-sm font-semibold px-4 py-2 rounded-lg shadow-lg animate-fade-in-down">
                    {toastNotification}
                </div>
            )}
            <div className="relative z-10 flex flex-col items-center p-4 sm:p-6 lg:p-8">
                <div className="w-full max-w-7xl">
                    <Header user={user} onProfileClick={() => setIsProfilePanelOpen(true)} />

                    <main className="mt-6">
                        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-4 sm:gap-6">
                            <FeatureButton label="Evaluar Situación" icon={<EvaluationIcon />} onClick={() => openFeature(Feature.Evaluation)} colorClass="bg-sky-600/80 hover:bg-sky-600 focus:ring-sky-400" />
                            <FeatureButton label="Buscar Refacciones" icon={<WrenchIcon />} onClick={() => openFeature(Feature.Parts)} colorClass="bg-slate-600/80 hover:bg-slate-600 focus:ring-slate-400" />
                            <FeatureButton label="Reporte de Tráfico" icon={<TrafficIcon />} onClick={() => openFeature(Feature.Traffic)} colorClass="bg-orange-600/80 hover:bg-orange-600 focus:ring-orange-400" />
                            <FeatureButton label="Clima en Ruta" icon={<WeatherIcon />} onClick={() => openFeature(Feature.Weather)} colorClass="bg-blue-600/80 hover:bg-blue-600 focus:ring-blue-400" />
                            <FeatureButton label="Buscar Servicios" icon={<GasStationIcon />} onClick={() => openFeature(Feature.Services)} colorClass="bg-indigo-600/80 hover:bg-indigo-600 focus:ring-indigo-400" />
                            <FeatureButton label="Asistencia Directa" icon={<AssistanceIcon />} onClick={() => setIsAssistancePanelOpen(true)} colorClass="bg-cyan-600/80 hover:bg-cyan-600 focus:ring-cyan-400" />
                            <FeatureButton label="Nuestros Socios" icon={<PartnersIcon />} onClick={() => openFeature(Feature.Partners)} colorClass="bg-purple-600/80 hover:bg-purple-600 focus:ring-purple-400" />
                            <FeatureButton label="Conversor Utilidades" icon={<ConverterIcon />} onClick={() => openFeature(Feature.Converter)} colorClass="bg-green-600/80 hover:bg-green-600 focus:ring-green-400" />
                            
                            {user.subscriptionStatus === 'admin' && (
                                <FeatureButton label="Administración" icon={<AdminIcon />} onClick={() => openFeature(Feature.Admin)} colorClass="bg-rose-700/80 hover:bg-rose-700 focus:ring-rose-500" />
                            )}

                        </div>
                    </main>

                    {activeFeature && [Feature.Parts, Feature.Traffic, Feature.Services, Feature.Weather].includes(activeFeature) && (
                        <FeaturePanel
                            feature={activeFeature}
                            onClose={closePanels}
                            isLoading={isLoading}
                            setIsLoading={setIsLoading}
                            error={error}
                            setError={setError}
                            results={results}
                            setResults={setResults}
                            currentLocation={currentLocation}
                            onAlert={setBannerAlert}
                        />
                    )}
                    
                    {activeFeature === Feature.Evaluation && <EvaluationPanel onClose={closePanels} onNavigate={navigateToFeature} />}
                    {activeFeature === Feature.Partners && <PartnersPanel onClose={closePanels} />}
                    {activeFeature === Feature.Converter && <ConverterPanel onClose={closePanels} />}
                    {activeFeature === Feature.Admin && user.subscriptionStatus === 'admin' && <AdminPanel onClose={closePanels} />}

                    {isSosModalOpen && <SOSModal onClose={closePanels} onSOSConfirmed={handleSOSConfirmed} />}
                    {isMonitoringAssistance && currentLocation && (
                        <AssistanceMonitoringPanel 
                            userLocation={currentLocation} 
                            onComplete={() => setIsMonitoringAssistance(false)} 
                        />
                    )}
                    {isAssistancePanelOpen && <AssistancePanel onClose={closePanels} onSelect={handleSelectAssistance} user={user} />}
                    {selectedAssistance && <AgentChatPanel assistanceType={selectedAssistance} onClose={closePanels} />}
                    {isSubscriptionPanelOpen && <SubscriptionPanel onClose={closePanels} onSubscribe={() => { alert('¡Gracias por suscribirte!'); closePanels(); }} />}
                    {isProfilePanelOpen && <ProfilePanel user={user} onClose={closePanels} onLogout={onLogout} />}
                    {selectedService && (
                        <ServiceDetailPanel 
                            service={selectedService} 
                            onClose={() => setSelectedService(null)} 
                            onSaveToRoute={handleSaveToRoute}
                        />
                    )}
                </div>
            </div>
            {isLayerControlOpen && (
                <MapLayerControl
                    showHeatmap={showHeatmap}
                    showServices={showServices}
                    onToggleHeatmap={() => setShowHeatmap(!showHeatmap)}
                    onToggleServices={() => setShowServices(!showServices)}
                    onClose={() => setIsLayerControlOpen(false)}
                />
            )}
            {savedRoutePoints.length > 0 && currentLocation && (
                <SavedRoutePanel
                    routePoints={savedRoutePoints}
                    startLocation={currentLocation}
                    onClearRoute={handleClearRoute}
                    summary={routeSummary}
                />
            )}
             <button
                onClick={() => setIsLayerControlOpen(prev => !prev)}
                onMouseDown={handleMouseDown}
                className="fixed top-24 right-6 z-30 w-12 h-12 bg-gray-800/80 backdrop-blur-sm border border-gray-600 rounded-full flex items-center justify-center text-white shadow-lg transition-transform transform hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-amber-500 ripple-effect"
                aria-label="Controlar capas del mapa"
            >
                <LayersIcon />
            </button>
             <button
                onClick={() => setIsSosModalOpen(true)}
                onMouseDown={handleMouseDown}
                className="fixed bottom-6 right-6 z-30 w-20 h-20 bg-red-600 rounded-full flex items-center justify-center text-white shadow-lg transition-transform transform hover:scale-110 focus:outline-none focus:ring-4 focus:ring-offset-2 focus:ring-offset-gray-900 focus:ring-red-500 ripple-effect animate-sos-pulse"
                aria-label="Activar alerta SOS"
            >
                <span className="font-bold text-2xl">SOS</span>
            </button>
        </div>
    );
};

export default Dashboard;
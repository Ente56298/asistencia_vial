import React, { useState, useEffect } from 'react';
import { Feature, User } from '../types';
import WrenchIcon from './icons/WrenchIcon';
import TrafficIcon from './icons/TrafficIcon';
import GasStationIcon from './icons/GasStationIcon';
import SOSIcon from './icons/SOSIcon';
import EvaluationIcon from './icons/EvaluationIcon';
import AssistanceIcon from './icons/AssistanceIcon';
import PartnersIcon from './icons/PartnersIcon';
import StarIcon from './icons/StarIcon';
import AdminIcon from './icons/AdminIcon';
import { Router, useRouter } from './Router';
import { Tutorial } from './Tutorial';
import { TravelHistoryPanel } from './TravelHistoryPanel';
import { useRecentLocations } from '../hooks/useRecentLocations';
import { useSearchHistory } from '../hooks/useSearchHistory';
import { requestNotificationPermission } from '../utils/notifications';

interface DashboardProps {
    user: User;
    onFeatureSelect: (feature: Feature) => void;
    onActivateSOS: () => void;
    onSubscriptionPrompt: () => void;
}

interface FeatureButtonProps {
    icon: React.ReactNode;
    label: string;
    onClick: () => void;
    isSOS?: boolean;
    isPremium?: boolean;
    isAdmin?: boolean;
}

const FeatureButton: React.FC<FeatureButtonProps> = ({ icon, label, onClick, isSOS = false, isPremium = false, isAdmin = false }) => {
    const baseClasses = "relative flex flex-col items-center justify-center aspect-square rounded-2xl shadow-lg transform transition-all duration-300 hover:scale-105 focus:outline-none focus:ring-4";
    const normalClasses = "bg-gray-800/50 backdrop-blur-sm border border-gray-700 hover:bg-gray-700/70 focus:ring-amber-500/50 text-white";
    const sosClasses = "bg-red-600/80 backdrop-blur-sm border border-red-400 hover:bg-red-500/90 focus:ring-red-400/50 text-white animate-pulse-slow";
    const adminClasses = "bg-indigo-800/50 backdrop-blur-sm border border-indigo-700 hover:bg-indigo-700/70 focus:ring-indigo-500/50 text-white";
    
    const buttonClass = isSOS ? sosClasses : (isAdmin ? adminClasses : normalClasses);

    return (
        <button onClick={onClick} className={`${baseClasses} ${buttonClass}`}>
             {isPremium && (
                 <div className="absolute top-2 right-2 text-amber-300">
                    <StarIcon />
                 </div>
             )}
             <div className="w-12 h-12 sm:w-16 sm:h-16 mb-2">{icon}</div>
             <span className="font-bold text-sm sm:text-base text-center">{label}</span>
        </button>
    );
};

const DashboardContent: React.FC<DashboardProps> = ({ user, onFeatureSelect, onActivateSOS, onSubscriptionPrompt }) => {
    const { navigate } = useRouter();
    const { addLocation } = useRecentLocations();
    const { addSearch } = useSearchHistory();
    const [showTutorial, setShowTutorial] = useState(false);
    const [showTravelHistory, setShowTravelHistory] = useState(false);

    useEffect(() => {
        const hasSeenTutorial = localStorage.getItem('hasSeenTutorial');
        if (!hasSeenTutorial) {
            setShowTutorial(true);
        }
        
        requestNotificationPermission();
    }, []);
    
    const handleAssistanceClick = () => {
        navigate('assistance');
        onFeatureSelect(Feature.Assistance);
    };

    const handleFeatureClick = (feature: Feature, route?: string) => {
        if (route) navigate(route as any);
        onFeatureSelect(feature);
    };

    return (
        <div className="w-full max-w-lg mx-auto">
            <div className="grid grid-cols-3 gap-4 sm:gap-6">
                 <FeatureButton 
                    icon={<EvaluationIcon />}
                    label="Asistente Evaluador"
                    onClick={() => handleFeatureClick(Feature.Evaluation, 'evaluation')}
                />
                 <FeatureButton 
                    icon={<WrenchIcon />}
                    label="Refacciones"
                    onClick={() => handleFeatureClick(Feature.Parts)}
                />
                 <FeatureButton 
                    icon={<TrafficIcon />}
                    label="Reporte de Tráfico"
                    onClick={() => handleFeatureClick(Feature.Traffic)}
                />
                 <FeatureButton 
                    icon={<GasStationIcon />}
                    label="Servicios Cercanos"
                    onClick={() => handleFeatureClick(Feature.Services)}
                />
                 <FeatureButton 
                    icon={<AssistanceIcon />}
                    label="Tipos de Asistencia"
                    onClick={handleAssistanceClick}
                    isPremium={true}
                />
                 <FeatureButton 
                    icon={<PartnersIcon />}
                    label="Convenios"
                    onClick={() => handleFeatureClick(Feature.Partnerships, 'partners')}
                />

                {user.subscriptionStatus === 'admin' && (
                    <FeatureButton
                        icon={<AdminIcon />}
                        label="Panel de Admin"
                        onClick={() => handleFeatureClick(Feature.Admin, 'admin')}
                        isAdmin
                    />
                )}

                 <FeatureButton 
                    icon={<SOSIcon />}
                    label="SOS"
                    onClick={onActivateSOS}
                    isSOS
                />
                
                <FeatureButton 
                    icon={<div className="text-2xl">🗺️</div>}
                    label="Historial"
                    onClick={() => setShowTravelHistory(true)}
                />
            </div>
            
            {showTutorial && (
                <Tutorial onComplete={() => setShowTutorial(false)} />
            )}
            
            {showTravelHistory && (
                <TravelHistoryPanel onClose={() => setShowTravelHistory(false)} />
            )}
        </div>
    );
};

const Dashboard: React.FC<DashboardProps> = (props) => {
    return (
        <Router>
            <DashboardContent {...props} />
        </Router>
    );
};

export default Dashboard;

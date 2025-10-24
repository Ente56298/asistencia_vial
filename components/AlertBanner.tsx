
import React from 'react';
import TrafficIcon from './icons/TrafficIcon';
import WeatherIcon from './icons/WeatherIcon';

interface AlertBannerProps {
    type: 'traffic' | 'weather';
    message: string;
    onClose: () => void;
}

const AlertBanner: React.FC<AlertBannerProps> = ({ type, message, onClose }) => {
    const config = {
        traffic: {
            icon: <TrafficIcon />,
            bgColor: 'bg-red-600/90',
            borderColor: 'border-red-500',
            textColor: 'text-white'
        },
        weather: {
            icon: <WeatherIcon />,
            bgColor: 'bg-sky-600/90',
            borderColor: 'border-sky-500',
            textColor: 'text-white'
        }
    };

    const currentConfig = config[type];

    return (
        <div 
            className={`fixed top-5 left-1/2 -translate-x-1/2 z-[101] w-[90%] max-w-2xl ${currentConfig.bgColor} border ${currentConfig.borderColor} ${currentConfig.textColor} p-3 rounded-xl shadow-2xl flex items-center justify-between animate-slide-in-down backdrop-blur-sm`}
            role="alert"
        >
            <div className="flex items-center">
                <div className="w-8 h-8 mr-3 flex-shrink-0">
                    {currentConfig.icon}
                </div>
                <div>
                    <p className="font-bold text-sm uppercase">{type === 'traffic' ? 'Alerta de Tráfico' : 'Alerta de Clima'}</p>
                    <p className="text-sm">{message}</p>
                </div>
            </div>
            <button
                onClick={onClose}
                className="ml-4 bg-black/20 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-black/40 transition-colors flex-shrink-0"
                aria-label="Cerrar alerta"
            >
                <span className="text-xl font-light">&times;</span>
            </button>
        </div>
    );
};

export default AlertBanner;

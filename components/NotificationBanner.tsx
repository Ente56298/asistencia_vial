import React from 'react';
import { AppNotification } from '../types';
import BellIcon from './icons/BellIcon';
import WarningIcon from './icons/WarningIcon';

interface NotificationBannerProps {
    notification: AppNotification | null;
    onDismiss: (id: string) => void;
}

const NotificationBanner: React.FC<NotificationBannerProps> = ({ notification, onDismiss }) => {
    if (!notification) {
        return null;
    }

    const config = {
        critical: {
            title: 'Notificación Crítica',
            icon: <WarningIcon />,
            bgColor: 'bg-red-700/90',
            borderColor: 'border-red-500',
            borderWidth: 'border-2',
            textColor: 'text-white',
            iconAnimationClass: 'animate-pulse-notification-icon',
        },
        warning: {
            title: 'Aviso del Sistema',
            icon: <BellIcon />,
            bgColor: 'bg-yellow-500/90',
            borderColor: 'border-yellow-400',
            borderWidth: 'border',
            textColor: 'text-black',
            iconAnimationClass: '',
        },
        info: {
            title: 'Información',
            icon: <BellIcon />,
            bgColor: 'bg-blue-500/90',
            borderColor: 'border-blue-400',
            borderWidth: 'border',
            textColor: 'text-white',
            iconAnimationClass: '',
        },
    };

    const currentConfig = config[notification.type];

    return (
        <div 
            className={`fixed top-5 left-1/2 -translate-x-1/2 z-[102] w-[90%] max-w-2xl ${currentConfig.bgColor} ${currentConfig.borderWidth} ${currentConfig.borderColor} ${currentConfig.textColor} p-3 rounded-xl shadow-2xl flex items-center justify-between animate-slide-in-down backdrop-blur-sm`}
            role="alert"
        >
            <div className="flex items-center">
                <div className={`w-8 h-8 mr-3 flex-shrink-0 ${currentConfig.iconAnimationClass}`}>
                    {currentConfig.icon}
                </div>
                <div>
                    <p className="font-bold text-sm uppercase">{currentConfig.title}</p>
                    <p className="text-sm">{notification.message}</p>
                </div>
            </div>
            <button
                onClick={() => onDismiss(notification.id)}
                className="ml-4 bg-black/20 text-white rounded-full w-7 h-7 flex items-center justify-center hover:bg-black/40 transition-colors flex-shrink-0"
                aria-label="Cerrar notificación"
            >
                <span className="text-xl font-light">&times;</span>
            </button>
        </div>
    );
};

export default NotificationBanner;
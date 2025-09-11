
import React, { useState, useEffect } from 'react';
import { getEmergencyResponse } from '../services/geminiService';
import SpinnerIcon from './icons/SpinnerIcon';
import { SOSConfirmation } from './SOSConfirmation';
import { sendSOSNotification, showNotification } from '../utils/notifications';

interface SOSModalProps {
    onClose: () => void;
}

const SOSModal: React.FC<SOSModalProps> = ({ onClose }) => {
    const [status, setStatus] = useState<'counting' | 'confirmation' | 'sending' | 'confirmed'>('counting');
    const [countdown, setCountdown] = useState(3);
    const [responseMessage, setResponseMessage] = useState<string>('');
    const [error, setError] = useState<string>('');
    const [currentLocation, setCurrentLocation] = useState<{lat: number; lng: number; address?: string} | null>(null);

    useEffect(() => {
        navigator.geolocation.getCurrentPosition(
            (position) => {
                setCurrentLocation({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude,
                    address: 'Ubicación actual'
                });
            },
            () => {
                setCurrentLocation({
                    lat: 19.4326, 
                    lng: -99.1332,
                    address: 'Ciudad de México (ubicación aproximada)'
                });
            }
        );
    }, []);

    useEffect(() => {
        if (status === 'counting') {
            if (countdown > 0) {
                const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
                return () => clearTimeout(timer);
            } else {
                setStatus('confirmation');
            }
        }
    }, [status, countdown]);

    const handleConfirmSOS = async () => {
        if (!currentLocation) return;
        
        setStatus('sending');
        const vehicle = JSON.parse(localStorage.getItem('vehicleProfile') || '{}');
        const emergencyContacts = JSON.parse(localStorage.getItem('emergencyContacts') || '[]');
        
        try {
            const result = await sendSOSNotification(currentLocation, vehicle, emergencyContacts);
            setResponseMessage(result.message);
            setStatus('confirmed');
            
            if (result.success) {
                showNotification(result.message, 'success');
            } else {
                setError(result.message);
            }
        } catch (error) {
            setError('Error al enviar la alerta SOS');
            setStatus('confirmed');
        }
    };

    if (status === 'confirmation' && currentLocation) {
        const vehicle = JSON.parse(localStorage.getItem('vehicleProfile') || '{}');
        const emergencyContacts = JSON.parse(localStorage.getItem('emergencyContacts') || '[]');
        
        return (
            <SOSConfirmation
                location={currentLocation}
                vehicle={vehicle}
                emergencyContacts={emergencyContacts}
                onConfirm={handleConfirmSOS}
                onCancel={onClose}
            />
        );
    }

    const renderContent = () => {
        switch (status) {
            case 'counting':
                return (
                    <>
                        <h2 className="text-2xl font-bold mb-4 text-white">Confirmando Alerta SOS</h2>
                        <p className="text-gray-300 mb-6">Mostrando confirmación en...</p>
                        <div className="text-8xl font-mono font-bold text-red-400">{countdown}</div>
                    </>
                );
            case 'sending':
                return (
                    <>
                        <h2 className="text-2xl font-bold mb-4 text-white">Enviando Alerta...</h2>
                        <p className="text-gray-300 mb-6">Contactando a los servicios de emergencia. Por favor, espere.</p>
                        <SpinnerIcon className="w-16 h-16 text-red-400" />
                    </>
                );
            case 'confirmed':
                return (
                     <>
                        <h2 className="text-2xl font-bold mb-4 text-green-400">Alerta Confirmada</h2>
                        <p className="text-gray-200 whitespace-pre-wrap text-center max-w-md">
                          {error || responseMessage}
                        </p>
                    </>
                );
        }
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50 p-4">
            <div className="relative w-full max-w-lg bg-gray-900/80 border border-red-500/50 rounded-2xl shadow-2xl p-8 flex flex-col items-center justify-center text-center">
                {renderContent()}
                <button
                    onClick={onClose}
                    className="absolute -top-4 -right-4 bg-gray-700 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-600 transition-colors"
                    aria-label="Cerrar"
                >
                    &times;
                </button>
                 {status !== 'counting' && (
                     <button
                        onClick={onClose}
                        className="mt-8 bg-amber-500 text-gray-900 font-bold py-2 px-6 rounded-lg hover:bg-amber-400 transition-colors"
                    >
                        Entendido
                    </button>
                 )}
            </div>
        </div>
    );
};

export default SOSModal;

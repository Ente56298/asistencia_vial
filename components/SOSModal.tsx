import React, { useState, useEffect } from 'react';
import { getEmergencyResponse } from '../services/geminiService';
import SpinnerIcon from './icons/SpinnerIcon';
import SecurityIcon from './icons/SecurityIcon';

interface SOSModalProps {
    onClose: () => void;
    onSOSConfirmed: () => void;
}

const SOSModal: React.FC<SOSModalProps> = ({ onClose, onSOSConfirmed }) => {
    const [status, setStatus] = useState<'counting' | 'sending' | 'confirmed'>('counting');
    const [countdown, setCountdown] = useState(3);
    const [responseMessage, setResponseMessage] = useState<string>('');
    const [error, setError] = useState<string>('');

    const safetyTips = [
        "Encienda sus luces intermitentes para alertar a otros conductores.",
        "Si es seguro, permanezca dentro de su vehículo con el cinturón puesto.",
        "Aléjese del flujo vehicular si necesita salir del auto.",
    ];

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
        if (status === 'counting') {
            if (countdown > 0) {
                const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
                return () => clearTimeout(timer);
            } else {
                setStatus('sending');
            }
        }
    }, [status, countdown]);

    useEffect(() => {
        if (status === 'sending') {
            const fetchResponse = async () => {
                try {
                    const message = await getEmergencyResponse();
                    setResponseMessage(message);
                    setStatus('confirmed');
                    // We no longer call onSOSConfirmed automatically.
                    // The user will click the button to proceed.
                } catch (e) {
                    setError('No se pudo conectar al servicio de emergencia. Intente llamar a las autoridades locales.');
                    setStatus('confirmed');
                }
            };
            fetchResponse();
        }
    }, [status, onSOSConfirmed]);

    const renderContent = () => {
        switch (status) {
            case 'counting':
                return (
                    <>
                        <h2 className="text-2xl font-bold mb-2 text-white">Confirmando Alerta SOS</h2>
                        <p className="text-gray-300 mb-4 text-sm">La ayuda será notificada en...</p>
                        <div className="text-8xl font-mono font-bold text-red-400">{countdown}</div>
                        
                        <div className="mt-6 w-full max-w-sm p-4 bg-gray-800/50 rounded-lg border border-amber-500/30">
                            <div className="flex items-start">
                                <div className="w-8 h-8 mr-3 text-amber-400 flex-shrink-0">
                                    <SecurityIcon />
                                </div>
                                <div>
                                    <h3 className="font-bold text-amber-400 text-sm">Consejo de Seguridad:</h3>
                                    {/* The key forces a re-render, allowing the animation to replay */}
                                    <p key={countdown} className="text-gray-200 text-sm animate-simple-fade-in">
                                        {safetyTips[3 - countdown]}
                                    </p>
                                </div>
                            </div>
                        </div>
                        
                        <button
                            onClick={onClose}
                            onMouseDown={handleMouseDown}
                            className="mt-6 bg-gray-600 text-white font-bold py-2 px-6 rounded-lg hover:bg-gray-500 transition-colors ripple-effect"
                        >
                            Cancelar Envío
                        </button>
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
                <button
                    onClick={onClose}
                    onMouseDown={handleMouseDown}
                    className="absolute -top-4 -right-4 bg-gray-700 text-white rounded-full w-10 h-10 flex items-center justify-center hover:bg-gray-600 transition-colors z-10 ripple-effect"
                    aria-label="Cerrar"
                >
                    &times;
                </button>
                {renderContent()}
                 {status === 'confirmed' && (
                     <button
                        onClick={onSOSConfirmed}
                        onMouseDown={handleMouseDown}
                        className="mt-8 bg-amber-500 text-gray-900 font-bold py-2 px-6 rounded-lg hover:bg-amber-400 transition-colors ripple-effect"
                    >
                        Monitorear Unidad
                    </button>
                 )}
            </div>
        </div>
    );
};

export default SOSModal;
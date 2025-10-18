import React, { useState, useEffect } from 'react';
import { Partner } from '../types';
import { getPartners } from '../services/authService';
import SpinnerIcon from './icons/SpinnerIcon';
import OxxoIcon from './icons/OxxoIcon';
import PemexIcon from './icons/PemexIcon';
import AutozoneIcon from './icons/AutozoneIcon';

interface PartnersPanelProps {
    onClose: () => void;
}

const iconMap: { [key: string]: React.FC } = {
    OxxoIcon,
    PemexIcon,
    AutozoneIcon,
};

const PartnersPanel: React.FC<PartnersPanelProps> = ({ onClose }) => {
    const [partners, setPartners] = useState<Partner[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

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
        const fetchPartners = async () => {
            try {
                setIsLoading(true);
                setError(null);
                const fetchedPartners = await getPartners();
                setPartners(fetchedPartners);
            } catch (err) {
                setError("No se pudieron cargar los convenios. Intente más tarde.");
                console.error(err);
            } finally {
                setIsLoading(false);
            }
        };
        fetchPartners();
    }, []);

    const renderContent = () => {
        if (isLoading) {
            return <div className="flex justify-center items-center h-full"><SpinnerIcon className="w-12 h-12 text-purple-400" /></div>;
        }

        if (error) {
            return <div className="text-center text-red-400 p-4">{error}</div>;
        }

        if (partners.length === 0) {
            return <div className="text-center text-gray-400 p-4">No hay convenios disponibles en este momento.</div>;
        }

        return (
            <div className="space-y-6">
                {partners.map((partner) => {
                    const IconComponent = iconMap[partner.icon] || OxxoIcon; // Fallback icon
                    return (
                        <a
                            key={partner.id}
                            href={partner.website}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="block bg-gray-800 p-6 rounded-xl shadow-md transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/20 hover:ring-2 hover:ring-purple-600"
                            aria-label={`Visitar el sitio web de ${partner.name}`}
                        >
                            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                                <div className="flex items-start flex-1 min-w-0">
                                    <div className="h-16 w-16 flex-shrink-0 flex items-center justify-center mr-5 bg-gray-700 rounded-lg p-1">
                                        <IconComponent />
                                    </div>
                                    <div className="flex-1 min-w-0">
                                        <h3 className="font-bold text-xl text-white">{partner.name}</h3>
                                        <p className="text-sm font-semibold uppercase tracking-wider text-purple-400 mt-1">{partner.category}</p>
                                        {partner.description && (
                                            <p className="text-sm text-gray-300 mt-2 whitespace-normal">{partner.description}</p>
                                        )}
                                    </div>
                                </div>
                                <div className="w-full sm:w-auto text-center flex-shrink-0 bg-amber-500/10 border border-amber-500/20 text-amber-300 font-bold py-2 px-4 rounded-full text-sm mt-4 sm:mt-0">
                                    <span>{partner.discount}</span>
                                </div>
                            </div>
                        </a>
                    );
                })}
            </div>
        );
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-40 p-4">
            <div className="relative w-full max-w-3xl h-[90vh] bg-gray-900/80 border border-purple-500/30 rounded-2xl shadow-2xl flex flex-col">
                <header className="relative p-6 border-b border-gray-700 flex justify-center items-center">
                    <h2 className="text-3xl font-bold text-purple-400">Socios y Convenios</h2>
                    <button
                        onClick={onClose}
                        onMouseDown={handleMouseDown}
                        className="absolute right-4 top-1/2 -translate-y-1/2 bg-gray-700 text-white rounded-full w-9 h-9 flex items-center justify-center hover:bg-gray-600 transition-colors ripple-effect"
                        aria-label="Cerrar"
                    >
                        &times;
                    </button>
                </header>
                <main className="p-6 flex-grow overflow-y-auto">
                    {renderContent()}
                </main>
            </div>
        </div>
    );
};

export default PartnersPanel;
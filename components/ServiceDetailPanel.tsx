import React from 'react';
import { Service } from '../types';
import GasStationIcon from './icons/GasStationIcon';
import RouteIcon from './icons/RouteIcon';

interface ServiceDetailPanelProps {
    service: Service;
    onClose: () => void;
    onSaveToRoute: (service: Service) => void;
}

const ServiceDetailPanel: React.FC<ServiceDetailPanelProps> = ({ service, onClose, onSaveToRoute }) => {
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

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-40 p-4">
            <div className="relative w-full max-w-lg bg-gray-900/80 border border-indigo-500/30 rounded-2xl shadow-2xl flex flex-col">
                <header className="p-4 border-b border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-indigo-400 flex items-center">
                        <div className="w-6 h-6 mr-3"><GasStationIcon /></div>
                        Detalles del Servicio
                    </h2>
                    <button onClick={onClose} onMouseDown={handleMouseDown} className="bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600 transition-colors ripple-effect" aria-label="Cerrar">&times;</button>
                </header>
                
                <main className="p-6 space-y-4">
                    <div>
                        <h3 className="text-2xl font-bold text-white">{service.nombre}</h3>
                        <p className="text-indigo-300 font-semibold">{service.tipo}</p>
                    </div>
                    <div className="text-gray-300 space-y-2">
                        <p>
                            <span className="font-semibold text-gray-400">Ubicación: </span>
                            {service.ubicacion_aproximada}
                        </p>
                        {service.telefono && (
                            <p>
                                <span className="font-semibold text-gray-400">Teléfono: </span>
                                <a href={`tel:${service.telefono}`} className="text-cyan-400 hover:underline">{service.telefono}</a>
                            </p>
                        )}
                         <p>
                            <span className="font-semibold text-gray-400">Coordenadas: </span>
                            {service.latitud.toFixed(4)}, {service.longitud.toFixed(4)}
                        </p>
                    </div>
                </main>

                <footer className="p-4 border-t border-gray-700 bg-gray-900/50">
                     <button 
                        onClick={() => onSaveToRoute(service)}
                        onMouseDown={handleMouseDown}
                        className="w-full bg-indigo-500 text-white font-bold py-3 px-4 rounded-md hover:bg-indigo-400 flex items-center justify-center gap-2 transition-colors ripple-effect"
                    >
                        <div className="w-5 h-5"><RouteIcon /></div>
                        Añadir a la Ruta
                    </button>
                </footer>
            </div>
        </div>
    );
};

export default ServiceDetailPanel;
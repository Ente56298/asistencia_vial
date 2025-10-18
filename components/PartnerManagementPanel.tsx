import React, { useState, useEffect } from 'react';
import { Partner } from '../types';
import { getPartners, addPartner, updatePartner, deletePartner } from '../services/authService';
import SpinnerIcon from './icons/SpinnerIcon';
import HandshakeIcon from './icons/HandshakeIcon';
import OxxoIcon from './icons/OxxoIcon';
import PemexIcon from './icons/PemexIcon';
import AutozoneIcon from './icons/AutozoneIcon';

const iconMap: { [key: string]: React.FC } = {
    OxxoIcon,
    PemexIcon,
    AutozoneIcon,
};

const PartnerManagementPanel: React.FC = () => {
    const [partners, setPartners] = useState<Partner[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [currentPartner, setCurrentPartner] = useState<Partial<Partner> | null>(null);

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

    const fetchPartners = async () => {
        setIsLoading(true);
        try {
            const fetchedPartners = await getPartners();
            setPartners(fetchedPartners);
        } catch (error) {
            console.error("Failed to fetch partners:", error);
        }
        setIsLoading(false);
    };

    useEffect(() => {
        fetchPartners();
    }, []);

    const handleCreateNew = () => {
        setCurrentPartner({
            name: '',
            category: '',
            description: '',
            discount: '',
            website: '',
            icon: Object.keys(iconMap)[0] || '', // Default to the first icon
        });
        setIsEditing(true);
    };

    const handleEdit = (partner: Partner) => {
        setCurrentPartner(partner);
        setIsEditing(true);
    };

    const handleCancel = () => {
        setIsEditing(false);
        setCurrentPartner(null);
    };

    const handleDelete = async (partnerId: string) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este socio?')) {
            try {
                await deletePartner(partnerId);
                fetchPartners();
            } catch (error) {
                console.error("Failed to delete partner:", error);
                alert("Error al eliminar el socio.");
            }
        }
    };

    const handleSave = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!currentPartner) return;

        try {
            if (currentPartner.id) {
                await updatePartner(currentPartner as Partner);
            } else {
                await addPartner(currentPartner as Omit<Partner, 'id'>);
            }
            fetchPartners();
            handleCancel();
        } catch (error) {
            console.error("Failed to save partner:", error);
            alert("Error al guardar el socio.");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
        if (!currentPartner) return;
        const { name, value } = e.target;
        setCurrentPartner({ ...currentPartner, [name]: value });
    };

    if (isLoading) {
        return <div className="flex justify-center items-center h-full"><SpinnerIcon className="w-10 h-10 text-indigo-400" /></div>;
    }

    if (isEditing && currentPartner) {
        return (
            <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-white mb-4">{currentPartner.id ? 'Editar Socio' : 'Crear Nuevo Socio'}</h3>
                <form onSubmit={handleSave} className="space-y-4 max-w-lg mx-auto">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-gray-300">Nombre</label>
                            <input type="text" name="name" value={currentPartner.name} onChange={handleInputChange} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:ring-indigo-500 focus:border-indigo-500"/>
                        </div>
                        <div>
                            <label htmlFor="category" className="block text-sm font-medium text-gray-300">Categoría</label>
                            <input type="text" name="category" value={currentPartner.category} onChange={handleInputChange} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:ring-indigo-500 focus:border-indigo-500"/>
                        </div>
                         <div>
                            <label htmlFor="discount" className="block text-sm font-medium text-gray-300">Descuento</label>
                            <input type="text" name="discount" value={currentPartner.discount} onChange={handleInputChange} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:ring-indigo-500 focus:border-indigo-500"/>
                        </div>
                        <div>
                            <label htmlFor="icon" className="block text-sm font-medium text-gray-300">Icono</label>
                            <select name="icon" value={currentPartner.icon} onChange={handleInputChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:ring-indigo-500 focus:border-indigo-500">
                                {Object.keys(iconMap).map(iconName => <option key={iconName} value={iconName}>{iconName}</option>)}
                            </select>
                        </div>
                    </div>
                     <div>
                        <label htmlFor="website" className="block text-sm font-medium text-gray-300">Sitio Web (URL)</label>
                        <input type="url" name="website" value={currentPartner.website} onChange={handleInputChange} required className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:ring-indigo-500 focus:border-indigo-500"/>
                    </div>
                    <div>
                        <label htmlFor="description" className="block text-sm font-medium text-gray-300">Descripción</label>
                        <textarea name="description" rows={3} value={currentPartner.description || ''} onChange={handleInputChange} className="mt-1 block w-full bg-gray-700 border-gray-600 rounded-md shadow-sm py-2 px-3 text-white focus:ring-indigo-500 focus:border-indigo-500"/>
                    </div>
                    <div className="flex justify-end gap-3 pt-4">
                        <button type="button" onClick={handleCancel} onMouseDown={handleMouseDown} className="bg-gray-600 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-500 ripple-effect">Cancelar</button>
                        <button type="submit" onMouseDown={handleMouseDown} className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-500 ripple-effect">Guardar</button>
                    </div>
                </form>
            </div>
        );
    }

    return (
        <div className="bg-gray-800 p-6 rounded-lg">
            <div className="flex justify-between items-center mb-4">
                <h3 className="text-lg font-bold text-white">Administrar Socios Comerciales</h3>
                <button onClick={handleCreateNew} onMouseDown={handleMouseDown} className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-500 ripple-effect">
                    Añadir Socio
                </button>
            </div>
            <div className="space-y-4">
                {partners.map(partner => {
                    const IconComponent = iconMap[partner.icon] || null;
                    return (
                        <div key={partner.id} className="bg-gray-700 p-4 rounded-lg">
                            <div className="flex justify-between items-start">
                                <div className="flex items-center gap-4">
                                    <div className="w-12 h-12 flex-shrink-0 bg-gray-600 rounded-md flex items-center justify-center p-1">
                                        {IconComponent && <IconComponent />}
                                    </div>
                                    <div>
                                        <h4 className="font-bold text-white text-lg">{partner.name}</h4>
                                        <p className="text-sm text-gray-400 mt-1">{partner.category}</p>
                                    </div>
                                </div>
                                <div className="flex items-center space-x-3">
                                    <span className="px-2 py-1 text-xs font-medium rounded-full bg-amber-500/20 text-amber-300 ring-1 ring-inset ring-amber-500/30">
                                        {partner.discount}
                                    </span>
                                    <button onClick={() => handleEdit(partner)} onMouseDown={handleMouseDown} className="text-sm text-indigo-400 hover:text-indigo-300 ripple-effect">Editar</button>
                                    <button onClick={() => handleDelete(partner.id)} onMouseDown={handleMouseDown} className="text-sm text-red-400 hover:text-red-300 ripple-effect">Eliminar</button>
                                </div>
                            </div>
                        </div>
                    );
                })}
            </div>
        </div>
    );
};

export default PartnerManagementPanel;
import React, { useState } from 'react';
import { Giro } from '../types';
import { initialGiros } from '../data/giroTemplates';
import BriefcaseIcon from './icons/BriefcaseIcon';
import CubeIcon from './icons/CubeIcon';
import Giro3DViewPanel from './Giro3DViewPanel';
import { EditGiroForm } from './giro/EditGiroForm';
import { CreateGiroForm } from './giro/CreateGiroForm';
import { GiroListView } from './giro/GiroListView';

type ViewMode = 'list' | 'create' | 'edit';

const GiroManagementPanel: React.FC = () => {
    const [giros, setGiros] = useState<Giro[]>(initialGiros);
    const [viewMode, setViewMode] = useState<ViewMode>('list');
    const [editingGiro, setEditingGiro] = useState<Giro | null>(null);
    const [viewingGiro3D, setViewingGiro3D] = useState<Giro | null>(null);

    const handleCreate = (giroData: Omit<Giro, 'id'>) => {
        const newGiro = { ...giroData, id: String(Date.now()) };
        setGiros([...giros, newGiro]);
        setViewMode('list');
    };

    const handleEdit = (giro: Giro) => {
        setEditingGiro(giro);
        setViewMode('edit');
    };

    const handleUpdate = (giro: Giro) => {
        setGiros(giros.map(g => g.id === giro.id ? giro : g));
        setViewMode('list');
        setEditingGiro(null);
    };

    const handleDelete = (giroId: string) => {
        if (window.confirm('¿Estás seguro de que quieres eliminar este giro?')) {
            setGiros(giros.filter(g => g.id !== giroId));
        }
    };

    const handleCancel = () => {
        setViewMode('list');
        setEditingGiro(null);
    };

    if (viewMode === 'create') {
        return (
            <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-white mb-4">Crear Nuevo Giro</h3>
                <CreateGiroForm onSave={handleCreate} onCancel={handleCancel} />
            </div>
        );
    }

    if (viewMode === 'edit' && editingGiro) {
        return (
            <div className="bg-gray-800 p-6 rounded-lg">
                <h3 className="text-lg font-bold text-white mb-4">Editar Giro</h3>
                <EditGiroForm giro={editingGiro} onSave={handleUpdate} onCancel={handleCancel} />
            </div>
        );
    }
    
    return (
        <>
            <div className="bg-gray-800 p-6 rounded-lg">
                <div className="flex justify-between items-center mb-4">
                    <h3 className="text-lg font-bold text-white">Administrar Giros de Negocio</h3>
                    <button onClick={() => setViewMode('create')} className="bg-indigo-600 text-white font-bold py-2 px-4 rounded-md hover:bg-indigo-500">
                        Crear Nuevo
                    </button>
                </div>
                <GiroListView
                    giros={giros}
                    onEdit={handleEdit}
                    onView3D={setViewingGiro3D}
                    onDelete={handleDelete}
                />
            </div>
            {viewingGiro3D && (
                <Giro3DViewPanel giro={viewingGiro3D} onClose={() => setViewingGiro3D(null)} />
            )}
        </>
    );
};

export default GiroManagementPanel;
import React, { useState, useEffect, useMemo } from 'react';
import { Giro, Entity, EntityType, Vector2, FloorPlanArea } from '../types';
import CameraIcon from './icons/CameraIcon';

interface Giro3DViewPanelProps {
    giro: Giro;
    onClose: () => void;
}

const EntityComponent: React.FC<{ entity: Entity }> = ({ entity }) => {
    const [showTooltip, setShowTooltip] = useState(false);
    
    const style: React.CSSProperties = {
        left: `${entity.position.x}px`,
        top: `${entity.position.y}px`,
        transition: 'left 0.5s linear, top 0.5s linear',
    };

    const renderEntity = () => {
        switch (entity.type) {
            case EntityType.Individual:
                return <div className="w-4 h-4 rounded-full border-2 border-white shadow-lg" style={{ backgroundColor: entity.color }}></div>;
            case EntityType.Camera:
                return <div className="w-6 h-6 text-gray-300"><CameraIcon /></div>;
            case EntityType.Access:
                const color = entity.status === 'open' ? 'bg-green-500' : 'bg-red-500';
                return <div className={`w-3 h-5 rounded-sm border border-gray-400 ${color}`}></div>;
        }
    };
    
    const getTooltipContent = () => {
        let content = `ID: ${entity.label}`;
        if (entity.role) content += `\nRol: ${entity.role}`;
        if (entity.status) content += `\nEstado: ${entity.status}`;
        return content;
    }

    return (
        <div 
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer" 
            style={style}
            onMouseEnter={() => setShowTooltip(true)}
            onMouseLeave={() => setShowTooltip(false)}
        >
            {renderEntity()}
            {showTooltip && (
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-max p-2 text-xs text-white bg-gray-900/80 border border-gray-600 rounded-md shadow-lg whitespace-pre-wrap">
                    {getTooltipContent()}
                </div>
            )}
        </div>
    );
};


const Giro3DViewPanel: React.FC<Giro3DViewPanelProps> = ({ giro, onClose }) => {
    const { floorPlan } = giro;
    const [entities, setEntities] = useState<Entity[]>(floorPlan?.entities || []);

    const areaMap = useMemo(() => {
        const map = new Map<string, FloorPlanArea>();
        floorPlan?.areas.forEach(area => map.set(area.id, area));
        return map;
    }, [floorPlan?.areas]);

    useEffect(() => {
        const simulationInterval = setInterval(() => {
            setEntities(prevEntities => {
                return prevEntities.map(entity => {
                    // Simulate individual movement
                    if (entity.type === EntityType.Individual) {
                        const area = areaMap.get(entity.areaId);
                        if (!area) return entity;

                        const newPos: Vector2 = { ...entity.position };
                        const moveX = (Math.random() - 0.5) * 10;
                        const moveY = (Math.random() - 0.5) * 10;
                        
                        newPos.x = Math.max(area.position.x, Math.min(area.position.x + area.size.x - 5, newPos.x + moveX));
                        newPos.y = Math.max(area.position.y, Math.min(area.position.y + area.size.y - 5, newPos.y + moveY));

                        return { ...entity, position: newPos };
                    }
                    // Simulate access point status change
                    if (entity.type === EntityType.Access) {
                         if (Math.random() < 0.1) { // 10% chance to toggle
                            return { ...entity, status: entity.status === 'open' ? 'closed' : 'open' };
                         }
                    }
                    return entity;
                });
            });
        }, 2000);

        return () => clearInterval(simulationInterval);
    }, [areaMap]);

    if (!floorPlan) {
        return (
            <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-50 p-4">
                <div className="text-white text-center">No hay un plano disponible para este giro.</div>
                 <button onClick={onClose} className="absolute top-4 right-4 bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600 transition-colors">&times;</button>
            </div>
        );
    }
    
    return (
        <div className="fixed inset-0 bg-black/90 flex items-center justify-center z-50 p-4" style={{ perspective: '1200px' }}>
             <div className="relative w-full max-w-5xl h-[90vh] bg-gray-900/80 border border-cyan-500/30 rounded-2xl shadow-2xl flex flex-col">
                <header className="p-4 border-b border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-cyan-400">Vista 3D: {giro.name}</h2>
                    <button onClick={onClose} className="bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600 transition-colors">&times;</button>
                </header>
                <main className="flex-grow p-6 flex items-center justify-center overflow-hidden">
                    <div 
                        className="relative border-2 border-gray-600" 
                        style={{ 
                            width: `${floorPlan.width}px`, 
                            height: `${floorPlan.height}px`,
                            transform: 'rotateX(55deg) scale(0.9)',
                            transformStyle: 'preserve-3d',
                        }}
                    >
                        {floorPlan.areas.map(area => (
                             <div 
                                key={area.id} 
                                className="absolute border border-gray-500 flex items-center justify-center"
                                style={{
                                    left: `${area.position.x}px`,
                                    top: `${area.position.y}px`,
                                    width: `${area.size.x}px`,
                                    height: `${area.size.y}px`,
                                    backgroundColor: area.backgroundColor,
                                }}
                             >
                                <span className="text-white font-semibold text-sm opacity-70" style={{ transform: 'rotateX(-55deg) translateY(-20px)' }}>{area.label}</span>
                             </div>
                        ))}
                        {entities.map(entity => (
                            <EntityComponent key={entity.id} entity={entity} />
                        ))}
                    </div>
                </main>
             </div>
        </div>
    );
};

export default Giro3DViewPanel;

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
        transition: 'left 100ms linear, top 100ms linear', // Match the simulation interval
    };

    const renderEntity = () => {
        switch (entity.type) {
            case EntityType.Individual:
                return <div className="w-4 h-4 rounded-full border-2 border-white shadow-lg" style={{ backgroundColor: entity.color }}></div>;
            case EntityType.Camera:
                return <div className="w-6 h-6 text-gray-300"><CameraIcon /></div>;
            case EntityType.Access:
                const accessClasses = entity.status === 'open' 
                    ? 'bg-green-500 scale-y-90' 
                    : 'bg-red-500 scale-y-100';
                return <div className={`w-3 h-5 rounded-sm border border-gray-400 transform transition-all duration-300 ${accessClasses}`}></div>;
        }
    };
    
    const getTooltipContent = () => {
        let content = `ID: ${entity.label}`;
        // FIX: Use type guards to safely access properties 'role' and 'status' which are not present on all types within the 'Entity' union.
        if (entity.type === EntityType.Individual) {
            content += `\nRol: ${entity.role}`;
        } else {
            content += `\nEstado: ${entity.status}`;
        }
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


type SimulatedEntity = Entity & {
  vx?: number;
  vy?: number;
};


const Giro3DViewPanel: React.FC<Giro3DViewPanelProps> = ({ giro, onClose }) => {
    const { floorPlan } = giro;
    const [simulatedEntities, setSimulatedEntities] = useState<SimulatedEntity[]>([]);

    const areaMap = useMemo(() => {
        const map = new Map<string, FloorPlanArea>();
        floorPlan?.areas.forEach(area => map.set(area.id, area));
        return map;
    }, [floorPlan?.areas]);

    useEffect(() => {
        const initialEntities = giro.floorPlan?.entities.map(e => {
            if (e.type === EntityType.Individual) {
                return {
                    ...e,
                    vx: (Math.random() - 0.5) * 2,
                    vy: (Math.random() - 0.5) * 2,
                };
            }
            return e;
        }) || [];
        setSimulatedEntities(initialEntities);
    }, [giro.floorPlan?.entities]);


    useEffect(() => {
        const simulationInterval = setInterval(() => {
            setSimulatedEntities(prevEntities => {
                return prevEntities.map(entity => {
                    // Simulate individual movement
                    if (entity.type === EntityType.Individual && typeof entity.vx === 'number' && typeof entity.vy === 'number') {
                        const area = areaMap.get(entity.areaId);
                        if (!area) return entity;

                        let newVx = entity.vx;
                        let newVy = entity.vy;
                        
                        let newX = entity.position.x + newVx;
                        let newY = entity.position.y + newVy;
                        
                        const padding = 5; // To avoid entities sticking to the walls
                        const minX = area.position.x + padding;
                        const maxX = area.position.x + area.size.x - padding;
                        const minY = area.position.y + padding;
                        const maxY = area.position.y + area.size.y - padding;

                        if (newX < minX || newX > maxX) {
                            newVx = -newVx;
                            newX = entity.position.x + newVx;
                        }
                        if (newY < minY || newY > maxY) {
                            newVy = -newVy;
                            newY = entity.position.y + newVy;
                        }
                        
                        newVx += (Math.random() - 0.5) * 0.1;
                        newVy += (Math.random() - 0.5) * 0.1;
                        
                        const maxSpeed = 1.5;
                        const speed = Math.sqrt(newVx * newVx + newVy * newVy);
                        if (speed > maxSpeed) {
                            newVx = (newVx / speed) * maxSpeed;
                            newVy = (newVy / speed) * maxSpeed;
                        }

                        return { ...entity, position: { x: newX, y: newY }, vx: newVx, vy: newVy };
                    }
                    // Simulate access point status change
                    if (entity.type === EntityType.Access) {
                         if (Math.random() < 0.05) { // 5% chance to toggle
                            return { ...entity, status: entity.status === 'open' ? 'closed' : 'open' };
                         }
                    }
                    return entity;
                });
            });
        }, 100); // Faster interval for smoother animation

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
                        {simulatedEntities.map(entity => (
                            <EntityComponent key={entity.id} entity={entity} />
                        ))}
                    </div>
                </main>
             </div>
        </div>
    );
};

export default Giro3DViewPanel;
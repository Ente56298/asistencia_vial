

import React, { useState, useEffect } from 'react';
import { Feature } from '../types';
import { getSituationAnalysis, AgentContext } from '../services/geminiService';
import SpinnerIcon from './icons/SpinnerIcon';
import TrafficIcon from './icons/TrafficIcon';
import WeatherIcon from './icons/WeatherIcon';
import InfrastructureIcon from './icons/InfrastructureIcon';
import SecurityIcon from './icons/SecurityIcon';

interface SituationAnalysisPanelProps {
    onClose: () => void;
    onNavigate: (feature: Feature) => void;
}

type AgentName = 'traffic' | 'weather' | 'infrastructure' | 'safety';
type AnalysisStatus = 'idle' | 'analyzing' | 'complete' | 'error';
type AgentStatus = 'pending' | 'analyzing' | 'complete';

interface AgentReport {
    status: AgentStatus;
    report: string;
}

const agentConfig = {
    traffic: { name: 'Agente de Tráfico', icon: <TrafficIcon />, delay: 1000 },
    weather: { name: 'Agente de Clima', icon: <WeatherIcon />, delay: 2500 },
    infrastructure: { name: 'Agente de Infraestructura', icon: <InfrastructureIcon />, delay: 4000 },
    safety: { name: 'Agente de Seguridad', icon: <SecurityIcon />, delay: 5500 },
};

const AgentCard: React.FC<{ name: string; icon: React.ReactNode; status: AgentStatus; report: string; }> = ({ name, icon, status, report }) => {
    return (
        <div className={`bg-gray-800 p-4 rounded-lg flex items-center transition-all duration-500 ${status === 'pending' ? 'opacity-50' : 'opacity-100'}`}>
            <div className="w-8 h-8 mr-4 text-teal-400 flex-shrink-0">{icon}</div>
            <div className="flex-grow">
                <h4 className="font-bold text-white">{name}</h4>
                <div className="text-sm h-5">
                    {status === 'analyzing' && <span className="text-gray-400 flex items-center"><SpinnerIcon className="w-4 h-4 mr-2" /> Analizando...</span>}
                    {status === 'complete' && <span className="text-gray-300">{report}</span>}
                </div>
            </div>
             {status === 'complete' && <div className="w-5 h-5 text-green-400 ml-2">✓</div>}
        </div>
    );
};

const SituationAnalysisPanel: React.FC<SituationAnalysisPanelProps> = ({ onClose, onNavigate }) => {
    const [userInput, setUserInput] = useState('');
    const [status, setStatus] = useState<AnalysisStatus>('idle');
    const [agentReports, setAgentReports] = useState<Record<AgentName, AgentReport>>({
        traffic: { status: 'pending', report: '' },
        weather: { status: 'pending', report: '' },
        infrastructure: { status: 'pending', report: '' },
        safety: { status: 'pending', report: '' },
    });
    const [finalReport, setFinalReport] = useState<string>('');
    const [error, setError] = useState<string | null>(null);

    // Simulate agent analysis
    useEffect(() => {
        if (status !== 'analyzing') return;

        const mockReports: Record<AgentName, string> = {
            traffic: "Tráfico fluido con tráfico pesado intermitente.",
            weather: "Condiciones despejadas, temperatura de 28°C, buena visibilidad.",
            infrastructure: "Autopista de 4 carriles con acotamiento pavimentado. La gasolinera más cercana está a 15 km.",
            safety: "Zona de alta velocidad. Se recomienda extrema precaución fuera del vehículo."
        };
        
        Object.keys(agentConfig).forEach(key => {
            const agentKey = key as AgentName;
            
            // Start analysis
            setTimeout(() => {
                setAgentReports(prev => ({ ...prev, [agentKey]: { ...prev[agentKey], status: 'analyzing' }}));
            }, agentConfig[agentKey].delay - 500);

            // Complete analysis
            setTimeout(() => {
                setAgentReports(prev => ({ ...prev, [agentKey]: { status: 'complete', report: mockReports[agentKey] }}));
            }, agentConfig[agentKey].delay);
        });

        // After all agents finish, call the coordinator
        setTimeout(async () => {
            try {
                const context: AgentContext = {
                    traffic: mockReports.traffic,
                    weather: mockReports.weather,
                    infrastructure: mockReports.infrastructure,
                    safety: mockReports.safety
                };
                const response = await getSituationAnalysis(userInput, context);
                setFinalReport(response);
                setStatus('complete');
            } catch (err: any) {
                setError(err.message || 'Error al generar el reporte final.');
                setStatus('error');
            }
        }, agentConfig.safety.delay + 1000);

    }, [status, userInput]);


    const handleStartAnalysis = (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim()) return;
        setStatus('analyzing');
        setError(null);
    };
    
    const formatFinalReport = (report: string) => {
        return report
            .split('\n')
            .map((line, index) => {
                if (line.startsWith('**') && line.endsWith('**')) {
                    return <h3 key={index} className="font-bold text-teal-400 mt-4 mb-2 text-lg">{line.replace(/\*\*/g, '')}</h3>;
                }
                if (line.trim().startsWith('-')) {
                     return <li key={index} className="text-gray-300">{line.trim().substring(1).trim()}</li>;
                }
                return <p key={index} className="text-gray-200 mb-2">{line}</p>;
            })
            .reduce<React.ReactElement[]>((acc, elem) => {
                if (elem.type === 'li') {
                    const lastElement = acc[acc.length - 1];
                    if (lastElement && lastElement.type === 'ul') {
                        // FIX: Cast `lastElement.props` to access `children` safely.
                        // The `props` on a generic ReactElement can be of type `unknown` in some strict TypeScript configurations.
                        const newChildren = [...React.Children.toArray((lastElement.props as { children?: React.ReactNode }).children), elem];
                        const newUl = React.cloneElement(lastElement, {}, ...newChildren);
                        acc[acc.length - 1] = newUl;
                    } else {
                         acc.push(<ul key={`ul-${acc.length}`} className="list-disc list-inside space-y-1 pl-2">{[elem]}</ul>);
                    }
                } else {
                    acc.push(elem);
                }
                return acc;
            }, []);
    };


    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-40 p-4">
            <div className="relative w-full max-w-2xl h-[90vh] bg-gray-900/80 border border-teal-500/30 rounded-2xl shadow-2xl flex flex-col">
                <header className="p-4 border-b border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-teal-400">Análisis de Situación en Tiempo Real</h2>
                    <button onClick={onClose} className="bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600 transition-colors">&times;</button>
                </header>

                <div className="p-6 flex-grow overflow-y-auto">
                    {status === 'idle' && (
                         <form onSubmit={handleStartAnalysis} className="flex flex-col h-full">
                            <h3 className="text-lg font-semibold text-white mb-2">Describa su situación</h3>
                            <p className="text-sm text-gray-400 mb-4">Proporcione un breve resumen de su problema para que los agentes puedan evaluar el contexto. (Ej: "Tengo una llanta ponchada", "El auto se sobrecalentó", "Hubo un pequeño choque")</p>
                            <textarea
                                value={userInput}
                                onChange={(e) => setUserInput(e.target.value)}
                                className="flex-grow bg-gray-800 border border-gray-600 rounded-md p-3 text-white focus:ring-teal-500 focus:border-teal-500"
                                placeholder="Escriba aquí..."
                                rows={6}
                            />
                            <button type="submit" className="mt-4 w-full bg-teal-500 text-gray-900 font-bold py-3 px-4 rounded-md hover:bg-teal-400 disabled:bg-teal-800 disabled:cursor-not-allowed" disabled={!userInput.trim()}>
                                Comenzar Análisis
                            </button>
                        </form>
                    )}

                    {(status === 'analyzing' || status === 'complete' || status === 'error') && (
                        <div className="space-y-4">
                            <div>
                               <h3 className="text-lg font-semibold text-white mb-2">Reporte del Usuario:</h3>
                               <p className="text-gray-300 bg-gray-800 p-3 rounded-lg">"{userInput}"</p>
                            </div>
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
                                {Object.keys(agentConfig).map(key => {
                                    const agentKey = key as AgentName;
                                    return <AgentCard key={agentKey} name={agentConfig[agentKey].name} icon={agentConfig[agentKey].icon} status={agentReports[agentKey].status} report={agentReports[agentKey].report} />
                                })}
                            </div>

                            <hr className="border-gray-700 my-6" />

                            {status === 'analyzing' && (
                                <div className="text-center text-gray-400 flex flex-col items-center">
                                    <SpinnerIcon className="w-8 h-8 mb-2" />
                                    <span>El Agente Coordinador está sintetizando los datos...</span>
                                </div>
                            )}

                             {status === 'error' && <div className="text-center text-red-400 p-4 bg-red-900/50 rounded-lg">{error}</div>}

                            {status === 'complete' && finalReport && (
                                <div className="bg-gray-800/50 p-4 rounded-lg">
                                    {formatFinalReport(finalReport)}
                                    <div className="mt-6 flex gap-4">
                                        <button onClick={() => onNavigate(Feature.Assistance)} className="flex-1 bg-amber-500 text-gray-900 font-bold py-2 px-4 rounded-md hover:bg-amber-400">Contactar Asistencia</button>
                                        <button onClick={() => onNavigate(Feature.Services)} className="flex-1 bg-gray-600 text-white font-bold py-2 px-4 rounded-md hover:bg-gray-500">Ver Servicios Cercanos</button>
                                    </div>
                                </div>
                            )}
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default SituationAnalysisPanel;
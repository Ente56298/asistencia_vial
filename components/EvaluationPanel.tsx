import React, { useState, useEffect, useRef } from 'react';
import { Feature, Content } from '../types';
import { getEvaluationResponse } from '../services/geminiService';
import SpinnerIcon from './icons/SpinnerIcon';

interface EvaluationPanelProps {
    onClose: () => void;
    onNavigate: (feature: Feature) => void;
}

const EvaluationPanel: React.FC<EvaluationPanelProps> = ({ onClose, onNavigate }) => {
    const initialMessage = "Hola, soy tu asistente de evaluación. Por favor, describe brevemente tu problema para poder ayudarte.";
    const [history, setHistory] = useState<Content[]>([{ role: 'model', parts: [{ text: initialMessage }] }]);
    const [userInput, setUserInput] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const chatContainerRef = useRef<HTMLDivElement>(null);

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
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
        }
    }, [history]);

    const handleSend = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!userInput.trim() || isLoading) return;

        const newUserContent: Content = { role: 'user', parts: [{ text: userInput }] };
        const updatedHistory = [...history, newUserContent];
        
        setHistory(updatedHistory);
        setUserInput('');
        setIsLoading(true);

        const responseText = await getEvaluationResponse(updatedHistory);
        const newModelContent: Content = { role: 'model', parts: [{ text: responseText }] };

        setHistory(prev => [...prev, newModelContent]);
        setIsLoading(false);
    };
    
    const handleRecommendationClick = (feature: Feature) => {
        onNavigate(feature);
    };

    const renderMessage = (msg: Content, index: number) => {
        const textContent = msg.parts.map(part => part.text).join('');
        const isModel = msg.role === 'model';
        
        const recommendationMap: { [key: string]: Feature } = {
            "Buscar Refacciones": Feature.Parts,
            "Buscar Servicios": Feature.Services,
            "Generar Reporte de Tráfico": Feature.Traffic,
        };

        const recommendationButtons = Object.keys(recommendationMap)
            .filter(rec => textContent.includes(rec))
            .map(rec => (
                <button
                    key={rec}
                    onClick={() => handleRecommendationClick(recommendationMap[rec])}
                    onMouseDown={handleMouseDown}
                    className="mt-2 mr-2 bg-sky-500 text-white font-bold py-1 px-3 rounded-md hover:bg-sky-400 ripple-effect"
                >
                    Ir a {rec}
                </button>
            ));

        return (
            <div key={index} className={`flex ${isModel ? 'justify-start' : 'justify-end'}`}>
                <div className={`max-w-md lg:max-w-lg p-3 rounded-2xl ${isModel ? 'bg-gray-700 text-white rounded-bl-none' : 'bg-sky-600 text-white rounded-br-none'}`}>
                    <p className="text-sm whitespace-pre-wrap">{textContent}</p>
                    {isModel && recommendationButtons.length > 0 && <div className="mt-2">{recommendationButtons}</div>}
                </div>
            </div>
        );
    };

    return (
        <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-40 p-4">
            <div className="relative w-full max-w-2xl h-[90vh] bg-gray-900/80 border border-sky-500/30 rounded-2xl shadow-2xl flex flex-col">
                <header className="p-4 border-b border-gray-700 flex justify-between items-center">
                    <h2 className="text-xl font-bold text-sky-400">Evaluar Situación</h2>
                    <button onClick={onClose} onMouseDown={handleMouseDown} className="bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600 transition-colors ripple-effect">&times;</button>
                </header>

                <div ref={chatContainerRef} className="p-4 flex-grow overflow-y-auto space-y-4">
                    {history.map(renderMessage)}
                    {isLoading && (
                        <div className="flex justify-start">
                             <div className="max-w-md lg:max-w-lg p-3 rounded-2xl bg-gray-700 text-white rounded-bl-none flex items-center">
                                <SpinnerIcon className="w-5 h-5 mr-2" />
                                <span>Pensando...</span>
                            </div>
                        </div>
                    )}
                </div>

                <footer className="p-4 border-t border-gray-700 bg-gray-900/50">
                    <form onSubmit={handleSend} className="flex gap-2">
                        <input 
                            type="text"
                            value={userInput}
                            onChange={(e) => setUserInput(e.target.value)}
                            className="flex-grow bg-gray-700 border border-gray-600 rounded-md px-3 py-2 text-white focus:ring-sky-500 focus:border-sky-500"
                            placeholder="Describe tu problema..."
                            disabled={isLoading}
                        />
                        <button type="submit" onMouseDown={handleMouseDown} className="bg-sky-500 text-white font-bold py-2 px-4 rounded-md hover:bg-sky-400 disabled:bg-sky-800 ripple-effect" disabled={isLoading || !userInput.trim()}>
                            Enviar
                        </button>
                    </form>
                </footer>
            </div>
        </div>
    );
};

export default EvaluationPanel;
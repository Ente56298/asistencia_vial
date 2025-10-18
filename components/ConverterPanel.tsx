import React, { useState, useEffect } from 'react';
import { getConversion } from '../services/geminiService';
import SpinnerIcon from './icons/SpinnerIcon';
import SwapIcon from './icons/SwapIcon';
import ConverterIcon from './icons/ConverterIcon';

type ConversionType = 'currency' | 'length' | 'volume' | 'weight';

const unitOptions: Record<ConversionType, string[]> = {
    currency: ['USD (Dólar Estadounidense)', 'MXN (Peso Mexicano)', 'EUR (Euro)', 'CAD (Dólar Canadiense)'],
    length: ['Metros', 'Kilómetros', 'Millas', 'Pies', 'Pulgadas'],
    volume: ['Litros', 'Galones (US)', 'Mililitros'],
    weight: ['Kilogramos', 'Gramos', 'Libras', 'Onzas'],
};

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

const ConverterPanel: React.FC<{ onClose: () => void }> = ({ onClose }) => {
    const [conversionType, setConversionType] = useState<ConversionType>('currency');
    const [fromUnit, setFromUnit] = useState(unitOptions.currency[0]);
    const [toUnit, setToUnit] = useState(unitOptions.currency[1]);
    const [amount, setAmount] = useState('1');
    const [result, setResult] = useState<string | null>(null);
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Reset units when conversion type changes
        setFromUnit(unitOptions[conversionType][0]);
        setToUnit(unitOptions[conversionType][1]);
        setResult(null);
        setError(null);
        setAmount('1');
    }, [conversionType]);
    
    useEffect(() => {
        // Auto-convert when units or amount change, after a small delay
        if (amount && !isNaN(Number(amount))) {
            const handler = setTimeout(() => {
                handleConversion();
            }, 500);

            return () => {
                clearTimeout(handler);
            };
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [amount, fromUnit, toUnit]);


    const handleSwap = () => {
        const currentToUnit = toUnit;
        setToUnit(fromUnit);
        setFromUnit(currentToUnit);
    };

    const handleConversion = async () => {
        if (!amount || isNaN(Number(amount)) || Number(amount) <= 0) {
            setResult(null);
            return;
        }
        if (fromUnit === toUnit) {
            setResult(Number(amount).toLocaleString('es-MX'));
            return;
        }

        setIsLoading(true);
        setError(null);

        try {
            const conversionResult = await getConversion(Number(amount), fromUnit.split(' ')[0], toUnit.split(' ')[0]);
            const parsedResult = parseFloat(conversionResult);
             if (isNaN(parsedResult)) {
                throw new Error("Respuesta no válida de la API");
            }
            const formattedResult = parsedResult.toLocaleString('es-MX', {
                maximumFractionDigits: 4,
            });
            setResult(formattedResult);
        } catch (err) {
            setError('No se pudo realizar la conversión.');
            setResult(null);
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };
    
    const TabButton: React.FC<{ type: ConversionType; label: string }> = ({ type, label }) => (
        <button
            onClick={() => setConversionType(type)}
            onMouseDown={handleMouseDown}
            className={`flex-1 p-3 text-sm font-semibold transition-colors duration-200 border-b-4 ripple-effect ${
                conversionType === type
                    ? 'border-green-400 text-white'
                    : 'border-transparent text-gray-400 hover:text-white hover:border-gray-500'
            }`}
        >
            {label}
        </button>
    );

    const UnitSelector: React.FC<{ value: string; onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void; options: string[] }> = ({ value, onChange, options }) => (
        <select value={value} onChange={onChange} className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-white focus:ring-green-500 focus:border-green-500">
            {options.map(option => (
                <option key={option} value={option}>{option}</option>
            ))}
        </select>
    );

    return (
         <div className="fixed inset-0 bg-black/80 backdrop-blur-lg flex items-center justify-center z-40 p-4">
            <div className="relative w-full max-w-md bg-gray-900/80 border border-green-500/30 rounded-2xl shadow-2xl flex flex-col">
                <header className="p-4 border-b border-gray-700 flex justify-between items-center">
                     <h2 className="text-xl font-bold text-green-400 flex items-center">
                        <div className="w-6 h-6 mr-3"><ConverterIcon /></div>
                        Conversor de Utilidades
                    </h2>
                    <button onClick={onClose} onMouseDown={handleMouseDown} className="bg-gray-700 text-white rounded-full w-8 h-8 flex items-center justify-center hover:bg-gray-600 transition-colors ripple-effect" aria-label="Cerrar">&times;</button>
                </header>
                 <nav className="flex border-b border-gray-700">
                    <TabButton type="currency" label="Divisas" />
                    <TabButton type="length" label="Longitud" />
                    <TabButton type="volume" label="Volumen" />
                    <TabButton type="weight" label="Peso" />
                </nav>
                <main className="p-6 space-y-4">
                    <div className="space-y-2">
                        <label className="text-sm font-medium text-gray-300">Cantidad</label>
                        <input
                            type="number"
                            value={amount}
                            onChange={(e) => setAmount(e.target.value)}
                            className="w-full bg-gray-700 border border-gray-600 rounded-md p-3 text-white text-2xl font-bold focus:ring-green-500 focus:border-green-500"
                            placeholder="0.00"
                        />
                         <UnitSelector value={fromUnit} onChange={e => setFromUnit(e.target.value)} options={unitOptions[conversionType]} />
                    </div>

                    <div className="flex justify-center my-2">
                        <button onClick={handleSwap} onMouseDown={handleMouseDown} className="p-2 bg-gray-700 rounded-full text-gray-300 hover:bg-gray-600 hover:text-white transition-colors ripple-effect">
                            <SwapIcon />
                        </button>
                    </div>

                    <div className="space-y-2">
                         <label className="text-sm font-medium text-gray-300">Convertido a</label>
                         <UnitSelector value={toUnit} onChange={e => setToUnit(e.target.value)} options={unitOptions[conversionType]} />
                         <div className="w-full bg-gray-800 border border-gray-600 rounded-md p-3 text-white text-2xl font-bold min-h-[60px] flex items-center">
                            {isLoading ? <SpinnerIcon className="w-6 h-6" /> : (error || result || '...')}
                         </div>
                    </div>
                </main>
            </div>
        </div>
    );
};

export default ConverterPanel;

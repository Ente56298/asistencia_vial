import React, { useState } from 'react';
import LoginPanel from './LoginPanel';
import RegisterPanel from './RegisterPanel';
import { User } from '../types';
import ArrowLeftIcon from './icons/ArrowLeftIcon';

interface AuthScreenProps {
    onLoginSuccess: (user: User) => void;
    onBack: () => void;
}

const AuthScreen: React.FC<AuthScreenProps> = ({ onLoginSuccess, onBack }) => {
    const [showLogin, setShowLogin] = useState(true);

    const toggleView = () => setShowLogin(!showLogin);

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
        <div className="relative min-h-screen w-full bg-gray-900 text-white font-sans flex flex-col items-center justify-center p-4">
             <div 
                className="absolute inset-0 bg-cover bg-center opacity-20" 
                style={{backgroundImage: "url('https://picsum.photos/seed/mexico-auth/1920/1080')"}}
            ></div>
            <div className="absolute inset-0 bg-gradient-to-b from-gray-900 via-gray-900/80 to-gray-900"></div>

            <div className="relative z-10 w-full max-w-md">
                 <button 
                    onClick={onBack} 
                    onMouseDown={handleMouseDown}
                    className="absolute top-0 left-0 -translate-y-12 flex items-center gap-2 text-gray-300 hover:text-white transition-colors ripple-effect p-2 rounded-md"
                    aria-label="Volver a la página principal"
                >
                    <ArrowLeftIcon />
                    Volver
                </button>
                 <header className="w-full text-center mb-8">
                    <h1 className="text-4xl sm:text-5xl font-extrabold text-white tracking-tight">
                        Asistente Vial <span className="text-amber-400">México</span>
                    </h1>
                    <p className="mt-2 text-lg text-gray-300">Su copiloto inteligente en el camino</p>
                </header>

                {showLogin ? (
                    <LoginPanel onLoginSuccess={onLoginSuccess} onToggleView={toggleView} />
                ) : (
                    <RegisterPanel onRegisterSuccess={onLoginSuccess} onToggleView={toggleView} />
                )}
            </div>
        </div>
    );
};

export default AuthScreen;

import React from 'react';
import { Feature, User } from '../types';
import HomeIcon from './icons/HomeIcon';
import MapIcon from './icons/MapIcon';
import AnalysisIcon from './icons/AnalysisIcon';
import AdminIcon from './icons/AdminIcon';
import LogoutIcon from './icons/LogoutIcon';

interface SidebarProps {
    user: User;
    activeView: Feature | 'home';
    onNavigate: (view: Feature | 'home') => void;
    onLogout: () => void;
}

const NavItem: React.FC<{ label: string; icon: React.ReactNode; isActive: boolean; onClick: () => void }> = ({ label, icon, isActive, onClick }) => (
    <button
        onClick={onClick}
        className={`w-full flex items-center p-3 rounded-lg transition-colors ${
            isActive ? 'bg-amber-500 text-gray-900 font-bold' : 'text-gray-300 hover:bg-gray-700 hover:text-white'
        }`}
    >
        <div className="w-6 h-6 mr-3">{icon}</div>
        <span>{label}</span>
    </button>
);

const Sidebar: React.FC<SidebarProps> = ({ user, activeView, onNavigate, onLogout }) => {
    return (
        <div className="w-64 bg-gray-900 text-white flex flex-col p-4 h-screen border-r border-gray-800">
            <header className="mb-8">
                <h1 className="text-2xl font-extrabold text-white">
                    Asistente <span className="text-amber-400">Vial</span>
                </h1>
                <p className="text-sm text-gray-400">Bienvenido, {user.name}</p>
            </header>
            
            <nav className="flex-grow space-y-2">
                <NavItem label="Inicio" icon={<HomeIcon />} isActive={activeView === 'home'} onClick={() => onNavigate('home')} />
                <NavItem label="Mapa General" icon={<MapIcon />} isActive={activeView === Feature.Map} onClick={() => onNavigate(Feature.Map)} />
                <NavItem label="Análisis" icon={<AnalysisIcon />} isActive={activeView === Feature.Analysis} onClick={() => onNavigate(Feature.Analysis)} />
                {user.subscriptionStatus === 'admin' && (
                    <NavItem label="Admin" icon={<AdminIcon />} isActive={activeView === Feature.Admin} onClick={() => onNavigate(Feature.Admin)} />
                )}
            </nav>

            <footer className="mt-auto">
                <button
                    onClick={onLogout}
                    className="w-full flex items-center p-3 rounded-lg text-gray-300 hover:bg-red-800/50 hover:text-white transition-colors"
                >
                    <LogoutIcon />
                    <span className="ml-3">Cerrar Sesión</span>
                </button>
            </footer>
        </div>
    );
};

export default Sidebar;

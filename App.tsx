
import React, { useState, useEffect } from 'react';
import { User } from './types';
import { getCurrentUser } from './services/authService';
import AuthScreen from './components/AuthScreen';
import Dashboard from './components/Dashboard';
import SpinnerIcon from './components/icons/SpinnerIcon';
import LandingPage from './components/LandingPage';

const App: React.FC = () => {
    const [user, setUser] = useState<User | null>(null);
    const [isLoading, setIsLoading] = useState(true);
    const [isAuthVisible, setIsAuthVisible] = useState(false);

    useEffect(() => {
        const checkUser = () => {
            const currentUser = getCurrentUser();
            setUser(currentUser);
            setIsLoading(false);
        };
        // Simulate a small delay for loading splash screen effect
        setTimeout(checkUser, 1000);
    }, []);

    const handleLoginSuccess = (loggedInUser: User) => {
        setUser(loggedInUser);
        setIsAuthVisible(false);
    };

    const handleLogout = () => {
        // The logout function from authService already removes the item from localStorage
        setUser(null);
    };

    if (isLoading) {
        return (
            <div className="min-h-screen w-full bg-gray-900 flex flex-col items-center justify-center text-white">
                <SpinnerIcon className="w-16 h-16 text-amber-400" />
                <h1 className="mt-4 text-2xl font-bold">Cargando Asistente Vial...</h1>
            </div>
        );
    }

    if (user) {
        return <Dashboard user={user} onLogout={handleLogout} />;
    }

    if (isAuthVisible) {
        return <AuthScreen onLoginSuccess={handleLoginSuccess} onBack={() => setIsAuthVisible(false)} />;
    }

    return <LandingPage onShowAuth={() => setIsAuthVisible(true)} />;
};

// FIX: Add default export to make the component available for import.
export default App;
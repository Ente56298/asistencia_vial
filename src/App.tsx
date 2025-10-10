import React, { useState, useEffect } from 'react';
import { LoadScript } from '@react-google-maps/api';
import RocketStyleDashboard from './components/RocketStyleDashboard';
import NewLandingPage from './components/NewLandingPage';
import Dashboard from './components/Dashboard';
import SOSButton from './components/SOSButton';
import GeminiAssistant from './components/GeminiAssistant';
import MechanicalServices from './components/MechanicalServices';
import PartsSearch from './components/PartsSearch';
import TrafficReports from './components/TrafficReports';
import BusinessDirectory from './components/BusinessDirectory';
import './App.css';

const GOOGLE_MAPS_API_KEY = import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'AIzaSyAYHBXAtzgl-cXtgBf0VF5nVpSWvEke14g';
const libraries: ("places" | "geometry" | "drawing" | "visualization")[] = ['places'];

function App() {
  const [currentView, setCurrentView] = useState('landing');
  const [isOnline, setIsOnline] = useState(navigator.onLine);
  const [userLocation, setUserLocation] = useState<{lat: number, lng: number} | null>(null);

  useEffect(() => {
    const handleOnline = () => setIsOnline(true);
    const handleOffline = () => setIsOnline(false);
    
    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);
    
    // Get user location
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        },
        (error) => {
          console.log('Location access denied:', error);
          // Default to Mexico City
          setUserLocation({ lat: 19.4326, lng: -99.1332 });
        }
      );
    } else {
      // Default to Mexico City
      setUserLocation({ lat: 19.4326, lng: -99.1332 });
    }
    
    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  const renderView = () => {
    const mockUser = {
      id: '1',
      name: 'Usuario Demo',
      email: 'demo@asistenciavial.mx',
      subscriptionStatus: 'premium'
    };
    const props = { userLocation, isOnline, user: mockUser, onFeatureSelect: () => {}, onActivateSOS: () => {} };
    
    switch (currentView) {
      case 'landing':
        return <NewLandingPage setCurrentView={setCurrentView} />;
      case 'dashboard':
        return <RocketStyleDashboard />;
      case 'sos':
        return <SOSButton {...props} />;
      case 'assistant':
        return <GeminiAssistant {...props} />;
      case 'services':
        return <MechanicalServices {...props} />;
      case 'parts':
        return <PartsSearch {...props} />;
      case 'traffic':
        return <TrafficReports {...props} />;
      case 'directory':
        return <BusinessDirectory {...props} />;
      default:
        return <LandingPage setCurrentView={setCurrentView} />;
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={GOOGLE_MAPS_API_KEY}
      libraries={libraries}
    >
      <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900">
        {/* Status Bar */}
        <div className="bg-black/30 text-white text-xs px-4 py-1 flex justify-between items-center">
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-1 ${isOnline ? 'text-green-400' : 'text-red-400'}`}>
              <div className={`w-2 h-2 rounded-full ${isOnline ? 'bg-green-400' : 'bg-red-400'} animate-pulse`}></div>
              {isOnline ? 'En línea' : 'Sin conexión'}
            </div>
            {userLocation && (
              <div className="text-gray-300">
                📍 {userLocation.lat.toFixed(4)}, {userLocation.lng.toFixed(4)}
              </div>
            )}
          </div>
          <div className="text-gray-300">
            Asistencia Vial México v1.0
          </div>
        </div>

        {/* Navigation */}
        <nav className="bg-black/20 backdrop-blur-md border-b border-white/10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center">
                <div className="flex items-center gap-3">
                  <div className="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg flex items-center justify-center">
                    🚗
                  </div>
                  <h1 className="text-white text-xl font-bold">Asistencia Vial México</h1>
                </div>
              </div>
              <div className="flex space-x-2">
                <button
                  onClick={() => setCurrentView('landing')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentView === 'landing'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  🏠 Inicio
                </button>
                <button
                  onClick={() => setCurrentView('dashboard')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentView === 'dashboard'
                      ? 'bg-blue-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  Dashboard
                </button>
                <button
                  onClick={() => setCurrentView('sos')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentView === 'sos'
                      ? 'bg-red-600 text-white shadow-lg animate-pulse'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  🚨 SOS
                </button>
                <button
                  onClick={() => setCurrentView('assistant')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentView === 'assistant'
                      ? 'bg-green-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  🤖 IA
                </button>
                <button
                  onClick={() => setCurrentView('services')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentView === 'services'
                      ? 'bg-purple-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  🔧 Servicios
                </button>
                <button
                  onClick={() => setCurrentView('traffic')}
                  className={`px-3 py-2 rounded-lg text-sm font-medium transition-all ${
                    currentView === 'traffic'
                      ? 'bg-orange-600 text-white shadow-lg'
                      : 'text-gray-300 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  🚦 Tráfico
                </button>
              </div>
            </div>
          </div>
        </nav>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto py-6 sm:px-6 lg:px-8">
          {renderView()}
        </main>
        
        {/* Footer */}
        <footer className="bg-black/20 backdrop-blur-md border-t border-white/10 mt-12">
          <div className="max-w-7xl mx-auto px-4 py-6">
            <div className="text-center text-gray-300 text-sm">
              <p>© 2025 Asistencia Vial México - Tecnología CO•RA</p>
              <p className="mt-1">Emergencias 24/7 • IA Avanzada • Cobertura Nacional</p>
            </div>
          </div>
        </footer>
      </div>
    </LoadScript>
  );
}

export default App;
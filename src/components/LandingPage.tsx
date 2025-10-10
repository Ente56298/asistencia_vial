import React from 'react';

interface LandingPageProps {
  setCurrentView: (view: string) => void;
}

const LandingPage: React.FC<LandingPageProps> = ({ setCurrentView }) => {
  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
      {/* Background Image Overlay */}
      <div 
        className="absolute inset-0 bg-cover bg-center opacity-20"
        style={{
          backgroundImage: "url('https://images.unsplash.com/photo-1502877338535-766e3a6052c0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80')"
        }}
      ></div>

      {/* Navigation */}
      <nav className="relative z-10 bg-black/20 backdrop-blur-md border-b border-white/10">
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
            <div className="hidden md:flex space-x-8">
              <button
                onClick={() => setCurrentView('landing')}
                className="text-white hover:text-blue-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Inicio
              </button>
              <button
                onClick={() => setCurrentView('services')}
                className="text-white hover:text-blue-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Servicios
              </button>
              <button
                onClick={() => setCurrentView('directory')}
                className="text-white hover:text-blue-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Sobre Nosotros
              </button>
              <button
                onClick={() => setCurrentView('traffic')}
                className="text-white hover:text-blue-300 px-3 py-2 rounded-md text-sm font-medium transition-colors"
              >
                Contacto
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <div className="relative z-10 flex flex-col items-center justify-center min-h-[calc(100vh-4rem)] px-4 sm:px-6 lg:px-8 text-center text-white">
        <div className="max-w-4xl mx-auto">
          <h1 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
            Asistencia en Carretera
            <br />
            <span className="text-blue-300">Cuando la Necesitas</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 text-gray-200 max-w-2xl mx-auto leading-relaxed">
            ¿Problemas inesperados en la carretera? ¡No te preocupes! Nuestro equipo está listo para ayudarte de forma rápida y eficiente. Solicita asistencia y regresa a tu ruta con seguridad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentView('sos')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-3 px-8 rounded-lg text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              🚨 Solicitar Ayuda
            </button>
            <button
              onClick={() => setCurrentView('dashboard')}
              className="bg-transparent border-2 border-white hover:bg-white hover:text-blue-900 text-white font-bold py-3 px-8 rounded-lg text-lg transition-all duration-300"
            >
              Más Información
            </button>
          </div>
        </div>
      </div>

      {/* Footer */}
      <footer className="relative z-10 bg-black/20 backdrop-blur-md border-t border-white/10">
        <div className="max-w-7xl mx-auto px-4 py-6">
          <div className="text-center text-gray-300 text-sm">
            <p>© 2025 Asistencia Vial México - Tecnología CO•RA</p>
            <p className="mt-1">Emergencias 24/7 • IA Avanzada • Cobertura Nacional</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;

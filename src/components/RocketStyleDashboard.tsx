import React, { useState } from 'react';
import GentelellaLayout from './GentelellaLayout';
import DashboardStats from './DashboardStats';

const RocketStyleDashboard: React.FC = () => {
  const [activeRole, setActiveRole] = useState('regular');
  const [showFeatureModal, setShowFeatureModal] = useState(false);
  const [selectedFeature, setSelectedFeature] = useState('');

  const showRole = (role: string) => {
    setActiveRole(role);
  };

  const showFeature = (feature: string) => {
    setSelectedFeature(feature);
    setShowFeatureModal(true);
  };

  const closeFeature = () => {
    setShowFeatureModal(false);
    setSelectedFeature('');
  };

  const features = {
    gps: {
      title: 'GPS Tracking Avanzado',
      content: (
        <div className="space-y-6">
          <div className="bg-green-500/10 border border-green-500/20 rounded-lg p-4">
            <div className="flex items-center gap-3 mb-3">
              <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
              <span className="font-semibold">Estado: Activo</span>
            </div>
            <div className="text-sm text-gray-300">Ubicación: CDMX, Polanco</div>
            <div className="text-sm text-gray-300">Velocidad: 45 km/h</div>
          </div>
          
          <div>
            <h4 className="font-bold mb-3">Historial de Rutas</h4>
            <div className="space-y-2">
              <div className="flex justify-between items-center p-3 bg-white/5 rounded-lg">
                <div>
                  <div className="font-medium">Casa → Oficina</div>
                  <div className="text-sm text-gray-400">Hoy, 8:30 AM</div>
                </div>
                <div className="text-sm text-green-400">23.5 km</div>
              </div>
            </div>
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-2xl font-bold text-green-400">156</div>
              <div className="text-sm text-gray-400">km esta semana</div>
            </div>
            <div className="text-center p-4 bg-white/5 rounded-lg">
              <div className="text-2xl font-bold text-blue-400">8.5</div>
              <div className="text-sm text-gray-400">L/100km promedio</div>
            </div>
          </div>
        </div>
      )
    },
    marketplace: {
      title: 'Marketplace de Refacciones',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div className="border border-white/10 rounded-lg p-4">
              <div className="w-full h-24 bg-gray-600 rounded mb-3 flex items-center justify-center">
                <span className="text-white text-sm">Pastillas</span>
              </div>
              <h5 className="font-semibold mb-2">Pastillas de Freno</h5>
              <div className="flex justify-between items-center">
                <span className="text-green-400 font-bold">$450</span>
                <div className="flex items-center gap-1">
                  <span className="text-yellow-400">★</span>
                  <span className="text-sm">4.8</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      )
    },
    reports: {
      title: 'Reportes y Análisis',
      content: (
        <div className="space-y-6">
          <div className="grid grid-cols-2 gap-4">
            <div className="text-center p-4 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-lg">
              <div className="text-3xl font-bold text-blue-400 mb-2">$2,450</div>
              <div className="text-sm text-gray-300">Gasto total este mes</div>
            </div>
            <div className="text-center p-4 bg-gradient-to-br from-green-500/20 to-blue-500/20 rounded-lg">
              <div className="text-3xl font-bold text-green-400 mb-2">12</div>
              <div className="text-sm text-gray-300">Servicios utilizados</div>
            </div>
          </div>
        </div>
      )
    }
  };

  return (
    <GentelellaLayout title="Asistencia Vial México">
      <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-indigo-900 text-white p-6">
        {/* Dashboard Stats */}
        <DashboardStats />
      {/* Header */}
      <header className="relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-6 py-20">
          <div className="text-center">
            <div className="inline-flex items-center gap-3 bg-white/5 backdrop-blur-md border border-white/10 rounded-full px-6 py-3 mb-8">
              <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm font-medium">Sistema Operativo</span>
            </div>
            
            <h1 className="text-6xl md:text-8xl font-black mb-6 leading-tight">
              Asistencia Vial
              <br />
              <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">México</span>
            </h1>
            
            <p className="text-xl text-gray-300 max-w-3xl mx-auto mb-12">
              Plataforma de emergencias viales construida con tecnología moderna. 
              Respuesta instantánea, análisis en tiempo real, disponibilidad 24/7.
            </p>
            
            <div className="flex flex-wrap justify-center gap-4 mb-16">
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-green-500/10 border border-green-500/20 rounded-full text-sm font-medium text-green-400">
                <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                99.9% Uptime
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-500/10 border border-blue-500/20 rounded-full text-sm font-medium text-blue-400">
                <div className="w-2 h-2 bg-blue-400 rounded-full"></div>
                &lt; 100ms Response
              </div>
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-purple-500/10 border border-purple-500/20 rounded-full text-sm font-medium text-purple-400">
                <div className="w-2 h-2 bg-purple-400 rounded-full"></div>
                ISO 27001
              </div>
            </div>
          </div>
          
          {/* Role Selection */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 max-w-6xl mx-auto">
            <div 
              onClick={() => showRole('regular')} 
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 cursor-pointer hover:bg-white/10 hover:border-blue-500/30 hover:transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-blue-500/20 rounded-xl flex items-center justify-center shadow-lg shadow-blue-500/30">
                  <span className="text-blue-400 text-xl">👤</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Usuario</h3>
                  <p className="text-gray-400 text-sm">Servicios básicos</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <span className="text-green-400 text-xs">✓</span>
                  <span>SOS con GPS</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400 text-xs">✓</span>
                  <span>Talleres cercanos</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400 text-xs">✓</span>
                  <span>Rutas optimizadas</span>
                </div>
              </div>
            </div>
            
            <div 
              onClick={() => showRole('emergency')} 
              className="bg-white/5 backdrop-blur-md border border-red-500/20 rounded-2xl p-8 cursor-pointer hover:bg-white/10 hover:border-red-500/50 hover:transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-red-500/20 rounded-xl flex items-center justify-center">
                  <span className="text-red-400 text-xl animate-pulse">⚠️</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Emergencia</h3>
                  <p className="text-gray-400 text-sm">Respuesta prioritaria</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <span className="text-green-400 text-xs">✓</span>
                  <span>Respuesta &lt; 30s</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400 text-xs">✓</span>
                  <span>Equipo dedicado</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400 text-xs">✓</span>
                  <span>Soporte 24/7</span>
                </div>
              </div>
            </div>
            
            <div 
              onClick={() => showRole('professional')} 
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 cursor-pointer hover:bg-white/10 hover:border-purple-500/30 hover:transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-purple-500/20 rounded-xl flex items-center justify-center">
                  <span className="text-purple-400 text-xl">📊</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">Analytics</h3>
                  <p className="text-gray-400 text-sm">Dashboard avanzado</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <span className="text-green-400 text-xs">✓</span>
                  <span>Métricas en tiempo real</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400 text-xs">✓</span>
                  <span>API completa</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400 text-xs">✓</span>
                  <span>Integraciones</span>
                </div>
              </div>
            </div>
            
            <div 
              onClick={() => showRole('ai')} 
              className="bg-white/5 backdrop-blur-md border border-cyan-500/20 rounded-2xl p-8 cursor-pointer hover:bg-white/10 hover:border-cyan-500/50 hover:transform hover:-translate-y-1 transition-all duration-300"
            >
              <div className="flex items-center gap-4 mb-6">
                <div className="w-12 h-12 bg-cyan-500/20 rounded-xl flex items-center justify-center">
                  <span className="text-cyan-400 text-xl">🤖</span>
                </div>
                <div>
                  <h3 className="text-xl font-bold">IA Assistant</h3>
                  <p className="text-gray-400 text-sm">Chat inteligente</p>
                </div>
              </div>
              <div className="space-y-2 text-sm text-gray-300">
                <div className="flex items-center gap-2">
                  <span className="text-green-400 text-xs">✓</span>
                  <span>Chat 24/7</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400 text-xs">✓</span>
                  <span>Diagnóstico IA</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400 text-xs">✓</span>
                  <span>Predicciones</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-6 py-16">
        {/* Funciones Adicionales */}
        <div className="mt-20">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold mb-6">Funciones Adicionales</h2>
            <p className="text-xl text-gray-300 max-w-3xl mx-auto">
              Herramientas avanzadas para una experiencia completa
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {/* GPS Tracking */}
            <div 
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:scale-105 transition-transform cursor-pointer" 
              onClick={() => showFeature('gps')}
            >
              <div className="w-16 h-16 bg-green-500/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-green-400 text-2xl">📍</span>
              </div>
              <h3 className="text-xl font-bold text-center mb-4">GPS Tracking</h3>
              <p className="text-gray-400 text-center mb-6">Seguimiento en tiempo real con historial de rutas</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-green-400 text-xs">✓</span>
                  <span>Ubicación precisa</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400 text-xs">✓</span>
                  <span>Historial de viajes</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400 text-xs">✓</span>
                  <span>Alertas de zona</span>
                </div>
              </div>
            </div>
            
            {/* Marketplace */}
            <div 
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:scale-105 transition-transform cursor-pointer" 
              onClick={() => showFeature('marketplace')}
            >
              <div className="w-16 h-16 bg-orange-500/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-orange-400 text-2xl">🏪</span>
              </div>
              <h3 className="text-xl font-bold text-center mb-4">Marketplace</h3>
              <p className="text-gray-400 text-center mb-6">Refacciones y servicios verificados</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-green-400 text-xs">✓</span>
                  <span>Proveedores certificados</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400 text-xs">✓</span>
                  <span>Precios competitivos</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400 text-xs">✓</span>
                  <span>Entrega rápida</span>
                </div>
              </div>
            </div>
            
            {/* Reportes */}
            <div 
              className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 hover:scale-105 transition-transform cursor-pointer" 
              onClick={() => showFeature('reports')}
            >
              <div className="w-16 h-16 bg-indigo-500/20 rounded-xl flex items-center justify-center mx-auto mb-6">
                <span className="text-indigo-400 text-2xl">📊</span>
              </div>
              <h3 className="text-xl font-bold text-center mb-4">Reportes</h3>
              <p className="text-gray-400 text-center mb-6">Análisis detallado de uso y costos</p>
              <div className="space-y-2 text-sm">
                <div className="flex items-center gap-2">
                  <span className="text-green-400 text-xs">✓</span>
                  <span>Gastos por categoría</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400 text-xs">✓</span>
                  <span>Tendencias de uso</span>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-green-400 text-xs">✓</span>
                  <span>Exportar PDF</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        {/* Feature Modal */}
        {showFeatureModal && (
          <div className="fixed inset-0 bg-black/80 backdrop-blur-sm z-50 flex items-center justify-center p-4">
            <div className="bg-white/5 backdrop-blur-md border border-white/10 rounded-2xl p-8 max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="flex justify-between items-center mb-6">
                <h3 className="text-2xl font-bold">{features[selectedFeature as keyof typeof features]?.title}</h3>
                <button 
                  onClick={closeFeature} 
                  className="w-8 h-8 bg-white/10 rounded-lg flex items-center justify-center hover:bg-white/20 transition-colors"
                >
                  <span className="text-sm">✕</span>
                </button>
              </div>
              <div>{features[selectedFeature as keyof typeof features]?.content}</div>
            </div>
          </div>
        )}
      </div>
    </GentelellaLayout>
  );
};

export default RocketStyleDashboard;
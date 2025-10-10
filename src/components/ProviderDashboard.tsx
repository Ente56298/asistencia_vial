import { useState, useEffect } from 'react';

interface ServiceRequest {
  id: string;
  type: 'mecanico' | 'grua' | 'refacciones' | 'emergencia';
  customer: string;
  location: string;
  description: string;
  status: 'pending' | 'accepted' | 'in_progress' | 'completed' | 'cancelled';
  timestamp: string;
  priority: 'low' | 'medium' | 'high' | 'critical';
  estimatedPrice?: number;
}

interface ProviderStats {
  totalRequests: number;
  completedToday: number;
  revenue: number;
  rating: number;
  responseTime: number;
}

export default function ProviderDashboard() {
  const [requests, setRequests] = useState<ServiceRequest[]>([]);
  const [stats, setStats] = useState<ProviderStats>({
    totalRequests: 156,
    completedToday: 8,
    revenue: 12450,
    rating: 4.8,
    responseTime: 12
  });
  const [activeTab, setActiveTab] = useState<'requests' | 'history' | 'earnings' | 'profile'>('requests');

  useEffect(() => {
    // Mock service requests
    const mockRequests: ServiceRequest[] = [
      {
        id: 'req-001',
        type: 'emergencia',
        customer: 'Juan Pérez',
        location: 'Av. Insurgentes Sur 1234',
        description: 'Vehículo descompuesto, no enciende',
        status: 'pending',
        timestamp: new Date().toISOString(),
        priority: 'critical',
        estimatedPrice: 800
      },
      {
        id: 'req-002',
        type: 'mecanico',
        customer: 'María González',
        location: 'Polanco, CDMX',
        description: 'Cambio de aceite y filtros',
        status: 'accepted',
        timestamp: new Date(Date.now() - 1800000).toISOString(),
        priority: 'low',
        estimatedPrice: 450
      },
      {
        id: 'req-003',
        type: 'grua',
        customer: 'Carlos Rodríguez',
        location: 'Santa Fe, CDMX',
        description: 'Remolque a taller cercano',
        status: 'in_progress',
        timestamp: new Date(Date.now() - 3600000).toISOString(),
        priority: 'high',
        estimatedPrice: 1200
      }
    ];

    setRequests(mockRequests);
  }, []);

  const acceptRequest = (requestId: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: 'accepted' } : req
    ));
  };

  const completeRequest = (requestId: string) => {
    setRequests(prev => prev.map(req => 
      req.id === requestId ? { ...req, status: 'completed' } : req
    ));
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'pending': return 'bg-yellow-600';
      case 'accepted': return 'bg-blue-600';
      case 'in_progress': return 'bg-purple-600';
      case 'completed': return 'bg-green-600';
      case 'cancelled': return 'bg-red-600';
      default: return 'bg-gray-600';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'text-red-400';
      case 'high': return 'text-orange-400';
      case 'medium': return 'text-yellow-400';
      case 'low': return 'text-green-400';
      default: return 'text-gray-400';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'mecanico': return '🔧';
      case 'grua': return '🚛';
      case 'refacciones': return '🛞';
      case 'emergencia': return '🚨';
      default: return '🛠️';
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex justify-between items-center">
          <div>
            <h1 className="text-2xl font-bold text-blue-400">🔧 Panel Proveedor</h1>
            <p className="text-gray-400">Taller Mecánico Express</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <div className="text-sm text-gray-400">Estado</div>
              <div className="flex items-center gap-2">
                <div className="w-3 h-3 bg-green-400 rounded-full animate-pulse"></div>
                <span className="text-green-400 font-medium">Disponible</span>
              </div>
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-gray-800 min-h-screen p-4">
          <div className="space-y-2">
            {[
              { id: 'requests', label: '📋 Solicitudes', count: requests.filter(r => r.status === 'pending').length },
              { id: 'history', label: '📊 Historial', count: requests.filter(r => r.status === 'completed').length },
              { id: 'earnings', label: '💰 Ganancias', count: null },
              { id: 'profile', label: '👤 Perfil', count: null }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full text-left p-3 rounded-lg transition-colors flex justify-between items-center ${
                  activeTab === tab.id 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                <span>{tab.label}</span>
                {tab.count !== null && (
                  <span className="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                    {tab.count}
                  </span>
                )}
              </button>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'requests' && (
            <div className="space-y-6">
              <div className="flex justify-between items-center">
                <h2 className="text-2xl font-bold">📋 Solicitudes Activas</h2>
                <div className="flex gap-2">
                  <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded">
                    🟢 Disponible
                  </button>
                  <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded">
                    🔄 Actualizar
                  </button>
                </div>
              </div>

              {/* Stats Cards */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="text-2xl font-bold text-blue-400">{stats.totalRequests}</div>
                  <div className="text-gray-400 text-sm">Total Solicitudes</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="text-2xl font-bold text-green-400">{stats.completedToday}</div>
                  <div className="text-gray-400 text-sm">Completadas Hoy</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="text-2xl font-bold text-yellow-400">⭐ {stats.rating}</div>
                  <div className="text-gray-400 text-sm">Calificación</div>
                </div>
                <div className="bg-gray-800 rounded-lg p-4">
                  <div className="text-2xl font-bold text-purple-400">{stats.responseTime}min</div>
                  <div className="text-gray-400 text-sm">Tiempo Respuesta</div>
                </div>
              </div>

              {/* Active Requests */}
              <div className="space-y-4">
                {requests.filter(req => req.status !== 'completed' && req.status !== 'cancelled').map(request => (
                  <div key={request.id} className="bg-gray-800 rounded-lg p-6">
                    <div className="flex justify-between items-start mb-4">
                      <div className="flex items-center gap-3">
                        <div className="text-2xl">{getTypeIcon(request.type)}</div>
                        <div>
                          <h3 className="font-semibold text-lg">{request.customer}</h3>
                          <p className="text-gray-400">{request.location}</p>
                        </div>
                      </div>
                      <div className="text-right">
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${getStatusColor(request.status)}`}>
                          {request.status}
                        </span>
                        <div className={`text-sm mt-1 ${getPriorityColor(request.priority)}`}>
                          {request.priority.toUpperCase()}
                        </div>
                      </div>
                    </div>

                    <p className="text-gray-300 mb-4">{request.description}</p>

                    <div className="flex justify-between items-center">
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>🕐 {new Date(request.timestamp).toLocaleTimeString()}</span>
                        {request.estimatedPrice && (
                          <span>💰 ${request.estimatedPrice} MXN</span>
                        )}
                      </div>

                      <div className="flex gap-2">
                        {request.status === 'pending' && (
                          <>
                            <button
                              onClick={() => acceptRequest(request.id)}
                              className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded"
                            >
                              ✅ Aceptar
                            </button>
                            <button className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded">
                              ❌ Rechazar
                            </button>
                          </>
                        )}
                        
                        {request.status === 'accepted' && (
                          <button
                            onClick={() => setRequests(prev => prev.map(req => 
                              req.id === request.id ? { ...req, status: 'in_progress' } : req
                            ))}
                            className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded"
                          >
                            🚀 Iniciar Trabajo
                          </button>
                        )}

                        {request.status === 'in_progress' && (
                          <button
                            onClick={() => completeRequest(request.id)}
                            className="bg-purple-600 hover:bg-purple-700 text-white px-4 py-2 rounded"
                          >
                            ✅ Completar
                          </button>
                        )}

                        <button className="bg-gray-600 hover:bg-gray-700 text-white px-4 py-2 rounded">
                          📞 Contactar
                        </button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {activeTab === 'earnings' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">💰 Ganancias y Pagos</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Ingresos</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>Hoy</span>
                      <span className="text-green-400">$2,450 MXN</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Esta semana</span>
                      <span className="text-green-400">$12,450 MXN</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Este mes</span>
                      <span className="text-green-400">$45,670 MXN</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Servicios</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between">
                      <span>🔧 Mecánico</span>
                      <span>23 servicios</span>
                    </div>
                    <div className="flex justify-between">
                      <span>🚛 Grúa</span>
                      <span>8 servicios</span>
                    </div>
                    <div className="flex justify-between">
                      <span>🚨 Emergencia</span>
                      <span>12 servicios</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Próximo Pago</h3>
                  <div className="text-center">
                    <div className="text-2xl font-bold text-green-400 mb-2">$8,450 MXN</div>
                    <div className="text-gray-400 text-sm">Disponible en 2 días</div>
                    <button className="mt-4 bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded w-full">
                      Solicitar Pago
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'profile' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">👤 Perfil del Proveedor</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Información del Negocio</h3>
                  <div className="space-y-3">
                    <div>
                      <label className="block text-gray-400 text-sm">Nombre del Taller</label>
                      <input 
                        type="text" 
                        defaultValue="Taller Mecánico Express"
                        className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm">Teléfono</label>
                      <input 
                        type="text" 
                        defaultValue="+52 55 1234 5678"
                        className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 mt-1"
                      />
                    </div>
                    <div>
                      <label className="block text-gray-400 text-sm">Dirección</label>
                      <input 
                        type="text" 
                        defaultValue="Av. Insurgentes Sur 1234, CDMX"
                        className="w-full bg-gray-700 border border-gray-600 rounded px-3 py-2 mt-1"
                      />
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Servicios Ofrecidos</h3>
                  <div className="space-y-2">
                    {[
                      'Mantenimiento general',
                      'Reparación de frenos',
                      'Cambio de aceite',
                      'Diagnóstico computarizado',
                      'Reparación de transmisión',
                      'Servicio de grúa'
                    ].map(service => (
                      <label key={service} className="flex items-center gap-2">
                        <input type="checkbox" defaultChecked className="rounded" />
                        <span>{service}</span>
                      </label>
                    ))}
                  </div>
                </div>
              </div>

              <div className="flex gap-4">
                <button className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-2 rounded">
                  Guardar Cambios
                </button>
                <button className="bg-gray-600 hover:bg-gray-700 text-white px-6 py-2 rounded">
                  Cancelar
                </button>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
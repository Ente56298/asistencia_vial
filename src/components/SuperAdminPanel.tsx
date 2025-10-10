import { useState, useEffect } from 'react';

interface SystemMetrics {
  totalUsers: number;
  activeUsers: number;
  emergencyCalls: number;
  servicesRequested: number;
  revenue: number;
  systemHealth: 'excellent' | 'good' | 'warning' | 'critical';
}

interface EmergencyAlert {
  id: string;
  type: 'SOS' | 'ACCIDENT' | 'MEDICAL' | 'FIRE';
  location: string;
  timestamp: string;
  status: 'active' | 'resolved' | 'dispatched';
  priority: 'low' | 'medium' | 'high' | 'critical';
}

export default function SuperAdminPanel() {
  const [metrics, setMetrics] = useState<SystemMetrics>({
    totalUsers: 15420,
    activeUsers: 1247,
    emergencyCalls: 89,
    servicesRequested: 342,
    revenue: 125000,
    systemHealth: 'excellent'
  });

  const [alerts, setAlerts] = useState<EmergencyAlert[]>([
    {
      id: 'alert-001',
      type: 'SOS',
      location: 'Av. Insurgentes Sur, CDMX',
      timestamp: new Date().toISOString(),
      status: 'active',
      priority: 'critical'
    },
    {
      id: 'alert-002', 
      type: 'ACCIDENT',
      location: 'Periférico Norte km 15',
      timestamp: new Date(Date.now() - 300000).toISOString(),
      status: 'dispatched',
      priority: 'high'
    }
  ]);

  const [activeTab, setActiveTab] = useState<'dashboard' | 'users' | 'services' | 'analytics' | 'system'>('dashboard');

  const getHealthColor = (health: string) => {
    switch (health) {
      case 'excellent': return 'text-green-400';
      case 'good': return 'text-blue-400';
      case 'warning': return 'text-yellow-400';
      case 'critical': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'critical': return 'bg-red-600';
      case 'high': return 'bg-orange-600';
      case 'medium': return 'bg-yellow-600';
      case 'low': return 'bg-blue-600';
      default: return 'bg-gray-600';
    }
  };

  const resolveAlert = (alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, status: 'resolved' } : alert
    ));
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white">
      {/* Header */}
      <header className="bg-gray-800 border-b border-gray-700 p-4">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-blue-400">🛡️ Super Admin - Asistencia Vial</h1>
          <div className="flex items-center gap-4">
            <div className={`flex items-center gap-2 ${getHealthColor(metrics.systemHealth)}`}>
              <div className="w-3 h-3 rounded-full bg-current animate-pulse"></div>
              <span className="text-sm font-medium">Sistema {metrics.systemHealth}</span>
            </div>
            <div className="text-sm text-gray-400">
              {new Date().toLocaleString()}
            </div>
          </div>
        </div>
      </header>

      <div className="flex">
        {/* Sidebar */}
        <nav className="w-64 bg-gray-800 min-h-screen p-4">
          <div className="space-y-2">
            {[
              { id: 'dashboard', label: '📊 Dashboard', icon: '📊' },
              { id: 'users', label: '👥 Usuarios', icon: '👥' },
              { id: 'services', label: '🛠️ Servicios', icon: '🛠️' },
              { id: 'analytics', label: '📈 Analytics', icon: '📈' },
              { id: 'system', label: '⚙️ Sistema', icon: '⚙️' }
            ].map(tab => (
              <button
                key={tab.id}
                onClick={() => setActiveTab(tab.id as any)}
                className={`w-full text-left p-3 rounded-lg transition-colors ${
                  activeTab === tab.id 
                    ? 'bg-blue-600 text-white' 
                    : 'text-gray-300 hover:bg-gray-700'
                }`}
              >
                {tab.label}
              </button>
            ))}
          </div>
        </nav>

        {/* Main Content */}
        <main className="flex-1 p-6">
          {activeTab === 'dashboard' && (
            <div className="space-y-6">
              {/* Metrics Cards */}
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Usuarios Totales</p>
                      <p className="text-2xl font-bold text-white">{metrics.totalUsers.toLocaleString()}</p>
                    </div>
                    <div className="text-3xl">👥</div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Usuarios Activos</p>
                      <p className="text-2xl font-bold text-green-400">{metrics.activeUsers.toLocaleString()}</p>
                    </div>
                    <div className="text-3xl">🟢</div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Emergencias Hoy</p>
                      <p className="text-2xl font-bold text-red-400">{metrics.emergencyCalls}</p>
                    </div>
                    <div className="text-3xl">🚨</div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <div className="flex items-center justify-between">
                    <div>
                      <p className="text-gray-400 text-sm">Ingresos (MXN)</p>
                      <p className="text-2xl font-bold text-yellow-400">${metrics.revenue.toLocaleString()}</p>
                    </div>
                    <div className="text-3xl">💰</div>
                  </div>
                </div>
              </div>

              {/* Active Alerts */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">🚨 Alertas Activas</h2>
                <div className="space-y-3">
                  {alerts.filter(alert => alert.status === 'active').map(alert => (
                    <div key={alert.id} className="bg-gray-700 rounded-lg p-4 flex justify-between items-center">
                      <div>
                        <div className="flex items-center gap-2 mb-1">
                          <span className={`px-2 py-1 rounded text-xs font-bold ${getPriorityColor(alert.priority)}`}>
                            {alert.priority.toUpperCase()}
                          </span>
                          <span className="font-semibold">{alert.type}</span>
                        </div>
                        <p className="text-gray-300">{alert.location}</p>
                        <p className="text-gray-500 text-sm">{new Date(alert.timestamp).toLocaleString()}</p>
                      </div>
                      <div className="flex gap-2">
                        <button
                          onClick={() => resolveAlert(alert.id)}
                          className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded text-sm"
                        >
                          Resolver
                        </button>
                        <button className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded text-sm">
                          Ver Detalles
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Real-time Map */}
              <div className="bg-gray-800 rounded-lg p-6">
                <h2 className="text-xl font-bold mb-4">🗺️ Mapa en Tiempo Real</h2>
                <div className="bg-gray-700 rounded-lg h-64 flex items-center justify-center">
                  <div className="text-center">
                    <div className="text-4xl mb-2">🗺️</div>
                    <p className="text-gray-400">Mapa interactivo con ubicaciones de emergencias</p>
                    <p className="text-sm text-gray-500">Integración con Google Maps API</p>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'users' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">👥 Gestión de Usuarios</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Usuarios por Tipo</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>Gratuitos</span>
                      <span className="text-blue-400">12,340</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Premium</span>
                      <span className="text-yellow-400">2,890</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Empresas</span>
                      <span className="text-green-400">190</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Actividad Reciente</h3>
                  <div className="space-y-2 text-sm">
                    <div>📱 1,247 usuarios activos</div>
                    <div>🆕 89 registros hoy</div>
                    <div>💳 45 upgrades a premium</div>
                    <div>🚫 12 cancelaciones</div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Acciones Rápidas</h3>
                  <div className="space-y-2">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
                      Exportar Usuarios
                    </button>
                    <button className="w-full bg-green-600 hover:bg-green-700 text-white py-2 rounded">
                      Enviar Notificación
                    </button>
                    <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded">
                      Generar Reporte
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'services' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">🛠️ Gestión de Servicios</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Servicios Activos</h3>
                  <div className="space-y-3">
                    <div className="flex justify-between items-center">
                      <span>🚗 Asistencia Vial</span>
                      <span className="text-green-400">●</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>🏥 Servicios Médicos</span>
                      <span className="text-green-400">●</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>🏠 Asistencia Hogar</span>
                      <span className="text-green-400">●</span>
                    </div>
                    <div className="flex justify-between items-center">
                      <span>⚖️ Servicios Legales</span>
                      <span className="text-yellow-400">●</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Proveedores</h3>
                  <div className="space-y-2 text-sm">
                    <div>🔧 156 talleres certificados</div>
                    <div>🚛 89 servicios de grúa</div>
                    <div>🏥 45 servicios médicos</div>
                    <div>⚖️ 23 despachos legales</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'analytics' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">📈 Analytics Avanzados</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Métricas de Uso</h3>
                  <div className="space-y-3">
                    <div>📱 Sesiones diarias: 8,945</div>
                    <div>⏱️ Tiempo promedio: 12 min</div>
                    <div>🔄 Tasa retención: 78%</div>
                    <div>⭐ Satisfacción: 4.7/5</div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Ingresos</h3>
                  <div className="space-y-3">
                    <div>💰 Hoy: $8,450 MXN</div>
                    <div>📅 Esta semana: $52,300 MXN</div>
                    <div>📊 Este mes: $198,750 MXN</div>
                    <div>📈 Crecimiento: +23%</div>
                  </div>
                </div>
              </div>
            </div>
          )}

          {activeTab === 'system' && (
            <div className="space-y-6">
              <h2 className="text-2xl font-bold">⚙️ Administración del Sistema</h2>
              
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Estado del Sistema</h3>
                  <div className="space-y-2">
                    <div className="flex justify-between">
                      <span>API Principal</span>
                      <span className="text-green-400">✅</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Base de Datos</span>
                      <span className="text-green-400">✅</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Servicios SMS</span>
                      <span className="text-green-400">✅</span>
                    </div>
                    <div className="flex justify-between">
                      <span>Google Maps</span>
                      <span className="text-yellow-400">⚠️</span>
                    </div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Recursos</h3>
                  <div className="space-y-2">
                    <div>💾 CPU: 45%</div>
                    <div>🧠 RAM: 67%</div>
                    <div>💿 Disco: 23%</div>
                    <div>🌐 Ancho banda: 12%</div>
                  </div>
                </div>

                <div className="bg-gray-800 rounded-lg p-6">
                  <h3 className="font-semibold mb-4">Acciones</h3>
                  <div className="space-y-2">
                    <button className="w-full bg-blue-600 hover:bg-blue-700 text-white py-2 rounded">
                      Backup Sistema
                    </button>
                    <button className="w-full bg-yellow-600 hover:bg-yellow-700 text-white py-2 rounded">
                      Reiniciar Servicios
                    </button>
                    <button className="w-full bg-red-600 hover:bg-red-700 text-white py-2 rounded">
                      Modo Mantenimiento
                    </button>
                  </div>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
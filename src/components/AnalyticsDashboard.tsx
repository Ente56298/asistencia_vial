import { useState, useEffect } from 'react';

interface AnalyticsData {
  users: {
    total: number;
    active: number;
    new: number;
    retention: number;
  };
  services: {
    total: number;
    completed: number;
    pending: number;
    revenue: number;
  };
  emergency: {
    calls: number;
    responseTime: number;
    resolved: number;
    critical: number;
  };
  geographic: {
    cdmx: number;
    guadalajara: number;
    monterrey: number;
    other: number;
  };
}

export default function AnalyticsDashboard() {
  const [data, setData] = useState<AnalyticsData>({
    users: { total: 15420, active: 1247, new: 89, retention: 78 },
    services: { total: 2340, completed: 2156, pending: 184, revenue: 125000 },
    emergency: { calls: 89, responseTime: 8, resolved: 85, critical: 4 },
    geographic: { cdmx: 8450, guadalajara: 2340, monterrey: 1890, other: 2740 }
  });

  const [timeRange, setTimeRange] = useState<'24h' | '7d' | '30d' | '90d'>('24h');
  const [selectedMetric, setSelectedMetric] = useState<'users' | 'services' | 'revenue' | 'emergency'>('users');

  const formatNumber = (num: number) => {
    if (num >= 1000000) return `${(num / 1000000).toFixed(1)}M`;
    if (num >= 1000) return `${(num / 1000).toFixed(1)}K`;
    return num.toString();
  };

  const getGrowthIndicator = (current: number, previous: number) => {
    const growth = ((current - previous) / previous) * 100;
    const isPositive = growth > 0;
    return {
      value: Math.abs(growth).toFixed(1),
      isPositive,
      icon: isPositive ? '📈' : '📉',
      color: isPositive ? 'text-green-400' : 'text-red-400'
    };
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">📊 Analytics Dashboard</h2>
        <div className="flex gap-2">
          {['24h', '7d', '30d', '90d'].map(range => (
            <button
              key={range}
              onClick={() => setTimeRange(range as any)}
              className={`px-4 py-2 rounded text-sm font-medium ${
                timeRange === range 
                  ? 'bg-blue-600 text-white' 
                  : 'bg-gray-700 text-gray-300 hover:bg-gray-600'
              }`}
            >
              {range}
            </button>
          ))}
        </div>
      </div>

      {/* Key Metrics */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-3xl">👥</div>
            <div className="text-green-400 text-sm flex items-center gap-1">
              📈 +12.5%
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{formatNumber(data.users.total)}</div>
          <div className="text-gray-400 text-sm">Usuarios Totales</div>
          <div className="text-green-400 text-xs mt-2">+{data.users.new} nuevos hoy</div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-3xl">🛠️</div>
            <div className="text-blue-400 text-sm flex items-center gap-1">
              📈 +8.3%
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{formatNumber(data.services.total)}</div>
          <div className="text-gray-400 text-sm">Servicios Solicitados</div>
          <div className="text-blue-400 text-xs mt-2">{data.services.pending} pendientes</div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-3xl">💰</div>
            <div className="text-yellow-400 text-sm flex items-center gap-1">
              📈 +23.1%
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">${formatNumber(data.services.revenue)}</div>
          <div className="text-gray-400 text-sm">Ingresos (MXN)</div>
          <div className="text-yellow-400 text-xs mt-2">Este mes</div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <div className="flex items-center justify-between mb-4">
            <div className="text-3xl">🚨</div>
            <div className="text-red-400 text-sm flex items-center gap-1">
              📉 -5.2%
            </div>
          </div>
          <div className="text-2xl font-bold text-white mb-1">{data.emergency.calls}</div>
          <div className="text-gray-400 text-sm">Emergencias Hoy</div>
          <div className="text-green-400 text-xs mt-2">{data.emergency.resolved} resueltas</div>
        </div>
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Usage Chart */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">📈 Uso de la Plataforma</h3>
          <div className="h-64 bg-gray-700 rounded-lg flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl mb-2">📊</div>
              <div className="text-gray-400">Gráfico de uso por horas</div>
              <div className="text-sm text-gray-500 mt-2">
                Pico: 14:00-16:00 (2,340 usuarios)
              </div>
            </div>
          </div>
        </div>

        {/* Geographic Distribution */}
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">🗺️ Distribución Geográfica</h3>
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Ciudad de México</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div className="bg-blue-500 h-2 rounded-full" style={{width: '55%'}}></div>
                </div>
                <span className="text-white font-medium">{formatNumber(data.geographic.cdmx)}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Guadalajara</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div className="bg-green-500 h-2 rounded-full" style={{width: '15%'}}></div>
                </div>
                <span className="text-white font-medium">{formatNumber(data.geographic.guadalajara)}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Monterrey</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div className="bg-yellow-500 h-2 rounded-full" style={{width: '12%'}}></div>
                </div>
                <span className="text-white font-medium">{formatNumber(data.geographic.monterrey)}</span>
              </div>
            </div>
            
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Otras ciudades</span>
              <div className="flex items-center gap-2">
                <div className="w-32 bg-gray-700 rounded-full h-2">
                  <div className="bg-purple-500 h-2 rounded-full" style={{width: '18%'}}></div>
                </div>
                <span className="text-white font-medium">{formatNumber(data.geographic.other)}</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Service Performance */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">🔧 Servicios Más Solicitados</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Asistencia Vial</span>
              <span className="text-blue-400 font-medium">45%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Servicios Médicos</span>
              <span className="text-green-400 font-medium">23%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Asistencia Hogar</span>
              <span className="text-yellow-400 font-medium">18%</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Servicios Legales</span>
              <span className="text-purple-400 font-medium">14%</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">⏱️ Tiempos de Respuesta</h3>
          <div className="space-y-3">
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Emergencias</span>
              <span className="text-red-400 font-medium">{data.emergency.responseTime} min</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Servicios Normales</span>
              <span className="text-blue-400 font-medium">25 min</span>
            </div>
            <div className="flex justify-between items-center">
              <span className="text-gray-300">Consultas</span>
              <span className="text-green-400 font-medium">2 min</span>
            </div>
          </div>
        </div>

        <div className="bg-gray-800 rounded-lg p-6">
          <h3 className="text-lg font-semibold text-white mb-4">⭐ Satisfacción del Cliente</h3>
          <div className="text-center">
            <div className="text-4xl font-bold text-yellow-400 mb-2">4.7</div>
            <div className="text-gray-400 mb-4">Calificación promedio</div>
            <div className="space-y-2 text-sm">
              <div className="flex justify-between">
                <span>5 estrellas</span>
                <span className="text-yellow-400">68%</span>
              </div>
              <div className="flex justify-between">
                <span>4 estrellas</span>
                <span className="text-blue-400">22%</span>
              </div>
              <div className="flex justify-between">
                <span>3 estrellas</span>
                <span className="text-gray-400">8%</span>
              </div>
              <div className="flex justify-between">
                <span>≤2 estrellas</span>
                <span className="text-red-400">2%</span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Real-time Activity */}
      <div className="bg-gray-800 rounded-lg p-6">
        <h3 className="text-lg font-semibold text-white mb-4">🔴 Actividad en Tiempo Real</h3>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
          <div className="bg-gray-700 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-green-400">{data.users.active}</div>
            <div className="text-gray-400 text-sm">Usuarios Activos</div>
            <div className="text-green-400 text-xs mt-1">Ahora mismo</div>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-blue-400">{data.services.pending}</div>
            <div className="text-gray-400 text-sm">Servicios Pendientes</div>
            <div className="text-blue-400 text-xs mt-1">En cola</div>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-red-400">{data.emergency.critical}</div>
            <div className="text-gray-400 text-sm">Emergencias Críticas</div>
            <div className="text-red-400 text-xs mt-1">Requieren atención</div>
          </div>
          
          <div className="bg-gray-700 rounded-lg p-4 text-center">
            <div className="text-2xl font-bold text-yellow-400">156</div>
            <div className="text-gray-400 text-sm">Proveedores Activos</div>
            <div className="text-yellow-400 text-xs mt-1">Disponibles</div>
          </div>
        </div>
      </div>
    </div>
  );
}
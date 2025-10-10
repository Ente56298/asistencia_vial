import { useMemo } from 'react';

interface RoutePoint {
  id: string;
  name: string;
  type: string;
  lat: number;
  lng: number;
  description?: string;
}

interface SavedRoutePanelProps {
  routePoints: RoutePoint[];
  startLocation: { lat: number; lng: number } | null;
  onRemovePoint: (id: string) => void;
  onClearRoute: () => void;
  onClose: () => void;
}

export default function SavedRoutePanel({ 
  routePoints, 
  startLocation, 
  onRemovePoint, 
  onClearRoute, 
  onClose 
}: SavedRoutePanelProps) {
  
  // Haversine formula to calculate distance between two points
  const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
    const R = 6371; // Earth's radius in kilometers
    const dLat = (lat2 - lat1) * Math.PI / 180;
    const dLng = (lng2 - lng1) * Math.PI / 180;
    const a = 
      Math.sin(dLat/2) * Math.sin(dLat/2) +
      Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) * 
      Math.sin(dLng/2) * Math.sin(dLng/2);
    const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
    return R * c;
  };

  // Format time in hours and minutes
  const formatTime = (hours: number): string => {
    const h = Math.floor(hours);
    const m = Math.round((hours - h) * 60);
    
    if (h === 0) {
      return `${m} min`;
    } else if (m === 0) {
      return `${h}h`;
    } else {
      return `${h}h ${m}min`;
    }
  };

  // Calculate route summary
  const routeSummary = useMemo(() => {
    if (!startLocation || routePoints.length === 0) {
      return { totalServices: 0, estimatedTime: '0 min', totalDistance: 0 };
    }

    let totalDistance = 0;
    let currentLat = startLocation.lat;
    let currentLng = startLocation.lng;

    // Calculate total distance by summing distances between consecutive points
    routePoints.forEach(point => {
      totalDistance += calculateDistance(currentLat, currentLng, point.lat, point.lng);
      currentLat = point.lat;
      currentLng = point.lng;
    });

    // Estimate time based on 60 km/h average speed
    const averageSpeed = 60; // km/h
    const estimatedHours = totalDistance / averageSpeed;

    return {
      totalServices: routePoints.length,
      estimatedTime: formatTime(estimatedHours),
      totalDistance: Math.round(totalDistance * 10) / 10 // Round to 1 decimal
    };
  }, [routePoints, startLocation]);

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'taller': return '🔧';
      case 'grua': return '🚛';
      case 'gasolinera': return '⛽';
      case 'refacciones': return '🛞';
      case 'hospital': return '🏥';
      default: return '📍';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4">
      <div className="bg-gray-900 border border-gray-700 rounded-lg max-w-md w-full max-h-[80vh] flex flex-col">
        {/* Header */}
        <div className="p-4 border-b border-gray-700 flex justify-between items-center">
          <h3 className="text-lg font-semibold text-white">🗺️ Ruta Guardada</h3>
          <button 
            onClick={onClose}
            className="text-gray-400 hover:text-gray-300"
          >
            ✕
          </button>
        </div>

        {/* Route Points List */}
        <div className="flex-1 overflow-y-auto p-4">
          {routePoints.length === 0 ? (
            <div className="text-center py-8">
              <div className="text-4xl mb-2">🗺️</div>
              <p className="text-gray-400">No hay servicios en tu ruta</p>
              <p className="text-gray-500 text-sm mt-1">
                Busca servicios y agrégalos a tu ruta
              </p>
            </div>
          ) : (
            <div className="space-y-3">
              {/* Start point */}
              {startLocation && (
                <div className="flex items-center gap-3 p-3 bg-green-900/20 border border-green-500/30 rounded-lg">
                  <div className="text-xl">🏁</div>
                  <div className="flex-1">
                    <div className="font-medium text-green-400">Punto de inicio</div>
                    <div className="text-xs text-gray-400">
                      {startLocation.lat.toFixed(4)}, {startLocation.lng.toFixed(4)}
                    </div>
                  </div>
                </div>
              )}

              {/* Route points */}
              {routePoints.map((point, index) => (
                <div key={point.id} className="flex items-center gap-3 p-3 bg-gray-800 rounded-lg">
                  <div className="text-xl">{getTypeIcon(point.type)}</div>
                  <div className="flex-1">
                    <div className="font-medium text-white">{point.name}</div>
                    {point.description && (
                      <div className="text-sm text-gray-400">{point.description}</div>
                    )}
                    <div className="text-xs text-gray-500">
                      Parada {index + 1}
                    </div>
                  </div>
                  <button
                    onClick={() => onRemovePoint(point.id)}
                    className="text-red-400 hover:text-red-300 p-1"
                  >
                    🗑️
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>

        {/* Route Summary */}
        {routePoints.length > 0 && (
          <div className="p-4 border-t border-gray-700 bg-gray-800/50">
            <h4 className="font-medium text-white mb-3">📊 Resumen de la Ruta</h4>
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div className="text-center">
                <div className="text-2xl font-bold text-blue-400">{routeSummary.totalServices}</div>
                <div className="text-gray-400">Servicios</div>
              </div>
              <div className="text-center">
                <div className="text-2xl font-bold text-green-400">{routeSummary.estimatedTime}</div>
                <div className="text-gray-400">Tiempo estimado</div>
              </div>
            </div>
            <div className="text-center mt-2">
              <div className="text-sm text-gray-500">
                Distancia total: {routeSummary.totalDistance} km
              </div>
              <div className="text-xs text-gray-600 mt-1">
                *Basado en velocidad promedio de 60 km/h
              </div>
            </div>
          </div>
        )}

        {/* Actions */}
        <div className="p-4 border-t border-gray-700">
          <div className="flex gap-2">
            {routePoints.length > 0 && (
              <>
                <button
                  onClick={onClearRoute}
                  className="flex-1 bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
                >
                  🗑️ Limpiar Ruta
                </button>
                <button
                  onClick={() => {
                    const routeUrl = `https://maps.google.com/dir/${startLocation?.lat},${startLocation?.lng}/${routePoints.map(p => `${p.lat},${p.lng}`).join('/')}`;
                    window.open(routeUrl, '_blank');
                  }}
                  className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded"
                >
                  🗺️ Abrir en Maps
                </button>
              </>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
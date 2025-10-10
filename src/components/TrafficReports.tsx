import React, { useState, useEffect } from 'react';
import { AlertTriangle, Car, Clock, MapPin, RefreshCw } from 'lucide-react';
import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

interface TrafficReport {
  id: string;
  type: 'accident' | 'construction' | 'congestion' | 'roadwork';
  location: string;
  description: string;
  severity: 'low' | 'medium' | 'high';
  timestamp: string;
  coordinates: { lat: number; lng: number };
}

const TrafficReports: React.FC = () => {
  const [reports, setReports] = useState<TrafficReport[]>([]);
  const [userLocation, setUserLocation] = useState<{ lat: number; lng: number } | null>(null);

  // Datos de ejemplo
  const mockReports: TrafficReport[] = [
    {
      id: '1',
      type: 'accident',
      location: 'Av. Insurgentes Sur km 15',
      description: 'Accidente múltiple con 3 vehículos involucrados',
      severity: 'high',
      timestamp: new Date(Date.now() - 30 * 60 * 1000).toISOString(),
      coordinates: { lat: 19.4326, lng: -99.1332 }
    },
    {
      id: '2',
      type: 'construction',
      location: 'Paseo de la Reforma',
      description: 'Obras de mantenimiento en ambos sentidos',
      severity: 'medium',
      timestamp: new Date(Date.now() - 2 * 60 * 60 * 1000).toISOString(),
      coordinates: { lat: 19.4330, lng: -99.1475 }
    },
    {
      id: '3',
      type: 'congestion',
      location: 'Circuito Interior',
      description: 'Tráfico lento por hora pico',
      severity: 'low',
      timestamp: new Date(Date.now() - 15 * 60 * 1000).toISOString(),
      coordinates: { lat: 19.4270, lng: -99.1677 }
    }
  ];

  useEffect(() => {
    setReports(mockReports);

    // Obtener ubicación del usuario
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude
          });
        }
      );
    }

    // Auto-refresh cada 30 segundos para simular tiempo real
    const interval = setInterval(() => {
      // Simular nuevos reportes o actualizaciones
      const updatedReports = mockReports.map(report => ({
        ...report,
        timestamp: new Date().toISOString()
      }));
      setReports(updatedReports);
    }, 30000);

    return () => clearInterval(interval);
  }, []);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'high': return '#dc2626';
      case 'medium': return '#d97706';
      case 'low': return '#16a34a';
      default: return '#6b7280';
    }
  };

  const getTypeIcon = (type: string) => {
    switch (type) {
      case 'accident': return <AlertTriangle size={20} />;
      case 'construction': return <AlertTriangle size={20} />;
      case 'congestion': return <Car size={20} />;
      case 'roadwork': return <AlertTriangle size={20} />;
      default: return <AlertTriangle size={20} />;
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMinutes = Math.floor((now.getTime() - date.getTime()) / (1000 * 60));

    if (diffMinutes < 60) {
      return `Hace ${diffMinutes} min`;
    } else {
      return date.toLocaleTimeString('es-MX', {
        hour: '2-digit',
        minute: '2-digit'
      });
    }
  };

  const refreshReports = () => {
    // Simular actualización inmediata
    const updatedReports = mockReports.map(report => ({
      ...report,
      timestamp: new Date().toISOString()
    }));
    setReports(updatedReports);
  };

  const mapContainerStyle = {
    width: '100%',
    height: '400px'
  };

  const defaultCenter = { lat: 19.4326, lng: -99.1332 }; // México City default

  const getMarkerIcon = (severity: string, type: string) => {
    const baseColor = getSeverityColor(severity);
    return {
      path: 'M 0,0 C 0,-7 7,-7 7,0 C 7,7 0,7 0,7 C -7,7 -7,0 -7,0 C -7,-7 0,-7 0,0 z',
      fillColor: baseColor,
      fillOpacity: 0.8,
      scale: 0.6,
      strokeColor: 'white',
      strokeWeight: 2
    };
  };

  return (
    <div className="traffic-reports">
      <div className="reports-header">
        <h2>Reportes de Tráfico en Tiempo Real</h2>
        <button onClick={refreshReports} className="refresh-button">
          <RefreshCw size={20} />
          Actualizar
        </button>
      </div>

      <div className="traffic-map">
        <LoadScript
          googleMapsApiKey={import.meta.env.VITE_GOOGLE_MAPS_API_KEY || 'YOUR_API_KEY_HERE'}
        >
          <GoogleMap
            mapContainerStyle={mapContainerStyle}
            center={userLocation || defaultCenter}
            zoom={12}
          >
            {userLocation && (
              <Marker
                position={userLocation}
                title="Tu ubicación"
                icon={{
                  path: 'M 0,0 C 0,-7 7,-7 7,0 C 7,7 0,7 0,7 C -7,7 -7,0 -7,0 C -7,-7 0,-7 0,0 z',
                  fillColor: '#2563eb',
                  fillOpacity: 1,
                  scale: 0.7,
                  strokeColor: 'white',
                  strokeWeight: 2
                }}
              />
            )}
            {reports.map(report => (
              <Marker
                key={report.id}
                position={report.coordinates}
                title={`${report.type} - ${report.location}`}
                icon={getMarkerIcon(report.severity, report.type)}
              />
            ))}
          </GoogleMap>
        </LoadScript>
      </div>

      {userLocation && (
        <div className="user-location">
          <MapPin size={16} />
          <span>Reportes cerca de tu ubicación</span>
        </div>
      )}

      <div className="reports-list">
        {reports.map(report => (
          <div key={report.id} className="report-card">
            <div className="report-header">
              <div className="report-type">
                {getTypeIcon(report.type)}
                <span className="type-text">
                  {report.type === 'accident' ? 'Accidente' :
                   report.type === 'construction' ? 'Construcción' :
                   report.type === 'congestion' ? 'Congestión' : 'Trabajos'}
                </span>
              </div>
              <div
                className="severity-indicator"
                style={{ backgroundColor: getSeverityColor(report.severity) }}
              >
                {report.severity === 'high' ? 'Alto' :
                 report.severity === 'medium' ? 'Medio' : 'Bajo'}
              </div>
            </div>

            <div className="report-content">
              <h3>{report.location}</h3>
              <p>{report.description}</p>

              <div className="report-meta">
                <div className="meta-item">
                  <Clock size={14} />
                  <span>{formatTime(report.timestamp)}</span>
                </div>
                <div className="meta-item">
                  <MapPin size={14} />
                  <span>{report.coordinates.lat.toFixed(4)}, {report.coordinates.lng.toFixed(4)}</span>
                </div>
              </div>
            </div>

            <div className="report-actions">
              <button className="view-route-button">
                Ver Ruta Alternativa
              </button>
              <button className="report-button">
                Reportar Actualización
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="report-form">
        <h3>Reportar Incidente</h3>
        <form>
          <div className="form-group">
            <label htmlFor="incident-type">Tipo de incidente</label>
            <select id="incident-type" aria-label="Seleccionar tipo de incidente">
              <option value="accident">Accidente</option>
              <option value="construction">Construcción</option>
              <option value="congestion">Congestión</option>
              <option value="roadwork">Trabajos en vía</option>
            </select>
          </div>

          <div className="form-group">
            <label>Ubicación</label>
            <input type="text" placeholder="Ej: Av. Insurgentes Norte km 25" />
          </div>

          <div className="form-group">
            <label>Descripción</label>
            <textarea placeholder="Describe el incidente..." rows={3}></textarea>
          </div>

          <button type="submit" className="submit-report-button">
            Enviar Reporte
          </button>
        </form>
      </div>
    </div>
  );
};

export default TrafficReports;

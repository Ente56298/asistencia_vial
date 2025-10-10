import { useState, useEffect } from 'react';

interface VehicleData {
  vin: string;
  make: string;
  model: string;
  year: number;
  mileage: number;
  fuelLevel: number;
  batteryVoltage: number;
  engineTemp: number;
  oilLife: number;
  tirePressure: {
    frontLeft: number;
    frontRight: number;
    rearLeft: number;
    rearRight: number;
  };
  diagnosticCodes: string[];
  lastUpdate: string;
}

interface Alert {
  id: string;
  type: 'WARNING' | 'CRITICAL' | 'INFO';
  title: string;
  message: string;
  timestamp: string;
  resolved: boolean;
}

export default function VehicleTelemetry() {
  const [vehicleData, setVehicleData] = useState<VehicleData | null>(null);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isConnected, setIsConnected] = useState(false);

  useEffect(() => {
    // Simulate vehicle connection
    const connectToVehicle = () => {
      setIsConnected(true);
      
      // Mock vehicle data
      const mockData: VehicleData = {
        vin: 'KMHD84LF5JU123456',
        make: 'Nissan',
        model: 'Sentra',
        year: 2023,
        mileage: 15420,
        fuelLevel: 35,
        batteryVoltage: 12.4,
        engineTemp: 92,
        oilLife: 45,
        tirePressure: {
          frontLeft: 32,
          frontRight: 31,
          rearLeft: 30,
          rearRight: 32
        },
        diagnosticCodes: ['P0171', 'B1234'],
        lastUpdate: new Date().toISOString()
      };

      setVehicleData(mockData);
      
      // Generate predictive alerts
      generatePredictiveAlerts(mockData);
    };

    const timer = setTimeout(connectToVehicle, 2000);
    return () => clearTimeout(timer);
  }, []);

  const generatePredictiveAlerts = (data: VehicleData) => {
    const newAlerts: Alert[] = [];

    // Low fuel alert
    if (data.fuelLevel < 20) {
      newAlerts.push({
        id: 'fuel-low',
        type: 'WARNING',
        title: 'Combustible Bajo',
        message: `Nivel de combustible: ${data.fuelLevel}%. Buscar gasolinera cercana.`,
        timestamp: new Date().toISOString(),
        resolved: false
      });
    }

    // Low tire pressure
    const lowPressure = Object.values(data.tirePressure).some(pressure => pressure < 30);
    if (lowPressure) {
      newAlerts.push({
        id: 'tire-pressure',
        type: 'CRITICAL',
        title: 'Presión de Llantas Baja',
        message: 'Una o más llantas tienen presión baja. Revisar inmediatamente.',
        timestamp: new Date().toISOString(),
        resolved: false
      });
    }

    // Oil life warning
    if (data.oilLife < 15) {
      newAlerts.push({
        id: 'oil-life',
        type: 'WARNING',
        title: 'Cambio de Aceite Próximo',
        message: `Vida útil del aceite: ${data.oilLife}%. Programar servicio.`,
        timestamp: new Date().toISOString(),
        resolved: false
      });
    }

    // Diagnostic codes
    if (data.diagnosticCodes.length > 0) {
      newAlerts.push({
        id: 'diagnostic-codes',
        type: 'CRITICAL',
        title: 'Códigos de Diagnóstico',
        message: `Códigos detectados: ${data.diagnosticCodes.join(', ')}. Revisar con mecánico.`,
        timestamp: new Date().toISOString(),
        resolved: false
      });
    }

    setAlerts(newAlerts);

    // Send notifications for critical alerts
    newAlerts.forEach(alert => {
      if (alert.type === 'CRITICAL' && 'Notification' in window && Notification.permission === 'granted') {
        new Notification(`🚗 ${alert.title}`, {
          body: alert.message,
          icon: '/manifest.json',
          tag: alert.id
        });
      }
    });
  };

  const requestAssistance = (alertType: string) => {
    const assistanceRequest = {
      vehicleData,
      alertType,
      location: 'Current GPS location',
      timestamp: new Date().toISOString(),
      urgency: alertType === 'CRITICAL' ? 'HIGH' : 'MEDIUM'
    };

    // Send to assistance service
    fetch('/api/vehicle-assistance', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify(assistanceRequest)
    }).catch(error => console.error('Assistance request failed:', error));

    alert(`Solicitud de asistencia enviada para: ${alertType}`);
  };

  const getStatusColor = (value: number, thresholds: {good: number, warning: number}) => {
    if (value >= thresholds.good) return 'text-green-400';
    if (value >= thresholds.warning) return 'text-yellow-400';
    return 'text-red-400';
  };

  if (!isConnected) {
    return (
      <div className="rocket-card p-6">
        <div className="text-center">
          <div className="text-4xl mb-4">🚗</div>
          <h3 className="font-semibold mb-2">Conectando con Vehículo</h3>
          <div className="text-gray-400 text-sm mb-4">
            Estableciendo conexión telemática...
          </div>
          <div className="animate-pulse bg-blue-600 h-1 rounded"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Vehicle Info */}
      <div className="rocket-card p-4">
        <div className="flex justify-between items-center mb-4">
          <h3 className="font-semibold">Telemetría del Vehículo</h3>
          <div className="flex items-center gap-2">
            <div className="w-2 h-2 bg-green-400 rounded-full animate-pulse"></div>
            <span className="text-xs text-green-400">Conectado</span>
          </div>
        </div>

        {vehicleData && (
          <div className="space-y-4">
            <div className="grid grid-cols-2 gap-4 text-sm">
              <div>
                <div className="text-gray-400">Vehículo</div>
                <div className="font-semibold">{vehicleData.year} {vehicleData.make} {vehicleData.model}</div>
              </div>
              <div>
                <div className="text-gray-400">Kilometraje</div>
                <div className="font-semibold">{vehicleData.mileage.toLocaleString()} km</div>
              </div>
            </div>

            {/* Status Grid */}
            <div className="grid grid-cols-2 lg:grid-cols-4 gap-3">
              <div className="bg-gray-800 rounded p-3 text-center">
                <div className="text-xs text-gray-400">Combustible</div>
                <div className={`text-lg font-bold ${getStatusColor(vehicleData.fuelLevel, {good: 50, warning: 20})}`}>
                  {vehicleData.fuelLevel}%
                </div>
              </div>

              <div className="bg-gray-800 rounded p-3 text-center">
                <div className="text-xs text-gray-400">Vida del Aceite</div>
                <div className={`text-lg font-bold ${getStatusColor(vehicleData.oilLife, {good: 50, warning: 15})}`}>
                  {vehicleData.oilLife}%
                </div>
              </div>

              <div className="bg-gray-800 rounded p-3 text-center">
                <div className="text-xs text-gray-400">Temp. Motor</div>
                <div className={`text-lg font-bold ${vehicleData.engineTemp > 100 ? 'text-red-400' : 'text-green-400'}`}>
                  {vehicleData.engineTemp}°C
                </div>
              </div>

              <div className="bg-gray-800 rounded p-3 text-center">
                <div className="text-xs text-gray-400">Batería</div>
                <div className={`text-lg font-bold ${getStatusColor(vehicleData.batteryVoltage, {good: 12.6, warning: 12.0})}`}>
                  {vehicleData.batteryVoltage}V
                </div>
              </div>
            </div>

            {/* Tire Pressure */}
            <div className="bg-gray-800 rounded p-3">
              <div className="text-sm font-semibold mb-2">Presión de Llantas (PSI)</div>
              <div className="grid grid-cols-2 gap-2 text-xs">
                <div className="flex justify-between">
                  <span>Delantera Izq:</span>
                  <span className={getStatusColor(vehicleData.tirePressure.frontLeft, {good: 32, warning: 30})}>
                    {vehicleData.tirePressure.frontLeft}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Delantera Der:</span>
                  <span className={getStatusColor(vehicleData.tirePressure.frontRight, {good: 32, warning: 30})}>
                    {vehicleData.tirePressure.frontRight}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Trasera Izq:</span>
                  <span className={getStatusColor(vehicleData.tirePressure.rearLeft, {good: 32, warning: 30})}>
                    {vehicleData.tirePressure.rearLeft}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span>Trasera Der:</span>
                  <span className={getStatusColor(vehicleData.tirePressure.rearRight, {good: 32, warning: 30})}>
                    {vehicleData.tirePressure.rearRight}
                  </span>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="rocket-card p-4">
          <h3 className="font-semibold mb-4">Alertas Predictivas</h3>
          <div className="space-y-3">
            {alerts.map(alert => (
              <div key={alert.id} className={`border-l-4 p-3 rounded ${
                alert.type === 'CRITICAL' ? 'border-red-500 bg-red-900/20' :
                alert.type === 'WARNING' ? 'border-yellow-500 bg-yellow-900/20' :
                'border-blue-500 bg-blue-900/20'
              }`}>
                <div className="flex justify-between items-start mb-2">
                  <div className="font-semibold text-sm">{alert.title}</div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    alert.type === 'CRITICAL' ? 'bg-red-600' :
                    alert.type === 'WARNING' ? 'bg-yellow-600' : 'bg-blue-600'
                  }`}>
                    {alert.type}
                  </span>
                </div>
                <p className="text-sm text-gray-300 mb-3">{alert.message}</p>
                <div className="flex gap-2">
                  <button
                    onClick={() => requestAssistance(alert.type)}
                    className="bg-blue-600 hover:bg-blue-700 text-white text-xs px-3 py-1 rounded"
                  >
                    Solicitar Asistencia
                  </button>
                  <button
                    onClick={() => setAlerts(prev => prev.filter(a => a.id !== alert.id))}
                    className="bg-gray-600 hover:bg-gray-700 text-white text-xs px-3 py-1 rounded"
                  >
                    Descartar
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
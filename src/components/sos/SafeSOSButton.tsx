import React, { useState, useEffect, useCallback } from 'react';
import {
  EmergencyIncident,
  EmergencyContact,
  Location,
  SOSButtonProps,
  SOSButtonState,
  EmergencyFlowState,
  SOSConfig
} from './types';
import EmergencyConfirmationModal from './EmergencyConfirmationModal';
import { useEmergencyLogger } from './EmergencyLogger';

const DEFAULT_EMERGENCY_CONTACTS: EmergencyContact[] = [
  { id: '911', name: 'Emergencias', phone: '911', priority: 1 },
  { id: '065', name: 'Ángeles Verdes', phone: '065', priority: 2 },
  { id: '078', name: 'Seguridad Vial', phone: '078', priority: 3 }
];

const DEFAULT_CONFIG: SOSConfig = {
  autoCancelTimeout: 300000, // 5 minutos
  confirmationTimeout: 30000, // 30 segundos por paso
  maxRetryAttempts: 3,
  enablePlusCodes: true,
  enableSatelliteMode: true,
  emergencyNumbers: ['911', '065', '078'],
  logRetentionDays: 30
};

export default function SafeSOSButton({
  variant = 'primary',
  size = 'medium',
  position = 'fixed',
  disabled = false,
  onEmergencyStart,
  onEmergencyCancel,
  onEmergencyExecute,
  ...props
}: SOSButtonProps & { [key: string]: any }) {
  // Estados del componente
  const [state, setState] = useState<SOSButtonState>({
    isActive: false,
    isOffline: !navigator.onLine,
    batteryLevel: 100,
    currentIncident: null,
    showConfirmation: false,
    confirmationStep: 0,
    countdown: 0,
    canCancel: true
  });

  const [flowState, setFlowState] = useState<EmergencyFlowState>('idle');
  const [location, setLocation] = useState<Location | null>(null);
  const [emergencyContacts] = useState<EmergencyContact[]>(DEFAULT_EMERGENCY_CONTACTS);
  const [config] = useState<SOSConfig>(DEFAULT_CONFIG);

  // Usar el logger de emergencias
  const logger = useEmergencyLogger();

  // Monitorear estado de conexión y batería
  useEffect(() => {
    const handleOnline = () => setState(prev => ({ ...prev, isOffline: false }));
    const handleOffline = () => setState(prev => ({ ...prev, isOffline: true }));

    window.addEventListener('online', handleOnline);
    window.addEventListener('offline', handleOffline);

    // Obtener nivel de batería
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        setState(prev => ({ ...prev, batteryLevel: Math.round(battery.level * 100) }));
        battery.addEventListener('levelchange', () => {
          setState(prev => ({ ...prev, batteryLevel: Math.round(battery.level * 100) }));
        });
      });
    }

    return () => {
      window.removeEventListener('online', handleOnline);
      window.removeEventListener('offline', handleOffline);
    };
  }, []);

  // Obtener ubicación actual
  const getCurrentLocation = useCallback((): Promise<Location | null> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => {
          const locationData: Location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy
          };

          // Generar Plus Code si está habilitado
          if (config.enablePlusCodes) {
            locationData.plusCode = generatePlusCode(locationData.lat, locationData.lng);
          }

          resolve(locationData);
        },
        () => resolve(null),
        {
          enableHighAccuracy: true,
          timeout: 10000,
          maximumAge: 60000
        }
      );
    });
  }, [config.enablePlusCodes]);

  // Generar Plus Code básico (en producción usar librería especializada)
  const generatePlusCode = (lat: number, lng: number): string => {
    return `${lat.toFixed(6)},${lng.toFixed(6)}`;
  };

  // Iniciar flujo de emergencia seguro
  const handleSOSClick = useCallback(async () => {
    if (disabled || state.isActive) return;

    setState(prev => ({ ...prev, isActive: true }));
    setFlowState('initializing');

    try {
      // Obtener ubicación
      const currentLocation = await getCurrentLocation();
      setLocation(currentLocation);

      // Crear incidente
      const incident: EmergencyIncident = {
        id: `sos_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString(),
        location: currentLocation,
        batteryLevel: state.batteryLevel,
        deviceInfo: navigator.userAgent,
        emergencyContacts: emergencyContacts,
        status: 'pending',
        confirmationSteps: [],
        executionLog: [{
          timestamp: new Date().toISOString(),
          action: 'SOS_BUTTON_PRESSED',
          status: 'success',
          message: 'Botón SOS presionado - Iniciando protocolo seguro'
        }]
      };

      setState(prev => ({
        ...prev,
        currentIncident: incident,
        showConfirmation: true
      }));

      setFlowState('confirmation_required');
      logger.logIncident(incident);
      onEmergencyStart?.(incident);

    } catch (error) {
      console.error('Error iniciando emergencia:', error);
      setFlowState('error');
      setState(prev => ({ ...prev, isActive: false }));
    }
  }, [disabled, state.isActive, state.batteryLevel, emergencyContacts, getCurrentLocation, logger, onEmergencyStart]);

  // Manejar confirmación de emergencia
  const handleEmergencyConfirm = useCallback((incident: EmergencyIncident) => {
    setState(prev => ({
      ...prev,
      currentIncident: incident,
      showConfirmation: false
    }));

    setFlowState('executing');
    logger.updateIncident(incident.id, { status: 'confirmed' });

    // Ejecutar protocolo de emergencia seguro
    executeEmergencyProtocol(incident);
    onEmergencyExecute?.(incident);
  }, [logger, onEmergencyExecute]);

  // Manejar cancelación de emergencia
  const handleEmergencyCancel = useCallback((incident: EmergencyIncident) => {
    setState(prev => ({
      ...prev,
      isActive: false,
      currentIncident: null,
      showConfirmation: false
    }));

    setFlowState('cancelled');
    logger.updateIncident(incident.id, { status: 'cancelled' });
    onEmergencyCancel?.(incident);
  }, [logger, onEmergencyCancel]);

  // Ejecutar protocolo de emergencia seguro
  const executeEmergencyProtocol = useCallback(async (incident: EmergencyIncident) => {
    try {
      logger.logAction(incident.id, 'EMERGENCY_EXECUTION_START', 'success', 'Iniciando ejecución del protocolo de emergencia');

      // 1. Preparar datos para transmisión
      const emergencyData = {
        timestamp: incident.timestamp,
        location: incident.location,
        batteryLevel: incident.batteryLevel,
        deviceInfo: incident.deviceInfo,
        emergencyContacts: incident.emergencyContacts,
        plusCode: incident.location?.plusCode
      };

      // 2. Almacenar datos localmente para redundancia
      localStorage.setItem('pending_emergency_data', JSON.stringify(emergencyData));
      logger.logAction(incident.id, 'DATA_STORED', 'success', 'Datos de emergencia almacenados localmente');

      // 3. Si hay conexión, intentar envío inmediato
      if (!state.isOffline) {
        await attemptEmergencyTransmission(incident);
      } else {
        // Modo offline - preparar para transmisión satelital
        await prepareOfflineEmergency(incident);
      }

      // 4. Mostrar interfaz de emergencia activa
      showEmergencyInterface(incident);

      setFlowState('completed');
      logger.logAction(incident.id, 'EMERGENCY_EXECUTION_COMPLETE', 'success', 'Protocolo de emergencia ejecutado exitosamente');

    } catch (error) {
      console.error('Error ejecutando protocolo de emergencia:', error);
      logger.logAction(incident.id, 'EMERGENCY_EXECUTION_ERROR', 'error', 'Error ejecutando protocolo de emergencia', { error });
      setFlowState('error');
    }
  }, [state.isOffline, logger]);

  // Intentar transmisión de emergencia
  const attemptEmergencyTransmission = useCallback(async (incident: EmergencyIncident) => {
    try {
      // Simular llamada API (en producción sería un endpoint real)
      const response = await fetch('/api/emergency-alert', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          incidentId: incident.id,
          location: incident.location,
          timestamp: incident.timestamp,
          contacts: incident.emergencyContacts
        })
      });

      if (response.ok) {
        logger.logAction(incident.id, 'EMERGENCY_TRANSMISSION_SUCCESS', 'success', 'Datos de emergencia transmitidos exitosamente');
        localStorage.removeItem('pending_emergency_data');
      } else {
        throw new Error('Error en transmisión');
      }
    } catch (error) {
      logger.logAction(incident.id, 'EMERGENCY_TRANSMISSION_FAILED', 'error', 'Fallo en transmisión de emergencia', { error });
      // Los datos quedan almacenados para reintento posterior
    }
  }, [logger]);

  // Preparar modo offline/satélite
  const prepareOfflineEmergency = useCallback(async (incident: EmergencyIncident) => {
    logger.logAction(incident.id, 'OFFLINE_MODE_ACTIVATED', 'warning', 'Modo offline activado - preparando transmisión satelital');

    // Crear mensaje para transmisión satelital
    const satelliteMessage = {
      type: 'EMERGENCY_SOS',
      incidentId: incident.id,
      location: incident.location,
      timestamp: incident.timestamp,
      message: 'EMERGENCIA VIAL - Asistencia requerida',
      plusCode: incident.location?.plusCode
    };

    localStorage.setItem('satellite_emergency_queue', JSON.stringify(satelliteMessage));
    logger.logAction(incident.id, 'SATELLITE_QUEUE_PREPARED', 'success', 'Mensaje preparado para transmisión satelital');
  }, [logger]);

  // Mostrar interfaz de emergencia activa
  const showEmergencyInterface = useCallback((incident: EmergencyIncident) => {
    setState(prev => ({ ...prev, isActive: true }));

    // Crear indicador visual persistente
    const indicator = document.createElement('div');
    indicator.id = 'emergency-indicator';
    indicator.innerHTML = '🚨 EMERGENCIA ACTIVA';
    indicator.style.cssText = `
      position: fixed;
      top: 10px;
      right: 10px;
      background: linear-gradient(45deg, #dc2626, #b91c1c);
      color: white;
      padding: 8px 12px;
      border-radius: 8px;
      z-index: 9999;
      font-size: 12px;
      font-weight: bold;
      box-shadow: 0 4px 12px rgba(220, 38, 38, 0.4);
      animation: emergency-pulse 2s infinite;
      border: 2px solid #fca5a5;
    `;

    // Remover indicador anterior si existe
    const existingIndicator = document.getElementById('emergency-indicator');
    if (existingIndicator) {
      existingIndicator.remove();
    }

    document.body.appendChild(indicator);

    logger.logAction(incident.id, 'EMERGENCY_INTERFACE_SHOWN', 'success', 'Interfaz de emergencia mostrada al usuario');
  }, [logger]);

  // Limpiar interfaz cuando se desactiva
  const cleanupEmergencyInterface = useCallback(() => {
    const indicator = document.getElementById('emergency-indicator');
    if (indicator) {
      indicator.remove();
    }
    setState(prev => ({
      ...prev,
      isActive: false,
      currentIncident: null
    }));
  }, []);

  // Cleanup al desmontar
  useEffect(() => {
    return () => {
      cleanupEmergencyInterface();
    };
  }, [cleanupEmergencyInterface]);

  // Determinar clases CSS según estado
  const getButtonClasses = () => {
    const baseClasses = `sos-button-safe ${variant} ${size} ${position}`;

    if (disabled) return `${baseClasses} disabled`;
    if (state.isActive) return `${baseClasses} active`;
    if (state.isOffline) return `${baseClasses} offline`;
    return baseClasses;
  };

  return (
    <>
      <button
        onClick={handleSOSClick}
        disabled={disabled || state.isActive}
        className={getButtonClasses()}
        {...props}
      >
        <div className="sos-button-content">
          <span className="sos-icon">
            {state.isOffline ? '📡' : state.isActive ? '🚨' : '🆘'}
          </span>
          <span className="sos-text">
            {state.isActive ? 'EMERGENCIA' : 'SOS'}
          </span>
          {state.isOffline && (
            <span className="sos-status">SIN SEÑAL</span>
          )}
          {state.isActive && (
            <span className="sos-status">ACTIVO</span>
          )}
        </div>
      </button>

      {/* Modal de confirmación */}
      <EmergencyConfirmationModal
        isOpen={state.showConfirmation}
        onClose={() => setState(prev => ({ ...prev, showConfirmation: false }))}
        onConfirm={handleEmergencyConfirm}
        onCancel={handleEmergencyCancel}
        initialLocation={location}
        emergencyContacts={emergencyContacts}
        config={config}
      />

      {/* Información de estado (debug) */}
      {process.env.NODE_ENV === 'development' && (
        <div className="sos-debug-info">
          <div>Estado: {flowState}</div>
          <div>Batería: {state.batteryLevel}%</div>
          <div>Conexión: {state.isOffline ? 'Offline' : 'Online'}</div>
          {location && (
            <div>Ubicación: {location.lat.toFixed(4)}, {location.lng.toFixed(4)}</div>
          )}
        </div>
      )}

      <style jsx>{`
        .sos-button-safe {
          border: none;
          border-radius: 50%;
          cursor: pointer;
          display: flex;
          align-items: center;
          justify-content: center;
          font-weight: bold;
          transition: all 0.3s ease;
          position: ${position === 'fixed' ? 'fixed' : 'relative'};
          bottom: ${position === 'fixed' ? '20px' : 'auto'};
          right: ${position === 'fixed' ? '20px' : 'auto'};
          z-index: 1000;
        }

        .sos-button-safe.primary {
          background: linear-gradient(135deg, #dc2626, #b91c1c);
          color: white;
          width: ${size === 'small' ? '60px' : size === 'medium' ? '80px' : '100px'};
          height: ${size === 'small' ? '60px' : size === 'medium' ? '80px' : '100px'};
          font-size: ${size === 'small' ? '12px' : size === 'medium' ? '14px' : '16px'};
        }

        .sos-button-safe.secondary {
          background: linear-gradient(135deg, #f59e0b, #d97706);
          color: white;
          width: ${size === 'small' ? '60px' : size === 'medium' ? '80px' : '100px'};
          height: ${size === 'small' ? '60px' : size === 'medium' ? '80px' : '100px'};
          font-size: ${size === 'small' ? '12px' : size === 'medium' ? '14px' : '16px'};
        }

        .sos-button-safe.emergency {
          background: linear-gradient(135deg, #7c2d12, #991b1b);
          color: white;
          width: ${size === 'small' ? '60px' : size === 'medium' ? '80px' : '100px'};
          height: ${size === 'small' ? '60px' : size === 'medium' ? '80px' : '100px'};
          font-size: ${size === 'small' ? '12px' : size === 'medium' ? '14px' : '16px'};
        }

        .sos-button-safe:hover:not(:disabled) {
          transform: scale(1.05);
          box-shadow: 0 4px 20px rgba(0, 0, 0, 0.3);
        }

        .sos-button-safe.active {
          animation: emergency-pulse 1.5s infinite;
          box-shadow: 0 0 30px rgba(220, 38, 38, 0.8);
        }

        .sos-button-safe.offline {
          animation: offline-pulse 2s infinite;
          box-shadow: 0 0 20px rgba(245, 158, 11, 0.6);
        }

        .sos-button-safe.disabled {
          opacity: 0.5;
          cursor: not-allowed;
        }

        .sos-button-content {
          display: flex;
          flex-direction: column;
          align-items: center;
          gap: 2px;
        }

        .sos-icon {
          font-size: 1.2em;
        }

        .sos-text {
          font-size: 0.8em;
          line-height: 1;
        }

        .sos-status {
          font-size: 0.6em;
          opacity: 0.9;
        }

        .sos-debug-info {
          position: fixed;
          bottom: 120px;
          right: 20px;
          background: rgba(0, 0, 0, 0.8);
          color: #10b981;
          padding: 8px;
          border-radius: 4px;
          font-size: 10px;
          font-family: monospace;
          z-index: 999;
        }

        @keyframes emergency-pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 30px rgba(220, 38, 38, 0.8);
          }
          50% {
            transform: scale(1.1);
            box-shadow: 0 0 40px rgba(220, 38, 38, 1);
          }
        }

        @keyframes offline-pulse {
          0%, 100% {
            transform: scale(1);
            box-shadow: 0 0 20px rgba(245, 158, 11, 0.6);
          }
          50% {
            transform: scale(1.05);
            box-shadow: 0 0 30px rgba(245, 158, 11, 0.8);
          }
        }
      `}</style>
    </>
  );
}
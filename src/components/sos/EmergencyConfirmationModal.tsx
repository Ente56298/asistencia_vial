import React, { useState, useEffect, useCallback } from 'react';
import {
  EmergencyIncident,
  ConfirmationStep,
  EmergencyContact,
  Location,
  SOSConfig
} from './types';

interface EmergencyConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (incident: EmergencyIncident) => void;
  onCancel: (incident: EmergencyIncident) => void;
  initialLocation?: Location | null;
  emergencyContacts?: EmergencyContact[];
  config?: Partial<SOSConfig>;
}

type ConfirmationPhase =
  | 'initial'
  | 'location'
  | 'contacts'
  | 'final'
  | 'executing'
  | 'completed';

const DEFAULT_CONFIG: SOSConfig = {
  autoCancelTimeout: 300000, // 5 minutos
  confirmationTimeout: 30000, // 30 segundos por paso
  maxRetryAttempts: 3,
  enablePlusCodes: true,
  enableSatelliteMode: true,
  emergencyNumbers: ['911', '065', '078'],
  logRetentionDays: 30
};

export default function EmergencyConfirmationModal({
  isOpen,
  onClose,
  onConfirm,
  onCancel,
  initialLocation,
  emergencyContacts = [],
  config = {}
}: EmergencyConfirmationModalProps) {
  const [currentPhase, setCurrentPhase] = useState<ConfirmationPhase>('initial');
  const [currentStep, setCurrentStep] = useState(0);
  const [countdown, setCountdown] = useState(30);
  const [location, setLocation] = useState<Location | null>(initialLocation || null);
  const [selectedContacts, setSelectedContacts] = useState<EmergencyContact[]>([]);
  const [incident, setIncident] = useState<EmergencyIncident | null>(null);
  const [canCancel, setCanCancel] = useState(true);

  const fullConfig = { ...DEFAULT_CONFIG, ...config };

  // Inicializar incidente cuando se abre el modal
  useEffect(() => {
    if (isOpen && !incident) {
      const newIncident: EmergencyIncident = {
        id: `emergency_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
        timestamp: new Date().toISOString(),
        location: location,
        batteryLevel: getBatteryLevel(),
        deviceInfo: navigator.userAgent,
        emergencyContacts: emergencyContacts,
        status: 'pending',
        confirmationSteps: [],
        executionLog: []
      };
      setIncident(newIncident);
    }
  }, [isOpen, incident, location, emergencyContacts]);

  // Temporizador de seguridad
  useEffect(() => {
    if (!isOpen || currentPhase === 'completed') return;

    const timer = setInterval(() => {
      setCountdown(prev => {
        if (prev <= 1) {
          handleAutoCancel();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);

    return () => clearInterval(timer);
  }, [isOpen, currentPhase, countdown]);

  // Reiniciar countdown cuando cambia la fase
  useEffect(() => {
    setCountdown(fullConfig.confirmationTimeout / 1000);
  }, [currentPhase, fullConfig.confirmationTimeout]);

  const getBatteryLevel = (): number => {
    if ('getBattery' in navigator) {
      (navigator as any).getBattery().then((battery: any) => {
        return Math.round(battery.level * 100);
      });
    }
    return 100;
  };

  const handleAutoCancel = useCallback(() => {
    if (!incident) return;

    const cancelledIncident: EmergencyIncident = {
      ...incident,
      status: 'cancelled',
      executionLog: [
        ...incident.executionLog,
        {
          timestamp: new Date().toISOString(),
          action: 'AUTO_CANCEL',
          status: 'warning',
          message: 'Cancelado automáticamente por tiempo excedido'
        }
      ]
    };

    setCanCancel(false);
    onCancel(cancelledIncident);
  }, [incident, onCancel]);

  const logConfirmationStep = useCallback((step: ConfirmationStep) => {
    if (!incident) return;

    const updatedIncident = {
      ...incident,
      confirmationSteps: [...incident.confirmationSteps, step]
    };
    setIncident(updatedIncident);
  }, [incident]);

  const nextPhase = useCallback(() => {
    const phases: ConfirmationPhase[] = ['initial', 'location', 'contacts', 'final'];
    const currentIndex = phases.indexOf(currentPhase);

    if (currentIndex < phases.length - 1) {
      setCurrentPhase(phases[currentIndex + 1]);
      setCurrentStep(currentIndex + 1);
      setCountdown(fullConfig.confirmationTimeout / 1000);
    }
  }, [currentPhase, fullConfig.confirmationTimeout]);

  const handleInitialConfirm = () => {
    const step: ConfirmationStep = {
      step: 1,
      type: 'initial',
      timestamp: new Date().toISOString(),
      confirmed: true
    };
    logConfirmationStep(step);
    nextPhase();
  };

  const handleLocationConfirm = () => {
    if (!location) {
      // Solicitar ubicación si no la tenemos
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const newLocation: Location = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
            accuracy: position.coords.accuracy
          };

          // Agregar Plus Code si está habilitado
          if (fullConfig.enablePlusCodes) {
            newLocation.plusCode = generatePlusCode(newLocation.lat, newLocation.lng);
          }

          setLocation(newLocation);

          const step: ConfirmationStep = {
            step: 2,
            type: 'location',
            timestamp: new Date().toISOString(),
            confirmed: true,
            data: newLocation
          };
          logConfirmationStep(step);

          if (incident) {
            setIncident({ ...incident, location: newLocation });
          }

          nextPhase();
        },
        (error) => {
          console.error('Error getting location:', error);
          // Continuar sin ubicación precisa
          nextPhase();
        },
        { enableHighAccuracy: true, timeout: 10000 }
      );
    } else {
      const step: ConfirmationStep = {
        step: 2,
        type: 'location',
        timestamp: new Date().toISOString(),
        confirmed: true,
        data: location
      };
      logConfirmationStep(step);
      nextPhase();
    }
  };

  const handleContactsConfirm = () => {
    const step: ConfirmationStep = {
      step: 3,
      type: 'contacts',
      timestamp: new Date().toISOString(),
      confirmed: true,
      data: selectedContacts.length > 0 ? selectedContacts : emergencyContacts
    };
    logConfirmationStep(step);
    nextPhase();
  };

  const handleFinalConfirm = () => {
    if (!incident) return;

    setCurrentPhase('executing');
    setCanCancel(false);

    const finalIncident: EmergencyIncident = {
      ...incident,
      status: 'confirmed',
      location: location,
      emergencyContacts: selectedContacts.length > 0 ? selectedContacts : emergencyContacts,
      confirmationSteps: [
        ...incident.confirmationSteps,
        {
          step: 4,
          type: 'final',
          timestamp: new Date().toISOString(),
          confirmed: true
        }
      ]
    };

    setIncident(finalIncident);
    onConfirm(finalIncident);
  };

  const handleCancel = () => {
    if (!incident || !canCancel) return;

    const cancelledIncident: EmergencyIncident = {
      ...incident,
      status: 'cancelled',
      executionLog: [
        ...incident.executionLog,
        {
          timestamp: new Date().toISOString(),
          action: 'USER_CANCEL',
          status: 'warning',
          message: 'Cancelado por el usuario'
        }
      ]
    };

    onCancel(cancelledIncident);
  };

  const generatePlusCode = (lat: number, lng: number): string => {
    // Implementación básica de Plus Code (Open Location Code)
    // En producción usarías una librería como 'open-location-code'
    return `${lat.toFixed(6)},${lng.toFixed(6)}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div className="bg-gray-900 border border-red-500 rounded-lg p-6 max-w-md w-full">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-red-400 text-xl font-bold flex items-center">
            🚨 Confirmación de Emergencia
          </h2>
          <div className="text-red-300 text-sm">
            {Math.floor(countdown / 60)}:{(countdown % 60).toString().padStart(2, '0')}
          </div>
        </div>

        {/* Progress Indicator */}
        <div className="mb-6">
          <div className="flex justify-between text-sm text-gray-400 mb-2">
            <span>Paso {currentStep + 1} de 4</span>
            <span>{Math.round(((currentStep + 1) / 4) * 100)}%</span>
          </div>
          <div className="w-full bg-gray-700 rounded-full h-2">
            <div
              className="bg-red-500 h-2 rounded-full transition-all duration-300"
              style={{ width: `${((currentStep + 1) / 4) * 100}%` }}
            />
          </div>
        </div>

        {/* Content based on phase */}
        <div className="mb-6 min-h-32">
          {currentPhase === 'initial' && (
            <div className="text-center">
              <div className="text-4xl mb-4">⚠️</div>
              <h3 className="text-yellow-400 font-bold mb-2">¿Estás en una emergencia?</h3>
              <p className="text-gray-300 text-sm mb-4">
                Esta acción iniciará el protocolo de emergencia y contactará a servicios de asistencia.
              </p>
              <div className="bg-red-900 bg-opacity-50 p-3 rounded border border-red-700">
                <p className="text-red-200 text-xs">
                  🔴 Se realizarán llamadas automáticas a números de emergencia
                </p>
              </div>
            </div>
          )}

          {currentPhase === 'location' && (
            <div className="text-center">
              <div className="text-4xl mb-4">📍</div>
              <h3 className="text-blue-400 font-bold mb-2">Confirmar Ubicación</h3>
              {location ? (
                <div className="bg-blue-900 bg-opacity-50 p-3 rounded mb-4">
                  <p className="text-blue-200 text-sm font-mono">
                    {location.lat.toFixed(6)}, {location.lng.toFixed(6)}
                  </p>
                  {location.plusCode && (
                    <p className="text-blue-300 text-xs mt-1">
                      Plus Code: {location.plusCode}
                    </p>
                  )}
                </div>
              ) : (
                <p className="text-gray-300 mb-4">Obteniendo ubicación precisa...</p>
              )}
              <p className="text-gray-400 text-sm">
                Esta ubicación será compartida con servicios de emergencia
              </p>
            </div>
          )}

          {currentPhase === 'contacts' && (
            <div className="text-center">
              <div className="text-4xl mb-4">📞</div>
              <h3 className="text-green-400 font-bold mb-2">Contactos de Emergencia</h3>
              <div className="space-y-2 mb-4 max-h-32 overflow-y-auto">
                {(selectedContacts.length > 0 ? selectedContacts : emergencyContacts).map((contact) => (
                  <div key={contact.id} className="bg-green-900 bg-opacity-50 p-2 rounded text-sm">
                    <div className="font-bold text-green-200">{contact.name}</div>
                    <div className="text-green-300">{contact.phone}</div>
                  </div>
                ))}
              </div>
              <p className="text-gray-400 text-sm">
                Estos contactos serán notificados
              </p>
            </div>
          )}

          {currentPhase === 'final' && (
            <div className="text-center">
              <div className="text-4xl mb-4">🔥</div>
              <h3 className="text-red-400 font-bold mb-2">Confirmación Final</h3>
              <div className="bg-red-900 bg-opacity-70 p-4 rounded mb-4 border-2 border-red-500">
                <p className="text-red-100 font-bold mb-2">🚨 ACCIÓN IRREVERSIBLE</p>
                <p className="text-red-200 text-sm">
                  Se iniciará el protocolo de emergencia completo
                </p>
              </div>
              <p className="text-gray-300 text-sm">
                Esta es tu última oportunidad para cancelar
              </p>
            </div>
          )}

          {currentPhase === 'executing' && (
            <div className="text-center">
              <div className="text-4xl mb-4 animate-spin">⚡</div>
              <h3 className="text-yellow-400 font-bold mb-2">Ejecutando Protocolo</h3>
              <p className="text-gray-300">Iniciando llamadas de emergencia...</p>
            </div>
          )}
        </div>

        {/* Action Buttons */}
        <div className="flex gap-3">
          {canCancel && currentPhase !== 'executing' && (
            <button
              onClick={handleCancel}
              className="flex-1 bg-gray-600 hover:bg-gray-700 text-white py-3 px-4 rounded font-bold transition-colors"
            >
              Cancelar
            </button>
          )}

          {currentPhase === 'initial' && (
            <button
              onClick={handleInitialConfirm}
              className="flex-1 bg-red-600 hover:bg-red-700 text-white py-3 px-4 rounded font-bold transition-colors"
            >
              Continuar
            </button>
          )}

          {currentPhase === 'location' && (
            <button
              onClick={handleLocationConfirm}
              className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded font-bold transition-colors"
            >
              Confirmar Ubicación
            </button>
          )}

          {currentPhase === 'contacts' && (
            <button
              onClick={handleContactsConfirm}
              className="flex-1 bg-green-600 hover:bg-green-700 text-white py-3 px-4 rounded font-bold transition-colors"
            >
              Confirmar Contactos
            </button>
          )}

          {currentPhase === 'final' && (
            <button
              onClick={handleFinalConfirm}
              className="flex-1 bg-red-500 hover:bg-red-600 text-white py-3 px-4 rounded font-bold transition-colors animate-pulse"
            >
              🚨 EJECUTAR EMERGENCIA
            </button>
          )}
        </div>

        {/* Warning */}
        <div className="mt-4 text-center">
          <p className="text-red-300 text-xs">
            ⚠️ Solo usar en situaciones de emergencia real
          </p>
        </div>
      </div>
    </div>
  );
}
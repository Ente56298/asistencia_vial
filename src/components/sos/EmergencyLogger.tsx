import React, { createContext, useContext, useCallback, useState } from 'react';
import {
  EmergencyIncident,
  ExecutionLogEntry,
  ConfirmationStep,
  SOSConfig
} from './types';

interface EmergencyLoggerContextType {
  // Registro de incidentes
  logIncident: (incident: EmergencyIncident) => void;
  updateIncident: (id: string, updates: Partial<EmergencyIncident>) => void;

  // Registro de acciones
  logAction: (incidentId: string, action: string, status: 'success' | 'error' | 'warning', message: string, data?: any) => void;

  // Registro de pasos de confirmación
  logConfirmationStep: (incidentId: string, step: ConfirmationStep) => void;

  // Recuperación de datos
  getIncident: (id: string) => EmergencyIncident | null;
  getAllIncidents: () => EmergencyIncident[];
  getIncidentsByStatus: (status: EmergencyIncident['status']) => EmergencyIncident[];

  // Gestión de logs
  clearOldLogs: (daysToKeep: number) => void;
  exportLogs: () => string;

  // Estadísticas
  getIncidentStats: () => {
    total: number;
    pending: number;
    confirmed: number;
    cancelled: number;
    executed: number;
    last24Hours: number;
  };
}

const EmergencyLoggerContext = createContext<EmergencyLoggerContextType | null>(null);

interface EmergencyLoggerProviderProps {
  children: React.ReactNode;
  config?: Partial<SOSConfig>;
}

const DEFAULT_CONFIG: SOSConfig = {
  autoCancelTimeout: 300000, // 5 minutos
  confirmationTimeout: 30000, // 30 segundos
  maxRetryAttempts: 3,
  enablePlusCodes: true,
  enableSatelliteMode: true,
  emergencyNumbers: ['911', '065', '078'],
  logRetentionDays: 30
};

export function EmergencyLoggerProvider({ children, config = {} }: EmergencyLoggerProviderProps) {
  const [incidents, setIncidents] = useState<EmergencyIncident[]>(() => {
    // Cargar incidentes existentes del localStorage
    try {
      const stored = localStorage.getItem('emergency_incidents');
      return stored ? JSON.parse(stored) : [];
    } catch {
      return [];
    }
  });

  const fullConfig = { ...DEFAULT_CONFIG, ...config };

  // Función para guardar en localStorage
  const saveToStorage = useCallback((newIncidents: EmergencyIncident[]) => {
    try {
      localStorage.setItem('emergency_incidents', JSON.stringify(newIncidents));
      setIncidents(newIncidents);
    } catch (error) {
      console.error('Error saving emergency incidents:', error);
    }
  }, []);

  // Registrar nuevo incidente
  const logIncident = useCallback((incident: EmergencyIncident) => {
    const newIncidents = [incident, ...incidents];
    saveToStorage(newIncidents);

    // Log inicial
    logAction(incident.id, 'INCIDENT_CREATED', 'success', 'Nuevo incidente de emergencia registrado');
  }, [incidents, saveToStorage]);

  // Actualizar incidente existente
  const updateIncident = useCallback((id: string, updates: Partial<EmergencyIncident>) => {
    const newIncidents = incidents.map(incident =>
      incident.id === id ? { ...incident, ...updates } : incident
    );
    saveToStorage(newIncidents);
  }, [incidents, saveToStorage]);

  // Registrar acción específica
  const logAction = useCallback((incidentId: string, action: string, status: 'success' | 'error' | 'warning', message: string, data?: any) => {
    const logEntry: ExecutionLogEntry = {
      timestamp: new Date().toISOString(),
      action,
      status,
      message,
      data
    };

    updateIncident(incidentId, {
      executionLog: [...(incidents.find(i => i.id === incidentId)?.executionLog || []), logEntry]
    });
  }, [incidents, updateIncident]);

  // Registrar paso de confirmación
  const logConfirmationStep = useCallback((incidentId: string, step: ConfirmationStep) => {
    updateIncident(incidentId, {
      confirmationSteps: [
        ...(incidents.find(i => i.id === incidentId)?.confirmationSteps || []),
        step
      ]
    });
  }, [incidents, updateIncident]);

  // Obtener incidente específico
  const getIncident = useCallback((id: string): EmergencyIncident | null => {
    return incidents.find(incident => incident.id === id) || null;
  }, [incidents]);

  // Obtener todos los incidentes
  const getAllIncidents = useCallback((): EmergencyIncident[] => {
    return [...incidents];
  }, [incidents]);

  // Obtener incidentes por estado
  const getIncidentsByStatus = useCallback((status: EmergencyIncident['status']): EmergencyIncident[] => {
    return incidents.filter(incident => incident.status === status);
  }, [incidents]);

  // Limpiar logs antiguos
  const clearOldLogs = useCallback((daysToKeep: number) => {
    const cutoffDate = new Date();
    cutoffDate.setDate(cutoffDate.getDate() - daysToKeep);

    const filteredIncidents = incidents.filter(incident =>
      new Date(incident.timestamp) > cutoffDate
    );

    saveToStorage(filteredIncidents);
  }, [incidents, saveToStorage]);

  // Exportar logs como JSON
  const exportLogs = useCallback((): string => {
    return JSON.stringify(incidents, null, 2);
  }, [incidents]);

  // Obtener estadísticas de incidentes
  const getIncidentStats = useCallback(() => {
    const now = new Date();
    const last24Hours = new Date(now.getTime() - 24 * 60 * 60 * 1000);

    const last24HoursIncidents = incidents.filter(incident =>
      new Date(incident.timestamp) > last24Hours
    );

    return {
      total: incidents.length,
      pending: incidents.filter(i => i.status === 'pending').length,
      confirmed: incidents.filter(i => i.status === 'confirmed').length,
      cancelled: incidents.filter(i => i.status === 'cancelled').length,
      executed: incidents.filter(i => i.status === 'executed').length,
      last24Hours: last24HoursIncidents.length
    };
  }, [incidents]);

  const contextValue: EmergencyLoggerContextType = {
    logIncident,
    updateIncident,
    logAction,
    logConfirmationStep,
    getIncident,
    getAllIncidents,
    getIncidentsByStatus,
    clearOldLogs,
    exportLogs,
    getIncidentStats
  };

  return (
    <EmergencyLoggerContext.Provider value={contextValue}>
      {children}
    </EmergencyLoggerContext.Provider>
  );
}

// Hook personalizado para usar el logger
export function useEmergencyLogger() {
  const context = useContext(EmergencyLoggerContext);
  if (!context) {
    throw new Error('useEmergencyLogger debe usarse dentro de EmergencyLoggerProvider');
  }
  return context;
}

// Componente para mostrar estadísticas rápidas (opcional)
export function EmergencyStatsDisplay() {
  const { getIncidentStats } = useEmergencyLogger();

  const stats = getIncidentStats();

  return (
    <div className="bg-gray-900 text-green-400 p-4 rounded-lg font-mono text-sm">
      <h3 className="text-green-300 mb-2 font-bold">📊 Estadísticas de Emergencia</h3>
      <div className="grid grid-cols-2 gap-2">
        <div>Total: <span className="text-yellow-400">{stats.total}</span></div>
        <div>Pendientes: <span className="text-red-400">{stats.pending}</span></div>
        <div>Confirmados: <span className="text-blue-400">{stats.confirmed}</span></div>
        <div>Ejecutados: <span className="text-green-400">{stats.executed}</span></div>
        <div>Cancelados: <span className="text-gray-400">{stats.cancelled}</span></div>
        <div>Últimas 24h: <span className="text-purple-400">{stats.last24Hours}</span></div>
      </div>
    </div>
  );
}

export default EmergencyLoggerProvider;
// Tipos para el sistema SOS seguro
export interface Location {
  lat: number;
  lng: number;
  plusCode?: string;
  accuracy?: number;
}

export interface EmergencyContact {
  id: string;
  name: string;
  phone: string;
  priority: number;
}

export interface EmergencyIncident {
  id: string;
  timestamp: string;
  location: Location | null;
  batteryLevel: number;
  deviceInfo: string;
  emergencyContacts: EmergencyContact[];
  status: 'pending' | 'confirmed' | 'cancelled' | 'executed';
  description?: string;
  confirmationSteps: ConfirmationStep[];
  executionLog: ExecutionLogEntry[];
}

export interface ConfirmationStep {
  step: number;
  type: 'initial' | 'location' | 'contacts' | 'final';
  timestamp: string;
  confirmed: boolean;
  data?: any;
}

export interface ExecutionLogEntry {
  timestamp: string;
  action: string;
  status: 'success' | 'error' | 'warning';
  message: string;
  data?: any;
}

export interface EmergencyData {
  timestamp: string;
  location: Location | null;
  batteryLevel: number;
  deviceInfo: string;
  emergencyContacts: EmergencyContact[];
  plusCode?: string;
}

export interface SOSButtonState {
  isActive: boolean;
  isOffline: boolean;
  batteryLevel: number;
  currentIncident: EmergencyIncident | null;
  showConfirmation: boolean;
  confirmationStep: number;
  countdown: number;
  canCancel: boolean;
}

export interface SOSButtonProps {
  variant?: 'primary' | 'secondary' | 'emergency';
  size?: 'small' | 'medium' | 'large';
  position?: 'fixed' | 'relative';
  disabled?: boolean;
  onEmergencyStart?: (incident: EmergencyIncident) => void;
  onEmergencyCancel?: (incident: EmergencyIncident) => void;
  onEmergencyExecute?: (incident: EmergencyIncident) => void;
}

// Tipos para integración con Plus Codes
export interface PlusCodeService {
  encode(lat: number, lng: number, precision?: number): string;
  decode(plusCode: string): { lat: number; lng: number; bbox: any };
}

// Estados del flujo de emergencia
export type EmergencyFlowState =
  | 'idle'
  | 'initializing'
  | 'location_request'
  | 'location_acquired'
  | 'confirmation_required'
  | 'contacts_confirmation'
  | 'final_confirmation'
  | 'executing'
  | 'completed'
  | 'cancelled'
  | 'error';

// Configuración del sistema SOS
export interface SOSConfig {
  autoCancelTimeout: number; // Tiempo máximo antes de auto-cancelar
  confirmationTimeout: number; // Tiempo para cada paso de confirmación
  maxRetryAttempts: number; // Máximo número de reintentos
  enablePlusCodes: boolean; // Habilitar integración con Plus Codes
  enableSatelliteMode: boolean; // Habilitar modo satélite offline
  emergencyNumbers: string[]; // Números de emergencia por defecto
  logRetentionDays: number; // Días para mantener logs
}
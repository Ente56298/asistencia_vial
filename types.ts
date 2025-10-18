export interface User {
    id: string;
    name: string;
    email: string;
    subscriptionStatus: 'free' | 'premium' | 'admin';
}

export interface VehiclePart {
    nombre: string;
    descripcion: string;
    proveedor_sugerido: string;
    precio_estimado: number;
}

export interface Service {
    nombre: string;
    tipo: string;
    ubicacion_aproximada: string;
    telefono?: string;
    latitud: number;
    longitud: number;
}

export interface TrafficReport {
    resumen: string;
    incidentes?: string[];
    rutas_alternas?: string[];
    alerta_critica?: string;
}

export interface WeatherReport {
    resumen: string;
    temperatura_celsius: number;
    condiciones: string;
    alerta_critica?: string;
}

export enum AssistanceType {
    Mechanic = 'Asistencia Mecánica',
    Medical = 'Asistencia Médica',
    Legal = 'Asistencia Legal',
    Other = 'Otros Servicios',
}

export interface Feedback {
    rating: 'good' | 'bad' | null;
    comment: string;
    isSubmitted: boolean;
}

export interface Content {
    role: 'user' | 'model';
    parts: { text: string }[];
    feedback?: Feedback;
}

export enum Feature {
    Evaluation = 'evaluation',
    Parts = 'parts',
    Traffic = 'traffic',
    Weather = 'weather',
    Services = 'services',
    Partners = 'partners',
    Converter = 'converter',
    Admin = 'admin',
    Map = 'map',
    Analysis = 'analysis',
    Assistance = 'assistance',
}

export interface LocationCoords {
    lat: number;
    lon: number;
}

export enum PublicEntityType {
    Government = 'Gobierno',
    Company = 'Empresa',
    NGO = 'ONG',
}

export type IntegrationLevel = 'none' | 'data_sharing' | 'alert_protocol' | 'api_integration';

export interface PublicEntity {
    id: string;
    name: string;
    type: PublicEntityType;
    contactPerson: string;
    contactEmail: string;
    status: 'active' | 'pending' | 'inactive';
    integrationLevel: IntegrationLevel;
    notes?: string;
}

export enum PublicAreaType {
    Park = 'Parque',
    Monument = 'Monumento',
    Museum = 'Museo',
}

export interface PublicArea {
    id: string;
    name: string;
    type: PublicAreaType;
    description: string;
    address: string;
    hasEntryFee: boolean;
}

export interface Partner {
    id: string;
    name: string;
    category: string;
    description: string;
    discount: string;
    icon: string;
    website: string;
}

export interface Vector2 {
    x: number;
    y: number;
}

export enum EntityType {
    Individual = 'individual',
    Camera = 'camera',
    Access = 'access',
}

interface BaseEntity {
    id: string;
    type: EntityType;
    position: Vector2;
    label: string;
    areaId: string;
}

export interface IndividualEntity extends BaseEntity {
    type: EntityType.Individual;
    role: string;
    color: string;
}

export interface CameraEntity extends BaseEntity {
    type: EntityType.Camera;
    status: 'active' | 'inactive';
}

export interface AccessEntity extends BaseEntity {
    type: EntityType.Access;
    status: 'open' | 'closed';
}

export type Entity = IndividualEntity | CameraEntity | AccessEntity;


export interface FloorPlanArea {
    id: string;
    label: string;
    position: Vector2;
    size: Vector2;
    backgroundColor: string;
}

export interface FloorPlan {
    width: number;
    height: number;
    areas: FloorPlanArea[];
    entities: Entity[];
}

export interface Giro {
    id: string;
    name: string;
    prompt: string;
    floorPlan?: FloorPlan;
}

export interface FavoriteRoute {
    id: string;
    name: string;
    origin: LocationCoords;
    destination: LocationCoords;
}

export interface AppNotification {
  id: string;
  message: string;
  type: 'info' | 'warning' | 'critical';
  timestamp: number;
}

export interface AssistanceUnit {
  id: string;
  type: string;
  operator: string;
  plate: string;
}
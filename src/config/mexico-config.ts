// Configuración específica para mercado mexicano - Asistencia Vial México

export const MEXICO_CONFIG = {
  // Información regional
  region: 'mexico',
  country: 'MX',
  countryName: 'México',
  currency: 'MXN',
  language: 'es-MX',
  timezone: 'America/Mexico_City',

  // Coordenadas geográficas de México
  bounds: {
    north: 32.7187,
    south: 14.3895,
    east: -86.5887,
    west: -118.3647
  },

  // Centro geográfico de México (CDMX)
  center: {
    latitude: 19.4326,
    longitude: -99.1332
  },

  // Configuración de mapas optimizada para México
  mapConfig: {
    defaultZoom: 10,
    minZoom: 5,
    maxZoom: 18,
    zoomOnUserLocation: 14,
    zoomOnEmergency: 16
  },

  // Servicios de emergencia mexicanos
  emergencyServices: {
    primary: '911',
    secondary: '066', // Ángeles Verdes
    cellEmergency: '088',
    services: {
      policia: '911',
      ambulancia: '911',
      bomberos: '911',
      angelesVerdes: '066',
      proteccionCivil: '911',
      guardiaNacional: '088'
    }
  },

  // Carreteras y autopistas principales de México
  majorHighways: [
    'MEX-1', 'MEX-2', 'MEX-3', 'MEX-15', 'MEX-40',
    'MEX-45', 'MEX-57', 'MEX-85', 'MEX-95', 'MEX-150'
  ],

  // Estados de la República Mexicana
  states: [
    { code: 'AGU', name: 'Aguascalientes', capital: 'Aguascalientes' },
    { code: 'BCN', name: 'Baja California', capital: 'Mexicali' },
    { code: 'BCS', name: 'Baja California Sur', capital: 'La Paz' },
    { code: 'CAM', name: 'Campeche', capital: 'Campeche' },
    { code: 'CHP', name: 'Chiapas', capital: 'Tuxtla Gutiérrez' },
    { code: 'CHH', name: 'Chihuahua', capital: 'Chihuahua' },
    { code: 'COA', name: 'Coahuila', capital: 'Saltillo' },
    { code: 'COL', name: 'Colima', capital: 'Colima' },
    { code: 'CMX', name: 'Ciudad de México', capital: 'Ciudad de México' },
    { code: 'DUR', name: 'Durango', capital: 'Durango' },
    { code: 'GUA', name: 'Guanajuato', capital: 'Guanajuato' },
    { code: 'GRO', name: 'Guerrero', capital: 'Chilpancingo' },
    { code: 'HID', name: 'Hidalgo', capital: 'Pachuca' },
    { code: 'JAL', name: 'Jalisco', capital: 'Guadalajara' },
    { code: 'MEX', name: 'México', capital: 'Toluca' },
    { code: 'MIC', name: 'Michoacán', capital: 'Morelia' },
    { code: 'MOR', name: 'Morelos', capital: 'Cuernavaca' },
    { code: 'NAY', name: 'Nayarit', capital: 'Tepic' },
    { code: 'NLE', name: 'Nuevo León', capital: 'Monterrey' },
    { code: 'OAX', name: 'Oaxaca', capital: 'Oaxaca' },
    { code: 'PUE', name: 'Puebla', capital: 'Puebla' },
    { code: 'QUE', name: 'Querétaro', capital: 'Querétaro' },
    { code: 'ROO', name: 'Quintana Roo', capital: 'Chetumal' },
    { code: 'SLP', name: 'San Luis Potosí', capital: 'San Luis Potosí' },
    { code: 'SIN', name: 'Sinaloa', capital: 'Culiacán' },
    { code: 'SON', name: 'Sonora', capital: 'Hermosillo' },
    { code: 'TAB', name: 'Tabasco', capital: 'Villahermosa' },
    { code: 'TAM', name: 'Tamaulipas', capital: 'Ciudad Victoria' },
    { code: 'TLA', name: 'Tlaxcala', capital: 'Tlaxcala' },
    { code: 'VER', name: 'Veracruz', capital: 'Xalapa' },
    { code: 'YUC', name: 'Yucatán', capital: 'Mérida' },
    { code: 'ZAC', name: 'Zacatecas', capital: 'Zacatecas' }
  ],

  // Zonas metropolitanas principales
  metropolitanAreas: [
    {
      name: 'Zona Metropolitana del Valle de México',
      center: { lat: 19.4326, lng: -99.1332 },
      radius: 50, // km
      population: 22000000
    },
    {
      name: 'Zona Metropolitana de Guadalajara',
      center: { lat: 20.6597, lng: -103.3496 },
      radius: 30,
      population: 5200000
    },
    {
      name: 'Zona Metropolitana de Monterrey',
      center: { lat: 25.6866, lng: -100.3161 },
      radius: 25,
      population: 5100000
    },
    {
      name: 'Zona Metropolitana de Puebla-Tlaxcala',
      center: { lat: 19.0413, lng: -98.2062 },
      radius: 20,
      population: 3100000
    }
  ],

  // Configuración de APIs mexicanas
  apis: {
    traffic: {
      url: 'https://api.trafico.mx',
      endpoints: {
        current: '/v1/current',
        forecast: '/v1/forecast',
        incidents: '/v1/incidents'
      }
    },
    weather: {
      url: 'https://api.clima.mx',
      endpoints: {
        current: '/v1/current',
        forecast: '/v1/forecast/24h',
        alerts: '/v1/alerts'
      }
    },
    emergency: {
      url: 'https://api.emergencias.gob.mx',
      endpoints: {
        services: '/v1/services',
        hospitals: '/v1/hospitals',
        police: '/v1/police-stations'
      }
    }
  },

  // Configuración de rendimiento para México
  performance: {
    mapTileServer: 'https://tiles-mx.mapbox.com',
    cdnRegion: 'north-america',
    cacheStrategy: 'aggressive', // Cache agresivo para mejorar velocidad
    imageOptimization: true,
    lazyLoading: true
  },

  // Características específicas de México
  features: {
    tollRoads: true,           // Información de casetas
    trafficAlerts: true,       // Alertas de tráfico en tiempo real
    weatherAlerts: true,       // Alertas meteorológicas
    emergencyRoutes: true,     // Rutas alternativas de emergencia
    offlineMode: true,         // Funcionamiento sin conexión
    voiceNavigation: false,    // Navegación por voz (futura implementación)
    realTimeTracking: true,    // Seguimiento en tiempo real
    incidentReporting: true    // Reporte de incidentes por usuarios
  },

  // Configuración de seguridad mexicana
  security: {
    dataRetentionDays: 90,     // Días de retención de datos
    encryptionLevel: 'AES-256', // Nivel de encriptación
    gdprCompliant: false,      // No aplica GDPR (México tiene su propia ley)
    privacyLaw: 'LFPDPPP',     // Ley Federal de Protección de Datos Personales
    emergencyDataAccess: true  // Acceso a datos en emergencias
  }
};

// Función para obtener configuración específica del estado
export const getStateConfig = (stateCode: string) => {
  return MEXICO_CONFIG.states.find(state => state.code === stateCode);
};

// Función para obtener servicios de emergencia por estado
export const getEmergencyServicesByState = (stateCode: string) => {
  const baseServices = MEXICO_CONFIG.emergencyServices.services;

  // Algunos estados tienen servicios adicionales
  const stateSpecificServices: Record<string, any> = {
    'CMX': {
      ...baseServices,
      locatel: '55-5658-1111',     // Línea de atención ciudadana CDMX
      sapo: '55-5242-5100'        // Servicio de Apoyo Policial
    },
    'JAL': {
      ...baseServices,
      proteccionCivil: '33-3615-0700'
    }
  };

  return stateSpecificServices[stateCode] || baseServices;
};

// Función para validar coordenadas dentro de México
export const isWithinMexico = (lat: number, lng: number): boolean => {
  const bounds = MEXICO_CONFIG.bounds;
  return lat >= bounds.south && lat <= bounds.north &&
         lng >= bounds.west && lng <= bounds.east;
};

// Función para obtener zona metropolitana más cercana
export const getNearestMetropolitanArea = (lat: number, lng: number) => {
  let nearest = MEXICO_CONFIG.metropolitanAreas[0];
  let minDistance = Number.MAX_VALUE;

  MEXICO_CONFIG.metropolitanAreas.forEach(area => {
    const distance = calculateDistance(lat, lng, area.center.lat, area.center.lng);
    if (distance < minDistance) {
      minDistance = distance;
      nearest = area;
    }
  });

  return { ...nearest, distance: minDistance };
};

// Función auxiliar para calcular distancia entre coordenadas
const calculateDistance = (lat1: number, lng1: number, lat2: number, lng2: number): number => {
  const R = 6371; // Radio de la Tierra en km
  const dLat = (lat2 - lat1) * Math.PI / 180;
  const dLng = (lng2 - lng1) * Math.PI / 180;
  const a = Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(lat1 * Math.PI / 180) * Math.cos(lat2 * Math.PI / 180) *
    Math.sin(dLng/2) * Math.sin(dLng/2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));
  return R * c;
};

export default MEXICO_CONFIG;
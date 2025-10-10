// Optimizaciones específicas para el mercado mexicano
// Asistencia Vial México - Configuración de rendimiento y características locales

import { MEXICO_CONFIG } from './mexico-config';

export const MEXICO_OPTIMIZATIONS = {
  // Optimización de carga de mapas para México
  mapOptimization: {
    // Servidores CDN optimizados para México
    tileServers: [
      'https://tiles-mx.mapbox.com',
      'https://cdn-mx.maptiles.com',
      'https://mx-tiles.googleapis.com'
    ],

    // Estrategia de carga de tiles
    loadingStrategy: {
      initialTiles: 'low_resolution',  // Cargar tiles de baja resolución primero
      progressiveLoad: true,           // Carga progresiva de detalles
      cacheFirst: true,               // Priorizar cache sobre red
      preloadAdjacent: true           // Precargar áreas adyacentes
    },

    // Optimización para zonas metropolitanas
    metroAreas: {
      enableClustering: true,         // Agrupar marcadores en áreas densas
      clusterRadius: 50,             // Radio de agrupamiento en píxeles
      maxZoomForClustering: 15       // Zoom máximo para mostrar clusters
    }
  },

  // Optimización de rendimiento específica para México
  performance: {
    // Configuración de red para México
    network: {
      timeout: 10000,                // 10 segundos timeout
      retryAttempts: 3,              // 3 reintentos
      retryDelay: 1000,              // 1 segundo entre reintentos
      enableCompression: true        // Compresión habilitada
    },

    // Cache optimizado para México
    cache: {
      strategy: 'network_first',      // Red primero, luego cache
      maxAge: 3600000,              // 1 hora de cache (en ms)
      maxEntries: 1000,             // Máximo 1000 entradas en cache
      enableBackgroundSync: true     // Sincronización en segundo plano
    },

    // Lazy loading optimizado
    lazyLoading: {
      rootMargin: '50px',           // 50px margen para carga anticipada
      threshold: 0.1,               // 10% visibilidad para activar carga
      enableIntersectionObserver: true
    }
  },

  // Características específicas del mercado mexicano
  mexicanFeatures: {
    // Información de carreteras mexicanas
    highways: {
      enableTollInfo: true,         // Información de casetas
      showTollPrices: true,         // Mostrar precios de casetas
      alternativeRoutes: true,      // Rutas alternativas sin casetas
      realTimeTolls: false         // Precios en tiempo real (API futura)
    },

    // Servicios locales mexicanos
    localServices: {
      angelesVerdes: {
        enabled: true,
        coverage: 'highways_only',   // Solo cobertura en carreteras
        responseTime: '30-60_min',   // Tiempo de respuesta estimado
        services: ['mechanical', 'fuel', 'medical', 'information']
      },

      capufe: {                     // Caminos y Puentes Federales
        enabled: true,
        realTimeInfo: true,         // Información en tiempo real
        incidentReports: true       // Reportes de incidentes
      },

      proteccionCivil: {
        enabled: true,
        alertsEnabled: true,        // Alertas de protección civil
        emergencyInfo: true         // Información de emergencia
      }
    },

    // Información cultural y regional
    cultural: {
      showLocalNames: true,         // Nombres locales de lugares
      regionalLanguage: 'es-MX',    // Español mexicano
      dateFormat: 'DD/MM/YYYY',     // Formato de fecha mexicano
      currencyFormat: 'MXN',        // Formato de moneda
      timeFormat: '12h'             // Formato 12 horas
    }
  },

  // Configuración de accesibilidad para México
  accessibility: {
    // Soporte para lectores de pantalla
    screenReader: {
      enabled: true,
      language: 'es-MX',
      voiceSpeed: 'normal',
      announceRouteChanges: true
    },

    // Soporte para usuarios con discapacidad
    motorDisability: {
      largeButtons: true,           // Botones más grandes
      voiceControl: false,         // Control por voz (futura implementación)
      simplifiedUI: false          // Interfaz simplificada (opcional)
    },

    // Soporte para diferentes dispositivos
    deviceSupport: {
      mobileOptimized: true,       // Optimizado para móviles mexicanos
      lowBandwidthMode: true,      // Modo de bajo ancho de banda
      offlineSupport: true         // Soporte sin conexión
    }
  },

  // Configuración de privacidad y datos (LFPDPPP)
  privacy: {
    // Ley Federal de Protección de Datos Personales
    dataProtection: {
      consentRequired: true,        // Consentimiento requerido
      dataRetention: 90,           // Días de retención (máximo)
      rightToErasure: true,        // Derecho al olvido
      dataPortability: true,        // Portabilidad de datos
      transparentProcessing: true   // Procesamiento transparente
    },

    // Configuración específica mexicana
    mexicanPrivacy: {
      inaiCompliant: true,          // Cumplimiento con INAI
      privacyNotice: true,         // Aviso de privacidad visible
      dataLocalization: false,     // Sin restricción de localización
      governmentAccess: true        // Acceso para autoridades en emergencias
    }
  },

  // Configuración de análisis y métricas
  analytics: {
    // Métricas específicas para México
    metrics: {
      userLocationTracking: true,   // Seguimiento de ubicación de usuarios
      usageAnalytics: true,         // Análisis de uso
      performanceMetrics: true,     // Métricas de rendimiento
      errorTracking: true           // Seguimiento de errores
    },

    // Configuración de privacidad para analytics
    privacy: {
      anonymizeIP: true,           // Anonimizar direcciones IP
      respectDNT: true,            // Respetar Do Not Track
      cookieConsent: true,         // Consentimiento de cookies
      localProcessing: false       // Procesamiento local (opcional)
    }
  },

  // Configuración de integración con servicios mexicanos
  integrations: {
    // APIs gubernamentales mexicanas
    governmentAPIs: {
      traficoFederal: {
        enabled: true,
        endpoint: 'https://api.trafico.gob.mx',
        updateFrequency: 300000     // 5 minutos
      },

      climaNacional: {
        enabled: true,
        endpoint: 'https://api.clima.gob.mx',
        updateFrequency: 600000     // 10 minutos
      },

      emergencia911: {
        enabled: true,
        endpoint: 'https://api.emergencias.gob.mx',
        priority: 'high'            // Alta prioridad
      }
    },

    // Servicios privados mexicanos
    privateServices: {
      wazeIntegration: false,       // Integración con Waze (futura)
      uberIntegration: false,       // Integración con Uber (futura)
      localTaxis: false            // Servicios de taxi locales (futura)
    }
  }
};

// Función para aplicar optimizaciones específicas según ubicación
export const applyLocationOptimizations = (userLocation: { lat: number, lng: number }) => {
  const optimizations = { ...MEXICO_OPTIMIZATIONS };

  // Verificar si el usuario está en una zona metropolitana
  const nearestMetro = getNearestMetropolitanArea(userLocation.lat, userLocation.lng);

  if (nearestMetro.distance < 50) { // Dentro de 50km de zona metropolitana
    // Aplicar optimizaciones para zonas metropolitanas
    optimizations.mapOptimization.loadingStrategy.initialTiles = 'high_resolution';
    optimizations.performance.network.timeout = 5000; // Timeout más corto en ciudades
    optimizations.mexicanFeatures.highways.showTollPrices = true;
  }

  // Verificar si está en carretera principal
  const isOnHighway = checkIfOnMajorHighway(userLocation.lat, userLocation.lng);
  if (isOnHighway) {
    // Optimizar para uso en carretera
    optimizations.performance.cache.maxAge = 7200000; // 2 horas de cache
    optimizations.mexicanFeatures.localServices.angelesVerdes.enabled = true;
  }

  return optimizations;
};

// Función auxiliar para verificar si ubicación está en carretera principal
const checkIfOnMajorHighway = (lat: number, lng: number): boolean => {
  // Implementación simplificada - en producción usarías una librería de geolocalización
  // o consultar una API de carreteras
  return false; // Placeholder
};

// Función auxiliar (duplicada de mexico-config.ts para evitar import circular)
const getNearestMetropolitanArea = (lat: number, lng: number) => {
  const metroAreas = MEXICO_CONFIG.metropolitanAreas;
  let nearest = metroAreas[0];
  let minDistance = Number.MAX_VALUE;

  metroAreas.forEach(area => {
    const distance = calculateDistance(lat, lng, area.center.lat, area.center.lng);
    if (distance < minDistance) {
      minDistance = distance;
      nearest = area;
    }
  });

  return { ...nearest, distance: minDistance };
};

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

export default MEXICO_OPTIMIZATIONS;
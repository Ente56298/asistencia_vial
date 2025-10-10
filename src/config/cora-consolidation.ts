export const CoraConsolidationConfig = {
  unidades: {
    principal: "A:",
    sistema: "C:",
    datos: "D:",
    proyectos: "F:",
    respaldo: ["H:", "I:", "J:"]
  },
  
  consolidacion: {
    prioridad_acceso: ["A:", "F:", "C:", "D:"],
    distribucion_carga: {
      "A:": ["core", "ia", "procesamiento"],
      "F:": ["proyectos", "desarrollo", "nuevas_funciones"],
      "C:": ["sistema", "configuracion", "logs"],
      "D:": ["datos_historicos", "analytics", "reportes"]
    }
  },

  optimizacion: {
    cache_inteligente: true,
    failover_automatico: true,
    sincronizacion_tiempo_real: true,
    compresion_datos: true
  }
};

export const getOptimalPath = (recurso: string): string => {
  const paths = {
    core: "A:/CORA/core/",
    proyectos: "F:/NUEVO_COMIENZO/",
    datos: "D:/data/",
    sistema: "C:/system/"
  };
  return paths[recurso] || "A:/CORA/";
};
# 🚗 Asistencia Vial México

**La app de asistencia vial más completa para México** - Encuentra ayuda cuando más la necesitas.

🔴 **[DEMO EN VIVO](https://asistencia-vial.vercel.app)** 🔴

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI-green.svg)](https://ai.google.dev/)

## ✨ Características Principales

- 🆘 **SOS con GPS** - Alerta de emergencia con ubicación exacta y confirmación
- 🔧 **Mecánicos Cercanos** - Encuentra talleres y servicios 24/7 verificados
- ⛽ **Gasolineras y Servicios** - Localiza combustible, autopartes y servicios
- 🗺️ **Navegación Inteligente** - Rutas optimizadas con marcadores dinámicos
- 📱 **Historial de Viajes** - Rastrea y analiza tus rutas automáticamente
- 🚦 **Reportes de Tráfico** - Incidentes y alertas comunitarias en tiempo real
- 👥 **Contactos de Emergencia** - Notificación automática a familiares y seguros
- 🎓 **Tutorial Interactivo** - Onboarding guiado para nuevos usuarios
- 🏢 **Gestión de Giros** - Administra y organiza servicios por categorías
- 👤 **Perfil Completo** - Gestión de vehículos y contactos de emergencia

## 🚀 ¿Por Qué Asistencia Vial México?

### ❌ **El Problema**
Cada día en México:
- **+500 accidentes** viales necesitan asistencia inmediata
- **Conductores perdidos** buscando talleres confiables
- **Tiempo perdido** en tráfico por falta de información
- **Emergencias** sin saber a quién llamar

### ✅ **Nuestra Solución**
- **SOS Inteligente**: GPS + contactos + servicios de emergencia
- **Red de Confianza**: Talleres verificados y calificados
- **IA Predictiva**: Previene problemas antes de que ocurran
- **Comunidad**: Reportes en tiempo real de otros conductores

## 🛠️ Stack Tecnológico

### **Frontend Moderno**
- ⚛️ **React 18** + TypeScript para máxima confiabilidad
- 🎨 **Tailwind CSS** para diseño responsive perfecto
- ⚡ **Vite** para desarrollo ultra-rápido
- 📱 **PWA Ready** - Instálala como app nativa

### **Inteligencia Artificial**
- 🧠 **Google Gemini AI** para evaluación de problemas
- 🗣️ **Procesamiento de lenguaje natural** en español
- 📊 **Análisis predictivo** de mantenimiento

### **Geolocalización Avanzada**
- 🗺️ **GPS de alta precisión** para emergencias
- 🛣️ **Rutas optimizadas** en tiempo real
- 📍 **Marcadores inteligentes** de servicios

## 🚀 Instalación y Desarrollo

### ⚡ Inicio Rápido (2 minutos)

```bash
# 1. Clona el repositorio
git clone https://github.com/Ente56298/asistencia_vial.git
cd asistencia_vial

# 2. Instala dependencias
npm install

# 3. Configura variables de entorno
echo "VITE_GEMINI_API_KEY=AIzaSyAYHBXAtzgl-cXtgBf0VF5nVpSWvEke14g" > .env.local

# 4. Inicia desarrollo
npm run dev
```

### 🌐 Deploy en Producción

#### Vercel (Recomendado)
```bash
# Deploy automático
npm i -g vercel
vercel --prod
```

### 🔑 Variables de Entorno

```env
# Google Gemini AI (Obligatorio)
VITE_GEMINI_API_KEY=AIzaSy...

# Mapbox (Opcional)
VITE_MAPBOX_TOKEN=pk.eyJ1...
```

## 🎯 Uso

### Registro de Usuario
1. Abre la aplicación
2. Completa el registro con datos básicos
3. Verifica tu ubicación para servicios locales

### Solicitar Asistencia
1. Selecciona el tipo de servicio necesario
2. Describe tu problema al asistente IA
3. Recibe recomendaciones personalizadas
4. Contacta directamente con proveedores

### Emergencias
1. Presiona el botón SOS rojo
2. Confirma tu ubicación automática
3. Selecciona tipo de emergencia
4. Espera contacto de servicios de rescate

## 🏗️ Arquitectura

```
src/
├── components/          # Componentes React reutilizables
│   ├── icons/          # Iconografía personalizada (20+ iconos)
│   ├── giro/           # Sistema de gestión de giros
│   ├── profile/        # Gestión de perfiles y vehículos
│   ├── Dashboard.tsx   # Panel principal mejorado
│   ├── Map.tsx         # Mapa interactivo con marcadores
│   ├── Tutorial.tsx    # Sistema de onboarding
│   ├── SOSConfirmation.tsx # Confirmación de emergencias
│   ├── TrafficReportPanel.tsx # Reportes de tráfico
│   └── TravelHistoryPanel.tsx # Historial de viajes
├── services/           # Servicios e integraciones
│   ├── authService.ts  # Autenticación y sesiones
│   └── geminiService.ts # IA Gemini para asistencia
├── hooks/              # Custom React Hooks
│   ├── useMapMarkers.ts # Gestión de marcadores
│   ├── useTravelHistory.ts # Historial de viajes
│   └── useRecentLocations.ts # Ubicaciones recientes
├── utils/              # Utilidades y helpers
│   └── notifications.ts # Sistema de notificaciones
├── data/               # Datos y configuraciones
│   ├── partnersData.ts # Datos de socios
│   └── giroTemplates.ts # Plantillas de giros
├── types.ts            # Definiciones TypeScript
└── App.tsx             # Componente principal
```

## 🤝 Contribuir

### Reportar Issues
- Usa el sistema de Issues de GitHub
- Incluye pasos para reproducir el problema
- Adjunta screenshots si es relevante

### Pull Requests
1. Fork del repositorio
2. Crea una rama para tu feature
3. Implementa cambios con tests
4. Envía PR con descripción detallada

### Código de Conducta
- Respeto y profesionalismo
- Código limpio y documentado
- Tests para nuevas funcionalidades

## 📄 Licencia

Este proyecto está bajo la Licencia MIT. Ver [LICENSE](LICENSE) para más detalles.

## 🎯 Roadmap 2025

### Q1 2025 ✅ COMPLETADO
- [x] Sistema SOS con confirmación avanzada
- [x] Mapa interactivo con marcadores inteligentes
- [x] Historial de viajes y ubicaciones recientes
- [x] PWA funcional con notificaciones
- [x] Tutorial interactivo para nuevos usuarios
- [x] Sistema de gestión de giros y servicios
- [x] Perfiles de usuario y vehículos
- [x] Reportes de tráfico comunitarios
- [x] Integración completa con Gemini AI

### Q2 2025 🚧 EN DESARROLLO
- [ ] **Integración con seguros** (Qualitas, GNP, AXA)
- [ ] **Chat en vivo** con talleres verificados
- [ ] **Sistema de pagos** integrado (Stripe, PayPal)
- [ ] **API pública** para desarrolladores terceros
- [ ] **Modo offline** con cache inteligente

### Q3 2025 📋 PLANIFICADO
- [ ] **App nativa** iOS/Android con React Native
- [ ] **Programa de lealtad** y recompensas
- [ ] **Dashboard analytics** con métricas avanzadas
- [ ] **Integración con Waze** y Google Maps
- [ ] **IA predictiva** para mantenimiento vehicular

## 📞 Contacto y Soporte

### 🚨 **Emergencias**
- **Teléfono**: 911 (Emergencias México)
- **Email**: emergencias@asistenciavial.mx

### 💬 **Soporte Técnico**
- **GitHub Issues**: [Reportar problema](https://github.com/Ente56298/asistencia_vial/issues)
- **Email**: soporte@asistenciavial.mx

### 📱 **Síguenos**
- **GitHub**: [@Ente56298](https://github.com/Ente56298)
- **Twitter**: [@AsistenciVialMX](https://x.com/AsistenciVialMX)

---

<div align="center">

**🚗 Hecho con ❤️ para los conductores de México 🇲🇽**

*"Porque en la carretera, nunca estás solo"*

[⭐ Dale una estrella](https://github.com/Ente56298/asistencia_vial) • [🐛 Reportar bug](https://github.com/Ente56298/asistencia_vial/issues) • [💡 Sugerir feature](https://github.com/Ente56298/asistencia_vial/discussions)

</div>
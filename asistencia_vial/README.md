# 🚗 Asistencia Vial México

**La app de asistencia vial más completa para México** - Encuentra ayuda cuando más la necesitas.

🔴 **[DEMO EN VIVO](https://asistencia-vial.vercel.app)** 🔴

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI-green.svg)](https://ai.google.dev/)

## ✨ Características Principales

- 🆘 **SOS con GPS** - Alerta de emergencia con ubicación exacta
- 🔧 **Mecánicos Cercanos** - Encuentra talleres y servicios 24/7
- ⛽ **Gasolineras y Servicios** - Localiza combustible y autopartes
- 🗺️ **Navegación Inteligente** - Rutas optimizadas en tiempo real
- 📱 **Historial de Viajes** - Rastrea tus rutas automáticamente
- 🚦 **Reportes de Tráfico** - Incidentes y alertas en vivo
- 👥 **Contactos de Emergencia** - Notificación automática a familiares

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
│   ├── icons/          # Iconografía personalizada
│   ├── Dashboard.tsx   # Panel principal
│   ├── Map.tsx         # Componente de mapas
│   └── ...
├── services/           # Servicios e integraciones
│   ├── authService.ts  # Autenticación
│   └── geminiService.ts # IA Gemini
├── data/               # Datos y configuraciones
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

## 🎯 Roadmap 2024

### Q1 2024 ✅
- [x] Sistema SOS básico
- [x] Mapa con servicios
- [x] Historial de viajes
- [x] PWA funcional

### Q2 2024 🚧
- [ ] **Integración con seguros** (Qualitas, GNP)
- [ ] **Chat en vivo** con talleres
- [ ] **Sistema de pagos** integrado
- [ ] **API pública** para terceros

### Q3 2024 📋
- [ ] **App nativa** iOS/Android
- [ ] **Programa de lealtad** para conductores
- [ ] **Dashboard analytics** avanzado
- [ ] **Integración con Waze**

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
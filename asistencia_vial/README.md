# 🚗 Asistente Vial México

**La primera aplicación integral de asistencia vial para las carreteras mexicanas**

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)
[![React](https://img.shields.io/badge/React-18.x-blue.svg)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.x-blue.svg)](https://www.typescriptlang.org/)
[![Gemini AI](https://img.shields.io/badge/Gemini-AI-green.svg)](https://ai.google.dev/)

## 🌟 Características Principales

### 🆘 Sistema SOS de Emergencia
- Botón de pánico con geolocalización automática
- Envío de ubicación exacta a servicios de emergencia
- Contacto directo con servicios de rescate

### 🔧 Búsqueda Inteligente de Refacciones
- Localización de autopartes por marca, modelo y año
- Búsqueda por proximidad geográfica
- Comparación de precios en tiempo real
- Disponibilidad de inventario actualizada

### 🚛 Red de Servicios Mecánicos
- Talleres mecánicos certificados
- Servicios de grúa 24/7
- Técnicos especializados por marca
- Calificaciones y reseñas de usuarios

### 🚦 Reportes de Tráfico en Tiempo Real
- Condiciones actuales de carreteras
- Alertas de accidentes y construcciones
- Rutas alternativas inteligentes
- Reportes colaborativos de usuarios

### 🏢 Giros de Negocio Especializados
- IA personalizada para cada tipo de servicio
- Visualización 3D de establecimientos
- Simulación en tiempo real de operaciones
- Gestión inteligente de recursos

### 🤖 Asistente IA Powered by Gemini
- Diagnósticos automotrices inteligentes
- Recomendaciones personalizadas
- Chat multimodal (texto, voz, imagen)
- Aprendizaje continuo de patrones

## 🚀 Tecnologías

- **Frontend**: React 18 + TypeScript + Vite
- **IA**: Google Gemini API
- **Mapas**: Geolocalización nativa
- **Estado**: React Hooks + Context API
- **Estilos**: Tailwind CSS
- **Build**: Vite + ESBuild

## 📱 Instalación

### Prerrequisitos
- Node.js 18+
- npm o yarn
- Clave API de Gemini

### Configuración Local

```bash
# Clonar repositorio
git clone https://github.com/Ente56298/asistencia_vial.git
cd asistencia_vial

# Instalar dependencias
npm install

# Configurar variables de entorno
cp .env.example .env.local
# Editar .env.local con tu GEMINI_API_KEY

# Ejecutar en desarrollo
npm run dev
```

### Variables de Entorno

```env
GEMINI_API_KEY=tu_clave_api_aqui
VITE_APP_NAME=Asistente Vial México
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

## 🌟 Roadmap

### v1.1 (Próximo)
- [ ] Integración con aseguradoras mexicanas
- [ ] Sistema de pagos integrado
- [ ] Notificaciones push
- [ ] Modo offline básico

### v1.2 (Futuro)
- [ ] App móvil nativa
- [ ] Integración con Waze
- [ ] Sistema de recompensas
- [ ] API pública para terceros

## 📞 Contacto

- **Desarrollador**: [Tu Nombre]
- **Email**: [tu-email@ejemplo.com]
- **GitHub**: [@Ente56298](https://github.com/Ente56298)
- **Proyecto**: [Asistencia Vial México](https://github.com/Ente56298/asistencia_vial)

## 🇲🇽 Hecho en México

Desarrollado con ❤️ para las carreteras mexicanas.

---

**© 2025 Asistencia Vial México. Todos los derechos reservados.**
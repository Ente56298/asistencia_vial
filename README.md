# Asistente Vial México

**Su copiloto inteligente en el camino.**

[![Project Status: Concept](https://img.shields.io/badge/status-conceptual_demo-brightgreen.svg)](https://shields.io/)
[![Technology: React](https://img.shields.io/badge/tech-React-61DAFB.svg?logo=react)](https://reactjs.org/)
[![Technology: Gemini API](https://img.shields.io/badge/AI-Google_Gemini-4285F4.svg?logo=google)](https://ai.google.dev/)
[![PWA Ready](https://img.shields.io/badge/PWA-Ready-5A0FC8.svg)](https://web.dev/progressive-web-apps/)

---

## 📖 Descripción

**Asistente Vial México** es una aplicación web progresiva (PWA) de concepto, diseñada para mejorar radicalmente la movilidad y la seguridad de los conductores en México. Esta herramienta digital funciona como un copiloto inteligente, proporcionando información crucial en tiempo real, un avanzado asistente de IA conversacional y un conjunto de utilidades para transformar la experiencia en carretera.

La aplicación integra geolocalización en tiempo real con un mapa interactivo, un potente asistente de IA impulsado por la **API de Google Gemini** para responder consultas complejas, y notificaciones proactivas que alertan a los usuarios sobre incidentes críticos en su ruta. Además, cuenta con un completo panel de administración para la gestión de usuarios, convenios y otros datos de la aplicación.

## ✨ Características Principales

### 🗺️ Navegación y Mapa Interactivo
- **Geolocalización en Tiempo Real**: Ubicación precisa del usuario en un mapa interactivo optimizado para la noche.
- **Búsqueda de Servicios Cercanos**: Encuentra y visualiza gasolineras, talleres mecánicos y otros puntos de interés.
- **Planificación de Rutas Dinámica**: Permite añadir múltiples paradas y calcula la ruta de conducción óptima.
- **Visualización de Zonas de Riesgo**: Muestra un mapa de calor (heatmap) con zonas de alta incidencia de accidentes.

### 🤖 Asistencia Impulsada por IA (Google Gemini)
- **Búsqueda Inteligente de Refacciones**: Describe una pieza y la IA devuelve opciones con precios y proveedores sugeridos.
- **Reportes de Tráfico y Clima**: Genera informes detallados y alertas críticas para cualquier ubicación.
- **Conversor de Unidades**: Realiza conversiones rápidas de divisas, longitud, volumen y peso.
- **Chats de Asistencia Especializada**: Conversa con agentes de IA entrenados para roles específicos: mecánico, paramédico, experto en seguridad y más.
- **Análisis de Situación**: Un innovador sistema multi-agente que evalúa el problema del usuario y el contexto vial para generar un plan de acción coherente.

### 🛡️ Seguridad y Emergencia
- **Botón de Pánico (SOS)**: Envía una alerta de emergencia simulada y recibe una respuesta tranquilizadora y accionable de la IA.
- **Monitoreo de Asistencia en Tiempo Real**: Después de activar una alerta SOS, visualiza en el mapa la unidad de asistencia en camino, con su ruta y tiempo estimado de llegada actualizándose en tiempo real.
- **Notificaciones Proactivas en Ruta**: Alerta automáticamente al usuario sobre cierres de carreteras u otros incidentes críticos en su ruta activa.

### ⚙️ Panel de Administración Completo
- **Gestión de Usuarios**: Visualiza y modifica los niveles de suscripción de los usuarios (`free`, `premium`).
- **Gestión de Convenios y Socios**: Administra la lista de socios comerciales, sus descuentos y detalles.
- **Gestión de Entidades y Áreas Públicas**: Mantiene un registro de relaciones con entidades gubernamentales y puntos de interés.

### 🔌 PWA y Capacidades Técnicas
- **Soporte Offline**: Gracias a un Service Worker, la aplicación funciona con conectividad limitada, utilizando estrategias de caché para los mapas y las respuestas de la API.
- **Autenticación y Roles**: Sistema de registro e inicio de sesión con roles de usuario (`free`, `premium`, `admin`).
- **Interfaz Responsiva**: Diseño moderno y adaptable a dispositivos móviles y de escritorio usando Tailwind CSS.

## 🛠️ Stack Tecnológico

- **Frontend**: React.js, TypeScript
- **Estilos**: Tailwind CSS
- **Mapas y Geolocalización**: Mapbox GL JS
- **Inteligencia Artificial**: Google Gemini API
- **Soporte Offline**: Service Workers (PWA)

## 🚀 Instalación y Configuración Local

Para ejecutar este proyecto localmente, sigue estos pasos:

1.  **Clona el repositorio** (si aplica):
    ```bash
    git clone https://github.com/tu-usuario/asistente-vial-mexico.git
    cd asistente-vial-mexico
    ```

2.  **Crea un archivo `.env`** en la raíz del proyecto, copiando el contenido de `.env.example`.

3.  **Añade tus claves de API** al archivo `.env`. Estas son cruciales para el funcionamiento de la aplicación:
    ```env
    # Clave de API para Google Gemini
    # Obtén la tuya en Google AI Studio
    API_KEY="TU_API_KEY_DE_GEMINI_AQUI"

    # Token de acceso para Mapbox
    # Obtén el tuyo en la web de Mapbox
    MAPBOX_TOKEN="TU_TOKEN_DE_MAPBOX_AQUI"
    ```

4. **Instala las dependencias y ejecuta la aplicación**:
   (Asumiendo un entorno de desarrollo estándar de Node.js)
   ```bash
   npm install
   npm start
   ```

## 💻 Uso de la Aplicación (Cuentas de Demo)

La aplicación está preconfigurada con tres cuentas de demostración para probar las diferentes funcionalidades:

-   **Usuario Gratuito**: `free@test.com`
-   **Usuario Premium**: `premium@test.com` (desbloquea asistencias especiales)
-   **Administrador**: `admin@test.com` (otorga acceso al panel de administración)

*Nota: La contraseña no se valida en esta versión de demostración.*

## 🏛️ Arquitectura y Estructura del Proyecto

La aplicación sigue una arquitectura moderna de componentes, separando las responsabilidades para mejorar la mantenibilidad.

- **`src/components`**: Contiene todos los componentes de React, organizados por funcionalidad (paneles, iconos, elementos de UI).
- **`src/services`**: Centraliza la lógica de negocio y las llamadas a APIs externas (`geminiService.ts`, `mapService.ts`, `authService.ts`). Esto desacopla la UI de las fuentes de datos.
- **`src/types.ts`**: Define todas las interfaces y tipos de TypeScript utilizados en la aplicación, garantizando la consistencia de los datos.
- **`public/sw.js`**: Implementa el Service Worker que gestiona las estrategias de caché y la funcionalidad offline.

## 📈 Roadmap Futuro

-   **Backend Real**: Reemplazar los servicios simulados (`authService`) con una solución de backend robusta como Firebase o Supabase.
-   **Notificaciones Push**: Integrar notificaciones push nativas para alertas críticas.
-   **Historial y Favoritos**: Guardar historial de rutas y permitir a los usuarios guardar rutas favoritas.
-   **Gamificación**: Introducir logros por reportar incidentes o completar rutas.
-   **Despliegue en Tiendas**: Empaquetar la PWA para su distribución en Google Play Store y Apple App Store.
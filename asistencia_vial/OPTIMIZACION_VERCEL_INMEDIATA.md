# ⚡ OPTIMIZACIÓN VERCEL INMEDIATA

## 🎯 PROYECTO ACTUAL
- **Vercel**: https://vercel.com/ente56298s-projects/asistencia-vial/551LctUWYHvVKizTmQHDpd3YVQPM
- **GitHub**: https://github.com/Ente56298/asistencia_vial
- **Live**: https://asistencia-vial.vercel.app/

## 🚀 PASOS INMEDIATOS

### 1. **Agregar Analytics al Código**
```bash
# En A:\asistencia_vial>
npm install @vercel/analytics @vercel/speed-insights
```

### 2. **Actualizar src/main.tsx**
```tsx
// Agregar estas líneas al final del archivo
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

// En el return del App component:
<>
  {/* Tu código existente */}
  <Analytics />
  <SpeedInsights />
</>
```

### 3. **Crear Base de Datos Postgres**
```
Dashboard Vercel > Storage > Create Database
- Tipo: Postgres
- Nombre: asistencia-vial-db  
- Región: Washington D.C. (iad1)
```

### 4. **Configurar Variables de Entorno**
```bash
# En Vercel Dashboard > Settings > Environment Variables
VITE_GEMINI_API_KEY=tu_api_key_actual
POSTGRES_URL=postgresql://... (de la DB creada)
POSTGRES_PRISMA_URL=postgresql://... (de la DB creada)
```

### 5. **Ejecutar Schema SQL**
```sql
-- En Vercel Dashboard > Storage > Query
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE sos_events (
  id SERIAL PRIMARY KEY,
  user_id INTEGER,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE mechanics (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  verified BOOLEAN DEFAULT true,
  rating DECIMAL(3, 2) DEFAULT 5.0
);

-- Insertar datos de prueba
INSERT INTO mechanics (name, phone, latitude, longitude) VALUES
('Taller Central', '555-0001', 19.4326, -99.1332),
('Mecánico Express', '555-0002', 19.4285, -99.1277),
('AutoServicio 24h', '555-0003', 19.4370, -99.1420);
```

## 📊 TRACKING PERSONALIZADO

### 6. **Agregar Tracking de Eventos**
```tsx
// En tu componente SOS existente
import { track } from '@vercel/analytics'

const handleSOSClick = () => {
  // Tu lógica existente
  
  // Agregar tracking
  track('sos_activated', {
    timestamp: Date.now(),
    user_agent: navigator.userAgent
  })
}

// En registro de usuario
const handleRegister = (method: string) => {
  track('user_registered', { method })
}

// En contacto con mecánico
const handleMechanicContact = (mechanicId: string) => {
  track('mechanic_contacted', { mechanic_id: mechanicId })
}
```

## 🔄 API ENDPOINTS

### 7. **Crear API para SOS Real**
```bash
# Crear carpeta api en el root del proyecto
mkdir api
mkdir api\sos
```

```ts
// api/sos/create.ts
export default async function handler(req: any, res: any) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' })
  }

  const { latitude, longitude, userId } = req.body

  try {
    // Aquí conectarías con Postgres
    // Por ahora simulamos
    const sosEvent = {
      id: Date.now(),
      latitude,
      longitude,
      userId,
      status: 'active',
      created_at: new Date().toISOString()
    }

    // Simular mecánicos cercanos
    const nearbyMechanics = [
      { id: 1, name: 'Taller Central', phone: '555-0001', distance: 2.3 },
      { id: 2, name: 'Mecánico Express', phone: '555-0002', distance: 3.1 }
    ]

    res.status(200).json({
      success: true,
      sosEvent,
      nearbyMechanics
    })
  } catch (error) {
    res.status(500).json({ error: 'SOS creation failed' })
  }
}
```

## 🎯 OPTIMIZACIÓN PERFORMANCE

### 8. **Actualizar vite.config.ts**
```ts
// Agregar optimizaciones
export default defineConfig({
  plugins: [react()],
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          ui: ['lucide-react']
        }
      }
    },
    target: 'esnext',
    minify: 'terser'
  },
  server: {
    port: 3000
  }
})
```

### 9. **Crear vercel.json Optimizado**
```json
{
  "framework": "vite",
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "regions": ["iad1"],
  "functions": {
    "api/**/*.ts": {
      "runtime": "nodejs18.x"
    }
  },
  "headers": [
    {
      "source": "/(.*)",
      "headers": [
        {
          "key": "X-Content-Type-Options",
          "value": "nosniff"
        },
        {
          "key": "X-Frame-Options", 
          "value": "DENY"
        }
      ]
    }
  ]
}
```

## 📱 PWA OPTIMIZACIÓN

### 10. **Mejorar manifest.json**
```json
{
  "name": "Asistencia Vial México",
  "short_name": "AsistenciaVial",
  "description": "SOS y asistencia vial en tiempo real",
  "start_url": "/",
  "display": "standalone",
  "background_color": "#ffffff",
  "theme_color": "#ef4444",
  "icons": [
    {
      "src": "/icon-192.png",
      "sizes": "192x192",
      "type": "image/png"
    },
    {
      "src": "/icon-512.png", 
      "sizes": "512x512",
      "type": "image/png"
    }
  ],
  "categories": ["utilities", "travel", "safety"]
}
```

## 🚀 DEPLOY OPTIMIZADO

### 11. **Comandos de Deploy**
```bash
# Instalar dependencias
npm install

# Build local para verificar
npm run build

# Deploy a producción
git add .
git commit -m "feat: Vercel optimization complete"
git push origin main

# Vercel auto-deploy desde GitHub
```

## 📊 MÉTRICAS ESPERADAS

### **Performance Goals**
```
🎯 Core Web Vitals:
├── LCP: <2.5s (Large Contentful Paint)
├── FID: <100ms (First Input Delay)  
├── CLS: <0.1 (Cumulative Layout Shift)
└── FCP: <1.8s (First Contentful Paint)

📊 Analytics:
├── Real-time user tracking
├── SOS event monitoring
├── Geographic distribution
└── Device/browser analytics
```

## ✅ CHECKLIST OPTIMIZACIÓN

- [ ] Analytics instalado
- [ ] Base de datos creada
- [ ] Variables de entorno configuradas
- [ ] Schema SQL ejecutado
- [ ] API endpoints creados
- [ ] Performance optimizado
- [ ] PWA mejorado
- [ ] Deploy completado
- [ ] Métricas verificadas

**RESULTADO: App optimizada con analytics, base de datos y performance mejorado**
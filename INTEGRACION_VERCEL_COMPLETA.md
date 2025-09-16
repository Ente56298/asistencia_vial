# 🚀 INTEGRACIÓN VERCEL COMPLETA - ASISTENCIA VIAL

## 📊 ANALYTICS Y MÉTRICAS

### **Vercel Analytics**
```json
// package.json
{
  "dependencies": {
    "@vercel/analytics": "^1.1.1",
    "@vercel/speed-insights": "^1.0.2"
  }
}
```

```tsx
// src/main.tsx
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

function App() {
  return (
    <>
      <Router />
      <Analytics />
      <SpeedInsights />
    </>
  )
}
```

### **Environment Variables**
```bash
# .env.local
VITE_VERCEL_ANALYTICS_ID=your_analytics_id
VITE_GEMINI_API_KEY=your_gemini_key
VITE_MAPBOX_TOKEN=your_mapbox_token
VITE_FIREBASE_CONFIG=your_firebase_config
```

---

## 🗄️ VERCEL POSTGRES DATABASE

### **Setup Database**
```sql
-- Schema para Asistencia Vial
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  email VARCHAR(255) UNIQUE NOT NULL,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20),
  created_at TIMESTAMP DEFAULT NOW()
);

CREATE TABLE emergency_contacts (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  relationship VARCHAR(100)
);

CREATE TABLE sos_events (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id),
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  status VARCHAR(50) DEFAULT 'active',
  created_at TIMESTAMP DEFAULT NOW(),
  resolved_at TIMESTAMP
);

CREATE TABLE mechanics (
  id SERIAL PRIMARY KEY,
  name VARCHAR(255) NOT NULL,
  phone VARCHAR(20) NOT NULL,
  latitude DECIMAL(10, 8) NOT NULL,
  longitude DECIMAL(11, 8) NOT NULL,
  verified BOOLEAN DEFAULT false,
  rating DECIMAL(3, 2) DEFAULT 5.0
);
```

### **Database Connection**
```ts
// lib/db.ts
import { sql } from '@vercel/postgres'

export async function createUser(email: string, name: string, phone?: string) {
  const result = await sql`
    INSERT INTO users (email, name, phone)
    VALUES (${email}, ${name}, ${phone})
    RETURNING id, email, name, phone
  `
  return result.rows[0]
}

export async function createSOSEvent(userId: number, lat: number, lng: number) {
  const result = await sql`
    INSERT INTO sos_events (user_id, latitude, longitude)
    VALUES (${userId}, ${lat}, ${lng})
    RETURNING id, created_at
  `
  return result.rows[0]
}

export async function findNearbyMechanics(lat: number, lng: number, radius = 10) {
  const result = await sql`
    SELECT *, 
    (6371 * acos(cos(radians(${lat})) * cos(radians(latitude)) * 
    cos(radians(longitude) - radians(${lng})) + sin(radians(${lat})) * 
    sin(radians(latitude)))) AS distance
    FROM mechanics 
    WHERE verified = true
    HAVING distance < ${radius}
    ORDER BY distance
    LIMIT 5
  `
  return result.rows
}
```

---

## 🔄 VERCEL FUNCTIONS (API ROUTES)

### **SOS Emergency API**
```ts
// api/sos/create.ts
import { NextRequest, NextResponse } from 'next/server'
import { createSOSEvent, findNearbyMechanics } from '@/lib/db'

export async function POST(request: NextRequest) {
  try {
    const { userId, latitude, longitude } = await request.json()
    
    // Crear evento SOS
    const sosEvent = await createSOSEvent(userId, latitude, longitude)
    
    // Encontrar mecánicos cercanos
    const mechanics = await findNearbyMechanics(latitude, longitude)
    
    // Notificar a contactos de emergencia (webhook)
    await fetch('/api/notifications/emergency', {
      method: 'POST',
      body: JSON.stringify({ userId, sosEventId: sosEvent.id, location: { latitude, longitude } })
    })
    
    return NextResponse.json({
      success: true,
      sosEvent,
      nearbyMechanics: mechanics
    })
  } catch (error) {
    return NextResponse.json({ error: 'SOS creation failed' }, { status: 500 })
  }
}
```

### **Real-time Location Tracking**
```ts
// api/tracking/update.ts
import { NextRequest, NextResponse } from 'next/server'
import { sql } from '@vercel/postgres'

export async function POST(request: NextRequest) {
  const { userId, latitude, longitude, timestamp } = await request.json()
  
  await sql`
    INSERT INTO location_history (user_id, latitude, longitude, timestamp)
    VALUES (${userId}, ${latitude}, ${longitude}, ${timestamp})
  `
  
  // Broadcast to family members via WebSocket
  // (Vercel Edge Functions + Pusher/Ably)
  
  return NextResponse.json({ success: true })
}
```

---

## 📱 VERCEL EDGE FUNCTIONS

### **Geolocation Edge Function**
```ts
// edge-functions/geolocation.ts
export const config = {
  runtime: 'edge'
}

export default async function handler(request: Request) {
  const { searchParams } = new URL(request.url)
  const lat = searchParams.get('lat')
  const lng = searchParams.get('lng')
  
  // Ultra-fast geolocation processing at edge
  const nearbyServices = await findNearbyServices(lat, lng)
  
  return new Response(JSON.stringify(nearbyServices), {
    headers: { 'content-type': 'application/json' }
  })
}
```

---

## 🔔 VERCEL CRON JOBS

### **Automated Health Checks**
```ts
// api/cron/health-check.ts
export async function GET() {
  // Verificar mecánicos activos cada hora
  await sql`
    UPDATE mechanics 
    SET last_ping = NOW() 
    WHERE id IN (SELECT id FROM active_mechanics)
  `
  
  // Limpiar eventos SOS antiguos
  await sql`
    UPDATE sos_events 
    SET status = 'expired' 
    WHERE created_at < NOW() - INTERVAL '24 hours' 
    AND status = 'active'
  `
  
  return Response.json({ success: true })
}

// vercel.json
{
  "crons": [
    {
      "path": "/api/cron/health-check",
      "schedule": "0 * * * *"
    }
  ]
}
```

---

## 🚀 VERCEL DEPLOYMENT OPTIMIZATION

### **Build Configuration**
```json
// vercel.json
{
  "buildCommand": "npm run build",
  "outputDirectory": "dist",
  "installCommand": "npm install",
  "framework": "vite",
  "regions": ["iad1", "sfo1"],
  "functions": {
    "app/api/**/*.ts": {
      "runtime": "nodejs18.x",
      "maxDuration": 10
    }
  },
  "headers": [
    {
      "source": "/api/(.*)",
      "headers": [
        { "key": "Access-Control-Allow-Origin", "value": "*" },
        { "key": "Access-Control-Allow-Methods", "value": "GET, POST, PUT, DELETE" }
      ]
    }
  ]
}
```

### **Performance Optimization**
```ts
// vite.config.ts
export default defineConfig({
  build: {
    rollupOptions: {
      output: {
        manualChunks: {
          vendor: ['react', 'react-dom'],
          maps: ['mapbox-gl', 'react-map-gl'],
          ui: ['@headlessui/react', 'lucide-react']
        }
      }
    }
  },
  plugins: [
    react(),
    // Vercel Speed Insights
    {
      name: 'vercel-analytics',
      transformIndexHtml: (html) => html.replace(
        '<head>',
        '<head>\n  <script defer src="/_vercel/insights/script.js"></script>'
      )
    }
  ]
})
```

---

## 📊 VERCEL WEB ANALYTICS

### **Custom Events Tracking**
```ts
// lib/analytics.ts
import { track } from '@vercel/analytics'

export const trackSOSActivation = (location: { lat: number, lng: number }) => {
  track('sos_activated', {
    latitude: location.lat,
    longitude: location.lng,
    timestamp: Date.now()
  })
}

export const trackMechanicContact = (mechanicId: string, distance: number) => {
  track('mechanic_contacted', {
    mechanic_id: mechanicId,
    distance_km: distance
  })
}

export const trackUserRegistration = (method: 'email' | 'phone' | 'google') => {
  track('user_registered', { method })
}
```

### **A/B Testing with Vercel**
```ts
// lib/experiments.ts
import { cookies } from 'next/headers'

export function getExperimentVariant(experimentName: string) {
  const cookieStore = cookies()
  const variant = cookieStore.get(`experiment_${experimentName}`)
  
  if (!variant) {
    // Assign random variant
    const variants = ['control', 'variant_a', 'variant_b']
    const assigned = variants[Math.floor(Math.random() * variants.length)]
    
    // Set cookie for consistency
    cookieStore.set(`experiment_${experimentName}`, assigned, {
      maxAge: 30 * 24 * 60 * 60 // 30 days
    })
    
    return assigned
  }
  
  return variant.value
}
```

---

## 🔐 VERCEL SECURITY

### **Environment Variables Security**
```bash
# Vercel Dashboard > Settings > Environment Variables
POSTGRES_URL=postgresql://...
POSTGRES_PRISMA_URL=postgresql://...
POSTGRES_URL_NON_POOLING=postgresql://...

GEMINI_API_KEY=your_secure_key
MAPBOX_ACCESS_TOKEN=your_token
PUSHER_APP_ID=your_pusher_id
PUSHER_KEY=your_pusher_key
PUSHER_SECRET=your_pusher_secret
```

### **API Route Protection**
```ts
// middleware.ts
import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

export function middleware(request: NextRequest) {
  // Rate limiting
  const ip = request.ip ?? '127.0.0.1'
  const rateLimitKey = `rate_limit_${ip}`
  
  // API key validation for sensitive endpoints
  if (request.nextUrl.pathname.startsWith('/api/admin')) {
    const apiKey = request.headers.get('x-api-key')
    if (apiKey !== process.env.ADMIN_API_KEY) {
      return new NextResponse('Unauthorized', { status: 401 })
    }
  }
  
  return NextResponse.next()
}
```

---

## 📈 VERCEL MONITORING

### **Real-time Monitoring Dashboard**
```ts
// components/AdminDashboard.tsx
import { useEffect, useState } from 'react'

export function AdminDashboard() {
  const [metrics, setMetrics] = useState({
    activeUsers: 0,
    activeSOS: 0,
    responseTime: 0,
    mechanicsOnline: 0
  })
  
  useEffect(() => {
    // Real-time metrics from Vercel Analytics API
    const fetchMetrics = async () => {
      const response = await fetch('/api/admin/metrics')
      const data = await response.json()
      setMetrics(data)
    }
    
    fetchMetrics()
    const interval = setInterval(fetchMetrics, 30000) // 30s
    
    return () => clearInterval(interval)
  }, [])
  
  return (
    <div className="grid grid-cols-4 gap-4">
      <MetricCard title="Usuarios Activos" value={metrics.activeUsers} />
      <MetricCard title="SOS Activos" value={metrics.activeSOS} />
      <MetricCard title="Tiempo Respuesta" value={`${metrics.responseTime}ms`} />
      <MetricCard title="Mecánicos Online" value={metrics.mechanicsOnline} />
    </div>
  )
}
```

---

## 🚀 DEPLOYMENT COMMANDS

### **Vercel CLI Setup**
```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Link project
vercel link

# Deploy to production
vercel --prod

# Environment variables
vercel env add POSTGRES_URL
vercel env add GEMINI_API_KEY
vercel env add MAPBOX_ACCESS_TOKEN
```

### **Automated Deployment**
```yaml
# .github/workflows/deploy.yml
name: Deploy to Vercel
on:
  push:
    branches: [main]
jobs:
  deploy:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - uses: amondnet/vercel-action@v20
        with:
          vercel-token: ${{ secrets.VERCEL_TOKEN }}
          vercel-org-id: ${{ secrets.ORG_ID }}
          vercel-project-id: ${{ secrets.PROJECT_ID }}
          vercel-args: '--prod'
```

---

## 📊 EXPECTED PERFORMANCE

### **Vercel Metrics**
```
🚀 Performance:
├── First Contentful Paint: <1.5s
├── Largest Contentful Paint: <2.5s
├── Time to Interactive: <3.5s
├── Cumulative Layout Shift: <0.1
└── Core Web Vitals: 95+ score

⚡ Edge Functions:
├── Cold start: <50ms
├── Execution time: <100ms
├── Global latency: <200ms
└── 99.9% uptime SLA

📊 Analytics:
├── Real-time user tracking
├── Custom event monitoring
├── Performance insights
└── Error tracking
```

**¿Empezamos implementando la base de datos Postgres o prefieres otro componente primero?**
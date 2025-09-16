# 🚀 SETUP VERCEL PASO A PASO

## 1️⃣ LOGIN Y CONFIGURACIÓN INICIAL

### **Hacer Login en Vercel**
```bash
# En A:\asistencia_vial>
vercel login
# Seleccionar: Continue with GitHub/Google/Email
```

### **Vincular Proyecto**
```bash
vercel link
# ? Set up "A:\asistencia_vial"? [Y/n] Y
# ? Which scope? [tu-usuario]
# ? Link to existing project? [y/N] N
# ? What's your project's name? asistencia-vial
# ? In which directory is your code located? ./
```

## 2️⃣ CONFIGURAR BASE DE DATOS

### **Crear Postgres Database**
```bash
# Dashboard Vercel > Storage > Create Database > Postgres
# Nombre: asistencia-vial-db
# Region: Washington D.C. (iad1)
```

### **Obtener Variables de Entorno**
```bash
# Dashboard > Storage > asistencia-vial-db > .env.local tab
# Copiar todas las variables:
POSTGRES_URL="postgresql://..."
POSTGRES_PRISMA_URL="postgresql://..."
POSTGRES_URL_NON_POOLING="postgresql://..."
```

## 3️⃣ CONFIGURAR VARIABLES DE ENTORNO

### **Agregar Variables una por una**
```bash
vercel env add POSTGRES_URL
# Pegar: postgresql://default:xxx@xxx.postgres.vercel-storage.com:5432/verceldb

vercel env add POSTGRES_PRISMA_URL  
# Pegar: postgresql://default:xxx@xxx.postgres.vercel-storage.com:5432/verceldb?pgbouncer=true&connect_timeout=15

vercel env add POSTGRES_URL_NON_POOLING
# Pegar: postgresql://default:xxx@xxx.postgres.vercel-storage.com:5432/verceldb

vercel env add VITE_GEMINI_API_KEY
# Pegar tu API key de Gemini
```

## 4️⃣ CREAR TABLAS EN LA BASE DE DATOS

### **Ejecutar SQL Schema**
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

## 5️⃣ INSTALAR DEPENDENCIAS

### **Instalar Packages Vercel**
```bash
npm install @vercel/analytics @vercel/speed-insights @vercel/postgres
```

## 6️⃣ DEPLOY A PRODUCCIÓN

### **Deploy Inicial**
```bash
vercel --prod
# ✅ Production: https://asistencia-vial-xxx.vercel.app
```

### **Verificar Deploy**
```bash
# Abrir URL en navegador
# Verificar que funcione correctamente
```

## 7️⃣ CONFIGURAR DOMINIO PERSONALIZADO

### **En Dashboard Vercel**
```
Project Settings > Domains
Add: asistencia-vial.vercel.app (automático)
Add: tu-dominio-personalizado.com (opcional)
```

## 8️⃣ ACTIVAR ANALYTICS

### **En el código (ya implementado)**
```tsx
// src/main.tsx
import { Analytics } from '@vercel/analytics/react'
import { SpeedInsights } from '@vercel/speed-insights/react'

// Ya agregado en los archivos
```

## ⚡ COMANDOS RÁPIDOS

### **Desarrollo Local**
```bash
vercel dev  # Servidor local con funciones Vercel
```

### **Deploy Rápido**
```bash
vercel  # Deploy a preview
vercel --prod  # Deploy a producción
```

### **Ver Logs**
```bash
vercel logs  # Ver logs en tiempo real
```

## 🎯 CHECKLIST COMPLETO

- [ ] ✅ Login en Vercel
- [ ] ✅ Link proyecto
- [ ] ✅ Crear base de datos Postgres
- [ ] ✅ Configurar variables de entorno
- [ ] ✅ Ejecutar schema SQL
- [ ] ✅ Instalar dependencias
- [ ] ✅ Deploy a producción
- [ ] ✅ Verificar funcionamiento
- [ ] ✅ Configurar dominio
- [ ] ✅ Activar analytics

**SIGUIENTE PASO: Ejecutar `vercel login` y seguir el proceso**
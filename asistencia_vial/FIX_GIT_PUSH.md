# 🔧 FIX GIT PUSH ERROR 403

## ❌ PROBLEMA
```
remote: Write access to repository not granted.
fatal: unable to access 'https://github.com/Ente56298/asistencia_vial.git/': The requested URL returned error: 403
```

## ✅ SOLUCIONES

### **Opción 1: Personal Access Token (Recomendado)**
```bash
# 1. Crear token en GitHub
# GitHub > Settings > Developer settings > Personal access tokens > Tokens (classic)
# Generate new token > Select scopes: repo, workflow

# 2. Configurar Git con token
git remote set-url origin https://YOUR_TOKEN@github.com/Ente56298/asistencia_vial.git

# 3. Push
git push origin main
```

### **Opción 2: SSH Key**
```bash
# 1. Generar SSH key
ssh-keygen -t ed25519 -C "tu-email@example.com"

# 2. Agregar a GitHub
# GitHub > Settings > SSH and GPG keys > New SSH key
# Copiar contenido de ~/.ssh/id_ed25519.pub

# 3. Cambiar remote a SSH
git remote set-url origin git@github.com:Ente56298/asistencia_vial.git

# 4. Push
git push origin main
```

### **Opción 3: GitHub CLI (Más fácil)**
```bash
# 1. Instalar GitHub CLI
winget install GitHub.cli

# 2. Login
gh auth login

# 3. Push automático
gh repo sync
```

## 🚀 ALTERNATIVA: DEPLOY DIRECTO DESDE VERCEL

### **Si Git sigue fallando:**
```bash
# 1. Ir a Vercel Dashboard
# 2. Project Settings > Git
# 3. Redeploy from local files
# 4. O conectar con GitHub nuevamente
```

## ⚡ SOLUCIÓN RÁPIDA

### **Usar Personal Access Token:**
1. Ve a: https://github.com/settings/tokens
2. Generate new token (classic)
3. Selecciona: `repo` scope
4. Copia el token
5. Ejecuta:

```bash
git remote set-url origin https://TU_TOKEN_AQUI@github.com/Ente56298/asistencia_vial.git
git push origin main
```

**¿Cuál opción prefieres usar?**
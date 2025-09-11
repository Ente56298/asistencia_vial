@echo off
echo DEPLOY ASISTENCIA VIAL MEXICO
echo ================================

echo Instalando Vercel CLI...
npm install -g vercel

echo Navegando al directorio del proyecto...
cd /d A:\asistencia_vial

echo Instalando dependencias...
npm install

echo Configurando variables de entorno...
echo VITE_GEMINI_API_KEY=AIzaSyAYHBXAtzgl-cXtgBf0VF5nVpSWvEke14g > .env.local

echo Construyendo proyecto...
npm run build

echo Desplegando a Vercel...
vercel --prod

echo Deploy completado!
echo Tu app estara disponible en la URL que aparece arriba
pause
#!/usr/bin/env python3
# -*- coding: utf-8 -*-
"""
BOT TELEGRAM CO•RA - ENTREGAS AUTOMATIZADAS
Integración con Gumroad para entrega automática de productos
"""

import os
import requests
import json
from datetime import datetime

class CORADeliveryBot:
    def __init__(self):
        self.bot_token = "TU_BOT_TOKEN_AQUI"  # Obtener de @BotFather
        self.base_url = f"https://api.telegram.org/bot{self.bot_token}"
        self.productos = {
            "pack_plantillas": {
                "archivos": ["plantillas_premium.zip", "documentacion.pdf"],
                "mensaje": "🎨 Pack Plantillas Premium CO•RA\n✅ 5 plantillas profesionales\n📁 Código fuente completo\n📖 Documentación incluida"
            },
            "catalogo_personalizado": {
                "archivos": ["catalogo_personalizado.zip", "guia_implementacion.pdf"],
                "mensaje": "🚀 Catálogo Personalizado IA\n✅ 20 diseños únicos\n🎯 Optimizado para tu marca\n⚡ Consultoría incluida"
            },
            "consultoria_express": {
                "archivos": ["analisis_tecnico.pdf", "codigo_solucion.zip"],
                "mensaje": "💡 Consultoría Express\n✅ Análisis técnico completo\n🔧 Implementación funcional\n📞 Seguimiento 7 días"
            }
        }
    
    def webhook_gumroad(self, data):
        """Procesa webhook de Gumroad y envía archivos"""
        try:
            producto_id = data.get('product_id')
            email_cliente = data.get('email')
            nombre_cliente = data.get('full_name', 'Cliente')
            
            # Mapear producto de Gumroad a nuestro sistema
            producto_key = self._mapear_producto(producto_id)
            
            if producto_key:
                self._enviar_producto(email_cliente, nombre_cliente, producto_key)
                return {"status": "success", "message": "Producto enviado"}
            
            return {"status": "error", "message": "Producto no encontrado"}
            
        except Exception as e:
            return {"status": "error", "message": str(e)}
    
    def _mapear_producto(self, producto_id):
        """Mapea ID de Gumroad a nuestros productos"""
        mapeo = {
            "pack_plantillas_premium": "pack_plantillas",
            "catalogo_personalizado_ia": "catalogo_personalizado", 
            "consultoria_express_dev": "consultoria_express"
        }
        return mapeo.get(producto_id)
    
    def _enviar_producto(self, email, nombre, producto_key):
        """Envía producto via Telegram"""
        producto = self.productos[producto_key]
        
        # Buscar chat_id por email (requiere base de datos)
        chat_id = self._obtener_chat_id(email)
        
        if chat_id:
            # Enviar mensaje de bienvenida
            mensaje = f"¡Hola {nombre}! 🎉\n\n{producto['mensaje']}\n\n📥 Descargando archivos..."
            self._enviar_mensaje(chat_id, mensaje)
            
            # Enviar archivos
            for archivo in producto['archivos']:
                self._enviar_archivo(chat_id, archivo)
            
            # Mensaje de confirmación
            confirmacion = "✅ Entrega completada\n📞 Soporte: @jorge_cora\n⭐ ¡Califica tu experiencia!"
            self._enviar_mensaje(chat_id, confirmacion)
    
    def _enviar_mensaje(self, chat_id, texto):
        """Envía mensaje de texto"""
        url = f"{self.base_url}/sendMessage"
        data = {"chat_id": chat_id, "text": texto, "parse_mode": "HTML"}
        return requests.post(url, data=data)
    
    def _enviar_archivo(self, chat_id, archivo):
        """Envía archivo al cliente"""
        url = f"{self.base_url}/sendDocument"
        with open(f"productos/{archivo}", 'rb') as f:
            files = {'document': f}
            data = {'chat_id': chat_id}
            return requests.post(url, files=files, data=data)
    
    def _obtener_chat_id(self, email):
        """Obtiene chat_id desde base de datos local"""
        # Implementar base de datos SQLite simple
        return "CHAT_ID_PLACEHOLDER"

# Servidor Flask para webhook
from flask import Flask, request, jsonify

app = Flask(__name__)
bot = CORADeliveryBot()

@app.route('/webhook/gumroad', methods=['POST'])
def webhook_gumroad():
    data = request.json
    resultado = bot.webhook_gumroad(data)
    return jsonify(resultado)

@app.route('/registro', methods=['POST'])
def registro_cliente():
    """Registra cliente para recibir entregas"""
    data = request.json
    email = data.get('email')
    chat_id = data.get('chat_id')
    
    # Guardar en base de datos
    # db.guardar_cliente(email, chat_id)
    
    return jsonify({"status": "registrado", "email": email})

if __name__ == "__main__":
    print("🤖 BOT CO•RA DELIVERY - INICIANDO...")
    print("📱 Webhook: /webhook/gumroad")
    print("👤 Registro: /registro")
    app.run(host='0.0.0.0', port=5000, debug=True)
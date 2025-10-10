import React, { useState, useRef } from 'react';
import { Send, Bot, User, Mic, Camera } from 'lucide-react';
import { GoogleGenerativeAI } from '@google/generative-ai';

const GeminiAssistant: React.FC = () => {
  const [messages, setMessages] = useState<Array<{role: 'user' | 'assistant', content: string}>>([
    { role: 'assistant', content: '¡Hola! Soy tu asistente vial inteligente. ¿En qué puedo ayudarte con tu vehículo o viaje?' }
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: 'user' as const, content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    try {
      const genAI = new GoogleGenerativeAI(import.meta.env.VITE_GEMINI_API_KEY || '');
      const model = genAI.getGenerativeModel({ model: 'gemini-pro' });

      const prompt = `Eres un asistente vial inteligente especializado en México. El usuario pregunta: "${input}"

Proporciona una respuesta útil y precisa sobre:
- Diagnósticos automotrices
- Recomendaciones de mantenimiento
- Consejos de seguridad vial
- Información sobre carreteras mexicanas
- Servicios de emergencia

Mantén un tono amigable y profesional. Si es una emergencia, prioriza la seguridad.`;

      const result = await model.generateContent(prompt);
      const response = await result.response;
      const assistantMessage = { role: 'assistant' as const, content: response.text() };

      setMessages(prev => [...prev, assistantMessage]);
    } catch (error) {
      console.error('Error con Gemini:', error);
      const errorMessage = {
        role: 'assistant' as const,
        content: 'Lo siento, tuve un problema procesando tu consulta. ¿Puedes intentar de nuevo?'
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      scrollToBottom();
    }
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter' && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <div className="gemini-assistant">
      <div className="assistant-header">
        <Bot size={24} />
        <h2>Asistente Vial IA</h2>
      </div>

      <div className="messages-container">
        {messages.map((message, index) => (
          <div key={index} className={`message ${message.role}`}>
            <div className="message-icon">
              {message.role === 'user' ? <User size={16} /> : <Bot size={16} />}
            </div>
            <div className="message-content">
              {message.content}
            </div>
          </div>
        ))}
        {isLoading && (
          <div className="message assistant loading">
            <div className="message-icon">
              <Bot size={16} />
            </div>
            <div className="message-content">
              <div className="typing-indicator">
                <span></span>
                <span></span>
                <span></span>
              </div>
            </div>
          </div>
        )}
        <div ref={messagesEndRef} />
      </div>

      {cameraActive && (
        <div className="camera-container">
          <video
            ref={videoRef}
            autoPlay
            playsInline
            style={{ width: '100%', maxHeight: '300px', borderRadius: '8px' }}
          />
          <div className="camera-controls">
            <button onClick={capturePhoto} className="capture-button">
              📸 Capturar
            </button>
            <button 
              onClick={() => {
                const stream = videoRef.current?.srcObject as MediaStream;
                stream?.getTracks().forEach(track => track.stop());
                setCameraActive(false);
              }}
              className="cancel-button"
            >
              ❌ Cancelar
            </button>
          </div>
        </div>
      )}

      <div className="input-container">
        <div className="input-wrapper">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyPress={handleKeyPress}
            placeholder="Describe tu problema automotriz..."
            disabled={isLoading}
          />
          <button
            onClick={startVoiceRecognition}
            className={`voice-button ${isListening ? 'listening' : ''}`}
            disabled={isLoading}
          >
            <Mic size={20} />
            {isListening && <span>Escuchando...</span>}
          </button>
          <button
            onClick={startCamera}
            className="camera-button"
            disabled={isLoading}
          >
            <Camera size={20} />
          </button>
          <button
            onClick={sendMessage}
            className="send-button"
            disabled={isLoading || !input.trim()}
          >
            <Send size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default GeminiAssistant;

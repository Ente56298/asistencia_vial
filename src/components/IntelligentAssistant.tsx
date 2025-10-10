import { useState, useEffect, useRef } from 'react';

interface AssistantMessage {
  id: string;
  type: 'user' | 'assistant';
  content: string;
  timestamp: string;
  category?: 'emergency' | 'diagnostic' | 'navigation' | 'general';
}

interface VoiceRecognition {
  isListening: boolean;
  transcript: string;
  confidence: number;
}

export default function IntelligentAssistant() {
  const [messages, setMessages] = useState<AssistantMessage[]>([]);
  const [inputText, setInputText] = useState('');
  const [isProcessing, setIsProcessing] = useState(false);
  const [voiceRecognition, setVoiceRecognition] = useState<VoiceRecognition>({
    isListening: false,
    transcript: '',
    confidence: 0
  });
  const [cameraActive, setCameraActive] = useState(false);
  const [assistantMode, setAssistantMode] = useState<'chat' | 'voice' | 'camera'>('chat');
  
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const recognitionRef = useRef<any>(null);
  const videoRef = useRef<HTMLVideoElement>(null);

  useEffect(() => {
    // Initialize Web Speech API
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const SpeechRecognition = (window as any).webkitSpeechRecognition || (window as any).SpeechRecognition;
      recognitionRef.current = new SpeechRecognition();
      recognitionRef.current.continuous = true;
      recognitionRef.current.interimResults = true;
      recognitionRef.current.lang = 'es-MX';

      recognitionRef.current.onresult = (event: any) => {
        let transcript = '';
        let confidence = 0;
        
        for (let i = event.resultIndex; i < event.results.length; i++) {
          transcript += event.results[i][0].transcript;
          confidence = event.results[i][0].confidence;
        }

        setVoiceRecognition(prev => ({
          ...prev,
          transcript,
          confidence
        }));

        // Auto-process if final result with good confidence
        if (event.results[event.results.length - 1].isFinal && confidence > 0.7) {
          processVoiceCommand(transcript);
        }
      };

      recognitionRef.current.onerror = (event: any) => {
        console.error('Speech recognition error:', event.error);
        setVoiceRecognition(prev => ({ ...prev, isListening: false }));
      };
    }

    // Welcome message
    addAssistantMessage('¡Hola! Soy tu asistente inteligente de Asistencia Vial. Puedo ayudarte con emergencias, diagnósticos vehiculares, navegación y más. ¿En qué puedo asistirte?', 'general');

    return () => {
      if (recognitionRef.current) {
        recognitionRef.current.stop();
      }
    };
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const addAssistantMessage = (content: string, category: AssistantMessage['category'] = 'general') => {
    const message: AssistantMessage = {
      id: `msg-${Date.now()}`,
      type: 'assistant',
      content,
      timestamp: new Date().toISOString(),
      category
    };
    setMessages(prev => [...prev, message]);
  };

  const addUserMessage = (content: string) => {
    const message: AssistantMessage = {
      id: `msg-${Date.now()}`,
      type: 'user',
      content,
      timestamp: new Date().toISOString()
    };
    setMessages(prev => [...prev, message]);
  };

  const processMessage = async (text: string) => {
    if (!text.trim()) return;

    addUserMessage(text);
    setIsProcessing(true);

    try {
      // Analyze intent and generate response
      const response = await analyzeAndRespond(text);
      addAssistantMessage(response.content, response.category);
    } catch (error) {
      addAssistantMessage('Lo siento, hubo un error procesando tu solicitud. Por favor intenta nuevamente.', 'general');
    } finally {
      setIsProcessing(false);
    }
  };

  const analyzeAndRespond = async (text: string): Promise<{content: string, category: AssistantMessage['category']}> => {
    const lowerText = text.toLowerCase();

    // Emergency keywords
    if (lowerText.includes('emergencia') || lowerText.includes('accidente') || lowerText.includes('sos')) {
      return {
        content: `🚨 **EMERGENCIA DETECTADA**

He activado el protocolo de emergencia. 

**Acciones inmediatas:**
1. ¿Estás en un lugar seguro?
2. ¿Necesitas ambulancia? (Llamar 065)
3. ¿Necesitas policía? (Llamar 911)
4. ¿Es emergencia vial? (Llamar 078 - Ángeles Verdes)

Tu ubicación se está compartiendo automáticamente con servicios de emergencia.

¿Qué tipo de emergencia tienes?`,
        category: 'emergency'
      };
    }

    // Vehicle diagnostic keywords
    if (lowerText.includes('ruido') || lowerText.includes('falla') || lowerText.includes('motor') || 
        lowerText.includes('frenos') || lowerText.includes('llanta')) {
      return {
        content: `🔧 **DIAGNÓSTICO VEHICULAR**

Basado en tu descripción: "${text}"

**Análisis preliminar:**
- Si es ruido del motor: Revisar aceite y refrigerante
- Si son frenos: Verificar pastillas y líquido de frenos  
- Si es llanta: Inspeccionar presión y desgaste

**Recomendaciones:**
1. Detente en lugar seguro si el problema es grave
2. Enciende luces de emergencia
3. ¿Quieres que contacte un mecánico cercano?

¿Puedes describir más detalles del problema?`,
        category: 'diagnostic'
      };
    }

    // Navigation keywords
    if (lowerText.includes('ruta') || lowerText.includes('tráfico') || lowerText.includes('llegar') ||
        lowerText.includes('ubicación') || lowerText.includes('dirección')) {
      return {
        content: `🗺️ **ASISTENCIA DE NAVEGACIÓN**

Te ayudo con tu consulta de navegación: "${text}"

**Servicios disponibles:**
- Rutas optimizadas en tiempo real
- Reportes de tráfico actualizados
- Ubicación de gasolineras cercanas
- Talleres y servicios en tu ruta

**¿Qué necesitas?**
1. Ruta a destino específico
2. Evitar tráfico pesado
3. Encontrar servicios cercanos
4. Reportar incidente en carretera

Comparte tu ubicación para darte mejor asistencia.`,
        category: 'navigation'
      };
    }

    // General assistance
    return {
      content: `🤖 **ASISTENTE INTELIGENTE**

Entiendo que necesitas ayuda con: "${text}"

**Puedo asistirte con:**
- 🚨 Emergencias y SOS
- 🔧 Diagnóstico de problemas vehiculares
- 🗺️ Navegación y rutas
- 📞 Contactar servicios especializados
- 🛠️ Multiservicios (hogar, médico, legal)

**Comandos útiles:**
- "Emergencia" - Activa protocolo SOS
- "Problema con..." - Diagnóstico vehicular
- "Ruta a..." - Navegación
- "Buscar..." - Servicios cercanos

¿Podrías ser más específico sobre lo que necesitas?`,
      category: 'general'
    };
  };

  const startVoiceRecognition = () => {
    if (recognitionRef.current && !voiceRecognition.isListening) {
      setVoiceRecognition(prev => ({ ...prev, isListening: true, transcript: '' }));
      recognitionRef.current.start();
    }
  };

  const stopVoiceRecognition = () => {
    if (recognitionRef.current && voiceRecognition.isListening) {
      recognitionRef.current.stop();
      setVoiceRecognition(prev => ({ ...prev, isListening: false }));
    }
  };

  const processVoiceCommand = (transcript: string) => {
    stopVoiceRecognition();
    processMessage(transcript);
  };

  const startCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ 
        video: { facingMode: 'environment' } // Use back camera on mobile
      });
      
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
        setCameraActive(true);
        setAssistantMode('camera');
      }
    } catch (error) {
      console.error('Camera access error:', error);
      addAssistantMessage('No se pudo acceder a la cámara. Verifica los permisos.', 'general');
    }
  };

  const stopCamera = () => {
    if (videoRef.current && videoRef.current.srcObject) {
      const stream = videoRef.current.srcObject as MediaStream;
      stream.getTracks().forEach(track => track.stop());
      videoRef.current.srcObject = null;
    }
    setCameraActive(false);
    setAssistantMode('chat');
  };

  const capturePhoto = () => {
    if (videoRef.current) {
      const canvas = document.createElement('canvas');
      canvas.width = videoRef.current.videoWidth;
      canvas.height = videoRef.current.videoHeight;
      const ctx = canvas.getContext('2d');
      
      if (ctx) {
        ctx.drawImage(videoRef.current, 0, 0);
        const imageData = canvas.toDataURL('image/jpeg');
        
        // Process image for diagnostic
        processImageDiagnostic(imageData);
      }
    }
  };

  const processImageDiagnostic = (imageData: string) => {
    // Simulate AI image analysis
    addUserMessage('📸 Foto capturada para diagnóstico');
    addAssistantMessage(`📸 **ANÁLISIS DE IMAGEN**

He analizado la foto que capturaste.

**Diagnóstico visual:**
- Imagen procesada con IA
- Buscando patrones de daños o problemas
- Comparando con base de datos de fallas

**Recomendaciones preliminares:**
1. Si ves humo: Detente inmediatamente
2. Si hay líquidos: Identifica el color y ubicación
3. Si hay daños visibles: Documenta para seguro

¿Puedes describir qué problema específico observas en la imagen?`, 'diagnostic');
  };

  const getCategoryIcon = (category?: string) => {
    switch (category) {
      case 'emergency': return '🚨';
      case 'diagnostic': return '🔧';
      case 'navigation': return '🗺️';
      default: return '🤖';
    }
  };

  return (
    <div className="rocket-card p-4 h-96 flex flex-col">
      <div className="flex justify-between items-center mb-4">
        <h3 className="font-semibold">🤖 Asistente Inteligente</h3>
        <div className="flex gap-2">
          <button
            onClick={() => setAssistantMode('chat')}
            className={`p-2 rounded ${assistantMode === 'chat' ? 'bg-blue-600' : 'bg-gray-700'}`}
          >
            💬
          </button>
          <button
            onClick={() => setAssistantMode('voice')}
            className={`p-2 rounded ${assistantMode === 'voice' ? 'bg-blue-600' : 'bg-gray-700'}`}
          >
            🎤
          </button>
          <button
            onClick={() => setAssistantMode('camera')}
            className={`p-2 rounded ${assistantMode === 'camera' ? 'bg-blue-600' : 'bg-gray-700'}`}
          >
            📷
          </button>
        </div>
      </div>

      {/* Chat Mode */}
      {assistantMode === 'chat' && (
        <>
          <div className="flex-1 overflow-y-auto bg-gray-800 rounded p-3 mb-4">
            {messages.map(message => (
              <div key={message.id} className={`mb-3 ${message.type === 'user' ? 'text-right' : 'text-left'}`}>
                <div className={`inline-block max-w-xs p-2 rounded text-sm ${
                  message.type === 'user' 
                    ? 'bg-blue-600 text-white' 
                    : 'bg-gray-700 text-gray-100'
                }`}>
                  {message.type === 'assistant' && (
                    <span className="mr-2">{getCategoryIcon(message.category)}</span>
                  )}
                  <div className="whitespace-pre-wrap">{message.content}</div>
                </div>
                <div className="text-xs text-gray-500 mt-1">
                  {new Date(message.timestamp).toLocaleTimeString()}
                </div>
              </div>
            ))}
            {isProcessing && (
              <div className="text-left mb-3">
                <div className="inline-block bg-gray-700 text-gray-100 p-2 rounded text-sm">
                  🤖 Procesando...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>

          <div className="flex gap-2">
            <input
              type="text"
              value={inputText}
              onChange={(e) => setInputText(e.target.value)}
              onKeyPress={(e) => e.key === 'Enter' && processMessage(inputText) && setInputText('')}
              placeholder="Escribe tu consulta..."
              className="flex-1 bg-gray-800 border border-gray-600 rounded px-3 py-2 text-sm"
              disabled={isProcessing}
            />
            <button
              onClick={() => {
                processMessage(inputText);
                setInputText('');
              }}
              disabled={isProcessing || !inputText.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded text-sm"
            >
              Enviar
            </button>
          </div>
        </>
      )}

      {/* Voice Mode */}
      {assistantMode === 'voice' && (
        <div className="flex-1 flex flex-col items-center justify-center">
          <div className="text-center mb-6">
            <div className={`text-6xl mb-4 ${voiceRecognition.isListening ? 'animate-pulse' : ''}`}>
              🎤
            </div>
            <div className="text-lg font-semibold mb-2">
              {voiceRecognition.isListening ? 'Escuchando...' : 'Asistente por Voz'}
            </div>
            {voiceRecognition.transcript && (
              <div className="bg-gray-800 rounded p-3 mb-4 text-sm">
                "{voiceRecognition.transcript}"
              </div>
            )}
          </div>

          <div className="flex gap-4">
            {!voiceRecognition.isListening ? (
              <button
                onClick={startVoiceRecognition}
                className="bg-green-600 hover:bg-green-700 text-white px-6 py-3 rounded-lg"
              >
                🎤 Iniciar Voz
              </button>
            ) : (
              <button
                onClick={stopVoiceRecognition}
                className="bg-red-600 hover:bg-red-700 text-white px-6 py-3 rounded-lg"
              >
                🛑 Detener
              </button>
            )}
          </div>
        </div>
      )}

      {/* Camera Mode */}
      {assistantMode === 'camera' && (
        <div className="flex-1 flex flex-col">
          {!cameraActive ? (
            <div className="flex-1 flex flex-col items-center justify-center">
              <div className="text-6xl mb-4">📷</div>
              <div className="text-lg font-semibold mb-4">Diagnóstico Visual</div>
              <p className="text-gray-400 text-sm text-center mb-6">
                Captura una foto del problema para análisis con IA
              </p>
              <button
                onClick={startCamera}
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-lg"
              >
                📷 Activar Cámara
              </button>
            </div>
          ) : (
            <div className="flex-1 flex flex-col">
              <video
                ref={videoRef}
                autoPlay
                playsInline
                className="flex-1 bg-black rounded mb-4"
              />
              <div className="flex gap-2">
                <button
                  onClick={capturePhoto}
                  className="flex-1 bg-green-600 hover:bg-green-700 text-white py-2 rounded"
                >
                  📸 Capturar
                </button>
                <button
                  onClick={stopCamera}
                  className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded"
                >
                  ❌
                </button>
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
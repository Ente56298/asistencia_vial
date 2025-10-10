import { useState, useEffect } from 'react';

interface Agent {
  id: string;
  name: string;
  specialty: string;
  status: 'active' | 'busy' | 'offline';
  avatar: string;
  description: string;
  capabilities: string[];
}

interface AgentTask {
  id: string;
  agentId: string;
  task: string;
  status: 'pending' | 'processing' | 'completed' | 'failed';
  result?: string;
  timestamp: string;
}

export default function MultiAgentSystem() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [tasks, setTasks] = useState<AgentTask[]>([]);
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [taskInput, setTaskInput] = useState('');

  useEffect(() => {
    // Initialize agents
    const systemAgents: Agent[] = [
      {
        id: 'emergency-agent',
        name: 'Agente de Emergencias',
        specialty: 'Respuesta a emergencias y SOS',
        status: 'active',
        avatar: '🚨',
        description: 'Especializado en protocolos de emergencia, coordinación con servicios de auxilio y respuesta rápida.',
        capabilities: ['Activación SOS', 'Coordinación ambulancias', 'Protocolos emergencia', 'Geolocalización']
      },
      {
        id: 'diagnostic-agent',
        name: 'Agente Diagnóstico',
        specialty: 'Análisis vehicular y mecánico',
        status: 'active',
        avatar: '🔧',
        description: 'Experto en diagnóstico de fallas vehiculares, análisis de síntomas y recomendaciones técnicas.',
        capabilities: ['Diagnóstico OBD', 'Análisis síntomas', 'Códigos error', 'Mantenimiento predictivo']
      },
      {
        id: 'navigation-agent',
        name: 'Agente de Navegación',
        specialty: 'Rutas y tráfico en tiempo real',
        status: 'active',
        avatar: '🗺️',
        description: 'Optimización de rutas, análisis de tráfico y navegación inteligente.',
        capabilities: ['Rutas optimizadas', 'Tráfico tiempo real', 'POI cercanos', 'Evitar incidentes']
      },
      {
        id: 'insurance-agent',
        name: 'Agente de Seguros',
        specialty: 'Gestión de pólizas y siniestros',
        status: 'active',
        avatar: '🛡️',
        description: 'Manejo de seguros, reclamaciones y coordinación con aseguradoras.',
        capabilities: ['Gestión pólizas', 'Reportar siniestros', 'Coordinación aseguradoras', 'Documentación']
      },
      {
        id: 'ai-coordinator',
        name: 'CO•RA Coordinador',
        specialty: 'Inteligencia artificial y coordinación',
        status: 'active',
        avatar: '🧠',
        description: 'IA avanzada para coordinación entre agentes y toma de decisiones complejas.',
        capabilities: ['Coordinación multi-agente', 'Análisis predictivo', 'Toma decisiones', 'Aprendizaje']
      },
      {
        id: 'fleet-agent',
        name: 'Agente de Flotillas',
        specialty: 'Gestión de flotas empresariales',
        status: 'busy',
        avatar: '🚛',
        description: 'Monitoreo y gestión de flotillas comerciales, optimización operativa.',
        capabilities: ['Monitoreo flotillas', 'Optimización rutas', 'Mantenimiento', 'Reportes']
      }
    ];

    setAgents(systemAgents);

    // Simulate some ongoing tasks
    const initialTasks: AgentTask[] = [
      {
        id: 'task-001',
        agentId: 'emergency-agent',
        task: 'Monitorear alertas de emergencia en CDMX',
        status: 'processing',
        timestamp: new Date().toISOString()
      },
      {
        id: 'task-002',
        agentId: 'navigation-agent',
        task: 'Analizar tráfico en Periférico Norte',
        status: 'completed',
        result: 'Tráfico moderado, tiempo estimado +15 min',
        timestamp: new Date(Date.now() - 300000).toISOString()
      }
    ];

    setTasks(initialTasks);
  }, []);

  const assignTask = (agentId: string, task: string) => {
    const newTask: AgentTask = {
      id: `task-${Date.now()}`,
      agentId,
      task,
      status: 'pending',
      timestamp: new Date().toISOString()
    };

    setTasks(prev => [newTask, ...prev]);

    // Update agent status
    setAgents(prev => prev.map(agent => 
      agent.id === agentId 
        ? { ...agent, status: 'busy' as const }
        : agent
    ));

    // Simulate task processing
    setTimeout(() => {
      processTask(newTask.id, agentId);
    }, 2000);
  };

  const processTask = (taskId: string, agentId: string) => {
    // Simulate task processing
    setTasks(prev => prev.map(task => 
      task.id === taskId 
        ? { ...task, status: 'processing' }
        : task
    ));

    // Complete task after processing
    setTimeout(() => {
      const result = generateTaskResult(agentId);
      
      setTasks(prev => prev.map(task => 
        task.id === taskId 
          ? { ...task, status: 'completed', result }
          : task
      ));

      // Update agent status back to active
      setAgents(prev => prev.map(agent => 
        agent.id === agentId 
          ? { ...agent, status: 'active' as const }
          : agent
      ));
    }, 3000);
  };

  const generateTaskResult = (agentId: string): string => {
    const results: {[key: string]: string[]} = {
      'emergency-agent': [
        'Protocolo de emergencia activado exitosamente',
        'Servicios de emergencia contactados - ETA 8 minutos',
        'Ubicación compartida con Cruz Roja y Ángeles Verdes'
      ],
      'diagnostic-agent': [
        'Diagnóstico completado: Problema en sistema de frenos',
        'Código P0171 detectado - Mezcla pobre en banco 1',
        'Recomendación: Revisar filtro de aire y sensores'
      ],
      'navigation-agent': [
        'Ruta optimizada calculada - Ahorro 12 minutos',
        'Tráfico analizado: Ruta alternativa por Insurgentes',
        'POI encontrados: 3 gasolineras, 2 talleres en ruta'
      ],
      'insurance-agent': [
        'Póliza verificada - Cobertura activa',
        'Siniestro reportado - Folio #AS2024-001',
        'Ajustador asignado - Contacto en 24 horas'
      ],
      'ai-coordinator': [
        'Análisis predictivo completado',
        'Coordinación multi-agente optimizada',
        'Decisión: Priorizar emergencia médica sobre vial'
      ],
      'fleet-agent': [
        'Flotilla monitoreada: 15 vehículos activos',
        'Optimización completada: Ahorro 8% combustible',
        'Alerta: Vehículo FL-003 requiere mantenimiento'
      ]
    };

    const agentResults = results[agentId] || ['Tarea completada exitosamente'];
    return agentResults[Math.floor(Math.random() * agentResults.length)];
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'active': return 'text-green-400';
      case 'busy': return 'text-yellow-400';
      case 'offline': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  const getTaskStatusColor = (status: string) => {
    switch (status) {
      case 'completed': return 'text-green-400';
      case 'processing': return 'text-blue-400';
      case 'pending': return 'text-yellow-400';
      case 'failed': return 'text-red-400';
      default: return 'text-gray-400';
    }
  };

  return (
    <div className="space-y-6">
      {/* Agents Grid */}
      <div className="rocket-card p-4">
        <h3 className="font-semibold mb-4">🤖 Sistema Multi-Agente</h3>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {agents.map(agent => (
            <div 
              key={agent.id} 
              className={`bg-gray-800 rounded-lg p-4 cursor-pointer transition-all ${
                selectedAgent === agent.id ? 'ring-2 ring-blue-500' : 'hover:bg-gray-700'
              }`}
              onClick={() => setSelectedAgent(agent.id)}
            >
              <div className="flex items-center gap-3 mb-3">
                <div className="text-3xl">{agent.avatar}</div>
                <div>
                  <div className="font-semibold">{agent.name}</div>
                  <div className={`text-sm ${getStatusColor(agent.status)}`}>
                    ● {agent.status.toUpperCase()}
                  </div>
                </div>
              </div>
              
              <div className="text-sm text-gray-400 mb-3">{agent.description}</div>
              
              <div className="flex flex-wrap gap-1">
                {agent.capabilities.slice(0, 2).map(capability => (
                  <span key={capability} className="bg-blue-900 text-blue-200 text-xs px-2 py-1 rounded">
                    {capability}
                  </span>
                ))}
                {agent.capabilities.length > 2 && (
                  <span className="text-xs text-gray-500">+{agent.capabilities.length - 2}</span>
                )}
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Task Assignment */}
      {selectedAgent && (
        <div className="rocket-card p-4">
          <h3 className="font-semibold mb-4">
            📋 Asignar Tarea a {agents.find(a => a.id === selectedAgent)?.name}
          </h3>
          
          <div className="flex gap-2 mb-4">
            <input
              type="text"
              value={taskInput}
              onChange={(e) => setTaskInput(e.target.value)}
              placeholder="Describe la tarea a asignar..."
              className="flex-1 bg-gray-800 border border-gray-600 rounded px-3 py-2"
              onKeyPress={(e) => {
                if (e.key === 'Enter' && taskInput.trim()) {
                  assignTask(selectedAgent, taskInput);
                  setTaskInput('');
                }
              }}
            />
            <button
              onClick={() => {
                if (taskInput.trim()) {
                  assignTask(selectedAgent, taskInput);
                  setTaskInput('');
                }
              }}
              disabled={!taskInput.trim()}
              className="bg-blue-600 hover:bg-blue-700 disabled:bg-gray-600 text-white px-4 py-2 rounded"
            >
              Asignar
            </button>
          </div>

          {/* Quick Tasks */}
          <div className="grid grid-cols-2 gap-2">
            {selectedAgent === 'emergency-agent' && (
              <>
                <button onClick={() => assignTask(selectedAgent, 'Activar protocolo SOS')} className="bg-red-600 hover:bg-red-700 text-white text-sm py-2 rounded">
                  🚨 Activar SOS
                </button>
                <button onClick={() => assignTask(selectedAgent, 'Contactar ambulancia')} className="bg-red-600 hover:bg-red-700 text-white text-sm py-2 rounded">
                  🚑 Ambulancia
                </button>
              </>
            )}
            
            {selectedAgent === 'diagnostic-agent' && (
              <>
                <button onClick={() => assignTask(selectedAgent, 'Diagnosticar códigos OBD')} className="bg-orange-600 hover:bg-orange-700 text-white text-sm py-2 rounded">
                  🔧 Diagnóstico OBD
                </button>
                <button onClick={() => assignTask(selectedAgent, 'Analizar síntomas vehiculares')} className="bg-orange-600 hover:bg-orange-700 text-white text-sm py-2 rounded">
                  🔍 Analizar Síntomas
                </button>
              </>
            )}
            
            {selectedAgent === 'navigation-agent' && (
              <>
                <button onClick={() => assignTask(selectedAgent, 'Calcular ruta óptima')} className="bg-green-600 hover:bg-green-700 text-white text-sm py-2 rounded">
                  🗺️ Ruta Óptima
                </button>
                <button onClick={() => assignTask(selectedAgent, 'Analizar tráfico actual')} className="bg-green-600 hover:bg-green-700 text-white text-sm py-2 rounded">
                  🚦 Análisis Tráfico
                </button>
              </>
            )}
          </div>
        </div>
      )}

      {/* Task History */}
      <div className="rocket-card p-4">
        <h3 className="font-semibold mb-4">📊 Historial de Tareas</h3>
        
        <div className="space-y-3 max-h-64 overflow-y-auto">
          {tasks.map(task => {
            const agent = agents.find(a => a.id === task.agentId);
            return (
              <div key={task.id} className="bg-gray-800 rounded p-3">
                <div className="flex justify-between items-start mb-2">
                  <div className="flex items-center gap-2">
                    <span className="text-lg">{agent?.avatar}</span>
                    <div>
                      <div className="font-semibold text-sm">{agent?.name}</div>
                      <div className="text-xs text-gray-400">{task.task}</div>
                    </div>
                  </div>
                  <span className={`text-xs px-2 py-1 rounded ${
                    task.status === 'completed' ? 'bg-green-900 text-green-200' :
                    task.status === 'processing' ? 'bg-blue-900 text-blue-200' :
                    task.status === 'pending' ? 'bg-yellow-900 text-yellow-200' :
                    'bg-red-900 text-red-200'
                  }`}>
                    {task.status}
                  </span>
                </div>
                
                {task.result && (
                  <div className="text-sm text-green-300 bg-green-900/20 rounded p-2 mt-2">
                    ✅ {task.result}
                  </div>
                )}
                
                <div className="text-xs text-gray-500 mt-2">
                  {new Date(task.timestamp).toLocaleString()}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
}
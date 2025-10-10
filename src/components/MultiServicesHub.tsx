import { useState, useEffect } from 'react';

interface ServiceCategory {
  id: string;
  name: string;
  icon: string;
  description: string;
  services: Service[];
  available24h: boolean;
}

interface Service {
  id: string;
  name: string;
  description: string;
  provider: string;
  estimatedTime: string;
  cost: string;
  phone?: string;
  coverage: 'NACIONAL' | 'CDMX' | 'REGIONAL';
}

export default function MultiServicesHub() {
  const [categories, setCategories] = useState<ServiceCategory[]>([]);
  const [activeCategory, setActiveCategory] = useState<string>('vial');
  const [requestHistory, setRequestHistory] = useState<any[]>([]);

  useEffect(() => {
    // Load multiservices data
    const multiservicesData: ServiceCategory[] = [
      {
        id: 'vial',
        name: 'Asistencia Vial',
        icon: '🚗',
        description: 'Servicios de emergencia y mantenimiento vehicular',
        available24h: true,
        services: [
          {
            id: 'grua',
            name: 'Servicio de Grúa',
            description: 'Remolque hasta 50km incluido',
            provider: 'Ángeles Verdes / Grúas Express',
            estimatedTime: '20-30 min',
            cost: 'Gratuito (Ángeles Verdes)',
            phone: '078',
            coverage: 'NACIONAL'
          },
          {
            id: 'combustible',
            name: 'Suministro de Gasolina',
            description: 'Entrega de 5L de combustible',
            provider: 'Pemex Delivery',
            estimatedTime: '25-35 min',
            cost: 'Costo del combustible',
            coverage: 'NACIONAL'
          },
          {
            id: 'llanta',
            name: 'Cambio de Llanta',
            description: 'Instalación de refacción',
            provider: 'Técnicos Certificados',
            estimatedTime: '15-20 min',
            cost: 'Incluido en póliza',
            coverage: 'NACIONAL'
          },
          {
            id: 'bateria',
            name: 'Paso de Corriente',
            description: 'Arranque por batería descargada',
            provider: 'Ángeles Verdes',
            estimatedTime: '15-25 min',
            cost: 'Gratuito',
            phone: '078',
            coverage: 'NACIONAL'
          }
        ]
      },
      {
        id: 'medica',
        name: 'Asistencia Médica',
        icon: '🏥',
        description: 'Servicios de salud y emergencias médicas',
        available24h: true,
        services: [
          {
            id: 'ambulancia',
            name: 'Servicio de Ambulancia',
            description: 'Traslado médico de emergencia',
            provider: 'Cruz Roja Mexicana',
            estimatedTime: '8-15 min',
            cost: 'Según tarifa oficial',
            phone: '065',
            coverage: 'NACIONAL'
          },
          {
            id: 'orientacion',
            name: 'Orientación Médica',
            description: 'Consulta telefónica 24h',
            provider: 'Médicos Certificados',
            estimatedTime: 'Inmediato',
            cost: 'Incluido',
            coverage: 'NACIONAL'
          },
          {
            id: 'medicamentos',
            name: 'Entrega de Medicamentos',
            description: 'Delivery de medicinas urgentes',
            provider: 'Farmacias del Ahorro',
            estimatedTime: '30-45 min',
            cost: 'Costo del medicamento',
            coverage: 'CDMX'
          }
        ]
      },
      {
        id: 'hogar',
        name: 'Asistencia en el Hogar',
        icon: '🏠',
        description: 'Servicios de emergencia doméstica',
        available24h: true,
        services: [
          {
            id: 'plomeria',
            name: 'Plomería de Emergencia',
            description: 'Reparación de fugas y obstrucciones',
            provider: 'Técnicos Certificados',
            estimatedTime: '30-60 min',
            cost: 'Desde $300 MXN',
            coverage: 'CDMX'
          },
          {
            id: 'electricidad',
            name: 'Electricidad',
            description: 'Reparación de fallas eléctricas',
            provider: 'Electricistas Certificados',
            estimatedTime: '45-90 min',
            cost: 'Desde $400 MXN',
            coverage: 'CDMX'
          },
          {
            id: 'cerrajeria',
            name: 'Cerrajería',
            description: 'Apertura de puertas y cambio de chapas',
            provider: 'Cerrajeros 24h',
            estimatedTime: '20-40 min',
            cost: 'Desde $250 MXN',
            coverage: 'CDMX'
          },
          {
            id: 'vidrieria',
            name: 'Vidriería',
            description: 'Reparación de cristales rotos',
            provider: 'Vidrieros Profesionales',
            estimatedTime: '60-120 min',
            cost: 'Según tamaño',
            coverage: 'CDMX'
          }
        ]
      },
      {
        id: 'legal',
        name: 'Asistencia Legal',
        icon: '⚖️',
        description: 'Orientación jurídica y representación',
        available24h: false,
        services: [
          {
            id: 'orientacion-legal',
            name: 'Orientación Telefónica',
            description: 'Consulta legal inmediata',
            provider: 'Abogados Certificados',
            estimatedTime: 'Inmediato',
            cost: 'Incluido',
            coverage: 'NACIONAL'
          },
          {
            id: 'accidentes',
            name: 'Asistencia en Accidentes',
            description: 'Representación en siniestros viales',
            provider: 'Despacho Jurídico',
            estimatedTime: '30-60 min',
            cost: 'Incluido en póliza',
            coverage: 'NACIONAL'
          },
          {
            id: 'tramites',
            name: 'Gestión de Trámites',
            description: 'Apoyo en documentación legal',
            provider: 'Gestores Profesionales',
            estimatedTime: '1-3 días',
            cost: 'Según trámite',
            coverage: 'NACIONAL'
          }
        ]
      },
      {
        id: 'mascotas',
        name: 'Asistencia para Mascotas',
        icon: '🐕',
        description: 'Servicios veterinarios de emergencia',
        available24h: true,
        services: [
          {
            id: 'veterinario',
            name: 'Veterinario de Emergencia',
            description: 'Atención médica veterinaria urgente',
            provider: 'Clínicas Veterinarias',
            estimatedTime: '30-45 min',
            cost: 'Desde $500 MXN',
            coverage: 'CDMX'
          },
          {
            id: 'traslado-mascota',
            name: 'Traslado de Mascotas',
            description: 'Transporte a clínica veterinaria',
            provider: 'Pet Ambulance',
            estimatedTime: '20-30 min',
            cost: 'Desde $200 MXN',
            coverage: 'CDMX'
          }
        ]
      },
      {
        id: 'tecnologia',
        name: 'Asistencia Tecnológica',
        icon: '💻',
        description: 'Soporte técnico para dispositivos',
        available24h: false,
        services: [
          {
            id: 'soporte-remoto',
            name: 'Soporte Remoto',
            description: 'Asistencia técnica por videollamada',
            provider: 'Técnicos Certificados',
            estimatedTime: 'Inmediato',
            cost: 'Incluido',
            coverage: 'NACIONAL'
          },
          {
            id: 'reparacion-domicilio',
            name: 'Reparación a Domicilio',
            description: 'Técnico especializado en casa',
            provider: 'Servicio Técnico',
            estimatedTime: '2-4 horas',
            cost: 'Desde $300 MXN',
            coverage: 'CDMX'
          }
        ]
      }
    ];

    setCategories(multiservicesData);
  }, []);

  const requestService = async (service: Service) => {
    const location = await getCurrentLocation();
    
    const serviceRequest = {
      id: `REQ-${Date.now()}`,
      serviceId: service.id,
      serviceName: service.name,
      provider: service.provider,
      location,
      timestamp: new Date().toISOString(),
      status: 'REQUESTED',
      estimatedTime: service.estimatedTime
    };

    // Add to history
    setRequestHistory(prev => [serviceRequest, ...prev]);

    // Store in localStorage
    const history = JSON.parse(localStorage.getItem('service_requests') || '[]');
    history.unshift(serviceRequest);
    localStorage.setItem('service_requests', JSON.stringify(history.slice(0, 50)));

    // Send request to API
    try {
      await fetch('/api/multiservice-request', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(serviceRequest)
      });

      // Show confirmation
      if ('Notification' in window && Notification.permission === 'granted') {
        new Notification(`🛠️ Servicio Solicitado`, {
          body: `${service.name} - ${service.estimatedTime}`,
          icon: '/manifest.json'
        });
      }

      alert(`✅ Servicio solicitado exitosamente\n\n${service.name}\nProveedor: ${service.provider}\nTiempo estimado: ${service.estimatedTime}\nFolio: ${serviceRequest.id}`);

    } catch (error) {
      console.error('Service request failed:', error);
      alert('Error al solicitar servicio. Intente nuevamente.');
    }
  };

  const getCurrentLocation = (): Promise<{lat: number, lng: number} | null> => {
    return new Promise((resolve) => {
      if (!navigator.geolocation) {
        resolve(null);
        return;
      }

      navigator.geolocation.getCurrentPosition(
        (position) => resolve({
          lat: position.coords.latitude,
          lng: position.coords.longitude
        }),
        () => resolve(null),
        { enableHighAccuracy: true, timeout: 5000 }
      );
    });
  };

  const callProvider = (phone: string) => {
    window.open(`tel:${phone}`);
  };

  const activeServices = categories.find(cat => cat.id === activeCategory)?.services || [];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="rocket-card p-4">
        <div className="text-center mb-4">
          <h2 className="text-2xl font-bold mb-2">🛠️ Multiservicios de Asistencia</h2>
          <p className="text-gray-400 text-sm">
            Plataforma integral de servicios de emergencia 24/7
          </p>
        </div>

        {/* Category Tabs */}
        <div className="flex flex-wrap gap-2 justify-center">
          {categories.map(category => (
            <button
              key={category.id}
              onClick={() => setActiveCategory(category.id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg text-sm font-medium transition-all ${
                activeCategory === category.id
                  ? 'bg-blue-600 text-white'
                  : 'bg-gray-800 text-gray-300 hover:bg-gray-700'
              }`}
            >
              <span className="text-lg">{category.icon}</span>
              <span>{category.name}</span>
              {category.available24h && (
                <span className="text-xs bg-green-600 px-1 rounded">24h</span>
              )}
            </button>
          ))}
        </div>
      </div>

      {/* Active Category Services */}
      <div className="rocket-card p-4">
        {categories.find(cat => cat.id === activeCategory) && (
          <>
            <div className="mb-4">
              <h3 className="font-semibold text-lg mb-2">
                {categories.find(cat => cat.id === activeCategory)?.icon}{' '}
                {categories.find(cat => cat.id === activeCategory)?.name}
              </h3>
              <p className="text-gray-400 text-sm">
                {categories.find(cat => cat.id === activeCategory)?.description}
              </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {activeServices.map(service => (
                <div key={service.id} className="bg-gray-800 rounded-lg p-4">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h4 className="font-semibold">{service.name}</h4>
                      <p className="text-sm text-gray-400">{service.description}</p>
                    </div>
                    <span className={`text-xs px-2 py-1 rounded ${
                      service.coverage === 'NACIONAL' ? 'bg-green-600' :
                      service.coverage === 'CDMX' ? 'bg-blue-600' : 'bg-yellow-600'
                    }`}>
                      {service.coverage}
                    </span>
                  </div>

                  <div className="space-y-2 text-sm mb-4">
                    <div className="flex justify-between">
                      <span className="text-gray-400">Proveedor:</span>
                      <span>{service.provider}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Tiempo:</span>
                      <span>{service.estimatedTime}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-400">Costo:</span>
                      <span className={service.cost.includes('Gratuito') || service.cost.includes('Incluido') ? 'text-green-400' : ''}>
                        {service.cost}
                      </span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button
                      onClick={() => requestService(service)}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded text-sm font-medium"
                    >
                      🛠️ Solicitar
                    </button>
                    {service.phone && (
                      <button
                        onClick={() => callProvider(service.phone!)}
                        className="bg-green-600 hover:bg-green-700 text-white py-2 px-4 rounded text-sm"
                      >
                        📞
                      </button>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </>
        )}
      </div>

      {/* Quick Access Emergency Numbers */}
      <div className="rocket-card p-4">
        <h3 className="font-semibold mb-4">🚨 Números de Emergencia</h3>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
          {[
            { name: 'Emergencias', number: '911', icon: '🚨' },
            { name: 'Ángeles Verdes', number: '078', icon: '🚗' },
            { name: 'Cruz Roja', number: '065', icon: '🏥' },
            { name: 'CAPUFE', number: '074', icon: '🛣️' }
          ].map(emergency => (
            <button
              key={emergency.number}
              onClick={() => callProvider(emergency.number)}
              className="bg-red-600 hover:bg-red-700 text-white p-3 rounded-lg text-center"
            >
              <div className="text-2xl mb-1">{emergency.icon}</div>
              <div className="text-sm font-semibold">{emergency.name}</div>
              <div className="text-xs">{emergency.number}</div>
            </button>
          ))}
        </div>
      </div>

      {/* Service History */}
      {requestHistory.length > 0 && (
        <div className="rocket-card p-4">
          <h3 className="font-semibold mb-4">📋 Historial de Servicios</h3>
          <div className="space-y-2">
            {requestHistory.slice(0, 3).map(request => (
              <div key={request.id} className="bg-gray-800 rounded p-3 text-sm">
                <div className="flex justify-between items-center">
                  <div>
                    <div className="font-semibold">{request.serviceName}</div>
                    <div className="text-gray-400">{request.provider}</div>
                  </div>
                  <div className="text-right">
                    <div className="text-green-400">{request.status}</div>
                    <div className="text-xs text-gray-400">
                      {new Date(request.timestamp).toLocaleString()}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
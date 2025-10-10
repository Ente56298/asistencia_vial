import React, { useState } from 'react';
import { Wrench, Star, Phone, MapPin, Clock } from 'lucide-react';

interface Service {
  id: string;
  name: string;
  specialty: string;
  rating: number;
  reviews: number;
  location: string;
  distance: number;
  phone: string;
  openHours: string;
  services: string[];
}

const MechanicalServices: React.FC = () => {
  const [selectedService, setSelectedService] = useState<string>('');

  // Datos de ejemplo
  const mockServices: Service[] = [
    {
      id: '1',
      name: 'Taller Mecánico Express',
      specialty: 'Mantenimiento General',
      rating: 4.8,
      reviews: 156,
      location: 'Centro Histórico, CDMX',
      distance: 1.2,
      phone: '+52 55 1234 5678',
      openHours: '8:00 - 18:00',
      services: ['Cambio de aceite', 'Alineación', 'Balanceo', 'Frenos']
    },
    {
      id: '2',
      name: 'Auto Servicio 24/7',
      specialty: 'Servicio de Grúa',
      rating: 4.6,
      reviews: 89,
      location: 'Polanco, CDMX',
      distance: 3.5,
      phone: '+52 55 8765 4321',
      openHours: '24 horas',
      services: ['Grúa', 'Remolque', 'Asistencia en carretera']
    },
    {
      id: '3',
      name: 'Especialistas Toyota',
      specialty: 'Reparación por Marca',
      rating: 4.9,
      reviews: 203,
      location: 'Santa Fe, CDMX',
      distance: 8.1,
      phone: '+52 55 5555 1234',
      openHours: '7:00 - 19:00',
      services: ['Diagnóstico computarizado', 'Reparaciones especializadas', 'Refacciones originales']
    }
  ];

  const scheduleAppointment = (serviceId: string) => {
    const service = mockServices.find(s => s.id === serviceId);
    if (service) {
      const message = `Hola, me gustaría agendar una cita en ${service.name}. ¿Cuándo tienen disponibilidad?`;
      const whatsappUrl = `https://wa.me/525512345678?text=${encodeURIComponent(message)}`;
      window.open(whatsappUrl, '_blank');
    }
  };

  const getDirections = (location: string) => {
    const mapsUrl = `https://maps.google.com/?q=${encodeURIComponent(location)}`;
    window.open(mapsUrl, '_blank');
  };

  const filteredServices = selectedService
    ? mockServices.filter(service =>
        service.services.some(s => s.toLowerCase().includes(selectedService.toLowerCase()))
      )
    : mockServices;

  return (
    <div className="mechanical-services">
      <h2>Red de Servicios Mecánicos</h2>

      <div className="service-filters">
        <select
          value={selectedService}
          onChange={(e) => setSelectedService(e.target.value)}
        >
          <option value="">Todos los servicios</option>
          <option value="aceite">Cambio de aceite</option>
          <option value="frenos">Frenos</option>
          <option value="alineación">Alineación y balanceo</option>
          <option value="grúa">Servicio de grúa</option>
          <option value="diagnóstico">Diagnóstico</option>
        </select>
      </div>

      <div className="services-grid">
        {filteredServices.map(service => (
          <div key={service.id} className="service-card">
            <div className="service-header">
              <h3>{service.name}</h3>
              <span className="specialty">{service.specialty}</span>
            </div>

            <div className="service-rating">
              <div className="stars">
                {[...Array(5)].map((_, i) => (
                  <Star
                    key={i}
                    size={16}
                    fill={i < Math.floor(service.rating) ? '#fbbf24' : 'none'}
                    color="#fbbf24"
                  />
                ))}
              </div>
              <span className="rating-text">
                {service.rating} ({service.reviews} reseñas)
              </span>
            </div>

            <div className="service-details">
              <div className="detail-item">
                <MapPin size={16} />
                <span>{service.location} ({service.distance}km)</span>
              </div>

              <div className="detail-item">
                <Phone size={16} />
                <span>{service.phone}</span>
              </div>

              <div className="detail-item">
                <Clock size={16} />
                <span>{service.openHours}</span>
              </div>
            </div>

            <div className="service-offerings">
              <h4>Servicios principales:</h4>
              <div className="services-list">
                {service.services.slice(0, 3).map((serv, index) => (
                  <span key={index} className="service-tag">{serv}</span>
                ))}
              </div>
            </div>

            <div className="service-actions">
              <button 
                className="call-button"
                onClick={() => window.open(`tel:${service.phone}`)}
              >
                <Phone size={16} />
                Llamar
              </button>
              <button 
                className="schedule-button"
                onClick={() => scheduleAppointment(service.id)}
              >
                <Wrench size={16} />
                Agendar Cita
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MechanicalServices;

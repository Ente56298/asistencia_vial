import React from 'react';

interface NewLandingPageProps {
  setCurrentView: (view: string) => void;
}

const NewLandingPage: React.FC<NewLandingPageProps> = ({ setCurrentView }) => {
  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="absolute top-0 left-0 right-0 z-50 bg-black/20 backdrop-blur-md">
        <div className="max-w-7xl mx-auto px-4 py-4 flex items-center justify-between">
          <div className="flex items-center">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 bg-blue-600 rounded flex items-center justify-center">
                <span className="text-white font-bold text-sm">AV</span>
              </div>
              <span className="text-white font-bold">Asistencia Vial</span>
            </div>
          </div>
          <nav className="hidden md:flex space-x-8">
            <a href="#servicios" className="text-white hover:text-blue-300 transition-colors">Servicios</a>
            <a href="#nosotros" className="text-white hover:text-blue-300 transition-colors">Acerca de nosotros</a>
            <a href="#contacto" className="text-white hover:text-blue-300 transition-colors">Contacto</a>
          </nav>
          <div className="hidden md:flex space-x-4">
            <button 
              onClick={() => setCurrentView('sos')}
              className="bg-blue-600 hover:bg-blue-700 text-white px-4 py-2 rounded-lg transition-colors"
            >
              Obtener ayuda
            </button>
            <button 
              onClick={() => setCurrentView('dashboard')}
              className="border border-white text-white hover:bg-white hover:text-black px-4 py-2 rounded-lg transition-colors"
            >
              Nuestros servicios
            </button>
          </div>
        </div>
      </header>

      {/* Hero Section */}
      <section className="relative min-h-screen flex items-center justify-center bg-gradient-to-r from-black/60 to-transparent">
        <div 
          className="absolute inset-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('https://images.unsplash.com/photo-1502877338535-766e3a6052c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=2070&q=80')"
          }}
        />
        <div className="absolute inset-0 bg-gradient-to-r from-black/70 to-black/30" />
        
        <div className="relative z-10 max-w-4xl mx-auto px-4 text-center text-white">
          <h1 className="text-5xl md:text-7xl font-bold mb-6 leading-tight">
            Asistencia en Carretera{' '}
            <span className="text-blue-400">Cuando la Necesitas</span>
          </h1>
          <p className="text-xl md:text-2xl mb-8 max-w-3xl mx-auto leading-relaxed text-gray-200">
            ¿Problemas inesperados en la carretera? ¡No te preocupes! Nuestro equipo está listo para ayudarte de forma rápida y eficiente. Solicita asistencia y regresa a tu ruta con seguridad.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <button
              onClick={() => setCurrentView('sos')}
              className="bg-blue-600 hover:bg-blue-700 text-white font-bold py-4 px-8 rounded-lg text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
            >
              🚨 Solicitar Ayuda Ahora
            </button>
            <button
              onClick={() => setCurrentView('dashboard')}
              className="bg-transparent border-2 border-white hover:bg-white hover:text-black text-white font-bold py-4 px-8 rounded-lg text-lg transition-all duration-300"
            >
              Conocer Más
            </button>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section id="servicios" className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4">
          <div className="flex items-center mb-16">
            <div className="flex-1 bg-white rounded-3xl p-12 shadow-lg">
              <div className="max-w-2xl">
                <h2 className="text-4xl font-bold text-gray-900 mb-6">
                  Servicios de Emergencia 24/7
                </h2>
                <p className="text-lg text-gray-600 mb-8">
                  Contamos con una red nacional de técnicos especializados listos para atenderte en cualquier momento del día. Desde grúas hasta mecánicos certificados, tenemos la solución que necesitas.
                </p>
                <ul className="space-y-4">
                  <li className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-4"></span>
                    Servicio de grúa las 24 horas
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-4"></span>
                    Mecánicos certificados en ruta
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-4"></span>
                    Cambio de llantas y batería
                  </li>
                  <li className="flex items-center text-gray-700">
                    <span className="w-2 h-2 bg-blue-600 rounded-full mr-4"></span>
                    Suministro de combustible
                  </li>
                </ul>
              </div>
            </div>
            <div className="flex-1 ml-8">
              <img 
                src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=1000&q=80"
                alt="Servicio de grúa"
                className="w-full h-96 object-cover rounded-3xl shadow-lg"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section className="py-20 bg-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🚗</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Respuesta Rápida</h3>
              <p className="text-gray-600">Tiempo promedio de respuesta de 15-30 minutos en zonas urbanas</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🔧</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Técnicos Expertos</h3>
              <p className="text-gray-600">Personal certificado con años de experiencia en el sector</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">📱</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">App Inteligente</h3>
              <p className="text-gray-600">Solicita ayuda con un toque y rastrea el progreso en tiempo real</p>
            </div>
            <div className="text-center p-6">
              <div className="w-16 h-16 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-4">
                <span className="text-2xl">🛡️</span>
              </div>
              <h3 className="text-xl font-bold text-gray-900 mb-2">Cobertura Nacional</h3>
              <p className="text-gray-600">Servicio disponible en toda la República Mexicana</p>
            </div>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section id="nosotros" className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <span className="text-blue-400 font-semibold">SOBRE NOSOTROS</span>
              <h2 className="text-4xl font-bold mt-2 mb-6">
                Líderes en Asistencia Vial en México
              </h2>
              <p className="text-gray-300 mb-8 leading-relaxed">
                Con más de 10 años de experiencia, somos la empresa líder en servicios de asistencia vial en México. Nuestro compromiso es brindarte tranquilidad y seguridad en cada viaje.
              </p>
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                <div className="text-center">
                  <button className="w-full bg-transparent border border-white hover:bg-white hover:text-black text-white py-3 px-6 rounded-lg transition-colors mb-4">
                    Llamar Ahora
                  </button>
                </div>
                <div className="text-center">
                  <button className="w-full bg-transparent border border-white hover:bg-white hover:text-black text-white py-3 px-6 rounded-lg transition-colors mb-4">
                    Chat en Vivo
                  </button>
                </div>
                <div className="text-center">
                  <button className="w-full bg-transparent border border-white hover:bg-white hover:text-black text-white py-3 px-6 rounded-lg transition-colors mb-4">
                    WhatsApp
                  </button>
                </div>
              </div>
            </div>
            <div className="grid grid-cols-2 gap-4">
              <div className="space-y-4">
                <img 
                  src="https://images.unsplash.com/photo-1581092160562-40aa08e78837?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Técnico trabajando"
                  className="w-full h-48 object-cover rounded-lg"
                />
                <img 
                  src="https://images.unsplash.com/photo-1558618666-fcd25c85cd64?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Grúa en acción"
                  className="w-full h-32 object-cover rounded-lg"
                />
              </div>
              <div className="space-y-4 pt-8">
                <img 
                  src="https://images.unsplash.com/photo-1609205807107-e8ec2120f9de?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Equipo de trabajo"
                  className="w-full h-32 object-cover rounded-lg"
                />
                <img 
                  src="https://images.unsplash.com/photo-1502877338535-766e3a6052c0?ixlib=rb-4.0.3&auto=format&fit=crop&w=500&q=80"
                  alt="Carretera"
                  className="w-full h-48 object-cover rounded-lg"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <h2 className="text-4xl font-bold text-gray-900 mb-4">Lo que dicen nuestros clientes</h2>
          <p className="text-gray-600 mb-12">Miles de conductores confían en nosotros cada día</p>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "Excelente servicio. Llegaron en menos de 20 minutos y resolvieron mi problema rápidamente. Muy profesionales."
              </p>
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <p className="font-semibold text-gray-900">María González</p>
                  <p className="text-gray-500 text-sm">Ciudad de México</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "Me quedé sin gasolina en carretera y me ayudaron inmediatamente. El técnico fue muy amable y eficiente."
              </p>
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <p className="font-semibold text-gray-900">Carlos Ruiz</p>
                  <p className="text-gray-500 text-sm">Guadalajara</p>
                </div>
              </div>
            </div>
            
            <div className="bg-white p-8 rounded-lg shadow-lg">
              <div className="flex justify-center mb-4">
                {[...Array(5)].map((_, i) => (
                  <span key={i} className="text-yellow-400 text-xl">★</span>
                ))}
              </div>
              <p className="text-gray-600 mb-6 italic">
                "Servicio 24/7 real. Tuve una emergencia a las 3 AM y respondieron de inmediato. Muy recomendable."
              </p>
              <div className="flex items-center justify-center">
                <div className="w-12 h-12 bg-gray-300 rounded-full mr-4"></div>
                <div>
                  <p className="font-semibold text-gray-900">Ana Martínez</p>
                  <p className="text-gray-500 text-sm">Monterrey</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-blue-600 text-white text-center">
        <div className="max-w-4xl mx-auto px-4">
          <h2 className="text-4xl font-bold mb-4">¿Necesitas ayuda ahora?</h2>
          <p className="text-xl mb-8 text-blue-100">
            No esperes más. Nuestro equipo está listo para asistirte las 24 horas del día.
          </p>
          <button
            onClick={() => setCurrentView('sos')}
            className="bg-white text-blue-600 hover:bg-gray-100 font-bold py-4 px-8 rounded-lg text-lg shadow-lg transform hover:scale-105 transition-all duration-300"
          >
            Solicitar Asistencia Inmediata
          </button>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contacto" className="py-20 bg-black text-white">
        <div className="max-w-7xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
            <div>
              <span className="text-blue-400 font-semibold">CONTACTO</span>
              <h2 className="text-4xl font-bold mt-2 mb-6">Estamos aquí para ayudarte</h2>
              <p className="text-gray-300 mb-8">
                Ponte en contacto con nosotros para cualquier consulta o emergencia. Nuestro equipo de atención al cliente está disponible las 24 horas.
              </p>
              <div className="space-y-4">
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-blue-400 rounded-full mr-4"></span>
                  <span>Teléfono de emergencias: 800-123-4567</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-blue-400 rounded-full mr-4"></span>
                  <span>WhatsApp: +52 55 1234 5678</span>
                </div>
                <div className="flex items-center">
                  <span className="w-3 h-3 bg-blue-400 rounded-full mr-4"></span>
                  <span>Email: ayuda@asistenciavial.mx</span>
                </div>
              </div>
            </div>
            <div className="bg-gray-900 p-8 rounded-lg">
              <iframe
                src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3762.9876543210!2d-99.1332!3d19.4326!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x0%3A0x0!2zMTnCsDI1JzU3LjQiTiA5OcKwMDcnNTkuNSJX!5e0!3m2!1ses!2smx!4v1234567890"
                width="100%"
                height="400"
                style={{ border: 0 }}
                allowFullScreen
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="rounded-lg"
              ></iframe>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-gray-900 text-white py-8">
        <div className="max-w-7xl mx-auto px-4 text-center">
          <p className="text-gray-400">
            © 2025 Asistencia Vial México - Tecnología CO•RA
          </p>
          <p className="text-gray-500 mt-2">
            Emergencias 24/7 • IA Avanzada • Cobertura Nacional
          </p>
        </div>
      </footer>
    </div>
  );
};

export default NewLandingPage;
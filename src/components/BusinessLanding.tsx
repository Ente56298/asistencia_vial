import { useState } from 'react';

export default function BusinessLanding() {
  const [activeService, setActiveService] = useState(0);

  const services = [
    {
      title: 'Desarrollo Web',
      description: 'Sitios web modernos y responsivos',
      icon: '💻',
      features: ['React/Next.js', 'SEO Optimizado', 'Mobile First']
    },
    {
      title: 'Marketing Digital',
      description: 'Estrategias para hacer crecer tu negocio',
      icon: '📈',
      features: ['Google Ads', 'Social Media', 'Analytics']
    },
    {
      title: 'Consultoría',
      description: 'Asesoría especializada para tu empresa',
      icon: '🎯',
      features: ['Estrategia', 'Procesos', 'Tecnología']
    }
  ];

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <header className="fixed w-full z-50 bg-white/95 backdrop-blur-sm shadow-sm">
        <div className="max-w-6xl mx-auto px-4 py-4 flex justify-between items-center">
          <div className="text-2xl font-bold text-gray-900">
            BusinessPro
          </div>
          <nav className="hidden md:flex space-x-8">
            {['Inicio', 'Servicios', 'Nosotros', 'Contacto'].map(item => (
              <a key={item} href="#" className="text-gray-700 hover:text-blue-600 transition-colors">
                {item}
              </a>
            ))}
          </nav>
          <button className="bg-blue-600 text-white px-6 py-2 rounded-full hover:bg-blue-700 transition-colors">
            Contactar
          </button>
        </div>
      </header>

      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 bg-gradient-to-br from-blue-50 to-indigo-100">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            <div>
              <h1 className="text-5xl lg:text-6xl font-bold text-gray-900 mb-6 leading-tight">
                Impulsa tu negocio al
                <span className="text-blue-600"> siguiente nivel</span>
              </h1>
              <p className="text-xl text-gray-600 mb-8">
                Soluciones digitales integrales para empresas que buscan crecer y destacar en el mercado actual
              </p>
              <div className="flex flex-col sm:flex-row gap-4">
                <button className="bg-blue-600 text-white px-8 py-4 rounded-full font-semibold hover:bg-blue-700 transition-colors">
                  Comenzar Proyecto
                </button>
                <button className="border-2 border-gray-300 text-gray-700 px-8 py-4 rounded-full font-semibold hover:border-gray-400 transition-colors">
                  Ver Portfolio
                </button>
              </div>
            </div>
            <div className="relative">
              <div className="bg-white rounded-2xl shadow-2xl p-8 transform rotate-3 hover:rotate-0 transition-transform duration-300">
                <div className="space-y-4">
                  <div className="h-4 bg-gray-200 rounded w-3/4"></div>
                  <div className="h-4 bg-blue-200 rounded w-1/2"></div>
                  <div className="h-32 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg"></div>
                  <div className="flex gap-2">
                    <div className="h-4 bg-green-200 rounded flex-1"></div>
                    <div className="h-4 bg-yellow-200 rounded flex-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Services Section */}
      <section className="py-20 px-4">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl font-bold text-gray-900 mb-4">
              Nuestros Servicios
            </h2>
            <p className="text-xl text-gray-600 max-w-2xl mx-auto">
              Ofrecemos soluciones completas para todas las necesidades de tu empresa
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {services.map((service, index) => (
              <div 
                key={index}
                className={`p-8 rounded-2xl cursor-pointer transition-all duration-300 ${
                  activeService === index 
                    ? 'bg-blue-600 text-white shadow-2xl transform scale-105' 
                    : 'bg-white shadow-lg hover:shadow-xl'
                }`}
                onClick={() => setActiveService(index)}
              >
                <div className="text-4xl mb-4">{service.icon}</div>
                <h3 className="text-2xl font-bold mb-4">{service.title}</h3>
                <p className={`mb-6 ${activeService === index ? 'text-blue-100' : 'text-gray-600'}`}>
                  {service.description}
                </p>
                <ul className="space-y-2">
                  {service.features.map((feature, idx) => (
                    <li key={idx} className={`flex items-center ${activeService === index ? 'text-blue-100' : 'text-gray-500'}`}>
                      <span className="mr-2">✓</span>
                      {feature}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 px-4 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { number: '500+', label: 'Proyectos Completados' },
              { number: '98%', label: 'Clientes Satisfechos' },
              { number: '5+', label: 'Años de Experiencia' },
              { number: '24/7', label: 'Soporte Técnico' }
            ].map((stat, index) => (
              <div key={index}>
                <div className="text-4xl font-bold text-blue-400 mb-2">{stat.number}</div>
                <div className="text-gray-300">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="py-20 px-4 bg-gray-50">
        <div className="max-w-6xl mx-auto">
          <h2 className="text-4xl font-bold text-center text-gray-900 mb-16">
            Lo que dicen nuestros clientes
          </h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                name: 'María González',
                company: 'TechStart',
                text: 'Excelente trabajo, superaron nuestras expectativas en tiempo y calidad.',
                rating: 5
              },
              {
                name: 'Carlos Ruiz',
                company: 'Innovate Co.',
                text: 'Profesionales excepcionales, recomiendo sus servicios al 100%.',
                rating: 5
              },
              {
                name: 'Ana López',
                company: 'Digital Plus',
                text: 'Transformaron completamente nuestra presencia digital.',
                rating: 5
              }
            ].map((testimonial, index) => (
              <div key={index} className="bg-white p-8 rounded-2xl shadow-lg">
                <div className="flex mb-4">
                  {[...Array(testimonial.rating)].map((_, i) => (
                    <span key={i} className="text-yellow-400 text-xl">★</span>
                  ))}
                </div>
                <p className="text-gray-600 mb-6 italic">"{testimonial.text}"</p>
                <div>
                  <div className="font-semibold text-gray-900">{testimonial.name}</div>
                  <div className="text-gray-500">{testimonial.company}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4 bg-blue-600 text-white">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl font-bold mb-6">
            ¿Listo para comenzar tu proyecto?
          </h2>
          <p className="text-xl mb-8 text-blue-100">
            Contáctanos hoy y descubre cómo podemos ayudarte a alcanzar tus objetivos
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center max-w-md mx-auto">
            <input
              type="email"
              placeholder="tu@email.com"
              className="flex-1 px-6 py-4 rounded-full text-gray-900 focus:outline-none focus:ring-4 focus:ring-blue-300"
            />
            <button className="bg-white text-blue-600 px-8 py-4 rounded-full font-semibold hover:bg-gray-100 transition-colors">
              Enviar
            </button>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-gray-900 text-white">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold mb-4">BusinessPro</div>
              <p className="text-gray-400">
                Soluciones digitales para empresas modernas
              </p>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Servicios</h3>
              <div className="space-y-2 text-gray-400">
                <div>Desarrollo Web</div>
                <div>Marketing Digital</div>
                <div>Consultoría</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Empresa</h3>
              <div className="space-y-2 text-gray-400">
                <div>Sobre Nosotros</div>
                <div>Portfolio</div>
                <div>Blog</div>
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-4">Contacto</h3>
              <div className="space-y-2 text-gray-400">
                <div>📧 info@businesspro.com</div>
                <div>📱 +52 55 1234 5678</div>
                <div>📍 CDMX, México</div>
              </div>
            </div>
          </div>
          <div className="border-t border-gray-800 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 BusinessPro. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
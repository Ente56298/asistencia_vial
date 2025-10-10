import { useState } from 'react';

export default function ModernLandingPage() {
  const [email, setEmail] = useState('');
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900">
      {/* Navigation */}
      <nav className="fixed w-full z-50 bg-black/20 backdrop-blur-lg border-b border-white/10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center py-4">
            <div className="text-2xl font-bold text-white">
              🚀 TechCorp
            </div>
            
            {/* Desktop Menu */}
            <div className="hidden md:flex space-x-8">
              {['Inicio', 'Servicios', 'Sobre Nosotros', 'Contacto'].map(item => (
                <a key={item} href="#" className="text-white/80 hover:text-white transition-colors">
                  {item}
                </a>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button 
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="md:hidden text-white"
            >
              {isMenuOpen ? '✕' : '☰'}
            </button>
          </div>

          {/* Mobile Menu */}
          {isMenuOpen && (
            <div className="md:hidden bg-black/40 backdrop-blur-lg rounded-lg mt-2 p-4">
              {['Inicio', 'Servicios', 'Sobre Nosotros', 'Contacto'].map(item => (
                <a key={item} href="#" className="block py-2 text-white/80 hover:text-white">
                  {item}
                </a>
              ))}
            </div>
          )}
        </div>
      </nav>

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-4">
        <div className="max-w-7xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black text-white mb-6 leading-tight">
            Innovación que
            <span className="bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
              {' '}Transforma
            </span>
          </h1>
          
          <p className="text-xl md:text-2xl text-gray-300 mb-8 max-w-3xl mx-auto">
            Soluciones tecnológicas de vanguardia para impulsar tu negocio hacia el futuro digital
          </p>

          <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
            <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-4 px-8 rounded-full transition-all transform hover:scale-105">
              Comenzar Ahora
            </button>
            <button className="border-2 border-white/30 text-white hover:bg-white/10 font-bold py-4 px-8 rounded-full transition-all">
              Ver Demo
            </button>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
            {[
              { number: '10K+', label: 'Clientes Satisfechos' },
              { number: '99.9%', label: 'Uptime Garantizado' },
              { number: '24/7', label: 'Soporte Técnico' },
              { number: '50+', label: 'Países Atendidos' }
            ].map(stat => (
              <div key={stat.label} className="text-center">
                <div className="text-3xl md:text-4xl font-bold text-white mb-2">{stat.number}</div>
                <div className="text-gray-400 text-sm">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 px-4 bg-black/20">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Características Principales
            </h2>
            <p className="text-xl text-gray-300 max-w-2xl mx-auto">
              Tecnología de última generación diseñada para maximizar tu productividad
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {[
              {
                icon: '🚀',
                title: 'Velocidad Extrema',
                description: 'Rendimiento optimizado con tecnología de punta para resultados instantáneos'
              },
              {
                icon: '🛡️',
                title: 'Seguridad Total',
                description: 'Protección avanzada con encriptación de nivel militar y monitoreo 24/7'
              },
              {
                icon: '📊',
                title: 'Analytics Avanzados',
                description: 'Insights profundos con IA para tomar decisiones basadas en datos reales'
              }
            ].map(feature => (
              <div key={feature.title} className="bg-white/5 backdrop-blur-lg rounded-2xl p-8 border border-white/10 hover:bg-white/10 transition-all">
                <div className="text-4xl mb-4">{feature.icon}</div>
                <h3 className="text-2xl font-bold text-white mb-4">{feature.title}</h3>
                <p className="text-gray-300">{feature.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-4">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-6">
            ¿Listo para Transformar tu Negocio?
          </h2>
          <p className="text-xl text-gray-300 mb-8">
            Únete a miles de empresas que ya confían en nuestras soluciones
          </p>

          <div className="bg-white/10 backdrop-blur-lg rounded-2xl p-8 border border-white/20">
            <div className="flex flex-col sm:flex-row gap-4 max-w-md mx-auto">
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="tu@email.com"
                className="flex-1 bg-white/20 border border-white/30 rounded-full px-6 py-3 text-white placeholder-gray-400 focus:outline-none focus:border-blue-400"
              />
              <button className="bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white font-bold py-3 px-8 rounded-full transition-all">
                Empezar Gratis
              </button>
            </div>
            <p className="text-gray-400 text-sm mt-4">
              Sin tarjeta de crédito • Configuración en 2 minutos • Soporte incluido
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-12 px-4 bg-black/40 border-t border-white/10">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            <div>
              <div className="text-2xl font-bold text-white mb-4">🚀 TechCorp</div>
              <p className="text-gray-400">
                Innovación tecnológica para el futuro digital
              </p>
            </div>
            
            {[
              {
                title: 'Producto',
                links: ['Características', 'Precios', 'Integraciones', 'API']
              },
              {
                title: 'Empresa',
                links: ['Sobre Nosotros', 'Carreras', 'Blog', 'Prensa']
              },
              {
                title: 'Soporte',
                links: ['Centro de Ayuda', 'Contacto', 'Estado', 'Comunidad']
              }
            ].map(section => (
              <div key={section.title}>
                <h3 className="text-white font-semibold mb-4">{section.title}</h3>
                <div className="space-y-2">
                  {section.links.map(link => (
                    <a key={link} href="#" className="block text-gray-400 hover:text-white transition-colors">
                      {link}
                    </a>
                  ))}
                </div>
              </div>
            ))}
          </div>
          
          <div className="border-t border-white/10 mt-8 pt-8 text-center text-gray-400">
            <p>&copy; 2025 TechCorp. Todos los derechos reservados.</p>
          </div>
        </div>
      </footer>
    </div>
  );
}
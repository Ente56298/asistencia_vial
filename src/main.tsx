import React from 'react'
import ReactDOM from 'react-dom/client'
import { SpeedInsights } from '@vercel/speed-insights/react'

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 50%, #16213E 100%)',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      color: '#FFFFFF'
    }}>
      {/* Navigation */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: 'rgba(15, 15, 35, 0.95)',
        backdropFilter: 'blur(20px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto', padding: '16px 24px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '48px',
              height: '48px',
              background: 'linear-gradient(135deg, #FF6B35, #F7931E)',
              borderRadius: '12px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '24px',
              boxShadow: '0 8px 32px rgba(255, 107, 53, 0.3)'
            }}>🚗</div>
            <div>
              <h1 style={{ fontSize: '20px', fontWeight: '700', margin: 0, color: '#FFFFFF' }}>Asistencia Vial</h1>
              <p style={{ fontSize: '12px', margin: 0, color: '#94A3B8' }}>México</p>
            </div>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '32px' }}>
            <div style={{ display: 'flex', gap: '24px' }}>
              {['Servicios', 'Talleres', 'Contacto'].map(item => (
                <a key={item} href="#" style={{
                  color: '#94A3B8',
                  textDecoration: 'none',
                  fontSize: '14px',
                  fontWeight: '500',
                  transition: 'color 0.2s'
                }}
                onMouseOver={(e) => e.target.style.color = '#FFFFFF'}
                onMouseOut={(e) => e.target.style.color = '#94A3B8'}
                >{item}</a>
              ))}
            </div>
            <button style={{
              background: 'linear-gradient(135deg, #FF6B35, #F7931E)',
              border: 'none',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              boxShadow: '0 4px 16px rgba(255, 107, 53, 0.3)'
            }}>Iniciar Sesión</button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <section style={{ paddingTop: '120px', paddingBottom: '80px', textAlign: 'center', position: 'relative' }}>
        {/* Background Pattern */}
        <div style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'radial-gradient(circle at 25% 25%, rgba(255, 107, 53, 0.1) 0%, transparent 50%), radial-gradient(circle at 75% 75%, rgba(247, 147, 30, 0.1) 0%, transparent 50%)',
          pointerEvents: 'none'
        }} />
        
        <div style={{ maxWidth: '900px', margin: '0 auto', padding: '0 24px', position: 'relative' }}>
          <div style={{
            display: 'inline-block',
            background: 'rgba(255, 107, 53, 0.1)',
            border: '1px solid rgba(255, 107, 53, 0.2)',
            borderRadius: '24px',
            padding: '8px 16px',
            marginBottom: '32px'
          }}>
            <span style={{ fontSize: '14px', fontWeight: '600', color: '#FF6B35' }}>🚨 Disponible 24/7 en toda México</span>
          </div>
          
          <h1 style={{
            fontSize: '64px',
            fontWeight: '800',
            lineHeight: '1.1',
            marginBottom: '24px',
            background: 'linear-gradient(135deg, #FFFFFF 0%, #94A3B8 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent',
            backgroundClip: 'text'
          }}>Asistencia Vial<br />del Futuro</h1>
          
          <p style={{
            fontSize: '20px',
            lineHeight: '1.6',
            color: '#94A3B8',
            marginBottom: '48px',
            maxWidth: '600px',
            margin: '0 auto 48px'
          }}>Conectamos conductores con talleres verificados usando IA, GPS en tiempo real y una red nacional de servicios de emergencia.</p>
          
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', flexWrap: 'wrap' }}>
            <button style={{
              background: 'linear-gradient(135deg, #FF6B35, #F7931E)',
              border: 'none',
              color: 'white',
              padding: '16px 32px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '700',
              cursor: 'pointer',
              boxShadow: '0 8px 32px rgba(255, 107, 53, 0.4)',
              transition: 'transform 0.2s, box-shadow 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 12px 40px rgba(255, 107, 53, 0.5)'
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 8px 32px rgba(255, 107, 53, 0.4)'
            }}
            >
              🚨 Activar SOS
            </button>
            
            <button style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white',
              padding: '16px 32px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              backdropFilter: 'blur(10px)',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.15)'
              e.target.style.transform = 'translateY(-2px)'
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.1)'
              e.target.style.transform = 'translateY(0)'
            }}
            >
              Ver Demo
            </button>
          </div>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: '80px 24px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '64px' }}>
          <h2 style={{
            fontSize: '40px',
            fontWeight: '700',
            marginBottom: '16px',
            color: '#FFFFFF'
          }}>Servicios Inteligentes</h2>
          <p style={{ fontSize: '18px', color: '#94A3B8', maxWidth: '600px', margin: '0 auto' }}>
            Tecnología de vanguardia para mantener a los conductores seguros en carretera
          </p>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '24px'
        }}>
          {[
            {
              icon: '🛠️',
              title: 'Talleres Verificados',
              desc: 'Red de 2,500+ talleres certificados con técnicos especializados y garantía de servicio',
              color: '#10B981',
              bgColor: 'rgba(16, 185, 129, 0.1)'
            },
            {
              icon: '📍',
              title: 'GPS Inteligente',
              desc: 'Localización precisa con IA que encuentra el servicio más cercano en menos de 30 segundos',
              color: '#3B82F6',
              bgColor: 'rgba(59, 130, 246, 0.1)'
            },
            {
              icon: '🚛',
              title: 'Grúas Express',
              desc: 'Flota de grúas disponible 24/7 con tiempo de respuesta promedio de 15 minutos',
              color: '#8B5CF6',
              bgColor: 'rgba(139, 92, 246, 0.1)'
            },
            {
              icon: '⚡',
              title: 'Respuesta Inmediata',
              desc: 'Sistema automatizado que conecta tu emergencia con el servicio adecuado al instante',
              color: '#F59E0B',
              bgColor: 'rgba(245, 158, 11, 0.1)'
            }
          ].map((feature, i) => (
            <div key={i} style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '32px',
              transition: 'all 0.3s ease',
              cursor: 'pointer',
              position: 'relative',
              overflow: 'hidden'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-8px)'
              e.target.style.boxShadow = `0 20px 60px ${feature.bgColor}`
              e.target.style.borderColor = feature.color
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = 'none'
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.1)'
            }}
            >
              <div style={{
                width: '64px',
                height: '64px',
                background: feature.bgColor,
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '28px',
                marginBottom: '24px',
                border: `1px solid ${feature.color}30`
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontSize: '22px',
                fontWeight: '700',
                marginBottom: '12px',
                color: '#FFFFFF'
              }}>{feature.title}</h3>
              <p style={{
                fontSize: '16px',
                lineHeight: '1.6',
                color: '#94A3B8',
                margin: 0
              }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section */}
      <section style={{
        padding: '80px 24px',
        background: 'rgba(255, 255, 255, 0.02)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '48px'
          }}>
            {[
              { number: '2,500+', label: 'Talleres Verificados' },
              { number: '15min', label: 'Tiempo Respuesta' },
              { number: '24/7', label: 'Disponibilidad' },
              { number: '99.9%', label: 'Confiabilidad' }
            ].map((stat, i) => (
              <div key={i}>
                <div style={{
                  fontSize: '48px',
                  fontWeight: '800',
                  color: '#FF6B35',
                  marginBottom: '8px'
                }}>{stat.number}</div>
                <div style={{
                  fontSize: '16px',
                  color: '#94A3B8',
                  fontWeight: '500'
                }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '60px 24px 40px',
        background: 'rgba(0, 0, 0, 0.2)',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', textAlign: 'center' }}>
          <div style={{ marginBottom: '32px' }}>
            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: '16px', marginBottom: '16px' }}>
              <div style={{
                width: '40px',
                height: '40px',
                background: 'linear-gradient(135deg, #FF6B35, #F7931E)',
                borderRadius: '10px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px'
              }}>🚗</div>
              <span style={{ fontSize: '18px', fontWeight: '700', color: '#FFFFFF' }}>Asistencia Vial México</span>
            </div>
            <p style={{ color: '#64748B', fontSize: '14px', margin: 0 }}>
              © 2025 Asistencia Vial México. Servicio disponible en toda la República Mexicana.
            </p>
          </div>
          
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '32px',
            flexWrap: 'wrap',
            fontSize: '14px',
            color: '#64748B'
          }}>
            <span>✓ Talleres Certificados</span>
            <span>✓ Cobertura Nacional</span>
            <span>✓ Disponible 24/7</span>
            <span>✓ Respuesta Garantizada</span>
          </div>
        </div>
      </footer>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <App />
    <SpeedInsights />
  </>
)
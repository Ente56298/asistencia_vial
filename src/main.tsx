import React from 'react'
import ReactDOM from 'react-dom/client'
import { SpeedInsights } from '@vercel/speed-insights/react'

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
      fontFamily: '-apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif'
    }}>
      {/* Header */}
      <header style={{
        padding: '20px',
        background: 'rgba(255, 255, 255, 0.1)',
        backdropFilter: 'blur(10px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.2)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{ width: '40px', height: '40px', background: '#fff', borderRadius: '8px', display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '20px' }}>🚗</div>
            <h1 style={{ color: 'white', fontSize: '24px', fontWeight: '600', margin: 0 }}>Asistencia Vial México</h1>
          </div>
          <button style={{
            background: 'rgba(255, 255, 255, 0.2)',
            border: '1px solid rgba(255, 255, 255, 0.3)',
            color: 'white',
            padding: '8px 16px',
            borderRadius: '6px',
            cursor: 'pointer'
          }}>Iniciar Sesión</button>
        </div>
      </header>

      {/* Hero Section */}
      <main style={{ padding: '80px 20px', textAlign: 'center' }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: '48px',
            fontWeight: '700',
            color: 'white',
            marginBottom: '24px',
            lineHeight: '1.2'
          }}>Asistencia Vial Inteligente</h2>
          
          <p style={{
            fontSize: '20px',
            color: 'rgba(255, 255, 255, 0.9)',
            marginBottom: '48px',
            lineHeight: '1.6',
            maxWidth: '600px',
            margin: '0 auto 48px'
          }}>Conectamos conductores con talleres verificados, servicios de emergencia y asistencia vial 24/7 en toda la República Mexicana.</p>

          {/* CTA Button */}
          <button style={{
            background: 'linear-gradient(135deg, #ff6b6b, #ee5a24)',
            color: 'white',
            border: 'none',
            padding: '18px 36px',
            fontSize: '18px',
            fontWeight: '600',
            borderRadius: '12px',
            cursor: 'pointer',
            boxShadow: '0 8px 32px rgba(238, 90, 36, 0.3)',
            marginBottom: '64px',
            transition: 'transform 0.2s'
          }}
          onMouseOver={(e) => e.target.style.transform = 'translateY(-2px)'}
          onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
          >🚨 Activar SOS de Emergencia</button>
        </div>

        {/* Services Grid */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '24px',
          maxWidth: '1000px',
          margin: '0 auto'
        }}>
          {[
            { icon: '🔧', title: 'Talleres Verificados', desc: 'Red de talleres certificados con técnicos especializados' },
            { icon: '📍', title: 'Localización GPS', desc: 'Encuentra servicios cercanos con precisión en tiempo real' },
            { icon: '🚛', title: 'Grúas 24/7', desc: 'Servicio de grúa disponible las 24 horas del día' },
            { icon: '⚡', title: 'Respuesta Rápida', desc: 'Tiempo de respuesta promedio de 15 minutos' }
          ].map((service, i) => (
            <div key={i} style={{
              background: 'rgba(255, 255, 255, 0.1)',
              backdropFilter: 'blur(10px)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              borderRadius: '16px',
              padding: '32px 24px',
              textAlign: 'center',
              transition: 'transform 0.2s'
            }}
            onMouseOver={(e) => e.target.style.transform = 'translateY(-4px)'}
            onMouseOut={(e) => e.target.style.transform = 'translateY(0)'}
            >
              <div style={{ fontSize: '48px', marginBottom: '16px' }}>{service.icon}</div>
              <h3 style={{ color: 'white', fontSize: '20px', fontWeight: '600', marginBottom: '12px' }}>{service.title}</h3>
              <p style={{ color: 'rgba(255, 255, 255, 0.8)', fontSize: '16px', lineHeight: '1.5' }}>{service.desc}</p>
            </div>
          ))}
        </div>
      </main>

      {/* Footer */}
      <footer style={{
        background: 'rgba(0, 0, 0, 0.2)',
        padding: '40px 20px',
        textAlign: 'center',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <p style={{ color: 'rgba(255, 255, 255, 0.7)', fontSize: '14px' }}>
            © 2025 Asistencia Vial México. Servicio disponible en toda la República Mexicana.
          </p>
          <div style={{ marginTop: '16px', display: 'flex', justifyContent: 'center', gap: '24px' }}>
            <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px' }}>✓ Talleres Certificados</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px' }}>✓ Cobertura Nacional</span>
            <span style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '12px' }}>✓ Disponible 24/7</span>
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
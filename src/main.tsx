import React from 'react'
import ReactDOM from 'react-dom/client'
import { SpeedInsights } from '@vercel/speed-insights/react'

function App() {
  return (
    <div style={{ 
      minHeight: '100vh', 
      backgroundColor: '#0f172a', 
      color: 'white', 
      display: 'flex', 
      flexDirection: 'column',
      alignItems: 'center', 
      justifyContent: 'center',
      fontFamily: 'system-ui, -apple-system, sans-serif',
      padding: '20px'
    }}>
      <div style={{ textAlign: 'center', maxWidth: '400px' }}>
        <h1 style={{ 
          fontSize: '2.5rem', 
          marginBottom: '0.5rem',
          fontWeight: 'bold'
        }}>🚨 Asistencia Vial México</h1>
        
        <p style={{ 
          fontSize: '1.1rem', 
          marginBottom: '2rem',
          color: '#94a3b8',
          lineHeight: '1.5'
        }}>SOS y asistencia vial en tiempo real para conductores mexicanos</p>
        
        <div style={{ marginBottom: '2rem' }}>
          <button style={{
            backgroundColor: '#dc2626',
            color: 'white',
            padding: '16px 32px',
            fontSize: '1.2rem',
            fontWeight: 'bold',
            border: 'none',
            borderRadius: '12px',
            cursor: 'pointer',
            boxShadow: '0 4px 12px rgba(220, 38, 38, 0.3)',
            transition: 'all 0.2s',
            width: '100%',
            marginBottom: '16px'
          }}
          onMouseOver={(e) => e.target.style.backgroundColor = '#b91c1c'}
          onMouseOut={(e) => e.target.style.backgroundColor = '#dc2626'}
          >
            🚨 SOS EMERGENCIA
          </button>
        </div>
        
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: '1fr 1fr', 
          gap: '12px',
          marginBottom: '2rem'
        }}>
          <button style={{
            backgroundColor: '#1e40af',
            color: 'white',
            padding: '12px 16px',
            fontSize: '0.9rem',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}>
            🔧 Talleres
          </button>
          <button style={{
            backgroundColor: '#059669',
            color: 'white',
            padding: '12px 16px',
            fontSize: '0.9rem',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}>
            🗺️ Mapa
          </button>
          <button style={{
            backgroundColor: '#7c3aed',
            color: 'white',
            padding: '12px 16px',
            fontSize: '0.9rem',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}>
            🚗 Refacciones
          </button>
          <button style={{
            backgroundColor: '#ea580c',
            color: 'white',
            padding: '12px 16px',
            fontSize: '0.9rem',
            border: 'none',
            borderRadius: '8px',
            cursor: 'pointer'
          }}>
            📊 Tráfico
          </button>
        </div>
        
        <div style={{
          fontSize: '0.8rem',
          color: '#64748b',
          marginTop: '2rem'
        }}>
          <p>✅ Disponible 24/7</p>
          <p>✅ GPS automático</p>
          <p>✅ Talleres verificados</p>
        </div>
      </div>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <App />
    <SpeedInsights />
  </>
)
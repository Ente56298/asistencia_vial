import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { SpeedInsights } from '@vercel/speed-insights/react'

function App() {
  const [activeView, setActiveView] = useState('overview')
  
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0A0B0F',
      fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
      color: '#FFFFFF',
      position: 'relative'
    }}>
      {/* Premium Navigation - Ginny Style */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: 'rgba(10, 11, 15, 0.8)',
        backdropFilter: 'blur(40px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.08)'
      }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '20px 32px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '36px',
              height: '36px',
              background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px',
              boxShadow: '0 4px 20px rgba(99, 102, 241, 0.3)'
            }}>🤖</div>
            <div>
              <h1 style={{ fontSize: '20px', fontWeight: '700', margin: 0, letterSpacing: '-0.02em' }}>Ginny AI</h1>
              <p style={{ fontSize: '12px', margin: 0, color: 'rgba(255, 255, 255, 0.6)' }}>Drive Assistant</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '32px' }}>
            {['Overview', 'Analytics', 'Fleet', 'AI Assistant'].map(item => (
              <button key={item} onClick={() => setActiveView(item.toLowerCase())} style={{
                background: 'transparent',
                border: 'none',
                color: activeView === item.toLowerCase() ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)',
                fontSize: '15px',
                fontWeight: '500',
                cursor: 'pointer',
                letterSpacing: '-0.01em',
                transition: 'color 0.3s ease',
                position: 'relative'
              }}>
                {item}
                {activeView === item.toLowerCase() && (
                  <div style={{
                    position: 'absolute',
                    bottom: '-8px',
                    left: '50%',
                    transform: 'translateX(-50%)',
                    width: '4px',
                    height: '4px',
                    background: '#6366F1',
                    borderRadius: '50%'
                  }} />
                )}
              </button>
            ))}
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              background: 'rgba(34, 197, 94, 0.1)',
              border: '1px solid rgba(34, 197, 94, 0.2)',
              borderRadius: '20px',
              padding: '6px 12px',
              fontSize: '12px',
              color: '#22C55E',
              display: 'flex',
              alignItems: 'center',
              gap: '6px'
            }}>
              <div style={{ width: '6px', height: '6px', background: '#22C55E', borderRadius: '50%' }} />
              AI Active
            </div>
            <button style={{
              background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
              border: 'none',
              color: 'white',
              padding: '10px 20px',
              borderRadius: '8px',
              fontSize: '14px',
              fontWeight: '600',
              cursor: 'pointer',
              letterSpacing: '-0.01em'
            }}>Emergency</button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Ginny AI Style */}
      <section style={{ paddingTop: '120px', paddingBottom: '80px', textAlign: 'center', position: 'relative' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 32px' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(99, 102, 241, 0.1)',
            border: '1px solid rgba(99, 102, 241, 0.2)',
            borderRadius: '24px',
            padding: '8px 16px',
            marginBottom: '32px',
            fontSize: '14px',
            fontWeight: '500',
            color: '#6366F1'
          }}>
            🎆 Powered by Advanced AI
          </div>
          
          <h1 style={{
            fontSize: 'clamp(48px, 6vw, 72px)',
            fontWeight: '800',
            lineHeight: '1.1',
            marginBottom: '24px',
            letterSpacing: '-0.03em',
            background: 'linear-gradient(135deg, #FFFFFF 0%, rgba(255, 255, 255, 0.7) 100%)',
            WebkitBackgroundClip: 'text',
            WebkitTextFillColor: 'transparent'
          }}>Your AI-Powered<br />Drive Assistant</h1>
          
          <p style={{
            fontSize: '20px',
            lineHeight: '1.6',
            color: 'rgba(255, 255, 255, 0.7)',
            marginBottom: '40px',
            maxWidth: '600px',
            margin: '0 auto 40px',
            letterSpacing: '-0.01em'
          }}>Intelligent roadside assistance that learns from your driving patterns and predicts potential issues before they happen.</p>
          
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', alignItems: 'center', marginBottom: '60px' }}>
            <button style={{
              background: 'linear-gradient(135deg, #6366F1, #8B5CF6)',
              border: 'none',
              color: 'white',
              padding: '16px 32px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              letterSpacing: '-0.01em',
              transition: 'all 0.3s ease',
              boxShadow: '0 8px 32px rgba(99, 102, 241, 0.3)'
            }}>
              Start AI Assistant
            </button>
            
            <button style={{
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'rgba(255, 255, 255, 0.9)',
              padding: '16px 32px',
              borderRadius: '12px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              letterSpacing: '-0.01em',
              transition: 'all 0.3s ease'
            }}>
              Watch Demo
            </button>
          </div>
          
          {/* AI Stats Cards */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px',
            maxWidth: '800px',
            margin: '0 auto'
          }}>
            {[
              { label: 'AI Accuracy', value: '99.2%', icon: '🧠' },
              { label: 'Response Time', value: '<30s', icon: '⚡' },
              { label: 'Issues Prevented', value: '15K+', icon: '🛡️' },
              { label: 'Happy Drivers', value: '50K+', icon: '🚗' }
            ].map((stat, i) => (
              <div key={i} style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '16px',
                padding: '24px',
                textAlign: 'center',
                transition: 'all 0.3s ease'
              }}>
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>{stat.icon}</div>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#FFFFFF', marginBottom: '4px' }}>{stat.value}</div>
                <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* AI Features Grid */}
      <section style={{ padding: '80px 32px', maxWidth: '1600px', margin: '0 auto' }}>
        <div style={{ textAlign: 'center', marginBottom: '60px' }}>
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: '700',
            marginBottom: '16px',
            letterSpacing: '-0.02em'
          }}>Intelligent Features</h2>
          <p style={{ fontSize: '18px', color: 'rgba(255, 255, 255, 0.7)', maxWidth: '600px', margin: '0 auto' }}>
            Advanced AI capabilities designed to keep you safe and informed on every journey
          </p>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))',
          gap: '24px'
        }}>
          {[
            {
              title: 'Predictive Maintenance',
              desc: 'AI analyzes your vehicle data to predict maintenance needs before breakdowns occur',
              icon: '🔧',
              gradient: 'linear-gradient(135deg, #6366F1, #8B5CF6)'
            },
            {
              title: 'Smart Route Optimization',
              desc: 'Real-time traffic analysis with alternative route suggestions to avoid congestion',
              icon: '🗺️',
              gradient: 'linear-gradient(135deg, #10B981, #059669)'
            },
            {
              title: 'Emergency Detection',
              desc: 'Automatic crash detection with instant emergency service dispatch and location sharing',
              icon: '🚨',
              gradient: 'linear-gradient(135deg, #EF4444, #DC2626)'
            }
          ].map((feature, i) => (
            <div key={i} style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '32px',
              transition: 'all 0.4s ease',
              cursor: 'pointer'
            }}>
              <div style={{
                width: '60px',
                height: '60px',
                background: feature.gradient,
                borderRadius: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '24px',
                marginBottom: '20px'
              }}>
                {feature.icon}
              </div>
              <h3 style={{
                fontSize: '20px',
                fontWeight: '600',
                marginBottom: '12px',
                color: '#FFFFFF'
              }}>{feature.title}</h3>
              <p style={{
                fontSize: '15px',
                lineHeight: '1.6',
                color: 'rgba(255, 255, 255, 0.7)',
                margin: 0
              }}>{feature.desc}</p>
            </div>
          ))}
        </div>
      </section>

      <style>{`
        @keyframes pulse {
          0%, 100% { opacity: 1; transform: scale(1); }
          50% { opacity: 0.7; transform: scale(1.1); }
        }
      `}</style>
    </div>
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <>
    <App />
    <SpeedInsights />
  </>
)
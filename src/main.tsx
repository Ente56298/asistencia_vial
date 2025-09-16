import React from 'react'
import ReactDOM from 'react-dom/client'
import { SpeedInsights } from '@vercel/speed-insights/react'

function App() {
  return (
    <div style={{
      minHeight: '100vh',
      background: '#0A0A0A',
      fontFamily: '"SF Pro Display", -apple-system, BlinkMacSystemFont, sans-serif',
      color: '#FFFFFF',
      overflow: 'hidden'
    }}>
      {/* Navigation - Halo Lab Style */}
      <nav style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        background: 'rgba(10, 10, 10, 0.8)',
        backdropFilter: 'blur(40px)',
        borderBottom: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto', padding: '20px 40px', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: '#FFFFFF',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px'
            }}>🚗</div>
            <span style={{ fontSize: '18px', fontWeight: '600', letterSpacing: '-0.02em' }}>Asistencia Vial</span>
          </div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '40px' }}>
            <div style={{ display: 'flex', gap: '32px' }}>
              {['Services', 'About', 'Contact'].map(item => (
                <a key={item} href="#" style={{
                  color: 'rgba(255, 255, 255, 0.6)',
                  textDecoration: 'none',
                  fontSize: '15px',
                  fontWeight: '400',
                  letterSpacing: '-0.01em',
                  transition: 'color 0.3s ease'
                }}
                onMouseOver={(e) => e.target.style.color = '#FFFFFF'}
                onMouseOut={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}
                >{item}</a>
              ))}
            </div>
            <button style={{
              background: '#FFFFFF',
              border: 'none',
              color: '#000000',
              padding: '12px 24px',
              borderRadius: '6px',
              fontSize: '15px',
              fontWeight: '500',
              cursor: 'pointer',
              letterSpacing: '-0.01em',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.9)'
              e.target.style.transform = 'translateY(-1px)'
            }}
            onMouseOut={(e) => {
              e.target.style.background = '#FFFFFF'
              e.target.style.transform = 'translateY(0)'
            }}
            >Get Started</button>
          </div>
        </div>
      </nav>

      {/* Hero Section - Halo Lab Style */}
      <section style={{ 
        paddingTop: '160px', 
        paddingBottom: '120px', 
        textAlign: 'center', 
        position: 'relative',
        background: 'radial-gradient(ellipse at center, rgba(255, 255, 255, 0.02) 0%, transparent 70%)'
      }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '0 40px', position: 'relative' }}>
          <div style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '20px',
            padding: '6px 16px',
            marginBottom: '40px',
            fontSize: '13px',
            fontWeight: '500',
            color: 'rgba(255, 255, 255, 0.8)',
            letterSpacing: '-0.01em'
          }}>
            <div style={{ width: '6px', height: '6px', background: '#00FF88', borderRadius: '50%' }} />
            Available 24/7 across Mexico
          </div>
          
          <h1 style={{
            fontSize: 'clamp(48px, 8vw, 96px)',
            fontWeight: '700',
            lineHeight: '0.95',
            marginBottom: '32px',
            letterSpacing: '-0.04em',
            color: '#FFFFFF'
          }}>Emergency<br />Roadside<br />Assistance</h1>
          
          <p style={{
            fontSize: '18px',
            lineHeight: '1.6',
            color: 'rgba(255, 255, 255, 0.6)',
            marginBottom: '56px',
            maxWidth: '520px',
            margin: '0 auto 56px',
            letterSpacing: '-0.01em',
            fontWeight: '400'
          }}>AI-powered roadside assistance connecting drivers with verified mechanics and emergency services across Mexico.</p>
          
          <div style={{ display: 'flex', gap: '16px', justifyContent: 'center', alignItems: 'center' }}>
            <button style={{
              background: '#FFFFFF',
              border: 'none',
              color: '#000000',
              padding: '16px 32px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '600',
              cursor: 'pointer',
              letterSpacing: '-0.01em',
              transition: 'all 0.3s ease',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 8px 32px rgba(255, 255, 255, 0.2)'
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = 'none'
            }}
            >
              Emergency SOS
              <span style={{ fontSize: '12px' }}>→</span>
            </button>
            
            <button style={{
              background: 'transparent',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'rgba(255, 255, 255, 0.8)',
              padding: '16px 32px',
              borderRadius: '8px',
              fontSize: '16px',
              fontWeight: '500',
              cursor: 'pointer',
              letterSpacing: '-0.01em',
              transition: 'all 0.3s ease'
            }}
            onMouseOver={(e) => {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.4)'
              e.target.style.color = '#FFFFFF'
              e.target.style.transform = 'translateY(-2px)'
            }}
            onMouseOut={(e) => {
              e.target.style.borderColor = 'rgba(255, 255, 255, 0.2)'
              e.target.style.color = 'rgba(255, 255, 255, 0.8)'
              e.target.style.transform = 'translateY(0)'
            }}
            >
              Watch Demo
            </button>
          </div>
        </div>
      </section>

      {/* Services Grid - Halo Lab Style */}
      <section style={{ padding: '120px 40px', maxWidth: '1600px', margin: '0 auto' }}>
        <div style={{ marginBottom: '80px' }}>
          <h2 style={{
            fontSize: 'clamp(32px, 5vw, 48px)',
            fontWeight: '700',
            marginBottom: '24px',
            color: '#FFFFFF',
            letterSpacing: '-0.03em',
            lineHeight: '1.1'
          }}>Our Services</h2>
          <p style={{ 
            fontSize: '18px', 
            color: 'rgba(255, 255, 255, 0.6)', 
            maxWidth: '480px',
            letterSpacing: '-0.01em',
            lineHeight: '1.6'
          }}>
            Advanced technology keeping drivers safe on the road
          </p>
        </div>
        
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          gap: '1px',
          background: 'rgba(255, 255, 255, 0.05)',
          borderRadius: '12px',
          overflow: 'hidden'
        }}>
          {[
            {
              title: 'Verified Mechanics',
              desc: 'Network of 2,500+ certified workshops with specialized technicians',
              number: '01'
            },
            {
              title: 'Smart GPS',
              desc: 'AI-powered location services finding nearest help in under 30 seconds',
              number: '02'
            },
            {
              title: 'Express Towing',
              desc: '24/7 towing fleet with average 15-minute response time',
              number: '03'
            },
            {
              title: 'Instant Response',
              desc: 'Automated system connecting emergencies with appropriate services',
              number: '04'
            }
          ].map((service, i) => (
            <div key={i} style={{
              background: '#0A0A0A',
              padding: '48px 40px',
              transition: 'all 0.4s ease',
              cursor: 'pointer',
              position: 'relative',
              borderRight: i % 2 === 0 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none',
              borderBottom: i < 2 ? '1px solid rgba(255, 255, 255, 0.05)' : 'none'
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.02)'
            }}
            onMouseOut={(e) => {
              e.target.style.background = '#0A0A0A'
            }}
            >
              <div style={{
                fontSize: '14px',
                color: 'rgba(255, 255, 255, 0.4)',
                marginBottom: '24px',
                fontWeight: '500',
                letterSpacing: '0.1em'
              }}>{service.number}</div>
              
              <h3 style={{
                fontSize: '24px',
                fontWeight: '600',
                marginBottom: '16px',
                color: '#FFFFFF',
                letterSpacing: '-0.02em'
              }}>{service.title}</h3>
              
              <p style={{
                fontSize: '16px',
                lineHeight: '1.6',
                color: 'rgba(255, 255, 255, 0.6)',
                margin: 0,
                letterSpacing: '-0.01em'
              }}>{service.desc}</p>
              
              <div style={{
                position: 'absolute',
                bottom: '40px',
                right: '40px',
                width: '24px',
                height: '24px',
                border: '1px solid rgba(255, 255, 255, 0.2)',
                borderRadius: '50%',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '12px',
                color: 'rgba(255, 255, 255, 0.6)',
                transition: 'all 0.3s ease'
              }}>→</div>
            </div>
          ))}
        </div>
      </section>

      {/* Stats Section - Halo Lab Style */}
      <section style={{
        padding: '120px 40px',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(4, 1fr)',
            gap: '1px',
            background: 'rgba(255, 255, 255, 0.05)',
            borderRadius: '12px',
            overflow: 'hidden'
          }}>
            {[
              { number: '2,500+', label: 'Verified Mechanics' },
              { number: '15min', label: 'Response Time' },
              { number: '24/7', label: 'Availability' },
              { number: '99.9%', label: 'Reliability' }
            ].map((stat, i) => (
              <div key={i} style={{
                background: '#0A0A0A',
                padding: '60px 40px',
                textAlign: 'center',
                transition: 'background 0.3s ease',
                cursor: 'pointer'
              }}
              onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.02)'}
              onMouseOut={(e) => e.target.style.background = '#0A0A0A'}
              >
                <div style={{
                  fontSize: 'clamp(32px, 4vw, 48px)',
                  fontWeight: '700',
                  color: '#FFFFFF',
                  marginBottom: '12px',
                  letterSpacing: '-0.02em'
                }}>{stat.number}</div>
                <div style={{
                  fontSize: '14px',
                  color: 'rgba(255, 255, 255, 0.6)',
                  fontWeight: '500',
                  letterSpacing: '-0.01em'
                }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Footer - Halo Lab Style */}
      <footer style={{
        padding: '80px 40px 40px',
        borderTop: '1px solid rgba(255, 255, 255, 0.05)'
      }}>
        <div style={{ maxWidth: '1600px', margin: '0 auto' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '60px', flexWrap: 'wrap', gap: '40px' }}>
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '16px' }}>
                <div style={{
                  width: '32px',
                  height: '32px',
                  background: '#FFFFFF',
                  borderRadius: '6px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '16px'
                }}>🚗</div>
                <span style={{ fontSize: '18px', fontWeight: '600', letterSpacing: '-0.02em' }}>Asistencia Vial</span>
              </div>
              <p style={{ color: 'rgba(255, 255, 255, 0.6)', fontSize: '15px', margin: 0, letterSpacing: '-0.01em', maxWidth: '280px' }}>
                Emergency roadside assistance powered by AI technology across Mexico.
              </p>
            </div>
            
            <div style={{ display: 'flex', gap: '80px', flexWrap: 'wrap' }}>
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px', letterSpacing: '-0.01em' }}>Services</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {['Emergency SOS', 'Towing Service', 'Mechanic Network', 'GPS Tracking'].map(item => (
                    <a key={item} href="#" style={{
                      color: 'rgba(255, 255, 255, 0.6)',
                      textDecoration: 'none',
                      fontSize: '14px',
                      letterSpacing: '-0.01em',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseOver={(e) => e.target.style.color = '#FFFFFF'}
                    onMouseOut={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}
                    >{item}</a>
                  ))}
                </div>
              </div>
              
              <div>
                <h4 style={{ fontSize: '14px', fontWeight: '600', color: '#FFFFFF', marginBottom: '16px', letterSpacing: '-0.01em' }}>Company</h4>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
                  {['About', 'Careers', 'Contact', 'Privacy'].map(item => (
                    <a key={item} href="#" style={{
                      color: 'rgba(255, 255, 255, 0.6)',
                      textDecoration: 'none',
                      fontSize: '14px',
                      letterSpacing: '-0.01em',
                      transition: 'color 0.3s ease'
                    }}
                    onMouseOver={(e) => e.target.style.color = '#FFFFFF'}
                    onMouseOut={(e) => e.target.style.color = 'rgba(255, 255, 255, 0.6)'}
                    >{item}</a>
                  ))}
                </div>
              </div>
            </div>
          </div>
          
          <div style={{
            paddingTop: '32px',
            borderTop: '1px solid rgba(255, 255, 255, 0.05)',
            display: 'flex',
            justifyContent: 'space-between',
            alignItems: 'center',
            flexWrap: 'wrap',
            gap: '20px'
          }}>
            <p style={{ color: 'rgba(255, 255, 255, 0.4)', fontSize: '14px', margin: 0, letterSpacing: '-0.01em' }}>
              © 2025 Asistencia Vial. Available across Mexico.
            </p>
            <div style={{ display: 'flex', gap: '24px', fontSize: '14px', color: 'rgba(255, 255, 255, 0.4)' }}>
              <span>24/7 Service</span>
              <span>Verified Network</span>
              <span>AI-Powered</span>
            </div>
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
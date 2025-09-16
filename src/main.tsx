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
              }}
              onMouseOver={(e) => e.target.style.color = '#FFFFFF'}
              onMouseOut={(e) => e.target.style.color = activeView === item.toLowerCase() ? '#FFFFFF' : 'rgba(255, 255, 255, 0.6)'}
              >
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
            }}
            onMouseOver={(e) => {
              e.target.style.transform = 'translateY(-2px)'
              e.target.style.boxShadow = '0 12px 40px rgba(99, 102, 241, 0.4)'
            }}
            onMouseOut={(e) => {
              e.target.style.transform = 'translateY(0)'
              e.target.style.boxShadow = '0 8px 32px rgba(99, 102, 241, 0.3)'
            }}
            >
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
              }}
              onMouseOver={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.08)'
                e.target.style.transform = 'translateY(-4px)'
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.05)'
                e.target.style.transform = 'translateY(0)'
              }}
              >
                <div style={{ fontSize: '24px', marginBottom: '8px' }}>{stat.icon}</div>
                <div style={{ fontSize: '24px', fontWeight: '700', color: '#FFFFFF', marginBottom: '4px' }}>{stat.value}</div>
                <div style={{ fontSize: '14px', color: 'rgba(255, 255, 255, 0.6)' }}>{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* AI Features Grid - Park Guard + Avitrace Style */}
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
          gap: '24px',
          marginBottom: '60px'
        }}>
          {[
            {
              title: 'Predictive Maintenance',
              desc: 'AI analyzes your vehicle data to predict maintenance needs before breakdowns occur',
              icon: '🔧',
              color: '#6366F1',
              gradient: 'linear-gradient(135deg, #6366F1, #8B5CF6)'
            },
            {
              title: 'Smart Route Optimization',
              desc: 'Real-time traffic analysis with alternative route suggestions to avoid congestion',
              icon: '🗺️',
              color: '#10B981',
              gradient: 'linear-gradient(135deg, #10B981, #059669)'
            },
            {
              title: 'Emergency Detection',
              desc: 'Automatic crash detection with instant emergency service dispatch and location sharing',
              icon: '🚨',
              color: '#EF4444',
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
            }}
            onMouseOver={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.08)'
              e.target.style.transform = 'translateY(-8px)'
            }}
            onMouseOut={(e) => {
              e.target.style.background = 'rgba(255, 255, 255, 0.05)'
              e.target.style.transform = 'translateY(0)'
            }}
            >
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
      
      {/* Main Dashboard Grid */}
      <main style={{ padding: '0 32px', maxWidth: '1600px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '2fr 1fr',
          gap: '24px',
          marginBottom: '32px'
        }}>
            
            {/* Live Map */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '24px',
              minHeight: '400px'
            }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
                <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>Live Fleet Tracking</h2>
                <div style={{ display: 'flex', gap: '8px' }}>
                  <div style={{ width: '8px', height: '8px', background: '#00FF88', borderRadius: '50%' }} />
                  <span style={{ fontSize: '12px', color: '#94A3B8' }}>Real-time</span>
                </div>
              </div>
              <div style={{
                width: '100%',
                height: '320px',
                background: 'linear-gradient(135deg, #667eea 0%, #764ba2 100%)',
                borderRadius: '12px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                position: 'relative',
                overflow: 'hidden'
              }}>
                <div style={{ fontSize: '48px', opacity: 0.3 }}>🗺️</div>
                {/* Simulated vehicle dots */}
                {[...Array(8)].map((_, i) => (
                  <div key={i} style={{
                    position: 'absolute',
                    width: '8px',
                    height: '8px',
                    background: i % 3 === 0 ? '#FF6B6B' : '#00FF88',
                    borderRadius: '50%',
                    top: `${20 + Math.random() * 60}%`,
                    left: `${20 + Math.random() * 60}%`,
                    animation: `pulse 2s infinite ${i * 0.3}s`
                  }} />))}
              </div>
            </div>
            
            {/* Emergency Panel */}
            <div style={{
              background: 'rgba(255, 255, 255, 0.05)',
              border: '1px solid rgba(255, 255, 255, 0.1)',
              borderRadius: '16px',
              padding: '24px'
            }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Emergency Control</h2>
              
              <button style={{
                width: '100%',
                background: 'linear-gradient(135deg, #FF6B6B, #FF8E53)',
                border: 'none',
                color: 'white',
                padding: '20px',
                borderRadius: '12px',
                fontSize: '18px',
                fontWeight: '700',
                cursor: 'pointer',
                marginBottom: '16px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                gap: '12px',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.transform = 'scale(1.02)'
                e.target.style.boxShadow = '0 8px 32px rgba(255, 107, 107, 0.4)'
              }}
              onMouseOut={(e) => {
                e.target.style.transform = 'scale(1)'
                e.target.style.boxShadow = 'none'
              }}
              >
                🚨 EMERGENCY SOS
              </button>
              
              <div style={{ marginBottom: '20px' }}>
                <h3 style={{ fontSize: '14px', color: '#94A3B8', marginBottom: '12px' }}>Quick Actions</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {['Find Mechanic', 'Request Towing', 'Traffic Report'].map(action => (
                    <button key={action} style={{
                      background: 'rgba(255, 255, 255, 0.1)',
                      border: '1px solid rgba(255, 255, 255, 0.2)',
                      color: 'white',
                      padding: '12px 16px',
                      borderRadius: '8px',
                      fontSize: '14px',
                      cursor: 'pointer',
                      textAlign: 'left',
                      transition: 'all 0.2s'
                    }}
                    onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.15)'}
                    onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
                    >{action}</button>
                  ))}
                </div>
              </div>
              
              <div>
                <h3 style={{ fontSize: '14px', color: '#94A3B8', marginBottom: '12px' }}>System Status</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {[
                    { name: 'GPS Network', status: 'Online', color: '#00FF88' },
                    { name: 'Emergency Line', status: 'Active', color: '#00FF88' },
                    { name: 'Fleet Status', status: 'Monitoring', color: '#4ECDC4' }
                  ].map(item => (
                    <div key={item.name} style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <span style={{ fontSize: '13px', color: '#94A3B8' }}>{item.name}</span>
                      <div style={{ display: 'flex', alignItems: 'center', gap: '6px' }}>
                        <div style={{ width: '6px', height: '6px', background: item.color, borderRadius: '50%' }} />
                        <span style={{ fontSize: '12px', color: item.color }}>{item.status}</span>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>
      </main>

      {/* Analytics Dashboard Section */}
      <section style={{ padding: '0 24px 40px', maxWidth: '1400px', margin: '0 auto' }}>
        
        {/* Recent Activity & Fleet Status */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px',
          marginBottom: '32px'
        }}>
          
          {/* Recent Activity */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '24px'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Recent Activity</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { type: 'SOS', location: 'Mexico City', time: '2 min ago', status: 'active', color: '#FF6B6B' },
                { type: 'Towing', location: 'Guadalajara', time: '15 min ago', status: 'completed', color: '#00FF88' },
                { type: 'Mechanic', location: 'Monterrey', time: '32 min ago', status: 'in-progress', color: '#4ECDC4' },
                { type: 'Traffic', location: 'Puebla', time: '1 hr ago', status: 'resolved', color: '#45B7D1' }
              ].map((activity, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '12px',
                  padding: '12px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '8px',
                  border: `1px solid ${activity.color}20`
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    background: activity.color,
                    borderRadius: '50%'
                  }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: '14px', fontWeight: '500', color: 'white' }}>{activity.type} Request</div>
                    <div style={{ fontSize: '12px', color: '#94A3B8' }}>{activity.location} • {activity.time}</div>
                  </div>
                  <div style={{
                    background: `${activity.color}20`,
                    color: activity.color,
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '11px',
                    fontWeight: '600',
                    textTransform: 'uppercase'
                  }}>{activity.status}</div>
                </div>
              ))}
            </div>
          </div>
          
          {/* Fleet Status */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '24px'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Fleet Status</h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {[
                { name: 'Tow Trucks', total: 45, active: 32, color: '#667eea' },
                { name: 'Mechanics', total: 128, active: 89, color: '#764ba2' },
                { name: 'Emergency Units', total: 24, active: 18, color: '#FF6B6B' },
                { name: 'Support Vehicles', total: 67, active: 45, color: '#4ECDC4' }
              ].map((fleet, i) => (
                <div key={i} style={{
                  padding: '16px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '8px',
                  border: `1px solid ${fleet.color}20`
                }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
                    <span style={{ fontSize: '14px', fontWeight: '500' }}>{fleet.name}</span>
                    <span style={{ fontSize: '12px', color: '#94A3B8' }}>{fleet.active}/{fleet.total}</span>
                  </div>
                  <div style={{ width: '100%', height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                    <div style={{
                      width: `${(fleet.active / fleet.total) * 100}%`,
                      height: '100%',
                      background: fleet.color,
                      borderRadius: '3px',
                      transition: 'width 0.3s ease'
                    }} />
                  </div>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: '8px' }}>
                    <span style={{ fontSize: '12px', color: fleet.color }}>{fleet.active} Active</span>
                    <span style={{ fontSize: '12px', color: '#94A3B8' }}>{fleet.total - fleet.active} Standby</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
        
        {/* Performance Metrics */}
        <div style={{
          background: 'rgba(255, 255, 255, 0.05)',
          border: '1px solid rgba(255, 255, 255, 0.1)',
          borderRadius: '16px',
          padding: '24px'
        }}>
          <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>Performance Metrics</h2>
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
            gap: '20px'
          }}>
            {[
              { metric: 'Avg Response Time', value: '12.5 min', target: '15 min', progress: 85, color: '#00FF88' },
              { metric: 'Customer Satisfaction', value: '4.8/5', target: '4.5/5', progress: 96, color: '#45B7D1' },
              { metric: 'Fleet Utilization', value: '78%', target: '75%', progress: 78, color: '#667eea' },
              { metric: 'Emergency Resolution', value: '94%', target: '90%', progress: 94, color: '#4ECDC4' }
            ].map((metric, i) => (
              <div key={i} style={{
                textAlign: 'center',
                padding: '20px',
                background: 'rgba(255, 255, 255, 0.03)',
                borderRadius: '12px'
              }}>
                <div style={{ fontSize: '24px', fontWeight: '700', color: metric.color, marginBottom: '8px' }}>{metric.value}</div>
                <div style={{ fontSize: '14px', color: '#94A3B8', marginBottom: '12px' }}>{metric.metric}</div>
                <div style={{ width: '100%', height: '4px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: `${metric.progress}%`, height: '100%', background: metric.color, borderRadius: '2px' }} />
                </div>
                <div style={{ fontSize: '12px', color: '#94A3B8', marginTop: '8px' }}>Target: {metric.target}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* IoT Devices & Alerts Section */}
      <section style={{ padding: '0 24px 40px', maxWidth: '1400px', margin: '0 auto' }}>
        <div style={{
          display: 'grid',
          gridTemplateColumns: '1fr 1fr',
          gap: '24px'
        }}>
          
          {/* IoT Device Status */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '24px'
          }}>
            <h2 style={{ fontSize: '18px', fontWeight: '600', marginBottom: '20px' }}>IoT Device Network</h2>
            <div style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(3, 1fr)',
              gap: '16px',
              marginBottom: '20px'
            }}>
              {[
                { name: 'GPS Trackers', count: 2847, status: 'online', color: '#00FF88' },
                { name: 'Emergency Buttons', count: 1256, status: 'active', color: '#4ECDC4' },
                { name: 'Vehicle Sensors', count: 3421, status: 'monitoring', color: '#45B7D1' }
              ].map((device, i) => (
                <div key={i} style={{
                  textAlign: 'center',
                  padding: '16px',
                  background: 'rgba(255, 255, 255, 0.03)',
                  borderRadius: '8px',
                  border: `1px solid ${device.color}20`
                }}>
                  <div style={{ fontSize: '20px', fontWeight: '700', color: device.color, marginBottom: '4px' }}>{device.count.toLocaleString()}</div>
                  <div style={{ fontSize: '12px', color: '#94A3B8', marginBottom: '8px' }}>{device.name}</div>
                  <div style={{
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '4px'
                  }}>
                    <div style={{ width: '6px', height: '6px', background: device.color, borderRadius: '50%' }} />
                    <span style={{ fontSize: '11px', color: device.color, textTransform: 'uppercase' }}>{device.status}</span>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Network Health */}
            <div style={{ marginTop: '20px' }}>
              <h3 style={{ fontSize: '14px', color: '#94A3B8', marginBottom: '12px' }}>Network Health</h3>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', color: 'white', minWidth: '80px' }}>Connectivity</span>
                <div style={{ flex: 1, height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '94%', height: '100%', background: '#00FF88', borderRadius: '3px' }} />
                </div>
                <span style={{ fontSize: '12px', color: '#00FF88' }}>94%</span>
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '12px', marginBottom: '8px' }}>
                <span style={{ fontSize: '13px', color: 'white', minWidth: '80px' }}>Latency</span>
                <div style={{ flex: 1, height: '6px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '3px', overflow: 'hidden' }}>
                  <div style={{ width: '87%', height: '100%', background: '#4ECDC4', borderRadius: '3px' }} />
                </div>
                <span style={{ fontSize: '12px', color: '#4ECDC4' }}>87ms</span>
              </div>
            </div>
          </div>
          
          {/* System Alerts */}
          <div style={{
            background: 'rgba(255, 255, 255, 0.05)',
            border: '1px solid rgba(255, 255, 255, 0.1)',
            borderRadius: '16px',
            padding: '24px'
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '20px' }}>
              <h2 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>System Alerts</h2>
              <div style={{
                background: 'rgba(255, 107, 107, 0.1)',
                color: '#FF6B6B',
                padding: '4px 8px',
                borderRadius: '6px',
                fontSize: '12px',
                fontWeight: '600'
              }}>3 Active</div>
            </div>
            
            <div style={{ display: 'flex', flexDirection: 'column', gap: '12px' }}>
              {[
                { type: 'Critical', message: 'GPS signal lost - Vehicle #2847', time: '2 min ago', color: '#FF6B6B' },
                { type: 'Warning', message: 'High response time in Zone 3', time: '15 min ago', color: '#FFB800' },
                { type: 'Info', message: 'Maintenance scheduled for Fleet A', time: '1 hr ago', color: '#4ECDC4' },
                { type: 'Resolved', message: 'Network connectivity restored', time: '2 hr ago', color: '#00FF88' }
              ].map((alert, i) => (
                <div key={i} style={{
                  display: 'flex',
                  alignItems: 'start',
                  gap: '12px',
                  padding: '12px',
                  background: i < 3 ? 'rgba(255, 255, 255, 0.03)' : 'rgba(255, 255, 255, 0.01)',
                  borderRadius: '8px',
                  border: `1px solid ${alert.color}20`,
                  opacity: i < 3 ? 1 : 0.6
                }}>
                  <div style={{
                    width: '8px',
                    height: '8px',
                    background: alert.color,
                    borderRadius: '50%',
                    marginTop: '6px',
                    flexShrink: 0
                  }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '4px' }}>
                      <span style={{
                        fontSize: '11px',
                        color: alert.color,
                        fontWeight: '600',
                        textTransform: 'uppercase'
                      }}>{alert.type}</span>
                      <span style={{ fontSize: '11px', color: '#94A3B8' }}>{alert.time}</span>
                    </div>
                    <div style={{ fontSize: '13px', color: 'white', lineHeight: '1.4' }}>{alert.message}</div>
                  </div>
                </div>
              ))}
            </div>
            
            <button style={{
              width: '100%',
              background: 'rgba(255, 255, 255, 0.1)',
              border: '1px solid rgba(255, 255, 255, 0.2)',
              color: 'white',
              padding: '12px',
              borderRadius: '8px',
              fontSize: '14px',
              cursor: 'pointer',
              marginTop: '16px',
              transition: 'all 0.2s'
            }}
            onMouseOver={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.15)'}
            onMouseOut={(e) => e.target.style.background = 'rgba(255, 255, 255, 0.1)'}
            >View All Alerts</button>
          </div>
        </div>
      </section>

      {/* Dashboard Footer */}
      <footer style={{
        padding: '40px 24px',
        borderTop: '1px solid rgba(255, 255, 255, 0.1)',
        maxWidth: '1400px',
        margin: '0 auto'
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: '20px' }}>
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              width: '32px',
              height: '32px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              borderRadius: '6px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '16px'
            }}>🚗</div>
            <div>
              <div style={{ fontSize: '16px', fontWeight: '600' }}>TechX Roadside Dashboard</div>
              <div style={{ fontSize: '12px', color: '#94A3B8' }}>IoT Emergency Response System</div>
            </div>
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '24px' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <div style={{ width: '8px', height: '8px', background: '#00FF88', borderRadius: '50%' }} />
              <span style={{ fontSize: '14px', color: '#94A3B8' }}>System Operational</span>
            </div>
            <div style={{ fontSize: '14px', color: '#94A3B8' }}>Last updated: 2 min ago</div>
            <div style={{ fontSize: '14px', color: '#94A3B8' }}>© 2025 TechX IoT Solutions</div>
          </div>
        </div>
      </footer>
      
      {/* CSS Animations */}
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
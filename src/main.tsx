import React, { useState } from 'react'
import ReactDOM from 'react-dom/client'
import { SpeedInsights } from '@vercel/speed-insights/react'

function App() {
  const [activeTab, setActiveTab] = useState('dashboard')
  
  return (
    <div style={{
      minHeight: '100vh',
      background: 'linear-gradient(135deg, #0F0F23 0%, #1A1A2E 100%)',
      fontFamily: 'Inter, -apple-system, BlinkMacSystemFont, sans-serif',
      color: '#FFFFFF'
    }}>
      {/* Dashboard Navigation */}
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
              width: '40px',
              height: '40px',
              background: 'linear-gradient(135deg, #667eea, #764ba2)',
              borderRadius: '8px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '18px'
            }}>🚗</div>
            <div>
              <h1 style={{ fontSize: '18px', fontWeight: '600', margin: 0 }}>TechX Roadside</h1>
              <p style={{ fontSize: '12px', margin: 0, color: '#94A3B8' }}>IoT Dashboard</p>
            </div>
          </div>
          
          <div style={{ display: 'flex', gap: '8px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '8px', padding: '4px' }}>
            {['dashboard', 'analytics', 'fleet', 'settings'].map(tab => (
              <button key={tab} onClick={() => setActiveTab(tab)} style={{
                background: activeTab === tab ? '#667eea' : 'transparent',
                border: 'none',
                color: activeTab === tab ? 'white' : '#94A3B8',
                padding: '8px 16px',
                borderRadius: '6px',
                fontSize: '14px',
                fontWeight: '500',
                cursor: 'pointer',
                textTransform: 'capitalize',
                transition: 'all 0.2s'
              }}>{tab}</button>
            ))}
          </div>
          
          <div style={{ display: 'flex', alignItems: 'center', gap: '16px' }}>
            <div style={{
              background: 'rgba(255, 255, 255, 0.1)',
              borderRadius: '20px',
              padding: '8px 12px',
              fontSize: '12px',
              color: '#00FF88'
            }}>• Online</div>
            <div style={{
              width: '32px',
              height: '32px',
              background: '#667eea',
              borderRadius: '50%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              fontSize: '14px'
            }}>👤</div>
          </div>
        </div>
      </nav>

      {/* Dashboard Main Content */}
      <main style={{ paddingTop: '80px', padding: '80px 24px 40px' }}>
        <div style={{ maxWidth: '1400px', margin: '0 auto' }}>
          
          {/* Stats Cards Row */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
            gap: '20px',
            marginBottom: '32px'
          }}>
            {[
              { title: 'Active Vehicles', value: '2,847', change: '+12%', color: '#00FF88' },
              { title: 'Emergency Calls', value: '156', change: '+8%', color: '#FF6B6B' },
              { title: 'Response Time', value: '12min', change: '-15%', color: '#4ECDC4' },
              { title: 'Success Rate', value: '98.5%', change: '+2%', color: '#45B7D1' }
            ].map((stat, i) => (
              <div key={i} style={{
                background: 'rgba(255, 255, 255, 0.05)',
                border: '1px solid rgba(255, 255, 255, 0.1)',
                borderRadius: '12px',
                padding: '24px',
                transition: 'all 0.3s ease'
              }}
              onMouseOver={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.08)'
                e.target.style.transform = 'translateY(-2px)'
              }}
              onMouseOut={(e) => {
                e.target.style.background = 'rgba(255, 255, 255, 0.05)'
                e.target.style.transform = 'translateY(0)'
              }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: '16px' }}>
                  <h3 style={{ fontSize: '14px', color: '#94A3B8', margin: 0, fontWeight: '500' }}>{stat.title}</h3>
                  <div style={{
                    background: stat.change.startsWith('+') ? 'rgba(0, 255, 136, 0.1)' : 'rgba(255, 107, 107, 0.1)',
                    color: stat.change.startsWith('+') ? '#00FF88' : '#FF6B6B',
                    padding: '4px 8px',
                    borderRadius: '6px',
                    fontSize: '12px',
                    fontWeight: '600'
                  }}>{stat.change}</div>
                </div>
                <div style={{ fontSize: '32px', fontWeight: '700', color: stat.color, marginBottom: '8px' }}>{stat.value}</div>
                <div style={{ width: '100%', height: '4px', background: 'rgba(255, 255, 255, 0.1)', borderRadius: '2px', overflow: 'hidden' }}>
                  <div style={{ width: '70%', height: '100%', background: stat.color, borderRadius: '2px' }} />
                </div>
              </div>
            ))}
          </div>
          
          {/* Main Dashboard Grid */}
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
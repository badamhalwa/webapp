import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { FiClock, FiAlertCircle, FiRefreshCw, FiZap, FiActivity, FiUser } from 'react-icons/fi';

const StatusBadge = ({ status }) => {
  const styles = {
    'in-progress': { bg: '#e6f7f5', text: '#009688', label: 'Consulting' },
    'waiting':     { bg: '#fef8e7', text: '#b45309', label: 'Waiting' },
    'completed':   { bg: '#eaf5ee', text: '#276a27', label: 'Completed' },
    'available':   { bg: '#eaf5ee', text: '#276a27', label: 'Available' },
    'busy':        { bg: '#fdeaea', text: '#e8282b', label: 'Busy' },
    'offline':     { bg: '#f2f4f7', text: '#667085', label: 'Away' }
  };
  const s = styles[status] || styles['offline'];
  return (
    <span style={{ 
      padding: '4px 10px', borderRadius: 6, fontSize: 10, fontWeight: 700, 
      background: s.bg, color: s.text, textTransform: 'uppercase', letterSpacing: '0.02em',
      fontFamily: 'Inter, sans-serif'
    }}>{s.label}</span>
  );
};

const LiveQueue = () => {
  const { queue, availability, notifications } = useApp();
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => { setLastUpdate(new Date()); }, 15000);
    return () => clearInterval(timer);
  }, []);

  const refresh = () => {
    setRefreshing(true);
    setTimeout(() => { setLastUpdate(new Date()); setRefreshing(false); }, 600);
  };

  return (
    <div style={{ background: '#ffffff' }}>
      
      {/* ── Page Hero ── */}
      <section style={{ background: '#003580', padding: '3rem 2rem 2.5rem' }}>
        <div className="max-w-7xl mx-auto">
          <nav className="vs-breadcrumb" style={{ marginBottom: 10 }}>
            <a href="/" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: 12 }}>Home</a>
            <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 6px', fontSize: 12 }}>/</span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Patients</span>
            <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 6px', fontSize: 12 }}>/</span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Live Queue</span>
          </nav>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 10 }}>
            Real-time Queue Status
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif', maxWidth: 560, lineHeight: 1.7 }}>
            Live tracking of OPD tokens and consultant availability across all clinical units.
          </p>
        </div>
      </section>

      <div className="vs-section">
        <div className="max-w-7xl mx-auto">
          
          {/* Status Bar */}
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 32, padding: '12px 0', borderBottom: '1px solid #f2f4f7' }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
              <div style={{ width: 10, height: 10, background: '#276a27', borderRadius: '50%', boxShadow: '0 0 0 3px #eaf5ee' }} className="animate-pulse" />
              <span style={{ fontSize: 13, fontWeight: 600, color: '#1a1a2e', fontFamily: 'Inter, sans-serif' }}>System Live — Autorefresh active</span>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
              <span style={{ fontSize: 11, color: '#888', fontFamily: 'Inter, sans-serif' }}>Synced at {lastUpdate.toLocaleTimeString()}</span>
              <button onClick={refresh} disabled={refreshing} style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#003580' }}>
                <FiRefreshCw className={refreshing ? 'animate-spin' : ''} size={18} />
              </button>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 1fr) minmax(0, 1fr)', gap: 32 }}>
            
            {/* ── Active Queue ── */}
            <div>
              <div className="vs-section-header">
                <div>
                  <div className="vs-section-title">OPD Tokens</div>
                  <div className="vs-section-sub">Sequence of patients currently in line</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {queue.map((p, i) => (
                  <motion.div key={p.token} initial={{ opacity: 0, x: -16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                    <div className="vs-card" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: 16, borderLeft: p.status === 'in-progress' ? '4px solid #009688' : '1px solid #eaecf0' }}>
                      <div style={{ 
                        width: 44, height: 44, borderRadius: 10, 
                        background: p.status === 'in-progress' ? '#009688' : '#f7f9fc',
                        color: p.status === 'in-progress' ? '#fff' : '#1a1a2e',
                        display: 'flex', alignItems: 'center', justifyContent: 'center',
                        fontSize: 16, fontWeight: 800, fontFamily: 'Manrope, sans-serif'
                      }}>{p.token}</div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a2e', fontFamily: 'Manrope, sans-serif' }}>{p.name}</div>
                        <div style={{ fontSize: 11, color: '#888', marginTop: 1, fontFamily: 'Inter, sans-serif' }}>{p.dept}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <StatusBadge status={p.status} />
                        <div style={{ fontSize: 11, color: '#aaa', marginTop: 4, display: 'flex', alignItems: 'center', gap: 4, justifyContent: 'flex-end' }}>
                          <FiClock size={12} /> {p.waitTime}m
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* ── Consultant Status ── */}
            <div>
              <div className="vs-section-header">
                <div>
                  <div className="vs-section-title">Specialist Status</div>
                  <div className="vs-section-sub">Current availability of our clinical staff</div>
                </div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                {availability.map((doc, i) => (
                  <motion.div key={doc.name} initial={{ opacity: 0, x: 16 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                    <div className="vs-card" style={{ padding: '1rem 1.25rem', display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div style={{ 
                        width: 44, height: 44, borderRadius: '50%', 
                        background: '#e6f0fb', color: '#003580',
                        display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: 16
                      }}>
                        <FiUser size={20} />
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a2e', fontFamily: 'Manrope, sans-serif' }}>{doc.name}</div>
                        <div style={{ fontSize: 11, color: '#888', marginTop: 1, fontFamily: 'Inter, sans-serif' }}>{doc.dept}</div>
                        {doc.currentPatient && (
                          <div style={{ fontSize: 10, color: '#009688', fontWeight: 700, marginTop: 4, display: 'flex', alignItems: 'center', gap: 4 }}>
                            <FiActivity size={10} /> CURRENTLY SERVING: {doc.currentPatient}
                          </div>
                        )}
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <StatusBadge status={doc.status} />
                        <div style={{ marginTop: 6, display: 'flex', justifyContent: 'flex-end' }}>
                           <div style={{ width: 8, height: 8, borderRadius: '50%', background: doc.status === 'available' ? '#276a27' : doc.status === 'busy' ? '#b45309' : '#888' }} />
                        </div>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

          {/* ── Notifications ── */}
          <div style={{ marginTop: 48 }}>
             <div className="vs-section-header">
                <div>
                  <div className="vs-section-title">Live Announcements</div>
                </div>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', gap: 16 }}>
                {notifications.map((n, i) => (
                  <div key={n.id} className="vs-card" style={{ padding: '1.25rem', borderLeft: '4px solid #003580', display: 'flex', gap: 14 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 8, background: '#f7f9fc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#003580', flexShrink: 0 }}>
                      <FiZap size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: 13, color: '#1a1a2e', lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>{n.msg}</div>
                      <div style={{ fontSize: 11, color: '#888', marginTop: 6, fontFamily: 'Inter, sans-serif' }}>Sent at {n.time}</div>
                    </div>
                  </div>
                ))}
              </div>
          </div>

          <div style={{ marginTop: 40, padding: '1.5rem', background: '#fcfcfd', border: '1px solid #eaecf0', borderRadius: 12 }}>
            <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>
              <strong>Notice:</strong> This screen displays live estimates. Actual wait times may vary depending on clinical complexity of cases. Please report to your primary nursing station if you have any questions about your position in the sequence.
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default LiveQueue;

import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/ui/UIComponents';
import { pgSchedule, doctorAvailability } from '../../data/mockData';
import { FiRefreshCw, FiClock, FiBell, FiLock, FiEye, FiEyeOff, FiShield, FiUser, FiActivity, FiArrowRight, FiArrowUpRight, FiBookOpen, FiClipboard } from 'react-icons/fi';

const DEMO_PIN = '1234';

const PINGate = ({ onUnlock }) => {
  const [pin, setPin] = useState('');
  const [error, setError] = useState('');
  const [shaking, setShaking] = useState(false);

  const handleDigit = (d) => {
    if (pin.length < 4) {
      const next = pin + d;
      setPin(next);
      setError('');
      if (next.length === 4) {
        setTimeout(() => {
          if (next === DEMO_PIN) {
            onUnlock();
          } else {
            setError('Incorrect access code.');
            setShaking(true);
            setPin('');
            setTimeout(() => setShaking(false), 500);
          }
        }, 200);
      }
    }
  };

  const handleBackspace = () => setPin(p => p.slice(0, -1));

  return (
    <div style={{ minHeight: '100vh', background: '#f0f4f8', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '0 20px' }}>
      <motion.div
        initial={{ scale: 0.95, opacity: 0 }}
        animate={shaking ? { x: [-8, 8, -8, 8, 0] } : { scale: 1, opacity: 1 }}
        transition={shaking ? { duration: 0.4 } : { type: 'spring', stiffness: 200 }}
        style={{ background: '#ffffff', borderRadius: 32, boxShadow: '0 20px 50px rgba(0, 53, 128, 0.1)', padding: '40px', width: '100%', maxWidth: 400, textAlign: 'center', border: '1px solid #e2e8f0' }}
      >
        <div style={{ width: 64, height: 64, background: '#003580', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px', color: '#fff' }}>
          <FiShield size={30} />
        </div>
        <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '1.5rem', color: '#1a1a2e', marginBottom: 6 }}>PG Portal Access</h1>
        <p style={{ fontFamily: 'Inter, sans-serif', fontSize: 13, color: '#64748b', marginBottom: 30 }}>Please enter your authorized 4-digit PIN</p>

        <div style={{ display: 'flex', justifyContent: 'center', gap: 16, marginBottom: 30 }}>
          {[0, 1, 2, 3].map(i => (
            <div key={i} style={{ 
              width: 14, height: 14, borderRadius: '50%', border: '2px solid #cbd5e1', 
              transition: 'all 0.2s',
              background: i < pin.length ? '#003580' : 'transparent',
              borderColor: i < pin.length ? '#003580' : '#cbd5e1',
              transform: i < pin.length ? 'scale(1.2)' : 'scale(1)'
            }}/>
          ))}
        </div>

        {error && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ background: '#fef2f2', color: '#ef4444', fontSize: 12, fontWeight: 600, padding: '10px', borderRadius: 12, marginBottom: 20 }}>
            {error}
          </motion.div>
        )}

        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 12, marginBottom: 24 }}>
          {[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map((d, i) => (
            <button key={i}
              onClick={() => d === '⌫' ? handleBackspace() : d !== '' ? handleDigit(String(d)) : null}
              disabled={d === ''}
              style={{ 
                height: 60, borderRadius: 18, border: 'none', background: d === '⌫' ? 'transparent' : '#f8fafc',
                fontSize: 20, fontWeight: 700, color: d === '⌫' ? '#ef4444' : '#1e293b',
                cursor: d === '' ? 'default' : 'pointer', transition: 'all 0.2s',
                opacity: d === '' ? 0 : 1
              }}
              onMouseEnter={(e) => { if(d !== '' && d !== '⌫') e.target.style.background = '#e2e8f0'; }}
              onMouseLeave={(e) => { if(d !== '' && d !== '⌫') e.target.style.background = '#f8fafc'; }}
            >
              {d}
            </button>
          ))}
        </div>

        <div style={{ padding: '12px', background: '#fffbeb', borderRadius: 12, border: '1px solid #fef3c7', textAlign: 'left' }}>
          <p style={{ fontSize: 11, fontWeight: 800, color: '#92400e', marginBottom: 2 }}>🔑 DEMO ACCESS</p>
          <p style={{ fontSize: 11, color: '#b45309' }}>Use access code: <strong style={{ fontWeight: 800 }}>1234</strong></p>
        </div>
      </motion.div>
    </div>
  );
};

const PGDoctorDashboard = () => {
  const { queue, notifications, availability } = useApp();
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem('pg-auth') === '1');
  const [lastSync, setLastSync] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });

  const handleUnlock = () => {
    sessionStorage.setItem('pg-auth', '1');
    setUnlocked(true);
  };

  const handleLock = () => {
    sessionStorage.removeItem('pg-auth');
    setUnlocked(false);
  };

  useEffect(() => {
    const timer = setInterval(() => setLastSync(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const refresh = () => {
    setRefreshing(true);
    setTimeout(() => { setLastSync(new Date()); setRefreshing(false); }, 700);
  };

  if (!unlocked) return <PINGate onUnlock={handleUnlock}/>;

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      
      {/* ── Page Hero ── */}
      <section style={{ background: '#003580', padding: '3rem 2rem 2.5rem' }}>
        <div className="max-w-7xl mx-auto flex justify-between items-end">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ padding: '4px 10px', background: '#009688', borderRadius: 6, fontSize: 10, fontWeight: 800, color: '#fff', textTransform: 'uppercase' }}>PG Resident Portal</div>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 600 }}>{today}</span>
            </div>
            <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '2.5rem', color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 8 }}>
              Clinical Rounds
            </h1>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif', maxWidth: 560, lineHeight: 1.7 }}>
              Secure management of patient queues, duty shifts, and real-time clinical notifications for post-graduate dental residents.
            </p>
          </div>
          <div style={{ display: 'flex', itemsCenter: 'center', gap: 16, marginBottom: 10 }}>
            <div style={{ textAlign: 'right' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 6, justifyContent: 'flex-end', marginBottom: 4 }}>
                <div style={{ width: 8, height: 8, background: '#4ade80', borderRadius: '50%', boxShadow: '0 0 8px #4ade80' }}></div>
                <span style={{ fontSize: 11, fontWeight: 700, color: '#4ade80' }}>ACTIVE SESSION</span>
              </div>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.4)' }}>Last synced: {lastSync.toLocaleTimeString()}</span>
            </div>
            <button onClick={refresh} disabled={refreshing} style={{ width: 40, height: 40, borderRadius: 10, background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
              <FiRefreshCw className={refreshing ? 'animate-spin' : ''} size={18} />
            </button>
            <button onClick={handleLock} style={{ padding: '0 16px', height: 40, borderRadius: 10, background: '#f8fafc', color: '#1a1a2e', fontWidth: 700, fontSize: 12, border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 8 }}>
              <FiLock size={14} /> Exit
            </button>
          </div>
        </div>
      </section>

      <div className="vs-section">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Stats Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 20, marginBottom: 40 }}>
            {[
              { label: 'Pending Cases', val: queue.length, bg: '#003580', icon: FiUsers },
              { label: 'In Treatment', val: queue.filter(q => q.status === 'in-progress').length, bg: '#009688', icon: FiActivity },
              { label: 'Completed', val: '12', bg: '#64748b', icon: FiCheckSquare },
              { label: 'On-Duty PGs', val: pgSchedule.filter(p => p.status === 'on-duty').length, bg: '#7c3aed', icon: FiShield },
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }} className="vs-card" style={{ padding: '24px', position: 'relative', overflow: 'hidden' }}>
                <div style={{ position: 'relative', zIndex: 1 }}>
                  <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', marginBottom: 4 }}>{s.label}</div>
                  <div style={{ fontSize: '2rem', fontWeight: 800, color: '#1a1a2e' }}>{s.val}</div>
                </div>
                {s.icon && <s.icon size={48} style={{ position: 'absolute', right: -10, bottom: -10, opacity: 0.05, color: s.bg }} />}
              </motion.div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 32 }}>
            
            {/* Main Content */}
            <div>
              <div style={{ marginBottom: 30 }}>
                <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '1.25rem', color: '#1a1a2e', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                   <FiClock size={20} color="#003580" /> Today's Resident Rotation
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {pgSchedule.map((pg, i) => (
                    <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                      <div className="vs-card" style={{ padding: '16px 20px', display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ width: 44, height: 44, borderRadius: 12, background: '#f1f5f9', color: '#003580', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 14 }}>
                          PG
                        </div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontWeight: 800, color: '#1a1a2e', fontSize: 15 }}>{pg.doctor}</div>
                          <div style={{ fontSize: 12, color: '#64748b' }}>{pg.dept} • {pg.shift} Shift</div>
                        </div>
                        <div style={{ textAlign: 'right' }}>
                          <span style={{ 
                            fontSize: 10, fontWeight: 800, padding: '4px 8px', borderRadius: 6,
                            background: pg.status === 'on-duty' ? '#eaf5ee' : '#f8fafc',
                            color: pg.status === 'on-duty' ? '#009688' : '#64748b',
                            textTransform: 'uppercase'
                          }}>
                            {pg.status}
                          </span>
                          <div style={{ fontSize: 11, color: '#64748b', marginTop: 4 }}>{pg.cases} cases assigned</div>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              <div>
                <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '1.25rem', color: '#1a1a2e', marginBottom: 20, display: 'flex', alignItems: 'center', gap: 10 }}>
                   <FiActivity size={20} color="#003580" /> Real-time Treatment Queue
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {queue.map((p) => (
                    <div key={p.token} className="vs-card" style={{ padding: '14px 20px', display: 'flex', alignItems: 'center', gap: 16, borderLeft: p.status === 'in-progress' ? '4px solid #009688' : '1px solid #e2e8f0' }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: p.status === 'in-progress' ? '#009688' : '#f8fafc', color: p.status === 'in-progress' ? '#fff' : '#64748b', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>
                        #{p.token}
                      </div>
                      <div style={{ flex: 1 }}>
                        <div style={{ fontWeight: 700, color: '#334155' }}>{p.name}</div>
                        <div style={{ fontSize: 11, color: '#64748b' }}>{p.dept}</div>
                      </div>
                      <div style={{ textAlign: 'right' }}>
                        <StatusBadge status={p.status} />
                        {p.status === 'waiting' && <div style={{ fontSize: 10, color: '#94a3b8', marginTop: 2 }}>Est. {p.waitTime}m</div>}
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </div>

            {/* Sidebar */}
            <div>
              <div style={{ marginBottom: 30 }}>
                <h3 style={{ fontSize: 14, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <FiBookOpen size={14} /> Thesis & Research
                </h3>
                <div className="vs-card" style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 12 }}>
                    <span style={{ fontSize: 13, fontWeight: 700, color: '#1e293b' }}>Proposal Phase</span>
                    <span style={{ fontSize: 10, fontWeight: 800, color: '#009688', background: '#eaf5ee', padding: '2px 8px', borderRadius: 4 }}>APPROVED</span>
                  </div>
                  <div style={{ height: 6, background: '#f1f5f9', borderRadius: 3, marginBottom: 12, overflow: 'hidden' }}>
                    <div style={{ height: '100%', width: '40%', background: '#003580', borderRadius: 3 }} />
                  </div>
                  <p style={{ fontSize: 11, color: '#64748b', lineHeight: 1.5 }}>
                    Next submission: <strong>Methodology Draft</strong> due on April 30, 2026.
                  </p>
                </div>
              </div>

              <div style={{ marginBottom: 30 }}>
                <h3 style={{ fontSize: 14, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <FiClipboard size={14} /> Clinical Logbook
                </h3>
                <div className="vs-card" style={{ padding: '16px' }}>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                      <span style={{ color: '#64748b' }}>This Month</span>
                      <span style={{ fontWeight: 700 }}>32 Entries</span>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: 12 }}>
                      <span style={{ color: '#64748b' }}>Pending Verification</span>
                      <span style={{ fontWeight: 700, color: '#f59e0b' }}>4 Cases</span>
                    </div>
                  </div>
                  <button style={{ width: '100%', marginTop: 12, padding: '8px', background: '#f8fafc', border: '1px solid #e2e8f0', borderRadius: 8, fontSize: 11, fontWeight: 700, color: '#003580', cursor: 'pointer' }}>
                    Add Log Entry
                  </button>
                </div>
              </div>

              <div>
                <h3 style={{ fontSize: 14, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16, display: 'flex', alignItems: 'center', gap: 8 }}>
                  <FiClock size={14} /> Upcoming Seminars
                </h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 8 }}>
                  <div className="vs-card" style={{ padding: '12px 16px' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#1e293b' }}>Journal Club - Implantology</div>
                    <div style={{ fontSize: 10, color: '#64748b', marginTop: 2 }}>Friday, 2:00 PM • Seminar Hall A</div>
                  </div>
                  <div className="vs-card" style={{ padding: '12px 16px' }}>
                    <div style={{ fontSize: 12, fontWeight: 700, color: '#1e293b' }}>Case Briefing - Orthomax</div>
                    <div style={{ fontSize: 10, color: '#64748b', marginTop: 2 }}>Monday, 9:00 AM • Dept Library</div>
                  </div>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

const FiCheckSquare = (props) => <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><polyline points="9 11 12 14 22 4"></polyline><path d="M21 12v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h11"></path></svg>;

export default PGDoctorDashboard;

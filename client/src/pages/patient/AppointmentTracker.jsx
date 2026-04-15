import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';
import { FiSearch, FiCalendar, FiClock, FiUser, FiArrowRight, FiCheckCircle, FiActivity } from 'react-icons/fi';

const STEPS_MAP = {
  booked: 1, confirmed: 2, completed: 3,
};

const StatusBadge = ({ status }) => {
  const styles = {
    'booked':    { bg: '#e6f0fb', text: '#003580', label: 'Booked' },
    'confirmed': { bg: '#e6f7f5', text: '#009688', label: 'Confirmed' },
    'completed': { bg: '#eaf5ee', text: '#276a27', label: 'Visit Done' },
    'cancelled': { bg: '#fdeaea', text: '#e8282b', label: 'Cancelled' }
  };
  const s = styles[status] || { bg: '#f2f4f7', text: '#667085', label: status };
  return (
    <span style={{ 
      padding: '4px 10px', borderRadius: 6, fontSize: 10, fontWeight: 700, 
      background: s.bg, color: s.text, textTransform: 'uppercase', letterSpacing: '0.02em',
      fontFamily: 'Inter, sans-serif'
    }}>{s.label}</span>
  );
};

const Timeline = ({ status }) => {
  const active = STEPS_MAP[status] || 1;
  const steps = [
    { label: 'Register', desc: 'Sussessfully Booked', icon: '📋' },
    { label: 'Verified', desc: 'Hospital Confirmed', icon: '✅' },
    { label: 'Clinical', desc: 'Specialist Visit', icon: '🏁' },
  ];
  return (
    <div style={{ display: 'flex', alignItems: 'start', marginTop: 24, padding: '0 10px' }}>
      {steps.map((s, i) => (
        <React.Fragment key={i}>
          <div style={{ flexShrink: 0, textAlign: 'center' }}>
            <div style={{ 
              width: 44, height: 44, borderRadius: '50%', margin: '0 auto 8px',
              display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: 18, border: '4px solid',
              borderColor: i + 1 <= active ? '#009688' : '#eaecf0',
              background: i + 1 <= active ? '#e6f7f5' : '#fcfcfd',
              transition: 'all 0.3s'
            }}>{s.icon}</div>
            <div style={{ fontSize: 11, fontWeight: 800, color: i + 1 <= active ? '#1a1a2e' : '#888', fontFamily: 'Manrope, sans-serif' }}>{s.label}</div>
            <div style={{ fontSize: 10, color: '#aaa', fontFamily: 'Inter, sans-serif', width: 70, margin: '4px auto 0', lineHeight: 1.2 }}>{s.desc}</div>
          </div>
          {i < steps.length - 1 && (
            <div style={{ flex: 1, height: 3, background: i + 1 < active ? '#009688' : '#eaecf0', margin: '20px 8px 0' }} />
          )}
        </React.Fragment>
      ))}
    </div>
  );
};

const AppointmentTracker = () => {
  const { t } = useTranslation();
  const { getAppointment } = useApp();
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [searching, setSearching] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearching(true);
    setNotFound(false);
    setResult(null);
    setTimeout(() => {
      const appt = getAppointment(query.trim());
      if (appt) { setResult(appt); setNotFound(false); }
      else setNotFound(true);
      setSearching(false);
    }, 800);
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
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Track Your Visit</span>
          </nav>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 10 }}>
            Track Appointment
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif', maxWidth: 560, lineHeight: 1.7 }}>
            Verify your current booking status and find your position in the clinical queue.
          </p>
        </div>
      </section>

      <div className="vs-section">
        <div className="max-w-2xl mx-auto">
          
          <div className="vs-card" style={{ padding: '2.5rem', marginBottom: 24 }}>
            <form onSubmit={handleSearch}>
              <div className="vs-form-group">
                <label className="vs-label">Booking ID or Mobile Number</label>
                <div style={{ display: 'flex', gap: 12 }}>
                  <input 
                    className="vs-input" 
                    placeholder="e.g. RRDCH-1234" 
                    style={{ flex: 1 }}
                    value={query} 
                    onChange={e => setQuery(e.target.value)} 
                  />
                  <button type="submit" disabled={searching} className="vs-btn vs-btn-primary" style={{ padding: '0 24px', height: 48 }}>
                    {searching ? '...' : <><FiSearch /> Track</>}
                  </button>
                </div>
                <p style={{ fontSize: 11, color: '#888', marginTop: 10, fontFamily: 'Inter, sans-serif' }}>
                  Demo: Try <strong>RRDCH-001</strong> or <strong>9876543210</strong>
                </p>
              </div>
            </form>
          </div>

          {notFound && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <div className="vs-card" style={{ padding: '1.5rem', textAlign: 'center', background: '#fdeaea', borderColor: '#f8d7da' }}>
                <div style={{ color: '#e8282b', fontSize: 24, marginBottom: 8 }}>⚠️</div>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 14, color: '#1a1a2e' }}>No Appointment Found</div>
                <p style={{ fontSize: 12, color: '#e8282b', fontFamily: 'Inter, sans-serif', marginTop: 4 }}>Please verify your ID and try again.</p>
              </div>
            </motion.div>
          )}

          {result && (
            <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }}>
              <div className="vs-card" style={{ padding: '2.5rem' }}>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'start', marginBottom: 24 }}>
                  <div>
                    <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '1.5rem', color: '#1a1a2e', marginBottom: 4 }}>Consultation Details</h2>
                    <div style={{ fontFamily: 'Menlo, monospace', fontWeight: 700, fontSize: 16, color: '#003580' }}>{result.id}</div>
                  </div>
                  <StatusBadge status={result.status} />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 32 }}>
                  {[
                    { icon: FiUser, label: 'Patient', val: result.patientName },
                    { icon: FiActivity, label: 'Specialist', val: result.doctor },
                    { icon: FiCalendar, label: 'Date', val: result.date },
                    { icon: FiClock, label: 'Arrival', val: result.time },
                  ].map((item, idx) => (
                    <div key={idx} style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: 8, background: '#f7f9fc', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#003580' }}>
                        <item.icon size={16} />
                      </div>
                      <div>
                        <div style={{ fontSize: 10, color: '#888', textTransform: 'uppercase', letterSpacing: '0.04em', fontWeight: 600 }}>{item.label}</div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a2e', fontFamily: 'Manrope, sans-serif' }}>{item.val}</div>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ background: '#fcfcfd', border: '1px solid #f2f4f7', borderRadius: 12, padding: '1.25rem', marginBottom: 32 }}>
                   <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 10 }}>
                      <span style={{ fontSize: 12, color: '#888', fontFamily: 'Inter, sans-serif' }}>Department</span>
                      <span style={{ fontSize: 12, fontWeight: 700, color: '#1a1a2e', fontFamily: 'Manrope, sans-serif' }}>{result.department}</span>
                   </div>
                   {result.reason && (
                     <div style={{ borderTop: '1px solid #f0f4f8', marginTop: 10, paddingTop: 10 }}>
                        <span style={{ fontSize: 11, color: '#aaa', display: 'block', marginBottom: 4 }}>Chief Complaint</span>
                        <p style={{ fontSize: 12.5, color: '#555e6b', fontFamily: 'Inter, sans-serif', lineHeight: 1.6 }}>{result.reason}</p>
                     </div>
                   )}
                </div>

                <Timeline status={result.status} />

                <div style={{ marginTop: 40, padding: '1rem 1.25rem', background: '#e6f0fb', borderRadius: 10, display: 'flex', gap: 12, alignItems: 'start' }}>
                  <FiCheckCircle size={18} color="#003580" style={{ marginTop: 2, flexShrink: 0 }} />
                  <p style={{ fontSize: 12, color: '#0c447c', lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>
                    {result.status === 'booked' && 'Important: Please check your SMS for a confirmation link. Your token will be generated once verified.'}
                    {result.status === 'confirmed' && 'Notice: Appointment verified. Please arrive 15 minutes prior to your time for primary screening.'}
                    {result.status === 'completed' && 'Your clinical visit has concluded. Please share your feedback to help us improve service quality.'}
                  </p>
                </div>
              </div>
            </motion.div>
          )}

        </div>
      </div>

    </div>
  );
};

export default AppointmentTracker;

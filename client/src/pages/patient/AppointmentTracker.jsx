import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useLocation } from 'react-router-dom';
import { FiSearch, FiClock, FiCheckCircle, FiUser, FiActivity, FiArrowRight, FiInfo } from 'react-icons/fi';
import { Card, SectionHeader } from '../../components/ui/UIComponents';
import { useApp } from '../../context/AppContext';

const AppointmentTracker = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const location = useLocation();
  const { getAppointment } = useApp();
  
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [notFound, setNotFound] = useState(false);

  useEffect(() => {
    // If we came from booking success, auto-fill and search
    if (location.state?.bookingId) {
      setQuery(location.state.bookingId);
      // Trigger search if it's the specific mock ID or just set the query
      // For demo, we'll just set it. If we want it to auto-trigger, we call handleTrack mock logic.
    }
  }, [location.state]);

  const handleTrack = (e) => {
    if (e) e.preventDefault();
    if (!query.trim()) return;

    setLoading(true);
    setResult(null);
    setNotFound(false);

    // Live search logic from AppContext
    setTimeout(() => {
      const appt = getAppointment(query);
      setLoading(false);
      if (appt) {
        setResult({
          ...appt,
          dept: appt.departmentId ? t(`depts.d${appt.departmentId}`) : 'General',
          doctor: appt.doctorId ? `Specialist #${appt.doctorId}` : 'Assigned Specialist',
          complaint: appt.reason || (lang === 'kn' ? 'ತಪಾಸಣೆ' : 'General Checkup')
        });
      } else {
        setNotFound(true);
      }
    }, 800);
  };

  return (
    <div style={{ background: '#ffffff', minHeight: '90vh' }}>
      
      {/* ── Page Hero ── */}
      <section style={{ background: '#003580', padding: '3rem 2rem 2.5rem' }}>
        <div className="max-w-7xl mx-auto">
          <nav className="vs-breadcrumb" style={{ marginBottom: 10 }}>
            <a href="/" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: 12 }}>{t('nav.home')}</a>
            <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 6px', fontSize: 12 }}>/</span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{t('nav.trackAppointment')}</span>
          </nav>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 10 }}>
            {t('appointment.tracker.title')}
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif', maxWidth: 560, lineHeight: 1.7 }}>
            {t('appointment.tracker.subtitle')}
          </p>
        </div>
      </section>

      <div className="vs-section">
        <div className="max-w-4xl mx-auto">
          
          <div className="vs-card" style={{ padding: '2.5rem', marginBottom: 32 }}>
            <form onSubmit={handleTrack} style={{ display: 'flex', gap: 12 }}>
              <div style={{ flex: 1 }}>
                <label style={{ display: 'block', fontSize: 12, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', marginBottom: 8, letterSpacing: '0.05em' }}>
                  {t('appointment.tracker.label')}
                </label>
                <div style={{ position: 'relative' }}>
                  <FiSearch style={{ position: 'absolute', left: 14, top: '50%', transform: 'translateY(-50%)', color: '#94a3b8' }} />
                  <input
                    className="vs-input"
                    value={query}
                    onChange={(e) => setQuery(e.target.value)}
                    placeholder={t('appointment.tracker.placeholder')}
                    style={{ paddingLeft: 40 }}
                  />
                </div>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="vs-btn vs-btn-primary"
                style={{ alignSelf: 'flex-end', height: 44, borderRadius: 8, padding: '0 24px', justifyContent: 'center' }}
              >
                {loading ? t('common.loading') : t('appointment.tracker.trackBtn')}
              </button>
            </form>
            <p style={{ fontSize: 11, color: '#94a3b8', marginTop: 12, display: 'flex', alignItems: 'center', gap: 6 }}>
              <FiInfo size={12} /> {t('appointment.tracker.demo')}
            </p>
          </div>

          <AnimatePresence mode="wait">
            {loading && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} style={{ textAlign: 'center', py: 20 }}>
                <div style={{ width: 40, height: 40, border: '3px solid #f1f5f9', borderTopColor: '#003580', borderRadius: '50%', animation: 'spin 1s linear infinite', margin: '0 auto' }} />
              </motion.div>
            )}

            {notFound && (
              <motion.div key="not-found" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="vs-card" style={{ padding: '3rem', textAlign: 'center' }}>
                <div style={{ fontSize: '3rem', marginBottom: 16 }}>🔍</div>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1a1a2e' }}>{t('appointment.tracker.notFound')}</h3>
                <p style={{ fontSize: 14, color: '#64748b', marginTop: 4 }}>{t('appointment.tracker.notFoundSub')}</p>
              </motion.div>
            )}

            {result && (
              <motion.div key="result" initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="vs-card" style={{ padding: 0, overflow: 'hidden' }}>
                <div style={{ background: '#f8fafc', padding: '1.5rem 2rem', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div>
                     <div style={{ fontSize: 10, color: '#888', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.05em' }}>{lang === 'kn' ? 'ನೇಮಕಾತಿ ಐಡಿ' : 'Appointment ID'}</div>
                     <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1a1a2e' }}>{result.id}</div>
                  </div>
                  <div className="vs-badge vs-badge-blue">{result.status}</div>
                </div>

                <div style={{ padding: '2rem' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(2, 1fr)', gap: 32, marginBottom: 32 }}>
                    <div style={{ display: 'flex', gap: 16 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 8, background: '#e6f0fb', color: '#003580', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                         <FiUser size={20} />
                      </div>
                      <div>
                        <div style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', mb: 1 }}>{t('appointment.name')}</div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#334155' }}>{result.name}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 16 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 8, background: '#f1effe', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                         <FiActivity size={20} />
                      </div>
                      <div>
                        <div style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', mb: 1 }}>{t('appointment.tracker.specialist')}</div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#334155' }}>{result.dept}</div>
                        <div style={{ fontSize: 11, color: '#64748b' }}>{result.doctor}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 16 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 8, background: '#eaf5ee', color: '#276a27', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                         <FiClock size={20} />
                      </div>
                      <div>
                        <div style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', mb: 1 }}>{t('appointment.tracker.arrival')}</div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#334155' }}>{result.time}</div>
                        <div style={{ fontSize: 11, color: '#64748b' }}>{result.date}</div>
                      </div>
                    </div>
                    <div style={{ display: 'flex', gap: 16 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 8, background: '#fef3f2', color: '#e8282b', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                         <FiCheckCircle size={20} />
                      </div>
                      <div>
                        <div style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', mb: 1 }}>{t('appointment.tracker.complaint')}</div>
                        <div style={{ fontSize: 14, fontWeight: 700, color: '#334155' }}>{result.complaint}</div>
                      </div>
                    </div>
                  </div>

                  {/* Visual Status Steps */}
                  <div style={{ background: '#f8fafc', padding: '1.5rem', borderRadius: 16 }}>
                     <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 20 }}>
                        <div style={{ textAlign: 'center', flex: 1 }}>
                           <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#003580', color: '#fff', fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}><FiCheckCircle size={12}/></div>
                           <div style={{ fontSize: 12, fontWeight: 700, color: '#1a1a2e' }}>{t('appointment.tracker.timeline.register')}</div>
                        </div>
                        <div style={{ flex: 1, height: 2, background: '#003580', marginTop: 11 }} />
                        <div style={{ textAlign: 'center', flex: 1 }}>
                           <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#003580', color: '#fff', fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}><FiCheckCircle size={12}/></div>
                           <div style={{ fontSize: 12, fontWeight: 700, color: '#1a1a2e' }}>{t('appointment.tracker.timeline.verified')}</div>
                        </div>
                        <div style={{ flex: 1, height: 2, background: '#e2e8f0', marginTop: 11 }} />
                        <div style={{ textAlign: 'center', flex: 1 }}>
                           <div style={{ width: 24, height: 24, borderRadius: '50%', border: '2px solid #e2e8f0', color: '#cbd5e1', fontSize: 10, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 8px' }}>3</div>
                           <div style={{ fontSize: 12, fontWeight: 500, color: '#94a3b8' }}>{t('appointment.tracker.timeline.clinical')}</div>
                        </div>
                     </div>
                     <p style={{ textAlign: 'center', fontSize: 11, color: '#64748b', fontStyle: 'italic' }}>
                        {t('appointment.tracker.statusMsg.confirmed')}
                     </p>
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>

        </div>
      </div>

    </div>
  );
};

export default AppointmentTracker;

import React, { useState, useEffect } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClock, FiActivity, FiUsers, FiUser, FiZap, FiRefreshCcw, FiInfo } from 'react-icons/fi';
import { departments } from '../../data/mockData';
import { useApp } from '../../context/AppContext';

const LiveQueue = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const { queue } = useApp();
  const [lastUpdated, setLastUpdated] = useState(new Date());
  
  // Map Live Data from Context
  const queueData = departments.slice(0, 6).map(d => {
    const qState = queue.find(q => q.id === String(d.id));
    const current = qState?.current !== undefined ? Number(qState.current) : 0;
    const waiting = qState?.waiting !== undefined ? Number(qState.waiting) : 0;
    return {
      ...d,
      current: current,
      waiting: waiting,
      avgWait: waiting * 15,
      status: qState?.status || 'Active'
    };
  });

  useEffect(() => {
    const timer = setInterval(() => setLastUpdated(new Date()), 30000);
    return () => clearInterval(timer);
  }, []);

  return (
    <div style={{ background: '#ffffff', minHeight: '90vh' }}>
      
      {/* ── Page Hero ── */}
      <section style={{ background: '#003580', padding: '3rem 2rem 2.5rem' }}>
        <div className="max-w-7xl mx-auto">
          <nav className="vs-breadcrumb" style={{ marginBottom: 10 }}>
            <a href="/" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: 12 }}>{t('nav.home')}</a>
            <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 6px', fontSize: 12 }}>/</span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{t('nav.liveQueue')}</span>
          </nav>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-end', flexWrap: 'wrap', gap: 20 }}>
            <div>
              <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 10 }}>
                {t('queue.title')}
              </h1>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif', maxWidth: 560, lineHeight: 1.7 }}>
                {t('queue.subtitle')}
              </p>
            </div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 8, background: 'rgba(255,255,255,0.1)', padding: '8px 16px', borderRadius: 40, border: '1px solid rgba(255,255,255,0.2)' }}>
              <div className="cta-pulse" style={{ width: 8, height: 8, borderRadius: '50%', background: '#4caf50' }} />
              <span style={{ fontSize: 11, fontWeight: 700, color: '#fff', opacity: 0.9 }}>{t('queue.systemLive')}</span>
              <span style={{ width: 1, height: 12, background: 'rgba(255,255,255,0.2)', margin: '0 4px' }} />
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.6)' }}>{t('queue.syncedAt')} {lastUpdated.toLocaleTimeString(lang === 'kn' ? 'kn-IN' : 'en-IN', { hour: '2-digit', minute: '2-digit' })}</span>
            </div>
          </div>
        </div>
      </section>

      <div className="vs-section">
        <div className="max-w-7xl mx-auto">
          
          <div className="vs-grid-3">
            {queueData.map((dept, idx) => (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="vs-card" style={{ padding: '1.5rem', borderLeft: `4px solid ${dept.status === 'Active' ? '#009688' : '#f59e0b'}` }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: 16 }}>
                    <div style={{ width: 40, height: 40, borderRadius: 8, background: '#f8fafc', color: '#003580', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FiActivity size={20} />
                    </div>
                    <div className={dept.status === 'Active' ? 'vs-badge vs-badge-teal' : 'vs-badge vs-badge-amber'} style={{ fontSize: 9 }}>
                      {dept.status === 'Active' ? t('queue.available') : t('queue.busy')}
                    </div>
                  </div>
                  
                  <h3 style={{ fontSize: 15, fontWeight: 800, color: '#1a1a2e', marginBottom: 20 }}>{t(`depts.d${dept.id}`)}</h3>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    <div style={{ background: '#f1f5f9', padding: '12px', borderRadius: 12 }}>
                      <div style={{ fontSize: 10, color: '#64748B', textTransform: 'uppercase', fontWeight: 800 }}>{t('queue.serving')}</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#003580', marginTop: 4 }}>#{dept.current}</div>
                    </div>
                    <div style={{ background: '#f1f5f9', padding: '12px', borderRadius: 12 }}>
                      <div style={{ fontSize: 10, color: '#64748B', textTransform: 'uppercase', fontWeight: 800 }}>{t('queue.waiting')}</div>
                      <div style={{ fontSize: '1.25rem', fontWeight: 800, color: '#e8282b', marginTop: 4 }}>{dept.waiting}</div>
                    </div>
                  </div>

                  <div style={{ marginTop: 16, pt: 12, borderTop: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                     <div style={{ display: 'flex', alignItems: 'center', gap: 6, color: '#64748B', fontSize: 11 }}>
                        <FiClock size={12} /> {lang === 'kn' ? `ಅಂದಾಜು ಸಮಯ: ${dept.avgWait} ನಿಮಿಷ` : `Est. Wait: ${dept.avgWait} min`}
                     </div>
                     {dept.waiting > 8 && <div style={{ color: '#e8282b', fontSize: 10, fontWeight: 700 }}>{lang === 'kn' ? 'ಹೆಚ್ಚಿನ ಕ್ಯೂ' : 'High Volume'}</div>}
                  </div>
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ marginTop: 40, p: '1.5rem', background: '#fefce8', border: '1px solid #fef08a', borderRadius: 16, display: 'flex', gap: 16, alignItems: 'start' }}>
             <FiInfo className="text-amber-600 mt-0.5" />
             <div>
                <p style={{ fontSize: 13, color: '#854d0e', fontFamily: 'Inter, sans-serif' }}>
                   {t('queue.notice')}
                </p>
                <div style={{ display: 'flex', gap: 16, marginTop: 12 }}>
                   <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#854d0e', fontWeight: 600 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#4caf50' }} /> {t('queue.available')}
                   </div>
                   <div style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 11, color: '#854d0e', fontWeight: 600 }}>
                      <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#f59e0b' }} /> {t('queue.busy')}
                   </div>
                </div>
             </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default LiveQueue;

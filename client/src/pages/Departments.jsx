import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiArrowRight, FiUser, FiActivity } from 'react-icons/fi';
import { departments } from '../data/mockData';

const Departments = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <div style={{ background: '#ffffff' }}>
      
      {/* ── Page Hero ── */}
      <section style={{ background: '#003580', padding: '3rem 2rem 2.5rem' }}>
        <div className="max-w-7xl mx-auto">
          <nav className="vs-breadcrumb" style={{ marginBottom: 10 }}>
            <a href="/" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: 12 }}>{t('nav.home')}</a>
            <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 6px', fontSize: 12 }}>/</span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{t('nav.departments')}</span>
          </nav>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 10 }}>
            {t('home.featuredDepts')}
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif', maxWidth: 560, lineHeight: 1.7 }}>
            {t('home.featuredDeptsSub')}
          </p>
        </div>
      </section>

      <div className="vs-section">
        <div className="max-w-7xl mx-auto">
          <div className="vs-grid-3">
            {departments.map((dept, idx) => (
              <motion.div
                key={dept.id}
                initial={{ opacity: 0, y: 16 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="vs-card vs-dept-card" style={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div className="vs-card-body" style={{ flex: 1, padding: '1.75rem' }}>
                    <div style={{ width: 48, height: 48, borderRadius: 12, background: '#e6f0fb', color: '#003580', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                      <FiActivity size={24} />
                    </div>
                    <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '1.25rem', color: '#1a1a2e', marginBottom: 12, letterSpacing: '-0.01em' }}>
                      {t(`depts.d${dept.id}`)}
                    </h3>
                    <p style={{ fontSize: 13, color: '#555e6b', lineHeight: 1.75, marginBottom: 20, fontFamily: 'Inter, sans-serif' }}>
                      {lang === 'kn' ? 'ಸಮಗ್ರ ದಂತ ಆರೋಗ್ಯ ಸೇವೆಗಳು ಮತ್ತು ತಜ್ಞ ಬೋಧಕ ಸಿಬ್ಬಂದಿಯೊಂದಿಗೆ ಅತ್ಯುತ್ತಮ ಚಿಕಿತ್ಸೆ.' : dept.desc}
                    </p>
                    <div style={{ padding: '12px 0', borderTop: '1px solid #f2f4f7', display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#f5f3ff', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FiUser size={14} color="#7c3aed" />
                      </div>
                      <div>
                        <div style={{ fontSize: 10, color: '#888', textTransform: 'uppercase', fontWeight: 800 }}>{lang === 'kn' ? 'ವಿಭಾಗದ ಮುಖ್ಯಸ್ಥರು' : 'Head of Dept'}</div>
                        <div style={{ fontSize: 12, fontWeight: 700, color: '#1a1a2e' }}>{dept.hod}</div>
                      </div>
                    </div>
                  </div>
                  <div style={{ borderTop: '1px solid #f2f4f7', padding: '1rem 1.75rem' }}>
                    <button className="vs-btn vs-btn-primary" style={{ width: '100%', justifyContent: 'space-between', borderRadius: 6, fontSize: 12 }}>
                      {lang === 'kn' ? 'ವಿವರಗಳನ್ನು ನೋಡಿ' : 'View Details'} <FiArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Departments;

import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiArrowRight, FiUser, FiActivity, FiX, FiCheck } from 'react-icons/fi';
import { departments, doctors } from '../data/mockData';

const Departments = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [selectedDept, setSelectedDept] = useState(null);

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
                    <button 
                      onClick={() => setSelectedDept(dept)}
                      className="vs-btn vs-btn-primary" 
                      style={{ width: '100%', justifyContent: 'space-between', borderRadius: 6, fontSize: 12 }}
                    >
                      {lang === 'kn' ? 'ವಿವರಗಳನ್ನು ನೋಡಿ' : 'View Details'} <FiArrowRight size={14} />
                    </button>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* Faculty Modal */}
      <AnimatePresence>
        {selectedDept && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
              onClick={() => setSelectedDept(null)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              style={{ position: 'relative', width: '100%', maxWidth: 550, background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
            >
              <div style={{ padding: '20px', background: '#003580', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontSize: 10, textTransform: 'uppercase', opacity: 0.8, letterSpacing: '0.05em', marginBottom: 2 }}>Department Faculty</div>
                  <div style={{ fontWeight: 800, fontSize: 16, fontFamily: 'Manrope, sans-serif' }}>{t(`depts.d${selectedDept.id}`)}</div>
                </div>
                <button onClick={() => setSelectedDept(null)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><FiX size={20} /></button>
              </div>
              <div style={{ padding: '24px', maxHeight: '70vh', overflowY: 'auto' }}>
                <div style={{ marginBottom: 20, display: 'flex', alignItems: 'center', gap: 12, padding: 12, background: '#f8fafc', borderRadius: 8 }}>
                  <div style={{ width: 40, height: 40, borderRadius: '50%', background: '#003580', color: '#fff', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800 }}>H</div>
                  <div>
                    <div style={{ fontSize: 11, color: '#888' }}>Head of Department</div>
                    <div style={{ fontWeight: 700, color: '#1a1a2e' }}>{selectedDept.hod}</div>
                  </div>
                </div>
                
                <h4 style={{ fontSize: 12, fontWeight: 800, textTransform: 'uppercase', color: '#444', marginBottom: 12, borderBottom: '2px solid #f0f0f0', paddingBottom: 6 }}>Academic Staff</h4>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                  {doctors[selectedDept.id]?.map((doc, idx) => (
                    <div key={idx} style={{ padding: '10px 14px', border: '1px solid #e2e8f0', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 10 }}>
                      <div style={{ width: 24, height: 24, borderRadius: '50%', background: '#e6f0fb', color: '#003580', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiUser size={12} /></div>
                      <div style={{ fontSize: 13, fontWeight: 600, color: '#334155' }}>{doc.name}</div>
                    </div>
                  ))}
                </div>

                <div style={{ marginTop: 24, padding: '16px', background: '#eef2ff', borderRadius: 10, display: 'flex', gap: 12 }}>
                  <FiCheck color="#4338ca" style={{ flexShrink: 0, marginTop: 4 }} />
                  <p style={{ fontSize: 12, color: '#4338ca', lineHeight: 1.5 }}>
                    Our faculty consists of highly experienced practitioners and researchers committed to clinical excellence and academic rigor.
                  </p>
                </div>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Departments;

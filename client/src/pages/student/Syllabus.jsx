import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiBook, FiDownload, FiExternalLink, FiClock, FiCheckCircle } from 'react-icons/fi';
import { syllabusData } from '../../data/mockData';

const Syllabus = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      
      {/* ── Page Hero ── */}
      <section style={{ background: '#003580', padding: '3rem 2rem 2.5rem' }}>
        <div className="max-w-7xl mx-auto">
          <nav className="vs-breadcrumb" style={{ marginBottom: 10 }}>
            <a href="/" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: 12 }}>{t('nav.home')}</a>
            <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 6px', fontSize: 12 }}>/</span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{t('nav.academics')}</span>
            <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 6px', fontSize: 12 }}>/</span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{t('academics.syllabus')}</span>
          </nav>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 10 }}>
            {t('academics.syllabus')}
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif', maxWidth: 560, lineHeight: 1.7 }}>
            {lang === 'kn' ? 'ವಿದ್ಯಾರ್ಥಿಗಳಿಗಾಗಿ ಸಮಗ್ರ ದಂತ ವೈದ್ಯಕೀಯ ಪಠ್ಯಕ್ರಮ ವಿವರಗಳು ಇಲ್ಲಿವೆ. ಪಠ್ಯಪುಸ್ತಕಗಳು ಮತ್ತು ಪರೀಕ್ಷೆಯ ಮಾಹಿತಿ ಕೆಳಗೆ ನೀಡಲಾಗಿದೆ.' : 'Deep-dive into the official RGUHS dental curriculum, detailed semester-wise subjects, and reference materials for BDS students.'}
          </p>
        </div>
      </section>

      <div className="vs-section">
        <div className="max-w-7xl mx-auto px-4">
          <div style={{ display: 'flex', flexDirection: 'column', gap: 32 }}>
            {syllabusData.map((year, idx) => (
              <motion.div
                key={year.year}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="vs-card"
                style={{ padding: 0, overflow: 'hidden' }}
              >
                <div style={{ padding: '20px 24px', background: '#fff', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: '#e6f0fb', color: '#003580', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <FiBook size={20} />
                    </div>
                    <div>
                      <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '1.15rem', color: '#1a1a2e' }}>
                        {lang === 'kn' ? `${year.year} ನೇ ವರ್ಷ` : year.year}
                      </h2>
                      <div style={{ fontSize: 11, color: '#64748b' }}>{t('academics.updated')}: {new Date(year.updated).toLocaleDateString(lang === 'kn' ? 'kn-IN' : 'en-IN')}</div>
                    </div>
                  </div>
                  <button className="vs-btn vs-btn-primary" style={{ height: 36, padding: '0 16px', fontSize: 11, borderRadius: 8 }}>
                    <FiDownload size={14} /> {t('common.download')} PDF
                  </button>
                </div>
                
                <div style={{ padding: '24px' }}>
                  <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: 12 }}>
                    {year.subjects.map((sub, i) => (
                      <div key={i} style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '12px 16px', background: '#f8fafc', borderRadius: 10, border: '1px solid #f1f5f9' }}>
                        <FiCheckCircle size={14} color="#009688" style={{ flexShrink: 0 }} />
                        <span style={{ fontSize: 13, fontWeight: 600, color: '#334155', fontFamily: 'Inter, sans-serif' }}>
                          {lang === 'kn' ? `ವಿಷಯ ${i+1}` : sub}
                        </span>
                      </div>
                    ))}
                  </div>

                  <div style={{ marginTop: 24, padding: '16px', background: '#fffbeb', border: '1px solid #fef3c7', borderRadius: 12, display: 'flex', gap: 14 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#fef3c7', color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                      <FiClock size={18} />
                    </div>
                    <div>
                      <h4 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 14, color: '#92400e', marginBottom: 4 }}>
                        {lang === 'kn' ? 'ಪರೀಕ್ಷೆಯ ಮಾರ್ಗಸೂಚಿಗಳು' : 'Academic Guidelines'}
                      </h4>
                      <p style={{ fontSize: 12, color: '#b45309', lineHeight: 1.6, opacity: 0.9 }}>
                        {lang === 'kn' ? 'ಆಯಾ ವರ್ಷದ ಪರೀಕ್ಷೆಯ ನಿಯಮಗಳು ಮತ್ತು ಸಬಂಧಿಸಿದ ವಿವರಗಳಿಗಾಗಿ ಕೆಳಗಿನ ಲಿಂಕ್ ಬಳಸಿ.' : 'Review critical examination patterns, internal evaluation criteria, and attendance requirements for this academic session.'}
                      </p>
                      <button style={{ marginTop: 10, border: 'none', background: 'none', color: '#92400e', fontWeight: 700, fontSize: 11, cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 5, padding: 0 }}>
                        {lang === 'kn' ? 'ಹೆಚ್ಚಿನ ಮಾಹಿತಿ' : 'View Requirements'} <FiExternalLink size={12} />
                      </button>
                    </div>
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

export default Syllabus;

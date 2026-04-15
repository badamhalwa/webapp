import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiAward, FiTarget, FiStar, FiTriangle } from 'react-icons/fi';
import { achievements } from '../data/mockData';

const Achievements = () => {
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
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{t('nav.achievements')}</span>
          </nav>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 10 }}>
            {t('nav.achievements')}
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif', maxWidth: 560, lineHeight: 1.7 }}>
            {lang === 'kn' ? 'ನಮ್ಮ ಕಾಲೇಜಿನ ಶೈಕ್ಷಣಿಕ ಶ್ರೇಷ್ಠತೆ, ಕ್ಲಿನಿಕಲ್ ಸಾಧನೆಗಳು ಮತ್ತು ಗೌರವಗಳ ಪಟ್ಟಿ ಇಲ್ಲಿವೆ.' : 'Celebrating our journey of excellence in dental education, clinical practice, and academic breakthroughs since 2001.'}
          </p>
        </div>
      </section>

      <div className="vs-section">
        <div className="max-w-7xl mx-auto">
          
          <div className="vs-section-header">
            <div>
              <div className="vs-section-title">{lang === 'kn' ? 'ನಮ್ಮ ಗೌರವಗಳು' : 'Recognition & Awards'}</div>
              <div className="vs-section-sub">{lang === 'kn' ? 'ಸಂಸ್ಥೆ ಪಡೆದಿರುವ ಪ್ರಮುಖ ಮಾನ್ಯತೆಗಳು.' : 'Key institutional rankings and national awards.'}</div>
            </div>
          </div>

          <div className="vs-grid-3">
            {achievements.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="vs-card" style={{ padding: '2rem', height: '100%', display: 'flex', flexDirection: 'column' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: '#fef8e7', color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 20 }}>
                    <FiAward size={22} />
                  </div>
                  <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '1.25rem', color: '#1a1a2e', marginBottom: 8 }}>
                     {lang === 'kn' ? 'ಸಾಧನೆ ಮತ್ತು ಗೌರವದ ವಿವರ' : item.title}
                  </h3>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 6, marginBottom: 16 }}>
                    <span style={{ fontSize: 11, fontWeight: 800, color: '#003580', background: '#e6f0fb', padding: '2px 8px', borderRadius: 4 }}>{item.year || '2024'}</span>
                    <span style={{ fontSize: 11, color: '#888' }}>{lang === 'kn' ? 'ಪಾಲಿಕೆ ಘಟಕ' : 'National Level'}</span>
                  </div>
                  <p style={{ fontSize: 13, color: '#555e6b', lineHeight: 1.7, flex: 1, fontFamily: 'Inter, sans-serif' }}>
                    {lang === 'kn' ? 'ದಂತ ವೈದ್ಯಕೀಯ ಕ್ಷೇತ್ರದಲ್ಲಿ ಶೈಕ್ಷಣಿಕ ಮತ್ತು ಕ್ಲಿನಿಕಲ್ ಶ್ರೇಷ್ಠತೆಗಾಗಿ ಸಲ್ಲಿಸಿರುವ ಕೊಡುಗೆಗಾಗಿ ನೀಡಲಾಗಿದೆ.' : 'Awarded for outstanding contributions to clinical training and research development in the field of dental sciences.'}
                  </p>
                </div>
              </motion.div>
            ))}
          </div>

          <div style={{ marginTop: 40, background: '#f8fafc', padding: '3rem', borderRadius: 24, textAlign: 'center' }}>
            <FiStar size={32} color="#f59e0b" style={{ margin: '0 auto 16px' }} />
            <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '1.5rem', color: '#1a1a2e', marginBottom: 12 }}>{lang === 'kn' ? 'ಕರ್ನಾಟಕದ ಪ್ರಥಮ ಸ್ಥಾನ' : 'Ranked #1 in Karnataka'}</h3>
            <p style={{ fontSize: 14, color: '#555e6b', maxWidth: 600, margin: '0 auto', fontFamily: 'Inter, sans-serif', lineHeight: 1.7 }}>
              {lang === 'kn' ? 'ನಮ್ಮ ಕಾಲೇಜು ನಿರಂತರವಾಗಿ ರಾಜ್ಯದ ಅಗ್ರ ದಂತ ಕಾಲೇಜುಗಳ ಸಾಲಿನಲ್ಲಿ ಸ್ಥಾನ ಪಡೆಯುತ್ತಾ ಬಂದಿದೆ. ಇದು ನಮ್ಮ ಬೋಧಕ ವರ್ಗ ಮತ್ತು ವಿದ್ಯಾರ್ಥಿಗಳ ಶ್ರಮಕ್ಕೆ ಸಾಕ್ಷಿ.' : 'Consistently ranked among the top dental colleges in India for academic excellence, infrastructure, and clinical training outcomes.'}
            </p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Achievements;

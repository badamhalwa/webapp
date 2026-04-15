import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiCalendar, FiMapPin, FiClock, FiChevronRight } from 'react-icons/fi';
import { newsItems } from '../data/mockData';

const Events = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const eventCategoryColors = {
    'Conference': '#003580',
    'CDE': '#009688',
    'Workshop': '#7c3aed',
    'Culture': '#e8282b',
    'Academic': '#b45309'
  };

  return (
    <div style={{ background: '#ffffff' }}>
      
      {/* ── Page Hero ── */}
      <section style={{ background: '#003580', padding: '3rem 2rem 2.5rem' }}>
        <div className="max-w-7xl mx-auto">
          <nav className="vs-breadcrumb" style={{ marginBottom: 10 }}>
            <a href="/" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: 12 }}>{t('nav.home')}</a>
            <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 6px', fontSize: 12 }}>/</span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{t('nav.events')}</span>
          </nav>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 10 }}>
            {t('nav.events')} &amp; {lang === 'kn' ? 'ನೋಟಿಸ್‌ಗಳು' : 'News'}
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif', maxWidth: 560, lineHeight: 1.7 }}>
            {lang === 'kn' ? 'ಕ್ಯಾಂಪಸ್‌ನಲ್ಲಿ ನಡೆಯುತ್ತಿರುವ ಇತ್ತೀಚಿನ ಶೈಕ್ಷಣಿಕ ಕಾರ್ಯಕ್ರಮಗಳು, ಕೌಶಲ್ಯ ಅಭಿವೃದ್ಧಿ ಸಮ್ಮೇಳನಗಳು ಮತ್ತು ಸಾಂಸ್ಕೃತಿಕ ಚಟುವಟಿಕೆಗಳ ಅಪ್‌ಡೇಟ್ ಇಲ್ಲಿದೆ.' : 'Stay updated with the latest clinical workshops, CDE programs, student festivals, and institutional announcements at RRDCH.'}
          </p>
        </div>
      </section>

      <div className="vs-section">
        <div className="max-w-7xl mx-auto">
          
          <div className="vs-section-header">
            <div>
              <div className="vs-section-title">{lang === 'kn' ? 'ಮುಂದಿನ ಕಾರ್ಯಕ್ರಮಗಳು' : 'Upcoming Events'}</div>
              <div className="vs-section-sub">{lang === 'kn' ? 'ಮುಂದಿನ ದಿನಗಳಲ್ಲಿ ನಡೆಯಲಿರುವ ಪ್ರಮುಖ ಶೈಕ್ಷಣಿಕ ಸಭೆಗಳು.' : 'Key academic and cultural gatherings scheduled for this year.'}</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
            {newsItems.map((event, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, x: -16 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="vs-card" style={{ padding: '0', overflow: 'hidden', display: 'flex', flexDirection: 'row' }}>
                  {/* Date Column */}
                  <div style={{ width: 100, background: eventCategoryColors[event.category] || '#003580', padding: '1.5rem', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800 }}>{new Date(event.date).getDate()}</div>
                    <div style={{ fontSize: 12, textTransform: 'uppercase', fontWeight: 700, opacity: 0.8 }}>{new Date(event.date).toLocaleDateString(lang === 'kn' ? 'kn-IN' : 'en-IN', { month: 'short' })}</div>
                  </div>
                  
                  {/* Info Column */}
                  <div style={{ flex: 1, padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                    <div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 8 }}>
                        <span style={{ fontSize: 10, fontWeight: 800, color: eventCategoryColors[event.category] || '#003580', background: '#f8fafc', padding: '2px 8px', borderRadius: 4, textTransform: 'uppercase' }}>{event.category}</span>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#888' }}>
                          <FiClock size={12} /> 09:30 AM
                        </div>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#888' }}>
                          <FiMapPin size={12} /> {lang === 'kn' ? 'ಆಡಿಟೋರಿಯಂ' : 'Main Auditorium'}
                        </div>
                      </div>
                      <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '1.15rem', color: '#1a1a2e' }}>
                         {lang === 'kn' ? 'ಕಾರ್ಯಕ್ರಮದ ಶೀರ್ಷಿಕೆ ಮತ್ತು ವಿವರಗಳು ಇಲ್ಲಿರುತ್ತವೆ' : event.title}
                      </h3>
                    </div>
                    
                    <button className="vs-btn vs-btn-outline" style={{ borderRadius: 8, gap: 6 }}>
                      {lang === 'kn' ? 'ನೋಂದಾಯಿಸಿ' : 'Register Now'} <FiChevronRight size={16} />
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

export default Events;

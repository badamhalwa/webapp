import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiMap, FiPlay, FiMaximize, FiNavigation } from 'react-icons/fi';

const VirtualTour = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const highlights = [
    { title: lang === 'kn' ? 'ಕ್ಲಿನಿಕಲ್ ಬ್ಲಾಕ್ (OPD)' : 'Main Clinical Block', desc: lang === 'kn' ? 'ನಮ್ಮ 9 ವಿಶೇಷ ವಿಭಾಗಗಳು ಮತ್ತು ರೋಗಿಗಳ ತಪಾಸಣಾ ಕೊಠಡಿಗಳು.' : "Explore our 9 specialized departments and outpatient facilities." },
    { title: lang === 'kn' ? 'ಲೆಕ್ಚರ್ ಹಾಲ್‌ಗಳು' : 'Smart Classrooms', desc: lang === 'kn' ? 'ಆಧುನಿಕ ತಂತ್ರಜ್ಞಾನ ಹೊಂದಿರುವ ಇ-ಲರ್ನಿಂಗ್ ತರಗತಿ ಕೊಠಡಿಗಳು.' : 'State-of-the-art smart lecture halls for interactive learning.' },
    { title: lang === 'kn' ? 'ಸಂಶೋಧನಾ ಕೇಂದ್ರ' : 'Research Labs', desc: lang === 'kn' ? 'ಅತ್ಯಾಧುನಿಕ ದಂತ ವೈದ್ಯಕೀಯ ಸಂಶೋಧನಾ ಪ್ರಯೋಗಾಲಯಗಳು.' : 'Discover our advanced labs dedicated to dental innovation.' },
    { title: lang === 'kn' ? 'ಹೈ-ಟೆಕ್ ಆಡಿಟೋರಿಯಂ' : 'Main Auditorium', desc: lang === 'kn' ? '800+ ಆಸನಗಳ ಸಾಮರ್ಥ್ಯ ಹೊಂದಿರುವ ಕಾರ್ಯಕ್ರಮಗಳ ಸಭಾಂಗಣ.' : 'A premium venue for international conferences and events.' },
  ];

  return (
    <div style={{ background: '#ffffff' }}>
      
      {/* ── Page Hero ── */}
      <section style={{ background: '#003580', padding: '3rem 2rem 2.5rem' }}>
        <div className="max-w-7xl mx-auto">
          <nav className="vs-breadcrumb" style={{ marginBottom: 10 }}>
            <a href="/" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: 12 }}>{t('nav.home')}</a>
            <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 6px', fontSize: 12 }}>/</span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{t('nav.virtualTour')}</span>
          </nav>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 10 }}>
            {t('nav.virtualTour')}
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif', maxWidth: 560, lineHeight: 1.7 }}>
            {lang === 'kn' ? 'ನಿಮ್ಮ ಮನೆಯಲ್ಲೇ ಕುಳಿತು ನಮ್ಮ ಕ್ಯಾಂಪಸ್‌ನ ಅದ್ಭುತ 360-ಡಿಗ್ರಿ ಪ್ರವಾಸವನ್ನು ಮಾಡಿ.' : "Experience our world-class infrastructure through an immersive 360-degree virtual walkthrough of the campus, clinics, and academic facilities."}
          </p>
        </div>
      </section>

      <div className="vs-section">
        <div className="max-w-7xl mx-auto">
          
          {/* Main Visualizer Container */}
          <div style={{ position: 'relative', width: '100%', height: '500px', background: '#001a40', borderRadius: '24px', overflow: 'hidden', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 20px 40px rgba(0,53,128,0.2)' }}>
             <img src="https://images.unsplash.com/photo-1629909613654-28e377c37b09?q=80&w=2070&auto=format&fit=crop" alt="Campus View" style={{ width: '100%', height: '100%', objectFit: 'cover', opacity: 0.4 }} />
             
             <div style={{ position: 'absolute', textAlign: 'center', color: '#fff', zIndex: 10 }}>
                <div style={{ width: 80, height: 80, borderRadius: '50%', background: 'rgba(255,255,255,0.2)', backdropFilter: 'blur(8px)', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px', cursor: 'pointer', transition: 'all 0.3s' }} className="cta-pulse">
                   <FiPlay size={32} fill="#fff" />
                </div>
                <h3 style={{ fontSize: '1.5rem', fontWeight: 800, marginBottom: 8 }}>{lang === 'kn' ? '360° ಶೋಧನೆ ಪ್ರಾರಂಭಿಸಿ' : 'Launch 360° Explorer'}</h3>
                <p style={{ fontSize: 14, opacity: 0.7 }}>{lang === 'kn' ? 'ದೃಶ್ಯ ಮ್ಯಾಪ್ ಮೂಲಕ ಕ್ಯಾಂಪಸ್ ನೋಡಿ' : 'Use interactive hotspots to navigate the building'}</p>
             </div>

             {/* Controls Overlay */}
             <div style={{ position: 'absolute', bottom: 20, right: 20, display: 'flex', gap: 10 }}>
                <button style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiMaximize size={18} /></button>
                <button style={{ width: 40, height: 40, background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', borderRadius: 8, display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiNavigation size={18} /></button>
             </div>
          </div>

          <div style={{ marginTop: 40 }}>
             <div className="vs-section-header">
                <div>
                   <div className="vs-section-title">{lang === 'kn' ? 'ಕ್ಯಾಂಪಸ್ ಹೈಲೈಟ್ಸ್' : 'Campus Highlights'}</div>
                </div>
             </div>
             
             <div className="vs-grid-4">
                {highlights.map((h, i) => (
                   <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                      <div className="vs-card" style={{ padding: '1.5rem', cursor: 'pointer' }}>
                         <div style={{ width: 40, height: 40, borderRadius: 8, background: '#f1f5f9', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                            <FiMap size={20} />
                         </div>
                         <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1a1a2e', marginBottom: 8 }}>{h.title}</h4>
                         <p style={{ fontSize: 11, color: '#64748b', lineHeight: 1.6 }}>{h.desc}</p>
                      </div>
                   </motion.div>
                ))}
             </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default VirtualTour;

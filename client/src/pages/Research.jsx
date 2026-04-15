import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FiBookOpen, FiActivity, FiUsers, FiAward, FiExternalLink, FiSearch, FiFilter, FiUser } from 'react-icons/fi';
import { researchPublications } from '../data/mockData';

const Research = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [searchTerm, setSearchTerm] = useState('');

  const highlights = [
    { title: lang === 'kn' ? 'ಅಂತರಾಷ್ಟ್ರೀಯ ಪಬ್ಲಿಕೇಶನ್ಸ್' : 'International Publications', count: '500+', icon: FiBookOpen, color: '#003580' },
    { title: lang === 'kn' ? 'ನಡೆಯುತ್ತಿರುವ ಯೋಜನೆಗಳು' : 'Ongoing Projects', count: '45+', icon: FiActivity, color: '#009688' },
    { title: lang === 'kn' ? 'ಸಂಶೋಧನಾ ತಂಡ' : 'Research Scholars', count: '120+', icon: FiUsers, color: '#7c3aed' },
    { title: lang === 'kn' ? 'ಪೇಟೆಂಟ್ ಪಡೆದ ಆವಿಷ್ಕಾರಗಳು' : 'Patents Filed', count: '12+', icon: FiAward, color: '#b45309' },
  ];

  const filteredPapers = researchPublications.filter(p => 
    p.title.toLowerCase().includes(searchTerm.toLowerCase()) || 
    p.authors.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div style={{ background: '#f8fafc' }}>
      
      {/* ── Page Hero ── */}
      <section style={{ background: '#003580', padding: '3rem 2rem 2.5rem' }}>
        <div className="max-w-7xl mx-auto">
          <nav className="vs-breadcrumb" style={{ marginBottom: 10 }}>
            <a href="/" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: 12 }}>{t('nav.home')}</a>
            <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 6px', fontSize: 12 }}>/</span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{t('nav.research')}</span>
          </nav>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 10 }}>
            {t('nav.research')} &amp; {lang === 'kn' ? 'ನಾವೀನ್ಯತೆ' : 'Innovation'}
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif', maxWidth: 560, lineHeight: 1.7 }}>
            {lang === 'kn' ? 'ದಂತ ವೈದ್ಯಕೀಯ ಕ್ಷೇತ್ರದಲ್ಲಿ ಹೊಸ ಆವಿಷ್ಕಾರಗಳು ಮತ್ತು ವೈಜ್ಞಾನಿಕ ಪ್ರಗತಿಗೆ ಬದ್ಧವಾಗಿರುವ ನಮ್ಮ ಸಂಶೋಧನಾ ಕೇಂದ್ರದ ಬಗ್ಗೆ ತಿಳಿಯಿರಿ.' : 'Advancing the frontiers of oral health through evidence-based research, clinical trials, and interdisciplinary collaboration.'}
          </p>
        </div>
      </section>

      {/* ── Highlights Grid ── */}
      <div className="vs-section">
        <div className="max-w-7xl mx-auto px-4">
          <div className="vs-grid-4">
            {highlights.map((h, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <div className="vs-card" style={{ padding: '2rem', textAlign: 'center', borderBottom: `4px solid ${h.color}`, background: '#fff' }}>
                  <div style={{ width: 50, height: 50, borderRadius: '50%', background: '#f8fafc', color: h.color, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <h.icon size={24} />
                  </div>
                  <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1a1a2e', marginBottom: 4 }}>{h.count}</div>
                  <div style={{ fontSize: 12, fontWeight: 700, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{h.title}</div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Faculty Research Search ── */}
      <div className="vs-section" style={{ background: '#fff' }}>
        <div className="max-w-7xl mx-auto px-4">
          <div className="vs-section-header">
            <div>
              <div className="vs-section-title">{lang === 'kn' ? 'ಬೋಧಕ ಸಿಬ್ಬಂದಿಯ ಸಂಶೋಧನೆ' : 'Faculty Research Gallery'}</div>
              <div className="vs-section-sub">{lang === 'kn' ? 'ನಮ್ಮ ಪ್ರಮುಖ ಸಂಶೋಧಕರು ಮತ್ತು ಅವರ ಪಬ್ಲಿಕೇಶನ್ಸ್.' : 'Explore published clinical research from our expert faculty members.'}</div>
            </div>
            
            <div style={{ position: 'relative', width: '100%', maxWidth: 400 }}>
              <FiSearch style={{ position: 'absolute', left: 16, top: '50%', transform: 'translateY(-50%)', color: '#64748b' }} />
              <input 
                type="text" 
                placeholder={lang === 'kn' ? 'ಶಿಕ್ಷಕರು ಅಥವಾ ವಿಷಯಗಳನ್ನು ಹುಡುಕಿ...' : 'Search teachers or topics...'} 
                className="vs-input" 
                style={{ paddingLeft: 44 }}
                value={searchTerm}
                onChange={e => setSearchTerm(e.target.value)}
              />
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(350px, 1fr))', gap: 24 }}>
            <AnimatePresence>
              {filteredPapers.map((paper, idx) => (
                <motion.div
                  key={idx}
                  layout
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, scale: 0.95 }}
                  transition={{ duration: 0.3 }}
                >
                  <div className="vs-card" style={{ padding: '24px', height: '100%', display: 'flex', flexDirection: 'column', borderLeft: '4px solid #003580' }}>
                    <div style={{ marginBottom: 16 }}>
                      <span style={{ fontSize: 10, fontWeight: 800, color: '#003580', background: '#e6f0fb', padding: '4px 10px', borderRadius: 6, textTransform: 'uppercase' }}>
                        {paper.department} • {paper.year}
                      </span>
                    </div>
                    <h4 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '1.1rem', color: '#1a1a2e', marginBottom: 12, lineHeight: 1.5 }}>
                      {paper.title}
                    </h4>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginTop: 'auto', paddingTop: 16, borderTop: '1px solid #f2f4f7' }}>
                      <div style={{ width: 32, height: 32, background: '#f1f5f9', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FiUser size={14} color="#64748b" />
                      </div>
                      <div>
                        <div style={{ fontSize: 11, color: '#888', fontWeight: 600 }}>Main Authors</div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#334155' }}>{paper.authors}</div>
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </AnimatePresence>
          </div>

          {filteredPapers.length === 0 && (
            <div style={{ textAlign: 'center', padding: '4rem 0' }}>
              <div style={{ color: '#64748b', fontSize: 16 }}>No publications found matching your search.</div>
            </div>
          )}
        </div>
      </div>

      {/* ── Research Focus ── */}
      <div className="vs-section-alt">
        <div className="max-w-7xl mx-auto px-4">
          <div className="vs-section-header">
            <div>
              <div className="vs-section-title">{lang === 'kn' ? 'ಸಂಶೋಧನಾ ಆದ್ಯತೆಗಳು' : 'Key Research Areas'}</div>
              <div className="vs-section-sub">{lang === 'kn' ? 'ಬೋಧಕ ಸಿಬ್ಬಂದಿ ಮತ್ತು ವಿದ್ಯಾರ್ಥಿಗಳು ತೊಡಗಿಸಿಕೊಂಡಿರುವ ಪ್ರಮುಖ ಕ್ಷೇತ್ರಗಳು.' : 'Core specializations driving clinical evidence and dental innovation.'}</div>
            </div>
          </div>
          <div className="vs-grid-3">
            {[
              { title: lang === 'kn' ? 'ಓರಲ್ ಕ್ಯಾನ್ಸರ್ ಸಂಶೋಧನೆ' : 'Oral Cancer Research', desc: lang === 'kn' ? 'ಬಾಯಿ ಕ್ಯಾನ್ಸರ್‌ನ ಆರಂಭಿಕ ಪತ್ತೆ ಮತ್ತು ಆಧುನಿಕ ಚಿಕಿತ್ಸಾ ಪದ್ಧತಿಗಳ ಬಗ್ಗೆ ಅಧ್ಯಯನ.' : 'Focusing on early detection and novel therapeutic approaches for oral squamous cell carcinoma.' },
              { title: lang === 'kn' ? 'ನವೀನ ಮೆಟೀರಿಯಲ್ಸ್' : 'Dental Biomaterials', desc: lang === 'kn' ? 'ದಂತ ಚಿಕಿತ್ಸೆಯಲ್ಲಿ ಬಳಸುವ ಹೊಸ ಮತ್ತು ಸುಧಾರಿತ ಮೆಟೀರಿಯಲ್‌ಗಳ ಸಂಶೋಧನೆ.' : 'Developing biocompatible materials for restorative dentistry and implantology.' },
              { title: lang === 'kn' ? 'ಸಾರ್ವಜನಿಕ ಆರೋಗ್ಯ' : 'Community Oral Health', desc: lang === 'kn' ? 'ಗ್ರಾಮೀಣ ಭಾಗದ ಮೌಖಿಕ ಆರೋಗ್ಯ ಸಮಸ್ಯೆಗಳು ಮತ್ತು ಅವುಗಳ ಪರಿಹಾರಗಳ ವಿಶ್ಲೇಷಣೆ.' : 'Epidemiological studies focused on oral health trends in rural Karnataka communities.' },
            ].map((area, idx) => (
              <div key={idx} className="vs-card" style={{ padding: '2rem', background: '#fff' }}>
                <h4 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '1.15rem', color: '#1a1a2e', marginBottom: 12 }}>{area.title}</h4>
                <p style={{ fontSize: 13, color: '#555e6b', lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>{area.desc}</p>
                <button className="vs-btn vs-btn-outline" style={{ marginTop: 20, fontSize: 11, padding: '8px 16px', borderRadius: 6 }}>
                  {lang === 'kn' ? 'ಹೆಚ್ಚಿನ ಮಾಹಿತಿ' : 'Learn More'} <FiExternalLink size={12} style={{ marginLeft: 6 }} />
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Research;

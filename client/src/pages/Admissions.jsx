import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiBookOpen, FiUserCheck, FiTarget, FiArrowRight, FiDownload } from 'react-icons/fi';

const Admissions = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const courses = [
    { name: 'BDS (Bachelor of Dental Surgery)', duration: '5 Years', seats: 100 },
    { name: 'MDS (Master of Dental Surgery)', duration: '3 Years', seats: 'Various' },
    { name: 'PhD Programs', duration: '3-5 Years', seats: 'Merit Based' },
  ];

  return (
    <div style={{ background: '#ffffff' }}>
      
      {/* ── Page Hero ── */}
      <section style={{ background: '#003580', padding: '3rem 2rem 2.5rem' }}>
        <div className="max-w-7xl mx-auto">
          <nav className="vs-breadcrumb" style={{ marginBottom: 10 }}>
            <a href="/" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: 12 }}>{t('nav.home')}</a>
            <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 6px', fontSize: 12 }}>/</span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{t('nav.admissions')}</span>
          </nav>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 10 }}>
            {t('nav.admissions')}
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif', maxWidth: 560, lineHeight: 1.7 }}>
            {lang === 'kn' ? 'ಶ್ರೇಷ್ಠ ದಂತ ವೈದ್ಯಕೀಯ ಶಿಕ್ಷಣ ಸಂಸ್ಥೆಯಲ್ಲಿ ನಿಮ್ಮ ವೃತ್ತಿಜೀವನವನ್ನು ಪ್ರಾರಂಭಿಸಿ. ನಮ್ಮ ಪ್ರವೇಶಾತಿ ಪ್ರಕ್ರಿಯೆ ಮತ್ತು ಕೋರ್ಸ್‌ಗಳ ಬಗ್ಗೆ ಇಲ್ಲಿ ತಿಳಿಯಿರಿ.' : 'Join one of the top dental institutions in India. Explore our academic programs, eligibility criteria, and admission procedures for the upcoming academic year.'}
          </p>
        </div>
      </section>

      <div className="vs-section">
        <div className="max-w-7xl mx-auto">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32, alignItems: 'start' }}>
            
            {/* Courses Table */}
            <div>
              <div className="vs-section-header">
                <div>
                  <div className="vs-section-title">{lang === 'kn' ? 'ಲಭ್ಯವಿರುವ ಕೋರ್ಸ್‌ಗಳು' : 'Available Programs'}</div>
                  <div className="vs-section-sub">{lang === 'kn' ? 'ಪದವಿ ಮತ್ತು ಸ್ನಾತಕೋತ್ತರ ದಂತ ವೈದ್ಯಕೀಯ ಶಿಕ್ಷಣ.' : 'Undergraduate, Postgraduate, and Doctoral programs.'}</div>
                </div>
              </div>
              <div className="vs-table-card">
                <table className="vs-table">
                  <thead>
                    <tr>
                      <th style={{ textAlign: 'left' }}>{lang === 'kn' ? 'ಕೋರ್ಸ್‌ನ ಹೆಸರು' : 'Program Name'}</th>
                      <th>{lang === 'kn' ? 'ಅವಧಿ' : 'Duration'}</th>
                      <th>{lang === 'kn' ? 'ಸೀಟುಗಳು' : 'Seats'}</th>
                    </tr>
                  </thead>
                  <tbody>
                    {courses.map((c, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 700, color: '#1a1a2e' }}>{c.name}</td>
                        <td style={{ textAlign: 'center' }}>{lang === 'kn' ? (c.duration === '5 Years' ? '5 ವರ್ಷಗಳು' : c.duration === '3 Years' ? '3 ವರ್ಷಗಳು' : '3-5 ವರ್ಷಗಳು') : c.duration}</td>
                        <td style={{ textAlign: 'center' }}>{lang === 'kn' ? (c.seats === 100 ? '100' : 'ಲಭ್ಯತೆ' ) : c.seats}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Admission Process */}
            <div className="vs-card" style={{ padding: '2rem' }}>
              <div className="vs-section-header" style={{ marginBottom: 24 }}>
                <div className="vs-section-title">{lang === 'kn' ? 'ಪ್ರವೇಶಾತಿ ಪ್ರಕ್ರಿಯೆ' : 'How to Apply'}</div>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                {[
                  { step: '01', title: lang === 'kn' ? 'ಅರ್ಹತೆಯ ಪರಿಶೀಲನೆ' : 'Check Eligibility', desc: lang === 'kn' ? 'NEET ಪರೀಕ್ಷೆಯ ಅಂಕಗಳು ಮತ್ತು ಅಕಾಡೆಮಿಕ್ ಅರ್ಹತೆಯನ್ನು ಪರಿಶೀಲಿಸಿ.' : 'Verify that you meet the NEET scores and academic requirements for the selected course.' },
                  { step: '02', title: lang === 'kn' ? 'ಅರ್ಜಿ ಸಲ್ಲಿಕೆ' : 'Submit Application', desc: lang === 'kn' ? 'ಆನ್‌ಲೈನ್ ಮೂಲಕ ಅಥವಾ ಕಾಲೇಜು ಕಚೇರಿಯಲ್ಲಿ ಅರ್ಜಿಯನ್ನು ಸಲ್ಲಿಸಿ.' : 'Apply through the official KEA counseling portal or our institutional admission forms.' },
                  { step: '03', title: lang === 'kn' ? 'ದಾಖಲಾತಿ ಪರಿಶೀಲನೆ' : 'Document Verification', desc: lang === 'kn' ? 'ಅಗತ್ಯವಿರುವ ಎಲ್ಲಾ ಮೂಲ ದಾಖಲೆಗಳನ್ನು ಸಲ್ಲಿಸಿ ಮತ್ತು ಪರಿಶೀಲಿಸಿಕೊಳ್ಳಿ.' : 'Submit original certificates and identity documents for verification during the intake session.' },
                ].map((s, i) => (
                  <div key={i} style={{ display: 'flex', gap: 16 }}>
                    <div style={{ width: 36, height: 36, borderRadius: '50%', background: '#e6f0fb', color: '#003580', display: 'flex', alignItems: 'center', justifyContent: 'center', fontWeight: 800, fontSize: 12, flexShrink: 0 }}>
                      {s.step}
                    </div>
                    <div>
                      <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1a1a2e', marginBottom: 4 }}>{s.title}</h4>
                      <p style={{ fontSize: 12, color: '#555e6b', lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>{s.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
              <div style={{ marginTop: 32, display: 'flex', gap: 12 }}>
                <button className="vs-btn vs-btn-primary" style={{ flex: 1, justifyContent: 'center', borderRadius: 6 }}>
                  {lang === 'kn' ? 'ಈಗಲೇ ಅರ್ಜಿ ಸಲ್ಲಿಸಿ' : 'Apply Online'}
                </button>
                <button className="vs-btn vs-btn-outline" style={{ flex: 1, justifyContent: 'center', borderRadius: 6, gap: 8 }}>
                  <FiDownload size={14} /> {lang === 'kn' ? 'ಮಾಹಿತಿ ಪುಸ್ತಕ' : 'Prospectus'}
                </button>
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default Admissions;

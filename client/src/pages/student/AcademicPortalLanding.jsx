import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiUser, FiBookOpen, FiSearch, FiHome } from 'react-icons/fi';
import { newsItems, achievements } from '../../data/mockData';

const barColors = { Achievement: '#009688', Event: '#003580', Infrastructure: '#e8282b', Research: '#7c3aed', Admissions: '#f59e0b' };

const AcademicPortalLanding = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} transition={{ duration: 0.3 }} style={{ background: '#ffffff', minHeight: '100vh' }}>
      {/* ACADEMIC HERO */}
      <section className="vs-hero" style={{ minHeight: 280, background: 'linear-gradient(135deg, #3c3489 0%, #2b2463 100%)', color: '#fff', paddingTop: '4rem', paddingBottom: '3rem', position: 'relative' }}>
        <div style={{ position: 'absolute', top: '1.5rem', right: '1.5rem' }}>
          <button 
            onClick={() => {
              localStorage.removeItem('rrdch-student-auth');
              window.location.reload();
            }}
            style={{ fontSize: 11, fontWeight: 700, color: '#3c3489', background: '#fff', padding: '6px 12px', borderRadius: 6, cursor: 'pointer', border: 'none', textTransform: 'uppercase' }}
          >
            Logout
          </button>
        </div>
        <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ width: '100%', maxWidth: '800px', margin: '0 auto', textAlign: 'center' }}>
          <div className="vs-hero-eyebrow" style={{ background: 'rgba(255,255,255,0.1)', color: '#d8b4fe', margin: '0 auto 1rem', display: 'inline-block' }}>RRDCH ACADEMY</div>
          <h1 className="vs-hero-title" style={{ color: '#fff', fontSize: '2.5rem', marginBottom: '1rem' }}>
            {lang === 'kn' ? 'ಶೈಕ್ಷಣಿಕ ಮತ್ತು ವಿದ್ಯಾರ್ಥಿ ಪೋರ್ಟಲ್' : 'Academic & Student Portal'}
          </h1>
          <p className="vs-hero-sub" style={{ color: 'rgba(255,255,255,0.8)', margin: '0 auto 2rem' }}>
            {lang === 'kn' ? 'ಉತ್ತಮ ದಂತ ಶಿಕ್ಷಣಕ್ಕಾಗಿ ಕೇಂದ್ರ.' : 'Empowering the next generation of dental professionals with world-class education and resources.'}
          </p>
        </motion.div>
      </section>

      {/* ACADEMIC SERVICES */}
      <div className="vs-section">
        <div className="max-w-7xl mx-auto px-4">
          <div className="vs-section-header">
            <div>
              <div className="vs-section-title">{lang === 'kn' ? 'ವಿದ್ಯಾರ್ಥಿ ಸಂಪನ್ಮೂಲಗಳು' : 'Student Resources'}</div>
              <div className="vs-section-sub">{lang === 'kn' ? 'ನಿಮ್ಮ ಶೈಕ್ಷಣಿಕ ಪ್ರಯಾಣಕ್ಕಾಗಿ' : 'Everything you need for your academic journey'}</div>
            </div>
          </div>
          <div className="vs-grid-4">
            {[
              { Icon: FiUser, label: t('nav.studentDashboard'), path: '/student/dashboard', color: '#6b21a8', bg: '#f3e8ff' },
              { Icon: FiBookOpen, label: t('nav.syllabus'), path: '/student/syllabus', color: '#1d4ed8', bg: '#dbeafe' },
              { Icon: FiSearch, label: t('nav.research'), path: '/research', color: '#15803d', bg: '#dcfce7' },
              { Icon: FiHome, label: t('nav.hostelComplaints'), path: '/student/hostel', color: '#b45309', bg: '#fef3c7' },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Link to={item.path} style={{ textDecoration: 'none' }}>
                  <div className="vs-accent-card" style={{ cursor: 'pointer', height: '100%', borderTop: `4px solid ${item.color}` }}>
                    <div style={{ marginBottom: 16, background: item.bg, width: 48, height: 48, display: 'flex', alignItems: 'center', justifyContent: 'center', borderRadius: 12 }}>
                      <item.Icon size={24} color={item.color} />
                    </div>
                    <div className="vs-accent-title">{item.label}</div>
                    <div className="vs-accent-sub">Access your personal student information and tools.</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* NEWS AND ACHIEVEMENTS */}
      <div className="vs-section-alt">
        <div className="max-w-7xl mx-auto px-4">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>
            <div>
              <div className="vs-section-header">
                <div className="vs-section-title">{t('home.latestNews')}</div>
                <Link to="/events" className="vs-section-link">{t('home.viewAll')}</Link>
              </div>
              <div className="vs-notice-list">
                {newsItems.slice(0, 5).map((item, i) => (
                  <div key={i} className="vs-notice-item">
                    <div className="vs-notice-bar" style={{ background: barColors[item.category] || '#003580' }} />
                    <div>
                      <div className="vs-notice-text">{lang === 'kn' ? 'ನೋಟಿಸ್ ವಿವರಗಳು.' : item.title}</div>
                      <div className="vs-notice-time" style={{ display: 'flex', gap: 6, marginTop: 3 }}>
                        <span className="vs-badge vs-badge-blue">{item.category}</span>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            <div>
              <div className="vs-section-header">
                <div className="vs-section-title">{t('home.achievements')}</div>
                <Link to="/achievements" className="vs-section-link">{t('home.viewAll')}</Link>
              </div>
              <div className="vs-table-card">
                <table className="vs-table">
                  <thead><tr><th>Honour</th><th>Year</th></tr></thead>
                  <tbody>
                    {achievements.slice(0, 4).map((a, i) => (
                      <tr key={i}>
                        <td style={{ fontWeight: 600, fontSize: 12 }}>{a.title}</td>
                        <td>{a.year || '2024'}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default AcademicPortalLanding;

import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { FiUser, FiActivity, FiAward, FiArrowRight } from 'react-icons/fi';
import { departments } from '../data/mockData';
import principalImg from '../assets/principal.png';

const Faculty = () => {
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
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{t('nav.faculty')}</span>
          </nav>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 10 }}>
            {t('faculty.title')}
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif', maxWidth: 560, lineHeight: 1.7 }}>
            {lang === 'kn' ? 'ನಮ್ಮ ಕಾಲೇಜಿನ ಅತ್ಯಂತ ಅನುಭವಿ ಮತ್ತು ಪ್ರಸಿದ್ಧ ದಂತ ವೈದ್ಯಕೀಯ ಬೋಧಕ ಸಿಬ್ಬಂದಿಯ ತಂಡ ಇಲ್ಲಿದೆ.' : 'Meet our team of highly qualified clinicians, researchers, and dedicated educators shaping the future of dentistry.'}
          </p>
        </div>
      </section>

      {/* ── Principal Highlight ── */}
      <div className="vs-section">
        <div className="max-w-7xl mx-auto">
          <div className="vs-card" style={{ padding: '3rem', cursor: 'default', display: 'grid', gridTemplateColumns: '1fr 2fr', gap: 48, alignItems: 'center' }}>
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 220, height: 220, borderRadius: '50%', background: '#003580', padding: 4, margin: '0 auto 24px', position: 'relative' }}>
                <img src={principalImg} alt="Dr. Girish H.C." style={{ width: '100%', height: '100%', objectFit: 'cover', borderRadius: '50%' }} />
              </div>
              <h2 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1a1a2e' }}>{t('about.principalTitle')}</h2>
              <div style={{ color: '#003580', fontWeight: 700, fontSize: 12, marginTop: 4 }}>{t('about.principalRole')}</div>
            </div>
            <div>
              <div className="vs-badge vs-badge-blue" style={{ marginBottom: 12 }}>{t('faculty.leadership')}</div>
              <h3 style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1a1a2e', marginBottom: 16 }}>{t('faculty.academicExcellence')}</h3>
              <p style={{ fontSize: 14, color: '#555e6b', lineHeight: 1.8, marginBottom: 24, fontFamily: 'Inter, sans-serif' }}>
                 {lang === 'kn' ? 'ಡಾ. ಗಿರೀಶ್ ಹೆಚ್.ಸಿ. ಅವರ ನಾಯಕತ್ವದಲ್ಲಿ ನಮ್ಮ ಸಂಸ್ಥೆಯು ದಂತ ಶಿಕ್ಷಣ ಕ್ಷೇತ್ರದಲ್ಲಿ ಹೊಸ ಮೈಲಿಗಲ್ಲುಗಳನ್ನು ತಲುಪುತ್ತಿದೆ. ಅವರ ವೈಜ್ಞಾನಿಕ ದೂರದೃಷ್ಟಿ ಮತ್ತು ಶೈಕ್ಷಣಿಕ ಅನುಭವವು ನಮ್ಮ ವಿದ್ಯಾರ್ಥಿಗಳಿಗೆ ಮಾರ್ಗದರ್ಶಕವಾಗಿದೆ.' : 'Under the visionary leadership of Dr. Girish H.C., RRDCH has consistently achieved top national rankings. His commitment to research-driven education and patient-centric clinical practices serves as the foundation of our academic excellence.'}
              </p>
              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16 }}>
                 <div style={{ padding: '12px', background: '#f8fafc', borderRadius: 12 }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#003580' }}>25+</div>
                    <div style={{ fontSize: 10, color: '#888', textTransform: 'uppercase' }}>{lang === 'kn' ? 'ವರ್ಷಗಳ ಅನುಭವ' : 'Years Experience'}</div>
                 </div>
                 <div style={{ padding: '12px', background: '#f8fafc', borderRadius: 12 }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#003580' }}>100+</div>
                    <div style={{ fontSize: 10, color: '#888', textTransform: 'uppercase' }}>{lang === 'kn' ? 'ಪಬ್ಲಿಕೇಶನ್ಸ್' : 'Publications'}</div>
                 </div>
                 <div style={{ padding: '12px', background: '#f8fafc', borderRadius: 12 }}>
                    <div style={{ fontSize: 18, fontWeight: 800, color: '#003580' }}>PhD</div>
                    <div style={{ fontSize: 10, color: '#888', textTransform: 'uppercase' }}>{lang === 'kn' ? 'ಮಾರ್ಗದರ್ಶಕರು' : 'Doctorate'}</div>
                 </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Departments List ── */}
      <div className="vs-section-alt">
        <div className="max-w-7xl mx-auto">
          <div className="vs-section-header">
            <div>
              <div className="vs-section-title">{t('faculty.deptFaculty')}</div>
              <div className="vs-section-sub">{t('faculty.clinicalSpecialists')}</div>
            </div>
          </div>
          
          <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
             {departments.map((dept, i) => (
                <motion.div key={dept.id} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                   <div className="vs-card" style={{ padding: '1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 20 }}>
                         <div style={{ width: 44, height: 44, borderRadius: 10, background: '#f1f5f9', color: '#003580', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                            <FiActivity size={20} />
                         </div>
                         <div>
                            <h4 style={{ fontSize: 15, fontWeight: 800, color: '#1a1a2e' }}>{t(`depts.d${dept.id}`)}</h4>
                            <div style={{ fontSize: 12, color: '#555e6b' }}>{lang === 'kn' ? `ವಿಭಾಗ ಮುಖ್ಯಸ್ಥರು: ${dept.hod}` : `Led by ${dept.hod}`}</div>
                         </div>
                      </div>
                      <div style={{ display: 'flex', gap: 24, alignItems: 'center' }}>
                         <div style={{ textAlign: 'center' }}>
                            <div style={{ fontSize: 11, color: '#888', textTransform: 'uppercase' }}>{t('faculty.facultyMembers')}</div>
                            <div style={{ fontSize: 14, fontWeight: 800, color: '#1a1a2e' }}>{dept.faculty}</div>
                         </div>
                         <Link to="/departments">
                           <button className="vs-btn vs-btn-outline" style={{ borderRadius: 8, gap: 6, fontSize: 12 }}>
                              {lang === 'kn' ? 'ಯಾದಿ ನೋಡಿ' : 'View Team'} <FiArrowRight size={14} />
                           </button>
                         </Link>
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

export default Faculty;

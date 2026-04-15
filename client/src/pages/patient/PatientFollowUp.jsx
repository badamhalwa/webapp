import React from 'react';
import { useTranslation } from 'react-i18next';
import { FiClipboard, FiClock, FiCalendar, FiActivity, FiArrowRight } from 'react-icons/fi';

const PatientFollowUp = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const mockVisits = [
    { id: '1', date: '2024-03-15', dept: t('depts.d2'), status: t('appointment.statusCompleted'), doctor: 'Dr. Smith', notes: lang === 'kn' ? 'ರೂಟ್ ಕೆನಾಲ್ ಚಿಕಿತ್ಸೆ ಪೂರ್ಣಗೊಂಡಿದೆ.' : 'Root canal treatment completed.' },
    { id: '2', date: '2024-04-10', dept: t('depts.d3'), status: t('appointment.statusConfirmed'), doctor: 'Dr. Jones', notes: lang === 'kn' ? 'ಬ್ರೇಸ್ ಅಡ್ಜಸ್ಟ್ಮೆಂಟ್ ಭೇಟಿ.' : 'Braces adjustment scheduled.' },
  ];

  return (
    <div style={{ background: '#ffffff' }}>
      
      {/* ── Page Hero ── */}
      <section style={{ background: '#003580', padding: '3rem 2rem 2.5rem' }}>
        <div className="max-w-7xl mx-auto">
          <nav className="vs-breadcrumb" style={{ marginBottom: 10 }}>
            <a href="/" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: 12 }}>{t('nav.home')}</a>
            <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 6px', fontSize: 12 }}>/</span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{t('nav.followUp')}</span>
          </nav>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 10 }}>
            {t('followup.title')}
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif', maxWidth: 560, lineHeight: 1.7 }}>
            {t('followup.subtitle')}
          </p>
        </div>
      </section>

      <div className="vs-section">
        <div className="max-w-7xl mx-auto">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: 32 }}>
            
            {/* Sidebar Stats */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              <div className="vs-card" style={{ padding: '1.5rem' }}>
                <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1a1a2e', marginBottom: 16, borderBottom: '1px solid #f2f4f7', paddingBottom: 8 }}>{t('followup.registry')}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ background: '#f8fafc', padding: '12px', borderRadius: 8 }}>
                    <div style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', fontWeight: 800 }}>{t('followup.totalVisits')}</div>
                    <div style={{ fontSize: '1.5rem', fontWeight: 800, color: '#003580' }}>14</div>
                  </div>
                  <div style={{ background: '#f8fafc', padding: '12px', borderRadius: 8 }}>
                    <div style={{ fontSize: 11, color: '#64748b', textTransform: 'uppercase', fontWeight: 800 }}>{lang === 'kn' ? 'ಕೊನೆಯ ಭೇಟಿ' : 'Last Encounter'}</div>
                    <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1a2e', marginTop: 4 }}>15 Mar 2024</div>
                  </div>
                </div>
              </div>

              <div className="vs-card" style={{ padding: '1.5rem', background: '#003580', color: '#fff' }}>
                <FiActivity size={24} style={{ marginBottom: 12, opacity: 0.8 }} />
                <h3 style={{ fontSize: 14, fontWeight: 700, marginBottom: 8 }}>{lang === 'kn' ? 'ಆರೋಗ್ಯ ನೆರವು' : 'Health Support'}</h3>
                <p style={{ fontSize: 12, lineHeight: 1.6, opacity: 0.7, marginBottom: 16 }}>{lang === 'kn' ? 'ನಿಮ್ಮ ಚಿಕಿತ್ಸಾ ವಿವರಗಳ ಬಗ್ಗೆ ಹೆಚ್ಚಿನ ಮಾಹಿತಿ ಬೇಕಾದಲ್ಲಿ ನಮ್ಮ ಸಹಾಯವಾಣಿಗೆ ಕರೆ ಮಾಡಿ.' : 'Need help understanding your clinical summary? Contact our medical helpline.'}</p>
                <button className="vs-btn vs-btn-outline" style={{ width: '100%', borderColor: 'rgba(255,255,255,0.3)', color: '#fff' }}>{lang === 'kn' ? 'ಸಹಾಯವಾಣಿ' : 'Call Helpdesk'}</button>
              </div>
            </div>

            {/* Main Registry */}
            <div>
              <div className="vs-section-header">
                <div>
                  <div className="vs-section-title">{t('followup.history')}</div>
                  <div className="vs-section-sub">{t('followup.registrySub')}</div>
                </div>
              </div>
              
              <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
                {mockVisits.map((visit) => (
                  <div key={visit.id} className="vs-card" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: 16 }}>
                      <div style={{ display: 'flex', gap: 12, alignItems: 'center' }}>
                         <div style={{ width: 40, height: 40, borderRadius: 8, background: '#f1f5f9', color: '#475569', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                           <FiCalendar size={20} />
                         </div>
                         <div>
                           <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1a2e' }}>{visit.dept}</div>
                           <div style={{ fontSize: 12, color: '#64748B' }}>{visit.doctor}</div>
                         </div>
                      </div>
                      <div className={`vs-badge ${visit.status === t('appointment.statusCompleted') ? 'vs-badge-teal' : 'vs-badge-blue'}`}>
                        {visit.status}
                      </div>
                    </div>
                    
                    <div style={{ background: '#f8fafc', padding: '12px 16px', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ fontSize: 13, color: '#334155' }}>
                        <strong style={{ display: 'block', fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 4 }}>{lang === 'kn' ? 'ಟಿಪ್ಪಣಿಗಳು' : 'Clinical Notes'}</strong>
                        {visit.notes}
                      </div>
                      <button className="vs-btn vs-btn-outline" style={{ padding: '6px 12px', fontSize: 11, gap: 6 }}>
                        {t('common.download')} PDF <FiArrowRight size={12} />
                      </button>
                    </div>
                  </div>
                ))}
              </div>
            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default PatientFollowUp;

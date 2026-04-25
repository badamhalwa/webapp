import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FiClipboard, FiClock, FiCalendar, FiActivity, FiArrowRight, FiSearch, FiUser, FiCheckCircle, FiLogOut } from 'react-icons/fi';
import toast from 'react-hot-toast';

const PatientFollowUp = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const [step, setStep] = useState('lookup'); // 'lookup' or 'registry'
  const [patientId, setPatientId] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const mockVisits = [
    { id: '1', date: '2024-03-15', dept: t('depts.d2'), status: t('appointment.statusCompleted'), doctor: 'Dr. Smith', notes: lang === 'kn' ? 'ರೂಟ್ ಕೆನಾಲ್ ಚಿಕಿತ್ಸೆ ಪೂರ್ಣಗೊಂಡಿದೆ.' : 'Root canal treatment completed.' },
    { id: '2', date: '2024-04-10', dept: t('depts.d3'), status: t('appointment.statusConfirmed'), doctor: 'Dr. Jones', notes: lang === 'kn' ? 'ಬ್ರೇಸ್ ಅಡ್ಜಸ್ಟ್ಮೆಂಟ್ ಭೇಟಿ.' : 'Braces adjustment scheduled.' },
  ];

  const handleLookup = (e) => {
    e.preventDefault();
    if (!patientId.trim()) {
      toast.error(lang === 'kn' ? 'ದಯವಿಟ್ಟು ರೋಗಿಯ ಐಡಿ ನಮೂದಿಸಿ' : 'Please enter a Patient ID or Phone Number');
      return;
    }
    
    setIsLoading(true);
    // Simulate API call to fetch patient history
    setTimeout(() => {
      setIsLoading(false);
      setStep('registry');
      toast.success(lang === 'kn' ? 'ರೋಗಿಯ ದಾಖಲೆಗಳನ್ನು ಪಡೆಯಲಾಗಿದೆ!' : 'Patient records retrieved successfully!');
    }, 1200);
  };

  const handleScheduleFollowUp = (dept) => {
    // In a real app, this might navigate to the booking page with pre-filled details
    // or open a modal to select a specific date/time for the follow-up.
    toast.success(
      lang === 'kn' 
        ? `${dept} ವಿಭಾಗಕ್ಕೆ ಫಾಲೋ-ಅಪ್ ವಿನಂತಿಯನ್ನು ಕಳುಹಿಸಲಾಗಿದೆ!` 
        : `Follow-up requested for ${dept}! Our team will contact you shortly.`
    );
  };

  const handleLogout = () => {
    setStep('lookup');
    setPatientId('');
  };

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
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

      <div className="vs-section" style={{ flex: 1 }}>
        <div className="max-w-7xl mx-auto">
          <AnimatePresence mode="wait">
            
            {/* ── STEP 1: PATIENT LOOKUP ── */}
            {step === 'lookup' && (
              <motion.div 
                key="lookup"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                style={{ maxWidth: '500px', margin: '0 auto', paddingTop: '2rem' }}
              >
                <div className="vs-card" style={{ padding: '2.5rem', textAlign: 'center', boxShadow: '0 12px 32px rgba(0,53,128,0.08)' }}>
                  <div style={{ width: 64, height: 64, background: '#e6f0fb', color: '#003580', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 1.5rem' }}>
                    <FiSearch size={28} />
                  </div>
                  
                  <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1a1a2e', marginBottom: '0.5rem' }}>
                    {lang === 'kn' ? 'ನಿಮ್ಮ ದಾಖಲೆಗಳನ್ನು ಹುಡುಕಿ' : 'Find Your Records'}
                  </h2>
                  <p style={{ fontSize: '14px', color: '#64748b', marginBottom: '2rem', lineHeight: 1.5 }}>
                    {lang === 'kn' 
                      ? 'ನಿಮ್ಮ ಹಿಂದಿನ ಭೇಟಿಗಳನ್ನು ನೋಡಲು ನಿಮ್ಮ ಆಸ್ಪತ್ರೆಯ ಐಡಿ ಅಥವಾ ನೋಂದಾಯಿತ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ನಮೂದಿಸಿ.' 
                      : 'Enter your Hospital Patient ID (UHID) or registered mobile number to retrieve your clinical history.'}
                  </p>

                  <form onSubmit={handleLookup} style={{ textAlign: 'left' }}>
                    <div style={{ marginBottom: '1.5rem' }}>
                      <label style={{ display: 'block', fontSize: '12px', fontWeight: 700, color: '#475569', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                        {lang === 'kn' ? 'ರೋಗಿಯ ಐಡಿ / ಫೋನ್ ಸಂಖ್ಯೆ' : 'Patient ID / Phone Number'}
                      </label>
                      <input 
                        type="text" 
                        value={patientId}
                        onChange={(e) => setPatientId(e.target.value)}
                        className="vs-input" 
                        placeholder="e.g. UHID-12345 or 9876543210"
                        style={{ width: '100%', fontSize: '15px' }}
                      />
                    </div>
                    <button 
                      type="submit" 
                      className="vs-btn vs-btn-primary" 
                      style={{ width: '100%', justifyContent: 'center', height: '48px', fontSize: '15px' }}
                      disabled={isLoading}
                    >
                      {isLoading ? (
                        <div style={{ width: 20, height: 20, border: '2px solid rgba(255,255,255,0.3)', borderTopColor: '#fff', borderRadius: '50%', animation: 'spin 1s linear infinite' }} />
                      ) : (
                        lang === 'kn' ? 'ದಾಖಲೆಗಳನ್ನು ಪಡೆಯಿರಿ' : 'Retrieve Records'
                      )}
                    </button>
                  </form>
                </div>
              </motion.div>
            )}

            {/* ── STEP 2: REGISTRY AND HISTORY ── */}
            {step === 'registry' && (
              <motion.div 
                key="registry"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                transition={{ duration: 0.3 }}
                style={{ display: 'grid', gridTemplateColumns: '1fr 3fr', gap: 32 }}
              >
                {/* Sidebar Stats */}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                  <div className="vs-card" style={{ padding: '1.5rem' }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderBottom: '1px solid #f2f4f7', paddingBottom: 12, marginBottom: 16 }}>
                      <h3 style={{ fontSize: 14, fontWeight: 700, color: '#1a1a2e' }}>
                        {t('followup.registry')}
                      </h3>
                      <button 
                        onClick={handleLogout}
                        style={{ background: 'none', border: 'none', color: '#64748b', cursor: 'pointer', display: 'flex', alignItems: 'center', gap: 4, fontSize: 12, fontWeight: 600 }}
                      >
                        <FiLogOut size={14} /> Exit
                      </button>
                    </div>
                    
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
                  <div className="vs-section-header" style={{ marginBottom: '1.5rem' }}>
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
                            <div style={{ width: 44, height: 44, borderRadius: 10, background: '#f1f5f9', color: '#003580', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                              <FiCalendar size={20} />
                            </div>
                            <div>
                              <div style={{ fontSize: 15, fontWeight: 800, color: '#1a1a2e', marginBottom: 2 }}>{visit.dept}</div>
                              <div style={{ fontSize: 12, color: '#64748B', display: 'flex', gap: 8, alignItems: 'center' }}>
                                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><FiUser size={12}/> {visit.doctor}</span>
                                <span>•</span>
                                <span style={{ display: 'flex', alignItems: 'center', gap: 4 }}><FiClock size={12}/> {visit.date}</span>
                              </div>
                            </div>
                          </div>
                          <div className={`vs-badge ${visit.status === t('appointment.statusCompleted') ? 'vs-badge-teal' : 'vs-badge-blue'}`}>
                            {visit.status}
                          </div>
                        </div>
                        
                        <div style={{ background: '#f8fafc', padding: '16px', borderRadius: 8, display: 'flex', justifyContent: 'space-between', alignItems: 'center', gap: 16 }}>
                          <div style={{ fontSize: 13, color: '#334155', flex: 1 }}>
                            <strong style={{ display: 'block', fontSize: 11, color: '#94a3b8', textTransform: 'uppercase', marginBottom: 6 }}>{lang === 'kn' ? 'ಕ್ಲಿನಿಕಲ್ ಟಿಪ್ಪಣಿಗಳು' : 'Clinical Notes'}</strong>
                            {visit.notes}
                          </div>
                          
                          <div style={{ display: 'flex', gap: 12 }}>
                            <button className="vs-btn vs-btn-outline" style={{ padding: '8px 14px', fontSize: 12, gap: 6 }}>
                              {t('common.download')}
                            </button>
                            <button 
                              onClick={() => handleScheduleFollowUp(visit.dept)}
                              className="vs-btn vs-btn-primary" 
                              style={{ padding: '8px 16px', fontSize: 12, gap: 6 }}
                            >
                              <FiCheckCircle size={14} /> 
                              {lang === 'kn' ? 'ಫಾಲೋ-ಅಪ್ ಬುಕ್ ಮಾಡಿ' : 'Schedule Follow-up'}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </div>

    </div>
  );
};

export default PatientFollowUp;

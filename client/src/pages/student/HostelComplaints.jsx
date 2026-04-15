import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiSend, FiList, FiCheckCircle, FiAlertCircle, FiShield, FiFileText } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

const HostelComplaints = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [form, setForm] = useState({ name: '', room: '', category: '', description: '' });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const categories = [
    { id: 'electrical', label: lang === 'kn' ? 'ವಿದ್ಯುತ್ ಸಮಸ್ಯೆ' : 'Electrical' },
    { id: 'plumbing', label: lang === 'kn' ? 'ಪ್ಲಂಬಿಂಗ್ ಸಮಸ್ಯೆ' : 'Plumbing' },
    { id: 'cleaning', label: lang === 'kn' ? 'ಶೌಚಾಲಯ ಮತ್ತು ಸ್ವಚ್ಛತೆ' : 'Cleaning & Hygiene' },
    { id: 'wifi', label: lang === 'kn' ? 'ಇಂಟರ್ನೆಟ್ / ವೈ-ಫೈ' : 'Wi-Fi / Internet' },
    { id: 'others', label: lang === 'kn' ? 'ಇತರೆ' : 'Others' },
  ];

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!form.category) {
      toast.error(lang === 'kn' ? 'ದಯವಿಟ್ಟು ವರ್ಗವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ' : 'Please select a category');
      return;
    }
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      toast.success(lang === 'kn' ? 'ದೂರನ್ನು ಯಶಸ್ವಿಯಾಗಿ ಸಲ್ಲಿಸಲಾಗಿದೆ' : 'Complaint submitted successfully');
    }, 1500);
  };

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh' }}>
      <Toaster position="top-right" />
      
      {/* ── Page Hero ── */}
      <section style={{ background: '#003580', padding: '3rem 2rem 2.5rem' }}>
        <div className="max-w-7xl mx-auto">
          <nav className="vs-breadcrumb" style={{ marginBottom: 10 }}>
            <a href="/" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: 12 }}>{t('nav.home')}</a>
            <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 6px', fontSize: 12 }}>/</span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{t('nav.hostelComplaints')}</span>
          </nav>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 10 }}>
            {lang === 'kn' ? 'ವಸತಿ ನಿಲಯದ ದೂರು ಕೇಂದ್ರ' : 'Hostel Help Desk'}
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif', maxWidth: 560, lineHeight: 1.7 }}>
            {lang === 'kn' ? 'ವಸತಿ ನಿಲಯದಲ್ಲಿನ ಯಾವುದೇ ನಿರ್ವಹಣೆ ಮತ್ತು ಇತರ ಸಮಸ್ಯೆಗಳನ್ನು ಇಲ್ಲಿ ವರದಿ ಮಾಡಿ.' : 'Report maintenance issues, electrical problems, or facility requests directly to the hostel management.'}
          </p>
        </div>
      </section>

      <div className="vs-section">
        <div className="max-w-7xl mx-auto px-4">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: 32, alignItems: 'start' }}>
            
            {/* Form Area */}
            <div>
              <AnimatePresence mode="wait">
                {!submitted ? (
                  <motion.div
                    key="form"
                    initial={{ opacity: 0, y: 10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, scale: 0.98 }}
                    className="vs-card"
                    style={{ padding: '2.5rem' }}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12, marginBottom: 24, borderBottom: '1px solid #f2f4f7', paddingBottom: 16 }}>
                      <div style={{ width: 40, height: 40, borderRadius: 10, background: '#e6f0fb', color: '#003580', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                        <FiFileText size={20} />
                      </div>
                      <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '1.25rem', color: '#1a1a2e' }}>{lang === 'kn' ? 'ಹೊಸ ದೂರು ಸಲ್ಲಿಸಿ' : 'Submit New Complaint'}</h2>
                    </div>
                    
                    <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                        <div className="vs-form-group">
                          <label className="vs-label">{lang === 'kn' ? 'ವಿದ್ಯಾರ್ಥಿಯ ಹೆಸರು' : 'Student Name'}</label>
                          <input className="vs-input" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} required placeholder="e.g. Akash Kumar" />
                        </div>
                        <div className="vs-form-group">
                          <label className="vs-label">{lang === 'kn' ? 'ಕೊಠಡಿ ಸಂಖ‍್ಯೆ' : 'Room Number'}</label>
                          <input className="vs-input" value={form.room} onChange={e=>setForm({...form, room: e.target.value})} required placeholder="e.g. B-302" />
                        </div>
                      </div>

                      <div className="vs-form-group">
                        <label className="vs-label">{lang === 'kn' ? 'ವರ್ಗವನ್ನು ಆಯ್ಕೆ ಮಾಡಿ' : 'Issue Category'}</label>
                        <div style={{ display: 'flex', flexWrap: 'wrap', gap: 10 }}>
                          {categories.map(c => (
                            <button
                              key={c.id} type="button"
                              onClick={() => setForm({...form, category: c.id})}
                              style={{ 
                                padding: '8px 16px', 
                                borderRadius: 10, 
                                fontSize: 12, 
                                fontWeight: 700, 
                                border: '1.5px solid',
                                transition: 'all 0.2s',
                                cursor: 'pointer',
                                background: form.category === c.id ? '#003580' : '#fff',
                                borderColor: form.category === c.id ? '#003580' : '#e2e8f0',
                                color: form.category === c.id ? '#fff' : '#64748b'
                              }}
                            >
                              {c.label}
                            </button>
                          ))}
                        </div>
                      </div>

                      <div className="vs-form-group">
                        <label className="vs-label">{lang === 'kn' ? 'ದೂರಿನ ವಿವರ' : 'Description of Issue'}</label>
                        <textarea className="vs-input" style={{ minHeight: 120, resize: 'none' }} value={form.description} onChange={e=>setForm({...form, description: e.target.value})} required placeholder={lang === 'kn' ? 'ನಿಮ್ಮ ದೂರನ್ನು ಸವಿಸ್ತಾರವಾಗಿ ವಿವರಿಸಿ...' : 'Describe the issue in detail...'} />
                      </div>

                      <button
                        type="submit"
                        disabled={loading}
                        className="vs-btn vs-btn-primary"
                        style={{ height: 50, fontSize: 14, justifyContent: 'center', width: '100%' }}
                      >
                        {loading ? 'Processing...' : <><FiSend /> {lang === 'kn' ? 'ದೂರು ಸಲ್ಲಿಸಿ' : 'Submit Complaint'}</>}
                      </button>
                    </form>
                  </motion.div>
                ) : (
                  <motion.div
                    key="success"
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="vs-card"
                    style={{ padding: '4rem 2rem', textAlign: 'center' }}
                  >
                    <div style={{ width: 80, height: 80, background: '#eaf5ee', color: '#009688', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                      <FiCheckCircle size={40} />
                    </div>
                    <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '1.5rem', color: '#1a1a2e', marginBottom: 12 }}>{lang === 'kn' ? 'ದೂರು ಸಲ್ಲಿಸಲಾಗಿದೆ!' : 'Complaint Logged!'}</h2>
                    <p style={{ fontSize: 14, color: '#64748b', marginBottom: 32, maxWidth: 350, margin: '0 auto 32px' }}>
                      {lang === 'kn' ? 'ನಿಮ್ಮ ದೂರನ್ನು ದಾಖಲಿಸಲಾಗಿದೆ. ವಾರ್ಡನ್ ತಂಡವು ಶೀಘ್ರದಲ್ಲೇ ಕ್ರಮ ಕೈಗೊಳ್ಳಲಿದೆ.' : 'Your request has been registered. The maintenance team will be notified shortly.'}
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="vs-btn vs-btn-outline"
                      style={{ margin: '0 auto' }}
                    >
                      {lang === 'kn' ? 'ಮತ್ತೊಂದು ದೂರು ಸಲ್ಲಿಸಿ' : 'Submit Another Request'}
                    </button>
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Sidebar Tools */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              
              <div className="vs-card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
                  <FiAlertCircle color="#003580" size={20} />
                  <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 15, color: '#1a1a2e' }}>{lang === 'kn' ? 'ಮಾರ್ಗಸೂಚಿಗಳು' : 'Important Notes'}</h3>
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  {[
                    lang === 'kn' ? 'ದೂರು ಸಲ್ಲಿಸಿದ 24 ಗಂಟೆಗಳಲ್ಲಿ ಕ್ರಮ ಕೈಗೊಳ್ಳಲಾಗುವುದು.' : 'Issues are typically resolved within 24 working hours.',
                    lang === 'kn' ? 'ತುರ್ತು ಸಂದರ್ಭದಲ್ಲಿ ವಾರ್ಡನ್ ಸಂಖ್ಯೆಗೆ ಕರೆ ಮಾಡಿ.' : 'For medical or safety emergencies, contact the warden.',
                    lang === 'kn' ? 'ನಿರ್ವಹಣಾ ಶುಲ್ಕವು ಉಚಿತವಾಗಿರುತ್ತದೆ.' : 'Routine maintenance is covered by hostel services.'
                  ].map((text, i) => (
                    <div key={i} style={{ display: 'flex', gap: 10, alignItems: 'start' }}>
                      <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#003580', marginTop: 6, flexShrink: 0 }}></div>
                      <p style={{ fontSize: 12, color: '#555e6b', lineHeight: 1.5, fontFamily: 'Inter, sans-serif' }}>{text}</p>
                    </div>
                  ))}
                </div>
              </div>

              <div style={{ background: '#003580', padding: '1.75rem', borderRadius: 16, color: '#fff', boxShadow: '0 10px 15px -3px rgba(0,53,128,0.2)' }}>
                <FiShield size={32} style={{ marginBottom: 16, opacity: 0.8 }} />
                <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 16, marginBottom: 8 }}>{lang === 'kn' ? 'ಸ್ಥಿತಿ ಪತ್ತೆಹಚ್ಚಿ' : 'Track Response'}</h3>
                <p style={{ fontSize: 12, color: 'rgba(255,255,255,0.7)', lineHeight: 1.6, marginBottom: 20 }}>
                  {lang === 'kn' ? 'ನಿಮ್ಮ ದೂರಿನ ಸ್ಥಿತಿಯನ್ನು ತಿಳಿಯಲು ಇಲ್ಲಿ ಕ್ಲಿಕ್ ಮಾಡಿ.' : 'Monitor the progress of your submitted complaints in real-time.'}
                </p>
                <button style={{ width: '100%', background: 'rgba(255,255,255,0.15)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff', padding: '10px', borderRadius: 10, fontSize: 12, fontWeight: 700, cursor: 'pointer' }}>
                  {lang === 'kn' ? 'ಟ್ರ್ಯಾಕ್ ಮಾಡಿ' : 'Track Status'}
                </button>
              </div>

            </div>
            
          </div>
        </div>
      </div>
    </div>
  );
};

export default HostelComplaints;

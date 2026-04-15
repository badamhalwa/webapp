import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FiHome, FiSend, FiList, FiCheckCircle, FiAlertCircle } from 'react-icons/fi';

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
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1500);
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Hero */}
      <section className="bg-purple-700 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">{t('nav.hostelComplaints')}</h1>
          <p className="text-purple-100 max-w-2xl">{t('hostel.subtitle')}</p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          
          {/* Instructions Sidebar */}
          <div className="md:col-span-1 space-y-6">
            <div className="bg-white p-6 rounded-2xl border border-gray-100 shadow-sm">
              <h3 className="font-bold text-gray-900 mb-4 flex items-center gap-2"><FiAlertCircle className="text-purple-600"/> {lang === 'kn' ? 'ಮಾರ್ಗಸೂಚಿಗಳು' : 'Guidelines'}</h3>
              <ul className="space-y-3">
                {[
                  lang === 'kn' ? 'ದೂರು ಸಲ್ಲಿಸಿದ 24 ಗಂಟೆಗಳಲ್ಲಿ ಕ್ರಮ ಕೈಗೊಳ್ಳಲಾಗುವುದು.' : 'Issues are typically resolved within 24 working hours.',
                  lang === 'kn' ? 'ತುರ್ತು ಸಂದರ್ಭದಲ್ಲಿ ವಾರ್ಡನ್ ಸಂಖ್ಯೆಗೆ ಕರೆ ಮಾಡಿ.' : 'For emergencies, contact the warden directly.',
                  lang === 'kn' ? 'ದೂರಿನ ಸ್ಥಿತಿಯನ್ನು ಟ್ರ್ಯಾಕ್ ಐಡಿಯಲ್ಲಿ ನೋಡಿ.' : 'Keep your complaint ID for tracking status.'
                ].map((text, i) => (
                  <li key={i} className="text-xs text-gray-500 leading-relaxed flex gap-2">
                    <span className="text-purple-500 font-black">•</span> {text}
                  </li>
                ))}
              </ul>
            </div>
            
            <div className="bg-gradient-to-br from-purple-600 to-indigo-700 p-6 rounded-2xl text-white shadow-lg">
              <FiList size={28} className="mb-4 opacity-80" />
              <h3 className="font-bold mb-2">{t('hostel.track')}</h3>
              <p className="text-xs text-purple-100 mb-4 opacity-80">{lang === 'kn' ? 'ನಿಮ್ಮ ಮೊಬೈಲ್ ಸಂಖ್ಯೆಯನ್ನು ಬಳಸಿ ಸ್ಥಿತಿಯನ್ನು ಪತ್ತೆಹಚ್ಚಿ.' : 'Check the progress of your previously submitted complaints.'}</p>
              <button className="w-full bg-white/20 hover:bg-white/30 py-2.5 rounded-xl font-bold text-sm transition-colors border border-white/10 uppercase tracking-widest">{lang === 'kn' ? 'ಸ್ಥಿತಿ ನೋಡಿ' : 'Check Status'}</button>
            </div>
          </div>

          {/* Form Area */}
          <div className="md:col-span-2">
            <AnimatePresence mode="wait">
              {!submitted ? (
                <motion.div
                  key="form"
                  initial={{ opacity: 0, scale: 0.98 }}
                  animate={{ opacity: 1, scale: 1 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="bg-white p-8 rounded-2xl border border-gray-100 shadow-xl"
                >
                  <SectionHeader title={t('hostel.head')} />
                  
                  <form onSubmit={handleSubmit} className="space-y-6 mt-6">
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('hostel.name')}</label>
                        <input className="vs-input" value={form.name} onChange={e=>setForm({...form, name: e.target.value})} required placeholder="e.g. Rahul Kumar" />
                      </div>
                      <div>
                        <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('hostel.room')}</label>
                        <input className="vs-input" value={form.room} onChange={e=>setForm({...form, room: e.target.value})} required placeholder="e.g. B-302" />
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('hostel.category')}</label>
                      <div className="grid grid-cols-2 sm:grid-cols-3 gap-2">
                        {categories.map(c => (
                          <button
                            key={c.id} type="button"
                            onClick={() => setForm({...form, category: c.id})}
                            className={`px-3 py-2 rounded-xl text-xs font-bold border transition-all ${
                              form.category === c.id ? 'bg-purple-600 border-purple-600 text-white shadow-md' : 'bg-white border-gray-100 text-gray-500 hover:border-purple-200'
                            }`}
                          >
                            {c.label}
                          </button>
                        ))}
                      </div>
                    </div>

                    <div>
                      <label className="block text-xs font-bold text-gray-400 uppercase tracking-wider mb-2">{t('hostel.description')}</label>
                      <textarea className="vs-input min-h-[120px]" value={form.description} onChange={e=>setForm({...form, description: e.target.value})} required placeholder={lang === 'kn' ? 'ನಿಮ್ಮ ದೂರನ್ನು ಸವಿಸ್ತಾರವಾಗಿ ವಿವರಿಸಿ...' : 'Describe the issue in detail...'} />
                    </div>

                    <button
                      type="submit"
                      disabled={loading || !form.category}
                      className="w-full bg-purple-700 hover:bg-purple-800 text-white py-4 rounded-2xl font-bold shadow-lg shadow-purple-200 transition-all flex items-center justify-center gap-3 disabled:opacity-50 disabled:grayscale"
                    >
                      {loading ? t('common.loading') : <><FiSend /> {t('hostel.submit')}</>}
                    </button>
                  </form>
                </motion.div>
              ) : (
                <motion.div
                  key="success"
                  initial={{ opacity: 0, scale: 0.9 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="bg-white p-12 rounded-2xl border border-gray-100 shadow-xl text-center"
                >
                  <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                    <FiCheckCircle size={40} />
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('hostel.success')}</h2>
                  <p className="text-gray-500 mb-8">{t('hostel.successSub')}</p>
                  <button
                    onClick={() => setSubmitted(false)}
                    className="vs-btn vs-btn-outline mx-auto"
                  >
                    {lang === 'kn' ? 'ಹೊಸ ದೂರು ಸಲ್ಲಿಸಿ' : 'Submit New Complaint'}
                  </button>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </div>
      </div>
    </div>
  );
};

/* Helper for header inside form */
const SectionHeader = ({ title }) => (
  <div className="border-b border-gray-100 pb-4 mb-4">
    <h2 className="text-xl font-bold text-gray-900 flex items-center gap-2">
      <FiHome className="text-purple-600" /> {title}
    </h2>
  </div>
);

export default HostelComplaints;

import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiMapPin, FiInfo, FiBookOpen, FiActivity, FiArrowRight } from 'react-icons/fi';

const Schedule = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [activeDay, setActiveDay] = useState('Mon');

  const days = [
    { name: lang === 'kn' ? 'ಸೋಮವಾರ' : 'Monday', id: 'Mon' },
    { name: lang === 'kn' ? 'ಮಂಗಳವಾರ' : 'Tuesday', id: 'Tue' },
    { name: lang === 'kn' ? 'ಬುಧವಾರ' : 'Wednesday', id: 'Wed' },
    { name: lang === 'kn' ? 'ಗುರುವಾರ' : 'Thursday', id: 'Thu' },
    { name: lang === 'kn' ? 'ಶುಕ್ರವಾರ' : 'Friday', id: 'Fri' },
    { name: lang === 'kn' ? 'ಶನಿವಾರ' : 'Saturday', id: 'Sat' },
  ];

  const scheduleData = [
    { time: '09:00 - 10:00', type: 'Lecture', subject: lang === 'kn' ? 'ಫಿಸಿಯಾಲಜಿ' : 'Physiology', room: 'LH-1' },
    { time: '10:00 - 11:00', type: 'Lecture', subject: lang === 'kn' ? 'ಡೆಂಟಲ್ ಅನ್ಯಾಟಮಿ' : 'Dental Anatomy', room: 'LH-2' },
    { time: '11:00 - 12:00', type: 'Practical', subject: lang === 'kn' ? 'ಬಯೋಕೆಮಿಸ್ಟ್ರಿ' : 'Biochemistry Lab', room: 'Lab-A' },
    { time: '12:00 - 01:00', type: 'Lunch', subject: lang === 'kn' ? 'ವಿರಾಮ' : 'Break', room: '' },
    { time: '01:00 - 04:00', type: 'Practical', subject: lang === 'kn' ? 'ಡೆಂಟಲ್ ಮೆಟೀರಿಯಲ್ಸ್' : 'Dental Materials', room: 'Lab-C' },
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      
      {/* ── Page Hero ── */}
      <section style={{ background: '#003580', padding: '3rem 2rem 2.5rem' }}>
        <div className="max-w-7xl mx-auto">
          <nav className="vs-breadcrumb" style={{ marginBottom: 12 }}>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Academics</span>
            <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 6px', fontSize: 12 }}>/</span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{t('academics.schedule')}</span>
          </nav>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '2.5rem', color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 8 }}>
            Weekly Timetable
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif', maxWidth: 560, lineHeight: 1.7 }}>
            Official academic schedule and clinical posting rotation for BDS students. Please report to lecture halls 5 minutes prior to session.
          </p>
        </div>
      </section>

      <div className="vs-section">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Day Selector */}
          <div style={{ display: 'flex', gap: 8, marginBottom: 32, overflowX: 'auto', paddingBottom: 10 }}>
            {days.map((day) => (
              <button
                key={day.id}
                onClick={() => setActiveDay(day.id)}
                style={{ 
                  padding: '12px 24px', borderRadius: 12, border: 'none', fontWeight: 800, fontSize: 13,
                  background: activeDay === day.id ? '#003580' : '#fff',
                  color: activeDay === day.id ? '#fff' : '#64748b',
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', cursor: 'pointer', transition: 'all 0.2s',
                  whiteSpace: 'nowrap'
                }}
              >
                {day.name}
              </button>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr', gap: 12 }}>
            {scheduleData.map((item, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.05 }}
              >
                <div className="vs-card" style={{ 
                  padding: '20px 24px', display: 'flex', alignItems: 'center', gap: 24,
                  borderLeft: `4px solid ${item.type === 'Lecture' ? '#003580' : item.type === 'Practical' ? '#009688' : '#cbd5e1'}`,
                  background: item.type === 'Lunch' ? '#f8fafc' : '#fff'
                }}>
                  <div style={{ width: 140, color: '#64748b', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <FiClock size={15} />
                    <span style={{ fontWeight: 700, fontSize: 13 }}>{item.time}</span>
                  </div>
                  
                  <div style={{ flex: 1 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span style={{ 
                        fontSize: 10, fontWeight: 800, padding: '4px 10px', borderRadius: 6,
                        background: item.type === 'Lecture' ? '#e6f0fb' : item.type === 'Practical' ? '#eaf5ee' : '#f1f5f9',
                        color: item.type === 'Lecture' ? '#003580' : item.type === 'Practical' ? '#009688' : '#64748b',
                        textTransform: 'uppercase'
                      }}>
                        {lang === 'kn' ? (item.type === 'Lecture' ? 'ಉಪನ್ಯಾಸ' : item.type === 'Practical' ? 'ಪ್ರಾಯೋಗಿಕ' : 'ವಿರಾಮ') : item.type}
                      </span>
                      <h3 style={{ fontWeight: 800, color: '#1a1a2e', fontSize: 16 }}>{item.subject}</h3>
                    </div>
                  </div>

                  {item.room && (
                    <div style={{ padding: '8px 12px', background: '#f8fafc', borderRadius: 8, display: 'flex', alignItems: 'center', gap: 6, color: '#64748b' }}>
                      <FiMapPin size={13} />
                      <span style={{ fontSize: 11, fontWeight: 700 }}>Room: {item.room}</span>
                    </div>
                  )}
                </div>
              </motion.div>
            ))}
          </div>

          {/* Important Notes */}
          <div className="vs-card" style={{ marginTop: 40, padding: '24px', background: '#fffbeb', border: '1px solid #fef3c7', display: 'flex', gap: 20 }}>
            <div style={{ width: 44, height: 44, borderRadius: 12, background: '#fff', color: '#f59e0b', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)', flexShrink: 0 }}>
               <FiInfo size={22} />
            </div>
            <div>
              <h4 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, color: '#92400e', marginBottom: 8 }}>Academic Compliance</h4>
              <ul style={{ padding: 0, margin: 0, listStyle: 'none', display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 10 }}>
                {[
                  { text: lang === 'kn' ? 'ಏಪ್ರನ್ ಮತ್ತು ಕಿಟ್ ಕಡ್ಡಾಯ.' : 'Apron and kit are mandatory for all practical sessions.', icon: FiCheckCircle },
                  { text: lang === 'kn' ? 'ಉಪನ್ಯಾಸಗಳಿಗೆ 5 ನಿಮಿಷ ಮುಂಚಿತವಾಗಿ ಹಾಜರಾಗಿ.' : 'Report to halls 5 minutes prior to schedule.', icon: FiCheckCircle },
                  { text: lang === 'kn' ? 'ಶೇ. 75 ಹಾಜರಾತಿ ಕಡ್ಡಾಯ.' : 'Minimum 75% attendance required for examinations.', icon: FiCheckCircle },
                  { text: lang === 'kn' ? 'ಕ್ಲಿನಿಕಲ್ ರೆಕಾರ್ಡ್‌ಗಳ ಪ್ರತಿದಿನದ ಸಲ್ಲಿಕೆ.' : 'Daily submission of clinical records and logbooks.', icon: FiCheckCircle },
                ].map((note, i) => (
                  <li key={i} style={{ fontSize: 12, color: '#b45309', display: 'flex', alignItems: 'center', gap: 8 }}>
                    <FiArrowRight size={12} /> {note.text}
                  </li>
                ))}
              </ul>
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

const FiCheckCircle = (props) => <svg {...props} fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path d="M22 11.08V12a10 10 0 1 1-5.93-9.14"></path><polyline points="22 4 12 14.01 9 11.01"></polyline></svg>;

export default Schedule;

import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Card, Badge } from '../../components/ui/UIComponents';
import { newsItems, syllabusData } from '../../data/mockData';
import { FiArrowRight, FiCalendar, FiBook, FiClock, FiBell, FiUser, FiActivity, FiHome, FiAward, FiStar } from 'react-icons/fi';

const StudentDashboard = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const today = new Date().toLocaleDateString(lang === 'kn' ? 'kn-IN' : 'en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const quickLinks = [
    { label: t('nav.syllabus'), path: '/student/syllabus', icon: FiBook, color: '#003580' },
    { label: t('nav.schedule'), path: '/student/schedule', icon: FiCalendar, color: '#009688' },
    { label: t('nav.hostelComplaints'), path: '/student/hostel', icon: FiHome, color: '#6366f1' },
    { label: t('nav.research'), path: '/research', icon: FiAward, color: '#f59e0b' },
    { label: t('nav.events'), path: '/events', icon: FiStar, color: '#f43f5e' },
    { label: t('nav.admissions'), path: '/admissions', icon: FiAward, color: '#10b981' },
  ];

  const announcements = [
    { title: lang === 'kn' ? 'ಆಂತರಿಕ ಮೌಲ್ಯಮಾಪನ ವೇಳಾಪಟ್ಟಿ ಬಿಡುಗಡೆ — ಏಪ್ರಿಲ್ 2026' : 'Internal Assessment Schedule Released — April 2026', date: '2026-04-12', priority: 'high' },
    { title: lang === 'kn' ? 'ಗ್ರಂಥಾಲಯ ರಜೆ ನೋಟಿಸ್ — ಏಪ್ರಿಲ್ 15 (ಮುಚ್ಚಲಾಗಿದೆ)' : 'Library Holiday Notice — April 15 (Closed)', date: '2026-04-11', priority: 'medium' },
    { title: lang === 'kn' ? 'ರ‍್ಯಾಾಗಿಂಗ್ ವಿರೋಧಿ ಸಮಿತಿ ಜಾಗೃತಿ ಕಾರ್ಯಕ್ರಮ — ಏಪ್ರಿಲ್ 20' : 'Anti-Ragging Committee Awareness Programme — April 20', date: '2026-04-10', priority: 'low' },
    { title: lang === 'kn' ? 'ಕ್ರೀಡಾ ದಿನ ನೋಂದಣಿ ಪ್ರಾರಂಭ — ಗಡುವು ಏಪ್ರಿಲ್ 22' : 'Sports Day Registration Open — Deadline April 22', date: '2026-04-09', priority: 'medium' },
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      
      {/* ── Page Hero ── */}
      <section style={{ background: '#003580', padding: '3rem 2rem 2.5rem' }}>
        <div className="max-w-7xl mx-auto flex justify-between items-end">
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
              <div style={{ padding: '4px 10px', background: '#009688', borderRadius: 6, fontSize: 10, fontWeight: 800, color: '#fff', textTransform: 'uppercase' }}>Academic Portal</div>
              <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 600 }}>{today}</span>
            </div>
            <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '2.5rem', color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 8 }}>
              {t('nav.studentDashboard')}
            </h1>
            <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif', maxWidth: 560, lineHeight: 1.7 }}>
              {t('academics.welcome')} Access your personalized academic schedule, curriculum updates, and institutional notifications.
            </p>
          </div>
          <div className="hidden md:flex flex-col items-end gap-2" style={{ marginBottom: 10 }}>
             <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: 'rgba(255,255,255,0.1)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff' }}>
                  <FiUser size={20} />
                </div>
                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-start' }}>
                  <span style={{ fontSize: 12, fontWeight: 700, color: '#fff', marginBottom: 4 }}>USN: 1RR20DS001</span>
                  <button 
                    onClick={() => {
                      localStorage.removeItem('rrdch-student-auth');
                      window.location.reload();
                    }}
                    style={{ fontSize: 10, fontWeight: 800, color: '#003580', background: '#fff', padding: '4px 10px', borderRadius: 4, cursor: 'pointer', border: 'none', textTransform: 'uppercase' }}
                  >
                    Logout
                  </button>
                </div>
             </div>
          </div>
        </div>
      </section>

      <div className="vs-section">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Quick Access Grid */}
          <div style={{ marginBottom: 40 }}>
            <h3 style={{ fontSize: 13, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 20 }}>
              {t('academics.quickAccess')}
            </h3>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(6, 1fr)', gap: 16 }}>
              {quickLinks.map((ql, i) => (
                <motion.div key={ql.path} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link to={ql.path} style={{ textDecoration: 'none' }}>
                    <div className="vs-card" style={{ padding: '24px 16px', textAlign: 'center', transition: 'all 0.2s', border: '1px solid #e2e8f0' }}
                       onMouseEnter={e => { e.currentTarget.style.borderColor = ql.color; e.currentTarget.style.transform = 'translateY(-2px)'; }}
                       onMouseLeave={e => { e.currentTarget.style.borderColor = '#e2e8f0'; e.currentTarget.style.transform = 'translateY(0)'; }}
                    >
                      <div style={{ width: 48, height: 48, borderRadius: 14, background: '#f8fafc', color: ql.color, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px', boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)' }}>
                        <ql.icon size={22} />
                      </div>
                      <div style={{ fontWeight: 700, fontSize: 12, color: '#1e293b' }}>{ql.label}</div>
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 32 }}>
            
            {/* Main Content: Announcements */}
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 20 }}>
                <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '1.25rem', color: '#1a1a2e', display: 'flex', alignItems: 'center', gap: 10 }}>
                   <FiBell size={20} color="#003580" /> {lang === 'kn' ? 'ಪ್ರಕಟಣೆಗಳು' : 'Notifications & Alerts'}
                </h3>
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {announcements.map((ann, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: -10 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                    <div className="vs-card" style={{ padding: '16px 20px', borderLeft: `4px solid ${ann.priority === 'high' ? '#ef4444' : ann.priority === 'medium' ? '#f59e0b' : '#cbd5e1'}`, display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                      <div style={{ flex: 1 }}>
                        <p style={{ fontWeight: 700, color: '#334155', fontSize: 14 }}>{ann.title}</p>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginTop: 4 }}>
                          <span style={{ fontSize: 11, color: '#94a3b8', display: 'flex', alignItems: 'center', gap: 4 }}>
                            <FiCalendar size={12} /> {ann.date}
                          </span>
                          {ann.priority === 'high' && (
                            <span style={{ fontSize: 10, fontWeight: 800, color: '#ef4444', background: '#fef2f2', padding: '2px 8px', borderRadius: 4, textTransform: 'uppercase' }}>URGENT</span>
                          )}
                        </div>
                      </div>
                      <FiArrowRight size={16} color="#cbd5e1" />
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

            {/* Sidebar: Curated Academic Info */}
            <div>
              {/* Today's Schedule Preview */}
              <div style={{ marginBottom: 30 }}>
                <h3 style={{ fontSize: 13, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16 }}>
                  {lang === 'kn' ? 'ಇಂದಿನ ವೇಳಾಪಟ್ಟಿ' : "Today's Schedule"}
                </h3>
                <div className="vs-card" style={{ padding: '20px' }}>
                  {(lang === 'kn' ? [
                    ['09:00 AM', 'ಫಿಸಿಯಾಲಜಿ ಉಪನ್ಯಾಸ', 'LH-1'],
                    ['10:00 AM', 'ಡೆಂಟಲ್ ಅನ್ಯಾಟಮಿ', 'LH-2'],
                    ['01:00 PM', 'ಮಧ್ಯಾಹ್ನ ವಿರಾಮ', ''],
                    ['02:00 PM', 'ಡೆಂಟಲ್ ಮೆಟೀರಿಯಲ್ಸ್ ಲ್ಯಾಬ್', 'Lab-3']
                  ] : [
                    ['09:00 AM', 'Physiology Lecture', 'LH-1'],
                    ['10:00 AM', 'Dental Anatomy', 'LH-2'],
                    ['01:00 PM', 'Lunch Break', ''],
                    ['02:00 PM', 'Dental Materials Lab', 'Lab-3']
                  ]).map(([time, subj, room], i, arr) => (
                    <div key={i} style={{ display: 'flex', gap: 16, paddingBottom: 16, marginBottom: i === arr.length - 1 ? 0 : 16, borderBottom: i === arr.length - 1 ? 'none' : '1px solid #f1f5f9' }}>
                      <div style={{ fontSize: 11, fontWeight: 700, color: '#003580', whiteSpace: 'nowrap', paddingTop: 2 }}>{time}</div>
                      <div>
                        <div style={{ fontWeight: 700, color: '#1e293b', fontSize: 13 }}>{subj}</div>
                        {room && <div style={{ fontSize: 11, color: '#64748b', marginTop: 2 }}>Room: {room}</div>}
                      </div>
                    </div>
                  ))}
                  <Link to="/student/schedule" style={{ display: 'flex', alignItems: 'center', gap: 6, fontSize: 12, fontWeight: 700, color: '#003580', textDecoration: 'none', borderTop: '1px solid #f1f5f9', paddingTop: 16, marginTop: 4 }}>
                    View Full Schedule <FiArrowRight size={14} />
                  </Link>
                </div>
              </div>

              {/* Latest Curriculum Updates */}
              <div>
                <h3 style={{ fontSize: 13, fontWeight: 800, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 16 }}>
                   Curriculum Updates
                </h3>
                <div className="vs-card" style={{ padding: '16px' }}>
                  {syllabusData.slice(0, 2).map((s, i) => (
                    <div key={i} style={{ padding: '10px 0', borderBottom: i === 1 ? 'none' : '1px solid #f1f5f9' }}>
                       <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 4 }}>
                          <span style={{ fontWeight: 700, fontSize: 13, color: '#1e293b' }}>{s.year}</span>
                          <span style={{ fontSize: 10, fontWeight: 700, background: '#e0f2fe', color: '#0369a1', padding: '2px 6px', borderRadius: 4 }}>UPDATED</span>
                       </div>
                       <p style={{ fontSize: 11, color: '#64748b' }}>Last revised on {new Date(s.updated).toLocaleDateString()}</p>
                    </div>
                  ))}
                  <Link to="/student/syllabus" style={{ display: 'block', textAlign: 'center', fontSize: 11, fontWeight: 700, color: '#64748b', textDecoration: 'none', background: '#f8fafc', padding: '8px', borderRadius: 8, marginTop: 12 }}>
                    Go to Curriculum Portal
                  </Link>
                </div>
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

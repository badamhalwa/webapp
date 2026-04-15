import React from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { Card, Badge, SectionHeader } from '../../components/ui/UIComponents';
import { newsItems, syllabusData } from '../../data/mockData';
import { FiArrowRight, FiCalendar, FiBook, FiClock, FiBell } from 'react-icons/fi';

const StudentDashboard = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const today = new Date().toLocaleDateString(lang === 'kn' ? 'kn-IN' : 'en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });

  const quickLinks = [
    { label: t('nav.syllabus'), path: '/student/syllabus', icon: '📚', color: 'from-blue-500 to-blue-700' },
    { label: t('nav.schedule'), path: '/student/schedule', icon: '📅', color: 'from-teal-500 to-teal-700' },
    { label: t('nav.hostelComplaints'), path: '/student/hostel', icon: '🏠', color: 'from-purple-500 to-purple-700' },
    { label: t('nav.research'), path: '/research', icon: '🔬', color: 'from-amber-500 to-amber-700' },
    { label: t('nav.events'), path: '/events', icon: '🎭', color: 'from-rose-500 to-rose-700' },
    { label: t('nav.admissions'), path: '/admissions', icon: '🎓', color: 'from-green-500 to-green-700' },
  ];

  const announcements = [
    { title: lang === 'kn' ? 'ಆಂತರಿಕ ಮೌಲ್ಯಮಾಪನ ವೇಳಾಪಟ್ಟಿ ಬಿಡುಗಡೆ — ಏಪ್ರಿಲ್ 2026' : 'Internal Assessment Schedule Released — April 2026', date: '2026-04-12', priority: 'high' },
    { title: lang === 'kn' ? 'ಗ್ರಂಥಾಲಯ ರಜೆ ನೋಟಿಸ್ — ಏಪ್ರಿಲ್ 15 (ಮುಚ್ಚಲಾಗಿದೆ)' : 'Library Holiday Notice — April 15 (Closed)', date: '2026-04-11', priority: 'medium' },
    { title: lang === 'kn' ? 'ರ‍್ಯಾಗಿಂಗ್ ವಿರೋಧಿ ಸಮಿತಿ ಜಾಗೃತಿ ಕಾರ್ಯಕ್ರಮ — ಏಪ್ರಿಲ್ 20' : 'Anti-Ragging Committee Awareness Programme — April 20', date: '2026-04-10', priority: 'low' },
    { title: lang === 'kn' ? 'ಕ್ರೀಡಾ ದಿನ ನೋಂದಣಿ ಪ್ರಾರಂಭ — ಗಡುವು ಏಪ್ರಿಲ್ 22' : 'Sports Day Registration Open — Deadline April 22', date: '2026-04-09', priority: 'medium' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-rrdch-teal to-rrdch-blue text-white px-4 py-10">
        <div className="max-w-7xl auto">
          <p className="text-teal-100 text-sm mb-1">{today}</p>
          <h1 className="text-3xl md:text-4xl font-bold">{t('nav.studentDashboard')}</h1>
          <p className="text-teal-100 mt-2">{t('academics.welcome')}</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Quick Links */}
        <SectionHeader title={t('academics.quickAccess')}/>
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {quickLinks.map((ql, i) => (
            <motion.div key={ql.path} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
              <Link to={ql.path}>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
                  className={`bg-gradient-to-br ${ql.color} text-white rounded-2xl p-5 text-center shadow-md hover:shadow-xl transition-all`}
                >
                  <div className="text-4xl mb-2">{ql.icon}</div>
                  <div className="font-semibold text-sm">{ql.label}</div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Announcements */}
          <div className="lg:col-span-2">
            <SectionHeader title={lang === 'kn' ? 'ಪ್ರಕಟಣೆಗಳು' : 'Announcements'} subtitle={lang === 'kn' ? 'ವಿದ್ಯಾರ್ಥಿಗಳಿಗಾಗಿ ಪ್ರಮುಖ ಸೂಚನೆಗಳು.' : 'Important notices for all students.'}/>
            <div className="space-y-3">
              {announcements.map((ann, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -10 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.07 }}>
                  <Card className={`p-4 border-l-4 ${ann.priority === 'high' ? 'border-red-500 bg-red-50' : ann.priority === 'medium' ? 'border-amber-400 bg-amber-50' : 'border-gray-300'}`}>
                    <div className="flex items-start gap-3">
                      <FiBell className={`mt-1 ${ann.priority === 'high' ? 'text-red-500' : 'text-amber-500'}`}/>
                      <div>
                        <p className="font-medium text-gray-900 text-sm">{ann.title}</p>
                        <p className="text-xs text-gray-500 mt-1 flex items-center gap-1"><FiCalendar size={11}/>{ann.date}</p>
                      </div>
                      {ann.priority === 'high' && <Badge variant="red" className="ml-auto flex-shrink-0">{lang === 'kn' ? 'ತುರ್ತು' : 'Urgent'}</Badge>}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div className="space-y-6">
            {/* Syllabus updates */}
            <Card className="p-5">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><FiBook className="text-rrdch-blue"/> {lang === 'kn' ? 'ಪಠ್ಯಕ್ರಮದ ಅಪ್‌ಡೇಟ್' : 'Latest Syllabus Updates'}</h3>
              <div className="space-y-2">
                {syllabusData.slice(0, 3).map((s, i) => (
                  <div key={i} className="flex items-center justify-between py-2 border-b border-gray-50 last:border-0">
                    <span className="text-sm text-gray-700">{lang === 'kn' ? `${s.year} ನೇ ವರ್ಷ` : s.year}</span>
                    <Badge variant="teal" className="text-xs">{new Date(s.updated).toLocaleDateString(lang === 'kn' ? 'kn-IN' : 'en-IN', { day: 'numeric', month: 'short' })}</Badge>
                  </div>
                ))}
              </div>
              <Link to="/student/syllabus" className="text-rrdch-blue text-sm font-medium hover:underline flex items-center gap-1 mt-3">
                {t('common.viewAll')} <FiArrowRight size={14}/>
              </Link>
            </Card>

            {/* Today's schedule preview */}
            <Card className="p-5">
              <h3 className="font-bold text-gray-900 mb-3 flex items-center gap-2"><FiClock className="text-rrdch-teal"/> {lang === 'kn' ? 'ಇಂದಿನ ವೇಳಾಪಟ್ಟಿ' : "Today's Schedule"}</h3>
              {(lang === 'kn' ? [
                ['9:00–10:00 AM', 'ಫಿಸಿಯಾಲಜಿ ಉಪನ್ಯಾಸ', 'ಲೆಕ್ಚರ್ ಹಾಲ್ 1'],
                ['10:00–11:00 AM', 'ಡೆಂಟಲ್ ಅನ್ಯಾಟಮಿ', 'ಲೆಕ್ಚರ್ ಹಾಲ್ 2'],
                ['11:00–12:00 PM', 'ವಿರಾಮ', ''],
                ['2:00–4:00 PM', 'ಡೆಂಟಲ್ ಮೆಟೀರಿಯಲ್ಸ್ ಲ್ಯಾಬ್', 'ಲ್ಯಾಬ್ 3']
              ] : [
                ['9:00–10:00 AM', 'Physiology Lecture', 'Lecture Hall 1'],
                ['10:00–11:00 AM', 'Dental Anatomy', 'Lecture Hall 2'],
                ['11:00–12:00 PM', 'Break', ''],
                ['2:00–4:00 PM', 'Dental Materials Lab', 'Lab 3']
              ]).map(([time, subj, room], i) => (
                <div key={i} className="flex gap-3 py-2 border-b border-gray-50 last:border-0">
                  <span className="text-xs text-gray-400 w-28 flex-shrink-0">{time}</span>
                  <div>
                    <p className="text-sm font-medium text-gray-900">{subj}</p>
                    {room && <p className="text-xs text-gray-400">{room}</p>}
                  </div>
                </div>
              ))}
              <Link to="/student/schedule" className="text-rrdch-blue text-sm font-medium hover:underline flex items-center gap-1 mt-3">
                {lang === 'kn' ? 'ಪೂರ್ಣ ವೇಳಾಪಟ್ಟಿ' : 'Full Schedule'} <FiArrowRight size={14}/>
              </Link>
            </Card>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StudentDashboard;

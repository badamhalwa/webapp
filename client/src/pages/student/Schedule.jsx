import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiCalendar, FiClock, FiMapPin, FiInfo } from 'react-icons/fi';

const Schedule = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

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
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-teal-600 text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">{t('academics.schedule')}</h1>
          <p className="text-teal-100 max-w-2xl">{lang === 'kn' ? 'ತಜ್ಞ ಬೋಧನೆಯ ಸಾಪ್ತಾಹಿಕ ವೇಳಾಪಟ್ಟಿ ಮತ್ತು ತರಗತಿ ವಿವರಗಳು.' : 'Weekly academic timetable and clinical posting schedule for undergraduate students.'}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Day Selector */}
        <div className="flex overflow-x-auto gap-2 mb-10 pb-2 no-scrollbar">
          {days.map((day) => (
            <button
              key={day.id}
              className={`px-6 py-3 rounded-xl font-bold whitespace-nowrap transition-all ${
                day.id === 'Mon' ? 'bg-teal-600 text-white shadow-lg' : 'bg-gray-50 text-gray-500 hover:bg-gray-100'
              }`}
            >
              {day.name}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-1 gap-4">
          {scheduleData.map((item, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.05 }}
              className={`flex flex-col md:flex-row items-start md:items-center gap-4 p-5 rounded-2xl border ${
                item.type === 'Lunch' ? 'bg-gray-50 border-gray-100 border-dashed' : 'bg-white border-gray-100 shadow-sm'
              }`}
            >
              <div className="w-40 flex items-center gap-2 text-gray-400">
                <FiClock size={16} />
                <span className="font-bold text-sm">{item.time}</span>
              </div>
              
              <div className="flex-1">
                <div className="flex items-center gap-3">
                  <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded ${
                    item.type === 'Lecture' ? 'bg-blue-100 text-blue-700' : 
                    item.type === 'Practical' ? 'bg-purple-100 text-purple-700' : 
                    'bg-gray-200 text-gray-600'
                  }`}>
                    {lang === 'kn' ? (item.type === 'Lecture' ? 'ಉಪನ್ಯಾಸ' : item.type === 'Practical' ? 'ಪ್ರಾಯೋಗಿಕ' : 'ವಿರಾಮ') : item.type}
                  </span>
                  <h3 className="font-bold text-gray-900">{item.subject}</h3>
                </div>
              </div>

              {item.room && (
                <div className="flex items-center gap-2 text-gray-500 bg-gray-50 px-3 py-1.5 rounded-lg border border-gray-100">
                  <FiMapPin size={14} />
                  <span className="text-xs font-medium">{item.room}</span>
                </div>
              )}
            </motion.div>
          ))}
        </div>

        <div className="mt-12 p-6 bg-amber-50 border border-amber-100 rounded-2xl flex items-start gap-4">
          <div className="w-10 h-10 bg-white rounded-xl flex items-center justify-center text-amber-500 shadow-sm">
            <FiInfo size={20} />
          </div>
          <div>
            <h4 className="font-bold text-amber-900">{lang === 'kn' ? 'ಪ್ರಮುಖ ಸೂಚನೆಗಳು' : 'Important Notes'}</h4>
            <ul className="text-xs text-amber-800 mt-2 space-y-1 list-disc list-inside">
              <li>{lang === 'kn' ? 'ಪ್ರಾಯೋಗಿಕ ತರಗತಿಗಳಿಗೆ ಏಪ್ರನ್ ಮತ್ತು ಕಿಟ್ ಕಡ್ಡಾಯ.' : 'Apron and kit are mandatory for all practical sessions.'}</li>
              <li>{lang === 'kn' ? 'ಉಪನ್ಯಾಸಗಳಿಗೆ 5 ನಿಮಿಷ ಮುಂಚಿತವಾಗಿ ಹಾಜರಾಗಿ.' : 'Please report to lecture halls 5 minutes prior to the scheduled time.'}</li>
              <li>{lang === 'kn' ? 'ವೇಳಾಪಟ್ಟಿಯಲ್ಲಿನ ಯಾವುದೇ ಬದಲಾವಣೆಗಳನ್ನು ನೋಟಿಸ್ ಬೋರ್ಡ್ ಮೂಲಕ ತಿಳಿಸಲಾಗುವುದು.' : 'Any changes in the schedule will be notified via the department notice board.'}</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Schedule;

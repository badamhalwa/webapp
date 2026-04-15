import React from 'react';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiBook, FiDownload, FiExternalLink, FiClock } from 'react-icons/fi';
import { syllabusData } from '../../data/mockData';

const Syllabus = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <div className="bg-white min-h-screen">
      {/* Hero */}
      <section className="bg-rrdch-blue text-white py-16 px-4">
        <div className="max-w-7xl mx-auto">
          <h1 className="text-3xl font-bold mb-4">{t('academics.syllabus')}</h1>
          <p className="text-blue-100 max-w-2xl">{lang === 'kn' ? 'ವಿದ್ಯಾರ್ಥಿಗಳಿಗಾಗಿ ಸಮಗ್ರ ದಂತ ವೈದ್ಯಕೀಯ ಪಠ್ಯಕ್ರಮ ವಿವರಗಳು ಇಲ್ಲಿವೆ.' : 'Comprehensive dental curriculum details for students across all academic years.'}</p>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 gap-8">
          {syllabusData.map((year, idx) => (
            <motion.div
              key={year.year}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: idx * 0.1 }}
              className="border border-gray-100 rounded-2xl overflow-hidden shadow-sm hover:shadow-md transition-shadow"
            >
              <div className="bg-gray-50 px-6 py-4 flex justify-between items-center border-b border-gray-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-white rounded-lg shadow-sm flex items-center justify-center text-rrdch-blue">
                    <FiBook size={20} />
                  </div>
                  <div>
                    <h2 className="font-bold text-gray-900">{lang === 'kn' ? `${year.year} ನೇ ವರ್ಷ` : year.year}</h2>
                    <p className="text-xs text-gray-400">{t('academics.updated')}: {new Date(year.updated).toLocaleDateString(lang === 'kn' ? 'kn-IN' : 'en-IN')}</p>
                  </div>
                </div>
                <button className="flex items-center gap-2 text-xs font-bold text-rrdch-blue bg-blue-50 px-4 py-2 rounded-lg hover:bg-blue-100 transition-colors">
                  <FiDownload size={14} /> {t('common.download')} PDF
                </button>
              </div>
              
              <div className="p-6">
                <h3 className="text-xs font-bold text-gray-400 uppercase tracking-wider mb-4">{t('academics.subjects')}</h3>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-3">
                  {year.subjects.map((sub, i) => (
                    <div key={i} className="flex items-center gap-3 p-3 bg-white border border-gray-50 rounded-xl hover:border-blue-100 transition-colors group">
                      <div className="w-2 h-2 rounded-full bg-blue-200 group-hover:bg-blue-500 transition-colors" />
                      <span className="text-sm text-gray-700">{lang === 'kn' ? `ವಿಷಯ ${i+1}` : sub}</span>
                    </div>
                  ))}
                </div>
                
                <div className="mt-8 p-4 bg-teal-50 rounded-xl flex items-start gap-4">
                  <FiClock className="text-teal-600 mt-1" />
                  <div>
                    <h4 className="font-bold text-teal-900 text-sm">{lang === 'kn' ? 'ಪರೀಕ್ಷೆಯ ಮಾರ್ಗಸೂಚಿಗಳು' : 'Examination Guidelines'}</h4>
                    <p className="text-xs text-teal-700 mt-1 leading-relaxed">
                      {lang === 'kn' ? 'ಆಯಾ ವರ್ಷದ ಪರೀಕ್ಷೆಯ ನಿಯಮಗಳು ಮತ್ತು ಸಬಂಧಿಸಿದ ವಿವರಗಳಿಗಾಗಿ ಕೆಳಗಿನ ಲಿಂಕ್ ಬಳಸಿ.' : 'Access university-specific regulations and internal assessment criteria for this academic year.'}
                    </p>
                    <button className="mt-2 text-xs font-bold text-teal-800 flex items-center gap-1 hover:underline">
                      {lang === 'kn' ? 'ಮಾರ್ಗಸೂಚಿಗಳನ್ನು ಓದಿ' : 'Read Guidelines'} <FiExternalLink size={12} />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Syllabus;

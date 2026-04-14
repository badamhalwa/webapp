import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { PageHero, Card, FormSelect } from '../../components/ui/UIComponents';
import { scheduleData } from '../../data/mockData';

const years = Object.keys(scheduleData);

const Schedule = () => {
  const { t } = useTranslation();
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const data = scheduleData[selectedYear] || [];

  const periodColors = [
    'bg-blue-100 text-blue-800',
    'bg-teal-100 text-teal-800',
    'bg-purple-100 text-purple-800',
    'bg-gray-100 text-gray-600 italic',
    'bg-amber-100 text-amber-800',
    'bg-rose-100 text-rose-800',
  ];

  return (
    <div>
      <PageHero title={t('nav.schedule')} subtitle="View department-wise lecture and lab timetables for all BDS and MDS years." breadcrumb="Home / Students / Schedule" bg="from-indigo-600 to-rrdch-blue"/>

      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex items-center gap-4 mb-8 flex-wrap">
          <label className="text-sm font-medium text-gray-700">Select Year / Program:</label>
          <select value={selectedYear} onChange={e => setSelectedYear(e.target.value)}
            className="border border-gray-200 rounded-xl px-4 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-rrdch-blue bg-white"
            aria-label="Select year"
          >
            {years.map(y => <option key={y} value={y}>{y}</option>)}
          </select>
          <span className="text-xs text-gray-400 bg-gray-100 px-3 py-1.5 rounded-full">Academic Year 2025-26</span>
        </div>

        {data.length === 0 ? (
          <Card className="p-10 text-center text-gray-400">
            <p>Schedule not yet added for this year. Please check back later.</p>
          </Card>
        ) : (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={selectedYear}>
            {/* Desktop table */}
            <div className="hidden md:block overflow-x-auto">
              <Card className="overflow-hidden">
                <table className="w-full">
                  <thead>
                    <tr className="bg-rrdch-blue text-white">
                      <th className="px-6 py-4 text-left text-sm font-semibold w-32">Day</th>
                      {['Period 1', 'Period 2', 'Period 3', 'Lunch', 'Period 4', 'Period 5'].map((p, i) => (
                        <th key={i} className="px-4 py-4 text-left text-sm font-semibold">{p}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {data.map((row, ri) => (
                      <tr key={ri} className="hover:bg-gray-50 transition-colors">
                        <td className="px-6 py-4 font-semibold text-gray-900 text-sm">{row.day}</td>
                        {row.periods.map((period, pi) => (
                          <td key={pi} className="px-4 py-3">
                            <span className={`text-xs px-2.5 py-1.5 rounded-lg font-medium ${periodColors[pi % periodColors.length]}`}>
                              {period}
                            </span>
                          </td>
                        ))}
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            </div>

            {/* Mobile cards */}
            <div className="md:hidden space-y-4">
              {data.map((row, ri) => (
                <Card key={ri} className="p-4">
                  <h3 className="font-bold text-rrdch-blue mb-3">{row.day}</h3>
                  <div className="space-y-2">
                    {row.periods.map((period, pi) => (
                      <div key={pi} className="flex items-center gap-3">
                        <span className="text-xs text-gray-400 w-20 flex-shrink-0">Period {pi + 1 === 4 ? 'Lunch' : pi + 1}</span>
                        <span className={`text-xs px-2.5 py-1 rounded-lg font-medium flex-1 ${periodColors[pi % periodColors.length]}`}>{period}</span>
                      </div>
                    ))}
                  </div>
                </Card>
              ))}
            </div>
          </motion.div>
        )}

        <div className="mt-6 grid grid-cols-3 md:grid-cols-6 gap-3">
          {periodColors.map((cls, i) => (
            <div key={i} className={`${cls} px-3 py-2 rounded-lg text-xs text-center font-medium`}>
              {['Lecture', 'Lab', 'Seminar', 'Lunch', 'Clinical', 'Extra'][i]}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Schedule;

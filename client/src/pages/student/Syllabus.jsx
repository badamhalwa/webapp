import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { PageHero, Card, Badge, Button } from '../../components/ui/UIComponents';
import { syllabusData } from '../../data/mockData';
import { FiDownload, FiExternalLink, FiBell } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

const Syllabus = () => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(null);

  const handleDownload = (year) => {
    toast.success(`${year} syllabus PDF download started!`);
  };

  return (
    <div>
      <Toaster position="top-right"/>
      <PageHero title={t('nav.syllabus')} subtitle="Access and download the latest DCI-approved syllabus for all BDS and MDS programs." breadcrumb="Home / Students / Syllabus" bg="from-rrdch-teal to-rrdch-blue"/>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {/* Update banner */}
        <div className="bg-amber-50 border border-amber-200 rounded-2xl p-4 flex items-start gap-3 mb-8">
          <FiBell className="text-amber-500 mt-0.5 flex-shrink-0"/>
          <div>
            <p className="font-semibold text-amber-800">Syllabus Updated</p>
            <p className="text-sm text-amber-700">The MDS syllabus has been updated as per DCI circular dated March 2025. All PG students please download the latest version.</p>
          </div>
        </div>

        <div className="space-y-4">
          {syllabusData.map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <Card className="overflow-hidden">
                <button className="w-full p-6 text-left flex items-center justify-between hover:bg-gray-50 transition-colors"
                  onClick={() => setExpanded(expanded === i ? null : i)}
                  aria-expanded={expanded === i}
                >
                  <div className="flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-rrdch-blue to-rrdch-teal rounded-xl flex items-center justify-center text-white font-bold text-lg">
                      {i === 4 ? 'PG' : `Y${i + 1}`}
                    </div>
                    <div>
                      <h3 className="font-bold text-gray-900">{item.year}</h3>
                      <p className="text-xs text-gray-400 mt-0.5">Last updated: {item.updated}</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <Badge variant={i === 4 ? 'purple' : 'blue'}>{item.subjects.length} Subjects</Badge>
                    {item.updated > '2025-02-01' && <Badge variant="teal">Updated</Badge>}
                  </div>
                </button>

                {expanded === i && (
                  <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} className="border-t border-gray-100">
                    <div className="p-6 bg-gray-50">
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
                        {item.subjects.map((subj, j) => (
                          <div key={j} className="flex items-center gap-2 bg-white rounded-lg p-3 border border-gray-100">
                            <div className="w-2 h-2 bg-rrdch-teal rounded-full flex-shrink-0"></div>
                            <span className="text-sm text-gray-800">{subj}</span>
                          </div>
                        ))}
                      </div>
                      <div className="flex gap-3 flex-wrap">
                        <Button size="sm" onClick={() => handleDownload(item.year)}>
                          <FiDownload/> {t('common.download')} PDF
                        </Button>
                        <Button variant="outline" size="sm">
                          <FiExternalLink/> View Online
                        </Button>
                      </div>
                    </div>
                  </motion.div>
                )}
              </Card>
            </motion.div>
          ))}
        </div>

        <div className="mt-8 p-5 bg-blue-50 border border-blue-100 rounded-2xl">
          <p className="text-sm text-blue-800"><strong>Note:</strong> All syllabi are based on DCI (Dental Council of India) regulations. Students are advised to check the official DCI website and RGUHS portal for any recent amendments.</p>
        </div>
      </div>
    </div>
  );
};

export default Syllabus;

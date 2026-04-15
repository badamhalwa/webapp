import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { syllabusData } from '../../data/mockData';
import { FiDownload, FiExternalLink, FiBell, FiChevronDown, FiChevronUp, FiBook } from 'react-icons/fi';
import toast, { Toaster } from 'react-hot-toast';

const Syllabus = () => {
  const { t } = useTranslation();
  const [expanded, setExpanded] = useState(null);

  const handleDownload = (year) => {
    toast.success(`${year} syllabus PDF download started!`);
  };

  return (
    <div style={{ background: '#ffffff' }}>
      <Toaster position="top-right" toastOptions={{ style: { borderRadius: '12px', fontFamily: 'Inter, sans-serif' } }} />

      {/* ── Page Hero ── */}
      <section style={{ background: '#003580', padding: '3rem 2rem 2.5rem' }}>
        <div className="max-w-7xl mx-auto">
          <nav className="vs-breadcrumb" style={{ marginBottom: 10 }}>
            <a href="/" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: 12 }}>Home</a>
            <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 6px', fontSize: 12 }}>/</span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Academic Syllabus</span>
          </nav>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 10 }}>
            Curriculum &amp; Syllabus
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif', maxWidth: 560, lineHeight: 1.7 }}>
            Access and download the latest DCI-approved syllabus for all BDS and MDS programs under RGUHS.
          </p>
        </div>
      </section>

      <div className="vs-section">
        <div className="max-w-4xl mx-auto">
          {/* Update notice */}
          <div className="vs-card" style={{ padding: '1.25rem', background: '#fef8e7', borderColor: '#fde68a', display: 'flex', gap: 14, alignItems: 'start', marginBottom: 32 }}>
            <div style={{ width: 36, height: 36, borderRadius: 8, background: '#fffbeb', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#b45309', flexShrink: 0 }}>
              <FiBell size={18} />
            </div>
            <div>
              <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 14, color: '#92400e', marginBottom: 2 }}>MDS Syllabus Updated</div>
              <p style={{ fontSize: 12, color: '#b45309', lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>
                The MDS syllabus has been updated as per DCI circular dated March 2025. All PG students please download the latest version for your specialty.
              </p>
            </div>
          </div>

          <div className="vs-section-header">
            <div>
              <div className="vs-section-title">Program Units</div>
              <div className="vs-section-sub">Select your year of study to view core subjects</div>
            </div>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {syllabusData.map((item, i) => {
              const isOpen = expanded === i;
              const isPG = i === 4;
              const color = isPG ? '#009688' : '#003580';
              const bg = isPG ? '#e6f7f5' : '#e6f0fb';

              return (
                <div key={i} className="vs-card" style={{ overflow: 'hidden', borderLeft: isOpen ? `4px solid ${color}` : '1px solid #eaecf0' }}>
                  <button 
                    onClick={() => setExpanded(isOpen ? null : i)}
                    style={{ width: '100%', padding: '1.25rem 1.75rem', textAlign: 'left', display: 'flex', alignItems: 'center', justifyContent: 'space-between', cursor: 'pointer', background: 'none', border: 'none', transition: 'background 0.15s' }}
                    onMouseEnter={e => e.currentTarget.style.background = '#f7f9fc'}
                    onMouseLeave={e => e.currentTarget.style.background = 'none'}
                  >
                    <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                      <div style={{ width: 48, height: 48, borderRadius: 10, background: bg, display: 'flex', alignItems: 'center', justifyContent: 'center', color: color, fontSize: 16, fontWeight: 800, fontFamily: 'Manrope, sans-serif' }}>
                        {isPG ? 'PG' : `Y${i + 1}`}
                      </div>
                      <div>
                        <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 14, color: '#1a1a2e' }}>{item.year}</div>
                        <div style={{ fontSize: 11, color: '#888', marginTop: 2, fontFamily: 'Inter, sans-serif' }}>Last Updated: {item.updated}</div>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <span className={`vs-badge vs-badge-${isPG ? 'teal' : 'blue'}`}>{item.subjects.length} Subjects</span>
                      <div style={{ color: '#aaa' }}>
                        {isOpen ? <FiChevronUp size={18} /> : <FiChevronDown size={18} />}
                      </div>
                    </div>
                  </button>

                  <AnimatePresence>
                    {isOpen && (
                      <motion.div initial={{ height: 0, opacity: 0 }} animate={{ height: 'auto', opacity: 1 }} exit={{ height: 0, opacity: 0 }} style={{ overflow: 'hidden', borderTop: '1px solid #f2f4f7' }}>
                        <div style={{ padding: '1.5rem 1.75rem', background: '#fcfcfd' }}>
                          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))', gap: 10, marginBottom: 20 }}>
                            {item.subjects.map((subj, j) => (
                              <div key={j} style={{ background: '#ffffff', border: '1px solid #eaecf0', borderRadius: 8, padding: '10px 14px', display: 'flex', alignItems: 'center', gap: 10 }}>
                                <div style={{ width: 4, height: 4, borderRadius: '50%', background: '#009688' }} />
                                <span style={{ fontSize: 13, color: '#555e6b', fontFamily: 'Inter, sans-serif' }}>{subj}</span>
                              </div>
                            ))}
                          </div>
                          
                          <div style={{ display: 'flex', gap: 12 }}>
                            <button onClick={() => handleDownload(item.year)} className="vs-btn vs-btn-primary" style={{ height: 40, fontSize: 12 }}>
                              <FiDownload size={14} /> Download PDF
                            </button>
                            <button className="vs-btn vs-btn-ghost" style={{ height: 40, fontSize: 12 }}>
                              <FiExternalLink size={14} /> View Online
                            </button>
                          </div>
                        </div>
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
              );
            })}
          </div>

          <div style={{ marginTop: 40, padding: '1.5rem', background: '#e6f0fb', border: '1px solid #b5cce8', borderRadius: 12 }}>
            <p style={{ fontSize: 12, color: '#0c447c', lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>
              <strong>Notice:</strong> All syllabi are based on current DCI (Dental Council of India) regulations and RGUHS university guidelines. Students are advised to periodically check the official DCI portal for any mid-term amendments.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Syllabus;

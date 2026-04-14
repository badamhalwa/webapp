import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { departments } from '../data/mockData';
import { FiUsers, FiActivity, FiChevronDown, FiChevronUp, FiUser, FiCalendar } from 'react-icons/fi';

const ACCENT_CYCLE = ['blue', 'red', 'teal', 'green'];
const accentColors  = { blue: '#003580', red: '#e8282b', teal: '#009688', green: '#276a27' };
const accentBgs     = { blue: '#e6f0fb', red: '#fdeaea', teal: '#e6f7f5', green: '#eaf5ee' };

const Departments = () => {
  const [expanded, setExpanded] = useState(null);

  return (
    <div style={{ background: '#ffffff' }}>

      {/* ── Page Hero ── */}
      <section style={{ background: '#003580', padding: '3rem 2rem 2.5rem' }}>
        <div className="max-w-7xl mx-auto">
          <nav style={{ marginBottom: 10 }}>
            <a href="/" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: 12 }}>Home</a>
            <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 6px', fontSize: 12 }}>/</span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Departments</span>
          </nav>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 10 }}>
            Our Departments
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif', maxWidth: 560, lineHeight: 1.7 }}>
            9 specialized departments staffed by expert faculty, delivering world-class dental education and patient care.
          </p>
        </div>
      </section>

      {/* ── Departments Accordion ── */}
      <div className="vs-section">
        <div className="max-w-7xl mx-auto">
          <div className="vs-section-header">
            <div>
              <div className="vs-section-title">Clinical Departments</div>
              <div className="vs-section-sub">Select any department to view full details</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
            {departments.map((dept, i) => {
              const accent  = ACCENT_CYCLE[i % ACCENT_CYCLE.length];
              const color   = accentColors[accent];
              const iconBg  = accentBgs[accent];
              const isOpen  = expanded === dept.id;

              return (
                <motion.div key={dept.id} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <div className="vs-card" style={{ overflow: 'hidden', borderTop: `3px solid ${color}` }}>
                    {/* Header button */}
                    <button
                      onClick={() => setExpanded(isOpen ? null : dept.id)}
                      style={{ width: '100%', padding: '1.25rem 1.5rem', textAlign: 'left', display: 'flex', alignItems: 'flex-start', gap: 14, cursor: 'pointer', background: 'none', border: 'none', transition: 'background 0.15s' }}
                      onMouseEnter={e => e.currentTarget.style.background = '#f7f9fc'}
                      onMouseLeave={e => e.currentTarget.style.background = 'none'}
                      aria-expanded={isOpen}
                    >
                      {/* Icon */}
                      <div style={{ width: 44, height: 44, borderRadius: 8, background: iconBg, display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                        <FiActivity size={20} color={color} />
                      </div>

                      <div style={{ flex: 1 }}>
                        <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 14, color: '#1a1a2e', marginBottom: 4 }}>{dept.name}</div>
                        <div style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.55, fontFamily: 'Inter, sans-serif', marginBottom: 8 }}>{dept.desc}</div>
                        <div style={{ display: 'flex', gap: 16, alignItems: 'center' }}>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#888', fontFamily: 'Inter, sans-serif' }}>
                            <FiUser size={11} /> {dept.faculty} Faculty
                          </span>
                          <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#888', fontFamily: 'Inter, sans-serif' }}>
                            <FiUsers size={11} /> {dept.patients?.toLocaleString()} patients/yr
                          </span>
                        </div>
                      </div>

                      <div style={{ color: '#aaa', flexShrink: 0, marginTop: 2 }}>
                        {isOpen ? <FiChevronUp size={16} /> : <FiChevronDown size={16} />}
                      </div>
                    </button>

                    {/* Expanded panel */}
                    <AnimatePresence>
                      {isOpen && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          transition={{ duration: 0.2 }}
                          style={{ overflow: 'hidden', borderTop: '1px solid #f0f4f8' }}
                        >
                          <div style={{ padding: '1.25rem 1.5rem', background: '#f7f9fc', display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', gap: 12 }}>
                            {[
                              { label: 'Head of Department', value: dept.hod },
                              { label: 'Faculty Members',    value: `${dept.faculty} Professors` },
                              { label: 'Annual Patient Load',value: dept.patients?.toLocaleString() },
                            ].map((item, j) => (
                              <div key={j} style={{ background: '#ffffff', borderRadius: 8, padding: '0.875rem 1rem', border: '1px solid #eaecf0' }}>
                                <div style={{ fontSize: 10, color: '#888', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 4 }}>{item.label}</div>
                                <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a2e', fontFamily: 'Manrope, sans-serif' }}>{item.value}</div>
                              </div>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Departments;

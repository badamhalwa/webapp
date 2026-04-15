import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { scheduleData } from '../../data/mockData';
import { FiClock, FiCalendar, FiMapPin } from 'react-icons/fi';

const years = Object.keys(scheduleData);

const Schedule = () => {
  const { t } = useTranslation();
  const [selectedYear, setSelectedYear] = useState(years[0]);
  const data = scheduleData[selectedYear] || [];

  const periodColors = [
    { bg: '#e6f0fb', text: '#0c447c', label: 'Lecture' },   // Period 1
    { bg: '#e6f7f5', text: '#085041', label: 'Lab' },       // Period 2
    { bg: '#f1effe', text: '#3c3489', label: 'Seminar' },   // Period 3
    { bg: '#f9fafb', text: '#6b7280', label: 'Lunch', italic: true }, // Lunch
    { bg: '#fcf8e3', text: '#8a6d3b', label: 'Clinical' },  // Period 4
    { bg: '#fdeaea', text: '#991b1b', label: 'Extra' },     // Period 5
  ];

  return (
    <div style={{ background: '#ffffff' }}>
      
      {/* ── Page Hero ── */}
      <section style={{ background: '#003580', padding: '3rem 2rem 2.5rem' }}>
        <div className="max-w-7xl mx-auto">
          <nav className="vs-breadcrumb" style={{ marginBottom: 10 }}>
            <a href="/" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: 12 }}>Home</a>
            <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 6px', fontSize: 12 }}>/</span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Academic Schedule</span>
          </nav>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 10 }}>
            Lecture Timetable
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif', maxWidth: 560, lineHeight: 1.7 }}>
            View interactive schedules for BDS and MDS programs across all professional years.
          </p>
        </div>
      </section>

      <div className="vs-section">
        <div className="max-w-7xl mx-auto">
          
          {/* Controls Bar */}
          <div style={{ display: 'flex', alignItems: 'center', gap: 16, marginBottom: 32, flexWrap: 'wrap', background: '#f7f9fc', padding: '1rem 1.5rem', borderRadius: 12, border: '1px solid #eaecf0' }}>
            <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a2e', fontFamily: 'Manrope, sans-serif' }}>Year / Program:</div>
            <select 
              value={selectedYear} 
              onChange={e => setSelectedYear(e.target.value)}
              style={{ padding: '8px 16px', borderRadius: 8, border: '1px solid #dde4ed', fontSize: 13, fontFamily: 'Inter, sans-serif', outline: 'none', background: '#fff' }}
            >
              {years.map(y => <option key={y} value={y}>{y}</option>)}
            </select>
            <div className="vs-badge vs-badge-blue" style={{ marginLeft: 'auto' }}>Academic Session 2026-27</div>
          </div>

          {!data || data.length === 0 ? (
            <div className="vs-card" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#f7f9fc', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#ccc' }}>
                <FiCalendar size={32} />
              </div>
              <p style={{ color: '#888', fontSize: 14, fontFamily: 'Inter, sans-serif' }}>Schedule not yet published for this academic year.</p>
            </div>
          ) : (
            <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} key={selectedYear}>
              {/* Desktop Table View */}
              <div className="hidden md:block">
                <div className="vs-card" style={{ overflow: 'hidden' }}>
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: '#003580' }}>
                        <th style={{ padding: '14px 24px', textAlign: 'left', fontSize: 12, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'Inter, sans-serif', width: 140 }}>Day</th>
                        {['09:00 - 10:00', '10:00 - 11:00', '11:00 - 12:00', '12:00 - 01:00', '01:00 - 02:00', '02:00 - 03:00'].map((time, i) => (
                          <th key={i} style={{ padding: '14px 12px', textAlign: 'left', fontSize: 10, color: 'rgba(255,255,255,0.7)', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'Inter, sans-serif' }}>
                            <div style={{ color: '#fff', fontSize: 11, marginBottom: 2 }}>{i === 3 ? 'Lunch' : `Period ${i > 3 ? i : i + 1}`}</div>
                            {time}
                          </th>
                        ))}
                      </tr>
                    </thead>
                    <tbody>
                      {data.map((row, ri) => (
                        <tr key={ri} style={{ borderBottom: '1px solid #f2f4f7', background: ri % 2 !== 0 ? '#fcfcfd' : '#fff' }}>
                          <td style={{ padding: '16px 24px', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 14, color: '#1a1a2e' }}>{row.day}</td>
                          {row.periods.map((period, pi) => (
                            <td key={pi} style={{ padding: '12px' }}>
                              <div style={{ 
                                padding: '10px 14px', 
                                borderRadius: 8, 
                                background: periodColors[pi % periodColors.length].bg, 
                                color: periodColors[pi % periodColors.length].text,
                                fontSize: 12,
                                fontWeight: 600,
                                fontFamily: 'Inter, sans-serif',
                                fontStyle: periodColors[pi % periodColors.length].italic ? 'italic' : 'normal',
                                border: '1px solid rgba(0,0,0,0.03)'
                              }}>
                                {period}
                              </div>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>

              {/* Mobile Card View */}
              <div className="md:hidden space-y-4">
                {data.map((row, ri) => (
                  <div key={ri} className="vs-card" style={{ padding: '1.25rem' }}>
                    <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 16, color: '#003580', borderBottom: '1px solid #f0f4f8', paddingBottom: 10, marginBottom: 12 }}>{row.day}</div>
                    <div className="space-y-3">
                      {row.periods.map((period, pi) => (
                        <div key={pi} style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                          <div style={{ fontSize: 10, color: '#888', width: 60, textTransform: 'uppercase', fontWeight: 600 }}>{pi === 3 ? 'LUNCH' : `P${pi > 3 ? pi : pi + 1}`}</div>
                          <div style={{ flex: 1, padding: '8px 12px', borderRadius: 6, background: periodColors[pi % periodColors.length].bg, color: periodColors[pi % periodColors.length].text, fontSize: 12, fontWeight: 600 }}>{period}</div>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </motion.div>
          )}

          {/* Legend */}
          <div style={{ marginTop: 32, display: 'flex', gap: 10, flexWrap: 'wrap' }}>
            {periodColors.map((pc, i) => (
              <div key={i} style={{ padding: '6px 12px', borderRadius: 6, background: pc.bg, color: pc.text, fontSize: 11, fontWeight: 700, textTransform: 'uppercase', display: 'flex', alignItems: 'center', gap: 6 }}>
                <div style={{ width: 6, height: 6, borderRadius: '50%', background: pc.text }} />
                {pc.label}
              </div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Schedule;

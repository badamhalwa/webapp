import React from 'react';
import { motion } from 'framer-motion';
import { achievements } from '../data/mockData';
import { FiAward, FiCheckCircle, FiStar, FiBookOpen, FiGlobe } from 'react-icons/fi';

const rankingData = [
  { rank: '#1',      category: 'Dental Colleges', region: 'Karnataka',   year: 2024, org: 'DCI Rankings' },
  { rank: 'Top 10',  category: 'Dental Colleges', region: 'India',       year: 2024, org: 'NIRF' },
  { rank: 'A++',     category: 'NAAC Grade',      region: 'National',    year: 2023, org: 'NAAC' },
  { rank: 'Platinum',category: 'Green Campus',    region: 'South India', year: 2023, org: 'ISO 14001' },
];

const Achievements = () => (
  <div style={{ background: '#ffffff' }}>

    {/* ── Page Hero ── */}
    <section style={{ background: '#003580', padding: '3rem 2rem 2.5rem' }}>
      <div className="max-w-7xl mx-auto">
        <nav style={{ marginBottom: 10 }}>
          <a href="/" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: 12 }}>Home</a>
          <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 6px', fontSize: 12 }}>/</span>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Achievements</span>
        </nav>
        <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 10 }}>
          Achievements &amp; Awards
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif', maxWidth: 560, lineHeight: 1.7 }}>
          Recognitions that affirm our commitment to excellence in dental education and healthcare.
        </p>
      </div>
    </section>

    {/* ── Rankings ── */}
    <div className="vs-section">
      <div className="max-w-7xl mx-auto">
        <div className="vs-section-header">
          <div>
            <div className="vs-section-title">Rankings &amp; Accreditations</div>
            <div className="vs-section-sub">National and international recognition</div>
          </div>
        </div>
        <div className="vs-grid-4">
          {rankingData.map((r, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.09 }}>
              <div className="vs-card" style={{ padding: '1.75rem', textAlign: 'center', borderTop: '3px solid #003580' }}>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#003580', marginBottom: 6 }}>{r.rank}</div>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 13, color: '#1a1a2e', marginBottom: 4 }}>{r.category}</div>
                <div style={{ fontSize: 11, color: '#888', fontFamily: 'Inter, sans-serif', marginBottom: 8 }}>{r.region} — {r.year}</div>
                <span className="vs-badge vs-badge-teal">{r.org}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    {/* ── Awards ── */}
    <div className="vs-section-alt">
      <div className="max-w-7xl mx-auto">
        <div className="vs-section-header">
          <div>
            <div className="vs-section-title">Awards &amp; Milestones</div>
            <div className="vs-section-sub">A timeline of our key achievements</div>
          </div>
        </div>
        <div className="vs-grid-3">
          {achievements.map((ach, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <div className="vs-card" style={{ padding: '1.5rem', display: 'flex', gap: 16, alignItems: 'flex-start', height: '100%' }}>
                <div style={{ width: 44, height: 44, borderRadius: 8, background: '#fef8e7', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <FiAward size={20} color="#b45309" />
                </div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: '#009688', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: 6, fontFamily: 'Inter, sans-serif' }}>{ach.year}</div>
                  <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 13, color: '#1a1a2e', marginBottom: 6 }}>{ach.title}</div>
                  <div style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.65, fontFamily: 'Inter, sans-serif' }}>{ach.desc}</div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

    {/* ── Stats Bar ── */}
    <div style={{ background: '#003580', padding: '2.5rem 2rem' }}>
      <div className="max-w-7xl mx-auto">
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(4, 1fr)', gap: 0, borderRadius: 10, overflow: 'hidden' }}>
          {[['150+', 'Awards Won', FiAward], ['25+', 'Years of Excellence', FiStar], ['50+', 'Research Papers', FiBookOpen], ['30+', 'International Collaborations', FiGlobe]].map(([v, l, Icon], i) => (
            <motion.div key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div style={{ padding: '1.75rem', textAlign: 'center', borderRight: i < 3 ? '1px solid rgba(255,255,255,0.1)' : 'none' }}>
                <Icon size={22} color="rgba(255,255,255,0.4)" style={{ marginBottom: 10 }} />
                <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#ffffff', marginBottom: 6 }}>{v}</div>
                <div style={{ fontSize: 11, color: 'rgba(255,255,255,0.55)', fontFamily: 'Inter, sans-serif', textTransform: 'uppercase', letterSpacing: '0.05em' }}>{l}</div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

  </div>
);

export default Achievements;

import React from 'react';
import { motion } from 'framer-motion';
import { researchPublications } from '../data/mockData';
import { FiBook, FiPaperclip, FiMic, FiTrendingUp, FiLayers, FiDatabase, FiExternalLink } from 'react-icons/fi';

const ongoingProjects = [
  { title: 'AI-driven early detection of oral cancer', pi: 'Dr. Arun Prasad', funding: 'ICMR', status: 'Ongoing' },
  { title: 'Microbiome analysis of periodontitis patients', pi: 'Dr. Vijay Kumar', funding: 'DST', status: 'Ongoing' },
  { title: 'Novel biomaterials for bone regeneration', pi: 'Dr. Suresh Kumar', funding: 'DBT', status: 'Ongoing' },
  { title: 'Digital workflow in prosthodontic rehabilitation', pi: 'Dr. Anitha Rao', funding: 'Self-funded', status: 'Ongoing' },
];

const Research = () => (
  <div style={{ background: '#ffffff' }}>

    {/* ── Page Hero ── */}
    <section style={{ background: '#003580', padding: '3rem 2rem 2.5rem' }}>
      <div className="max-w-7xl mx-auto">
        <nav style={{ marginBottom: 10 }}>
          <a href="/" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: 12 }}>Home</a>
          <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 6px', fontSize: 12 }}>/</span>
          <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Research</span>
        </nav>
        <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 10 }}>
          Research &amp; Publications
        </h1>
        <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif', maxWidth: 560, lineHeight: 1.7 }}>
          Advancing dental science through high-impact research, innovation and evidence-based practice.
        </p>
      </div>
    </section>

    <div className="vs-section">
      <div className="max-w-7xl mx-auto">
        {/* Stats Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }}>
          {[
            { val: '50+', label: 'Publications', Icon: FiBook, color: '#003580' },
            { val: '12', label: 'Ongoing Projects', Icon: FiTrendingUp, color: '#009688' },
            { val: '₹2Cr+', label: 'Research Funding', Icon: FiDatabase, color: '#e8282b' }
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="vs-card" style={{ padding: '1.5rem', textAlign: 'center' }}>
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#f7f9fc', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 12px' }}>
                  <item.Icon size={18} color={item.color} />
                </div>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '1.75rem', color: item.color, marginBottom: 4 }}>{item.val}</div>
                <div style={{ fontSize: 12, color: '#6b7280', fontFamily: 'Inter, sans-serif', fontWeight: 500 }}>{item.label}</div>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="vs-section-header">
          <div>
            <div className="vs-section-title">Recent Publications</div>
            <div className="vs-section-sub">Peer-reviewed research from our faculty in leading international journals</div>
          </div>
        </div>

        <div style={{ display: 'flex', flexDirection: 'column', gap: 12, marginBottom: 44 }}>
          {researchPublications.map((pub, i) => (
            <motion.div key={i} initial={{ opacity: 0, x: -16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
              <div className="vs-card" style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 14, color: '#1a1a2e', marginBottom: 4 }}>{pub.title}</div>
                  <div style={{ fontSize: 12, color: '#555e6b', fontFamily: 'Inter, sans-serif', marginBottom: 8 }}>{pub.authors}</div>
                  <div style={{ display: 'flex', gap: 8 }}>
                    <span className="vs-badge vs-badge-blue">{pub.journal}</span>
                    <span className="vs-badge vs-badge-teal">{pub.department}</span>
                    <span className="vs-badge vs-badge-default">{pub.year}</span>
                  </div>
                </div>
                <button style={{ color: '#003580', display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, fontWeight: 700, background: 'none', border: 'none', cursor: 'pointer', fontFamily: 'Manrope, sans-serif' }}>
                  View paper <FiExternalLink size={12} />
                </button>
              </div>
            </motion.div>
          ))}
        </div>

        <div className="vs-section-header">
          <div>
            <div className="vs-section-title">Ongoing Research Projects</div>
            <div className="vs-section-sub">Current investigative studies across various dental disciplines</div>
          </div>
        </div>

        <div className="vs-grid-2">
          {ongoingProjects.map((p, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
              <div className="vs-card" style={{ padding: '1.5rem', borderLeft: '4px solid #009688' }}>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 14, color: '#1a1a2e', marginBottom: 6 }}>{p.title}</div>
                <div style={{ fontSize: 12, color: '#6b7280', fontFamily: 'Inter, sans-serif', marginBottom: 12 }}>
                  Principal Investigator: <strong style={{ color: '#1a1a2e' }}>{p.pi}</strong>
                </div>
                <div style={{ display: 'flex', gap: 8 }}>
                  <span className="vs-badge vs-badge-blue" style={{ background: '#f0f4f8', color: '#475467' }}>{p.funding}</span>
                  <span className="vs-badge vs-badge-teal">Active</span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </div>

  </div>
);

export default Research;

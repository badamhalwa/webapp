import React from 'react';
import { motion } from 'framer-motion';
import { departments, doctors } from '../data/mockData';
import { FiUser, FiActivity, FiAward, FiBookOpen } from 'react-icons/fi';
import principalImg from '../assets/principal.png';

const ACCENT_CYCLE = ['blue', 'red', 'teal', 'green'];
const accentColors  = { blue: '#003580', red: '#e8282b', teal: '#009688', green: '#276a27' };
const accentBgs     = { blue: '#e6f0fb', red: '#fdeaea', teal: '#e6f7f5', green: '#eaf5ee' };

const Faculty = () => {
  return (
    <div style={{ background: '#ffffff' }}>
      
      {/* ── Page Hero ── */}
      <section style={{ background: '#003580', padding: '3rem 2rem 2.5rem' }}>
        <div className="max-w-7xl mx-auto">
          <nav className="vs-breadcrumb" style={{ marginBottom: 10 }}>
            <a href="/" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: 12 }}>Home</a>
            <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 6px', fontSize: 12 }}>/</span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Faculty Directory</span>
          </nav>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 10 }}>
            Our Distinguished Faculty
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif', maxWidth: 560, lineHeight: 1.7 }}>
            Meet the world-class educators and clinical experts shaping the next generation of dental professionals at RRDCH.
          </p>
        </div>
      </section>

      {/* ── Principal's Profile Section ── */}
      <div className="vs-section">
        <div className="max-w-7xl mx-auto">
          <div className="vs-section-header">
            <div className="vs-section-title">Principal & Leadership</div>
          </div>
          <div className="vs-card" style={{ padding: '2.5rem', display: 'grid', gridTemplateColumns: 'minmax(200px, 220px) 1fr', gap: '2.5rem', alignItems: 'start' }}>
            {/* Avatar */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 140, height: 140, borderRadius: '50%', background: '#003580', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 0 0 4px #e6f0fb', overflow: 'hidden' }}>
                <img src={principalImg} alt="Dr. Girish H.C." style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: '1.2rem', color: '#1a1a2e' }}>Dr. Girish H.C.</div>
              <div style={{ fontSize: 12, color: '#003580', fontFamily: 'Inter, sans-serif', marginTop: 4, fontWeight: 600 }}>Principal & Dean</div>
              <div style={{ fontSize: 11, color: '#888', fontFamily: 'Inter, sans-serif', marginTop: 2 }}>MDS, PhD</div>
            </div>
            {/* Stats / Message */}
            <div>
              <div style={{ width: 3, height: 40, background: '#003580', borderRadius: 2, marginBottom: 20 }} />
              <div style={{ marginBottom: 24 }}>
                <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 16, color: '#1a1a2e', marginBottom: 8 }}>Leading with Academic Excellence</h3>
                <p style={{ fontSize: 13.5, lineHeight: 1.85, color: '#555e6b', fontFamily: 'Inter, sans-serif', fontStyle: 'italic' }}>
                  "At Rajarajeshwari Dental College and Hospital, our strength lies in our exceptionally qualified faculty members. Each professor brings a wealth of clinical experience and academic rigour to ensure our students receive the finest dental education in the country."
                </p>
              </div>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 16 }}>
                {[
                  { label: 'Total Faculty', value: '50+ Experts', icon: FiAward },
                  { label: 'Clinical Units', value: '9 Departments', icon: FiActivity },
                ].map((stat, i) => (
                  <div key={i} style={{ background: '#f7f9fc', padding: '1rem 1.25rem', borderRadius: 8, border: '1px solid #eaecf0', display: 'flex', alignItems: 'center', gap: 12 }}>
                    <div style={{ width: 36, height: 36, borderRadius: 6, background: '#ffffff', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#003580', border: '1px solid #eaecf0' }}>
                      <stat.icon size={18} />
                    </div>
                    <div>
                      <div style={{ fontSize: 10, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600 }}>{stat.label}</div>
                      <div style={{ fontSize: 14, fontWeight: 700, color: '#1a1a2e', fontFamily: 'Manrope, sans-serif' }}>{stat.value}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Faculty Groups ── */}
      <div className="vs-section-alt">
        <div className="max-w-7xl mx-auto">
          <div className="vs-section-header">
            <div>
              <div className="vs-section-title">Departmental Faculty</div>
              <div className="vs-section-sub">Clinical specialists listed by their respective departments</div>
            </div>
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', gap: 20 }}>
            {departments.map((dept, i) => {
              const accent  = ACCENT_CYCLE[i % ACCENT_CYCLE.length];
              const color   = accentColors[accent];
              const deptDoctors = doctors[dept.id] || [];

              return (
                <motion.div 
                  key={dept.id} 
                  initial={{ opacity: 0, y: 16 }} 
                  whileInView={{ opacity: 1, y: 0 }} 
                  viewport={{ once: true }} 
                  transition={{ delay: i * 0.05 }}
                >
                  <div className="vs-card" style={{ height: '100%', display: 'flex', flexDirection: 'column', borderTop: `3px solid ${color}` }}>
                    {/* Dept Header */}
                    <div style={{ padding: '1.25rem 1.5rem', background: '#ffffff', borderBottom: '1px solid #f0f4f8' }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 8, background: accentBgs[accent], display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                          <FiBookOpen size={20} color={color} />
                        </div>
                        <div>
                          <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 14, color: '#1a1a2e' }}>{dept.name}</div>
                          <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{deptDoctors.length} Faculty Members</div>
                        </div>
                      </div>
                    </div>

                    {/* Doctor List */}
                    <div style={{ padding: '1.25rem 1.5rem', flex: 1, background: '#ffffff' }}>
                      <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                        {deptDoctors.map((doc, dIdx) => (
                          <div key={doc.id} style={{ display: 'flex', alignItems: 'start', gap: 10 }}>
                            <div style={{ width: 4, height: 4, borderRadius: '50%', background: color, marginTop: 7, flexShrink: 0 }} />
                            <div>
                              <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a2e', fontFamily: 'Inter, sans-serif' }}>
                                {doc.name}
                              </div>
                              {dIdx === 0 && (
                                <div style={{ fontSize: 10, color: color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.02em', marginTop: 1 }}>
                                  Head of Department
                                </div>
                              )}
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              );
            })}
          </div>
        </div>
      </div>

      {/* ── Admissions Banner (Standard UI) ── */}
      <div className="vs-section">
        <div className="max-w-4xl mx-auto text-center" style={{ padding: '3rem 0' }}>
          <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '1.75rem', color: '#1a1a2e', marginBottom: 12 }}>Ready to learn from the best?</h2>
          <p style={{ fontSize: 14, color: '#555e6b', marginBottom: 24, maxWidth: 600, margin: '0 auto 30px' }}>
            Our faculty members are mentors who guide you through every clinical challenge. Start your journey at RRDCH today.
          </p>
          <a href="/admissions" className="vs-btn vs-btn-primary" style={{ padding: '12px 32px' }}>
            Admissions Inquiry
          </a>
        </div>
      </div>

    </div>
  );
};

export default Faculty;

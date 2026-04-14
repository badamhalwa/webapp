import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiTarget, FiEye, FiAward, FiHeart, FiZap, FiShield, FiUser } from 'react-icons/fi';

const timeline = [
  { year: '2001', event: 'RRDCH Founded — first BDS batch admitted' },
  { year: '2005', event: 'MDS programs launched across 6 specialties' },
  { year: '2010', event: 'New hospital block with 150 dental chairs commissioned' },
  { year: '2015', event: 'NAAC accreditation obtained — A grade' },
  { year: '2018', event: 'Research Centre established; international collaborations begun' },
  { year: '2020', event: 'Digital health transformation — paperless patient records' },
  { year: '2023', event: 'Upgraded to NAAC A++ — top dental college in Karnataka' },
  { year: '2024', event: 'AI-powered diagnostic lab inaugurated' },
];

const values = [
  { Icon: FiAward,  title: 'Excellence',  desc: 'Pursuing the highest standards in dental education and patient care.' },
  { Icon: FiHeart,  title: 'Compassion',  desc: 'Treating every patient with empathy, dignity and respect.' },
  { Icon: FiZap,    title: 'Innovation',  desc: 'Embracing evidence-based practices and cutting-edge research.' },
  { Icon: FiShield, title: 'Integrity',   desc: 'Maintaining the highest ethical standards in all we do.' },
];

const About = () => {
  const { t } = useTranslation();

  return (
    <div style={{ background: '#ffffff' }}>

      {/* ── Page Hero ── */}
      <section style={{ background: '#003580', padding: '3rem 2rem 2.5rem' }}>
        <div className="max-w-7xl mx-auto">
          <nav className="vs-breadcrumb" style={{ marginBottom: 10 }}>
            <a href="/" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: 12 }}>Home</a>
            <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 6px', fontSize: 12 }}>/</span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>About Us</span>
          </nav>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 10 }}>
            About RRDCH
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif', maxWidth: 560, lineHeight: 1.7 }}>
            A premier institution blending academic excellence with compassionate patient care — shaping dental professionals since 2001.
          </p>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <div className="vs-section">
        <div className="max-w-7xl mx-auto" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {[
            {
              Icon: FiTarget, color: '#003580', bg: '#e6f0fb',
              title: 'Our Mission',
              text: 'To provide comprehensive, high-quality dental education that equips students with scientific knowledge, clinical competence and ethical values to serve society. To deliver excellence in patient care through evidence-based dentistry, cutting-edge technology and compassionate service to the community.',
            },
            {
              Icon: FiEye, color: '#009688', bg: '#e6f7f5',
              title: 'Our Vision',
              text: 'To be a globally recognised centre of excellence in dental education, research and oral health services. To nurture dental professionals who are compassionate leaders and global citizens committed to improving the oral health and overall well-being of communities worldwide.',
            },
          ].map((item, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
              <div className="vs-card" style={{ padding: '2rem', borderTop: `3px solid ${item.color}`, height: '100%' }}>
                <div style={{ width: 44, height: 44, borderRadius: 8, background: item.bg, display: 'flex', alignItems: 'center', justifyContent: 'center', marginBottom: 16 }}>
                  <item.Icon size={22} color={item.color} />
                </div>
                <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '1.15rem', color: '#1a1a2e', marginBottom: 12, letterSpacing: '-0.01em' }}>
                  {item.title}
                </h2>
                <p style={{ fontSize: 13, lineHeight: 1.8, color: '#555e6b', fontFamily: 'Inter, sans-serif' }}>
                  {item.text}
                </p>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* ── Core Values ── */}
      <div className="vs-section-alt">
        <div className="max-w-7xl mx-auto">
          <div className="vs-section-header">
            <div>
              <div className="vs-section-title">Core Values</div>
              <div className="vs-section-sub">The principles that guide everything we do</div>
            </div>
          </div>
          <div className="vs-grid-4">
            {values.map((v, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.09 }}>
                <div className="vs-card" style={{ padding: '1.75rem', textAlign: 'center' }}>
                  <div style={{ width: 52, height: 52, borderRadius: '50%', background: '#e6f0fb', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <v.Icon size={22} color="#003580" />
                  </div>
                  <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 15, color: '#1a1a2e', marginBottom: 8 }}>{v.title}</div>
                  <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>{v.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Principal's Message ── */}
      <div className="vs-section">
        <div className="max-w-7xl mx-auto">
          <div className="vs-section-header">
            <div className="vs-section-title">Principal's Message</div>
          </div>
          <div className="vs-card" style={{ padding: '2.5rem', display: 'grid', gridTemplateColumns: '220px 1fr', gap: '2.5rem', alignItems: 'start' }}>
            {/* Avatar */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 120, height: 120, borderRadius: '50%', background: '#003580', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                <FiUser size={48} color="rgba(255,255,255,0.8)" />
              </div>
              <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 15, color: '#1a1a2e' }}>Dr. Suresh Babu R</div>
              <div style={{ fontSize: 12, color: '#003580', fontFamily: 'Inter, sans-serif', marginTop: 4, fontWeight: 600 }}>Principal &amp; Dean</div>
              <div style={{ fontSize: 11, color: '#888', fontFamily: 'Inter, sans-serif', marginTop: 2 }}>MDS, PhD, FICD</div>
            </div>
            {/* Message */}
            <div>
              <div style={{ width: 3, height: 60, background: '#003580', borderRadius: 2, marginBottom: 20 }} />
              {[
                '"Welcome to Rajarajeshwari Dental College and Hospital — an institution that has been shaping dental professionals for over two decades. Our commitment to excellence is reflected in every classroom, clinic and research lab on our campus."',
                '"We believe that great dentists are not just technically proficient — they are compassionate human beings who understand the profound impact of oral health on overall well-being. At RRDCH, we nurture both dimensions of this calling."',
                '"Our world-class faculty, state-of-the-art facilities, and a culture of curiosity and innovation ensure that our graduates are ready to meet the challenges of modern dentistry. I invite you to be part of our vibrant community."',
              ].map((p, i) => (
                <p key={i} style={{ fontSize: 13.5, lineHeight: 1.85, color: '#374151', fontFamily: 'Inter, sans-serif', marginBottom: 16, fontStyle: 'italic' }}>{p}</p>
              ))}
              <div style={{ fontSize: 13, fontWeight: 700, color: '#003580', fontFamily: 'Manrope, sans-serif', marginTop: 8 }}>— Dr. Suresh Babu R, Principal &amp; Dean</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Timeline ── */}
      <div className="vs-section-alt">
        <div className="max-w-5xl mx-auto">
          <div className="vs-section-header" style={{ justifyContent: 'center', textAlign: 'center', flexDirection: 'column', gap: 4 }}>
            <div className="vs-section-title">Milestones</div>
            <div className="vs-section-sub">Our journey of growth and excellence</div>
          </div>

          <div style={{ position: 'relative' }}>
            {/* Center line */}
            <div style={{ position: 'absolute', left: '50%', top: 0, bottom: 0, width: 2, background: '#eaecf0', transform: 'translateX(-50%)' }} />

            {timeline.map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: i % 2 === 0 ? -24 : 24 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true }}
                transition={{ delay: i * 0.08 }}
                style={{ display: 'flex', alignItems: 'center', gap: 20, marginBottom: 20, flexDirection: i % 2 === 0 ? 'row' : 'row-reverse' }}
              >
                {/* Card */}
                <div style={{ flex: 1 }}>
                  <div className="vs-card" style={{ padding: '1rem 1.25rem', textAlign: i % 2 === 0 ? 'right' : 'left' }}>
                    <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 14, color: '#003580', marginBottom: 4 }}>{item.year}</div>
                    <div style={{ fontSize: 12.5, color: '#555e6b', fontFamily: 'Inter, sans-serif', lineHeight: 1.6 }}>{item.event}</div>
                  </div>
                </div>
                {/* Year dot */}
                <div style={{ width: 44, height: 44, borderRadius: '50%', background: '#003580', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0, zIndex: 1, boxShadow: '0 0 0 4px #e6f0fb' }}>
                  <span style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 11, color: '#fff' }}>{item.year.slice(2)}</span>
                </div>
                {/* Spacer */}
                <div style={{ flex: 1 }} />
              </motion.div>
            ))}
          </div>
        </div>
      </div>

    </div>
  );
};

export default About;

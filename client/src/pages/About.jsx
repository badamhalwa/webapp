import React from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { FiTarget, FiEye, FiAward, FiHeart, FiZap, FiShield, FiUser } from 'react-icons/fi';
import principalImg from '../assets/principal.png';

const About = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  const timeline = [
    { year: '2001', event: lang === 'kn' ? 'RRDCH ಸ್ಥಾಪನೆ — ಮೊದಲ BDS ಬ್ಯಾಚ್ ಪ್ರವೇಶ' : 'RRDCH Founded — first BDS batch admitted' },
    { year: '2005', event: lang === 'kn' ? '6 ಸ್ಪೆಷಾಲಿಟಿಗಳಲ್ಲಿ MDS ಕಾರ್ಯಕ್ರಮಗಳ ಚಾಲನೆ' : 'MDS programs launched across 6 specialties' },
    { year: '2010', event: lang === 'kn' ? '150 ದಂತ ವೈದ್ಯಕೀಯ ಕುರ್ಚಿಗಳೊಂದಿಗೆ ಹೊಸ ಆಸ್ಪತ್ರೆ ಬ್ಲಾಕ್' : 'New hospital block with 150 dental chairs commissioned' },
    { year: '2015', event: lang === 'kn' ? 'NAAC ಮಾನ್ಯತೆ — A ಶ್ರೇಣಿ' : 'NAAC accreditation obtained — A grade' },
    { year: '2018', event: lang === 'kn' ? 'ಸಂಶೋಧನಾ ಕೇಂದ್ರದ ಸ್ಥಾಪನೆ; ಅಂತರರಾಷ್ಟ್ರೀಯ ಸಹಯೋಗ' : 'Research Centre established; international collaborations begun' },
    { year: '2020', event: lang === 'kn' ? 'ಡಿಜಿಟಲ್ ಹೆಲ್ತ್ ರೂಪಾಂತರ — ಪೇಪರ್ ರಹಿತ ರೆಕಾರ್ಡ್ಸ್' : 'Digital health transformation — paperless patient records' },
    { year: '2023', event: lang === 'kn' ? 'NAAC A++ ಗೆ ಅಪ್‌ಗ್ರೇಡ್ — ಕರ್ನಾಟಕದ ಉನ್ನತ ಕಾಲೇಜು' : 'Upgraded to NAAC A++ — top dental college in Karnataka' },
    { year: '2024', event: lang === 'kn' ? 'AI-ಚಾಲಿತ ರೋಗನಿರ್ಣಯ ಲ್ಯಾಬ್ ಉದ್ಘಾಟನೆ' : 'AI-powered diagnostic lab inaugurated' },
  ];

  const values = [
    { Icon: FiAward,  title: t('about.valExcellence'),  desc: t('about.valExcellenceDesc') },
    { Icon: FiHeart,  title: t('about.valCompassion'),  desc: t('about.valCompassionDesc') },
    { Icon: FiZap,    title: t('about.valInnovation'),  desc: t('about.valInnovationDesc') },
    { Icon: FiShield, title: t('about.valIntegrity'),   desc: t('about.valIntegrityDesc') },
  ];

  return (
    <div style={{ background: '#ffffff' }}>

      {/* ── Page Hero ── */}
      <section style={{ background: '#003580', padding: '3rem 2rem 2.5rem' }}>
        <div className="max-w-7xl mx-auto">
          <nav className="vs-breadcrumb" style={{ marginBottom: 10 }}>
            <a href="/" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: 12 }}>{t('nav.home')}</a>
            <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 6px', fontSize: 12 }}>/</span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{t('nav.about')}</span>
          </nav>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 10 }}>
            {t('about.title')}
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif', maxWidth: 560, lineHeight: 1.7 }}>
            {t('about.subtitle')}
          </p>
        </div>
      </section>

      {/* ── Mission & Vision ── */}
      <div className="vs-section">
        <div className="max-w-7xl mx-auto" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
          {[
            {
              Icon: FiTarget, color: '#003580', bg: '#e6f0fb',
              title: t('about.mission'),
              text: t('about.missionText'),
            },
            {
              Icon: FiEye, color: '#009688', bg: '#e6f7f5',
              title: t('about.vision'),
              text: t('about.visionText'),
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
              <div className="vs-section-title">{t('about.values')}</div>
              <div className="vs-section-sub">{t('about.valuesSub')}</div>
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
            <div className="vs-section-title">{t('about.principalMsg')}</div>
          </div>
          <div className="vs-card" style={{ padding: '2.5rem', display: 'grid', gridTemplateColumns: '220px 1fr', gap: '2.5rem', alignItems: 'start' }}>
            {/* Avatar */}
            <div style={{ textAlign: 'center' }}>
              <div style={{ width: 140, height: 140, borderRadius: '50%', background: '#003580', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', boxShadow: '0 0 0 4px #e6f0fb', overflow: 'hidden' }}>
                <img src={principalImg} alt="Dr. Girish H.C." style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
              </div>
              <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 15, color: '#1a1a2e' }}>{t('about.principalTitle')}</div>
              <div style={{ fontSize: 12, color: '#003580', fontFamily: 'Inter, sans-serif', marginTop: 4, fontWeight: 600 }}>{t('about.principalRole')}</div>
              <div style={{ fontSize: 11, color: '#888', fontFamily: 'Inter, sans-serif', marginTop: 2 }}>MDS, PhD</div>
            </div>
            {/* Message */}
            <div>
              <div style={{ width: 3, height: 60, background: '#003580', borderRadius: 2, marginBottom: 20 }} />
              {(lang === 'kn' ? [
                '"ರಾಜರಾಜೇಶ್ವರಿ ದಂತ ಕಾಲೇಜು ಮತ್ತು ಆಸ್ಪತ್ರೆಗೆ ಸುಸ್ವಾಗತ — ಇದು ಕಳೆದ ಎರಡು ದಶಕಗಳಿಂದ ದಂತ ವೃತ್ತಿಪರರನ್ನು ರೂಪಿಸುತ್ತಿರುವ ಪ್ರಮುಖ ಸಂಸ್ಥೆ. ನಮ್ಮ ಶೈಕ್ಷಣಿಕ ಶ್ರೇಷ್ಠತೆಯು ಪ್ರತಿ ತರಗತಿ ಮತ್ತು ಕ್ಲಿನಿಕ್‌ನಲ್ಲಿ ಪ್ರತಿಫಲಿಸುತ್ತದೆ."',
                '"ಉತ್ತಮ ದಂತವೈದ್ಯರು ಕೇವಲ ತಾಂತ್ರಿಕವಾಗಿ ಪರಿಣಿತರಲ್ಲ — ಅವರು ಸಹಾನುಭೂತಿಯುಳ್ಳ ಮನುಷ್ಯರು ಎಂದು ನಾವು ನಂಬುತ್ತೇವೆ. RRDCH ನಲ್ಲಿ, ನಾವು ಈ ಎರಡೂ ಆಯಾಮಗಳನ್ನು ಪೋಷಿಸುತ್ತೇವೆ."',
                '"ನಮ್ಮ ಅತ್ಯುತ್ತಮ ಬೋಧಕ ಸಿಬ್ಬಂದಿ ಮತ್ತು ಆಧುನಿಕ ಸೌಲಭ್ಯಗಳು ನಮ್ಮ ವಿದ್ಯಾರ್ಥಿಗಳು ಸವಾಲುಗಳನ್ನು ಎದುರಿಸಲು ಸಿದ್ಧವಾಗುವಂತೆ ಮಾಡುತ್ತವೆ. ನಮ್ಮ ರೋಮಾಂಚಕ ಸಮುದಾಯದ ಭಾಗವಾಗಲು ನಾನು ನಿಮ್ಮನ್ನು ಆಹ್ವಾನಿಸುತ್ತೇನೆ."',
              ] : [
                '"Welcome to Rajarajeshwari Dental College and Hospital — an institution that has been shaping dental professionals for over two decades. Our commitment to excellence is reflected in every classroom, clinic and research lab on our campus."',
                '"We believe that great dentists are not just technically proficient — they are compassionate human beings who understand the profound impact of oral health on overall well-being. At RRDCH, we nurture both dimensions of this calling."',
                '"Our world-class faculty, state-of-the-art facilities, and a culture of curiosity and innovation ensure that our graduates are ready to meet the challenges of modern dentistry. I invite you to be part of our vibrant community."',
              ]).map((p, i) => (
                <p key={i} style={{ fontSize: 13.5, lineHeight: 1.85, color: '#374151', fontFamily: 'Inter, sans-serif', marginBottom: 16, fontStyle: 'italic' }}>{p}</p>
              ))}
              <div style={{ fontSize: 13, fontWeight: 700, color: '#003580', fontFamily: 'Manrope, sans-serif', marginTop: 8 }}>— {t('about.principalTitle')}, {t('about.principalRole')}</div>
            </div>
          </div>
        </div>
      </div>

      {/* ── Timeline ── */}
      <div className="vs-section-alt">
        <div className="max-w-5xl mx-auto">
          <div className="vs-section-header" style={{ justifyContent: 'center', textAlign: 'center', flexDirection: 'column', gap: 4 }}>
            <div className="vs-section-title">{t('about.milestones')}</div>
            <div className="vs-section-sub">{t('about.milestonesSub')}</div>
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

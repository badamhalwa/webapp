import React from 'react';
import { FiPhone, FiMapPin, FiClock, FiNavigation, FiExternalLink } from 'react-icons/fi';

const Directions = () => {
  return (
    <div style={{ background: '#ffffff' }}>
      
      {/* ── Page Hero ── */}
      <section style={{ background: '#003580', padding: '3rem 2rem 2.5rem' }}>
        <div className="max-w-7xl mx-auto">
          <nav className="vs-breadcrumb" style={{ marginBottom: 10 }}>
            <a href="/" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: 12 }}>Home</a>
            <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 6px', fontSize: 12 }}>/</span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Patients</span>
            <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 6px', fontSize: 12 }}>/</span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Location & Directions</span>
          </nav>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 10 }}>
            Visit Our Campus
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif', maxWidth: 560, lineHeight: 1.7 }}>
            Find your way to Rajarajeshwari Dental College & Hospital located on Mysuru Road, Bengaluru.
          </p>
        </div>
      </section>

      <div className="vs-section">
        <div className="max-w-7xl mx-auto">
          <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0, 2fr) minmax(0, 1fr)', gap: 32 }}>
            
            {/* ── Interactive Map ── */}
            <div>
              <div className="vs-card" style={{ padding: '0.5rem', overflow: 'hidden' }}>
                <iframe
                  title="RRDCH Location Map"
                  src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3888.3099067892317!2d77.46389257507763!3d12.941534787383886!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3bae3f0563de64e5%3A0x1c7b94ed7d21b2e4!2sRajarajeswari%20Dental%20College%20%26%20Hospital!5e0!3m2!1sen!2sin!4v1713000000000!5m2!1sen!2sin"
                  width="100%" height="480" style={{ border: 0, borderRadius: 8 }} allowFullScreen loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade" aria-label="Google Map showing RRDCH location"
                />
              </div>
              <div style={{ marginTop: 16, display: 'flex', justifyContent: 'flex-end' }}>
                 <a href="https://maps.google.com/?q=Rajarajeshwari+Dental+College+Hospital+Bangalore" target="_blank" rel="noopener noreferrer"
                  style={{ display: 'inline-flex', alignItems: 'center', gap: 8, color: '#003580', fontSize: 13, fontWeight: 700, textDecoration: 'none', fontFamily: 'Manrope, sans-serif' }}
                >
                  OPEN IN GOOGLE MAPS <FiExternalLink size={14} />
                </a>
              </div>
            </div>

            {/* ── Information Cards ── */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
              
              <div className="vs-card" style={{ padding: '1.5rem', display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: '#e6f0fb', color: '#003580', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <FiMapPin size={22} />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 14, color: '#1a1a2e', marginBottom: 4 }}>Primary Address</h3>
                  <p style={{ fontSize: 13, color: '#555e6b', lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>
                    Mysuru Road, Kambipura,<br/>Bengaluru, Karnataka 560098
                  </p>
                </div>
              </div>

              <div className="vs-card" style={{ padding: '1.5rem', display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: '#e6f7f5', color: '#009688', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <FiPhone size={22} />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 14, color: '#1a1a2e', marginBottom: 4 }}>Contact Helpline</h3>
                  <div style={{ fontSize: 13, color: '#003580', fontWeight: 600, fontFamily: 'Inter, sans-serif' }}>
                    <a href="tel:08028600988" style={{ color: 'inherit', textDecoration: 'none' }}>080-2860-0988</a><br/>
                    <a href="tel:08028600989" style={{ color: 'inherit', textDecoration: 'none' }}>080-2860-0989</a>
                  </div>
                </div>
              </div>

              <div className="vs-card" style={{ padding: '1.5rem', display: 'flex', gap: 16, alignItems: 'center' }}>
                <div style={{ width: 44, height: 44, borderRadius: 10, background: '#fef8e7', color: '#b45309', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                  <FiClock size={22} />
                </div>
                <div>
                  <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 14, color: '#1a1a2e', marginBottom: 6 }}>Clinical OPD Hours</h3>
                  <div style={{ fontSize: 12, color: '#555e6b', fontFamily: 'Inter, sans-serif', display: 'flex', flexDirection: 'column', gap: 4 }}>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Mon – Fri:</span>
                      <strong style={{ color: '#1a1a2e' }}>9:00 AM – 5:00 PM</strong>
                    </div>
                    <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                      <span>Saturday:</span>
                      <strong style={{ color: '#1a1a2e' }}>9:00 AM – 1:00 PM</strong>
                    </div>
                    <div style={{ marginTop: 4, padding: '4px 8px', borderRadius: 4, background: '#fdeaea', color: '#e8282b', fontSize: 10, fontWeight: 800, textAlign: 'center' }}>
                      EMERGENCY: 24/7
                    </div>
                  </div>
                </div>
              </div>

              <div className="vs-card" style={{ padding: '1.5rem' }}>
                <div style={{ display: 'flex', gap: 16, marginBottom: 16, alignItems: 'center' }}>
                  <div style={{ width: 44, height: 44, borderRadius: 10, background: '#f5f3ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', flexShrink: 0 }}>
                    <FiNavigation size={22} />
                  </div>
                  <div>
                    <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 14, color: '#1a1a2e', marginBottom: 2 }}>Commute Guide</h3>
                    <p style={{ fontSize: 11, color: '#888', fontFamily: 'Inter, sans-serif' }}>Best ways to reach our hospital campus</p>
                  </div>
                </div>
                
                <div style={{ display: 'flex', flexDirection: 'column', gap: 10 }}>
                  {[
                    { mode: 'BMTC BUS', desc: 'Routes 97D, 225, 226 stop at Kambipura Gate.' },
                    { mode: 'METRO', desc: 'Purple Line: Kengeri Metro Station (3 km away).' },
                    { mode: 'BY ROAD', desc: 'Located on Bangalore-Mysuru NH-275.' },
                  ].map((item, idx) => (
                    <div key={idx} style={{ background: '#fcfcfd', border: '1px solid #f2f4f7', borderRadius: 8, padding: '10px 12px' }}>
                      <div style={{ fontSize: 10, fontWeight: 800, color: '#1a1a2e', marginBottom: 2 }}>{item.mode}</div>
                      <div style={{ fontSize: 12, color: '#667085', fontFamily: 'Inter, sans-serif' }}>{item.desc}</div>
                    </div>
                  ))}
                </div>
              </div>

            </div>

          </div>
        </div>
      </div>

    </div>
  );
};

export default Directions;

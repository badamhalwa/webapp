import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { Link } from 'react-router-dom';
import { FiCalendar, FiClock, FiArrowRight, FiActivity, FiCheckCircle, FiArchive } from 'react-icons/fi';

const StatusBadge = ({ status }) => {
  const styles = {
    'booked':    { bg: '#e6f0fb', text: '#003580', label: 'Registered' },
    'confirmed': { bg: '#e6f7f5', text: '#009688', label: 'Verified' },
    'completed': { bg: '#eaf5ee', text: '#276a27', label: 'Visit Done' },
    'cancelled': { bg: '#fdeaea', text: '#e8282b', label: 'Cancelled' }
  };
  const s = styles[status] || { bg: '#f2f4f7', text: '#667085', label: status };
  return (
    <span style={{ 
      padding: '4px 10px', borderRadius: 6, fontSize: 10, fontWeight: 700, 
      background: s.bg, color: s.text, textTransform: 'uppercase', letterSpacing: '0.02em',
      fontFamily: 'Inter, sans-serif'
    }}>{s.label}</span>
  );
};

const PatientFollowUp = () => {
  const { appointments } = useApp();

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
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Visit History</span>
          </nav>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 10 }}>
            Management Portal
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif', maxWidth: 560, lineHeight: 1.7 }}>
            Review your clinical history, access visit summaries and manage upcoming follow-up appointments.
          </p>
        </div>
      </section>

      <div className="vs-section">
        <div className="max-w-4xl mx-auto">
          
          {/* Stats Bar */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: 16, marginBottom: 40 }}>
            {[
              { val: appointments.length, label: 'Total Visits', bg: '#e6f0fb', color: '#003580' },
              { val: appointments.filter(a => a.status === 'completed').length, label: 'Completed', bg: '#e6f7f5', color: '#009688' },
              { val: appointments.filter(a => a.status !== 'completed').length, label: 'Pending', bg: '#fef8e7', color: '#b45309' },
            ].map((stat, i) => (
              <div key={i} className="vs-card" style={{ padding: '1.25rem', textAlign: 'center', background: stat.bg, borderColor: 'transparent' }}>
                <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '2rem', color: stat.color }}>{stat.val}</div>
                <div style={{ fontSize: 11, color: stat.color, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.04em' }}>{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="vs-section-header">
            <div>
              <div className="vs-section-title">Appointment Registry</div>
              <div className="vs-section-sub">Chronological list of all encounters with our clinical departments</div>
            </div>
          </div>

          {appointments.length === 0 ? (
            <div className="vs-card" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
              <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#f7f9fc', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px', color: '#ccc' }}>
                <FiArchive size={32} />
              </div>
              <p style={{ color: '#888', fontSize: 14, fontFamily: 'Inter, sans-serif', marginBottom: 20 }}>No clinical records discovered for your profile.</p>
              <Link to="/patient/book" style={{ textDecoration: 'none' }}>
                <button className="vs-btn vs-btn-primary">Book Initial Consultation</button>
              </Link>
            </div>
          ) : (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {appointments.map((appt, i) => (
                <motion.div key={appt.id} initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <div className="vs-card" style={{ padding: '1.25rem 1.5rem', display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ 
                      width: 44, height: 44, borderRadius: 8, background: '#f7f9fc', 
                      display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#003580' 
                    }}>
                      <FiActivity size={20} />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 8, marginBottom: 2 }}>
                         <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a2e', fontFamily: 'Manrope, sans-serif' }}>{appt.patientName}</div>
                         <div style={{ fontSize: 10, color: '#aaa', fontFamily: 'monospace' }}>{appt.id}</div>
                      </div>
                      <div style={{ fontSize: 11, color: '#6b7280', fontFamily: 'Inter, sans-serif' }}>{appt.department} — Dr. {appt.doctor}</div>
                    </div>
                    <div style={{ textAlign: 'right', display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 4 }}>
                      <div style={{ fontSize: 11, fontWeight: 600, color: '#1a1a2e', display: 'flex', alignItems: 'center', gap: 4 }}>
                        <FiCalendar size={12} /> {appt.date}
                      </div>
                      <StatusBadge status={appt.status} />
                    </div>
                    {appt.status === 'completed' && (
                      <Link to="/patient/book" style={{ textDecoration: 'none', marginLeft: 12 }}>
                        <button className="vs-btn vs-btn-ghost" style={{ padding: '6px 12px', height: 'auto', fontSize: 11 }}>
                           Follow-Up <FiArrowRight size={12} />
                        </button>
                      </Link>
                    )}
                  </div>
                </motion.div>
              ))}
            </div>
          )}

          {/* Clinical Advice */}
          <div style={{ marginTop: 40, padding: '1.5rem', background: '#fef8e7', border: '1px solid #fde68a', borderRadius: 12 }}>
             <div style={{ display: 'flex', gap: 12 }}>
                <FiCheckCircle size={20} color="#b45309" style={{ flexShrink: 0 }} />
                <div>
                   <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 14, color: '#92400e', marginBottom: 4 }}>Patient Safety Guidelines</div>
                   <p style={{ fontSize: 12, color: '#b45309', lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>
                      Always carry your original clinical summaries and prescriptions for all follow-up visits. If you experience acute pain or discomfort, please visit the 24/7 Dental Emergency unit immediately.
                   </p>
                </div>
             </div>
          </div>

        </div>
      </div>

    </div>
  );
};

export default PatientFollowUp;

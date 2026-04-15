import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { StatusBadge } from '../../components/ui/UIComponents';
import { Link } from 'react-router-dom';
import { 
  FiCalendar, FiUsers, FiMessageSquare, FiAlertCircle, 
  FiArrowRight, FiActivity, FiStar, FiClock, FiShield,
  FiFileText, FiUser, FiHome, FiAward
} from 'react-icons/fi';

const AdminDashboard = () => {
  const { appointments, hostelComplaints, feedbacks, queue, updateAppointmentStatus, updateComplaintStatus } = useApp();
  const { t } = useApp(); // If needed for translations, though we use hardcoded text in Admin usually
  
  const handleStatusUpdate = async (id, newStatus) => {
    try {
      await updateAppointmentStatus(id, newStatus);
      // Optional: Add a local toast if react-hot-toast is available
    } catch (err) {
      console.error("Failed to update status:", err);
    }
  };

  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const pendingComplaints = hostelComplaints.filter(c => c.status !== 'resolved').length;
  const todayAppts = appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length;
  const avgRating = feedbacks.length ? (feedbacks.reduce((s, f) => s + f.rating, 0) / feedbacks.length).toFixed(1) : '—';

  const statCards = [
    { label: "Today's Visits", value: todayAppts, icon: FiCalendar, color: '#003580', link: '/patient/track' },
    { label: 'Total Appts', value: appointments.length, icon: FiFileText, color: '#003580', link: '/patient/track' },
    { label: 'Hostel Issues', value: pendingComplaints, icon: FiHome, color: '#e8282b', link: '/student/hostel' },
    { label: 'Experience Score', value: avgRating, icon: FiStar, color: '#009688', link: '/patient/feedback' },
    { label: 'Live Queue', value: queue.length, icon: FiClock, color: '#7c3aed', link: '/patient/queue' },
    { label: 'Feedback Res', value: feedbacks.length, icon: FiMessageSquare, color: '#0284c7', link: '/patient/feedback' },
  ];

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh' }}>
      
      {/* ── Page Hero ── */}
      <section style={{ background: '#003580', padding: '3rem 2rem 2.5rem' }}>
        <div className="max-w-7xl mx-auto">
          <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 12 }}>
            <FiShield size={16} color="rgba(255,255,255,0.6)" />
            <span style={{ color: 'rgba(255,255,255,0.6)', fontSize: 12, fontWeight: 700, textTransform: 'uppercase', letterSpacing: '0.05em' }}>
              Management Dashboard — {today}
            </span>
          </div>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '2.5rem', color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 10 }}>
            Institutional Overview
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif', maxWidth: 640, lineHeight: 1.7 }}>
            Real-time analytics and management interface for appointments, hostel services, and student operations at RRDCH Medical Hub.
          </p>
        </div>
      </section>

      <div className="vs-section">
        <div className="max-w-7xl mx-auto px-4">
          
          {/* Stat Cards Grid */}
          <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(170px, 1fr))', gap: 20, marginBottom: 40 }}>
            {statCards.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} transition={{ delay: i * 0.05 }}>
                <Link to={s.link} style={{ textDecoration: 'none' }}>
                  <motion.div whileHover={{ y: -5 }} className="vs-card" style={{ padding: '24px', textAlign: 'center', background: '#fff' }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: '#f8fafc', color: s.color, display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                      <s.icon size={22} />
                    </div>
                    <div style={{ fontSize: '1.75rem', fontWeight: 800, color: '#1a1a2e', marginBottom: 4 }}>{s.value}</div>
                    <div style={{ fontSize: 11, fontWeight: 700, color: '#64748b', textTransform: 'uppercase' }}>{s.label}</div>
                  </motion.div>
                </Link>
              </motion.div>
            ))}
          </div>

          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 32 }}>
            
            {/* Recent Appointments */}
            <div className="vs-card" style={{ padding: 0 }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '1.1rem', color: '#1a1a2e' }}>Visits Overview</h3>
                <Link to="/patient/track" style={{ fontSize: 12, fontWeight: 700, color: '#003580', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                  Browse All <FiArrowRight />
                </Link>
              </div>
              <div style={{ padding: '12px' }}>
                <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                  <thead>
                    <tr style={{ background: '#f8fafc' }}>
                      {['ID', 'Patient Name', 'Dept', 'Status'].map(h => (
                        <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontSize: 10, fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody style={{ fontSize: 13 }}>
                    {appointments.slice(0, 10).map((appt) => (
                      <tr key={appt.id} style={{ borderBottom: '1px solid #f8fafc' }}>
                        <td style={{ padding: '14px 16px', color: '#64748b', fontFamily: 'monospace' }}>
                          {appt.bookingId ? appt.bookingId : `#${appt.id.slice(0,4)}`}
                        </td>
                        <td style={{ padding: '14px 16px', fontWeight: 700, color: '#334155' }}>{appt.name || appt.patientName}</td>
                        <td style={{ padding: '14px 16px', color: '#64748b' }}>{appt.departmentId ? `Dept ${appt.departmentId}` : appt.department}</td>
                        <td style={{ padding: '14px 16px' }}>
                           <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                             <span style={{ 
                               fontSize: 10, fontWeight: 800, padding: '4px 8px', borderRadius: 6,
                               background: appt.status === 'Completed' ? '#eaf5ee' : appt.status === 'Confirmed' ? '#eef2ff' : '#fff7ed',
                               color: appt.status === 'Completed' ? '#009688' : appt.status === 'Confirmed' ? '#4f46e5' : '#c2410c'
                             }}>
                               {appt.status?.toUpperCase() || 'PENDING'}
                             </span>
                             <div style={{ display: 'flex', gap: 4 }}>
                                {appt.status !== 'Confirmed' && appt.status !== 'Completed' && (
                                  <button onClick={() => handleStatusUpdate(appt.id, 'Confirmed')} style={{ border: 'none', background: '#eef2ff', color: '#4f46e5', fontSize: 9, fontWeight: 700, padding: '4px 8px', borderRadius: 4, cursor: 'pointer' }}>Confirm</button>
                                )}
                                {appt.status !== 'Completed' && (
                                  <button onClick={() => handleStatusUpdate(appt.id, 'Completed')} style={{ border: 'none', background: '#eaf5ee', color: '#009688', fontSize: 9, fontWeight: 700, padding: '4px 8px', borderRadius: 4, cursor: 'pointer' }}>Complete</button>
                                )}
                             </div>
                           </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            {/* Hostel Complaints */}
            <div className="vs-card" style={{ padding: 0 }}>
              <div style={{ padding: '20px 24px', borderBottom: '1px solid #f1f5f9', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '1.1rem', color: '#1a1a2e' }}>Campus Maintenance</h3>
                <Link to="/student/hostel" style={{ fontSize: 12, fontWeight: 700, color: '#003580', textDecoration: 'none', display: 'flex', alignItems: 'center', gap: 4 }}>
                  Open Portal <FiArrowRight />
                </Link>
              </div>
              <div style={{ padding: '12px' }}>
                {hostelComplaints.length === 0 ? (
                  <div style={{ padding: '40px', textAlign: 'center', color: '#94a3b8' }}>
                    <FiActivity size={32} style={{ opacity: 0.3, marginBottom: 12 }} />
                    <p style={{ fontSize: 14 }}>No pending maintenance requests reported.</p>
                  </div>
                ) : (
                  <table style={{ width: '100%', borderCollapse: 'collapse' }}>
                    <thead>
                      <tr style={{ background: '#f8fafc' }}>
                        {['Room', 'Category', 'Submitted On', 'Status'].map(h => (
                          <th key={h} style={{ textAlign: 'left', padding: '12px 16px', fontSize: 10, fontWeight: 800, color: '#64748b', textTransform: 'uppercase' }}>{h}</th>
                        ))}
                      </tr>
                    </thead>
                    <tbody style={{ fontSize: 13 }}>
                      {hostelComplaints.slice(0, 6).map((c) => (
                        <tr key={c.id} style={{ borderBottom: '1px solid #f8fafc' }}>
                          <td style={{ padding: '14px 16px', fontWeight: 700, color: '#334155' }}>{c.room}</td>
                          <td style={{ padding: '14px 16px', color: '#64748b' }}>{c.category}</td>
                          <td style={{ padding: '14px 16px', color: '#64748b' }}>{c.date || 'Today'}</td>
                          <td style={{ padding: '14px 16px' }}>
                            <div style={{ display: 'flex', alignItems: 'center', gap: 8 }}>
                              <span style={{ 
                                fontSize: 10, fontWeight: 800, padding: '4px 8px', borderRadius: 6,
                                background: c.status === 'Resolved' ? '#eaf5ee' : c.status === 'In Progress' ? '#eef2ff' : '#fef2f2',
                                color: c.status === 'Resolved' ? '#009688' : c.status === 'In Progress' ? '#4f46e5' : '#ef4444'
                              }}>
                                {c.status?.toUpperCase() || 'PENDING'}
                              </span>
                              <div style={{ display: 'flex', gap: 4 }}>
                                {c.status !== 'Resolved' && (
                                  <button onClick={() => updateComplaintStatus(c.id, 'In Progress')} style={{ border: 'none', background: '#eef2ff', color: '#4f46e5', fontSize: 9, fontWeight: 700, padding: '4px 8px', borderRadius: 4, cursor: 'pointer' }}>Start</button>
                                )}
                                {c.status !== 'Resolved' && (
                                  <button onClick={() => updateComplaintStatus(c.id, 'Resolved')} style={{ border: 'none', background: '#eaf5ee', color: '#009688', fontSize: 9, fontWeight: 700, padding: '4px 8px', borderRadius: 4, cursor: 'pointer' }}>Fix</button>
                                )}
                              </div>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                )}
              </div>
            </div>

          </div>

          {/* Quick Portal Access */}
          <div style={{ marginTop: 40 }}>
            <h4 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 15, color: '#64748b', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 20 }}>
              Operational Units
            </h4>
            <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(240px, 1fr))', gap: 20 }}>
              {[
                { label: 'Visits Management', path: '/patient/track', icon: FiCalendar, color: '#003580' },
                { label: 'Patient Interaction', path: '/patient/feedback', icon: FiMessageSquare, color: '#009688' },
                { label: 'Hostel Maintenance', path: '/student/hostel', icon: FiHome, color: '#e8282b' },
                { label: 'Academic Support', path: '/student/dashboard', icon: FiAward, color: '#7c3aed' },
              ].map((a, i) => (
                <Link key={i} to={a.path} style={{ textDecoration: 'none' }}>
                  <motion.div whileHover={{ scale: 1.02 }} className="vs-card" style={{ padding: '20px', display: 'flex', alignItems: 'center', gap: 16 }}>
                    <div style={{ width: 44, height: 44, borderRadius: 12, background: '#f8fafc', color: a.color, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                      <a.icon size={20} />
                    </div>
                    <div>
                      <div style={{ fontSize: 14, fontWeight: 800, color: '#1a1a2e' }}>{a.label}</div>
                      <div style={{ fontSize: 11, color: '#64748b' }}>Access Module <FiArrowRight size={10} /></div>
                    </div>
                  </motion.div>
                </Link>
              ))}
            </div>
          </div>

        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

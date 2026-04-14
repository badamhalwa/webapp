import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  FiArrowRight, FiStar, FiCalendar, FiSearch, FiClock,
  FiClipboard, FiMapPin, FiUser, FiUsers, FiAward,
  FiActivity, FiMessageSquare, FiBookOpen, FiPhone, FiMail,
  FiCheckCircle,
} from 'react-icons/fi';
import { departments, testimonials, newsItems, achievements } from '../data/mockData';

/* ─── Animated counter ─────────────────────────────────────────────────────── */
const useCounter = (target, duration = 2000) => {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  useEffect(() => {
    const obs = new IntersectionObserver(([e]) => {
      if (e.isIntersecting) {
        let s = 0;
        const step = target / (duration / 16);
        const timer = setInterval(() => {
          s += step;
          if (s >= target) { setCount(target); clearInterval(timer); }
          else setCount(Math.floor(s));
        }, 16);
        obs.disconnect();
      }
    }, { threshold: 0.3 });
    if (ref.current) obs.observe(ref.current);
    return () => obs.disconnect();
  }, [target, duration]);
  return [count, ref];
};

/* ─── Stat cell ──────────────────────────────────────────────────────────── */
const StatCell = ({ value, suffix = '+', label, Icon }) => {
  const [count, ref] = useCounter(value);
  return (
    <div className="vs-stat" ref={ref}>
      <div className="vs-stat-num">{count.toLocaleString()}{suffix}</div>
      <div className="vs-stat-label">{label}</div>
    </div>
  );
};

/* ─── Quick Link item ────────────────────────────────────────────────────── */
const QLItem = ({ Icon, label, path, bg, color }) => (
  <Link to={path} className="vs-ql-item">
    <div className="vs-ql-icon" style={{ background: bg }}>
      <Icon size={18} color={color} />
    </div>
    <span className="vs-ql-label">{label}</span>
  </Link>
);

/* ─── Department spec card ───────────────────────────────────────────────── */
const ACCENT_CYCLE = ['blue', 'red', 'teal', 'green'];
const iconColors   = { blue: '#0c447c', red: '#b91c1c', teal: '#0f6e56', green: '#276a27' };
const iconBgs      = { blue: '#e6f0fb', red: '#fdeaea', teal: '#e6f7f5', green: '#eaf5ee' };

const SpecCard = ({ dept, idx }) => {
  const accent = ACCENT_CYCLE[idx % ACCENT_CYCLE.length];
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ delay: idx * 0.06 }}
    >
      <Link to="/departments" style={{ textDecoration: 'none' }}>
        <div className="vs-spec-card">
          <div className={`vs-spec-top vs-spec-top-${accent}`} />
          <div className="vs-spec-body">
            <div className="vs-spec-icon" style={{ background: iconBgs[accent] }}>
              <FiActivity size={20} color={iconColors[accent]} />
            </div>
            <div className="vs-spec-name">{dept.name}</div>
            <div className="vs-spec-desc">{dept.desc}</div>
            <div className="vs-spec-count" style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <FiUsers size={10} /> {dept.patients?.toLocaleString()}/yr
              </span>
              <span style={{ color: '#ccc' }}>·</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <FiUser size={10} /> {dept.faculty} Faculty
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

/* ─── Appointment form inside hero ──────────────────────────────────────── */
const AppointmentForm = () => {
  const [form, setForm] = useState({ name: '', dept: '', date: '' });
  const deptOptions = ['Orthodontics', 'Oral Surgery', 'Endodontics', 'Periodontics', 'Paediatric', 'Prosthodontics'];
  return (
    <div className="vs-appt-form">
      <div className="vs-appt-heading">
        <div className="vs-appt-dot" />
        Book an Appointment
      </div>
      <div className="vs-field">
        <label className="vs-label-dark">Your Name</label>
        <input className="vs-input-dark" placeholder="Full name" value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      </div>
      <div className="vs-field">
        <label className="vs-label-dark">Department</label>
        <select className="vs-input-dark" value={form.dept} onChange={e => setForm({ ...form, dept: e.target.value })}
          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}>
          <option value="">Select department</option>
          {deptOptions.map(d => <option key={d} value={d} style={{ color: '#1a1a2e', background: '#fff' }}>{d}</option>)}
        </select>
      </div>
      <div className="vs-field" style={{ marginBottom: 16 }}>
        <label className="vs-label-dark">Preferred Date</label>
        <input type="date" className="vs-input-dark" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
      </div>
      <Link to="/patient/book">
        <button className="vs-btn vs-btn-red cta-pulse" style={{ width: '100%', justifyContent: 'center', borderRadius: 5 }}>
          Confirm Appointment
        </button>
      </Link>
      <p style={{ fontSize: 10, color: 'rgba(255,255,255,0.4)', textAlign: 'center', marginTop: 8, fontFamily: 'Inter, sans-serif' }}>
        Or call 080-2860-0988 &nbsp;·&nbsp; Mon–Sat 9AM–5PM
      </p>
    </div>
  );
};

/* ─── News bar color map ─────────────────────────────────────────────────── */
const barColors = { Achievement: '#009688', Event: '#003580', Infrastructure: '#e8282b', Research: '#7c3aed', Admissions: '#f59e0b' };

/* ─── Main Home ──────────────────────────────────────────────────────────── */
const Home = () => {
  return (
    <div style={{ background: '#ffffff' }}>

      {/* ══ 1. HERO ══════════════════════════════════════════════════════════ */}
      <section className="vs-hero" style={{ minHeight: 340 }}>
        {/* Left — hero copy */}
        <motion.div
          initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}
          style={{ paddingBottom: '3rem' }}
        >
          <div className="vs-hero-eyebrow">Bengaluru's Premier Dental Institution</div>
          <h1 className="vs-hero-title">
            Rajarajeshwari<br />
            <span>Dental College</span><br />
            &amp; Hospital
          </h1>
          <p className="vs-hero-sub">
            Excellence in dental education, research and patient care — serving Bangalore and Karnataka since 2001.
          </p>
          <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
            <Link to="/departments">
              <button className="vs-btn vs-btn-outline">
                Explore Departments <FiArrowRight size={13} />
              </button>
            </Link>
            <Link to="/tour">
              <button className="vs-btn vs-btn-outline" style={{ background: 'rgba(255,255,255,0.06)' }}>
                Virtual Tour
              </button>
            </Link>
          </div>
        </motion.div>

        {/* Right — appointment form */}
        <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
          <AppointmentForm />
        </motion.div>
      </section>

      {/* ══ 2. STATS BAR ════════════════════════════════════════════════════ */}
      <div className="vs-stats-bar">
        <div className="max-w-7xl mx-auto">
          <div className="vs-stats-row">
            <StatCell value={2000} suffix="+" label="Patients / month" />
            <StatCell value={9}    suffix=""  label="Speciality Depts" />
            <StatCell value={150}  suffix="+" label="Dental Chairs" />
            <StatCell value={25}   suffix="+" label="Years of Excellence" />
          </div>
        </div>
      </div>

      {/* ══ 3. QUICK LINKS ══════════════════════════════════════════════════ */}
      <div className="vs-quick-links">
        <div className="max-w-7xl mx-auto">
          <div className="vs-ql-grid">
            <QLItem path="/patient/book"       Icon={FiCalendar}     label="Book Appointment"  bg="#e6f0fb" color="#0c447c" />
            <QLItem path="/patient/track"      Icon={FiSearch}       label="Track Appointment" bg="#fdeaea" color="#b91c1c" />
            <QLItem path="/patient/queue"      Icon={FiClock}        label="Live Queue"        bg="#e6f7f5" color="#0f6e56" />
            <QLItem path="/patient/followup"   Icon={FiClipboard}    label="Patient Follow-Up" bg="#fef8e7" color="#b45309" />
            <QLItem path="/student/dashboard"  Icon={FiBookOpen}     label="Student Portal"    bg="#f1effe" color="#3c3489" />
            <QLItem path="/patient/directions" Icon={FiMapPin}       label="Directions"        bg="#eaf5ee" color="#276a27" />
          </div>
        </div>
      </div>

      {/* ══ 4. DEPARTMENTS + NEWS ═══════════════════════════════════════════ */}
      <div className="vs-section-alt">
        <div className="max-w-7xl mx-auto" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, alignItems: 'start' }}>

          {/* Departments grid */}
          <div>
            <div className="vs-section-header">
              <div>
                <div className="vs-section-title">Clinical Departments</div>
                <div className="vs-section-sub">Specialized care across 9 dental disciplines</div>
              </div>
              <Link to="/departments" className="vs-section-link">View All</Link>
            </div>
            <div className="vs-grid-3">
              {departments.slice(0, 6).map((dept, i) => (
                <SpecCard key={dept.id} dept={dept} idx={i} />
              ))}
            </div>
          </div>

          {/* News notice board */}
          <div>
            <div className="vs-section-header">
              <div>
                <div className="vs-section-title">Notices &amp; Events</div>
                <div className="vs-section-sub">Latest updates</div>
              </div>
              <Link to="/events" className="vs-section-link">View All</Link>
            </div>
            <div className="vs-notice-list">
              <div className="vs-notice-head">
                <div className="vs-notice-head-title">Latest Announcements</div>
              </div>
              {newsItems.slice(0, 6).map((item, i) => (
                <div key={i} className="vs-notice-item">
                  <div className="vs-notice-bar" style={{ background: barColors[item.category] || '#003580' }} />
                  <div>
                    <div className="vs-notice-text">{item.title}</div>
                    <div className="vs-notice-time" style={{ display: 'flex', alignItems: 'center', gap: 6, marginTop: 3 }}>
                      <span>
                        {new Date(item.date).toLocaleDateString('en-IN', { day: 'numeric', month: 'short', year: 'numeric' })}
                      </span>
                      <span style={{ color: '#ddd' }}>·</span>
                      <span className={`vs-badge ${
                        item.category === 'Achievement' ? 'vs-badge-teal' :
                        item.category === 'Event'       ? 'vs-badge-blue' :
                        item.category === 'Admissions'  ? 'vs-badge-amber' :
                        'vs-badge-red'
                      }`}>
                        {item.category}
                      </span>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══ 5. PATIENT SERVICES ═════════════════════════════════════════════ */}
      <div className="vs-section">
        <div className="max-w-7xl mx-auto">
          <div className="vs-section-header">
            <div>
              <div className="vs-section-title">Patient Services</div>
              <div className="vs-section-sub">Everything you need, digitally accessible</div>
            </div>
          </div>
          <div className="vs-grid-4">
            {[
              { Icon: FiCalendar,     title: 'Online Booking',    desc: 'Schedule in 4 simple steps',          path: '/patient/book',     accent: 'navy' },
              { Icon: FiActivity,     title: 'Live Queue',         desc: 'Real-time wait times & availability', path: '/patient/queue',    accent: 'red'  },
              { Icon: FiClipboard,    title: 'Patient Follow-Up',  desc: 'View history & upcoming reminders',   path: '/patient/followup', accent: ''     },
              { Icon: FiMessageSquare,title: 'Patient Feedback',   desc: 'Rate your visit experience',          path: '/patient/feedback', accent: 'amber'},
            ].map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.08 }}>
                <Link to={s.path} style={{ textDecoration: 'none' }}>
                  <div className={`vs-accent-card ${s.accent}`} style={{ cursor: 'pointer', height: '100%' }}>
                    <div style={{ marginBottom: 10 }}>
                      <s.Icon size={22} color={s.accent === 'navy' ? '#003580' : s.accent === 'red' ? '#e8282b' : s.accent === 'amber' ? '#b45309' : '#009688'} />
                    </div>
                    <div className="vs-accent-title">{s.title}</div>
                    <div className="vs-accent-sub">{s.desc}</div>
                  </div>
                </Link>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ══ 6. ACHIEVEMENTS + TESTIMONIALS ══════════════════════════════════ */}
      <div className="vs-section-alt">
        <div className="max-w-7xl mx-auto" style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 24 }}>

          {/* Achievements table */}
          <div>
            <div className="vs-section-header">
              <div className="vs-section-title">Achievements</div>
              <Link to="/achievements" className="vs-section-link">View All</Link>
            </div>
            <div className="vs-table-card">
              <div className="vs-table-head">
                <span className="vs-table-head-title">Recent Honours</span>
                <Link to="/achievements" className="vs-table-head-link">View All</Link>
              </div>
              <table className="vs-table">
                <thead>
                  <tr>
                    <th>Achievement</th>
                    <th>Year</th>
                    <th>Status</th>
                  </tr>
                </thead>
                <tbody>
                  {achievements.slice(0, 5).map((a, i) => (
                    <tr key={i}>
                      <td>
                        <div style={{ fontWeight: 600, fontSize: 12, color: '#1a1a2e', fontFamily: 'Manrope, sans-serif' }}>{a.title}</div>
                      </td>
                      <td>{a.year || '2024'}</td>
                      <td>
                        <span className="vs-badge vs-badge-teal" style={{ display: 'inline-flex', alignItems: 'center', gap: 4 }}>
                          <FiCheckCircle size={9} /> Received
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>

          {/* Testimonials */}
          <div>
            <div className="vs-section-header">
              <div className="vs-section-title">Patient Reviews</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {testimonials.slice(0, 3).map((t, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                  <div className="vs-doc-card" style={{ cursor: 'default' }}>
                    <div className="vs-avatar vs-av-blue">
                      <FiUser size={16} color="#0c447c" />
                    </div>
                    <div style={{ flex: 1 }}>
                      <div className="vs-doc-name">{t.name}</div>
                      <div className="vs-doc-spec">{t.dept}</div>
                      <div style={{ fontSize: 11, color: '#555', lineHeight: 1.5, marginTop: 4, fontFamily: 'Inter, sans-serif' }}>"{t.comment}"</div>
                      <div style={{ display: 'flex', gap: 2, marginTop: 6 }}>
                        {[...Array(t.rating)].map((_, j) => (
                          <FiStar key={j} size={11} style={{ fill: '#f59e0b', color: '#f59e0b' }} />
                        ))}
                      </div>
                    </div>
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </div>

      {/* ══ 7. INFO BAND ════════════════════════════════════════════════════ */}
      <div className="vs-info-band">
        <div className="vs-info-cell">
          <div className="vs-info-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, marginBottom: 6 }}>
            <FiMapPin size={14} /> Location
          </div>
          <div className="vs-info-val">Mysuru Road, Kambipura, Bengaluru – 560 074</div>
        </div>
        <div className="vs-info-cell">
          <div className="vs-info-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, marginBottom: 6 }}>
            <FiPhone size={14} /> Phone
          </div>
          <div className="vs-info-val">080-2860-0988 &nbsp;|&nbsp; 080-2860-0989</div>
        </div>
        <div className="vs-info-cell">
          <div className="vs-info-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, marginBottom: 6 }}>
            <FiClock size={14} /> OPD Hours
          </div>
          <div className="vs-info-val">Mon–Sat: 9:00 AM – 5:00 PM</div>
        </div>
      </div>

      {/* ══ 8. FOOTER ════════════════════════════════════════════════════════ */}
      <div className="vs-footer-top">
        <div className="max-w-7xl mx-auto vs-footer-grid">
          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 14 }}>
              <div style={{ width: 36, height: 36, background: '#003580', borderRadius: 4, display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#fff', fontWeight: 700, fontFamily: 'Manrope, sans-serif', fontSize: 15 }}>R</div>
              <div>
                <div className="vs-footer-brand-name">Rajarajeshwari Dental College</div>
                <div className="vs-footer-brand-sub">&amp; Hospital, Bangalore</div>
              </div>
            </div>
            <p className="vs-footer-desc">
              A premier dental institution committed to excellence in education, research, and patient care.
              Affiliated to Rajiv Gandhi University of Health Sciences, Karnataka.
            </p>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, marginTop: 14 }}>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'Inter, sans-serif' }}>
                <FiPhone size={11} /> 080-2860-0988
              </span>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'Inter, sans-serif' }}>
                <FiMail size={11} /> info@rrdch.edu.in
              </span>
              <span style={{ fontSize: 11, color: 'rgba(255,255,255,0.5)', display: 'flex', alignItems: 'center', gap: 6, fontFamily: 'Inter, sans-serif' }}>
                <FiMapPin size={11} /> Mysuru Road, Kambipura, Bengaluru
              </span>
            </div>
          </div>
          {/* Quick Links */}
          <div>
            <div className="vs-footer-col-title">Quick Links</div>
            {[
              { label: 'About Us',      path: '/about' },
              { label: 'Departments',   path: '/departments' },
              { label: 'Research',      path: '/research' },
              { label: 'Events',        path: '/events' },
              { label: 'Achievements',  path: '/achievements' },
            ].map(l => <Link key={l.path} to={l.path} className="vs-footer-link">{l.label}</Link>)}
          </div>
          {/* Patients */}
          <div>
            <div className="vs-footer-col-title">Patients</div>
            {[
              { label: 'Book Appointment', path: '/patient/book' },
              { label: 'Track Status',     path: '/patient/track' },
              { label: 'Live Queue',       path: '/patient/queue' },
              { label: 'Patient Follow-Up',path: '/patient/followup' },
              { label: 'Give Feedback',    path: '/patient/feedback' },
              { label: 'Directions',       path: '/patient/directions' },
            ].map(l => <Link key={l.path} to={l.path} className="vs-footer-link">{l.label}</Link>)}
          </div>
          {/* Academics */}
          <div>
            <div className="vs-footer-col-title">Academics</div>
            {[
              { label: 'Student Dashboard', path: '/student/dashboard' },
              { label: 'Syllabus',          path: '/student/syllabus' },
              { label: 'Schedule',          path: '/student/schedule' },
              { label: 'PG Doctor Portal',  path: '/faculty/pg' },
              { label: 'Admin Portal',      path: '/faculty/admin' },
              { label: 'Admissions',        path: '/admissions' },
            ].map(l => <Link key={l.path} to={l.path} className="vs-footer-link">{l.label}</Link>)}
          </div>
        </div>
      </div>
      <div className="vs-footer-bottom">
        <span className="vs-footer-copy">© 2025 Rajarajeshwari Dental College and Hospital. All rights reserved.</span>
        <div className="vs-footer-bottom-links">
          <a href="#" className="vs-footer-bottom-link">Privacy Policy</a>
          <a href="#" className="vs-footer-bottom-link">Terms of Use</a>
          <a href="#" className="vs-footer-bottom-link">Sitemap</a>
        </div>
      </div>

    </div>
  );
};

export default Home;

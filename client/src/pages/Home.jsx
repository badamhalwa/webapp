import React, { useRef, useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import {
  FiArrowRight, FiStar, FiCalendar, FiSearch, FiClock,
  FiClipboard, FiMapPin, FiUser, FiUsers, FiAward,
  FiActivity, FiMessageSquare, FiBookOpen, FiPhone, FiMail,
  FiCheckCircle, FiHome, FiShield,
} from 'react-icons/fi';
import { departments, testimonials, newsItems, achievements } from '../data/mockData';
import { usePortal } from '../context/PortalContext';
import StudentGuard from '../components/auth/StudentGuard';

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

/* ─── Shared Components ──────────────────────────────────────────────────────────── */
const StatCell = ({ value, suffix = '+', label, Icon }) => {
  const [count, ref] = useCounter(value);
  return (
    <div className="vs-stat" ref={ref}>
      <div className="vs-stat-num">{count.toLocaleString()}{suffix}</div>
      <div className="vs-stat-label">{label}</div>
    </div>
  );
};

const QLItem = ({ Icon, label, path, bg, color }) => (
  <Link to={path} className="vs-ql-item">
    <div className="vs-ql-icon" style={{ background: bg }}>
      <Icon size={18} color={color} />
    </div>
    <span className="vs-ql-label">{label}</span>
  </Link>
);

const ACCENT_CYCLE = ['blue', 'red', 'teal', 'green'];
const iconColors   = { blue: '#0c447c', red: '#b91c1c', teal: '#0f6e56', green: '#276a27' };
const iconBgs      = { blue: '#e6f0fb', red: '#fdeaea', teal: '#e6f7f5', green: '#eaf5ee' };

const SpecCard = ({ dept, idx }) => {
  const { t, i18n } = useTranslation();
  const accent = ACCENT_CYCLE[idx % ACCENT_CYCLE.length];
  const lang = i18n.language;

  return (
    <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: idx * 0.06 }}>
      <Link to="/departments" style={{ textDecoration: 'none' }}>
        <div className="vs-spec-card">
          <div className={`vs-spec-top vs-spec-top-${accent}`} />
          <div className="vs-spec-body">
            <div className="vs-spec-icon" style={{ background: iconBgs[accent] }}>
              <FiActivity size={20} color={iconColors[accent]} />
            </div>
            <div className="vs-spec-name">{t(`depts.d${dept.id}`)}</div>
            <div className="vs-spec-desc">{lang === 'kn' ? 'ತಜ್ಞ ದಂತ ಚಿಕಿತ್ಸೆ ಮತ್ತು ಸಮಗ್ರ ಆರೈಕೆ.' : dept.desc}</div>
            <div className="vs-spec-count" style={{ display: 'flex', gap: 10, alignItems: 'center' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <FiUsers size={10} /> {dept.patients?.toLocaleString()} {lang === 'kn' ? '/ವರ್ಷ' : '/yr'}
              </span>
              <span style={{ color: '#ccc' }}>·</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: 3 }}>
                <FiUser size={10} /> {dept.faculty} {lang === 'kn' ? 'ಬೋಧಕರು' : 'Faculty'}
              </span>
            </div>
          </div>
        </div>
      </Link>
    </motion.div>
  );
};

const AppointmentForm = () => {
  const { t, i18n } = useTranslation();
  const [form, setForm] = useState({ name: '', dept: '', date: '' });
  const lang = i18n.language;

  const deptOptions = [
    { id: 'd1', name: t('depts.d1') }, { id: 'd2', name: t('depts.d2') }, { id: 'd3', name: t('depts.d3') },
    { id: 'd4', name: t('depts.d4') }, { id: 'd5', name: t('depts.d5') }, { id: 'd6', name: t('depts.d6') },
  ];

  return (
    <div className="vs-appt-form">
      <div className="vs-appt-heading">
        <div className="vs-appt-dot" />
        {t('appointment.title').split(' ')[1] || t('appointment.title')}
      </div>
      <div className="vs-field">
        <label className="vs-label-dark">{t('appointment.name')}</label>
        <input className="vs-input-dark" placeholder={t('appointment.namePlaceholder')} value={form.name} onChange={e => setForm({ ...form, name: e.target.value })} />
      </div>
      <div className="vs-field">
        <label className="vs-label-dark">{t('nav.departments')}</label>
        <select className="vs-input-dark" value={form.dept} onChange={e => setForm({ ...form, dept: e.target.value })}
          style={{ background: 'rgba(255,255,255,0.1)', border: '1px solid rgba(255,255,255,0.2)', color: '#fff' }}>
          <option value="">{lang === 'kn' ? 'ವಿಭಾಗವನ್ನು ಆರಿಸಿ' : 'Select department'}</option>
          {deptOptions.map(d => <option key={d.id} value={d.name} style={{ color: '#1a1a2e', background: '#fff' }}>{d.name}</option>)}
        </select>
      </div>
      <div className="vs-field" style={{ marginBottom: 16 }}>
        <label className="vs-label-dark">{t('appointment.apptDate')}</label>
        <input type="date" className="vs-input-dark" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })} />
      </div>
      <Link to="/patient/book">
        <button className="vs-btn vs-btn-red cta-pulse" style={{ width: '100%', justifyContent: 'center', borderRadius: 5 }}>
          {t('appointment.confirmBtn')}
        </button>
      </Link>
    </div>
  );
};

const barColors = { Achievement: '#009688', Event: '#003580', Infrastructure: '#e8282b', Research: '#7c3aed', Admissions: '#f59e0b' };

/* ─── HOSPITAL PORTAL VIEW ──────────────────────────────────────────────────────────── */
const HospitalView = ({ t, lang }) => (
  <motion.div initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: 20 }} transition={{ duration: 0.3 }}>
    {/* HERO */}
    <section className="vs-hero" style={{ minHeight: 340 }}>
      <motion.div initial={{ opacity: 0, y: 24 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }} style={{ paddingBottom: '3rem' }}>
        <div className="vs-hero-eyebrow">{t('home.heroEyebrow')}</div>
        <h1 className="vs-hero-title">
          {lang === 'kn' ? <>ರಾಜರಾಜೇಶ್ವರಿ<br /><span>ದಂತ ಕಾಲೇಜು</span><br />ಮತ್ತು ಆಸ್ಪತ್ರೆ</> : <>Rajarajeshwari<br /><span>Dental College</span><br />&amp; Hospital</>}
        </h1>
        <p className="vs-hero-sub">{t('home.heroSubtitle')}</p>
        <div style={{ display: 'flex', gap: 12, flexWrap: 'wrap' }}>
          <Link to="/departments">
            <button className="vs-btn vs-btn-outline">{t('home.exploreDepts')} <FiArrowRight size={13} /></button>
          </Link>
          <Link to="/tour">
            <button className="vs-btn vs-btn-outline" style={{ background: 'rgba(255,255,255,0.06)' }}>{t('home.virtualTour')}</button>
          </Link>
        </div>
      </motion.div>
      <motion.div initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6, delay: 0.2 }}>
        <AppointmentForm />
      </motion.div>
    </section>

    {/* STATS */}
    <div className="vs-stats-bar">
      <div className="max-w-7xl mx-auto">
        <div className="vs-stats-row">
          <StatCell value={2000} suffix="+" label={t('home.statsPatientsMonth')} />
          <StatCell value={9}    suffix=""  label={t('home.statsDepts')} />
          <StatCell value={150}  suffix="+" label={t('home.statsChairs')} />
          <StatCell value={25}   suffix="+" label={t('home.statsYears')} />
        </div>
      </div>
    </div>

    {/* QUICK LINKS */}
    <div className="vs-quick-links">
      <div className="max-w-7xl mx-auto">
        <div className="vs-ql-grid">
          <QLItem path="/patient/book"       Icon={FiCalendar}     label={t('nav.bookAppointment')}  bg="#e6f0fb" color="#0c447c" />
          <QLItem path="/patient/track"      Icon={FiSearch}       label={t('nav.trackAppointment')} bg="#fdeaea" color="#b91c1c" />
          <QLItem path="/patient/queue"      Icon={FiClock}        label={t('nav.liveQueue')}        bg="#e6f7f5" color="#0f6e56" />
          <QLItem path="/patient/followup"   Icon={FiClipboard}    label={t('nav.followUp')}         bg="#fef8e7" color="#b45309" />
          <QLItem path="/departments"        Icon={FiActivity}     label={t('nav.departments')}      bg="#f1effe" color="#3c3489" />
          <QLItem path="/patient/directions" Icon={FiMapPin}       label={t('nav.directions')}       bg="#eaf5ee" color="#276a27" />
        </div>
      </div>
    </div>

    {/* PATIENT SERVICES */}
    <div className="vs-section">
      <div className="max-w-7xl mx-auto">
        <div className="vs-section-header">
          <div>
            <div className="vs-section-title">{t('home.patientServices')}</div>
            <div className="vs-section-sub">{t('home.patientServicesSub')}</div>
          </div>
        </div>
        <div className="vs-grid-4">
          {[
            { Icon: FiCalendar,     title: t('nav.bookAppointment'),    desc: lang === 'kn' ? '4 ಹಂತಗಳಲ್ಲಿ ಸುಲಭವಾಗಿ ಕಾಯ್ದಿರಿಸಿ' : 'Schedule in 4 simple steps',          path: '/patient/book',     accent: 'navy' },
            { Icon: FiActivity,     title: t('nav.liveQueue'),         desc: lang === 'kn' ? 'ಲೈವ್ ಕ್ಯೂ ಮತ್ತು ಲಭ್ಯತೆಯನ್ನು ನೋಡಿ' : 'Real-time wait times & availability', path: '/patient/queue',    accent: 'red'  },
            { Icon: FiClipboard,    title: t('nav.followUp'),          desc: lang === 'kn' ? 'ಹಳೆಯ ಇತಿಹಾಸ ಮತ್ತು ಭೇಟಿಗಳನ್ನು ಪರಿಶೀಲಿಸಿ' : 'View history & upcoming reminders',   path: '/patient/followup', accent: ''     },
            { Icon: FiMessageSquare,title: t('nav.feedback'),          desc: lang === 'kn' ? 'ನಿಮ್ಮ ಅನುಭವದ ಬಗ್ಗೆ ತಿಳಿಸಿ' : 'Rate your visit experience',          path: '/patient/feedback', accent: 'amber'},
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

    {/* DEPARTMENTS + TESTIMONIALS */}
    <div className="vs-section-alt">
      <div className="max-w-7xl mx-auto" style={{ display: 'grid', gridTemplateColumns: '2fr 1fr', gap: 24, alignItems: 'start' }}>
        <div>
          <div className="vs-section-header">
            <div>
              <div className="vs-section-title">{t('home.featuredDepts')}</div>
              <div className="vs-section-sub">{t('home.featuredDeptsSub')}</div>
            </div>
            <Link to="/departments" className="vs-section-link">{t('home.viewAll')}</Link>
          </div>
          <div className="vs-grid-3">
            {departments.slice(0, 6).map((dept, i) => <SpecCard key={dept.id} dept={dept} idx={i} />)}
          </div>
        </div>

        <div>
          <div className="vs-section-header">
            <div className="vs-section-title">{t('home.testimonials')}</div>
          </div>
          <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
            {testimonials.slice(0, 3).map((t, i) => (
              <motion.div key={i} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="vs-doc-card" style={{ cursor: 'default' }}>
                  <div className="vs-avatar vs-av-blue"><FiUser size={16} color="#0c447c" /></div>
                  <div style={{ flex: 1 }}>
                    <div className="vs-doc-name">{t.name}</div>
                    <div className="vs-doc-spec">{lang === 'kn' ? 'ರೋಗಿಯ ಅಭಿಪ್ರಾಯ' : t.dept}</div>
                    <div style={{ fontSize: 11, color: '#555', lineHeight: 1.5, marginTop: 4, fontFamily: 'Inter, sans-serif' }}>"{lang === 'kn' ? 'ಆಸ್ಪತ್ರೆಯ ಸೇವೆ ಅತ್ಯುತ್ತಮವಾಗಿದೆ.' : t.comment}"</div>
                    <div style={{ display: 'flex', gap: 2, marginTop: 6 }}>
                      {[...Array(t.rating)].map((_, j) => <FiStar key={j} size={11} style={{ fill: '#f59e0b', color: '#f59e0b' }} />)}
                    </div>
                  </div>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>
    </div>
  </motion.div>
);



/* ─── Main Home Component ──────────────────────────────────────────────────────────── */
const Home = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;

  return (
    <div style={{ background: '#ffffff', minHeight: '100vh', display: 'flex', flexDirection: 'column' }}>
      
      {/* ══ PORTAL TABS ══════════════════════════════════════════════════════════ */}
      <div style={{ background: '#f8fafc', padding: '12px 1rem', borderBottom: '1px solid #e2e8f0', display: 'flex', justifyContent: 'center' }}>
        <div style={{ display: 'inline-flex', background: '#e2e8f0', borderRadius: '12px', padding: '4px' }}>
          <button 
            style={{ 
              padding: '10px 24px', 
              borderRadius: '8px', 
              fontWeight: 600, 
              fontSize: '14px',
              fontFamily: 'Inter, sans-serif',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              border: 'none',
              cursor: 'default',
              background: '#fff',
              color: '#003580',
              boxShadow: '0 1px 3px rgba(0,0,0,0.1)'
            }}
          >
            <FiActivity size={16} /> {lang === 'kn' ? 'ಆಸ್ಪತ್ರೆ ಪೋರ್ಟಲ್' : 'Hospital Portal'}
          </button>
          <Link 
            to="/student"
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              padding: '10px 24px', 
              borderRadius: '8px', 
              fontWeight: 600, 
              fontSize: '14px',
              fontFamily: 'Inter, sans-serif',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
              background: 'transparent',
              color: '#64748b',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#3c3489'; e.currentTarget.style.background = 'rgba(255,255,255,0.5)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.background = 'transparent'; }}
          >
            <FiBookOpen size={16} /> {lang === 'kn' ? 'ವಿದ್ಯಾರ್ಥಿ ಪೋರ್ಟಲ್' : 'Student Portal'}
          </Link>
          <Link 
            to="/admin"
            target="_blank"
            rel="noopener noreferrer"
            style={{ 
              padding: '10px 24px', 
              borderRadius: '8px', 
              fontWeight: 600, 
              fontSize: '14px',
              fontFamily: 'Inter, sans-serif',
              transition: 'all 0.2s',
              display: 'flex',
              alignItems: 'center',
              gap: '8px',
              textDecoration: 'none',
              background: 'transparent',
              color: '#64748b',
            }}
            onMouseEnter={e => { e.currentTarget.style.color = '#b91c1c'; e.currentTarget.style.background = 'rgba(255,255,255,0.5)'; }}
            onMouseLeave={e => { e.currentTarget.style.color = '#64748b'; e.currentTarget.style.background = 'transparent'; }}
          >
            <FiShield size={16} /> {lang === 'kn' ? 'ಆಡಳಿತ ಪೋರ್ಟಲ್' : 'Admin Portal'}
          </Link>
        </div>
      </div>

      {/* ══ ACTIVE PORTAL CONTENT ══════════════════════════════════════════════════════════ */}
      <div style={{ flex: 1, overflow: 'hidden' }}>
        <HospitalView t={t} lang={lang} />
      </div>

      {/* ══ SHARED INFO BAND ════════════════════════════════════════════════════ */}
      <div className="vs-info-band">
        <div className="vs-info-cell">
          <div className="vs-info-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, marginBottom: 6 }}>
            <FiMapPin size={14} /> {lang === 'kn' ? 'ಸ್ಥಳ' : 'Location'}
          </div>
          <div className="vs-info-val">{t('directions.addressVal')}</div>
        </div>
        <div className="vs-info-cell">
          <div className="vs-info-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, marginBottom: 6 }}>
            <FiPhone size={14} /> {lang === 'kn' ? 'ಫೋನ್' : 'Phone'}
          </div>
          <div className="vs-info-val">080-2860-0988 &nbsp;|&nbsp; 080-2860-0989</div>
        </div>
        <div className="vs-info-cell">
          <div className="vs-info-title" style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 7, marginBottom: 6 }}>
            <FiClock size={14} /> {t('directions.opdHours')}
          </div>
          <div className="vs-info-val">{t('common.days')}</div>
        </div>
      </div>
    </div>
  );
};

export default Home;

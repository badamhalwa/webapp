import React, { useState, useRef, useEffect } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import i18n from '../../i18n/i18n';
import { useApp } from '../../context/AppContext';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiSearch, FiX, FiChevronDown, FiBell, FiPhone, FiMail, FiMapPin,
  FiCalendar, FiClock, FiClipboard, FiBookOpen, FiAward,
  FiMap, FiMessageSquare, FiUser, FiShield, FiBook, FiHome, FiActivity,
} from 'react-icons/fi';

import logo from '../../assets/logo.png';

/* ── Main Navbar ── */
const Navbar = () => {
  const { t } = useTranslation();
  const { notifications, searchOpen, setSearchOpen, searchQuery, setSearchQuery } = useApp();
  const [mobileOpen, setMobileOpen]   = useState(false);
  const [notifOpen, setNotifOpen]     = useState(false);
  const [lang, setLang]               = useState(localStorage.getItem('rrdch-lang') || 'en');
  const location  = useLocation();
  const navigate  = useNavigate();

  /* ── Nav structure ── */
  const MAIN_NAV = [
    { label: t('nav.home'),        path: '/' },
    { label: t('nav.about'),    path: '/about' },
    { label: t('nav.faculty'),     path: '/faculty' },
    { label: t('nav.departments'), path: '/departments' },
    { label: t('nav.research'),    path: '/research' },
  ];

  const PATIENTS_NAV = [
    { label: t('nav.bookAppointment'),   path: '/patient/book',        Icon: FiCalendar },
    { label: t('nav.trackAppointment'),  path: '/patient/track',       Icon: FiSearch },
    { label: t('nav.liveQueue'),         path: '/patient/queue',       Icon: FiClock },
    { label: t('nav.followUp'),  path: '/patient/followup',    Icon: FiClipboard },
    { label: t('nav.directions'),path: '/patient/directions',  Icon: FiMapPin },
    { label: t('nav.feedback'),           path: '/patient/feedback',    Icon: FiMessageSquare },
  ];

  const ACADEMICS_NAV = [
    { label: t('nav.studentDashboard'), path: '/student/dashboard', Icon: FiUser },
    { label: t('nav.syllabus'),          path: '/student/syllabus',  Icon: FiBook },
    { label: t('nav.schedule'),          path: '/student/schedule',  Icon: FiCalendar },
    { label: t('nav.hostelComplaints'), path: '/student/hostel',    Icon: FiHome },
    { label: t('nav.admissions'),        path: '/admissions',        Icon: FiBookOpen },
  ];

  const MORE_NAV = [
    { label: t('nav.achievements'),     path: '/achievements',  Icon: FiAward },
    { label: t('nav.virtualTour'),     path: '/tour',          Icon: FiMap },
    { label: t('nav.events'),           path: '/events',        Icon: FiCalendar },
    { label: t('nav.pgDoctorDashboard'), path: '/faculty/pg',    Icon: FiActivity },
    { label: t('nav.adminDashboard'),  path: '/faculty/admin', Icon: FiShield },
  ];

  useEffect(() => setMobileOpen(false), [location.pathname]);

  const toggleLang = () => {
    const next = lang === 'en' ? 'kn' : 'en';
    setLang(next);
    i18n.changeLanguage(next);
    localStorage.setItem('rrdch-lang', next);
    document.documentElement.lang = next;
  };

  const handleSearch = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) navigate(`/search?q=${encodeURIComponent(searchQuery)}`);
    setSearchOpen(false);
  };

  const isActive = (path) =>
    path === '/' ? location.pathname === '/' : location.pathname.startsWith(path);

  const isPatientsActive = PATIENTS_NAV.some(l => location.pathname.startsWith(l.path));
  const isAcademicsActive = ACADEMICS_NAV.some(l => location.pathname.startsWith(l.path));

  /* ── Dropdown Component ── */
  const NavDropdown = ({ label, links, active }) => {
    const [open, setOpen] = useState(false);
    const ref = useRef();
    useEffect(() => {
      const h = (e) => { if (ref.current && !ref.current.contains(e.target)) setOpen(false); };
      document.addEventListener('mousedown', h);
      return () => document.removeEventListener('mousedown', h);
    }, []);

    return (
      <div ref={ref} className="relative hidden md:block" style={{ height: '64px', display: 'flex', alignItems: 'center' }}>
        <button
          onMouseEnter={() => setOpen(true)}
          onClick={() => setOpen(!open)}
          className={`nav-item flex items-center gap-1 ${active ? 'active' : ''}`}
          aria-haspopup="true" aria-expanded={open}
        >
          {label}
          <FiChevronDown size={12} className={`transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
        </button>
        <AnimatePresence>
          {open && (
            <motion.div
              initial={{ opacity: 0, y: -6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -6 }}
              transition={{ duration: 0.13 }}
              onMouseLeave={() => setOpen(false)}
              className="absolute top-full left-0 mt-0 z-50 py-1 min-w-[200px]"
              style={{
                background: '#ffffff',
                border: '1px solid #eaecf0',
                borderTop: '2px solid #003580',
                borderRadius: '0 0 8px 8px',
                boxShadow: '0 8px 24px rgba(0,53,128,0.1)',
              }}
            >
              {links.map(l => (
                <Link key={l.path} to={l.path} onClick={() => setOpen(false)}
                  className="flex items-center gap-3 px-4 py-2.5 text-xs transition-colors"
                  style={{ color: '#333', fontFamily: 'Inter, sans-serif' }}
                  onMouseEnter={e => { e.currentTarget.style.background = '#f7f9fc'; e.currentTarget.style.color = '#003580'; }}
                  onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; e.currentTarget.style.color = '#333'; }}
                >
                  {l.Icon && <l.Icon size={13} style={{ flexShrink: 0 }} />}
                  <span>{l.label}</span>
                </Link>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    );
  };

  return (
    <>
      {/* ── Top Bar ── */}
      <div className="topbar hidden md:flex">
        <div className="topbar-links">
          <a href="tel:08028600988" className="topbar-link flex items-center gap-1">
            <FiPhone size={10} /> 080-2860-0988
          </a>
          <a href="mailto:info@rrdch.edu.in" className="topbar-link flex items-center gap-1">
            <FiMail size={10} /> info@rrdch.edu.in
          </a>
          <span className="topbar-link flex items-center gap-1">
            <FiMapPin size={10} /> {t('directions.addressVal')}
          </span>
        </div>
        <div className="flex items-center gap-3">
          {/* Language toggle */}
          <div style={{ display: 'flex', gap: '2px', background: 'rgba(255,255,255,0.1)', borderRadius: '3px', padding: '2px' }}>
            <button
              onClick={() => lang !== 'en' && toggleLang()}
              style={{
                fontSize: '10px', padding: '2px 8px', borderRadius: '2px', border: 'none',
                cursor: 'pointer', fontFamily: 'Inter, sans-serif', fontWeight: 600,
                background: lang === 'en' ? 'rgba(255,255,255,0.2)' : 'transparent',
                color: lang === 'en' ? '#fff' : 'rgba(255,255,255,0.55)',
              }}
            >EN</button>
            <button
              onClick={() => lang !== 'kn' && toggleLang()}
              style={{
                fontSize: '10px', padding: '2px 8px', borderRadius: '2px', border: 'none',
                cursor: 'pointer', fontFamily: 'Noto Sans Kannada, sans-serif', fontWeight: 600,
                background: lang === 'kn' ? 'rgba(255,255,255,0.2)' : 'transparent',
                color: lang === 'kn' ? '#fff' : 'rgba(255,255,255,0.55)',
              }}
            >ಕನ್ನಡ</button>
          </div>
          {/* Notification dot */}
          <div className="relative">
            <button
              onClick={() => setNotifOpen(!notifOpen)}
              className="topbar-link flex items-center gap-1 relative"
              style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 0 }}
            >
              <FiBell size={13} />
              {notifications.length > 0 && (
                <span style={{ width: 6, height: 6, borderRadius: '50%', background: '#4caf50', position: 'absolute', top: -1, right: -2 }} />
              )}
            </button>
            <AnimatePresence>
              {notifOpen && (
                <motion.div
                  initial={{ opacity: 0, y: -6, scale: 0.97 }}
                  animate={{ opacity: 1, y: 0, scale: 1 }}
                  exit={{ opacity: 0, y: -6, scale: 0.97 }}
                  style={{
                    position: 'absolute', right: 0, top: '100%', marginTop: 8,
                    width: 280, background: '#fff', border: '1px solid #eaecf0',
                    borderRadius: 10, boxShadow: '0 8px 24px rgba(0,53,128,0.12)', zIndex: 200,
                  }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '10px 14px', borderBottom: '1px solid #eaecf0', background: '#003580', borderRadius: '10px 10px 0 0' }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: '#fff', fontFamily: 'Manrope, sans-serif', display: 'flex', alignItems: 'center', gap: 6 }}><FiBell size={12} /> {lang === 'kn' ? 'ನೇರ ಅಪ್‌ಡೇಟ್‌ಗಳು' : 'Live Updates'}</span>
                    <button onClick={() => setNotifOpen(false)} style={{ background: 'none', border: 'none', color: 'rgba(255,255,255,0.6)', cursor: 'pointer' }}><FiX size={13} /></button>
                  </div>
                  {notifications.length === 0
                    ? <p style={{ padding: '16px 14px', fontSize: 12, color: '#777', textAlign: 'center', fontFamily: 'Inter, sans-serif' }}>{lang === 'kn' ? 'ಯಾವುದೇ ಅಪ್‌ಡೇಟ್‌ಗಳಿಲ್ಲ.' : 'No updates yet.'}</p>
                    : notifications.map(n => (
                        <div key={n.id} style={{ padding: '10px 14px', borderBottom: '1px solid #f2f4f7', display: 'flex', gap: 10, alignItems: 'flex-start' }}>
                          <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#4caf50', marginTop: 5, flexShrink: 0 }} />
                          <div>
                            <p style={{ fontSize: 12, color: '#333', fontFamily: 'Inter, sans-serif' }}>{n.msg}</p>
                            <p style={{ fontSize: 10, color: '#aaa', marginTop: 2, fontFamily: 'Inter, sans-serif' }}>{n.time}</p>
                          </div>
                        </div>
                      ))
                  }
                </motion.div>
              )}
            </AnimatePresence>
          </div>
          <Link to="/patient/book">
            <button className="topbar-btn">{t('nav.bookAppointment')}</button>
          </Link>
        </div>
      </div>

      {/* ── Main Navbar ── */}
      <nav className="navbar" role="navigation" aria-label="Main navigation">
        {/* Brand */}
        <Link to="/" className="navbar-brand">
          <img src={logo} alt="RRDCH Logo" style={{ height: '48px', width: 'auto' }} />
          <div>
            <span className="navbar-name-main">RRDCH</span>
            <span className="navbar-name-sub">{lang === 'kn' ? 'ದಂತ ವೈದ್ಯಕೀಯ ಕಾಲೇಜು ಮತ್ತು ಆಸ್ಪತ್ರೆ' : 'Dental College & Hospital'}</span>
          </div>
        </Link>

        {/* Desktop links */}
        <div className="hidden md:flex items-center" style={{ height: '64px' }}>
          {MAIN_NAV.map(link => (
            <Link key={link.path} to={link.path}
              className={`nav-item ${isActive(link.path) ? 'active' : ''}`}
            >
              {link.label}
            </Link>
          ))}
          <NavDropdown label={t('nav.patients')}  links={PATIENTS_NAV}  active={isPatientsActive} />
          <NavDropdown label={t('nav.students')} links={ACADEMICS_NAV} active={isAcademicsActive} />
          <NavDropdown label={t('nav.more')}      links={MORE_NAV}      active={false} />
        </div>

        {/* Right controls */}
        <div className="flex items-center gap-2">
          {/* Search */}
          <button
            onClick={() => setSearchOpen(!searchOpen)}
            aria-label="Search"
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', color: '#555e6b', display: 'flex', alignItems: 'center' }}
          >
            <FiSearch size={17} />
          </button>

          {/* Mobile lang toggle */}
          <button
            onClick={toggleLang}
            className="md:hidden"
            style={{ fontSize: 11, fontFamily: lang === 'kn' ? 'Noto Sans Kannada, sans-serif' : 'Inter, sans-serif', background: '#f0f4f8', border: 'none', borderRadius: 3, padding: '4px 8px', cursor: 'pointer', color: '#003580', fontWeight: 600 }}
          >
            {lang === 'en' ? 'ಕನ್ನಡ' : 'EN'}
          </button>

          {/* Mobile book */}
          <Link to="/patient/book" className="md:hidden">
            <button className="topbar-btn" style={{ fontSize: 11, padding: '5px 10px' }}>{t('nav.bookAppointment').split(' ')[0]}</button>
          </Link>

          {/* Hamburger */}
          <button
            onClick={() => setMobileOpen(!mobileOpen)}
            className="md:hidden"
            aria-label={mobileOpen ? t('common.close') : 'Open menu'}
            style={{ background: 'none', border: 'none', cursor: 'pointer', padding: '6px', color: '#003580' }}
          >
            {mobileOpen
              ? <FiX size={20} />
              : <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16"/>
                </svg>
            }
          </button>
        </div>
      </nav>

      {/* ── Search bar ── */}
      <AnimatePresence>
        {searchOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ background: '#f7f9fc', borderBottom: '1px solid #eaecf0', overflow: 'hidden', zIndex: 90, position: 'sticky', top: 64 }}
          >
            <form onSubmit={handleSearch} style={{ display: 'flex', gap: 8, padding: '12px 2rem', maxWidth: '700px', margin: '0 auto' }}>
              <input
                autoFocus value={searchQuery}
                onChange={e => setSearchQuery(e.target.value)}
                placeholder={t('common.searchPlaceholder')}
                className="vs-input"
                style={{ flex: 1 }}
                aria-label={t('common.search')}
              />
              <button type="submit" className="vs-btn vs-btn-primary" style={{ borderRadius: 5, padding: '9px 18px' }}>{t('common.search').split('...')[0]}</button>
              <button type="button" onClick={() => setSearchOpen(false)}
                style={{ background: 'none', border: 'none', cursor: 'pointer', color: '#777', padding: '0 4px' }}>
                <FiX size={16} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* ── Mobile menu ── */}
      <AnimatePresence>
        {mobileOpen && (
          <motion.div
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            style={{ background: '#ffffff', borderBottom: '1px solid #eaecf0', overflow: 'hidden', position: 'sticky', top: 64, zIndex: 90 }}
          >
            <div style={{ padding: '12px 1.5rem', maxHeight: '75vh', overflowY: 'auto' }}>
              <Link to="/patient/book" onClick={() => setMobileOpen(false)}>
                <button className="vs-btn vs-btn-red cta-pulse" style={{ width: '100%', justifyContent: 'center', marginBottom: 10, borderRadius: 5, gap: 8 }}>
                  <FiCalendar size={13} /> {t('nav.bookAppointment')}
                </button>
              </Link>
              {[...MAIN_NAV, ...PATIENTS_NAV, ...ACADEMICS_NAV, ...MORE_NAV].map(l => (
                <Link key={l.path} to={l.path} onClick={() => setMobileOpen(false)}
                  style={{ display: 'flex', alignItems: 'center', gap: 10, padding: '10px 4px', fontSize: 13, color: isActive(l.path) ? '#003580' : '#333', borderBottom: '1px solid #f2f4f7', fontFamily: 'Inter, sans-serif', textDecoration: 'none', fontWeight: isActive(l.path) ? 600 : 400 }}
                >
                  {l.Icon && <l.Icon size={13} color={isActive(l.path) ? '#003580' : '#888'} />}
                  {l.label}
                </Link>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </>
  );
};

export default Navbar;

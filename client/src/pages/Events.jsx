import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FiCalendar, FiMapPin, FiClock, FiChevronRight, FiX } from 'react-icons/fi';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { events } from '../data/mockData';

const localizer = momentLocalizer(moment);

const Events = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const [selectedEvent, setSelectedEvent] = useState(null);

  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: event.color || '#003580',
      borderRadius: '4px',
      border: 'none',
      color: 'white',
      display: 'block',
      fontSize: '11px',
      padding: '2px 5px'
    }
  });

  return (
    <div style={{ background: '#f8fafc' }}>
      
      {/* ── Page Hero ── */}
      <section style={{ background: '#003580', padding: '3rem 2rem 2.5rem' }}>
        <div className="max-w-7xl mx-auto">
          <nav className="vs-breadcrumb" style={{ marginBottom: 10 }}>
            <a href="/" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: 12 }}>{t('nav.home')}</a>
            <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 6px', fontSize: 12 }}>/</span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{t('nav.events')}</span>
          </nav>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 10 }}>
            {t('nav.events')} &amp; {lang === 'kn' ? 'ಶೈಕ್ಷಣಿಕ ಅಪ್‌ಡೇಟ್' : 'Academic Calendar'}
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif', maxWidth: 560, lineHeight: 1.7 }}>
            {lang === 'kn' ? 'ಕ್ಯಾಂಪಸ್‌ನಲ್ಲಿ ನಡೆಯುತ್ತಿರುವ ಇತ್ತೀಚಿನ ಶೈಕ್ಷಣಿಕ ಕಾರ್ಯಕ್ರಮಗಳು ಮತ್ತು ಸಮ್ಮೇಳನಗಳ ವಿವರ ಇಲ್ಲಿದೆ.' : 'Explore the comprehensive schedule of workshops, conferences, and student events at RRDCH.'}
          </p>
        </div>
      </section>

      <div className="vs-section">
        <div className="max-w-7xl mx-auto px-4">
          
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 350px', gap: 30, alignItems: 'start' }}>
            
            {/* Calendar Card */}
            <div className="vs-card" style={{ padding: '20px', background: '#fff' }}>
              <div style={{ height: 550, fontFamily: 'Inter, sans-serif' }}>
                <Calendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: '100%' }}
                  eventPropGetter={eventStyleGetter}
                  onSelectEvent={(event) => setSelectedEvent(event)}
                  views={['month', 'week', 'agenda']}
                />
              </div>
            </div>

            {/* Upcoming List */}
            <div>
              <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '1.25rem', color: '#1a1a2e', marginBottom: 20 }}>
                {lang === 'kn' ? 'ಮುಂಬರುವ ಕಾರ್ಯಕ್ರಮಗಳು' : 'Upcoming Highlights'}
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {events.slice(0, 5).map((event, idx) => (
                  <motion.div
                    key={idx}
                    initial={{ opacity: 0, x: 20 }}
                    whileInView={{ opacity: 1, x: 0 }}
                    viewport={{ once: true }}
                    transition={{ delay: idx * 0.05 }}
                  >
                    <div 
                      className="vs-card" 
                      style={{ padding: '15px', borderLeft: `4px solid ${event.color || '#003580'}`, cursor: 'pointer' }}
                      onClick={() => setSelectedEvent(event)}
                    >
                      <div style={{ fontSize: 11, fontWeight: 800, color: event.color || '#003580', textTransform: 'uppercase', marginBottom: 6 }}>
                        {moment(event.start).format('DD MMM YYYY')}
                      </div>
                      <h4 style={{ fontSize: 14, fontWeight: 700, color: '#1a1a2e', fontFamily: 'Manrope, sans-serif' }}>{event.title}</h4>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* Event Details Modal */}
      <AnimatePresence>
        {selectedEvent && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 1000, display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'absolute', inset: 0, background: 'rgba(0,0,0,0.5)', backdropFilter: 'blur(4px)' }}
              onClick={() => setSelectedEvent(null)}
            />
            <motion.div 
              initial={{ scale: 0.9, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.9, opacity: 0, y: 20 }}
              style={{ position: 'relative', width: '100%', maxWidth: 450, background: '#fff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 20px 25px -5px rgba(0,0,0,0.1)' }}
            >
              <div style={{ padding: '20px', background: selectedEvent.color || '#003580', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div style={{ fontWeight: 800, fontSize: 14 }}>{lang === 'kn' ? 'ಕಾರ್ಯಕ್ರಮದ ವಿವರ' : 'Event Information'}</div>
                <button onClick={() => setSelectedEvent(null)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><FiX size={20} /></button>
              </div>
              <div style={{ padding: '24px' }}>
                <h3 style={{ fontSize: '1.25rem', fontWeight: 800, color: '#1a1a2e', marginBottom: 16, fontFamily: 'Manrope, sans-serif' }}>{selectedEvent.title}</h3>
                <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#4b5563' }}>
                    <FiCalendar size={16} /> {moment(selectedEvent.start).format('dddd, DD MMMM YYYY')}
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#4b5563' }}>
                    <FiClock size={16} /> 09:30 AM onwards
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 14, color: '#4b5563' }}>
                    <FiMapPin size={16} /> RRDCH Main Campus, Bangalore
                  </div>
                </div>
                <button className="vs-btn vs-btn-primary" style={{ width: '100%', marginTop: 24, justifyContent: 'center' }}>
                  {lang === 'kn' ? 'ನೋಂದಾಯಿಸಿ' : 'Register for Event'}
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>

    </div>
  );
};

export default Events;

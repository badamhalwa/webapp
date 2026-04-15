import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { motion, AnimatePresence } from 'framer-motion';
import { FiX, FiCalendar, FiClock, FiMapPin, FiInfo } from 'react-icons/fi';
import { events } from '../data/mockData';

const localizer = momentLocalizer(moment);

const Events = () => {
  const [selected, setSelected] = useState(null);

  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: event.color || '#003580',
      borderRadius: '6px',
      border: 'none',
      color: 'white',
      fontSize: '11px',
      fontFamily: 'Inter, sans-serif',
      padding: '2px 8px',
      boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
    },
  });

  return (
    <div style={{ background: '#ffffff' }}>

      {/* ── Page Hero ── */}
      <section style={{ background: '#003580', padding: '3rem 2rem 2.5rem' }}>
        <div className="max-w-7xl mx-auto">
          <nav style={{ marginBottom: 10 }}>
            <a href="/" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: 12 }}>Home</a>
            <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 6px', fontSize: 12 }}>/</span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Events</span>
          </nav>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 10 }}>
            Events Calendar
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif', maxWidth: 560, lineHeight: 1.7 }}>
            Stay updated with all academic events, conferences and health camps at RRDCH.
          </p>
        </div>
      </section>

      <div className="vs-section">
        <div className="max-w-7xl mx-auto">
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 340px', gap: 24, alignItems: 'start' }}>
            
            {/* Calendar Card */}
            <div className="vs-card" style={{ padding: '1.5rem' }}>
              <div className="vs-calendar-container" style={{ height: 600 }}>
                <Calendar
                  localizer={localizer}
                  events={events}
                  startAccessor="start"
                  endAccessor="end"
                  style={{ height: '100%' }}
                  eventPropGetter={eventStyleGetter}
                  onSelectEvent={(event) => setSelected(event)}
                  views={['month', 'week', 'agenda']}
                />
              </div>
            </div>

            {/* Upcoming sidebar */}
            <div style={{ display: 'flex', flexDirection: 'column', gap: 16 }}>
              <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: 16, color: '#1a1a2e', display: 'flex', alignItems: 'center', gap: 8 }}>
                <FiCalendar color="#003580" /> Upcoming Events
              </div>
              <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                {events.sort((a,b) => a.start - b.start).map((ev, i) => (
                  <motion.div key={ev.id} initial={{ opacity: 0, x: 16 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                    <div 
                      className="vs-card" 
                      style={{ padding: '1rem', cursor: 'pointer', borderLeft: `4px solid ${ev.color || '#003580'}`, transition: 'background 0.2s' }}
                      onClick={() => setSelected(ev)}
                      onMouseEnter={e => e.currentTarget.style.background = '#f7f9fc'}
                      onMouseLeave={e => e.currentTarget.style.background = '#ffffff'}
                    >
                      <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 13, color: '#1a1a2e', marginBottom: 6 }}>{ev.title}</div>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#888', fontFamily: 'Inter, sans-serif' }}>
                          <FiCalendar size={11} /> {moment(ev.start).format('DD MMM YYYY')}
                        </span>
                        <span style={{ display: 'flex', alignItems: 'center', gap: 4, fontSize: 11, color: '#888', fontFamily: 'Inter, sans-serif' }}>
                          <FiClock size={11} /> {moment(ev.start).format('hh:mm A')}
                        </span>
                      </div>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Detail Modal */}
      <AnimatePresence>
        {selected && (
          <div style={{ position: 'fixed', inset: 0, zIndex: 999 }}>
            <motion.div 
              initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
              style={{ position: 'absolute', inset: 0, background: 'rgba(0,53,128,0.4)', backdropFilter: 'blur(4px)' }}
              onClick={() => setSelected(null)}
            />
            <div style={{ position: 'relative', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: 20 }}>
              <motion.div 
                initial={{ scale: 0.95, opacity: 0, y: 20 }}
                animate={{ scale: 1, opacity: 1, y: 0 }}
                exit={{ scale: 0.95, opacity: 0, y: 20 }}
                style={{ width: '100%', maxWidth: 460, background: '#ffffff', borderRadius: 16, overflow: 'hidden', boxShadow: '0 20px 40px rgba(0,0,0,0.2)' }}
                onClick={e => e.stopPropagation()}
              >
                {/* Modal Header */}
                <div style={{ padding: '1.5rem', background: selected.color || '#003580', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                    <div style={{ background: 'rgba(255,255,255,0.2)', padding: 6, borderRadius: 6 }}><FiCalendar color="#fff" size={16} /></div>
                    <span style={{ color: '#fff', fontWeight: 700, fontFamily: 'Manrope, sans-serif', fontSize: 14 }}>Event Details</span>
                  </div>
                  <button onClick={() => setSelected(null)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}><FiX size={18} /></button>
                </div>

                {/* Modal Body */}
                <div style={{ padding: '2rem' }}>
                  <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '1.5rem', color: '#1a1a2e', marginBottom: 20, lineHeight: 1.3 }}>
                    {selected.title}
                  </h2>
                  
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#e6f0fb', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiCalendar size={14} color="#003580" /></div>
                      <div>
                        <div style={{ fontSize: 10, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>Date</div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a2e' }}>{moment(selected.start).format('dddd, DD MMMM YYYY')}</div>
                      </div>
                    </div>
                    
                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#eaf5ee', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiClock size={14} color="#276a27" /></div>
                      <div>
                        <div style={{ fontSize: 10, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>Time</div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a2e' }}>
                          {moment(selected.start).format('hh:mm A')} – {moment(selected.end).format('hh:mm A')}
                        </div>
                      </div>
                    </div>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                      <div style={{ width: 32, height: 32, borderRadius: '50%', background: '#fdeaea', display: 'flex', alignItems: 'center', justifyContent: 'center' }}><FiMapPin size={14} color="#e8282b" /></div>
                      <div>
                        <div style={{ fontSize: 10, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', marginBottom: 2 }}>Location</div>
                        <div style={{ fontSize: 13, fontWeight: 600, color: '#1a1a2e' }}>RRDCH Main Campus, Bangalore</div>
                      </div>
                    </div>
                  </div>

                  <div style={{ marginTop: 28, padding: 16, background: '#f7f9fc', borderRadius: 10, display: 'flex', gap: 12, alignItems: 'start' }}>
                    <FiInfo size={16} color="#003580" style={{ marginTop: 2 }} />
                    <p style={{ fontSize: 12, color: '#555e6b', lineHeight: 1.6, fontFamily: 'Inter, sans-serif' }}>
                      Additional details, registrations and handouts will be accessible via our student portal or distributed at the venue. For queries, contact the academic cell.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Events;

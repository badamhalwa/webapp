import React, { useState } from 'react';
import { Calendar, momentLocalizer } from 'react-big-calendar';
import moment from 'moment';
import 'react-big-calendar/lib/css/react-big-calendar.css';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHero, Card } from '../components/ui/UIComponents';
import { events } from '../data/mockData';
import { FiX, FiCalendar, FiClock } from 'react-icons/fi';

const localizer = momentLocalizer(moment);

const Events = () => {
  const [selected, setSelected] = useState(null);

  const eventStyleGetter = (event) => ({
    style: {
      backgroundColor: event.color || '#1A4B8C',
      borderRadius: '6px',
      border: 'none',
      color: 'white',
      fontSize: '12px',
      padding: '2px 6px',
    },
  });

  return (
    <div>
      <PageHero title="Events Calendar" subtitle="Stay updated with all academic events, conferences and health camps at RRDCH." breadcrumb="Home / Events" bg="from-indigo-600 to-rrdch-blue"/>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Calendar */}
          <div className="lg:col-span-2">
            <div className="bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden p-4">
              <Calendar
                localizer={localizer}
                events={events}
                startAccessor="start"
                endAccessor="end"
                style={{ height: 500 }}
                eventPropGetter={eventStyleGetter}
                onSelectEvent={(event) => setSelected(event)}
                views={['month', 'week', 'agenda']}
              />
            </div>
          </div>

          {/* Upcoming events list */}
          <div>
            <h3 className="font-bold text-gray-900 text-lg mb-4">Upcoming Events</h3>
            <div className="space-y-3">
              {events.sort((a,b) => a.start - b.start).map((ev, i) => (
                <motion.div key={ev.id} initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}>
                  <Card hover className="p-4" onClick={() => setSelected(ev)}>
                    <div className="flex gap-3 items-start">
                      <div className="w-2 h-full min-h-8 rounded-full flex-shrink-0" style={{ backgroundColor: ev.color }}></div>
                      <div>
                        <p className="font-semibold text-gray-900 text-sm">{ev.title}</p>
                        <div className="flex items-center gap-1 mt-1 text-xs text-gray-400">
                          <FiCalendar size={11}/>
                          {moment(ev.start).format('DD MMM YYYY')}
                          {ev.end && !moment(ev.start).isSame(ev.end, 'day') && ` – ${moment(ev.end).format('DD MMM')}`}
                        </div>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* Event detail modal */}
      <AnimatePresence>
        {selected && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 z-50 flex items-center justify-center p-4"
            onClick={() => setSelected(null)}
          >
            <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-8 max-w-md w-full shadow-2xl"
              onClick={e => e.stopPropagation()}
            >
              <div className="flex justify-between items-start mb-4">
                <div className="w-3 h-8 rounded-full" style={{ backgroundColor: selected.color }}></div>
                <button onClick={() => setSelected(null)} className="text-gray-400 hover:text-gray-700"><FiX size={20}/></button>
              </div>
              <h2 className="text-2xl font-bold text-gray-900 mb-3">{selected.title}</h2>
              <div className="flex items-center gap-2 text-gray-600 mb-2">
                <FiCalendar className="text-rrdch-blue"/>{moment(selected.start).format('dddd, DD MMMM YYYY')}
              </div>
              {!moment(selected.start).isSame(selected.end, 'day') && (
                <div className="flex items-center gap-2 text-gray-600 mb-2">
                  <FiClock className="text-rrdch-teal"/> to {moment(selected.end).format('DD MMMM YYYY')}
                </div>
              )}
              <p className="text-gray-500 text-sm mt-4">More details about this event will be shared on the Notice Board and via official RRDCH communication channels.</p>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Events;

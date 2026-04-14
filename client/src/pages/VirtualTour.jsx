import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { PageHero, Card } from '../components/ui/UIComponents';

const areas = [
  { id: 'main', label: 'Main Building', emoji: '🏛️', desc: 'The iconic main building housing administrative offices, principal chamber and lecture halls.', color: 'from-blue-500 to-blue-700' },
  { id: 'opd', label: 'OPD Block', emoji: '🦷', desc: 'Outpatient dental block with 200 dental chairs across 9 specialty departments.', color: 'from-teal-500 to-teal-700' },
  { id: 'lab', label: 'Dental Labs', emoji: '🔬', desc: 'State-of-the-art simulation labs, prosthetics lab and oral pathology labs.', color: 'from-purple-500 to-purple-700' },
  { id: 'lib', label: 'Library', emoji: '📚', desc: 'Digital library with 15,000+ books, e-journals and 24×7 access for students.', color: 'from-amber-500 to-amber-700' },
  { id: 'hostel', label: 'Hostel', emoji: '🏠', desc: 'Separate hostels for boys and girls with modern amenities and security.', color: 'from-green-500 to-green-700' },
  { id: 'sports', label: 'Sports Complex', emoji: '⚽', desc: 'Indoor and outdoor sports facilities including badminton, cricket and basketball.', color: 'from-red-500 to-red-700' },
  { id: 'canteen', label: 'Cafeteria', emoji: '🍽️', desc: 'Multi-cuisine cafeteria serving healthy, affordable meals to students and staff.', color: 'from-orange-500 to-orange-700' },
  { id: 'auditorium', label: 'Auditorium', emoji: '🎭', desc: 'Air-conditioned auditorium with 800-seat capacity for conferences and events.', color: 'from-indigo-500 to-indigo-700' },
];

const VirtualTour = () => {
  const [selected, setSelected] = useState(null);

  return (
    <div>
      <PageHero title="Virtual Campus Tour" subtitle="Explore our world-class facilities from the comfort of your home." breadcrumb="Home / Virtual Tour" bg="from-purple-700 to-rrdch-blue"/>

      <section className="max-w-7xl mx-auto px-4 py-16">
        <p className="text-gray-500 text-center mb-10 max-w-2xl mx-auto">
          Click any area below to explore that section of the RRDCH campus. Our campus spans over 15 acres with modern infrastructure.
        </p>

        {/* Campus map grid */}
        <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-4 gap-4 mb-8">
          {areas.map((area, i) => (
            <motion.button key={area.id} onClick={() => setSelected(selected?.id === area.id ? null : area)}
              initial={{ opacity: 0, scale: 0.9 }} whileInView={{ opacity: 1, scale: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.06 }}
              whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.97 }}
              className={`bg-gradient-to-br ${area.color} text-white rounded-2xl p-6 text-center shadow-md hover:shadow-xl transition-all ${selected?.id === area.id ? 'ring-4 ring-white ring-offset-2' : ''}`}
              aria-pressed={selected?.id === area.id}
            >
              <div className="text-4xl mb-2">{area.emoji}</div>
              <div className="font-semibold text-sm">{area.label}</div>
            </motion.button>
          ))}
        </div>

        {/* Detail panel */}
        <AnimatePresence>
          {selected && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <Card className="p-8 md:p-12 grid grid-cols-1 md:grid-cols-2 gap-8 items-center">
                <div>
                  <div className="text-7xl mb-4">{selected.emoji}</div>
                  <h2 className="text-3xl font-bold text-gray-900 mb-3">{selected.label}</h2>
                  <p className="text-gray-600 text-lg leading-relaxed">{selected.desc}</p>
                  <div className="mt-6 flex gap-3">
                    <span className="text-xs bg-blue-100 text-blue-700 px-3 py-1.5 rounded-full font-medium">360° View Available</span>
                    <span className="text-xs bg-teal-100 text-teal-700 px-3 py-1.5 rounded-full font-medium">Virtual Walkthrough</span>
                  </div>
                </div>
                {/* Simulate 360 viewer with animated gradient */}
                <div className={`bg-gradient-to-br ${selected.color} rounded-2xl h-64 flex items-center justify-center shadow-xl`}>
                  <div className="text-center text-white">
                    <div className="text-8xl mb-3 animate-pulse">{selected.emoji}</div>
                    <p className="text-white/80 text-sm">360° Interactive View</p>
                    <p className="text-white/60 text-xs mt-1">(Click & drag to explore)</p>
                  </div>
                </div>
              </Card>
            </motion.div>
          )}
        </AnimatePresence>

        {!selected && (
          <div className="text-center text-gray-400 py-8">
            <div className="text-5xl mb-3">👆</div>
            <p>Select any area above to begin the virtual tour</p>
          </div>
        )}
      </section>

      {/* Gallery row */}
      <section className="bg-gray-50 py-12">
        <div className="max-w-7xl mx-auto px-4">
          <h2 className="text-2xl font-bold text-gray-900 mb-6">Campus Gallery</h2>
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {['🏛️ Main Building', '🦷 OPD Block', '🔬 Research Lab', '📚 Digital Library', '🏋️ Sports Complex', '🏠 Hostel Block', '🎭 Auditorium', '🌳 Campus Gardens'].map((label, i) => (
              <motion.div key={i} whileHover={{ scale: 1.03 }}
                className={`h-40 rounded-2xl flex items-end p-4 shadow-md cursor-pointer bg-gradient-to-br ${['from-blue-400 to-blue-700', 'from-teal-400 to-teal-700', 'from-purple-400 to-purple-700', 'from-amber-400 to-amber-700', 'from-red-400 to-red-700', 'from-green-400 to-green-700', 'from-indigo-400 to-indigo-700', 'from-emerald-400 to-emerald-700'][i]}`}
              >
                <span className="text-white font-semibold text-sm drop-shadow">{label}</span>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default VirtualTour;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useApp } from '../../context/AppContext';
import { Card, FormInput, Button, StatusBadge, PageHero } from '../../components/ui/UIComponents';
import { FiSearch, FiCalendar, FiClock, FiUser } from 'react-icons/fi';

const STEPS_MAP = {
  booked: 1, confirmed: 2, completed: 3,
};

const Timeline = ({ status }) => {
  const active = STEPS_MAP[status] || 1;
  const steps = [
    { label: 'Booked', desc: 'Appointment created', icon: '📋' },
    { label: 'Confirmed', desc: 'Verified by hospital', icon: '✅' },
    { label: 'Completed', desc: 'Visit completed', icon: '🏁' },
  ];
  return (
    <div className="flex items-start gap-0 mt-6">
      {steps.map((s, i) => (
        <React.Fragment key={i}>
          <div className="flex flex-col items-center flex-shrink-0">
            <div className={`w-12 h-12 rounded-full flex items-center justify-center text-xl border-4 transition-all ${i + 1 <= active ? 'border-rrdch-teal bg-teal-50' : 'border-gray-200 bg-gray-50'}`}>{s.icon}</div>
            <p className={`text-xs font-semibold mt-2 ${i + 1 <= active ? 'text-rrdch-teal' : 'text-gray-400'}`}>{s.label}</p>
            <p className="text-xs text-gray-400 text-center w-20">{s.desc}</p>
          </div>
          {i < steps.length - 1 && <div className={`flex-1 h-1 mt-6 transition-all ${i + 1 < active ? 'bg-rrdch-teal' : 'bg-gray-200'}`}></div>}
        </React.Fragment>
      ))}
    </div>
  );
};

const AppointmentTracker = () => {
  const { t } = useTranslation();
  const { getAppointment } = useApp();
  const [query, setQuery] = useState('');
  const [result, setResult] = useState(null);
  const [notFound, setNotFound] = useState(false);
  const [searching, setSearching] = useState(false);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!query.trim()) return;
    setSearching(true);
    setNotFound(false);
    setResult(null);
    setTimeout(() => {
      const appt = getAppointment(query.trim());
      if (appt) { setResult(appt); setNotFound(false); }
      else setNotFound(true);
      setSearching(false);
    }, 800);
  };

  return (
    <div>
      <PageHero title={t('appointment.trackTitle')} subtitle="Enter your Booking ID or registered phone number to see your appointment status." breadcrumb="Home / Patients / Track Appointment"/>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <Card className="p-8 mb-6">
          <form onSubmit={handleSearch} className="space-y-4">
            <FormInput id="track-query" label={t('appointment.enterBookingId')} required
              placeholder="e.g. RRDCH-1234 or 9876543210"
              value={query} onChange={e => setQuery(e.target.value)}
            />
            <Button type="submit" disabled={searching} className="w-full justify-center" size="lg">
              {searching ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/> Searching...</> : <><FiSearch/> Track Appointment</>}
            </Button>
          </form>
        </Card>

        {notFound && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}
            className="bg-red-50 border border-red-200 rounded-2xl p-6 text-center"
          >
            <div className="text-4xl mb-3">❌</div>
            <p className="font-semibold text-red-800">No appointment found</p>
            <p className="text-red-600 text-sm mt-1">Please check your Booking ID or phone number and try again.</p>
          </motion.div>
        )}

        {result && (
          <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
            <Card className="p-8">
              <div className="flex justify-between items-start mb-4">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">Appointment Details</h2>
                  <p className="text-rrdch-blue font-mono font-bold text-lg">{result.id}</p>
                </div>
                <StatusBadge status={result.status}/>
              </div>

              <div className="grid grid-cols-2 gap-4 mb-6">
                <div className="flex items-center gap-2 text-gray-600"><FiUser className="text-rrdch-blue"/><span className="text-sm"><strong>Patient:</strong> {result.patientName}</span></div>
                <div className="flex items-center gap-2 text-gray-600"><span className="text-sm"><strong>Doctor:</strong> {result.doctor}</span></div>
                <div className="flex items-center gap-2 text-gray-600"><FiCalendar className="text-rrdch-blue"/><span className="text-sm">{result.date}</span></div>
                <div className="flex items-center gap-2 text-gray-600"><FiClock className="text-rrdch-teal"/><span className="text-sm">{result.time}</span></div>
              </div>

              <div className="bg-gray-50 rounded-xl p-4 mb-4">
                <p className="text-sm text-gray-600"><strong>Department:</strong> {result.department}</p>
                {result.reason && <p className="text-sm text-gray-600 mt-1"><strong>Reason:</strong> {result.reason}</p>}
              </div>

              <Timeline status={result.status}/>

              <div className="mt-6 p-4 bg-blue-50 rounded-xl text-sm text-blue-800">
                {result.status === 'booked' && '⏳ Your appointment is booked and awaiting confirmation from the hospital. You will be notified.'}
                {result.status === 'confirmed' && '✅ Your appointment is confirmed! Please arrive 10 minutes before your scheduled time with a valid ID.'}
                {result.status === 'completed' && '🏁 Your visit is complete. Thank you for choosing RRDCH. Please share your feedback!'}
              </div>
            </Card>
          </motion.div>
        )}

        {/* Demo hint */}
        <div className="mt-4 p-4 bg-amber-50 border border-amber-200 rounded-xl">
          <p className="text-xs text-amber-700 font-medium mb-1">💡 Demo hint — try these sample IDs:</p>
          <div className="flex flex-wrap gap-2">
            {['RRDCH-001', 'RRDCH-002', 'RRDCH-003', '9876543210'].map(id => (
              <button key={id} onClick={() => setQuery(id)} className="text-xs bg-white border border-amber-300 rounded-lg px-2 py-1 text-amber-800 hover:bg-amber-100 transition-colors">{id}</button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentTracker;

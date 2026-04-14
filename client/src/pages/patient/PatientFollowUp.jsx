import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { Card, StatusBadge, PageHero, SectionHeader } from '../../components/ui/UIComponents';
import { Link } from 'react-router-dom';
import { FiCalendar, FiClock, FiArrowRight } from 'react-icons/fi';

const PatientFollowUp = () => {
  const { appointments } = useApp();

  return (
    <div>
      <PageHero title="Patient Follow-Up System" subtitle="View your appointment history and upcoming follow-up reminders." breadcrumb="Home / Patients / Follow-Up"/>

      <div className="max-w-4xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-10">
          <div className="bg-gradient-to-br from-rrdch-blue to-blue-600 text-white rounded-2xl p-5 text-center">
            <div className="text-4xl font-black">{appointments.length}</div>
            <div className="text-blue-200 text-sm mt-1">Total Appointments</div>
          </div>
          <div className="bg-gradient-to-br from-rrdch-teal to-teal-600 text-white rounded-2xl p-5 text-center">
            <div className="text-4xl font-black">{appointments.filter(a => a.status === 'completed').length}</div>
            <div className="text-teal-100 text-sm mt-1">Completed Visits</div>
          </div>
          <div className="bg-gradient-to-br from-amber-500 to-amber-600 text-white rounded-2xl p-5 text-center">
            <div className="text-4xl font-black">{appointments.filter(a => a.status !== 'completed').length}</div>
            <div className="text-amber-100 text-sm mt-1">Upcoming / Pending</div>
          </div>
        </div>

        <SectionHeader title="Appointment History" subtitle="All your appointments at RRDCH are listed here."/>

        {appointments.length === 0 ? (
          <Card className="p-10 text-center">
            <div className="text-5xl mb-3">📋</div>
            <p className="text-gray-600 mb-4">No appointments found.</p>
            <Link to="/patient/book">
              <button className="bg-rrdch-blue text-white px-6 py-2.5 rounded-xl font-semibold hover:bg-rrdch-blue-dark transition-colors">
                Book Your First Appointment
              </button>
            </Link>
          </Card>
        ) : (
          <div className="space-y-4">
            {appointments.map((appt, i) => (
              <motion.div key={appt.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                <Card hover className="p-5 flex flex-wrap gap-4 items-center">
                  <div className="w-12 h-12 bg-gradient-to-br from-rrdch-blue to-rrdch-teal rounded-full flex items-center justify-center text-white font-bold flex-shrink-0">
                    🦷
                  </div>
                  <div className="flex-1 min-w-48">
                    <div className="flex items-center gap-2 flex-wrap">
                      <span className="font-bold text-gray-900">{appt.patientName}</span>
                      <span className="text-xs font-mono text-gray-400">{appt.id}</span>
                    </div>
                    <p className="text-sm text-gray-600">{appt.department}</p>
                    <p className="text-sm text-gray-500">Dr. {appt.doctor}</p>
                  </div>
                  <div className="text-sm text-gray-600">
                    <div className="flex items-center gap-1"><FiCalendar size={13}/> {appt.date}</div>
                    <div className="flex items-center gap-1 mt-1"><FiClock size={13}/> {appt.time}</div>
                  </div>
                  <StatusBadge status={appt.status}/>

                  {appt.status === 'completed' && (
                    <Link to="/patient/book">
                      <button className="text-xs text-rrdch-blue hover:underline flex items-center gap-1 border border-rrdch-blue rounded-lg px-3 py-1.5">
                        Book Follow-Up <FiArrowRight size={12}/>
                      </button>
                    </Link>
                  )}
                </Card>
              </motion.div>
            ))}
          </div>
        )}

        {/* Reminders */}
        {appointments.some(a => a.status !== 'completed') && (
          <div className="mt-8 p-5 bg-amber-50 border border-amber-200 rounded-2xl">
            <h3 className="font-bold text-amber-800 mb-3">📅 Upcoming Reminders</h3>
            {appointments.filter(a => a.status !== 'completed').map(appt => (
              <div key={appt.id} className="flex items-center gap-3 py-2 border-b border-amber-100 last:border-0">
                <div className="w-2 h-2 bg-amber-500 rounded-full"></div>
                <p className="text-sm text-amber-900"><strong>{appt.patientName}</strong> — {appt.department} on <strong>{appt.date}</strong> at <strong>{appt.time}</strong></p>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default PatientFollowUp;

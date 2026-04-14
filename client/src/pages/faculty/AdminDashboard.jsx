import React from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { Card, StatusBadge, Badge, SectionHeader } from '../../components/ui/UIComponents';
import { Link } from 'react-router-dom';
import { FiCalendar, FiUsers, FiMessageSquare, FiAlertCircle, FiArrowRight } from 'react-icons/fi';

const AdminDashboard = () => {
  const { appointments, hostelComplaints, feedbacks, queue } = useApp();

  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long', year: 'numeric' });
  const pendingComplaints = hostelComplaints.filter(c => c.status !== 'resolved').length;
  const todayAppts = appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length;
  const avgRating = feedbacks.length ? (feedbacks.reduce((s, f) => s + f.rating, 0) / feedbacks.length).toFixed(1) : '—';

  const statCards = [
    { label: "Today's Appointments", value: todayAppts, icon: '📅', color: 'from-rrdch-blue to-blue-500', link: '/patient/track' },
    { label: 'Total Appointments', value: appointments.length, icon: '📋', color: 'from-teal-500 to-rrdch-teal', link: '/patient/track' },
    { label: 'Pending Complaints', value: pendingComplaints, icon: '🏠', color: 'from-amber-500 to-amber-600', link: '/student/hostel' },
    { label: 'Feedback Score', value: avgRating, icon: '⭐', color: 'from-purple-500 to-purple-700', link: '/patient/feedback' },
    { label: 'Queue Size', value: queue.length, icon: '⏱', color: 'from-rose-500 to-rose-600', link: '/patient/queue' },
    { label: 'Total Feedback', value: feedbacks.length, icon: '💬', color: 'from-green-500 to-green-700', link: '/patient/feedback' },
  ];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <div className="bg-gradient-to-r from-rrdch-blue-dark to-rrdch-blue text-white px-4 py-10">
        <div className="max-w-7xl mx-auto">
          <p className="text-blue-200 text-sm mb-1">🛡️ Admin Panel — {today}</p>
          <h1 className="text-3xl md:text-4xl font-bold">Admin Dashboard</h1>
          <p className="text-blue-200 mt-1">Overview of all departments, appointments, and operations at RRDCH.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Stat Cards */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-4 mb-12">
          {statCards.map((s, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.07 }}>
              <Link to={s.link}>
                <motion.div whileHover={{ scale: 1.04 }} className={`bg-gradient-to-br ${s.color} text-white rounded-2xl p-5 text-center shadow-md hover:shadow-xl transition-all cursor-pointer`}>
                  <div className="text-3xl mb-1">{s.icon}</div>
                  <div className="text-3xl font-black">{s.value}</div>
                  <div className="text-white/80 text-xs mt-1">{s.label}</div>
                </motion.div>
              </Link>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Recent Appointments */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Recent Appointments</h2>
              <Link to="/patient/track" className="text-rrdch-blue text-sm hover:underline flex items-center gap-1">View All <FiArrowRight size={14}/></Link>
            </div>
            <Card className="overflow-hidden">
              <table className="w-full">
                <thead className="bg-gray-50 border-b border-gray-100">
                  <tr>
                    {['ID', 'Patient', 'Department', 'Date', 'Status'].map(h => (
                      <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>
                    ))}
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-50">
                  {appointments.slice(0, 6).map((appt, i) => (
                    <tr key={appt.id} className="hover:bg-gray-50 transition-colors">
                      <td className="px-4 py-3 text-xs font-mono text-rrdch-blue">{appt.id}</td>
                      <td className="px-4 py-3 text-sm font-medium text-gray-900">{appt.patientName}</td>
                      <td className="px-4 py-3 text-xs text-gray-500">{appt.department?.split(' ')[0]}</td>
                      <td className="px-4 py-3 text-xs text-gray-600">{appt.date}</td>
                      <td className="px-4 py-3"><StatusBadge status={appt.status}/></td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </Card>
          </div>

          {/* Hostel Complaints */}
          <div>
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Hostel Complaints</h2>
              <Link to="/student/hostel" className="text-rrdch-blue text-sm hover:underline flex items-center gap-1">View All <FiArrowRight size={14}/></Link>
            </div>
            {hostelComplaints.length === 0 ? (
              <Card className="p-8 text-center text-gray-400">
                <FiAlertCircle size={24} className="mx-auto mb-2"/>
                <p>No hostel complaints on record.</p>
              </Card>
            ) : (
              <Card className="overflow-hidden">
                <table className="w-full">
                  <thead className="bg-gray-50 border-b border-gray-100">
                    <tr>
                      {['ID', 'Room', 'Category', 'Date', 'Status'].map(h => (
                        <th key={h} className="px-4 py-3 text-left text-xs font-semibold text-gray-500 uppercase">{h}</th>
                      ))}
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-gray-50">
                    {hostelComplaints.slice(0, 6).map((c) => (
                      <tr key={c.id} className="hover:bg-gray-50 transition-colors">
                        <td className="px-4 py-3 text-xs font-mono text-purple-600">{c.id}</td>
                        <td className="px-4 py-3 text-sm text-gray-900">{c.room}</td>
                        <td className="px-4 py-3 text-xs text-gray-500">{c.category}</td>
                        <td className="px-4 py-3 text-xs text-gray-600">{c.date}</td>
                        <td className="px-4 py-3"><StatusBadge status={c.status}/></td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </Card>
            )}
          </div>
        </div>

        {/* Quick Actions */}
        <SectionHeader title="Quick Actions" className="mt-10"/>
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
          {[
            { label: 'Book Appointment', path: '/patient/book', icon: '📅', color: 'bg-rrdch-blue' },
            { label: 'View Live Queue', path: '/patient/queue', icon: '⏱', color: 'bg-rrdch-teal' },
            { label: 'Hostel Complaints', path: '/student/hostel', icon: '🏠', color: 'bg-purple-600' },
            { label: 'Student Dashboard', path: '/student/dashboard', icon: '🎓', color: 'bg-amber-500' },
          ].map((a, i) => (
            <Link key={i} to={a.path}>
              <motion.div whileHover={{ scale: 1.03 }} className={`${a.color} text-white rounded-2xl p-5 flex items-center gap-3 shadow-md hover:shadow-lg transition-all`}>
                <span className="text-2xl">{a.icon}</span>
                <span className="font-semibold text-sm">{a.label}</span>
              </motion.div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;

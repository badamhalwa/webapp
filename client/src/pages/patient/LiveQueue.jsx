import React, { useEffect, useState } from 'react';
import { motion } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { Card, StatusBadge, PageHero, Badge } from '../../components/ui/UIComponents';
import { FiClock, FiAlertCircle, FiRefreshCw } from 'react-icons/fi';

const LiveQueue = () => {
  const { queue, availability, notifications } = useApp();
  const [lastUpdate, setLastUpdate] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => { setLastUpdate(new Date()); }, 15000);
    return () => clearInterval(timer);
  }, []);

  const refresh = () => {
    setRefreshing(true);
    setTimeout(() => { setLastUpdate(new Date()); setRefreshing(false); }, 600);
  };

  return (
    <div>
      <PageHero title="Live Queue Status" subtitle="Real-time updates on patient queue and doctor availability across all departments." breadcrumb="Home / Patients / Live Queue" bg="from-rrdch-teal to-rrdch-blue"/>

      <div className="max-w-7xl mx-auto px-4 py-12">
        {/* Header bar */}
        <div className="flex justify-between items-center mb-6">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 bg-green-500 rounded-full animate-pulse"></div>
            <span className="text-sm font-medium text-gray-700">Live — Updates every 15 seconds</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-gray-400">Last updated: {lastUpdate.toLocaleTimeString()}</span>
            <button onClick={refresh} disabled={refreshing} aria-label="Refresh queue"
              className="p-2 rounded-lg hover:bg-gray-100 text-gray-500 transition-colors"
            ><FiRefreshCw className={refreshing ? 'animate-spin' : ''} size={16}/></button>
          </div>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 mb-8">
          {/* Queue */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Current Queue</h2>
            <div className="space-y-3">
              {queue.map((patient, i) => (
                <motion.div key={patient.token} initial={{ opacity: 0, x: -20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card className={`p-4 flex items-center gap-4 ${patient.status === 'in-progress' ? 'border-2 border-rrdch-teal bg-teal-50' : ''}`}>
                    <div className={`w-12 h-12 rounded-full flex items-center justify-center font-bold text-lg flex-shrink-0 ${patient.status === 'in-progress' ? 'bg-rrdch-teal text-white' : 'bg-gray-100 text-gray-700'}`}>
                      {patient.token}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{patient.name}</p>
                      <p className="text-sm text-gray-500">{patient.dept}</p>
                    </div>
                    <div className="text-right">
                      <StatusBadge status={patient.status}/>
                      {patient.status !== 'in-progress' && (
                        <p className="text-xs text-gray-400 mt-1 flex items-center gap-1"><FiClock size={11}/> ~{patient.waitTime} min wait</p>
                      )}
                      {patient.status === 'in-progress' && (
                        <p className="text-xs text-rrdch-teal font-semibold mt-1">Now being attended</p>
                      )}
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>

          {/* Doctor Availability */}
          <div>
            <h2 className="text-xl font-bold text-gray-900 mb-4">Doctor Availability</h2>
            <div className="space-y-3">
              {availability.map((doc, i) => (
                <motion.div key={doc.name} initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.05 }}>
                  <Card className="p-4 flex items-center gap-4">
                    <div className="w-12 h-12 rounded-full bg-gradient-to-br from-rrdch-blue to-rrdch-teal flex items-center justify-center text-white font-bold text-lg flex-shrink-0">
                      {doc.name.split(' ')[1]?.[0] || 'D'}
                    </div>
                    <div className="flex-1">
                      <p className="font-semibold text-gray-900">{doc.name}</p>
                      <p className="text-sm text-gray-500">{doc.dept}</p>
                      {doc.currentPatient && <p className="text-xs text-orange-600 mt-1">Attending: {doc.currentPatient}</p>}
                    </div>
                    <div className="text-right">
                      <StatusBadge status={doc.status}/>
                      <div className={`mt-1.5 w-2.5 h-2.5 rounded-full ml-auto ${doc.status === 'available' ? 'bg-green-500 animate-pulse' : doc.status === 'busy' ? 'bg-orange-500' : 'bg-gray-400'}`}></div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </div>

        {/* Live Notifications */}
        <div>
          <h2 className="text-xl font-bold text-gray-900 mb-4">Live Announcements</h2>
          {notifications.length === 0 ? (
            <Card className="p-6 text-center text-gray-400">
              <FiAlertCircle size={24} className="mx-auto mb-2"/>
              <p>No live announcements at the moment</p>
            </Card>
          ) : (
            <div className="space-y-3">
              {notifications.map(n => (
                <motion.div key={n.id} initial={{ opacity: 0, y: -10 }} animate={{ opacity: 1, y: 0 }}>
                  <Card className="p-4 flex items-start gap-3 border-l-4 border-rrdch-teal">
                    <div className="w-2.5 h-2.5 bg-rrdch-teal rounded-full mt-1 flex-shrink-0 animate-pulse"></div>
                    <div>
                      <p className="text-sm text-gray-800">{n.msg}</p>
                      <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>
          )}
        </div>

        <div className="mt-6 p-4 bg-blue-50 rounded-xl border border-blue-100">
          <p className="text-sm text-blue-700"><strong>Note:</strong> This is a live simulation. In the production system, updates are pushed via WebSocket for real-time accuracy. Please arrive at the OPD reception desk with your token number to get the most accurate wait time.</p>
        </div>
      </div>
    </div>
  );
};

export default LiveQueue;

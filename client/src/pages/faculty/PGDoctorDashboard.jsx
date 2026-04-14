import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useApp } from '../../context/AppContext';
import { Card, StatusBadge, SectionHeader } from '../../components/ui/UIComponents';
import { pgSchedule, doctorAvailability } from '../../data/mockData';
import { FiRefreshCw, FiClock, FiBell, FiLock, FiEye, FiEyeOff } from 'react-icons/fi';

// PIN gate — protects PG doctor private schedule from public view
// Demo PIN: 1234
const DEMO_PIN = '1234';

const PINGate = ({ onUnlock }) => {
  const [pin, setPin] = useState('');
  const [showPin, setShowPin] = useState(false);
  const [error, setError] = useState('');
  const [shaking, setShaking] = useState(false);

  const handleDigit = (d) => {
    if (pin.length < 4) {
      const next = pin + d;
      setPin(next);
      setError('');
      if (next.length === 4) {
        setTimeout(() => {
          if (next === DEMO_PIN) {
            onUnlock();
          } else {
            setError('Incorrect PIN. Please try again.');
            setShaking(true);
            setPin('');
            setTimeout(() => setShaking(false), 500);
          }
        }, 200);
      }
    }
  };

  const handleBackspace = () => setPin(p => p.slice(0, -1));

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#0f2d42] to-[#1a4a6b] flex items-center justify-center px-4">
      <motion.div
        initial={{ scale: 0.9, opacity: 0 }}
        animate={shaking ? { x: [-8, 8, -8, 8, 0] } : { scale: 1, opacity: 1 }}
        transition={shaking ? { duration: 0.4 } : { type: 'spring', stiffness: 200 }}
        className="bg-white rounded-3xl shadow-2xl p-10 w-full max-w-sm text-center"
      >
        <div className="w-16 h-16 bg-gradient-to-br from-[#1a4a6b] to-[#1e5a85] rounded-full flex items-center justify-center mx-auto mb-4 shadow-lg">
          <FiLock size={28} className="text-white"/>
        </div>
        <h1 className="text-2xl font-bold text-gray-900 mb-1">PG Doctor Portal</h1>
        <p className="text-gray-500 text-sm mb-6">Enter your 4-digit access PIN to continue</p>

        {/* PIN dots */}
        <div className="flex justify-center gap-4 mb-6">
          {[0, 1, 2, 3].map(i => (
            <div key={i} className={`w-4 h-4 rounded-full border-2 transition-all ${i < pin.length ? 'bg-[#1a4a6b] border-[#1a4a6b] scale-110' : 'bg-transparent border-gray-300'}`}/>
          ))}
        </div>

        {error && (
          <motion.p initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="text-red-500 text-sm mb-4 bg-red-50 py-2 px-4 rounded-lg">
            {error}
          </motion.p>
        )}

        {/* Numpad */}
        <div className="grid grid-cols-3 gap-3 mb-4">
          {[1,2,3,4,5,6,7,8,9,'',0,'⌫'].map((d, i) => (
            <button key={i}
              onClick={() => d === '⌫' ? handleBackspace() : d !== '' ? handleDigit(String(d)) : null}
              disabled={d === ''}
              className={`h-14 rounded-2xl text-xl font-semibold transition-all ${
                d === '⌫' ? 'text-gray-400 hover:bg-red-50 hover:text-red-500'
                : d === '' ? 'opacity-0 cursor-default'
                : 'bg-gray-50 hover:bg-[#1a4a6b] hover:text-white text-gray-900 active:scale-95'
              }`}
              aria-label={d === '⌫' ? 'Backspace' : `Digit ${d}`}
            >
              {d}
            </button>
          ))}
        </div>

        <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl text-left">
          <p className="text-xs text-amber-700 font-semibold mb-1">🔑 Demo Access</p>
          <p className="text-xs text-amber-600">Use PIN: <strong>1234</strong> to access the dashboard</p>
        </div>
      </motion.div>
    </div>
  );
};

// ─── Main Dashboard (authenticated) ──────────────────────────────────────────
const PGDoctorDashboard = () => {
  const { queue, notifications, availability } = useApp();
  const [unlocked, setUnlocked] = useState(() => sessionStorage.getItem('pg-auth') === '1');
  const [lastSync, setLastSync] = useState(new Date());
  const [refreshing, setRefreshing] = useState(false);
  const today = new Date().toLocaleDateString('en-IN', { weekday: 'long', day: 'numeric', month: 'long' });

  const handleUnlock = () => {
    sessionStorage.setItem('pg-auth', '1');
    setUnlocked(true);
  };

  const handleLock = () => {
    sessionStorage.removeItem('pg-auth');
    setUnlocked(false);
  };

  // 60-second refresh indicator
  useEffect(() => {
    const timer = setInterval(() => setLastSync(new Date()), 60000);
    return () => clearInterval(timer);
  }, []);

  const refresh = () => {
    setRefreshing(true);
    setTimeout(() => { setLastSync(new Date()); setRefreshing(false); }, 700);
  };

  if (!unlocked) return <PINGate onUnlock={handleUnlock}/>;

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="bg-gradient-to-r from-[#0f2d42] to-[#1a4a6b] text-white px-4 py-10">
        <div className="max-w-7xl mx-auto flex justify-between items-start flex-wrap gap-4">
          <div>
            <p className="text-blue-200 text-sm mb-1">{today}</p>
            <h1 className="text-3xl md:text-4xl font-bold">PG Doctor Dashboard</h1>
            <p className="text-blue-100 mt-1">Live patient schedule and duty updates for PG residents.</p>
          </div>
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 bg-green-400 rounded-full animate-pulse"></div>
              <span className="text-sm text-blue-200">Live — polls every 60s</span>
              <span className="text-xs text-blue-300">{lastSync.toLocaleTimeString()}</span>
            </div>
            <button onClick={refresh} disabled={refreshing} aria-label="Refresh" className="p-2 rounded-lg bg-white/10 hover:bg-white/20 transition-colors">
              <FiRefreshCw className={refreshing ? 'animate-spin' : ''} size={16}/>
            </button>
            <button onClick={handleLock} className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-red-500/20 hover:bg-red-500/30 text-red-200 text-xs font-semibold transition-colors" aria-label="Lock portal">
              <FiLock size={13}/> Lock
            </button>
          </div>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 py-10">
        {/* Stats */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-10">
          {[
            ['Patients Today', queue.length, 'bg-[#1a4a6b]'],
            ['In Progress', queue.filter(q => q.status === 'in-progress').length, 'bg-rrdch-teal'],
            ['Completed', '12', 'bg-green-600'],
            ['On Duty PGs', pgSchedule.filter(p => p.status === 'on-duty').length, 'bg-purple-600'],
          ].map(([label, val, bg], i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 15 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.08 }}
              className={`${bg} text-white rounded-2xl p-5 text-center shadow-md`}
            >
              <div className="text-3xl font-black mb-1">{val}</div>
              <div className="text-white/80 text-sm">{label}</div>
            </motion.div>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* PG Schedule */}
          <div className="lg:col-span-2">
            <SectionHeader title="PG Resident Duty Schedule — Today"/>
            <div className="space-y-3 mb-10">
              {pgSchedule.map((pg, i) => (
                <motion.div key={i} initial={{ opacity: 0, x: -15 }} animate={{ opacity: 1, x: 0 }} transition={{ delay: i * 0.06 }}>
                  <Card className="p-5 flex items-center gap-4">
                    <div className="w-12 h-12 bg-gradient-to-br from-purple-500 to-purple-700 rounded-full flex items-center justify-center text-white font-bold text-xs flex-shrink-0">PG</div>
                    <div className="flex-1">
                      <p className="font-bold text-gray-900">{pg.doctor}</p>
                      <div className="flex items-center gap-2 mt-1 text-sm text-gray-500">
                        <FiClock size={13}/> {pg.time} | {pg.shift} Shift
                      </div>
                      <p className="text-xs text-gray-400 mt-0.5">{pg.dept} Department</p>
                    </div>
                    <div className="text-right">
                      <StatusBadge status={pg.status}/>
                      <p className="text-xs text-gray-500 mt-1">{pg.cases} cases assigned</p>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            {/* Live patient queue */}
            <SectionHeader title="Live Patient Queue"/>
            <div className="space-y-3">
              {queue.map((p) => (
                <Card key={p.token} className={`p-4 flex items-center gap-4 ${p.status === 'in-progress' ? 'border-2 border-rrdch-teal' : ''}`}>
                  <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold flex-shrink-0 ${p.status === 'in-progress' ? 'bg-rrdch-teal text-white' : 'bg-gray-100 text-gray-700'}`}>
                    #{p.token}
                  </div>
                  <div className="flex-1">
                    <p className="font-medium">{p.name}</p>
                    <p className="text-xs text-gray-500">{p.dept}</p>
                  </div>
                  <StatusBadge status={p.status}/>
                  {p.status === 'waiting' && <span className="text-xs text-gray-400">~{p.waitTime}m</span>}
                </Card>
              ))}
            </div>
          </div>

          {/* Sidebar */}
          <div>
            <SectionHeader title="Live Notifications"/>
            <div className="space-y-3 mb-8">
              {notifications.length === 0 ? (
                <Card className="p-6 text-center text-gray-400 text-sm">
                  <FiBell className="mx-auto mb-2" size={24}/>
                  <p>No notifications yet</p>
                  <p className="text-xs mt-1">Updates appear every 60s</p>
                </Card>
              ) : notifications.map(n => (
                <motion.div key={n.id} initial={{ opacity: 0, y: -5 }} animate={{ opacity: 1, y: 0 }}>
                  <Card className="p-4 border-l-4 border-[#E8A020]">
                    <div className="flex items-start gap-2">
                      <div className="w-2 h-2 bg-[#E8A020] rounded-full mt-1.5 flex-shrink-0 animate-pulse"></div>
                      <div>
                        <p className="text-sm text-gray-800">{n.msg}</p>
                        <p className="text-xs text-gray-400 mt-1">{n.time}</p>
                      </div>
                    </div>
                  </Card>
                </motion.div>
              ))}
            </div>

            <SectionHeader title="Faculty Availability"/>
            <div className="space-y-2">
              {availability.slice(0, 4).map((doc, i) => (
                <Card key={i} className="p-3 flex items-center gap-3">
                  <div className={`w-3 h-3 rounded-full ${doc.status === 'available' ? 'bg-green-500 animate-pulse' : doc.status === 'busy' ? 'bg-orange-500' : 'bg-gray-400'}`}></div>
                  <div className="flex-1 min-w-0">
                    <p className="font-medium text-sm text-gray-900 truncate">{doc.name}</p>
                    <p className="text-xs text-gray-400">{doc.dept}</p>
                  </div>
                  <StatusBadge status={doc.status}/>
                </Card>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PGDoctorDashboard;

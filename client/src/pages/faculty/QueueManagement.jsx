import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { departments } from '../../data/mockData';
import { FiArrowLeft, FiActivity, FiMinus, FiPlus, FiSave, FiMonitor } from 'react-icons/fi';
import { Card, Button } from '../../components/ui/UIComponents';
import toast from 'react-hot-toast';

const QueueManagement = () => {
  const { queue, updateQueueDepartment } = useApp();
  const [updating, setUpdating] = useState(null);

  const handleUpdate = async (deptId, field, value) => {
    setUpdating(deptId);
    
    const rawQ = queue.find(q => q.id === String(deptId)) || {};
    const qState = {
      current: rawQ.current !== undefined ? Number(rawQ.current) : 0,
      waiting: rawQ.waiting !== undefined ? Number(rawQ.waiting) : 0,
      status: rawQ.status || 'Active'
    };
    const newData = { ...qState, [field]: value };
    
    // Ensure numbers don't go below 0
    if (field === 'current' && newData.current < 0) newData.current = 0;
    if (field === 'waiting' && newData.waiting < 0) newData.waiting = 0;

    try {
      await updateQueueDepartment(deptId, newData);
      toast.success('Live Queue Synced', { id: `queue-${deptId}` });
    } catch (err) {
      toast.error('Failed to sync queue');
    } finally {
      setUpdating(null);
    }
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '4rem' }}>
      {/* ── Page Hero ── */}
      <section style={{ background: '#003580', padding: '2rem 2rem 3rem' }}>
        <div className="max-w-7xl mx-auto">
          <Link to="/admin" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, marginBottom: 16 }}>
            <FiArrowLeft /> Back to Dashboard
          </Link>
          <div className="flex justify-between items-end flex-wrap gap-4">
            <div>
              <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#ffffff', marginBottom: 8 }}>
                Live Queue Management
              </h1>
              <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', maxWidth: 600 }}>
                Adjust token numbers and waiting lists for each department. Changes instantly reflect on the public screens.
              </p>
            </div>
            <Link to="/patient/queue" target="_blank" className="vs-btn vs-btn-outline bg-white/10 text-white hover:bg-white/20 border-white/20">
              <FiMonitor className="mr-2" /> View Patient Screen
            </Link>
          </div>
        </div>
      </section>

      <div className="max-w-7xl mx-auto px-4 -mt-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          {departments.slice(0, 6).map((dept) => {
            const rawQ = queue.find(q => q.id === String(dept.id)) || {};
            const qState = {
              current: rawQ.current !== undefined ? Number(rawQ.current) : 0,
              waiting: rawQ.waiting !== undefined ? Number(rawQ.waiting) : 0,
              status: rawQ.status || 'Active'
            };
            const isBusy = qState.status === 'Busy';

            return (
              <motion.div key={dept.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <Card className="p-6 bg-white border-t-4" style={{ borderColor: isBusy ? '#f59e0b' : '#009688' }}>
                  <div className="flex justify-between items-start mb-6 border-b border-gray-100 pb-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-lg bg-blue-50 text-rrdch-blue flex items-center justify-center">
                        <FiActivity size={20} />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-gray-900 leading-tight">{dept.name}</h3>
                        <div className="text-[10px] text-gray-400 font-black uppercase mt-1">Dept {dept.id}</div>
                      </div>
                    </div>
                    <button 
                      onClick={() => handleUpdate(dept.id, 'status', isBusy ? 'Active' : 'Busy')}
                      className={`px-3 py-1 text-xs font-bold rounded-full transition-colors ${
                        isBusy ? 'bg-amber-100 text-amber-700 hover:bg-amber-200' : 'bg-teal-100 text-teal-700 hover:bg-teal-200'
                      }`}
                    >
                      {isBusy ? 'BUSY' : 'ACTIVE'}
                    </button>
                  </div>

                  <div className="grid grid-cols-2 gap-8">
                    {/* Serving Control */}
                    <div>
                      <div className="text-[10px] font-black text-gray-400 uppercase mb-3 text-center tracking-wider">Currently Serving</div>
                      <div className="flex items-center justify-center gap-4">
                        <button 
                          onClick={() => handleUpdate(dept.id, 'current', qState.current - 1)}
                          disabled={updating === dept.id || qState.current <= 0}
                          className="w-10 h-10 rounded-full border-2 border-gray-100 flex items-center justify-center text-gray-500 hover:border-rrdch-blue hover:text-rrdch-blue disabled:opacity-50 transition-colors"
                        >
                          <FiMinus />
                        </button>
                        <div className="text-3xl font-black text-rrdch-blue w-16 text-center">
                          #{qState.current}
                        </div>
                        <button 
                          onClick={() => handleUpdate(dept.id, 'current', qState.current + 1)}
                          disabled={updating === dept.id}
                          className="w-10 h-10 rounded-full bg-rrdch-blue text-white flex items-center justify-center hover:bg-blue-800 disabled:opacity-50 transition-colors shadow-md"
                        >
                          <FiPlus />
                        </button>
                      </div>
                    </div>

                    {/* Waiting Control */}
                    <div className="border-l border-gray-100 pl-8">
                      <div className="text-[10px] font-black text-gray-400 uppercase mb-3 text-center tracking-wider">Waiting List</div>
                      <div className="flex items-center justify-center gap-4">
                        <button 
                          onClick={() => handleUpdate(dept.id, 'waiting', qState.waiting - 1)}
                          disabled={updating === dept.id || qState.waiting <= 0}
                          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-red-500 hover:text-red-500 disabled:opacity-50 transition-colors"
                        >
                          <FiMinus size={14} />
                        </button>
                        <div className="text-2xl font-black text-red-500 w-12 text-center">
                          {qState.waiting}
                        </div>
                        <button 
                          onClick={() => handleUpdate(dept.id, 'waiting', qState.waiting + 1)}
                          disabled={updating === dept.id}
                          className="w-8 h-8 rounded-full border border-gray-200 flex items-center justify-center text-gray-500 hover:border-green-500 hover:text-green-500 disabled:opacity-50 transition-colors"
                        >
                          <FiPlus size={14} />
                        </button>
                      </div>
                      <div className="text-center mt-3 text-[10px] text-gray-400 font-bold">
                        Est. Wait: {qState.waiting * 15} mins
                      </div>
                    </div>
                  </div>
                </Card>
              </motion.div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default QueueManagement;

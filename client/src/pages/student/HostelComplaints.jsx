import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import toast, { Toaster } from 'react-hot-toast';
import { useApp } from '../../context/AppContext';
import { Card, FormInput, FormTextarea, FormSelect, Button, StatusBadge, PageHero, SectionHeader } from '../../components/ui/UIComponents';
import { FiSearch } from 'react-icons/fi';

const categories = ['Plumbing', 'Electrical', 'Cleanliness', 'Security', 'Maintenance', 'Wi-Fi / Internet', 'Food', 'Other'];

const HostelComplaints = () => {
  const { t } = useTranslation();
  const { hostelComplaints, addComplaint } = useApp();
  const [tab, setTab] = useState('submit');
  const [form, setForm] = useState({ name: '', room: '', category: '', description: '' });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const [submitted, setSubmitted] = useState(null);
  const [trackId, setTrackId] = useState('');
  const [trackResult, setTrackResult] = useState(null);
  const [trackError, setTrackError] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.room.trim()) e.room = 'Room number is required';
    if (!form.category) e.category = 'Please select a category';
    if (!form.description.trim() || form.description.length < 10) e.description = 'Please provide at least 10 characters';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      const id = 'HC-' + String(Date.now()).slice(-4);
      const complaint = { ...form, id, status: 'submitted', date: new Date().toISOString().split('T')[0] };
      addComplaint(complaint);
      setLoading(false);
      setSubmitted({ ...complaint });
      toast.success(t('hostel.success'));
    }, 900);
  };

  const handleTrack = (e) => {
    e.preventDefault();
    setTrackError(false);
    setTrackResult(null);
    const result = hostelComplaints.find(c => c.id.toLowerCase() === trackId.toLowerCase());
    if (result) setTrackResult(result);
    else setTrackError(true);
  };

  return (
    <div>
      <Toaster position="top-right"/>
      <PageHero title={t('hostel.title')} subtitle="Submit and track hostel maintenance and service complaints." breadcrumb="Home / Students / Hostel Complaints" bg="from-purple-700 to-rrdch-blue"/>

      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Tabs */}
        <div className="flex gap-2 mb-8 bg-gray-100 rounded-2xl p-1.5">
          {['submit', 'track', 'history'].map(t => (
            <button key={t} onClick={() => setTab(t)}
              className={`flex-1 py-2.5 rounded-xl text-sm font-semibold transition-all ${tab === t ? 'bg-white shadow-sm text-rrdch-blue' : 'text-gray-500 hover:text-gray-700'}`}
              aria-pressed={tab === t}
            >
              {t === 'submit' ? '📝 Submit' : t === 'track' ? '🔍 Track' : '📋 History'}
            </button>
          ))}
        </div>

        {/* Submit */}
        <AnimatePresence mode="wait">
          {tab === 'submit' && (
            <motion.div key="submit" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              {submitted ? (
                <div className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center">
                  <div className="text-6xl mb-4">✅</div>
                  <h3 className="text-2xl font-bold text-green-800 mb-2">Complaint Submitted!</h3>
                  <p className="text-green-700 mb-4">Your complaint ID is <strong className="font-mono">{submitted.id}</strong>. Use this to track the status.</p>
                  <p className="text-green-600 text-sm mb-6">The hostel administration will review your complaint within 24–48 hours.</p>
                  <div className="flex gap-3 justify-center flex-wrap">
                    <Button onClick={() => { setSubmitted(null); setForm({ name: '', room: '', category: '', description: '' }); }}>Submit Another</Button>
                    <Button variant="outline" onClick={() => { setTab('track'); setTrackId(submitted.id); }}>Track This Complaint</Button>
                  </div>
                </div>
              ) : (
                <Card className="p-8">
                  <form onSubmit={handleSubmit} className="space-y-5" noValidate>
                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                      <FormInput id="hc-name" label={t('hostel.name')} required placeholder="Your full name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} error={errors.name}/>
                      <FormInput id="hc-room" label={t('hostel.room')} required placeholder="e.g. B-204" value={form.room} onChange={e => setForm({...form, room: e.target.value})} error={errors.room}/>
                    </div>
                    <FormSelect id="hc-cat" label={t('hostel.category')} required value={form.category} onChange={e => setForm({...form, category: e.target.value})} error={errors.category}>
                      <option value="">Select category</option>
                      {categories.map(c => <option key={c} value={c}>{c}</option>)}
                    </FormSelect>
                    <FormTextarea id="hc-desc" label={t('hostel.description')} required placeholder="Describe the issue in detail..." value={form.description} onChange={e => setForm({...form, description: e.target.value})} error={errors.description}/>
                    <Button type="submit" size="lg" className="w-full justify-center" disabled={loading}>
                      {loading ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/> Submitting...</> : t('hostel.submit')}
                    </Button>
                  </form>
                </Card>
              )}
            </motion.div>
          )}

          {/* Track */}
          {tab === 'track' && (
            <motion.div key="track" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              <Card className="p-8">
                <form onSubmit={handleTrack} className="space-y-4 mb-6">
                  <FormInput id="hc-trackid" label="Complaint ID" required placeholder="e.g. HC-1234" value={trackId} onChange={e => setTrackId(e.target.value)}/>
                  <Button type="submit" className="w-full justify-center"><FiSearch/> {t('hostel.track')}</Button>
                </form>
                {trackError && <div className="bg-red-50 border border-red-200 rounded-xl p-4 text-center text-red-700">No complaint found with ID: <strong>{trackId}</strong></div>}
                {trackResult && (
                  <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="bg-gray-50 rounded-xl p-6 space-y-3">
                    <div className="flex justify-between items-center"><span className="font-bold">Complaint ID</span><span className="font-mono text-rrdch-blue">{trackResult.id}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Name</span><span>{trackResult.name}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Room</span><span>{trackResult.room}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Category</span><span>{trackResult.category}</span></div>
                    <div className="flex justify-between"><span className="text-gray-600">Date</span><span>{trackResult.date}</span></div>
                    <div className="flex justify-between items-center"><span className="text-gray-600">Status</span><StatusBadge status={trackResult.status}/></div>
                    <div><p className="text-gray-600 text-sm mb-1">Description:</p><p className="text-gray-900 text-sm bg-white p-3 rounded-lg border border-gray-200">{trackResult.description}</p></div>
                  </motion.div>
                )}
                <div className="mt-4 p-3 bg-amber-50 border border-amber-200 rounded-xl">
                  <p className="text-xs text-amber-700 font-medium mb-1">💡 Try these demo IDs:</p>
                  <div className="flex flex-wrap gap-2">
                    {['HC-001', 'HC-002', 'HC-003'].map(id => (
                      <button key={id} onClick={() => setTrackId(id)} className="text-xs bg-white border border-amber-300 rounded px-2 py-1 text-amber-800 hover:bg-amber-100">{id}</button>
                    ))}
                  </div>
                </div>
              </Card>
            </motion.div>
          )}

          {/* History */}
          {tab === 'history' && (
            <motion.div key="history" initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0, y: -10 }}>
              {hostelComplaints.length === 0 ? (
                <Card className="p-10 text-center text-gray-400">
                  <div className="text-5xl mb-3">📋</div>
                  <p>No complaints submitted yet.</p>
                </Card>
              ) : (
                <div className="space-y-4">
                  {hostelComplaints.map((c, i) => (
                    <Card key={c.id} className="p-5 flex flex-wrap gap-4 items-center">
                      <div className="flex-1 min-w-48">
                        <div className="flex items-center gap-2 mb-1">
                          <span className="font-mono text-sm text-rrdch-blue font-bold">{c.id}</span>
                          <StatusBadge status={c.status}/>
                        </div>
                        <p className="font-medium text-gray-900">{c.category}</p>
                        <p className="text-sm text-gray-500">Room {c.room} — {c.date}</p>
                      </div>
                      <p className="text-sm text-gray-600 max-w-56">{c.description}</p>
                    </Card>
                  ))}
                </div>
              )}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </div>
  );
};

export default HostelComplaints;

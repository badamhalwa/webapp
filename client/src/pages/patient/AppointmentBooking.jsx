import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import toast, { Toaster } from 'react-hot-toast';
import { useApp } from '../../context/AppContext';
import { departments, doctors } from '../../data/mockData';
import { FiCheck, FiArrowRight, FiArrowLeft, FiCopy, FiCalendar, FiClock, FiUser, FiGrid } from 'react-icons/fi';

const STEPS = ['Patient Info', 'Department', 'Doctor & Time', 'Confirm'];

const AppointmentBooking = () => {
  const { t } = useTranslation();
  const { addAppointment } = useApp();
  const [step, setStep] = useState(0);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [bookingId, setBookingId] = useState('');
  const [errors, setErrors] = useState({});

  const [form, setForm] = useState({
    name: '', phone: '', email: '', dob: '', gender: '',
    departmentId: '', doctorId: '', date: '', time: '', reason: '',
  });

  const set = (key, val) => { setForm(f => ({ ...f, [key]: val })); setErrors(e => ({ ...e, [key]: '' })); };

  const selectedDept = departments.find(d => d.id === Number(form.departmentId));
  const doctorList = form.departmentId ? (doctors[form.departmentId] || []) : [];
  const selectedDoctor = doctorList.find(d => d.id === form.doctorId);

  const validateStep = () => {
    const e = {};
    if (step === 0) {
      if (!form.name.trim()) e.name = 'Name is required';
      if (!form.phone.match(/^[6-9]\d{9}$/)) e.phone = 'Valid 10-digit phone required';
      if (!form.gender) e.gender = 'Please select gender';
    }
    if (step === 1) { if (!form.departmentId) e.departmentId = 'Please select a department'; }
    if (step === 2) {
      if (!form.doctorId) e.doctorId = 'Please select a doctor';
      if (!form.date) e.date = 'Please select date';
      if (!form.time) e.time = 'Please select time';
    }
    setErrors(e);
    return Object.keys(e).length === 0;
  };

  const next = () => { if (validateStep()) setStep(s => s + 1); };
  const back = () => setStep(s => s - 1);

  const submit = () => {
    setLoading(true);
    const id = 'RRDCH-' + Math.floor(1000 + Math.random() * 9000);
    setTimeout(() => {
      const appt = {
        id, patientName: form.name, phone: form.phone, email: form.email,
        department: selectedDept?.name, doctor: selectedDoctor?.name,
        date: form.date, time: form.time, reason: form.reason, status: 'booked',
      };
      addAppointment(appt);
      setBookingId(id);
      setLoading(false);
      setSuccess(true);
      toast.success('Appointment booked successfully!');
    }, 1200);
  };

  const minDate = new Date().toISOString().split('T')[0];

  if (success) return (
    <div style={{ background: '#ffffff' }}>
      <section style={{ background: '#003580', padding: '3rem 2rem 2.5rem' }}>
        <div className="max-w-7xl mx-auto">
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#ffffff', letterSpacing: '-0.02em' }}>
            {t('appointment.title')}
          </h1>
        </div>
      </section>
      
      <div className="vs-section">
        <div className="max-w-2xl mx-auto">
          <motion.div initial={{ scale: 0.95, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
            className="vs-card" style={{ padding: '3rem', textAlign: 'center', background: '#fcfcfd' }}
          >
            <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#eaf5ee', color: '#276a27', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
              <FiCheck size={40} />
            </div>
            <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '1.75rem', color: '#1a3a3a', marginBottom: 12 }}>{t('appointment.success')}</h2>
            <p style={{ fontSize: 13.5, color: '#555e6b', lineHeight: 1.6, marginBottom: 24, padding: '0 20px', fontFamily: 'Inter, sans-serif' }}>
              {form.name}, your appointment with <strong>{selectedDoctor?.name}</strong> in <strong>{selectedDept?.name}</strong> is confirmed for <strong>{form.date}</strong> at <strong>{form.time}</strong>.
            </p>
            
            <div style={{ background: '#ffffff', borderRadius: 12, padding: '20px', border: '1px solid #eaecf0', marginBottom: 32 }}>
              <p style={{ fontSize: 11, color: '#888', textTransform: 'uppercase', letterSpacing: '0.05em', fontWeight: 600, marginBottom: 8 }}>{t('appointment.bookingId')}</p>
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center', gap: 12 }}>
                <span style={{ fontSize: '2.25rem', fontWeight: 900, color: '#003580', letterSpacing: '0.02em', fontFamily: 'Manrope, sans-serif' }}>{bookingId}</span>
                <button 
                  onClick={() => { navigator.clipboard.writeText(bookingId); toast.success('ID Copied!'); }}
                  style={{ background: '#f7f9fc', border: '1px solid #eaecf0', borderRadius: 8, padding: '8px', cursor: 'pointer', color: '#003580' }}
                ><FiCopy size={18} /></button>
              </div>
              <p style={{ fontSize: 11, color: '#aaa', marginTop: 10 }}>Save this ID to track your queue status later.</p>
            </div>

            <div style={{ display: 'flex', gap: 12, justifyContent: 'center' }}>
              <button 
                onClick={() => { setSuccess(false); setStep(0); setForm({ name:'',phone:'',email:'',dob:'',gender:'',departmentId:'',doctorId:'',date:'',time:'',reason:'' }); }}
                className="vs-btn vs-btn-primary"
              >Book Another</button>
              <button 
                onClick={() => window.location.href = '/patient/track'}
                className="vs-btn vs-btn-ghost"
              >Track Status</button>
            </div>
          </motion.div>
        </div>
      </div>
    </div>
  );

  return (
    <div style={{ background: '#ffffff' }}>
      <Toaster position="top-right" />
      
      {/* ── Page Hero ── */}
      <section style={{ background: '#003580', padding: '3rem 2rem 2.5rem' }}>
        <div className="max-w-7xl mx-auto">
          <nav className="vs-breadcrumb" style={{ marginBottom: 10 }}>
            <a href="/" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: 12 }}>Home</a>
            <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 6px', fontSize: 12 }}>/</span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Patients</span>
            <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 6px', fontSize: 12 }}>/</span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Book Appointment</span>
          </nav>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 10 }}>
            {t('appointment.title')}
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif', maxWidth: 560, lineHeight: 1.7 }}>
            Complete your clinical appointment booking in 4 professional steps.
          </p>
        </div>
      </section>

      <div className="vs-section">
        <div className="max-w-3xl mx-auto">
          
          {/* ── Stepper ── */}
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: 40, padding: '0 10px' }}>
            {STEPS.map((label, i) => (
              <React.Fragment key={i}>
                <div style={{ textAlign: 'center' }}>
                  <div style={{ 
                    width: 36, height: 36, borderRadius: '50%', margin: '0 auto 8px',
                    display: 'flex', alignItems: 'center', justifyContent: 'center',
                    fontSize: 13, fontWeight: 800, fontFamily: 'Manrope, sans-serif',
                    background: i < step ? '#009688' : i === step ? '#003580' : '#f2f4f7',
                    color: i <= step ? '#fff' : '#888',
                    boxShadow: i === step ? '0 0 0 4px #e6f0fb' : 'none',
                    transition: 'all 0.3s'
                  }}>
                    {i < step ? <FiCheck size={18} /> : i + 1}
                  </div>
                  <div style={{ fontSize: 11, fontWeight: 700, fontFamily: 'Inter, sans-serif', color: i === step ? '#1a1a2e' : '#888', textTransform: 'uppercase', letterSpacing: '0.02em' }}>{label}</div>
                </div>
                {i < STEPS.length - 1 && (
                  <div style={{ flex: 1, height: 2, background: i < step ? '#009688' : '#f2f4f7', margin: '0 12px 14px' }} />
                )}
              </React.Fragment>
            ))}
          </div>

          <div className="vs-card" style={{ padding: '2.5rem' }}>
            <AnimatePresence mode="wait">
              {/* Step 0 – Patient Info */}
              {step === 0 && (
                <motion.div key="s0" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div style={{ marginBottom: 24 }}>
                    <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 16, color: '#1a1a2e', marginBottom: 6 }}>{t('appointment.step1')}</h2>
                    <p style={{ fontSize: 12, color: '#888', fontFamily: 'Inter, sans-serif' }}>Please provide accurate patient registration details.</p>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                    <div className="vs-form-group">
                      <label className="vs-label">Full Name</label>
                      <input className="vs-input" placeholder="Enter patient name" value={form.name} onChange={e => set('name', e.target.value)} />
                      {errors.name && <div style={{ color: '#e8282b', fontSize: 11, marginTop: 4 }}>{errors.name}</div>}
                    </div>
                    <div className="vs-form-group">
                      <label className="vs-label">Mobile Number</label>
                      <input className="vs-input" placeholder="10-digit phone" value={form.phone} onChange={e => set('phone', e.target.value)} />
                      {errors.phone && <div style={{ color: '#e8282b', fontSize: 11, marginTop: 4 }}>{errors.phone}</div>}
                    </div>
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                    <div className="vs-form-group">
                      <label className="vs-label">Email (Optional)</label>
                      <input className="vs-input" type="email" placeholder="email@example.com" value={form.email} onChange={e => set('email', e.target.value)} />
                    </div>
                    <div className="vs-form-group">
                      <label className="vs-label">Date of Birth</label>
                      <input className="vs-input" type="date" value={form.dob} onChange={e => set('dob', e.target.value)} />
                    </div>
                  </div>
                  
                  <div className="vs-form-group">
                    <label className="vs-label">Gender</label>
                    <select className="vs-input" value={form.gender} onChange={e => set('gender', e.target.value)}>
                      <option value="">Select gender</option>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                      <option value="other">Other</option>
                    </select>
                    {errors.gender && <div style={{ color: '#e8282b', fontSize: 11, marginTop: 4 }}>{errors.gender}</div>}
                  </div>
                </motion.div>
              )}

              {/* Step 1 – Department */}
              {step === 1 && (
                <motion.div key="s1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div style={{ marginBottom: 24 }}>
                    <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 16, color: '#1a1a2e', marginBottom: 6 }}>{t('appointment.step2')}</h2>
                    <p style={{ fontSize: 12, color: '#888', fontFamily: 'Inter, sans-serif' }}>Select the specific clinical department for your visit.</p>
                  </div>
                  
                  {errors.departmentId && <p style={{ color: '#e8282b', fontSize: 12, marginBottom: 12 }}>{errors.departmentId}</p>}
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 12 }}>
                    {departments.map(d => (
                      <button 
                        key={d.id} 
                        onClick={() => set('departmentId', String(d.id))}
                        style={{ 
                          padding: '16px', borderRadius: 12, border: '2px solid', textAlign: 'left',
                          display: 'flex', alignItems: 'center', gap: 14, cursor: 'pointer', transition: 'all 0.2s',
                          background: form.departmentId === String(d.id) ? '#f0f4f8' : '#ffffff',
                          borderColor: form.departmentId === String(d.id) ? '#003580' : '#eaecf0'
                        }}
                      >
                        <div style={{ fontSize: '1.5rem', width: 44, height: 44, borderRadius: 8, background: '#f7f9fc', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{d.icon}</div>
                        <div style={{ flex: 1 }}>
                          <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a2e', fontFamily: 'Manrope, sans-serif' }}>{d.name}</div>
                          <div style={{ fontSize: 11, color: '#888', marginTop: 2 }}>{d.hod}</div>
                        </div>
                        {form.departmentId === String(d.id) && <FiCheck color="#003580" />}
                      </button>
                    ))}
                  </div>
                </motion.div>
              )}

              {/* Step 2 – Doctor */}
              {step === 2 && (
                <motion.div key="s2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div style={{ marginBottom: 24 }}>
                    <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 16, color: '#1a1a2e', marginBottom: 6 }}>{t('appointment.step3')}</h2>
                    <p style={{ fontSize: 12, color: '#888', fontFamily: 'Inter, sans-serif' }}>Choose your specialist and preferred time slot.</p>
                  </div>
                  
                  <div className="vs-form-group" style={{ marginBottom: 20 }}>
                    <label className="vs-label">Select Specialist</label>
                    <select className="vs-input" value={form.doctorId} onChange={e => set('doctorId', e.target.value)}>
                      <option value="">Choose a doctor...</option>
                      {doctorList.map(d => <option key={d.id} value={d.id}>{d.name} — {d.qualification}</option>)}
                    </select>
                    {errors.doctorId && <div style={{ color: '#e8282b', fontSize: 11, marginTop: 4 }}>{errors.doctorId}</div>}
                  </div>
                  
                  <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20, marginBottom: 20 }}>
                    <div className="vs-form-group">
                      <label className="vs-label">Appointment Date</label>
                      <input className="vs-input" type="date" min={minDate} value={form.date} onChange={e => set('date', e.target.value)} />
                      {errors.date && <div style={{ color: '#e8282b', fontSize: 11, marginTop: 4 }}>{errors.date}</div>}
                    </div>
                    <div className="vs-form-group">
                      <label className="vs-label">Time Slot</label>
                      <div style={{ display: 'flex', flexWrap: 'wrap', gap: 6 }}>
                        {(selectedDoctor?.slots || ['9:00 AM', '10:00 AM', '11:00 AM', '12:00 PM']).map(slot => (
                          <button 
                            key={slot} 
                            onClick={() => set('time', slot)}
                            style={{ 
                              padding: '6px 12px', borderRadius: 6, fontSize: 11, fontWeight: 700, cursor: 'pointer', transition: 'all 0.2s',
                              background: form.time === slot ? '#003580' : '#ffffff',
                              color: form.time === slot ? '#fff' : '#1a1a2e',
                              border: form.time === slot ? '1px solid #003580' : '1px solid #eaecf0'
                            }}
                          >{slot}</button>
                        ))}
                      </div>
                      {errors.time && <div style={{ color: '#e8282b', fontSize: 11, marginTop: 8 }}>{errors.time}</div>}
                    </div>
                  </div>
                  
                  <div className="vs-form-group">
                    <label className="vs-label">Reason for Visit</label>
                    <textarea className="vs-input" style={{ height: 80, resize: 'none' }} placeholder="Briefly describe your dental concern..." value={form.reason} onChange={e => set('reason', e.target.value)}></textarea>
                  </div>
                </motion.div>
              )}

              {/* Step 3 – Confirm */}
              {step === 3 && (
                <motion.div key="s3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }}>
                  <div style={{ marginBottom: 24 }}>
                    <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 16, color: '#1a1a2e', marginBottom: 6 }}>{t('appointment.step4')}</h2>
                    <p style={{ fontSize: 12, color: '#888', fontFamily: 'Inter, sans-serif' }}>Please verify your appointment summary before confirming.</p>
                  </div>
                  
                  <div style={{ background: '#f7f9fc', border: '1px solid #eaecf0', borderRadius: 12, padding: '20px' }}>
                    {[
                      { icon: FiUser, label: 'Patient Name', val: form.name },
                      { icon: FiGrid, label: 'Clinical Unit', val: selectedDept?.name },
                      { icon: FiUser, label: 'Consultant', val: selectedDoctor?.name },
                      { icon: FiCalendar, label: 'Scheduled Date', val: form.date },
                      { icon: FiClock, label: 'Arrival Time', val: form.time },
                    ].map((row, idx) => (
                      <div key={idx} style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', padding: '10px 0', borderBottom: idx < 4 ? '1px solid #eaecf0' : 'none' }}>
                        <div style={{ display: 'flex', alignItems: 'center', gap: 10, fontSize: 12, color: '#888', fontFamily: 'Inter, sans-serif' }}>
                          <row.icon size={14} /> {row.label}
                        </div>
                        <div style={{ fontSize: 13, fontWeight: 700, color: '#1a1a2e', fontFamily: 'Manrope, sans-serif' }}>{row.val}</div>
                      </div>
                    ))}
                  </div>
                  <p style={{ fontSize: 11, color: '#888', marginTop: 16, fontStyle: 'italic', lineHeight: 1.5 }}>
                    * By confirming, you agree to report to the registration desk 15 minutes prior to your time slot.
                  </p>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Pagination */}
            <div style={{ display: 'flex', justifyContent: 'space-between', marginTop: 32, paddingTop: 24, borderTop: '1px solid #f2f4f7' }}>
              <button 
                onClick={back} 
                disabled={step === 0} 
                className="vs-btn vs-btn-ghost" 
                style={{ height: 44, padding: '0 24px', visibility: step === 0 ? 'hidden' : 'visible' }}
              ><FiArrowLeft /> {t('common.back')}</button>
              
              {step < STEPS.length - 1 ? (
                <button onClick={next} className="vs-btn vs-btn-primary" style={{ height: 44, padding: '0 32px' }}>
                  {t('common.next')} <FiArrowRight />
                </button>
              ) : (
                <button onClick={submit} disabled={loading} className="vs-btn vs-btn-primary" style={{ height: 44, padding: '0 40px' }}>
                  {loading ? 'Processing...' : 'Confirm Appointment'}
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AppointmentBooking;

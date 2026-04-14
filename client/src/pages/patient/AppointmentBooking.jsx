import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import toast, { Toaster } from 'react-hot-toast';
import { useApp } from '../../context/AppContext';
import { departments, doctors } from '../../data/mockData';
import { Card, FormInput, FormTextarea, FormSelect, Button, PageHero } from '../../components/ui/UIComponents';
import { FiCheck, FiArrowRight, FiArrowLeft, FiCopy } from 'react-icons/fi';

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
    <div>
      <PageHero title={t('appointment.title')} breadcrumb="Home / Patients / Book Appointment"/>
      <div className="max-w-2xl mx-auto px-4 py-16">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-br from-green-50 to-teal-50 border border-green-200 rounded-2xl p-10 text-center"
        >
          <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center mx-auto mb-6">
            <FiCheck size={40} className="text-white"/>
          </div>
          <h2 className="text-3xl font-bold text-green-800 mb-2">{t('appointment.success')}</h2>
          <p className="text-green-700 mb-6">{form.name}, your appointment with <strong>{selectedDoctor?.name}</strong> in <strong>{selectedDept?.name}</strong> is confirmed for <strong>{form.date}</strong> at <strong>{form.time}</strong>.</p>
          <div className="bg-white rounded-xl p-5 border border-green-200 mb-6">
            <p className="text-sm text-gray-500 mb-1">{t('appointment.bookingId')}</p>
            <div className="flex items-center justify-center gap-3">
              <span className="text-3xl font-black text-rrdch-blue">{bookingId}</span>
              <button onClick={() => { navigator.clipboard.writeText(bookingId); toast('Copied!'); }}
                className="p-2 rounded-lg hover:bg-gray-100 text-gray-500" aria-label="Copy booking ID"
              ><FiCopy/></button>
            </div>
            <p className="text-xs text-gray-400 mt-2">Save this ID to track your appointment status</p>
          </div>
          <div className="flex flex-wrap gap-3 justify-center">
            <Button onClick={() => { setSuccess(false); setStep(0); setForm({ name:'',phone:'',email:'',dob:'',gender:'',departmentId:'',doctorId:'',date:'',time:'',reason:'' }); }}>Book Another</Button>
            <Button variant="outline" onClick={() => window.location.href = '/patient/track'}>Track Appointment</Button>
          </div>
        </motion.div>
      </div>
    </div>
  );

  return (
    <div>
      <Toaster position="top-right"/>
      <PageHero title={t('appointment.title')} subtitle="Complete your appointment booking in 4 simple steps." breadcrumb="Home / Patients / Book Appointment"/>

      <div className="max-w-3xl mx-auto px-4 py-12">
        {/* Stepper */}
        <div className="flex items-center justify-between mb-10">
          {STEPS.map((label, i) => (
            <React.Fragment key={i}>
              <div className="flex flex-col items-center">
                <div className={`w-10 h-10 rounded-full flex items-center justify-center font-bold text-sm transition-all ${i < step ? 'bg-rrdch-teal text-white' : i === step ? 'bg-rrdch-blue text-white shadow-lg scale-110' : 'bg-gray-200 text-gray-500'}`}>
                  {i < step ? <FiCheck/> : i + 1}
                </div>
                <span className={`text-xs mt-1 hidden sm:block ${i === step ? 'text-rrdch-blue font-semibold' : 'text-gray-400'}`}>{label}</span>
              </div>
              {i < STEPS.length - 1 && <div className={`flex-1 h-0.5 mx-2 transition-all ${i < step ? 'bg-rrdch-teal' : 'bg-gray-200'}`}></div>}
            </React.Fragment>
          ))}
        </div>

        <Card className="p-8">
          <AnimatePresence mode="wait">
            {/* Step 0 – Patient Info */}
            {step === 0 && (
              <motion.div key="s0" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-5">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{t('appointment.step1')}</h2>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormInput id="ap-name" label={t('appointment.name')} required placeholder="Full name" value={form.name} onChange={e => set('name', e.target.value)} error={errors.name}/>
                  <FormInput id="ap-phone" label={t('appointment.phone')} required placeholder="10-digit number" value={form.phone} onChange={e => set('phone', e.target.value)} error={errors.phone}/>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormInput id="ap-email" label={t('appointment.email')} type="email" placeholder="Optional" value={form.email} onChange={e => set('email', e.target.value)}/>
                  <FormInput id="ap-dob" label={t('appointment.dob')} type="date" value={form.dob} onChange={e => set('dob', e.target.value)}/>
                </div>
                <FormSelect id="ap-gender" label={t('appointment.gender')} required value={form.gender} onChange={e => set('gender', e.target.value)} error={errors.gender}>
                  <option value="">Select gender</option>
                  <option value="male">Male</option>
                  <option value="female">Female</option>
                  <option value="other">Other</option>
                </FormSelect>
              </motion.div>
            )}

            {/* Step 1 – Department */}
            {step === 1 && (
              <motion.div key="s1" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <h2 className="text-xl font-bold text-gray-900 mb-6">{t('appointment.step2')}</h2>
                {errors.departmentId && <p className="text-red-500 text-sm mb-4">{errors.departmentId}</p>}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  {departments.map(d => (
                    <motion.button key={d.id} whileHover={{ scale: 1.02 }} onClick={() => set('departmentId', String(d.id))}
                      className={`p-4 rounded-xl border-2 text-left transition-all flex items-center gap-3 ${form.departmentId === String(d.id) ? 'border-rrdch-blue bg-blue-50' : 'border-gray-200 hover:border-gray-300'}`}
                      aria-pressed={form.departmentId === String(d.id)}
                    >
                      <span className="text-3xl">{d.icon}</span>
                      <div>
                        <p className="font-semibold text-sm text-gray-900">{d.name}</p>
                        <p className="text-xs text-gray-500">HOD: {d.hod}</p>
                      </div>
                      {form.departmentId === String(d.id) && <FiCheck className="ml-auto text-rrdch-blue"/>}
                    </motion.button>
                  ))}
                </div>
              </motion.div>
            )}

            {/* Step 2 – Doctor & Time */}
            {step === 2 && (
              <motion.div key="s2" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }} className="space-y-5">
                <h2 className="text-xl font-bold text-gray-900 mb-4">{t('appointment.step3')}</h2>
                <FormSelect id="ap-doctor" label={t('appointment.doctor')} required value={form.doctorId} onChange={e => set('doctorId', e.target.value)} error={errors.doctorId}>
                  <option value="">Select a doctor</option>
                  {doctorList.map(d => <option key={d.id} value={d.id}>{d.name} — {d.qualification}</option>)}
                </FormSelect>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                  <FormInput id="ap-date" label={t('appointment.date')} required type="date" min={minDate} value={form.date} onChange={e => set('date', e.target.value)} error={errors.date}/>
                  <div>
                    <label className="text-sm font-medium text-gray-700 block mb-1">{t('appointment.time')} <span className="text-red-500">*</span></label>
                    {errors.time && <p className="text-xs text-red-500 mb-1">{errors.time}</p>}
                    <div className="flex flex-wrap gap-2">
                      {(selectedDoctor?.slots || doctorList[0]?.slots || ['9:00 AM', '10:00 AM', '11:00 AM']).map(slot => (
                        <button key={slot} onClick={() => set('time', slot)} aria-pressed={form.time === slot}
                          className={`px-3 py-1.5 rounded-lg text-sm border-2 transition-all ${form.time === slot ? 'border-rrdch-blue bg-blue-50 text-rrdch-blue font-semibold' : 'border-gray-200 hover:border-gray-300 text-gray-700'}`}
                        >{slot}</button>
                      ))}
                    </div>
                  </div>
                </div>
                <FormTextarea id="ap-reason" label={t('appointment.reason')} placeholder="Briefly describe your concern..." value={form.reason} onChange={e => set('reason', e.target.value)}/>
              </motion.div>
            )}

            {/* Step 3 – Confirm */}
            {step === 3 && (
              <motion.div key="s3" initial={{ opacity: 0, x: 30 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -30 }}>
                <h2 className="text-xl font-bold text-gray-900 mb-6">{t('appointment.step4')}</h2>
                <div className="bg-blue-50 rounded-xl p-6 space-y-3">
                  {[
                    ['Patient', form.name], ['Phone', form.phone], ['Gender', form.gender],
                    ['Department', selectedDept?.name], ['Doctor', selectedDoctor?.name],
                    ['Date', form.date], ['Time', form.time], ['Reason', form.reason || 'N/A'],
                  ].map(([k, v]) => (
                    <div key={k} className="flex justify-between border-b border-blue-100 pb-2">
                      <span className="text-gray-600 text-sm">{k}</span>
                      <span className="font-semibold text-gray-900 text-sm text-right">{v}</span>
                    </div>
                  ))}
                </div>
                <p className="text-xs text-gray-500 mt-4">By confirming, you agree to arrive 10 minutes before your scheduled time. Please carry a valid government ID.</p>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Navigation */}
          <div className="flex justify-between mt-8 pt-6 border-t border-gray-100">
            <Button variant="ghost" onClick={back} disabled={step === 0} className={step === 0 ? 'invisible' : ''}>
              <FiArrowLeft/> {t('common.back')}
            </Button>
            {step < STEPS.length - 1 ? (
              <Button onClick={next}>{t('common.next')} <FiArrowRight/></Button>
            ) : (
              <Button onClick={submit} disabled={loading} className="min-w-36 justify-center">
                {loading ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/> Booking...</> : <>{t('appointment.submit')} <FiCheck/></>}
              </Button>
            )}
          </div>
        </Card>
      </div>
    </div>
  );
};

export default AppointmentBooking;

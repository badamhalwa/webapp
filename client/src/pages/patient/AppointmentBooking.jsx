import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { FiUser, FiActivity, FiCalendar, FiCheckCircle, FiChevronRight, FiChevronLeft, FiClock, FiPhone, FiCopy, FiCheck } from 'react-icons/fi';
import { departments } from '../../data/mockData';

const AppointmentBooking = () => {
  const { t, i18n } = useTranslation();
  const navigate = useNavigate();
  const lang = i18n.language;
  const [step, setStep] = useState(1);
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [copied, setCopied] = useState(false);
  const [bookingId, setBookingId] = useState('');
  
  const [formData, setFormData] = useState({
    name: '', phone: '', email: '', dob: '', gender: '',
    departmentId: '', doctorId: '', date: '', timeSlot: '', reason: ''
  });

  const [errors, setErrors] = useState({});

  const nextStep = () => {
    // Basic validation per step
    if (step === 1) {
      if (!formData.name || !formData.phone || !formData.gender) {
        setErrors({
          name: !formData.name,
          phone: !formData.phone,
          gender: !formData.gender
        });
        return;
      }
    }
    if (step === 2) {
      if (!formData.departmentId) {
        setErrors({ departmentId: true });
        return;
      }
    }
    if (step === 3) {
      if (!formData.date || !formData.timeSlot) {
        setErrors({ date: !formData.date, timeSlot: !formData.timeSlot });
        return;
      }
    }
    
    setErrors({});
    setStep(s => s + 1);
    window.scrollTo(0, 0);
  };

  const prevStep = () => setStep(s => s - 1);

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Mock API call
    setTimeout(() => {
      setLoading(false);
      setBookingId('RRDCH-' + Math.floor(Math.random() * 90000 + 10000));
      setSuccess(true);
    }, 2000);
  };

  const copyId = () => {
    navigator.clipboard.writeText(bookingId);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const renderStepIndicator = () => (
    <div className="flex justify-between items-center mb-10 max-w-md mx-auto relative">
      <div className="absolute top-1/2 left-0 w-full h-0.5 bg-gray-100 -translate-y-1/2 z-0" />
      <div className="absolute top-1/2 left-0 h-0.5 bg-rrdch-blue -translate-y-1/2 z-0 transition-all duration-300" style={{ width: `${((step-1)/3)*100}%` }} />
      {[1, 2, 3, 4].map((s) => (
        <div key={s} className="relative z-10 flex flex-col items-center">
          <div className={`w-8 h-8 rounded-full flex items-center justify-center text-xs font-bold transition-all duration-300 ${
            step === s ? 'bg-rrdch-blue text-white ring-4 ring-blue-50' : 
            step > s ? 'bg-green-500 text-white' : 'bg-white text-gray-400 border-2 border-gray-100'
          }`}>
            {step > s ? <FiCheck size={14} /> : s}
          </div>
        </div>
      ))}
    </div>
  );

  if (success) {
    return (
      <div style={{ background: '#ffffff', minHeight: '90vh' }}>
        <section style={{ background: '#003580', padding: '3rem 2rem 2.5rem' }}>
          <div className="max-w-7xl mx-auto text-center">
            <h1 className="text-3xl font-bold text-white mb-2">{t('appointment.success')}</h1>
          </div>
        </section>
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} className="vs-card p-10">
            <div className="w-20 h-20 bg-green-50 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
              <FiCheckCircle size={48} />
            </div>
            <h2 className="text-2xl font-bold text-gray-900 mb-2">{t('appointment.success')}</h2>
            <p className="text-gray-500 mb-8">{t('appointment.bookingIdSub')}</p>
            
            <div className="bg-gray-50 p-6 rounded-2xl mb-8 flex flex-col items-center">
               <div className="text-xs font-bold text-gray-400 uppercase mb-2">{t('appointment.bookingId')}</div>
               <div className="flex items-center gap-4">
                  <span className="text-2xl font-black text-rrdch-blue tracking-wider">{bookingId}</span>
                  <button onClick={copyId} className="p-2 text-gray-400 hover:text-rrdch-blue transition-colors relative">
                    {copied ? <FiCheck size={18} className="text-green-500" /> : <FiCopy size={18} />}
                    {copied && <span className="absolute -top-8 left-1/2 -translate-x-1/2 bg-gray-900 text-white text-[10px] px-2 py-1 rounded">{t('appointment.idCopied')}</span>}
                  </button>
               </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <button 
                onClick={() => { setSuccess(false); setStep(1); setFormData({name:'', phone:'', email:'', dob:'', gender:'', departmentId:'', doctorId:'', date:'', timeSlot:'', reason:''}); setBookingId(''); }}
                className="vs-btn vs-btn-outline justify-center"
              >
                {t('appointment.bookAnother')}
              </button>
              <button 
                onClick={() => navigate('/patient/track', { state: { bookingId } })}
                className="vs-btn vs-btn-primary justify-center"
              >
                {t('appointment.trackStatus')}
              </button>
            </div>
          </motion.div>
        </div>
      </div>
    );
  }

  return (
    <div style={{ background: '#ffffff', minHeight: '90vh' }}>
      
      {/* ── Page Hero ── */}
      <section style={{ background: '#003580', padding: '3rem 2rem 2.5rem' }}>
        <div className="max-w-7xl mx-auto">
          <nav className="vs-breadcrumb" style={{ marginBottom: 10 }}>
            <a href="/" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: 12 }}>{t('nav.home')}</a>
            <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 6px', fontSize: 12 }}>/</span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{t('nav.bookAppointment')}</span>
          </nav>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 10 }}>
            {t('appointment.title')}
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif', maxWidth: 560, lineHeight: 1.7 }}>
            {t('appointment.subtitle')}
          </p>
        </div>
      </section>

      <div className="max-w-4xl mx-auto px-4 py-12">
        {renderStepIndicator()}

        <AnimatePresence mode="wait">
          {/* Step 1: Patient Details */}
          {step === 1 && (
            <motion.div key="step1" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="vs-card p-8">
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-1">{t('appointment.step1')}</h2>
                <p className="text-sm text-gray-500">{t('appointment.step1Sub')}</p>
              </div>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                  <label className="vs-label-light">{t('appointment.name')}</label>
                  <input className={`vs-input ${errors.name ? 'border-red-300' : ''}`} value={formData.name} onChange={e=>setFormData({...formData, name: e.target.value})} placeholder={t('appointment.namePlaceholder')} />
                  {errors.name && <p className="text-[10px] text-red-500 mt-1">{t('appointment.errors.name')}</p>}
                </div>
                <div>
                  <label className="vs-label-light">{t('appointment.phone')}</label>
                  <div className="relative">
                     <FiPhone className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={14} />
                     <input className={`vs-input pl-10 ${errors.phone ? 'border-red-300' : ''}`} value={formData.phone} onChange={e=>setFormData({...formData, phone: e.target.value})} placeholder={t('appointment.phonePlaceholder')} />
                  </div>
                  {errors.phone && <p className="text-[10px] text-red-500 mt-1">{t('appointment.errors.phone')}</p>}
                </div>
                <div>
                  <label className="vs-label-light">{t('appointment.gender')}</label>
                  <select className={`vs-input ${errors.gender ? 'border-red-300' : ''}`} value={formData.gender} onChange={e=>setFormData({...formData, gender: e.target.value})}>
                     <option value="">{t('appointment.selectGender')}</option>
                     <option value="male">{t('appointment.male')}</option>
                     <option value="female">{t('appointment.female')}</option>
                     <option value="other">{t('appointment.other')}</option>
                  </select>
                </div>
                <div>
                  <label className="vs-label-light">{t('appointment.dob')}</label>
                  <input type="date" className="vs-input" value={formData.dob} onChange={e=>setFormData({...formData, dob: e.target.value})} />
                </div>
              </div>
              <div className="mt-10 flex justify-end">
                <button onClick={nextStep} className="vs-btn vs-btn-primary px-8">{t('common.next')} <FiChevronRight /></button>
              </div>
            </motion.div>
          )}

          {/* Step 2: Department Selection */}
          {step === 2 && (
            <motion.div key="step2" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="vs-card p-8">
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-1">{t('appointment.step2')}</h2>
                <p className="text-sm text-gray-500">{t('appointment.step2Sub')}</p>
              </div>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                 {departments.map((dept) => (
                    <button
                      key={dept.id}
                      onClick={() => setFormData({...formData, departmentId: dept.id})}
                      className={`p-4 rounded-2xl border text-left transition-all ${
                        formData.departmentId === dept.id ? 'bg-blue-50 border-rrdch-blue ring-1 ring-rrdch-blue shadow-md' : 'bg-white border-gray-100 hover:border-rrdch-blue/30'
                      }`}
                    >
                       <div className="flex items-center gap-3">
                          <div className={`w-10 h-10 rounded-lg flex items-center justify-center ${formData.departmentId === dept.id ? 'bg-rrdch-blue text-white' : 'bg-blue-50 text-rrdch-blue'}`}>
                             <FiActivity size={18} />
                          </div>
                          <div>
                             <div className="text-sm font-bold text-gray-900">{t(`depts.d${dept.id}`)}</div>
                             <div className="text-[10px] text-gray-400 uppercase font-black">{lang === 'kn' ? 'ತಜ್ಞ ವಿಭಾಗ' : 'Specialist Unit'}</div>
                          </div>
                       </div>
                    </button>
                 ))}
              </div>
              {errors.departmentId && <p className="text-xs text-red-500 mt-4 text-center">{t('appointment.errors.dept')}</p>}
              <div className="mt-10 flex justify-between">
                <button onClick={prevStep} className="vs-btn vs-btn-outline"><FiChevronLeft /> {t('common.back')}</button>
                <button onClick={nextStep} className="vs-btn vs-btn-primary px-8">{t('common.next')} <FiChevronRight /></button>
              </div>
            </motion.div>
          )}

          {/* Step 3: Date & Doctor */}
          {step === 3 && (
            <motion.div key="step3" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="vs-card p-8">
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-1">{t('appointment.step3')}</h2>
                <p className="text-sm text-gray-500">{t('appointment.step3Sub')}</p>
              </div>
              <div className="space-y-8">
                 <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div>
                       <label className="vs-label-light">{t('appointment.apptDate')}</label>
                       <input type="date" className={`vs-input ${errors.date ? 'border-red-300' : ''}`} value={formData.date} onChange={e=>setFormData({...formData, date: e.target.value})} />
                    </div>
                    <div>
                       <label className="vs-label-light">{t('appointment.selectSpecialist')}</label>
                       <select className="vs-input" value={formData.doctorId} onChange={e=>setFormData({...formData, doctorId: e.target.value})}>
                          <option value="">{t('appointment.chooseDoctor')}</option>
                          <option value="1">Dr. Girish H.C.</option>
                          <option value="2">Dr. Madhumati M.</option>
                          <option value="3">Dr. Rajiv S.</option>
                       </select>
                    </div>
                 </div>

                 <div>
                    <label className="vs-label-light">{t('appointment.timeSlot')}</label>
                    <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                       {['09:00 AM', '10:00 AM', '11:00 AM', '12:00 PM', '02:00 PM', '03:00 PM', '04:00 PM'].map((slot) => (
                          <button
                            key={slot}
                            type="button"
                            onClick={() => setFormData({...formData, timeSlot: slot})}
                            className={`py-3 rounded-xl text-xs font-bold border transition-all ${
                              formData.timeSlot === slot ? 'bg-rrdch-blue border-rrdch-blue text-white shadow-lg' : 'bg-white border-gray-100 text-gray-500 hover:border-rrdch-blue/30'
                            }`}
                          >
                             {slot}
                          </button>
                       ))}
                    </div>
                 </div>
              </div>
              <div className="mt-10 flex justify-between">
                <button onClick={prevStep} className="vs-btn vs-btn-outline"><FiChevronLeft /> {t('common.back')}</button>
                <button onClick={nextStep} className="vs-btn vs-btn-primary px-8">{t('common.next')} <FiChevronRight /></button>
              </div>
            </motion.div>
          )}

          {/* Step 4: Summary & Confirm */}
          {step === 4 && (
            <motion.div key="step4" initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, x: -20 }} className="vs-card p-8">
              <div className="mb-8">
                <h2 className="text-xl font-bold text-gray-900 mb-1">{t('appointment.step4')}</h2>
                <p className="text-sm text-gray-500">{t('appointment.step4Sub')}</p>
              </div>
              
              <div className="bg-gray-50 rounded-2xl p-6 mb-10">
                 <div className="grid grid-cols-1 sm:grid-cols-2 gap-y-6 gap-x-12">
                    <div>
                       <div className="text-[10px] text-gray-400 font-black uppercase mb-1">{t('appointment.name')}</div>
                       <div className="text-sm font-bold text-gray-900">{formData.name}</div>
                    </div>
                    <div>
                       <div className="text-[10px] text-gray-400 font-black uppercase mb-1">{t('appointment.clinicalUnit')}</div>
                       <div className="text-sm font-bold text-gray-900">{t(`depts.d${formData.departmentId}`)}</div>
                    </div>
                    <div>
                       <div className="text-[10px] text-gray-400 font-black uppercase mb-1">{t('appointment.scheduledDate')}</div>
                       <div className="text-sm font-bold text-gray-900 flex items-center gap-2"><FiCalendar size={14}/> {formData.date}</div>
                    </div>
                    <div>
                       <div className="text-[10px] text-gray-400 font-black uppercase mb-1">{t('appointment.arrivalTime')}</div>
                       <div className="text-sm font-bold text-gray-900 flex items-center gap-2"><FiClock size={14}/> {formData.timeSlot}</div>
                    </div>
                 </div>
              </div>

              <div className="mb-10 text-center">
                 <p className="text-xs text-gray-400 italic">{t('appointment.confirmNotice')}</p>
              </div>

              <div className="flex justify-between">
                <button onClick={prevStep} className="vs-btn vs-btn-outline"><FiChevronLeft /> {t('common.back')}</button>
                <button onClick={handleSubmit} disabled={loading} className="vs-btn vs-btn-red px-10 shadow-lg shadow-red-100">
                   {loading ? t('common.loading') : t('appointment.confirmBtn')}
                </button>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
};

export default AppointmentBooking;

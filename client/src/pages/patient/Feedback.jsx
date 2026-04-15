import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import toast, { Toaster } from 'react-hot-toast';
import { useApp } from '../../context/AppContext';
import { FiStar, FiCheckCircle, FiMessageSquare } from 'react-icons/fi';
import { departments } from '../../data/mockData';

const Feedback = () => {
  const { t } = useTranslation();
  const { addFeedback } = useApp();
  const [form, setForm] = useState({ name: '', department: '', rating: 0, comment: '' });
  const [hoverRating, setHoverRating] = useState(0);
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.rating) e.rating = 'Please select a rating';
    if (!form.comment.trim() || form.comment.length < 10) e.comment = 'Please provide at least 10 characters';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setLoading(true);
    setTimeout(() => {
      addFeedback({ ...form, date: new Date().toISOString() });
      setLoading(false);
      setSubmitted(true);
      toast.success(t('feedback.success'));
    }, 800);
  };

  const ratingLabels = ['', 'Poor', 'Fair', 'Good', 'Very Good', 'Excellent'];

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
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Patient Feedback</span>
          </nav>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 10 }}>
            Experience Feedback
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif', maxWidth: 560, lineHeight: 1.7 }}>
            Your insights help us maintain the highest standards of clinical excellence and patient care.
          </p>
        </div>
      </section>

      <div className="vs-section">
        <div className="max-w-2xl mx-auto">
          
          <div className="vs-card" style={{ padding: '3rem' }}>
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#eaf5ee', color: '#276a27', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}>
                  <FiCheckCircle size={32} />
                </div>
                <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '1.5rem', color: '#1a1a2e', marginBottom: 12 }}>Feedback Recorded</h3>
                <p style={{ fontSize: 14, color: '#555e6b', lineHeight: 1.6, marginBottom: 24, fontFamily: 'Inter, sans-serif' }}>
                  Thank you for sharing your {ratingLabels[form.rating]} experience. Your input has been forwarded to our quality assurance team.
                </p>
                <div style={{ display: 'flex', justifyContent: 'center', gap: 8, marginBottom: 32 }}>
                  {[...Array(5)].map((_, i) => (
                    <FiStar key={i} size={28} style={{ color: i < form.rating ? '#f59e0b' : '#eaecf0', fill: i < form.rating ? '#f59e0b' : 'none' }} />
                  ))}
                </div>
                <button onClick={() => { setSubmitted(false); setForm({ name: '', department: '', rating: 0, comment: '' }); }} className="vs-btn vs-btn-primary">
                  Submit New Feedback
                </button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 24 }}>
                <div className="vs-form-group">
                   <label className="vs-label">Full Name</label>
                   <input className="vs-input" placeholder="Your name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                   {errors.name && <div style={{ color: '#e8282b', fontSize: 11, marginTop: 4 }}>{errors.name}</div>}
                </div>

                <div className="vs-form-group">
                   <label className="vs-label">Department Visited</label>
                   <select className="vs-input" value={form.department} onChange={e => setForm({...form, department: e.target.value})}>
                     <option value="">Select clinical unit (optional)</option>
                     {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
                   </select>
                </div>

                <div className="vs-form-group">
                   <label className="vs-label">Rating of Service</label>
                   <div style={{ display: 'flex', gap: 8, marginTop: 4 }}>
                      {[1, 2, 3, 4, 5].map(star => (
                        <button 
                          key={star} 
                          type="button"
                          onMouseEnter={() => setHoverRating(star)}
                          onMouseLeave={() => setHoverRating(0)}
                          onClick={() => { setForm({...form, rating: star}); setErrors(e => ({...e, rating: ''})); }}
                          style={{ background: 'none', border: 'none', cursor: 'pointer', outline: 'none', padding: 0 }}
                        >
                          <FiStar 
                            size={32} 
                            style={{ 
                              color: star <= (hoverRating || form.rating) ? '#f59e0b' : '#eaecf0', 
                              fill: star <= (hoverRating || form.rating) ? '#f59e0b' : 'none',
                              transition: 'all 0.2s'
                            }} 
                          />
                        </button>
                      ))}
                      <div style={{ fontSize: 12, fontWeight: 700, color: '#f59e0b', marginLeft: 10, display: 'flex', alignItems: 'center', fontFamily: 'Manrope, sans-serif' }}>
                        {ratingLabels[hoverRating || form.rating]}
                      </div>
                   </div>
                   {errors.rating && <div style={{ color: '#e8282b', fontSize: 11, marginTop: 4 }}>{errors.rating}</div>}
                </div>

                <div className="vs-form-group">
                   <label className="vs-label">Your Experience</label>
                   <textarea 
                     className="vs-input" 
                     style={{ height: 120, resize: 'none' }} 
                     placeholder="Please provide details about your visit, wait times, staff behavior, etc..."
                     value={form.comment}
                     onChange={e => setForm({...form, comment: e.target.value})}
                   />
                   {errors.comment && <div style={{ color: '#e8282b', fontSize: 11, marginTop: 4 }}>{errors.comment}</div>}
                </div>

                <button type="submit" disabled={loading} className="vs-btn vs-btn-primary" style={{ height: 50, fontSize: 14 }}>
                  {loading ? 'Submitting...' : <><FiMessageSquare /> Dispatch Feedback</>}
                </button>
              </form>
            )}
          </div>
          
          <div style={{ marginTop: 32, textAlign: 'center' }}>
             <p style={{ fontSize: 12, color: '#888', fontStyle: 'italic', fontFamily: 'Inter, sans-serif' }}>
                * All feedback is reviewed confidentially by our medical superintendent.
             </p>
          </div>

        </div>
      </div>

    </div>
  );
};

export default Feedback;

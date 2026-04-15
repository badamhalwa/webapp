import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { FiCheckCircle, FiInfo, FiLayers, FiFileText, FiCreditCard, FiArrowRight } from 'react-icons/fi';

const courses = [
  { name: 'BDS', duration: '5 Years', seats: 100, fee: '₹3.5 L/yr', eligibility: '10+2 with PCB, NEET qualified' },
  { name: 'MDS — Orthodontics', duration: '3 Years', seats: 6, fee: '₹5 L/yr', eligibility: 'BDS with NEET-PG' },
  { name: 'MDS — Oral Surgery', duration: '3 Years', seats: 6, fee: '₹5 L/yr', eligibility: 'BDS with NEET-PG' },
  { name: 'MDS — Conservative Dentistry', duration: '3 Years', seats: 6, fee: '₹5 L/yr', eligibility: 'BDS with NEET-PG' },
  { name: 'MDS — Periodontics', duration: '3 Years', seats: 6, fee: '₹5 L/yr', eligibility: 'BDS with NEET-PG' },
  { name: 'MDS — Prosthodontics', duration: '3 Years', seats: 6, fee: '₹5 L/yr', eligibility: 'BDS with NEET-PG' },
];

const steps = [
  { Icon: FiFileText, title: 'Register Online', desc: 'Fill the admission inquiry form and create your applicant profile.' },
  { Icon: FiCheckCircle, title: 'Document Verification', desc: 'Upload required documents for verification by our admissions team.' },
  { Icon: FiLayers, title: 'Counselling', desc: 'Attend in-person or virtual counselling session with our admissions officer.' },
  { Icon: FiCreditCard, title: 'Fee Payment', desc: 'Complete fee payment to confirm your seat.' },
];

const Admissions = () => {
  const [form, setForm] = useState({ name: '', email: '', phone: '', course: '', message: '' });
  const [errors, setErrors] = useState({});
  const [submitted, setSubmitted] = useState(false);

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = 'Name is required';
    if (!form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) e.email = 'Valid email required';
    if (!form.phone.match(/^[6-9]\d{9}$/)) e.phone = 'Valid 10-digit phone required';
    if (!form.course) e.course = 'Please select a course';
    return e;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) { setErrors(errs); return; }
    setErrors({});
    setTimeout(() => {
      setSubmitted(true);
      toast.success('Inquiry submitted!');
    }, 800);
  };

  return (
    <div style={{ background: '#ffffff' }}>
      <Toaster position="top-right" />

      {/* ── Page Hero ── */}
      <section style={{ background: '#003580', padding: '3rem 2rem 2.5rem' }}>
        <div className="max-w-7xl mx-auto">
          <nav style={{ marginBottom: 10 }}>
            <a href="/" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: 12 }}>Home</a>
            <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 6px', fontSize: 12 }}>/</span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>Admissions</span>
          </nav>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 10 }}>
            Admissions 2026–27
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif', maxWidth: 560, lineHeight: 1.7 }}>
            Begin your journey towards a rewarding career in dentistry at RRDCH — where excellence meets opportunity.
          </p>
        </div>
      </section>

      {/* ── Programs Table ── */}
      <div className="vs-section">
        <div className="max-w-7xl mx-auto">
          <div className="vs-section-header">
            <div>
              <div className="vs-section-title">Programs Offered</div>
              <div className="vs-section-sub">Undergraduate and Postgraduate Dental Programs</div>
            </div>
          </div>

          <div className="vs-card" style={{ overflow: 'hidden' }}>
            <table style={{ width: '100%', borderCollapse: 'collapse' }}>
              <thead>
                <tr style={{ background: '#003580' }}>
                  {['Program', 'Duration', 'Intake', 'Annual Fee', 'Eligibility'].map(h => (
                    <th key={h} style={{ padding: '14px 20px', textAlign: 'left', fontSize: 11, color: '#fff', textTransform: 'uppercase', letterSpacing: '0.05em', fontFamily: 'Inter, sans-serif' }}>{h}</th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {courses.map((c, i) => (
                  <tr key={i} style={{ borderBottom: '1px solid #f2f4f7', background: i % 2 !== 0 ? '#fcfcfd' : '#fff' }}>
                    <td style={{ padding: '14px 20px', fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 13.5, color: '#1a1a2e' }}>{c.name}</td>
                    <td style={{ padding: '14px 20px', fontSize: 13, color: '#555e6b', fontFamily: 'Inter, sans-serif' }}>{c.duration}</td>
                    <td style={{ padding: '14px 20px', fontSize: 13, color: '#555e6b', fontFamily: 'Inter, sans-serif' }}>{c.seats} seats</td>
                    <td style={{ padding: '14px 20px', fontSize: 13, fontWeight: 600, color: '#276a27', fontFamily: 'Manrope, sans-serif' }}>{c.fee}</td>
                    <td style={{ padding: '14px 20px', fontSize: 12, color: '#888', fontFamily: 'Inter, sans-serif', maxWidth: 300, lineHeight: 1.5 }}>{c.eligibility}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>

      {/* ── Admission Steps ── */}
      <div className="vs-section-alt">
        <div className="max-w-7xl mx-auto">
          <div className="vs-section-header">
            <div>
              <div className="vs-section-title">How to Apply</div>
              <div className="vs-section-sub">A step-by-step guide to our admissions process</div>
            </div>
          </div>
          <div className="vs-grid-4">
            {steps.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 16 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <div className="vs-card" style={{ padding: '1.75rem', textAlign: 'center', height: '100%', position: 'relative' }}>
                  <div style={{ position: 'absolute', top: 12, left: 12, width: 20, height: 20, borderRadius: '50%', background: '#003580', color: '#fff', fontSize: 10, fontWeight: 800, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{i + 1}</div>
                  <div style={{ width: 48, height: 48, borderRadius: 10, background: '#e6f0fb', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 16px' }}>
                    <s.Icon size={22} color="#003580" />
                  </div>
                  <div style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 700, fontSize: 14, color: '#1a1a2e', marginBottom: 8 }}>{s.title}</div>
                  <p style={{ fontSize: 12, color: '#6b7280', lineHeight: 1.7, fontFamily: 'Inter, sans-serif' }}>{s.desc}</p>
                </div>
              </motion.div>
            ))}
          </div>
        </div>
      </div>

      {/* ── Inquiry Form ── */}
      <div className="vs-section">
        <div className="max-w-4xl mx-auto">
          <div className="vs-section-header" style={{ textAlign: 'center', justifyContent: 'center', flexDirection: 'column' }}>
            <div className="vs-section-title">Admission Inquiry</div>
            <div className="vs-section-sub">Fill in your details and our admissions counsellor will get back to you</div>
          </div>

          <div className="vs-card" style={{ padding: '3rem', maxWidth: 640, margin: '0 auto' }}>
            {submitted ? (
              <motion.div initial={{ opacity: 0, scale: 0.95 }} animate={{ opacity: 1, scale: 1 }} style={{ textAlign: 'center' }}>
                <div style={{ width: 64, height: 64, borderRadius: '50%', background: '#eaf5ee', color: '#276a27', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 20px' }}><FiCheckCircle size={32} /></div>
                <h3 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '1.25rem', color: '#1a1a2e', marginBottom: 12 }}>Inquiry Received!</h3>
                <p style={{ fontSize: 14, color: '#555e6b', lineHeight: 1.6, marginBottom: 24 }}>Thank you, {form.name}! Our admissions team will contact you at {form.phone} within 24 hours.</p>
                <button onClick={() => setSubmitted(false)} className="vs-btn vs-btn-blue">Submit Another</button>
              </motion.div>
            ) : (
              <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: 20 }}>
                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: 20 }}>
                  <div className="vs-form-group">
                    <label className="vs-label">Full Name</label>
                    <input className="vs-input" placeholder="Your name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} />
                    {errors.name && <div style={{ color: '#e8282b', fontSize: 11, marginTop: 4 }}>{errors.name}</div>}
                  </div>
                  <div className="vs-form-group">
                    <label className="vs-label">Phone Number</label>
                    <input className="vs-input" placeholder="10-digit mobile" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} />
                    {errors.phone && <div style={{ color: '#e8282b', fontSize: 11, marginTop: 4 }}>{errors.phone}</div>}
                  </div>
                </div>
                <div className="vs-form-group">
                  <label className="vs-label">Email Address</label>
                  <input className="vs-input" type="email" placeholder="you@example.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} />
                  {errors.email && <div style={{ color: '#e8282b', fontSize: 11, marginTop: 4 }}>{errors.email}</div>}
                </div>
                <div className="vs-form-group">
                  <label className="vs-label">Program of Interest</label>
                  <select className="vs-input" value={form.course} onChange={e => setForm({...form, course: e.target.value})}>
                    <option value="">Select a program</option>
                    {courses.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
                  </select>
                  {errors.course && <div style={{ color: '#e8282b', fontSize: 11, marginTop: 4 }}>{errors.course}</div>}
                </div>
                <div className="vs-form-group">
                  <label className="vs-label">Message (Optional)</label>
                  <textarea className="vs-input" style={{ height: 100, resize: 'none' }} placeholder="Any specific questions..." value={form.message} onChange={e => setForm({...form, message: e.target.value})} />
                </div>
                <button type="submit" className="vs-btn vs-btn-blue" style={{ height: 48, fontSize: 14, marginTop: 10 }}>Submit Inquiry Inquiry <FiArrowRight /></button>
              </form>
            )}
          </div>
        </div>
      </div>

    </div>
  );
};

export default Admissions;

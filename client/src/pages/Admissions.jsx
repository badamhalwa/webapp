import React, { useState } from 'react';
import { motion } from 'framer-motion';
import toast, { Toaster } from 'react-hot-toast';
import { PageHero, Card, FormInput, FormTextarea, FormSelect, Button, SectionHeader } from '../components/ui/UIComponents';

const courses = [
  { name: 'BDS', duration: '5 Years', seats: 100, fee: '₹3.5 L/year', eligibility: '10+2 with PCB, NEET qualified' },
  { name: 'MDS — Orthodontics', duration: '3 Years', seats: 6, fee: '₹5 L/year', eligibility: 'BDS with NEET-PG' },
  { name: 'MDS — Periodontics', duration: '3 Years', seats: 6, fee: '₹5 L/year', eligibility: 'BDS with NEET-PG' },
  { name: 'MDS — Conservative Dentistry', duration: '3 Years', seats: 6, fee: '₹5 L/year', eligibility: 'BDS with NEET-PG' },
  { name: 'MDS — Oral Surgery', duration: '3 Years', seats: 6, fee: '₹5 L/year', eligibility: 'BDS with NEET-PG' },
  { name: 'MDS — Prosthodontics', duration: '3 Years', seats: 6, fee: '₹5 L/year', eligibility: 'BDS with NEET-PG' },
];

const steps = [
  { step: '01', title: 'Register Online', desc: 'Fill the admission inquiry form and create your applicant profile.' },
  { step: '02', title: 'Document Verification', desc: 'Upload required documents for verification by our admissions team.' },
  { step: '03', title: 'Counselling', desc: 'Attend in-person or virtual counselling session with our admissions officer.' },
  { step: '04', title: 'Fee Payment', desc: 'Complete fee payment to confirm your seat.' },
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
      toast.success('Inquiry submitted! Our admissions team will contact you within 24 hours.');
    }, 800);
  };

  return (
    <div>
      <Toaster position="top-right"/>
      <PageHero title="Admissions 2026–27" subtitle="Begin your journey towards a rewarding career in dentistry at RRDCH." breadcrumb="Home / Admissions" bg="from-green-700 to-rrdch-blue"/>

      {/* Courses */}
      <section className="max-w-7xl mx-auto px-4 py-16">
        <SectionHeader title="Programs Offered" subtitle="Choose from our undergraduate and postgraduate dental programs." centered/>
        <div className="overflow-x-auto">
          <table className="w-full bg-white rounded-2xl shadow-sm border border-gray-100 overflow-hidden">
            <thead className="bg-rrdch-blue text-white">
              <tr>
                {['Program', 'Duration', 'Intake', 'Annual Fee', 'Eligibility'].map(h => (
                  <th key={h} className="px-6 py-4 text-left text-sm font-semibold">{h}</th>
                ))}
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {courses.map((c, i) => (
                <motion.tr key={i} initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }} transition={{ delay: i * 0.05 }}
                  className="hover:bg-blue-50 transition-colors"
                >
                  <td className="px-6 py-4 font-semibold text-gray-900">{c.name}</td>
                  <td className="px-6 py-4 text-gray-600">{c.duration}</td>
                  <td className="px-6 py-4 text-gray-600">{c.seats} seats</td>
                  <td className="px-6 py-4 text-gray-600">{c.fee}</td>
                  <td className="px-6 py-4 text-gray-500 text-sm">{c.eligibility}</td>
                </motion.tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Process */}
      <section className="bg-gray-50 py-16">
        <div className="max-w-7xl mx-auto px-4">
          <SectionHeader title="How to Apply" centered/>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {steps.map((s, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }} transition={{ delay: i * 0.1 }}>
                <Card className="p-6 text-center h-full relative overflow-hidden">
                  <div className="text-6xl font-black text-gray-100 absolute -top-2 -right-2">{s.step}</div>
                  <div className="w-12 h-12 bg-gradient-to-br from-rrdch-blue to-rrdch-teal rounded-full flex items-center justify-center text-white font-bold mb-4 mx-auto">{i+1}</div>
                  <h3 className="font-bold text-gray-900 mb-2">{s.title}</h3>
                  <p className="text-gray-500 text-sm">{s.desc}</p>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Inquiry Form */}
      <section className="max-w-3xl mx-auto px-4 py-16">
        <SectionHeader title="Admission Inquiry" subtitle="Fill in your details and our admissions counsellor will get back to you." centered/>
        {submitted ? (
          <motion.div initial={{ opacity: 0, scale: 0.9 }} animate={{ opacity: 1, scale: 1 }}
            className="bg-green-50 border border-green-200 rounded-2xl p-10 text-center"
          >
            <div className="text-6xl mb-4">✅</div>
            <h3 className="text-2xl font-bold text-green-800 mb-2">Inquiry Received!</h3>
            <p className="text-green-700">Thank you, {form.name}! Our admissions team will contact you at <strong>{form.phone}</strong> within 24 hours.</p>
            <Button className="mt-6" onClick={() => { setSubmitted(false); setForm({ name: '', email: '', phone: '', course: '', message: '' }); }}>Submit Another</Button>
          </motion.div>
        ) : (
          <Card className="p-8">
            <form onSubmit={handleSubmit} className="space-y-5" noValidate>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <FormInput id="adm-name" label="Full Name" required placeholder="Your full name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} error={errors.name}/>
                <FormInput id="adm-phone" label="Phone Number" required placeholder="10-digit mobile" value={form.phone} onChange={e => setForm({...form, phone: e.target.value})} error={errors.phone}/>
              </div>
              <FormInput id="adm-email" label="Email Address" required type="email" placeholder="you@email.com" value={form.email} onChange={e => setForm({...form, email: e.target.value})} error={errors.email}/>
              <FormSelect id="adm-course" label="Program of Interest" required value={form.course} onChange={e => setForm({...form, course: e.target.value})} error={errors.course}>
                <option value="">Select a program</option>
                {courses.map(c => <option key={c.name} value={c.name}>{c.name}</option>)}
              </FormSelect>
              <FormTextarea id="adm-msg" label="Message (optional)" placeholder="Any specific queries about admissions..." value={form.message} onChange={e => setForm({...form, message: e.target.value})}/>
              <Button type="submit" size="lg" className="w-full justify-center">Submit Inquiry</Button>
            </form>
          </Card>
        )}
      </section>
    </div>
  );
};

export default Admissions;

import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import toast, { Toaster } from 'react-hot-toast';
import { useApp } from '../../context/AppContext';
import { Card, FormTextarea, FormSelect, Button, PageHero } from '../../components/ui/UIComponents';
import { FiStar } from 'react-icons/fi';
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

  if (submitted) return (
    <div>
      <PageHero title={t('feedback.title')} breadcrumb="Home / Patients / Feedback"/>
      <div className="max-w-xl mx-auto px-4 py-16">
        <motion.div initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }}
          className="bg-gradient-to-br from-teal-50 to-blue-50 border border-teal-200 rounded-2xl p-10 text-center"
        >
          <div className="text-7xl mb-4">🙏</div>
          <h2 className="text-2xl font-bold text-teal-800 mb-2">{t('feedback.success')}</h2>
          <p className="text-teal-700 mb-6">Your {ratingLabels[form.rating]} rating has been recorded. Your feedback helps us improve our services.</p>
          <div className="flex justify-center mb-6">
            {[...Array(5)].map((_, i) => (
              <FiStar key={i} size={28} className={i < form.rating ? 'text-amber-400 fill-amber-400' : 'text-gray-300'}/>
            ))}
          </div>
          <Button onClick={() => { setSubmitted(false); setForm({ name: '', department: '', rating: 0, comment: '' }); }}>
            Submit Another
          </Button>
        </motion.div>
      </div>
    </div>
  );

  return (
    <div>
      <Toaster position="top-right"/>
      <PageHero title={t('feedback.title')} subtitle="Your feedback helps us continuously improve our services for all patients." breadcrumb="Home / Patients / Feedback"/>

      <div className="max-w-2xl mx-auto px-4 py-12">
        <Card className="p-8">
          <form onSubmit={handleSubmit} className="space-y-6" noValidate>
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-1">Your Name <span className="text-red-500">*</span></label>
              <input id="fb-name" className={`w-full border rounded-xl px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-rrdch-blue ${errors.name ? 'border-red-400 bg-red-50' : 'border-gray-200'}`}
                placeholder="Your name" value={form.name} onChange={e => setForm({...form, name: e.target.value})} aria-required="true"
              />
              {errors.name && <p className="text-xs text-red-500 mt-1">{errors.name}</p>}
            </div>

            <FormSelect id="fb-dept" label="Department Visited" value={form.department} onChange={e => setForm({...form, department: e.target.value})}>
              <option value="">Select department (optional)</option>
              {departments.map(d => <option key={d.id} value={d.name}>{d.name}</option>)}
            </FormSelect>

            {/* Star Rating */}
            <div>
              <label className="block text-sm font-medium text-gray-700 mb-2">{t('feedback.rating')} <span className="text-red-500">*</span></label>
              <div className="flex gap-2 mb-1" role="radiogroup" aria-label="Rating">
                {[1, 2, 3, 4, 5].map(star => (
                  <button key={star} type="button"
                    onClick={() => { setForm({...form, rating: star}); setErrors(e => ({...e, rating: ''})); }}
                    onMouseEnter={() => setHoverRating(star)} onMouseLeave={() => setHoverRating(0)}
                    className="transition-transform hover:scale-110 focus:outline-none focus-visible:ring-2 focus-visible:ring-amber-400 rounded-full p-1"
                    aria-label={`${star} star${star > 1 ? 's' : ''}`} aria-pressed={form.rating === star}
                  >
                    <FiStar size={36} className={star <= (hoverRating || form.rating) ? 'text-amber-400 fill-amber-400' : 'text-gray-300'} />
                  </button>
                ))}
              </div>
              {(hoverRating || form.rating) > 0 && (
                <p className="text-sm text-amber-600 font-medium">{ratingLabels[hoverRating || form.rating]}</p>
              )}
              {errors.rating && <p className="text-xs text-red-500 mt-1">{errors.rating}</p>}
            </div>

            <FormTextarea id="fb-comment" label={t('feedback.comment')} required
              placeholder="Please share your experience about our services, doctors, staff, facilities..."
              value={form.comment} onChange={e => setForm({...form, comment: e.target.value})} error={errors.comment}
            />

            <Button type="submit" size="lg" className="w-full justify-center" disabled={loading}>
              {loading ? <><div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin"/> Submitting...</> : t('feedback.submit')}
            </Button>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default Feedback;

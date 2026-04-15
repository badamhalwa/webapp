import React, { useState } from 'react';
import { useTranslation } from 'react-i18next';
import { motion, AnimatePresence } from 'framer-motion';
import { FiStar, FiSend, FiCheckCircle, FiMessageSquare } from 'react-icons/fi';

const Feedback = () => {
  const { t, i18n } = useTranslation();
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);
  const [comment, setComment] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);
  
  const lang = i18n.language;

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
    }, 1200);
  };

  return (
    <div style={{ background: '#ffffff', minHeight: '80vh' }}>
      
      {/* ── Page Hero ── */}
      <section style={{ background: '#003580', padding: '3rem 2rem 2.5rem' }}>
        <div className="max-w-7xl mx-auto">
          <nav className="vs-breadcrumb" style={{ marginBottom: 10 }}>
            <a href="/" style={{ color: 'rgba(255,255,255,0.55)', textDecoration: 'none', fontSize: 12 }}>{t('nav.home')}</a>
            <span style={{ color: 'rgba(255,255,255,0.3)', margin: '0 6px', fontSize: 12 }}>/</span>
            <span style={{ color: 'rgba(255,255,255,0.5)', fontSize: 12 }}>{t('nav.feedback')}</span>
          </nav>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 10 }}>
            {t('feedback.title')}
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif', maxWidth: 560, lineHeight: 1.7 }}>
            {t('feedback.subtitle')}
          </p>
        </div>
      </section>

      <div className="vs-section" style={{ display: 'flex', justifyContent: 'center' }}>
        <AnimatePresence mode="wait">
          {!submitted ? (
            <motion.div
              key="form"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.95 }}
              className="vs-card"
              style={{ padding: '3rem', maxWidth: 600, width: '100%', textAlign: 'center' }}
            >
              <div style={{ width: 60, height: 60, borderRadius: '50%', background: '#f5f3ff', color: '#7c3aed', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <FiMessageSquare size={28} />
              </div>
              
              <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '1.5rem', color: '#1a1a2e', marginBottom: 8 }}>
                {lang === 'kn' ? 'ನಿಮ್ಮ ಭೇಟಿ ಹೇಗಿತ್ತು?' : 'How was your visit?'}
              </h2>
              <p style={{ color: '#555e6b', fontSize: 14, marginBottom: 32, fontFamily: 'Inter, sans-serif' }}>
                 {lang === 'kn' ? 'ದಯವಿಟ್ಟು ಕೆಳಗೆ ರೇಟಿಂಗ್ ಮತ್ತು ಅಭಿಪ್ರಾಯವನ್ನು ನೀಡಿ.' : 'Please rate your experience with our clinical staff and facilities.'}
              </p>

              <form onSubmit={handleSubmit}>
                <div style={{ marginBottom: 32 }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 800, color: '#1a1a2e', textTransform: 'uppercase', marginBottom: 12, letterSpacing: '0.05em' }}>
                    {t('feedback.rating')}
                  </label>
                  <div style={{ display: 'flex', justifyContent: 'center', gap: 8 }}>
                    {[1, 2, 3, 4, 5].map((star) => (
                      <button
                        key={star}
                        type="button"
                        onClick={() => setRating(star)}
                        onMouseEnter={() => setHover(star)}
                        onMouseLeave={() => setHover(0)}
                        style={{ background: 'none', border: 'none', cursor: 'pointer', padding: 4, transition: 'transform 0.1s' }}
                      >
                        <FiStar
                          size={36}
                          style={{
                            fill: star <= (hover || rating) ? '#f59e0b' : 'none',
                            color: star <= (hover || rating) ? '#f59e0b' : '#d1d5db',
                            strokeWidth: 1.5
                          }}
                        />
                      </button>
                    ))}
                  </div>
                </div>

                <div style={{ marginBottom: 32, textAlign: 'left' }}>
                  <label style={{ display: 'block', fontSize: 12, fontWeight: 800, color: '#1a1a2e', textTransform: 'uppercase', marginBottom: 10, letterSpacing: '0.05em' }}>
                    {t('feedback.comment')}
                  </label>
                  <textarea
                    className="vs-input"
                    placeholder={t('feedback.commentPlaceholder')}
                    value={comment}
                    onChange={(e) => setComment(e.target.value)}
                    style={{ minHeight: 120, resize: 'vertical' }}
                    required
                  />
                </div>

                <button
                  type="submit"
                  disabled={loading || rating === 0}
                  className="vs-btn vs-btn-primary"
                  style={{ width: '100%', height: 48, justifyContent: 'center', gap: 10, fontSize: 14, borderRadius: 8 }}
                >
                  {loading ? t('common.loading') : <><FiSend size={18} /> {t('feedback.submit')}</>}
                </button>
              </form>
            </motion.div>
          ) : (
            <motion.div
              key="success"
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              className="vs-card"
              style={{ padding: '4rem 3rem', maxWidth: 500, width: '100%', textAlign: 'center' }}
            >
              <div style={{ width: 80, height: 80, borderRadius: '50%', background: '#eaf5ee', color: '#276a27', display: 'flex', alignItems: 'center', justifyContent: 'center', margin: '0 auto 24px' }}>
                <FiCheckCircle size={40} />
              </div>
              <h2 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '1.75rem', color: '#1a1a2e', marginBottom: 12 }}>
                {t('feedback.success')}
              </h2>
              <p style={{ color: '#555e6b', fontSize: 15, marginBottom: 32, fontFamily: 'Inter, sans-serif', lineHeight: 1.6 }}>
                {t('feedback.successSub')}
              </p>
              <button
                onClick={() => setSubmitted(false)}
                className="vs-btn vs-btn-outline"
                style={{ borderRadius: 8, margin: '0 auto' }}
              >
                {lang === 'kn' ? 'ಮತ್ತೊಂದು ಪ್ರತಿಕ್ರಿಯೆ ನೀಡಿ' : 'Submit another response'}
              </button>
            </motion.div>
          )}
        </AnimatePresence>
      </div>

    </div>
  );
};

export default Feedback;

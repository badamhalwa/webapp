import React, { useState, useEffect } from 'react';
import { useLocation, Link } from 'react-router-dom';
import { useTranslation } from 'react-i18next';
import { motion } from 'framer-motion';
import { FiSearch, FiArrowRight, FiFileText, FiUser, FiActivity } from 'react-icons/fi';

const SearchPage = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const location = useLocation();
  const [query, setQuery] = useState('');
  
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setQuery(params.get('q') || '');
  }, [location.search]);

  // Mock results
  const results = [
    { title: t('nav.bookAppointment'), path: '/patient/book', type: 'Service', icon: FiActivity },
    { title: t('depts.d1'), path: '/departments', type: 'Department', icon: FiActivity },
    { title: t('nav.about'), path: '/about', type: 'Page', icon: FiFileText },
    { title: t('nav.faculty'), path: '/faculty', type: 'Team', icon: FiUser },
  ].filter(r => r.title.toLowerCase().includes(query.toLowerCase()));

  return (
    <div style={{ background: '#ffffff', minHeight: '80vh' }}>
      
      {/* ── Page Hero ── */}
      <section style={{ background: '#003580', padding: '3rem 2rem 2.5rem' }}>
        <div className="max-w-7xl mx-auto">
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#ffffff', letterSpacing: '-0.02em', marginBottom: 10 }}>
            {lang === 'kn' ? `"${query}" ಗಾಗಿ ಹುಡುಕಾಟದ ಫಲಿತಾಂಶಗಳು` : `Search Results for "${query}"`}
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', fontFamily: 'Inter, sans-serif', maxWidth: 560 }}>
            {lang === 'kn' ? `${results.length} ಫಲಿತಾಂಶಗಳು ಕಂಡುಬಂದಿವೆ.` : `Found ${results.length} matches across the portal.`}
          </p>
        </div>
      </section>

      <div className="vs-section">
        <div className="max-w-4xl mx-auto">
          {results.length > 0 ? (
            <div style={{ display: 'flex', flexDirection: 'column', gap: 12 }}>
              {results.map((res, i) => (
                <motion.div key={i} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: i * 0.05 }}>
                  <Link to={res.path} style={{ textDecoration: 'none' }}>
                    <div className="vs-card" style={{ padding: '1.25rem 1.5rem', display: 'flex', justifyContent: 'space-between', alignItems: 'center', hover: { background: '#f8fafc' } }}>
                      <div style={{ display: 'flex', alignItems: 'center', gap: 16 }}>
                        <div style={{ width: 40, height: 40, borderRadius: 10, background: '#f1f5f9', color: '#003580', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                          <res.icon size={20} />
                        </div>
                        <div>
                          <div style={{ fontSize: 10, color: '#888', textTransform: 'uppercase', fontWeight: 800, letterSpacing: '0.05em' }}>{res.type}</div>
                          <div style={{ fontSize: 15, fontWeight: 700, color: '#1a1a2e' }}>{res.title}</div>
                        </div>
                      </div>
                      <FiArrowRight size={18} color="#cbd5e1" />
                    </div>
                  </Link>
                </motion.div>
              ))}
            </div>
          ) : (
            <div className="vs-card" style={{ padding: '4rem 2rem', textAlign: 'center' }}>
              <div style={{ fontSize: '4rem', marginBottom: 24 }}>🔎</div>
              <h2 style={{ fontSize: '1.5rem', fontWeight: 800, color: '#1a1a2e', marginBottom: 12 }}>{lang === 'kn' ? 'ಯಾವುದೇ ಫಲಿತಾಂಶಗಳಿಲ್ಲ' : 'No Results Found'}</h2>
              <p style={{ color: '#64748b', fontSize: 14, maxWidth: 400, margin: '0 auto mb-8' }}>
                {lang === 'kn' ? 'ಕ್ಷಮಿಸಿ, ನಿಮ್ಮ ಹುಡುಕಾಟಕ್ಕೆ ಹೊಂದಿಕೆಯಾಗುವ ಯಾವುದೇ ವಿಷಯಗಳು ನಮಗೆ ಕಂಡುಬಂದಿಲ್ಲ.' : "Sorry, we couldn't find any content matching your search terms. Please try different keywords."}
              </p>
              <Link to="/">
                <button className="vs-btn vs-btn-primary" style={{ margin: '0 auto' }}>{t('nav.home')}</button>
              </Link>
            </div>
          )}
        </div>
      </div>

    </div>
  );
};

export default SearchPage;

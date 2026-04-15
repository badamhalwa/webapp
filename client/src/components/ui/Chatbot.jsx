import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FiX, FiSend, FiPlus, FiArrowRight, FiInfo, FiActivity } from 'react-icons/fi';

const RoboIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 8V4H8" />
    <rect x="5" y="8" width="14" height="12" rx="2" />
    <path d="M2 11h3" />
    <path d="M19 11h3" />
    <path d="M9 14h.01" />
    <path d="M15 14h.01" />
  </svg>
);

const Chatbot = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: lang === 'kn' ? 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮ್ಮ ದಂತ ಆರೈಕೆ ಸಹಾಯಕ. ನಿಮಗೆ ಹೇಗೆ ಸಹಾಯ ಮಾಡಲಿ?' : 'Hello! I am your RRDCH Health Assistant. How can I help with your dental care today?' }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  useEffect(() => {
    const timer = setTimeout(() => setShowTooltip(false), 8000);
    return () => clearTimeout(timer);
  }, []);

  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSend = (e) => {
    e.preventDefault();
    if (!input.trim()) return;

    const userMessage = { role: 'user', content: input };
    setMessages(prev => [...prev, userMessage]);
    setInput('');

    setTimeout(() => {
      let response = '';
      const text = input.toLowerCase();
      
      if (text.includes('pain') || text.includes('ache') || text.includes('ನೋವು')) {
        response = lang === 'kn' ? 'ಹಲ್ಲು ನೋವಿದೆಯೇ? ದಯವಿಟ್ಟು ತಕ್ಷಣ ನಮ್ಮ "ಎಮರ್ಜೆನ್ಸಿ" ವಿಭಾಗಕ್ಕೆ ಭೇಟಿ ನೀಡಿ ಅಥವಾ ಆನ್‌ಲೈನ್‌ನಲ್ಲಿ ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಬುಕ್ ಮಾಡಿ.' : 'Are you experiencing tooth pain? Please visit our Emergency department or book an immediate consultation under "Oral Medicine".';
      } else if (text.includes('booking') || text.includes('appointment') || text.includes('ಬುಕ್ಕಿಂಗ್')) {
        response = lang === 'kn' ? 'ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಬುಕ್ ಮಾಡಲು "Book Appointment" ಬಟನ್ ಒತ್ತಿ ಅಥವಾ ರೋಗಿ ಸೇವೆಗಳ ವಿಭಾಗಕ್ಕೆ ಹೋಗಿ.' : 'To schedule a visit, click the red "Book Appointment" button at the top or visit the Patient Services portal.';
      } else if (text.includes('cost') || text.includes('price') || text.includes('ಶುಲ್ಕ')) {
        response = lang === 'kn' ? 'ಚಿಕಿತ್ಸೆಯ ಶುಲ್ಕವು ರೋಗನಿರ್ಣಯದ ನಂತರ ನಿರ್ಧಾರವಾಗುತ್ತದೆ. ಪ್ರಾಥಮಿಕ ತಪಾಸಣೆಗೆ ₹100 ಮಾತ್ರ.' : 'Treatment costs depend on the diagnosis. Our basic consultation starts at just ₹100.';
      } else if (text.includes('timer') || text.includes('wait') || text.includes('queue')) {
        response = lang === 'kn' ? 'ಈಗಿರುವ ರೋಗಿಗಳ ಸರತಿಯನ್ನು ನೀವು "Live Queue" ಪುಟದಲ್ಲಿ ನೋಡಬಹುದು.' : 'You can check the real-time waiting list on our "Live Queue" page.';
      } else {
        response = lang === 'kn' ? 'ನನಗೆ ಕ್ಷಮಿಸಿ, ನಿಮ್ಮ ಪ್ರಶ್ನೆ ಸರಿಯಾಗಿ ಅರ್ಥವಾಗಲಿಲ್ಲ. ನಮ್ಮ ಸಹಾಯವಾಣಿ: 080-28437124.' : "I'm here to help with appointments, pain management, and hospital directions. For specific medical advice, please call 080-28437124.";
      }

      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    }, 800);
  };

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, fontFamily: 'Inter, sans-serif' }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95, transformOrigin: 'bottom right' }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            style={{ 
              width: 360, 
              height: 520, 
              background: '#fff', 
              borderRadius: 24, 
              boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', 
              marginBottom: 16, 
              display: 'flex', 
              flexDirection: 'column',
              overflow: 'hidden',
              border: '1px solid rgba(0,53,128,0.1)'
            }}
          >
            {/* Header */}
            <div style={{ padding: '20px 24px', background: 'linear-gradient(135deg, #003580 0%, #0056b3 100%)', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ padding: 8, background: 'rgba(255,255,255,0.15)', borderRadius: 10 }}>
                   <RoboIcon size={20} />
                </div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 15, letterSpacing: '-0.01em' }}>RRDCH Robo-Assist</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }}></div>
                    <span style={{ fontSize: 10, fontWeight: 700, opacity: 0.8, textTransform: 'uppercase' }}>Online Support</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', width: 32, height: 32, borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FiX size={18} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '24px', display: 'flex', flexDirection: 'column', gap: 16, background: '#f8fafc' }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ 
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  background: msg.role === 'user' ? '#003580' : '#fff',
                  color: msg.role === 'user' ? '#fff' : '#334155',
                  padding: '12px 18px',
                  borderRadius: msg.role === 'user' ? '20px 20px 4px 20px' : '4px 20px 20px 20px',
                  fontSize: 13,
                  lineHeight: 1.6,
                  fontWeight: msg.role === 'user' ? 600 : 500,
                  boxShadow: '0 4px 6px -1px rgba(0,0,0,0.05)',
                  border: msg.role === 'assistant' ? '1px solid #e2e8f0' : 'none'
                }}>
                  {msg.content}
                </div>
              ))}
            </div>

            {/* Quick Patient Actions */}
            <div style={{ padding: '0 24px 16px', background: '#f8fafc', display: 'flex', gap: 8, overflowX: 'auto' }}>
                {[
                  { label: lang === 'kn' ? 'ಅಪಾಯಿಂಟ್ಮೆಂಟ್' : 'Add Appt', path: '/patient/book' },
                  { label: lang === 'kn' ? 'ಸರತಿ ಸಾಲು' : 'Live Queue', path: '/patient/queue' },
                  { label: lang === 'kn' ? 'ದಾರಿ ಮಾಹಿತಿ' : 'Directions', path: '/patient/directions' },
                ].map((btn, i) => (
                  <button key={i} onClick={() => navigate(btn.path)} style={{ background: '#fff', border: '1px solid #e2e8f0', color: '#003580', padding: '6px 12px', borderRadius: 10, fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap', cursor: 'pointer' }}>
                    {btn.label}
                  </button>
                ))}
            </div>

            {/* Input form */}
            <form onSubmit={handleSend} style={{ padding: '20px 24px', background: '#fff', borderTop: '1px solid #f1f5f9', display: 'flex', gap: 12 }}>
              <input 
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={lang === 'kn' ? 'ನನ್ನ ಹಲ್ಲು ನೋವಿನ ಬಗ್ಗೆ ಕೇಳಿ...' : 'Ask about dental pain or appointments...'}
                style={{ flex: 1, border: 'none', background: '#f1f5f9', borderRadius: 14, padding: '12px 18px', fontSize: 13, outline: 'none', fontWeight: 500 }}
              />
              <button type="submit" style={{ width: 44, height: 44, borderRadius: 12, background: '#003580', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 4px 6px rgba(0,53,128,0.2)' }}>
                <FiSend size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ position: 'relative' }}>
        {/* Tooltip */}
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div 
              initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0, scale: 0.8 }}
              style={{ position: 'absolute', right: 70, bottom: 8, background: '#003580', color: '#fff', padding: '10px 16px', borderRadius: 14, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.15)' }}
            >
              {lang === 'kn' ? 'ನಾನು ನಿಮಗೆ ಸಹಾಯ ಮಾಡಬಲ್ಲೆ!' : 'Need dental help?'}
              <div style={{ position: 'absolute', right: -6, top: '50%', transform: 'translateY(-50%) rotate(45deg)', width: 12, height: 12, background: '#003580' }}></div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Robo Button */}
        <motion.button
          whileHover={{ scale: 1.08, rotate: 5 }}
          whileTap={{ scale: 0.92 }}
          onClick={() => { setIsOpen(!isOpen); setShowTooltip(false); }}
          style={{ 
            width: 64, height: 64, borderRadius: 20,
            background: 'linear-gradient(135deg, #003580 0%, #0056b3 100%)', 
            color: '#fff', border: 'none', cursor: 'pointer', 
            display: 'flex', alignItems: 'center', justifyContent: 'center',
            boxShadow: '0 15px 30px -5px rgba(0,53,128,0.3)',
            border: '2px solid rgba(255,255,255,0.1)'
          }}
        >
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
                <FiX size={28} />
              </motion.div>
            ) : (
              <motion.div key="robo" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}>
                <RoboIcon size={32} />
              </motion.div>
            )}
          </AnimatePresence>
          {!isOpen && (
            <motion.span 
              animate={{ scale: [1, 1.2, 1] }} 
              transition={{ repeat: Infinity, duration: 2 }}
              style={{ position: 'absolute', top: -2, right: -2, width: 16, height: 16, background: '#10b981', borderRadius: '50%', border: '3px solid #fff' }}
            />
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default Chatbot;

import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FiMessageSquare, FiX, FiSend, FiPlus, FiArrowRight } from 'react-icons/fi';

const Chatbot = () => {
  const { t, i18n } = useTranslation();
  const lang = i18n.language;
  const navigate = useNavigate();
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState([
    { role: 'assistant', content: lang === 'kn' ? 'ನಮಸ್ಕಾರ! ನಾನು ನಿಮಗೆ ಯಾವ ರೀತಿ ಸಹಾಯ ಮಾಡಬಹುದು?' : 'Hello! Welcome to RRDCH. How can I assist you today?' }
  ]);
  const [input, setInput] = useState('');
  const scrollRef = useRef(null);

  const quickLinks = [
    { label: lang === 'kn' ? 'ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಬುಕ್ ಮಾಡಿ' : 'Book Appointment', path: '/patient/book' },
    { label: lang === 'kn' ? 'ವಿಭಾಗಗಳನ್ನು ನೋಡಿ' : 'Search Departments', path: '/departments' },
    { label: lang === 'kn' ? 'ಪ್ರವೇಶ ಮಾಹಿತಿ' : 'Admission Info', path: '/admissions' },
    { label: lang === 'kn' ? 'ವರ್ಚುವಲ್ ಟೂರ್' : 'Virtual Tour', path: '/tour' }
  ];

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

    // Simple keyword based responses
    setTimeout(() => {
      let response = '';
      const text = input.toLowerCase();
      
      if (text.includes('appointment') || text.includes('book') || text.includes('ಹೇಗೆ ಬುಕ್')) {
        response = lang === 'kn' ? 'ನೀವು "ರೋಗಿ ಸೇವೆಗಳು" ಮೆನುವಿನಲ್ಲಿರುವ "ಅಪಾಯಿಂಟ್ಮೆಂಟ್ ಬುಕಿಂಗ್" ಪುಟಕ್ಕೆ ಹೋಗಬಹುದು.' : 'You can head to our Appointment Booking page under Patient Services to schedule a visit.';
      } else if (text.includes('admission') || text.includes('fees') || text.includes('ಪ್ರವೇಶ')) {
        response = lang === 'kn' ? 'ಪ್ರವೇಶಕ್ಕೆ ಸಂಬಂಧಿಸಿದ ಮಾಹಿತಿಗಾಗಿ ನಾವು ಪ್ರವೇಶ ಪುಟವನ್ನು ಹೊಂದಿದ್ದೇವೆ (Admissions Page).' : 'For admission inquiries and fee structures, please visit our Admissions page.';
      } else if (text.includes('doctor') || text.includes('faculty') || text.includes('ವೈದ್ಯರು')) {
        response = lang === 'kn' ? 'ನಮ್ಮ ಎಲ್ಲಾ ವಿಭಾಗದ ತಜ್ಞ ವೈದ್ಯರ ಪಟ್ಟಿಯನ್ನು ವಿಭಾಗಗಳ ಪುಟದಲ್ಲಿ ನೋಡಬಹುದು.' : 'You can find our expert faculty list under the individual Department pages.';
      } else {
        response = lang === 'kn' ? 'ಕ್ಷಮಿಸಿ, ಹೆಚ್ಚಿನ ಮಾಹಿತಿಗಾಗಿ ದಯವಿಟ್ಟು 080-28437124 ಗೆ ಕರೆ ಮಾಡಿ.' : "I'm not sure about that. You can try searching our site or calling our help desk at 080-28437124.";
      }

      setMessages(prev => [...prev, { role: 'assistant', content: response }]);
    }, 600);
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
              width: 350, 
              height: 500, 
              background: '#fff', 
              borderRadius: 20, 
              boxShadow: '0 20px 40px rgba(0,0,0,0.15)', 
              marginBottom: 16, 
              display: 'flex', 
              flexDirection: 'column',
              overflow: 'hidden',
              border: '1px solid rgba(0,53,128,0.1)'
            }}
          >
            {/* Header */}
            <div style={{ padding: '20px', background: '#003580', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                <div style={{ width: 8, height: 8, borderRadius: '50%', background: '#10b981' }}></div>
                <div style={{ fontWeight: 700, fontSize: 14 }}>RRDCH Assistant</div>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ background: 'none', border: 'none', color: '#fff', cursor: 'pointer' }}>
                <FiX size={20} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: '20px', display: 'flex', flexDirection: 'column', gap: 16, background: '#f8fafc' }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ 
                  alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start',
                  maxWidth: '85%',
                  background: msg.role === 'user' ? '#003580' : '#fff',
                  color: msg.role === 'user' ? '#fff' : '#1a1a2e',
                  padding: '12px 16px',
                  borderRadius: msg.role === 'user' ? '18px 18px 4px 18px' : '4px 18px 18px 18px',
                  fontSize: 13,
                  lineHeight: 1.5,
                  boxShadow: '0 2px 4px rgba(0,0,0,0.05)'
                }}>
                  {msg.content}
                </div>
              ))}
              
              {/* Quick Actions */}
              {messages.length < 3 && (
                <div style={{ display: 'flex', flexWrap: 'wrap', gap: 8, marginTop: 10 }}>
                  {quickLinks.map((link, i) => (
                    <button 
                      key={i}
                      onClick={() => navigate(link.path)}
                      style={{ 
                        background: '#fff', 
                        border: '1px solid #003580', 
                        color: '#003580', 
                        padding: '6px 12px', 
                        borderRadius: 100, 
                        fontSize: 11, 
                        fontWeight: 600,
                        cursor: 'pointer',
                        transition: 'all 0.2s'
                      }}
                      onMouseEnter={e => { e.target.style.background = '#003580'; e.target.style.color = '#fff'; }}
                      onMouseLeave={e => { e.target.style.background = '#fff'; e.target.style.color = '#003580'; }}
                    >
                      {link.label}
                    </button>
                  ))}
                </div>
              )}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} style={{ padding: '16px', background: '#fff', borderTop: '1px solid #f1f5f9', display: 'flex', gap: 10 }}>
              <input 
                value={input}
                onChange={e => setInput(e.target.value)}
                placeholder={lang === 'kn' ? 'ಪ್ರಶ್ನೆಯನ್ನು ಇಲ್ಲಿ ಟೈಪ್ ಮಾಡಿ...' : 'Type your question...'}
                style={{ flex: 1, border: 'none', background: '#f1f5f9', borderRadius: 12, padding: '10px 16px', fontSize: 13, outline: 'none' }}
              />
              <button type="submit" style={{ width: 40, height: 40, borderRadius: 12, background: '#003580', color: '#fff', border: 'none', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FiSend size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Toggle Button */}
      <motion.button
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={() => setIsOpen(!isOpen)}
        style={{ 
          width: 56, 
          height: 56, 
          borderRadius: '50%', 
          background: '#003580', 
          color: '#fff', 
          border: 'none', 
          cursor: 'pointer', 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          boxShadow: '0 10px 15px -3px rgba(0,0,0,0.1)',
          position: 'relative'
        }}
      >
        <AnimatePresence mode="wait">
          {isOpen ? (
            <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}>
              <FiX size={24} />
            </motion.div>
          ) : (
            <motion.div key="chat" initial={{ rotate: 90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: -90, opacity: 0 }}>
              <FiMessageSquare size={24} />
            </motion.div>
          )}
        </AnimatePresence>
        {!isOpen && (
          <span style={{ position: 'absolute', top: 0, right: 0, width: 14, height: 14, background: '#e8282b', borderRadius: '50%', border: '2px solid #fff' }}></span>
        )}
      </motion.button>
    </div>
  );
};

export default Chatbot;

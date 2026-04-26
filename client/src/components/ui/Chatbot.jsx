import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useTranslation } from 'react-i18next';
import { useNavigate } from 'react-router-dom';
import { FiX, FiSend } from 'react-icons/fi';

const RoboIcon = ({ size = 24 }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
    <path d="M12 8V4H8" />
    <rect x="5" y="8" width="14" height="12" rx="2" />
    <path d="M2 11h3" /><path d="M19 11h3" />
    <path d="M9 14h.01" /><path d="M15 14h.01" />
  </svg>
);

// ── Smart keyword matcher ──────────────────────────────────────
const getLocalAnswer = (input) => {
  const w = input.toLowerCase().replace(/[^a-z0-9\s]/g, ' ');
  const has = (...kws) => kws.some(k => w.includes(k));

  // Greetings
  if (has('hello','hi ','hey ','hii','howdy','namaste') || w.trim() === 'hi' || w.trim() === 'hey')
    return "Hello! 👋 I'm RRDCH Robo-Assist. Ask me anything — dental problems, hospital info, coding, science, general knowledge, and more!";

  if (has('how are','how r u','how are u','are you fine','are you ok'))
    return "I'm doing great, thanks for asking! 😊 Ready to help. What can I do for you?";

  if (has('who are you','what are you','your name','who r u'))
    return "I'm **RRDCH Robo-Assist** — your AI assistant embedded in RRDCH Dental College & Hospital, Bangalore. I answer hospital queries, dental advice, coding, science, and general knowledge!";

  if (has('thank','thanks','thx','ty '))
    return "You're welcome! 😊 Feel free to ask me anything anytime.";

  // ── Dental Emergencies ──
  if (has('bleed','bleeding','blood','bleading','bleding') && has('tooth','teeth','gum','gums','mouth','socket')) {
    return `🦷 **Tooth/Gum Bleeding — What To Do:**

**Immediate steps:**
1. Rinse gently with **cold water** (not hot)
2. Apply gentle pressure with a clean gauze or cloth for 10–15 minutes
3. Bite down on a clean damp cloth if it's a tooth socket
4. Apply an **ice pack** on the outside of your cheek to reduce swelling
5. Avoid spitting, rinsing hard, smoking, or using a straw

**If gums are bleeding regularly:**
• Brush gently twice daily with a soft-bristle brush
• Floss carefully once daily
• Use an antiseptic mouthwash (Listerine)
• Take Vitamin C-rich foods (deficiency causes gum bleeding)

**Visit RRDCH if:**
• Bleeding doesn't stop after 20 minutes
• There's heavy swelling or severe pain
• You had a recent extraction and the socket is bleeding

📞 **080-28437124** | OPD: 9AM–4PM | Emergency: All days`;
  }

  if ((has('broke','broken','chipped','chip','crack','cracked','fractur','shatter','snap','fell','knocked')) && has('tooth','teeth','dental','molar','incisor')) {
    return `🦷 **Broken/Chipped Tooth — First Aid:**

**Do immediately:**
1. Rinse gently with warm water
2. Apply a cold compress on your cheek to reduce swelling
3. If bleeding, press gently with clean gauze
4. Save any broken fragment in milk or saliva — don't let it dry
5. Avoid hard/sticky foods and keep tongue away from the area

**At RRDCH, we can:**
• Bond/restore small chips (same-day treatment)
• Place a dental crown for major breaks
• Root canal if the nerve is exposed
• Implant/extraction for severe damage

⚠️ **Call 080-28437124 or visit RRDCH immediately.**
OPD: 9AM–4PM Mon–Sat | Emergency: All days`;
  }

  if (has('knocked out','knocked-out','tooth fell','fell out','avulsed','avulsion')) {
    return `🚨 **Knocked-Out Tooth — Act Within 30 Minutes!**

1. Pick up the tooth by the crown (white part), NOT the root
2. Rinse gently with milk or clean water — do NOT scrub
3. Try re-inserting it into the socket and bite down gently
4. If not possible, store in **milk or between cheek and gum**
5. Rush to RRDCH immediately — **080-28437124**

Time is critical! Best chance of saving within 30 minutes.`;
  }

  if (has('swollen','swelling','abscess','pus','infection','infected') && has('tooth','gum','jaw','face','cheek','mouth')) {
    return `🚨 **Dental Swelling/Abscess — This is Urgent!**

**Do immediately:**
• Do NOT apply heat to the swelling
• Take Paracetamol/Ibuprofen for pain
• Rinse with warm salt water
• Do NOT pop or squeeze the abscess

**Visit RRDCH emergency NOW:**
📞 **080-28437124** — Emergency available all days

An abscess can spread rapidly — don't delay treatment!`;
  }

  if ((has('pain','ache','hurts','hurt','throbbing','sensitive','sensitivity')) && has('tooth','teeth','mouth','jaw','gum')) {
    return `🦷 **Tooth Pain Relief:**

**Immediate steps:**
• Rinse with warm salt water
• Take Ibuprofen or Paracetamol
• Apply cold compress on the cheek
• Avoid hot, cold, or sweet foods
• Apply clove oil on the area for temporary relief

**Visit RRDCH urgently if:**
• Pain is severe and doesn't stop
• Face/jaw is swelling
• You have fever with tooth pain
• Pain spreads to ear or neck

📞 080-28437124 | OPD: 9AM–4PM`;
  }

  if (has('bleed','bleeding') && has('gum','gums','mouth')) {
    return `🦷 **Bleeding Gums:**

Likely caused by **Gingivitis** (early gum disease) or **Periodontitis**.

**Causes:** Plaque buildup, hard brushing, vitamin deficiency, blood thinners

**What to do:**
• Brush gently twice daily with soft-bristle brush
• Floss daily
• Use antiseptic mouthwash
• Eat vitamin C rich foods

**RRDCH Periodontology:** Scaling, deep cleaning, gum surgery
📞 080-28437124 | OPD: 9AM–4PM`;
  }

  if (has('wisdom tooth','wisdom teeth','third molar','back tooth')) {
    return `🦷 **Wisdom Tooth Problems:**

**Common symptoms:** Pain at back of mouth, swollen gum, jaw stiffness, bad breath

**Treatment at RRDCH (Oral Surgery):**
• X-ray to assess the position
• Simple extraction: ₹1,000–₹2,000
• Surgical removal (impacted): ₹3,000–₹5,000

📞 080-28437124 for Oral Surgery consultation`;
  }

  if (has('root canal','rct','pulp','endodontic')) {
    return `🦷 **Root Canal Treatment (RCT):**

Saves an infected tooth from extraction.

**When needed:** Deep decay, nerve infection, severe sensitivity, tooth abscess

**Procedure:**
1. Local anaesthesia (painless!)
2. Remove infected pulp
3. Clean & seal the canals
4. Crown placed on top

**At RRDCH:** ₹1,500–₹3,000 | 1–3 sittings | MDS specialists
📞 080-28437124`;
  }

  if (has('brace','braces','aligner','orthodontic','crooked','alignment','gap between')) {
    return `😁 **Orthodontic Treatment (Braces) at RRDCH:**

• Metal braces: ₹15,000–₹25,000
• Ceramic braces: ₹25,000–₹40,000
• Clear aligners: ₹30,000–₹60,000
• Duration: 12–24 months

**Fixes:** Crooked teeth, gaps, overbite, underbite, jaw misalignment

📞 080-28437124 for free consultation`;
  }

  if (has('yellow teeth','stained teeth','whiten','whitening','bleach','teeth color')) {
    return `✨ **Teeth Whitening at RRDCH:**

**Causes:** Coffee, tea, tobacco, aging, poor hygiene

**Options:**
• Scaling & polishing: ₹500–₹800
• Professional bleaching: ₹2,000–₹5,000
• Veneers: ₹5,000–₹15,000/tooth

**Daily habits:** Brush twice, rinse after coloured drinks, avoid tobacco
📞 080-28437124`;
  }

  if (has('bad breath','halitosis','smell from mouth','mouth smell','foul breath')) {
    return `😷 **Bad Breath (Halitosis):**

**Causes:** Poor hygiene, gum disease, dry mouth, smoking, digestive issues

**Fixes:**
• Brush teeth AND tongue twice daily
• Floss daily
• Use antibacterial mouthwash
• Drink lots of water
• Visit dentist every 6 months

📞 080-28437124 for diagnosis`;
  }

  if (has('cavity','cavities','decay','decayed','filling','caries')) {
    return `🦷 **Dental Cavity:**

Caused by bacteria eating through enamel.

**Stages:** White spot → Enamel decay → Dentin → Nerve (root canal)

**Treatment at RRDCH:**
• Small: Composite filling ₹500–₹1,500
• Deep: Root canal + crown

**Prevention:** Brush twice, floss, limit sugar, visit every 6 months!
📞 080-28437124`;
  }

  if (has('missing tooth','implant','denture','prosthetic','false tooth','replace tooth')) {
    return `🦷 **Tooth Replacement at RRDCH:**

1. **Dental Implant** (permanent): ₹20,000–₹50,000
2. **Fixed Bridge**: ₹8,000–₹20,000
3. **Removable Denture**: ₹5,000–₹20,000

**Prosthetics & Crown-Bridge dept** handles all replacements.
📞 080-28437124`;
  }

  // ── Hospital Info ──
  if (has('appointment','book','schedule','consult','opd','register','slot')) {
    return `📅 **Book Appointment at RRDCH:**

1. **Online:** Click "Book Appointment" on this website
2. **Phone:** Call 080-28437124
3. **Walk-in:** OPD counter at the hospital

**Timings:** 9AM–4PM, Monday–Saturday
**Emergency:** Available all days

Which department do you need?`;
  }

  if (has('fee','fees','cost','price','charge','how much','rupee','rs.','affordable')) {
    return `💰 **RRDCH Treatment Fees:**

| Treatment | Cost |
|-----------|------|
| Consultation | ₹100 |
| X-Ray | ₹150–₹300 |
| Scaling/Cleaning | ₹500–₹800 |
| Filling | ₹500–₹1,500 |
| Root Canal | ₹1,500–₹3,000 |
| Extraction | ₹300–₹2,000 |
| Braces | ₹15,000–₹40,000 |
| Implant | ₹20,000–₹50,000 |

Teaching hospital = much lower cost than private clinics!
📞 080-28437124`;
  }

  if (has('timing','timings','open','close','hour','when','sunday','location','address','direction','where is')) {
    return `📍 **RRDCH Hospital Info:**

**OPD:** 9:00AM – 4:00PM (Mon–Sat)
**Emergency:** All days, 24/7
**Sunday:** Emergency only

**Address:** RRDCH Dental College & Hospital, Bangalore, Karnataka
**Phone:** 080-28437124

Search "RRDCH Dental College" on Google Maps for directions!`;
  }

  if (has('department','dept','specialist','which doctor','which department')) {
    return `🏥 **RRDCH Departments:**

1. Oral Medicine & Radiology
2. Conservative Dentistry & Endodontics
3. Orthodontics & Dentofacial Orthopedics
4. Oral & Maxillofacial Surgery
5. Prosthetics & Crown & Bridge
6. Periodontology (Gum disease)
7. Pedodontics (Children's dentistry)
8. Oral & Maxillofacial Pathology
9. Public Health Dentistry

📞 080-28437124 to reach any department`;
  }

  // ── Tech & Coding ──
  if (has('python'))
    return `🐍 **Python:**\n\nHigh-level, easy-to-learn language used for Web Dev, AI/ML, Data Science, Automation.\n\n\`\`\`python\nfor i in range(5):\n    print(f"Hello! Count: {i}")\n\`\`\`\n\nSimple syntax, huge library ecosystem (NumPy, Pandas, TensorFlow). Perfect for beginners and experts!`;

  if (has('javascript','node.js','nodejs'))
    return `⚡ **JavaScript:**\n\nThe language of the web — runs in every browser and on servers (Node.js).\n\n\`\`\`js\nconst greet = name => \`Hello, \${name}!\`;\nconsole.log(greet("World"));\n\`\`\`\n\nFrameworks: React, Vue (frontend) | Express (backend) | React Native (mobile)`;

  if (has('react'))
    return `⚛️ **React:**\n\nJavaScript library by Meta for building UIs. This entire RRDCH website is built with React + Vite!\n\n**Key concepts:** Components, State (useState), Effects (useEffect), Props, Virtual DOM`;

  if (has('html'))
    return `🌐 **HTML** (HyperText Markup Language):\n\nThe skeleton/structure of every web page.\n\n\`\`\`html\n<h1>Hello World</h1>\n<p>I am a paragraph.</p>\n\`\`\`\n\nHTML = structure | CSS = styling | JavaScript = behavior`;

  if (has('machine learning','deep learning','neural network'))
    return `🤖 **Machine Learning:**\n\nSubset of AI where computers learn patterns from data without explicit programming.\n\n**Types:** Supervised, Unsupervised, Reinforcement Learning\n\n**Uses:** Image recognition, spam filters, medical diagnosis, recommendations`;

  if (has('artificial intelligence',' ai ','what is ai'))
    return `🤖 **Artificial Intelligence:**\n\nSimulation of human intelligence in computers.\n\n**Branches:** ML, Deep Learning, NLP, Computer Vision\n\n**Real uses:** ChatGPT, medical diagnosis, self-driving cars, recommendations`;

  // ── General Knowledge ──
  if (has('photosynthesis'))
    return `🌿 **Photosynthesis:**\n\n6CO₂ + 6H₂O + Light → Glucose + O₂\n\nPlants use sunlight to make food. Two stages: Light reactions (thylakoids) and Calvin cycle (stroma).`;

  if (has('newton') || (has('gravity') && has('law','force','mass')))
    return `🍎 **Newton's Laws:**\n\n1. Inertia — objects stay at rest or motion unless acted on\n2. F = ma — Force = Mass × Acceleration\n3. Action-Reaction — every action has equal opposite reaction`;

  if (has('capital') && has('india'))
    return `🏛️ The capital of India is **New Delhi**. It houses the President's residence, Parliament, and Supreme Court.`;

  if (has('bangalore','bengaluru','karnataka'))
    return `🏙️ **Bengaluru:** Capital of Karnataka, the Silicon Valley of India 💻. Home to Infosys, Wipro, Flipkart. Population ~13M. RRDCH is located here!`;

  if (has('prime minister') && has('india'))
    return `🇮🇳 India's Prime Minister is **Narendra Modi**, serving since May 2014, leading the BJP.`;

  if (has('math','algebra','calculus','geometry','trigonometry','statistics'))
    return `🔢 **Mathematics:**\n\n• Algebra — equations & variables\n• Calculus — derivatives & integrals\n• Geometry — shapes & angles\n• Statistics — data & probability\n• Trigonometry — sin, cos, tan\n\nWhat specific topic do you need help with?`;

  if (has('covid','corona','pandemic','vaccine','sars'))
    return `🦠 **COVID-19:**\n\nCaused by SARS-CoV-2. Symptoms: fever, cough, fatigue, loss of taste/smell.\n\nPrevention: Vaccination, masks, hand washing, social distancing. Now largely manageable with vaccines.`;

  if (has('climate change','global warming'))
    return `🌍 **Climate Change:**\n\nCaused by CO₂ from fossil fuels, deforestation.\n\nEffects: Rising seas, extreme weather, species loss.\n\nSolutions: Renewable energy, EVs, reforestation, reducing consumption.`;

  // Nothing matched
  return null;
};

// ── Component ────────────────────────────────────────────────
const Chatbot = () => {
  const { i18n } = useTranslation();
  const lang = i18n.language;
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(false);
  const [showTooltip, setShowTooltip] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [input, setInput] = useState('');
  const [messages, setMessages] = useState([
    { role: 'assistant', content: "Hello! 👋 I'm RRDCH Robo-Assist. Ask me anything — dental problems, coding, science, general knowledge, and more!" }
  ]);
  const scrollRef = useRef(null);

  useEffect(() => {
    const t = setTimeout(() => setShowTooltip(false), 8000);
    return () => clearTimeout(t);
  }, []);

  useEffect(() => {
    if (scrollRef.current) scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages, isLoading]);

  const addMessage = (role, content) => setMessages(prev => [...prev, { role, content }]);

  const handleSend = async (e) => {
    e.preventDefault();
    const text = input.trim();
    if (!text || isLoading) return;

    addMessage('user', text);
    setInput('');
    setIsLoading(true);

    // 1. Check local knowledge base first
    const localAnswer = getLocalAnswer(text);

    // 2. Try Groq API
    const apiKey = import.meta.env.VITE_GROQ_API_KEY;
    if (apiKey && apiKey.length > 10) {
      try {
        const res = await fetch('https://api.groq.com/openai/v1/chat/completions', {
          method: 'POST',
          headers: { 'Authorization': `Bearer ${apiKey}`, 'Content-Type': 'application/json' },
          body: JSON.stringify({
            model: 'llama3-8b-8192',
            messages: [
              { role: 'system', content: 'You are RRDCH Robo-Assist, a helpful AI assistant for RRDCH Dental College & Hospital, Bangalore. Answer ANY question helpfully — dental, general knowledge, coding, science, math, etc. For hospital: OPD 9AM-4PM Mon-Sat, helpline 080-28437124, consultation from Rs 100. Be conversational and thorough like ChatGPT.' },
              ...messages.slice(-6),
              { role: 'user', content: text }
            ],
            max_tokens: 1024,
            temperature: 0.7
          })
        });
        if (res.ok) {
          const data = await res.json();
          const reply = data.choices?.[0]?.message?.content;
          if (reply) { addMessage('assistant', reply); setIsLoading(false); return; }
        }
      } catch (err) {
        console.warn('Groq API failed:', err.message);
      }
    }

    // 3. Use local answer or smart fallback
    const smartFallback = `I got your message! I can confidently help with:

🦷 **Dental issues:** Tooth pain, broken tooth, bleeding, braces, root canal, cavities, implants, bad breath, wisdom tooth
🏥 **RRDCH Hospital:** Appointments, fees, timings, departments, emergency
💻 **Tech & Coding:** Python, JavaScript, React, HTML, CSS, AI/ML
🔬 **Science:** Biology, Physics, Chemistry basics
🌍 **General Knowledge:** Geography, current affairs, math

Try asking something like:
• "My tooth is paining what should I do?"
• "How much does a root canal cost?"
• "Explain Python loops"

For urgent dental help: 📞 **080-28437124**`;

    addMessage('assistant', localAnswer || smartFallback);
    setIsLoading(false);
  };

  return (
    <div style={{ position: 'fixed', bottom: 24, right: 24, zIndex: 9999, fontFamily: 'Inter, sans-serif' }}>
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 20, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.95 }}
            style={{ width: 360, height: 520, background: '#fff', borderRadius: 24, boxShadow: '0 25px 50px -12px rgba(0,0,0,0.25)', marginBottom: 16, display: 'flex', flexDirection: 'column', overflow: 'hidden', border: '1px solid rgba(0,53,128,0.1)' }}
          >
            {/* Header */}
            <div style={{ padding: '20px 24px', background: 'linear-gradient(135deg, #003580 0%, #0056b3 100%)', color: '#fff', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
              <div style={{ display: 'flex', alignItems: 'center', gap: 12 }}>
                <div style={{ padding: 8, background: 'rgba(255,255,255,0.15)', borderRadius: 10 }}><RoboIcon size={20} /></div>
                <div>
                  <div style={{ fontWeight: 800, fontSize: 15 }}>RRDCH Robo-Assist</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: 4 }}>
                    <div style={{ width: 6, height: 6, borderRadius: '50%', background: '#10b981' }} />
                    <span style={{ fontSize: 10, fontWeight: 700, opacity: 0.8, textTransform: 'uppercase' }}>Online Support</span>
                  </div>
                </div>
              </div>
              <button onClick={() => setIsOpen(false)} style={{ background: 'rgba(255,255,255,0.1)', border: 'none', color: '#fff', width: 32, height: 32, borderRadius: 8, cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FiX size={18} />
              </button>
            </div>

            {/* Messages */}
            <div ref={scrollRef} style={{ flex: 1, overflowY: 'auto', padding: 24, display: 'flex', flexDirection: 'column', gap: 12, background: '#f8fafc' }}>
              {messages.map((msg, i) => (
                <div key={i} style={{ alignSelf: msg.role === 'user' ? 'flex-end' : 'flex-start', maxWidth: '85%', background: msg.role === 'user' ? '#003580' : '#fff', color: msg.role === 'user' ? '#fff' : '#334155', padding: '12px 16px', borderRadius: msg.role === 'user' ? '20px 20px 4px 20px' : '4px 20px 20px 20px', fontSize: 13, lineHeight: 1.6, fontWeight: 500, boxShadow: '0 2px 8px rgba(0,0,0,0.06)', border: msg.role === 'assistant' ? '1px solid #e2e8f0' : 'none', whiteSpace: 'pre-wrap' }}>
                  {msg.content}
                </div>
              ))}
              {isLoading && (
                <div style={{ alignSelf: 'flex-start', background: '#fff', border: '1px solid #e2e8f0', padding: '12px 18px', borderRadius: '4px 20px 20px 20px', display: 'flex', gap: 4, alignItems: 'center' }}>
                  {[0, 1, 2].map(i => (
                    <motion.div key={i} animate={{ y: [0, -5, 0] }} transition={{ duration: 0.6, repeat: Infinity, delay: i * 0.15 }} style={{ width: 7, height: 7, borderRadius: '50%', background: '#003580', opacity: 0.5 }} />
                  ))}
                </div>
              )}
            </div>

            {/* Quick Actions */}
            <div style={{ padding: '0 16px 12px', background: '#f8fafc', display: 'flex', gap: 8, overflowX: 'auto' }}>
              {[{ label: 'Book Appt', path: '/patient/book' }, { label: 'Live Queue', path: '/patient/queue' }, { label: 'Directions', path: '/patient/directions' }].map((btn, i) => (
                <button key={i} onClick={() => navigate(btn.path)} style={{ background: '#fff', border: '1px solid #e2e8f0', color: '#003580', padding: '6px 12px', borderRadius: 10, fontSize: 11, fontWeight: 700, whiteSpace: 'nowrap', cursor: 'pointer' }}>
                  {btn.label}
                </button>
              ))}
            </div>

            {/* Input */}
            <form onSubmit={handleSend} style={{ padding: '16px 20px', background: '#fff', borderTop: '1px solid #f1f5f9', display: 'flex', gap: 10 }}>
              <input value={input} onChange={e => setInput(e.target.value)} placeholder="Ask me anything..." style={{ flex: 1, border: 'none', background: '#f1f5f9', borderRadius: 14, padding: '12px 16px', fontSize: 13, outline: 'none', fontWeight: 500 }} />
              <button type="submit" disabled={isLoading} style={{ width: 44, height: 44, borderRadius: 12, background: isLoading ? '#94a3b8' : '#003580', color: '#fff', border: 'none', cursor: isLoading ? 'not-allowed' : 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
                <FiSend size={18} />
              </button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <div style={{ position: 'relative' }}>
        <AnimatePresence>
          {showTooltip && !isOpen && (
            <motion.div initial={{ opacity: 0, x: 20 }} animate={{ opacity: 1, x: 0 }} exit={{ opacity: 0 }} style={{ position: 'absolute', right: 70, bottom: 8, background: '#003580', color: '#fff', padding: '10px 16px', borderRadius: 14, fontSize: 12, fontWeight: 700, whiteSpace: 'nowrap', boxShadow: '0 10px 15px -3px rgba(0,0,0,0.15)' }}>
              Need dental help? Ask me! 🦷
              <div style={{ position: 'absolute', right: -6, top: '50%', transform: 'translateY(-50%) rotate(45deg)', width: 12, height: 12, background: '#003580' }} />
            </motion.div>
          )}
        </AnimatePresence>
        <motion.button whileHover={{ scale: 1.08 }} whileTap={{ scale: 0.92 }} onClick={() => { setIsOpen(!isOpen); setShowTooltip(false); }}
          style={{ width: 64, height: 64, borderRadius: 20, background: 'linear-gradient(135deg, #003580 0%, #0056b3 100%)', color: '#fff', border: '2px solid rgba(255,255,255,0.1)', cursor: 'pointer', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 15px 30px -5px rgba(0,53,128,0.3)', position: 'relative' }}>
          <AnimatePresence mode="wait">
            {isOpen ? (
              <motion.div key="close" initial={{ rotate: -90, opacity: 0 }} animate={{ rotate: 0, opacity: 1 }} exit={{ rotate: 90, opacity: 0 }}><FiX size={28} /></motion.div>
            ) : (
              <motion.div key="robo" initial={{ scale: 0.8, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} exit={{ scale: 0.8, opacity: 0 }}><RoboIcon size={32} /></motion.div>
            )}
          </AnimatePresence>
          {!isOpen && (
            <motion.span animate={{ scale: [1, 1.2, 1] }} transition={{ repeat: Infinity, duration: 2 }}
              style={{ position: 'absolute', top: -2, right: -2, width: 16, height: 16, background: '#10b981', borderRadius: '50%', border: '3px solid #fff' }} />
          )}
        </motion.button>
      </div>
    </div>
  );
};

export default Chatbot;

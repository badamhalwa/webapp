const express = require('express');
const cors = require('cors');
const { v4: uuidv4 } = require('uuid');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// ─── In-memory data store ─────────────────────────────────────────────────────

let appointments = [
  { id: 'RRDCH-001', patientName: 'Ravi Kumar', phone: '9876543210', department: 'Orthodontics & Dentofacial Orthopaedics', doctor: 'Dr. Priya Menon', date: '2026-04-15', time: '10:00 AM', status: 'confirmed', reason: 'Braces adjustment' },
  { id: 'RRDCH-002', patientName: 'Sunita Devi', phone: '9876543211', department: 'Periodontics', doctor: 'Dr. Vijay Kumar', date: '2026-04-16', time: '9:00 AM', status: 'booked', reason: 'Gum bleeding' },
  { id: 'RRDCH-003', patientName: 'Mohan Lal', phone: '9876543212', department: 'Conservative Dentistry', doctor: 'Dr. Ramesh Naidu', date: '2026-04-14', time: '3:00 PM', status: 'completed', reason: 'Root canal' },
];

let complaints = [
  { id: 'HC-001', name: 'Rohan M', room: '204', category: 'Plumbing', description: 'Leaking tap', status: 'resolved', date: '2026-04-10' },
  { id: 'HC-002', name: 'Santhosh K', room: '112', category: 'Electrical', description: 'Fan not working', status: 'in-review', date: '2026-04-12' },
];

let feedbacks = [];

// Simulated queue
let queue = [
  { token: 1, name: 'Ravi Kumar', dept: 'Orthodontics', status: 'in-progress', waitTime: 0 },
  { token: 2, name: 'Ananya S', dept: 'Periodontics', status: 'waiting', waitTime: 10 },
  { token: 3, name: 'Prakash N', dept: 'Orthodontics', status: 'waiting', waitTime: 25 },
];

// ─── Middleware: basic validation ─────────────────────────────────────────────
const validate = (fields) => (req, res, next) => {
  const missing = fields.filter(f => !req.body[f]);
  if (missing.length) return res.status(400).json({ error: `Missing required fields: ${missing.join(', ')}` });
  next();
};

// ─── Routes ───────────────────────────────────────────────────────────────────

// Health check
app.get('/api/health', (req, res) => res.json({ status: 'ok', timestamp: new Date().toISOString() }));

// --- Appointments ---
app.get('/api/appointments', (req, res) => {
  const { phone, id } = req.query;
  if (phone) return res.json(appointments.find(a => a.phone === phone) || null);
  if (id) return res.json(appointments.find(a => a.id === id) || null);
  res.json(appointments);
});

app.post('/api/appointments', validate(['patientName', 'phone', 'department', 'doctor', 'date', 'time']), (req, res) => {
  const id = 'RRDCH-' + String(Math.floor(1000 + Math.random() * 9000));
  const appt = { id, ...req.body, status: 'booked', createdAt: new Date().toISOString() };
  appointments.unshift(appt);
  res.status(201).json({ success: true, appointment: appt });
});

app.patch('/api/appointments/:id/status', (req, res) => {
  const idx = appointments.findIndex(a => a.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Appointment not found' });
  appointments[idx].status = req.body.status;
  res.json({ success: true, appointment: appointments[idx] });
});

// --- Feedback ---
app.get('/api/feedback', (req, res) => res.json(feedbacks));

app.post('/api/feedback', validate(['name', 'rating', 'comment']), (req, res) => {
  const fb = { id: uuidv4(), ...req.body, date: new Date().toISOString() };
  feedbacks.push(fb);
  res.status(201).json({ success: true, feedback: fb });
});

// --- Hostel Complaints ---
app.get('/api/complaints', (req, res) => {
  const { id } = req.query;
  if (id) return res.json(complaints.find(c => c.id === id) || null);
  res.json(complaints);
});

app.post('/api/complaints', validate(['name', 'room', 'category', 'description']), (req, res) => {
  const id = 'HC-' + String(Date.now()).slice(-4);
  const complaint = { id, ...req.body, status: 'submitted', date: new Date().toISOString().split('T')[0] };
  complaints.unshift(complaint);
  res.status(201).json({ success: true, complaint });
});

app.patch('/api/complaints/:id/status', (req, res) => {
  const idx = complaints.findIndex(c => c.id === req.params.id);
  if (idx === -1) return res.status(404).json({ error: 'Complaint not found' });
  complaints[idx].status = req.body.status;
  res.json({ success: true, complaint: complaints[idx] });
});

// --- Live Queue ---
app.get('/api/queue', (req, res) => res.json(queue));

// Stats for admin
app.get('/api/stats', (req, res) => {
  res.json({
    totalAppointments: appointments.length,
    todayAppointments: appointments.filter(a => a.date === new Date().toISOString().split('T')[0]).length,
    pendingComplaints: complaints.filter(c => c.status !== 'resolved').length,
    averageRating: feedbacks.length ? (feedbacks.reduce((s, f) => s + f.rating, 0) / feedbacks.length).toFixed(1) : null,
    totalFeedback: feedbacks.length,
    queueSize: queue.length,
  });
});

// ─── Start ────────────────────────────────────────────────────────────────────
app.listen(PORT, () => {
  console.log(`\n🦷 RRDCH Backend API running at http://localhost:${PORT}`);
  console.log(`📋 Endpoints: /api/appointments | /api/feedback | /api/complaints | /api/queue | /api/stats\n`);
});

# RRDCH Website — README

## 🦷 Rajarajeshwari Dental College and Hospital

A full-stack, production-quality website for RRDCH built with React + Tailwind CSS (frontend) and Node.js + Express (backend).

---

## 🚀 How to Run

### Frontend (React + Vite)

```bash
cd client
npm run dev
```

Opens at: **http://localhost:5173**

### Backend (Express API)

```bash
cd server
node server.js
```

Runs at: **http://localhost:5000**

> The frontend automatically proxies `/api/*` requests to the backend via Vite config.

---

## 📁 Project Structure

```
webapp/
├── client/                  # React + Vite frontend
│   └── src/
│       ├── pages/
│       │   ├── Home.jsx
│       │   ├── About.jsx
│       │   ├── Departments.jsx
│       │   ├── Research.jsx
│       │   ├── Achievements.jsx
│       │   ├── VirtualTour.jsx
│       │   ├── Events.jsx
│       │   ├── Admissions.jsx
│       │   ├── SearchPage.jsx
│       │   ├── patient/
│       │   │   ├── AppointmentBooking.jsx
│       │   │   ├── AppointmentTracker.jsx
│       │   │   ├── PatientFollowUp.jsx
│       │   │   ├── LiveQueue.jsx
│       │   │   ├── Directions.jsx
│       │   │   └── Feedback.jsx
│       │   ├── student/
│       │   │   ├── StudentDashboard.jsx
│       │   │   ├── Syllabus.jsx
│       │   │   ├── Schedule.jsx
│       │   │   └── HostelComplaints.jsx
│       │   └── faculty/
│       │       ├── PGDoctorDashboard.jsx
│       │       └── AdminDashboard.jsx
│       ├── components/
│       │   ├── layout/Navbar.jsx
│       │   ├── layout/Footer.jsx
│       │   └── ui/UIComponents.jsx
│       ├── context/AppContext.jsx
│       ├── data/mockData.js
│       ├── i18n/{en,kn}.json
│       └── App.jsx
└── server/
    └── server.js            # Express REST API
```

---

## 📋 Sample Data for Testing

**Appointment Tracker:**
- Booking IDs: `RRDCH-001`, `RRDCH-002`, `RRDCH-003`
- Phone: `9876543210`

**Hostel Complaints:**
- IDs: `HC-001`, `HC-002`, `HC-003`

---

## 🌐 Language Toggle

Click the **ಕನ್ನಡ** button in the top-right navbar to switch to Kannada. All UI labels, navigation, and form labels switch instantly. Click **English** to switch back.

---

## 🔴 Live Updates Simulation

The Live Queue page and PG Doctor Dashboard update automatically every **15 seconds** using `setInterval` in the AppContext. In production, this would be replaced with a WebSocket connection.

---

## 📡 API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| GET | `/api/appointments` | List all appointments |
| GET | `/api/appointments?id=RRDCH-001` | Get by ID |
| GET | `/api/appointments?phone=9876543210` | Get by phone |
| POST | `/api/appointments` | Book new appointment |
| PATCH | `/api/appointments/:id/status` | Update status |
| GET | `/api/feedback` | Get all feedback |
| POST | `/api/feedback` | Submit feedback |
| GET | `/api/complaints` | Get all complaints |
| GET | `/api/complaints?id=HC-001` | Get complaint by ID |
| POST | `/api/complaints` | Submit complaint |
| PATCH | `/api/complaints/:id/status` | Update status |
| GET | `/api/queue` | Get live queue |
| GET | `/api/stats` | Get admin stats |

---

## 🔧 To Connect MongoDB

1. Install mongoose: `npm install mongoose`
2. Add `MONGODB_URI` to `.env` in `server/`
3. Replace in-memory arrays with Mongoose models (schemas match existing data shapes)

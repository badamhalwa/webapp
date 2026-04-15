# 🦷 RRDCH Dental Portal
[![Firebase](https://img.shields.io/badge/backend-Firebase-ffca28?style=flat&logo=firebase)](https://firebase.google.com/)
[![React](https://img.shields.io/badge/frontend-React_19-61dafb?style=flat&logo=react)](https://react.dev/)
[![Tailwind](https://img.shields.io/badge/styling-Tailwind_CSS_V4-38b2ac?style=flat&logo=tailwind-css)](https://tailwindcss.com/)
[![i18n](https://img.shields.io/badge/localization-English_%2F_Kannada-blue?style=flat)](https://www.i18next.com/)

A full-stack, production-ready portal for **RajaRajeswari Dental College & Hospital (RRDCH)**. This platform provides real-time dental services for patients, comprehensive administrative tools for doctors, and a dedicated hub for students.

---

## ✨ Key Features

### 👨‍⚕️ Patient Services
- **Real-time Appointment Booking:** Book dental consultations across various specialized departments.
- **Appointment Tracker:** Track the status of your booking using a unique ID or phone number.
- **Live Patient Queue:** View real-time wait times and token numbers for different OPD departments.
- **Interactive Directions:** Integrated floor-by-floor directions to navigate the hospital.
- **Digital Feedback:** Voice your experience directly to the administration.

### 🎓 Student Hub
- **Hostel Complaint Management:** Students can report maintenance issues and track resolution status in real-time.
- **Academic Resources:** Quick access to syllabus, schedules, and official notices.
- **Student Dashboard:** Personal notification center for campus updates.

### 📊 Staff & Admin Dashboards
- **PG Doctor Interface:** Manage patient statuses and update live queues on the fly.
- **Admin Command Center:** High-level analytics on appointments, feedback, and campus maintenance.

### 🌐 Advanced UX
- **Bi-lingual Support:** Seamless toggle between **English** and **Kannada** (ಕನ್ನಡ).
- **Dynamic Animations:** Powered by `framer-motion` for a premium, interactive feel.
- **Zero-Latency Updates:** Powered by **Firebase Firestore** real-time listeners.

---

## 🛠 Tech Stack

- **Frontend:** React 19, Vite 8, Tailwind CSS V4
- **Backend:** Firebase Firestore (Real-time DB)
- **Localization:** i18next
- **Animations:** Framer Motion
- **Icons:** React Icons

---

## 🚀 Getting Started

### Prerequisites
- Node.js (Latest LTS)
- npm or yarn

### Installation

1. **Clone the repository:**
   ```bash
   git clone <repository-url>
   cd webapp
   ```

2. **Frontend Setup:**
   ```bash
   cd client
   npm install
   npm run dev
   ```
   The app will be available at: **http://localhost:5173**

3. **Backend Configuration:**
   The project uses Firebase. The configuration is located at `client/src/firebase.js`. 
   > **Note:** For development, the Firebase keys are provided for easy sync. In a production environment, ensure you use environment variables.

---

## 📁 Project Structure

```text
webapp/
├── client/                  # React + Vite frontend
│   ├── src/
│   │   ├── pages/           # All application routes
│   │   │   ├── patient/     # Patient-facing portal
│   │   │   ├── student/     # Student/Hostel portal
│   │   │   └── faculty/     # Admin & Doctor dashboards
│   │   ├── components/      # Reusable UI & Layout components
│   │   ├── context/         # AppState with Firebase Listeners
│   │   ├── i18n/            # Localization files (en/kn)
│   │   └── firebase.js      # Firebase Initialization
│   └── public/              # Static assets
└── server/                  # Legacy Express API (Optional)
```

---

## 🎥 Live Updates Logic

This project leverages Firestore's `onSnapshot` to provide real-time updates without page refreshes. Whether it's a new appointment or a status update on a hostel complaint, every change is reflected across all connected clients instantly.

---

## 🤝 Contribution

For internal development at RRDCH. Ensure that all UI changes are localized in both English and Kannada JSON files.

---

## ⚖️ License
Internal Project - RajaRajeswari Dental College & Hospital.

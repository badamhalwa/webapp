import React, { Suspense } from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { Toaster } from 'react-hot-toast';
import { AppProvider } from './context/AppContext';
import './i18n/i18n';

import Navbar from './components/layout/Navbar';
import Footer from './components/layout/Footer';
import StudentGuard from './components/auth/StudentGuard'; // Added import
import { LoadingSpinner } from './components/ui/UIComponents';


// Pages
import Home from './pages/Home';
import About from './pages/About';
import Departments from './pages/Departments';
import Research from './pages/Research';
import Achievements from './pages/Achievements';
import VirtualTour from './pages/VirtualTour';
import Events from './pages/Events';
import Admissions from './pages/Admissions';
import SearchPage from './pages/SearchPage';
import Faculty from './pages/Faculty';

// Patient pages
import AppointmentBooking from './pages/patient/AppointmentBooking';
import AppointmentTracker from './pages/patient/AppointmentTracker';
import PatientFollowUp from './pages/patient/PatientFollowUp';
import LiveQueue from './pages/patient/LiveQueue';
import Directions from './pages/patient/Directions';
import Feedback from './pages/patient/Feedback';

// Student pages
import StudentDashboard from './pages/student/StudentDashboard';
import Syllabus from './pages/student/Syllabus';
import Schedule from './pages/student/Schedule';
import HostelComplaints from './pages/student/HostelComplaints';

// Faculty pages
import PGDoctorDashboard from './pages/faculty/PGDoctorDashboard';
import AdminDashboard from './pages/faculty/AdminDashboard';

function App() {
  return (
    <AppProvider>
      <BrowserRouter>
        <div className="flex flex-col min-h-screen">
          <Navbar />
          <main className="flex-1">
            <Suspense fallback={<LoadingSpinner />}>
              <Routes>
                {/* Public */}
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/departments" element={<Departments />} />
                <Route path="/research" element={<Research />} />
                <Route path="/achievements" element={<Achievements />} />
                <Route path="/tour" element={<VirtualTour />} />
                <Route path="/events" element={<Events />} />
                <Route path="/admissions" element={<Admissions />} />
                <Route path="/search" element={<SearchPage />} />
                <Route path="/faculty" element={<Faculty />} />

                {/* Patient */}
                <Route path="/patient/book" element={<AppointmentBooking />} />
                <Route path="/patient/track" element={<AppointmentTracker />} />
                <Route path="/patient/followup" element={<PatientFollowUp />} />
                <Route path="/patient/queue" element={<LiveQueue />} />
                <Route path="/patient/directions" element={<Directions />} />
                <Route path="/patient/feedback" element={<Feedback />} />

                {/* Student */}
                <Route path="/student/*" element={
                  <StudentGuard>
                    <Routes>
                      <Route path="dashboard" element={<StudentDashboard />} />
                      <Route path="syllabus" element={<Syllabus />} />
                      <Route path="schedule" element={<Schedule />} />
                      <Route path="hostel" element={<HostelComplaints />} />
                    </Routes>
                  </StudentGuard>
                } />

                {/* Faculty */}
                <Route path="/faculty/pg" element={<PGDoctorDashboard />} />
                <Route path="/faculty/admin" element={<AdminDashboard />} />

                {/* 404 */}
                <Route path="*" element={
                  <div className="min-h-[60vh] flex items-center justify-center flex-col gap-4 text-center px-4">
                    <div className="text-8xl">🦷</div>
                    <h1 className="text-4xl font-bold text-gray-900">404 — Page Not Found</h1>
                    <p className="text-gray-500">The page you're looking for doesn't exist.</p>
                    <a href="/" className="bg-rrdch-blue text-white px-6 py-3 rounded-xl font-semibold hover:bg-rrdch-blue-dark transition-colors mt-2">Go to Home</a>
                  </div>
                } />
              </Routes>
            </Suspense>
          </main>
          <Footer />
        </div>
        <Toaster position="top-right" toastOptions={{ style: { borderRadius: '12px', fontFamily: 'Inter, sans-serif' } }}/>
      </BrowserRouter>
    </AppProvider>
  );
}

export default App;

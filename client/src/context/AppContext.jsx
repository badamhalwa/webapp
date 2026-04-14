import React, { createContext, useContext, useState, useEffect } from 'react';
import { mockAppointments, queueData, doctorAvailability } from '../data/mockData';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [appointments, setAppointments] = useState(() => {
    const saved = localStorage.getItem('rrdch-appointments');
    return saved ? JSON.parse(saved) : mockAppointments;
  });
  const [hostelComplaints, setHostelComplaints] = useState(() => {
    const saved = localStorage.getItem('rrdch-complaints');
    return saved ? JSON.parse(saved) : [];
  });
  const [feedbacks, setFeedbacks] = useState([]);
  const [queue, setQueue] = useState(queueData);
  const [availability, setAvailability] = useState(doctorAvailability);
  const [notifications, setNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);

  // Simulate live updates — polls every 60 seconds (production: replace with WebSocket)
  useEffect(() => {
    const interval = setInterval(() => {
      setQueue(prev => {
        const updated = [...prev];
        if (updated.length > 0) {
          updated.forEach((item, i) => {
            updated[i] = { ...item, waitTime: Math.max(0, item.waitTime - 1) };
          });
        }
        return updated;
      });

      // Cycle doctor statuses
      setAvailability(prev =>
        prev.map(doc => ({
          ...doc,
          status: doc.status === 'break' ? 'available' : doc.status,
        }))
      );

      // Push notification
      const msgs = [
        'Token #1 is now being attended in Orthodontics',
        'Dr. Kavitha Sharma is available — OPD Room 3',
        'Queue at Periodontics: 3 patients waiting',
        'Free dental camp today 12 PM — OPD Lobby',
        'Dr. Vijay Kumar now available in Periodontics',
      ];
      const msg = msgs[Math.floor(Math.random() * msgs.length)];
      setNotifications(prev => [{ id: Date.now(), msg, time: new Date().toLocaleTimeString() }, ...prev.slice(0, 4)]);
    }, 60000); // 60-second polling

    return () => clearInterval(interval);
  }, []);

  const addAppointment = (appt) => {
    const updated = [appt, ...appointments];
    setAppointments(updated);
    localStorage.setItem('rrdch-appointments', JSON.stringify(updated));
  };

  const addComplaint = (complaint) => {
    const updated = [complaint, ...hostelComplaints];
    setHostelComplaints(updated);
    localStorage.setItem('rrdch-complaints', JSON.stringify(updated));
  };

  const addFeedback = (fb) => setFeedbacks(prev => [fb, ...prev]);

  const getAppointment = (query) => {
    return appointments.find(a =>
      a.id.toLowerCase() === query.toLowerCase() ||
      a.phone === query
    );
  };

  const getComplaint = (id) => hostelComplaints.find(c => c.id === id);

  return (
    <AppContext.Provider value={{
      appointments, addAppointment, getAppointment,
      hostelComplaints, addComplaint, getComplaint,
      feedbacks, addFeedback,
      queue, availability,
      notifications,
      searchQuery, setSearchQuery,
      searchOpen, setSearchOpen,
    }}>
      {children}
    </AppContext.Provider>
  );
};

import React, { createContext, useContext, useState, useEffect } from 'react';
import { db } from '../firebase';
import { 
  collection, 
  onSnapshot, 
  addDoc, 
  query, 
  orderBy, 
  serverTimestamp,
  updateDoc,
  doc
} from 'firebase/firestore';
import { mockAppointments, queueData, doctorAvailability } from '../data/mockData';

const AppContext = createContext();

export const useApp = () => useContext(AppContext);

export const AppProvider = ({ children }) => {
  const [appointments, setAppointments] = useState([]);
  const [hostelComplaints, setHostelComplaints] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [queue, setQueue] = useState([]);
  const [availability, setAvailability] = useState(doctorAvailability);
  const [notifications, setNotifications] = useState([]);
  const [searchQuery, setSearchQuery] = useState('');
  const [searchOpen, setSearchOpen] = useState(false);
  const [loading, setLoading] = useState(true);

  // --- Real-time Firestore Listeners ---
  useEffect(() => {
    // 1. Appointments
    const appointmentsQuery = query(collection(db, 'appointments'), orderBy('createdAt', 'desc'));
    const unsubAppointments = onSnapshot(appointmentsQuery, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setAppointments(data); // Removed mockAppointments fallback
      setLoading(false);
    }, (err) => console.error("Firestore Error (Appointments):", err));

    // 2. Complaints
    const complaintsQuery = query(collection(db, 'complaints'), orderBy('createdAt', 'desc'));
    const unsubComplaints = onSnapshot(complaintsQuery, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setHostelComplaints(data);
    }, (err) => console.error("Firestore Error (Complaints):", err));

    // 3. Feedback
    const feedbackQuery = query(collection(db, 'feedbacks'), orderBy('createdAt', 'desc'));
    const unsubFeedback = onSnapshot(feedbackQuery, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setFeedbacks(data);
    }, (err) => console.error("Firestore Error (Feedback):", err));

    // 4. Queue
    const queueQuery = query(collection(db, 'queue'), orderBy('token', 'asc'));
    const unsubQueue = onSnapshot(queueQuery, (snapshot) => {
      const data = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setQueue(data); // Removed queueData fallback
    }, (err) => console.error("Firestore Error (Queue):", err));


    return () => {
      unsubAppointments();
      unsubComplaints();
      unsubFeedback();
      unsubQueue();
    };
  }, []);

  // Simulated effects for localized state (notifications, doctor availability)
  useEffect(() => {
    const interval = setInterval(() => {
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
    }, 60000);

    return () => clearInterval(interval);
  }, []);

  // --- Firestore Data Operations ---
  const addAppointment = async (appt) => {
    try {
      await addDoc(collection(db, 'appointments'), {
        ...appt,
        createdAt: serverTimestamp()
      });
    } catch (err) {
      console.error("Error adding appointment:", err);
      throw err;
    }
  };

  const addComplaint = async (complaint) => {
    try {
      await addDoc(collection(db, 'complaints'), {
        ...complaint,
        createdAt: serverTimestamp()
      });
    } catch (err) {
      console.error("Error adding complaint:", err);
      throw err;
    }
  };

  const updateAppointmentStatus = async (appointmentId, newStatus) => {
    try {
      const apptRref = doc(db, 'appointments', appointmentId);
      await updateDoc(apptRref, {
        status: newStatus,
        updatedAt: serverTimestamp()
      });
    } catch (err) {
      console.error("Error updating status:", err);
      throw err;
    }
  };

  const addFeedback = async (fb) => {
    try {
      await addDoc(collection(db, 'feedbacks'), {
        ...fb,
        createdAt: serverTimestamp()
      });
    } catch (err) {
      console.error("Error adding feedback:", err);
      throw err;
    }
  };

  const getAppointment = (query) => {
    if (!query) return null;
    const q = query.toLowerCase().trim();
    return appointments.find(a =>
      (a.id && a.id.toLowerCase() === q) ||
      (a.bookingId && a.bookingId.toLowerCase() === q) ||
      (a.phone && a.phone.trim() === q)
    );
  };

  const getComplaint = (id) => hostelComplaints.find(c => c.id === id);

  return (
    <AppContext.Provider value={{
      appointments, addAppointment, updateAppointmentStatus, getAppointment,
      hostelComplaints, addComplaint, getComplaint,
      feedbacks, addFeedback,
      queue, availability,
      notifications,
      searchQuery, setSearchQuery,
      searchOpen, setSearchOpen,
      loading
    }}>
      {children}
    </AppContext.Provider>
  );
};


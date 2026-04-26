import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { useApp } from '../../context/AppContext';
import { db } from '../../firebase';
import { doc, updateDoc, arrayUnion, serverTimestamp } from 'firebase/firestore';
import { FiSearch, FiUser, FiCalendar, FiClock, FiFileText, FiPlus, FiArrowLeft, FiActivity } from 'react-icons/fi';
import { Card, Button, FormInput } from '../../components/ui/UIComponents';
import toast from 'react-hot-toast';

const PatientDirectory = () => {
  const { appointments } = useApp();
  const [searchId, setSearchId] = useState('');
  const [searched, setSearched] = useState(false);
  const [patientData, setPatientData] = useState(null);
  const [patientHistory, setPatientHistory] = useState([]);
  
  // Note Modal State
  const [activeApptId, setActiveApptId] = useState(null);
  const [newNote, setNewNote] = useState('');
  const [addingNote, setAddingNote] = useState(false);

  // Derive unique patients
  const uniquePatients = React.useMemo(() => {
    const map = new Map();
    appointments.forEach(appt => {
      if (appt.patientId) {
        if (!map.has(appt.patientId)) {
          map.set(appt.patientId, {
            id: appt.patientId,
            name: appt.name || appt.patientName,
            phone: appt.phone,
            latestDate: appt.date,
            totalVisits: 1
          });
        } else {
          const p = map.get(appt.patientId);
          p.totalVisits += 1;
          if (new Date(appt.date) > new Date(p.latestDate)) {
            p.latestDate = appt.date;
            p.name = appt.name || appt.patientName;
          }
        }
      }
    });
    return Array.from(map.values()).sort((a, b) => new Date(b.latestDate) - new Date(a.latestDate));
  }, [appointments]);

  const handleSearch = (e) => {
    e.preventDefault();
    if (!searchId.trim()) return;
    
    // Find all appointments for this patient ID
    const history = appointments.filter(a => a.patientId === searchId.trim());
    
    if (history.length > 0) {
      // Sort by date descending
      history.sort((a, b) => new Date(b.date) - new Date(a.date));
      // Use the most recent appointment for demographic data
      setPatientData({
        name: history[0].name,
        phone: history[0].phone,
        dob: history[0].dob || 'Not Provided',
        gender: history[0].gender || 'Not Provided',
        patientId: history[0].patientId
      });
      setPatientHistory(history);
    } else {
      setPatientData(null);
      setPatientHistory([]);
    }
    setSearched(true);
  };

  const handleAddNote = async (e) => {
    e.preventDefault();
    if (!newNote.trim() || !activeApptId) return;
    
    setAddingNote(true);
    try {
      const apptRef = doc(db, 'appointments', activeApptId);
      await updateDoc(apptRef, {
        clinicalNotes: arrayUnion({
          text: newNote,
          date: new Date().toISOString(),
          addedBy: 'Admin'
        }),
        updatedAt: serverTimestamp()
      });
      toast.success("Clinical note added");
      setNewNote('');
      setActiveApptId(null);
    } catch (err) {
      console.error(err);
      toast.error("Failed to add note");
    } finally {
      setAddingNote(false);
    }
  };

  return (
    <div style={{ background: '#f8fafc', minHeight: '100vh', paddingBottom: '4rem' }}>
      {/* ── Page Hero ── */}
      <section style={{ background: '#003580', padding: '2rem 2rem 3rem' }}>
        <div className="max-w-7xl mx-auto">
          <Link to="/admin" style={{ color: 'rgba(255,255,255,0.7)', textDecoration: 'none', display: 'inline-flex', alignItems: 'center', gap: 6, fontSize: 13, marginBottom: 16 }}>
            <FiArrowLeft /> Back to Dashboard
          </Link>
          <h1 style={{ fontFamily: 'Manrope, sans-serif', fontWeight: 800, fontSize: '2rem', color: '#ffffff', marginBottom: 8 }}>
            Patient Directory & Tracking
          </h1>
          <p style={{ fontSize: 14, color: 'rgba(255,255,255,0.65)', maxWidth: 600 }}>
            Search via the 5-digit Patient ID to view full medical history, past appointments, follow-ups, and add clinical notes.
          </p>
        </div>
      </section>

      <div className="max-w-5xl mx-auto px-4 -mt-8">
        <Card className="p-6 mb-8 shadow-xl">
          <form onSubmit={handleSearch} className="flex gap-4 items-end">
            <div className="flex-1">
              <FormInput 
                id="search-id"
                label="5-Digit Patient ID"
                placeholder="e.g. 12345"
                value={searchId}
                onChange={e => setSearchId(e.target.value)}
              />
            </div>
            <Button type="submit" className="h-[46px] px-8 bg-rrdch-blue hover:bg-blue-800 text-white">
              <FiSearch className="mr-2" /> Lookup Patient
            </Button>
          </form>
        </Card>

        {searched && !patientData && (
          <div className="text-center py-16 text-gray-500 bg-white rounded-xl border border-gray-100">
            <FiUser size={48} className="mx-auto mb-4 opacity-20" />
            <p className="text-lg font-bold">Patient Not Found</p>
            <p className="text-sm mt-1">No records found for Patient ID: {searchId}</p>
            <button onClick={() => {setSearched(false); setSearchId('');}} className="mt-4 text-blue-600 font-bold hover:underline">View All Patients</button>
          </div>
        )}

        {!searched && !patientData && (
          <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }}>
            <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
              <FiUser className="text-gray-400" /> Patient Database ({uniquePatients.length})
            </h3>
            <Card className="overflow-hidden bg-white">
              <div className="overflow-x-auto">
                <table className="w-full text-left border-collapse">
                  <thead>
                    <tr className="bg-gray-50 text-[10px] font-black text-gray-500 uppercase tracking-wider">
                      <th className="p-4 border-b">Patient ID</th>
                      <th className="p-4 border-b">Name</th>
                      <th className="p-4 border-b">Phone</th>
                      <th className="p-4 border-b">Last Visit</th>
                      <th className="p-4 border-b text-center">Total Visits</th>
                      <th className="p-4 border-b"></th>
                    </tr>
                  </thead>
                  <tbody>
                    {uniquePatients.length === 0 ? (
                      <tr>
                        <td colSpan="6" className="p-8 text-center text-gray-400 italic">No patients registered yet.</td>
                      </tr>
                    ) : (
                      uniquePatients.map((p) => (
                        <tr key={p.id} className="hover:bg-gray-50 transition-colors border-b last:border-0">
                          <td className="p-4 text-sm font-black text-blue-700 tracking-widest">{p.id}</td>
                          <td className="p-4 text-sm font-bold text-gray-900">{p.name || 'Unknown'}</td>
                          <td className="p-4 text-sm text-gray-600">{p.phone || '—'}</td>
                          <td className="p-4 text-sm text-gray-600">{p.latestDate || '—'}</td>
                          <td className="p-4 text-sm font-bold text-center text-gray-700">{p.totalVisits}</td>
                          <td className="p-4 text-right">
                            <button 
                              onClick={() => {
                                setSearchId(p.id);
                                handleSearch({ preventDefault: () => {} });
                              }}
                              className="text-xs font-bold text-blue-600 hover:text-blue-800 bg-blue-50 hover:bg-blue-100 px-3 py-1 rounded"
                            >
                              View Dossier
                            </button>
                          </td>
                        </tr>
                      ))
                    )}
                  </tbody>
                </table>
              </div>
            </Card>
          </motion.div>
        )}

        {patientData && (
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }}>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-6">
              {/* Patient Demographics */}
              <Card className="p-6 md:col-span-1 border-t-4 border-rrdch-blue bg-white">
                <div className="w-16 h-16 bg-blue-50 text-blue-600 rounded-full flex items-center justify-center mb-4">
                  <FiUser size={28} />
                </div>
                <div className="flex justify-between items-start mb-1">
                  <h2 className="text-2xl font-bold text-gray-900">{patientData.name}</h2>
                  <button onClick={() => {setPatientData(null); setSearched(false); setSearchId('');}} className="text-[10px] text-gray-400 hover:text-gray-600 uppercase font-bold underline">Close</button>
                </div>
                <div className="text-xs font-bold text-blue-600 bg-blue-50 px-2 py-1 rounded inline-block mb-6">
                  ID: {patientData.patientId}
                </div>
                
                <div className="space-y-4">
                  <div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">Phone</div>
                    <div className="text-sm font-medium text-gray-800">{patientData.phone}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">Date of Birth</div>
                    <div className="text-sm font-medium text-gray-800">{patientData.dob}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">Gender</div>
                    <div className="text-sm font-medium text-gray-800 capitalize">{patientData.gender}</div>
                  </div>
                  <div>
                    <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">Total Visits</div>
                    <div className="text-sm font-medium text-gray-800">{patientHistory.length} Recorded</div>
                  </div>
                </div>
              </Card>

              {/* Patient History Timeline */}
              <div className="md:col-span-2">
                <div className="flex items-center gap-2 mb-4 px-2">
                  <FiActivity className="text-gray-400" />
                  <h3 className="text-lg font-bold text-gray-800">Visit History</h3>
                </div>
                
                <div className="space-y-4">
                  {patientHistory.map((appt) => (
                    <Card key={appt.id} className="p-5 bg-white overflow-hidden relative">
                      <div className={`absolute top-0 left-0 w-1 h-full ${appt.status === 'Completed' ? 'bg-green-500' : appt.status === 'Confirmed' ? 'bg-blue-500' : 'bg-orange-400'}`} />
                      
                      <div className="flex justify-between items-start mb-4 pl-2">
                        <div>
                          <div className="text-[10px] text-gray-400 font-bold uppercase mb-1">Booking Ref: {appt.bookingId}</div>
                          <div className="font-bold text-gray-900 text-lg">Dept {appt.departmentId}</div>
                        </div>
                        <span className={`text-xs font-bold px-2 py-1 rounded ${
                          appt.status === 'Completed' ? 'bg-green-50 text-green-700' : 
                          appt.status === 'Confirmed' ? 'bg-blue-50 text-blue-700' : 'bg-orange-50 text-orange-700'
                        }`}>
                          {appt.status?.toUpperCase() || 'PENDING'}
                        </span>
                      </div>

                      <div className="grid grid-cols-2 gap-4 mb-4 pl-2">
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FiCalendar className="text-gray-400" /> {appt.date}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-gray-600">
                          <FiClock className="text-gray-400" /> {appt.timeSlot}
                        </div>
                      </div>

                      <div className="pl-2 border-t border-gray-50 pt-4 mt-2">
                        <div className="text-[10px] text-gray-400 font-bold uppercase mb-3 flex items-center justify-between">
                          <span>Clinical Notes & Medications</span>
                          <button 
                            onClick={() => setActiveApptId(activeApptId === appt.id ? null : appt.id)}
                            className="text-blue-600 hover:text-blue-800 flex items-center gap-1"
                          >
                            <FiPlus size={12} /> Add Note
                          </button>
                        </div>

                        {appt.clinicalNotes && appt.clinicalNotes.length > 0 ? (
                          <div className="space-y-3 mb-4">
                            {appt.clinicalNotes.map((note, idx) => (
                              <div key={idx} className="bg-gray-50 p-3 rounded-lg text-sm text-gray-700">
                                <div className="text-[10px] text-gray-400 mb-1">{new Date(note.date).toLocaleString()} by {note.addedBy}</div>
                                {note.text}
                              </div>
                            ))}
                          </div>
                        ) : (
                          <div className="text-xs text-gray-400 italic mb-4">No notes recorded for this visit.</div>
                        )}

                        {/* Add Note Form */}
                        {activeApptId === appt.id && (
                          <form onSubmit={handleAddNote} className="bg-blue-50/50 p-3 rounded-lg border border-blue-100 flex gap-2 items-start mt-2">
                            <textarea 
                              className="flex-1 text-sm p-2 rounded border border-gray-200 focus:outline-none focus:border-blue-400"
                              placeholder="Enter follow-up instructions, diagnosis, or medications..."
                              rows={2}
                              value={newNote}
                              onChange={e => setNewNote(e.target.value)}
                              required
                            />
                            <Button type="submit" disabled={addingNote} className="h-full bg-blue-600 text-white text-xs px-3">
                              {addingNote ? 'Saving...' : 'Save'}
                            </Button>
                          </form>
                        )}
                      </div>
                    </Card>
                  ))}
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </div>
    </div>
  );
};

export default PatientDirectory;

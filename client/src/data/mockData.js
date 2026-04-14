// Mock data for the entire RRDCH application

export const departments = [
  { id: 1, name: 'Oral Medicine & Radiology', icon: '🦷', color: '#1A4B8C', desc: 'Diagnosis of oral diseases using advanced radiographic techniques.', hod: 'Dr. Kavitha Sharma', faculty: 12, patients: 2400 },
  { id: 2, name: 'Conservative Dentistry & Endodontics', icon: '🔬', color: '#0D9488', desc: 'Root canal treatments, cavity restorations and preservation of natural teeth.', hod: 'Dr. Ramesh Naidu', faculty: 10, patients: 3100 },
  { id: 3, name: 'Orthodontics & Dentofacial Orthopaedics', icon: '😁', color: '#7C3AED', desc: 'Correction of teeth alignment and jaw discrepancies.', hod: 'Dr. Priya Menon', faculty: 9, patients: 1800 },
  { id: 4, name: 'Oral & Maxillofacial Surgery', icon: '⚕️', color: '#DC2626', desc: 'Surgical treatment of diseases, injuries and defects of the head, neck, face and jaw.', hod: 'Dr. Suresh Kumar', faculty: 11, patients: 2200 },
  { id: 5, name: 'Prosthodontics & Crown & Bridge', icon: '🦷', color: '#D97706', desc: 'Restoration and replacement of missing teeth with prosthetics.', hod: 'Dr. Anitha Rao', faculty: 8, patients: 1600 },
  { id: 6, name: 'Periodontics', icon: '💉', color: '#059669', desc: 'Treatment of gum diseases and supporting structures of teeth.', hod: 'Dr. Vijay Kumar', faculty: 7, patients: 2800 },
  { id: 7, name: 'Paediatric & Preventive Dentistry', icon: '👶', color: '#DB2777', desc: 'Specialized dental care for children and preventive oral health.', hod: 'Dr. Meena Reddy', faculty: 8, patients: 1900 },
  { id: 8, name: 'Oral Pathology & Microbiology', icon: '🔭', color: '#0891B2', desc: 'Study and diagnosis of oral diseases at cellular and tissue level.', hod: 'Dr. Arun Prasad', faculty: 6, patients: 950 },
  { id: 9, name: 'Public Health Dentistry', icon: '🌍', color: '#16A34A', desc: 'Community oral health programs, epidemiology and preventive strategies.', hod: 'Dr. Shobha Rani', faculty: 7, patients: 1200 },
];

export const doctors = {
  1: [{ id: 'd1', name: 'Dr. Kavitha Sharma', qualification: 'MDS', slots: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'] },
      { id: 'd2', name: 'Dr. Mohan R', qualification: 'MDS', slots: ['9:30 AM', '10:30 AM', '11:30 AM', '2:30 PM'] }],
  2: [{ id: 'd3', name: 'Dr. Ramesh Naidu', qualification: 'MDS', slots: ['9:00 AM', '10:00 AM', '11:00 AM', '3:00 PM'] },
      { id: 'd4', name: 'Dr. Suma K', qualification: 'MDS', slots: ['9:00 AM', '10:30 AM', '2:00 PM', '4:00 PM'] }],
  3: [{ id: 'd5', name: 'Dr. Priya Menon', qualification: 'MDS', slots: ['10:00 AM', '11:00 AM', '2:00 PM', '3:00 PM'] }],
  4: [{ id: 'd6', name: 'Dr. Suresh Kumar', qualification: 'MDS, FDSRCS', slots: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM'] },
      { id: 'd7', name: 'Dr. Ravi S', qualification: 'MDS', slots: ['2:00 PM', '3:00 PM', '4:00 PM'] }],
  5: [{ id: 'd8', name: 'Dr. Anitha Rao', qualification: 'MDS', slots: ['9:00 AM', '10:00 AM', '11:00 AM'] }],
  6: [{ id: 'd9', name: 'Dr. Vijay Kumar', qualification: 'MDS', slots: ['9:00 AM', '10:30 AM', '2:00 PM', '3:30 PM'] }],
  7: [{ id: 'd10', name: 'Dr. Meena Reddy', qualification: 'MDS', slots: ['9:00 AM', '10:00 AM', '11:00 AM', '2:00 PM'] }],
  8: [{ id: 'd11', name: 'Dr. Arun Prasad', qualification: 'MDS', slots: ['10:00 AM', '11:00 AM', '3:00 PM'] }],
  9: [{ id: 'd12', name: 'Dr. Shobha Rani', qualification: 'MDS, MPH', slots: ['9:00 AM', '11:00 AM', '2:00 PM'] }],
};

export const mockAppointments = [
  { id: 'RRDCH-001', patientName: 'Ravi Kumar', phone: '9876543210', department: 'Orthodontics & Dentofacial Orthopaedics', doctor: 'Dr. Priya Menon', date: '2026-04-15', time: '10:00 AM', status: 'confirmed', reason: 'Braces adjustment' },
  { id: 'RRDCH-002', patientName: 'Sunita Devi', phone: '9876543211', department: 'Periodontics', doctor: 'Dr. Vijay Kumar', date: '2026-04-16', time: '9:00 AM', status: 'booked', reason: 'Gum bleeding' },
  { id: 'RRDCH-003', patientName: 'Mohan Lal', phone: '9876543212', department: 'Conservative Dentistry & Endodontics', doctor: 'Dr. Ramesh Naidu', date: '2026-04-14', time: '3:00 PM', status: 'completed', reason: 'Root canal treatment' },
  { id: 'RRDCH-004', patientName: 'Deepa M', phone: '9876543213', department: 'Paediatric & Preventive Dentistry', doctor: 'Dr. Meena Reddy', date: '2026-04-17', time: '11:00 AM', status: 'booked', reason: 'Child checkup' },
];

export const queueData = [
  { token: 1, name: 'Ravi Kumar', dept: 'Orthodontics', status: 'in-progress', waitTime: 0 },
  { token: 2, name: 'Ananya S', dept: 'Periodontics', status: 'waiting', waitTime: 10 },
  { token: 3, name: 'Prakash N', dept: 'Orthodontics', status: 'waiting', waitTime: 25 },
  { token: 4, name: 'Lakshmi K', dept: 'Conservative', status: 'waiting', waitTime: 40 },
  { token: 5, name: 'Venkat R', dept: 'Oral Surgery', status: 'waiting', waitTime: 55 },
];

export const doctorAvailability = [
  { name: 'Dr. Kavitha Sharma', dept: 'Oral Medicine', status: 'available', currentPatient: null },
  { name: 'Dr. Ramesh Naidu', dept: 'Conservative', status: 'busy', currentPatient: 'Mohan L' },
  { name: 'Dr. Priya Menon', dept: 'Orthodontics', status: 'busy', currentPatient: 'Ravi Kumar' },
  { name: 'Dr. Suresh Kumar', dept: 'Oral Surgery', status: 'available', currentPatient: null },
  { name: 'Dr. Anitha Rao', dept: 'Prosthodontics', status: 'break', currentPatient: null },
  { name: 'Dr. Vijay Kumar', dept: 'Periodontics', status: 'available', currentPatient: null },
];

export const syllabusData = [
  { year: 'BDS 1st Year', subjects: ['General Human Anatomy', 'General Human Physiology & Biochemistry', 'Dental Anatomy & Oral Histology', 'Dental Materials'], updated: '2025-01-10' },
  { year: 'BDS 2nd Year', subjects: ['General Pathology & Microbiology', 'Dental Pharmacology', 'Preclinical Conservative Dentistry', 'Preclinical Prosthodontics'], updated: '2025-01-15' },
  { year: 'BDS 3rd Year', subjects: ['Oral Pathology & Oral Microbiology', 'Oral Medicine & Radiology', 'Conservative Dentistry & Endodontics', 'Oral & Maxillofacial Surgery'], updated: '2025-02-01' },
  { year: 'BDS Final Year', subjects: ['Orthodontics', 'Periodontics', 'Prosthodontics', 'Paediatric Dentistry', 'Public Health Dentistry'], updated: '2025-02-20' },
  { year: 'MDS (PG)', subjects: ['Advanced Clinical Sciences', 'Research Methodology', 'Specialty Subjects', 'Evidence Based Dentistry'], updated: '2025-03-05' },
];

export const scheduleData = {
  'BDS 1st Year': [
    { day: 'Monday', periods: ['Anatomy (8-9)', 'Physiology (9-10)', 'Dental Anatomy (10-11)', 'Lunch', 'Biochemistry (12-1)', 'Dental Materials Lab (2-4)'] },
    { day: 'Tuesday', periods: ['Physiology (8-9)', 'Anatomy (9-10)', 'Dental Materials (10-11)', 'Lunch', 'Anatomy Lab (12-1)', 'Histology Lab (2-4)'] },
    { day: 'Wednesday', periods: ['Dental Anatomy (8-9)', 'Biochemistry (9-10)', 'Physiology (10-11)', 'Lunch', 'Dental Materials Lab (12-1)', 'Clinical (2-4)'] },
    { day: 'Thursday', periods: ['Biochemistry (8-9)', 'Dental Materials (9-10)', 'Anatomy (10-11)', 'Lunch', 'Physiology Lab (12-1)', 'Seminar (2-4)'] },
    { day: 'Friday', periods: ['Physiology (8-9)', 'Dental Anatomy (9-10)', 'Biochemistry (10-11)', 'Lunch', 'Anatomy Lab (12-1)', 'Sports/Extra (2-4)'] },
  ],
};

export const hostelComplaints = [
  { id: 'HC-001', name: 'Rohan M', room: '204', category: 'Plumbing', description: 'Leaking tap in bathroom', status: 'resolved', date: '2026-04-10' },
  { id: 'HC-002', name: 'Santhosh K', room: '112', category: 'Electrical', description: 'Ceiling fan not working', status: 'in-review', date: '2026-04-12' },
  { id: 'HC-003', name: 'Anjali R', room: '305', category: 'Cleanliness', description: 'Common area not cleaned', status: 'submitted', date: '2026-04-13' },
];

export const researchPublications = [
  { title: 'Prevalence of Periodontal Disease in Urban Population of Bangalore', authors: 'Dr. Vijay Kumar, Dr. Rekha S', journal: 'Journal of Indian Society of Periodontology', year: 2024, department: 'Periodontics' },
  { title: 'AI-Based Detection of Oral Lesions Using Deep Learning Models', authors: 'Dr. Arun Prasad, Dr. Kavitha Sharma', journal: 'Oral Oncology', year: 2024, department: 'Oral Pathology' },
  { title: 'Comparative Study of Root Canal Obturation Techniques', authors: 'Dr. Ramesh Naidu, Dr. Suma K', journal: 'Journal of Endodontics', year: 2023, department: 'Conservative Dentistry' },
  { title: 'Orthodontic Treatment Outcomes in Mixed Dentition Phase', authors: 'Dr. Priya Menon', journal: 'American Journal of Orthodontics', year: 2023, department: 'Orthodontics' },
  { title: 'Effectiveness of Silver Diamine Fluoride in Paediatric Patients', authors: 'Dr. Meena Reddy, Dr. Lakshmi N', journal: 'Paediatric Dentistry Journal', year: 2024, department: 'Paediatric Dentistry' },
  { title: 'Quality of Life Assessment in Edentulous Patients with Implant-Supported Prosthesis', authors: 'Dr. Anitha Rao', journal: 'Journal of Prosthetic Dentistry', year: 2023, department: 'Prosthodontics' },
];

export const achievements = [
  { year: 2024, title: 'NAAC A++ Accreditation', desc: 'Received the highest NAAC grade for academic excellence', icon: '🏆' },
  { year: 2024, title: 'Best Dental College Award', desc: 'Recognized by Dental Council of India as Best Dental College in Karnataka', icon: '🥇' },
  { year: 2023, title: 'Research Excellence Award', desc: 'Top 10 most-cited dental research institutions in India', icon: '🔬' },
  { year: 2023, title: 'Green Campus Certification', desc: 'ISO 14001 certification for sustainable campus practices', icon: '🌱' },
  { year: 2022, title: 'Digital Health Innovation', desc: 'Featured in Health IT for paperless patient record system', icon: '💻' },
  { year: 2022, title: '25 Years of Excellence', desc: 'Silver Jubilee celebration of academic and clinical excellence', icon: '🎂' },
];

export const events = [
  { id: 1, title: 'World Oral Health Day', start: new Date(2026, 2, 20), end: new Date(2026, 2, 20), color: '#0D9488' },
  { id: 2, title: 'Annual Dental Conference', start: new Date(2026, 3, 5), end: new Date(2026, 3, 7), color: '#1A4B8C' },
  { id: 3, title: 'Free Dental Camp', start: new Date(2026, 3, 15), end: new Date(2026, 3, 15), color: '#DC2626' },
  { id: 4, title: 'PG Seminar — Oral Cancer Awareness', start: new Date(2026, 3, 20), end: new Date(2026, 3, 20), color: '#7C3AED' },
  { id: 5, title: 'Sports Day', start: new Date(2026, 3, 25), end: new Date(2026, 3, 25), color: '#D97706' },
  { id: 6, title: 'BDS Admissions Open House', start: new Date(2026, 4, 2), end: new Date(2026, 4, 2), color: '#059669' },
  { id: 7, title: 'Research Paper Submission Deadline', start: new Date(2026, 4, 10), end: new Date(2026, 4, 10), color: '#0891B2' },
  { id: 8, title: 'Fresher\'s Welcome', start: new Date(2026, 7, 15), end: new Date(2026, 7, 15), color: '#DB2777' },
];

export const testimonials = [
  { name: 'Rajesh K', rating: 5, comment: 'Excellent treatment by Dr. Priya for my braces. Very professional and caring staff. Highly recommended!', dept: 'Orthodontics' },
  { name: 'Shweta N', rating: 5, comment: 'Got my root canal done here. Painless treatment and very friendly doctors. Clean facility.', dept: 'Conservative Dentistry' },
  { name: 'Amar Singh', rating: 4, comment: 'Good dental hospital with experienced doctors. The appointment booking system is very convenient.', dept: 'Oral Surgery' },
  { name: 'Pooja M', rating: 5, comment: 'Brought my child for dental checkup. Dr. Meena Reddy was so gentle and patient with kids. Great experience!', dept: 'Paediatric Dentistry' },
];

export const pgSchedule = [
  { doctor: 'Dr. Arun PG (Orth Y1)', shift: 'Morning', time: '8:00 AM - 1:00 PM', dept: 'Orthodontics', cases: 5, status: 'on-duty' },
  { doctor: 'Dr. Preethi PG (Perio Y2)', shift: 'Afternoon', time: '1:00 PM - 6:00 PM', dept: 'Periodontics', cases: 7, status: 'on-duty' },
  { doctor: 'Dr. Kiran PG (Cons Y1)', shift: 'Morning', time: '8:00 AM - 1:00 PM', dept: 'Conservative', cases: 4, status: 'off-duty' },
  { doctor: 'Dr. Smitha PG (Oral Surg Y2)', shift: 'Full Day', time: '8:00 AM - 6:00 PM', dept: 'Oral Surgery', cases: 3, status: 'on-duty' },
  { doctor: 'Dr. Rohit PG (Ped Y1)', shift: 'Afternoon', time: '1:00 PM - 6:00 PM', dept: 'Paediatric', cases: 6, status: 'on-duty' },
];

export const newsItems = [
  { title: 'RRDCH Ranks in Top 10 Dental Colleges of Karnataka', date: '2026-04-10', category: 'Achievement' },
  { title: 'Free Dental Health Camp on April 15 — Open to All', date: '2026-04-08', category: 'Event' },
  { title: 'New Advanced Simulation Lab Inaugurated', date: '2026-04-05', category: 'Infrastructure' },
  { title: 'BDS 2026-27 Admissions Now Open', date: '2026-04-01', category: 'Admissions' },
];

// Mock data for the entire RRDCH application

export const departments = [
  { id: 1, name: 'Oral Medicine & Radiology', icon: '🦷', color: '#1A4B8C', desc: 'Diagnosis of oral diseases using advanced radiographic techniques.', hod: 'Dr. Poornima. C', faculty: 6, patients: 2400 },
  { id: 2, name: 'Conservative Dentistry & Endodontics', icon: '🔬', color: '#0D9488', desc: 'Root canal treatments, cavity restorations and preservation of natural teeth.', hod: 'Dr. R Vinaychandra', faculty: 6, patients: 3100 },
  { id: 3, name: 'Orthodontics & Dentofacial Orthopedics', icon: '😁', color: '#7C3AED', desc: 'Correction of teeth alignment and jaw discrepancies.', hod: 'Dr. Shwetha G S', faculty: 6, patients: 1800 },
  { id: 4, name: 'Oral & Maxillofacial Surgery', icon: '⚕️', color: '#DC2626', desc: 'Surgical treatment of diseases, injuries and defects of the head, neck, face and jaw.', hod: 'Dr. Mamatha. N. S.', faculty: 8, patients: 2200 },
  { id: 5, name: 'Prosthetics & Crown & Bridge', icon: '🦷', color: '#D97706', desc: 'Restoration and replacement of missing teeth with prosthetics.', hod: 'Dr. Krishna Kumar. U', faculty: 9, patients: 1600 },
  { id: 6, name: 'Periodontology', icon: '💉', color: '#059669', desc: 'Treatment of gum diseases and supporting structures of teeth.', hod: 'Dr. Vinaya Kumar. R', faculty: 8, patients: 2800 },
  { id: 7, name: 'Pedodontics & Preventive Dentistry', icon: '👶', color: '#DB2777', desc: 'Specialized dental care for children and preventive oral health.', hod: 'Dr. Shakuntala. B. S.', faculty: 6, patients: 1900 },
  { id: 8, name: 'Oral & Maxillofacial Pathology', icon: '🔭', color: '#0891B2', desc: 'Study and diagnosis of oral diseases at cellular and tissue level.', hod: 'Dr. Girish H.C', faculty: 3, patients: 950 },
  { id: 9, name: 'Public Health Dentistry', icon: '🌍', color: '#16A34A', desc: 'Community oral health programs, epidemiology and preventive strategies.', hod: 'Dr. C. N. Aruna', faculty: 6, patients: 1200 },
];

export const doctors = {
  1: [
    { id: 'd101', name: 'Dr. Poornima. C', qualification: 'MDS', slots: ['9:00 AM', '10:00 AM', '2:00 PM'] },
    { id: 'd102', name: 'Dr. Balaji.P', qualification: 'MDS', slots: ['9:30 AM', '11:00 AM', '3:00 PM'] },
    { id: 'd103', name: 'Dr. M. B. Sowbhagya', qualification: 'MDS', slots: ['10:00 AM', '12:00 PM', '4:00 PM'] },
    { id: 'd104', name: 'Dr. Poornima. G', qualification: 'MDS', slots: ['9:00 AM', '11:30 AM', '2:30 PM'] },
    { id: 'd105', name: 'Dr. Mahesh Kumar. T. S.', qualification: 'MDS', slots: ['9:30 AM', '10:30 AM', '3:30 PM'] },
    { id: 'd106', name: 'Dr. Prarthana G. A', qualification: 'MDS', slots: ['10:30 AM', '1:30 PM', '4:30 PM'] },
  ],
  2: [
    { id: 'd201', name: 'Dr. R Vinaychandra', qualification: 'MDS', slots: ['9:00 AM', '10:00 AM', '2:00 PM'] },
    { id: 'd202', name: 'Dr. Geeta I B', qualification: 'MDS', slots: ['9:30 AM', '11:00 AM', '3:00 PM'] },
    { id: 'd203', name: 'Dr. Annapurna Kini', qualification: 'MDS', slots: ['10:00 AM', '12:00 PM', '4:00 PM'] },
    { id: 'd204', name: 'Dr. N. Shubhashini', qualification: 'MDS', slots: ['9:00 AM', '11:30 AM', '2:30 PM'] },
    { id: 'd205', name: 'Dr. Swetha H.B', qualification: 'MDS', slots: ['9:30 AM', '10:30 AM', '3:30 PM'] },
    { id: 'd206', name: 'Dr. Thokala Dhamodaran', qualification: 'MDS', slots: ['10:30 AM', '1:30 PM', '4:30 PM'] },
  ],
  3: [
    { id: 'd301', name: 'Dr. Shwetha G S', qualification: 'MDS', slots: ['9:00 AM', '10:00 AM', '2:00 PM'] },
    { id: 'd302', name: 'Dr. Suma. T', qualification: 'MDS', slots: ['9:30 AM', '11:00 AM', '3:00 PM'] },
    { id: 'd303', name: 'Dr. Shashi Kumar. H. C.', qualification: 'MDS', slots: ['10:00 AM', '12:00 PM', '4:00 PM'] },
    { id: 'd304', name: 'Dr. Lokesh. N. K.', qualification: 'MDS', slots: ['9:00 AM', '11:30 AM', '2:30 PM'] },
    { id: 'd305', name: 'Dr. Siddarth Arya', qualification: 'MDS', slots: ['9:30 AM', '10:30 AM', '3:30 PM'] },
    { id: 'd306', name: 'Dr. Vaishnavi S', qualification: 'MDS', slots: ['10:30 AM', '1:30 PM', '4:30 PM'] },
  ],
  4: [
    { id: 'd401', name: 'Dr. Mamatha. N. S.', qualification: 'MDS', slots: ['9:00 AM', '10:00 AM', '2:00 PM'] },
    { id: 'd402', name: 'Dr. Madhumathi Singh', qualification: 'MDS', slots: ['9:30 AM', '11:00 AM', '3:00 PM'] },
    { id: 'd403', name: 'Dr. Shruthi. R', qualification: 'MDS', slots: ['10:00 AM', '12:00 PM', '4:00 PM'] },
    { id: 'd404', name: 'Dr. Beena Roopak', qualification: 'MDS', slots: ['9:00 AM', '11:30 AM', '2:30 PM'] },
    { id: 'd405', name: 'Dr. Rohit. S', qualification: 'MDS', slots: ['9:30 AM', '10:30 AM', '3:30 PM'] },
    { id: 'd406', name: 'Dr. Narahari R', qualification: 'MDS', slots: ['10:30 AM', '1:30 PM', '4:30 PM'] },
    { id: 'd407', name: 'Dr. Gonegandla Giriraj Sandeep', qualification: 'MDS', slots: ['9:00 AM', '11:00 AM', '3:00 PM'] },
    { id: 'd408', name: 'Dr. Sathvik Mavinkurve S', qualification: 'MDS', slots: ['10:00 AM', '1:00 PM', '4:00 PM'] },
  ],
  5: [
    { id: 'd501', name: 'Dr. Krishna Kumar. U', qualification: 'MDS', slots: ['9:00 AM', '10:00 AM', '2:00 PM'] },
    { id: 'd502', name: 'Dr. Goutam Shetty', qualification: 'MDS', slots: ['9:30 AM', '11:00 AM', '3:00 PM'] },
    { id: 'd503', name: 'Dr. Shwetha Poovani', qualification: 'MDS', slots: ['10:00 AM', '12:00 PM', '4:00 PM'] },
    { id: 'd504', name: 'Dr. Srilakshmi J', qualification: 'MDS', slots: ['9:00 AM', '11:30 AM', '2:30 PM'] },
    { id: 'd505', name: 'Dr. Sindhu. K', qualification: 'MDS', slots: ['9:30 AM', '10:30 AM', '3:30 PM'] },
    { id: 'd506', name: 'Dr. Madhuri Vijayakumar', qualification: 'MDS', slots: ['10:30 AM', '1:30 PM', '4:30 PM'] },
    { id: 'd507', name: 'Dr. Maria Jenifer Sabita F X', qualification: 'MDS', slots: ['9:00 AM', '11:00 AM', '3:00 PM'] },
    { id: 'd508', name: 'Dr. Sushma J', qualification: 'MDS', slots: ['9:30 AM', '11:30 AM', '3:30 PM'] },
    { id: 'd509', name: 'Dr. Srishti Relan', qualification: 'MDS', slots: ['10:00 AM', '1:00 PM', '4:00 PM'] },
  ],
  6: [
    { id: 'd601', name: 'Dr. Vinaya Kumar. R', qualification: 'MDS', slots: ['9:00 AM', '10:00 AM', '2:00 PM'] },
    { id: 'd602', name: 'Dr. Savitha S', qualification: 'MDS', slots: ['9:30 AM', '11:00 AM', '3:00 PM'] },
    { id: 'd603', name: 'Dr. Krishna Kripal', qualification: 'MDS', slots: ['10:00 AM', '12:00 PM', '4:00 PM'] },
    { id: 'd604', name: 'Dr. Nalini. M. S.', qualification: 'MDS', slots: ['9:00 AM', '11:30 AM', '2:30 PM'] },
    { id: 'd605', name: 'Dr. Rithesh K', qualification: 'MDS', slots: ['9:30 AM', '10:30 AM', '3:30 PM'] },
    { id: 'd606', name: 'Dr. Senthil Rajan R S', qualification: 'MDS', slots: ['10:30 AM', '1:30 PM', '4:30 PM'] },
    { id: 'd607', name: 'Dr. Alina Pauly', qualification: 'MDS', slots: ['9:00 AM', '11:00 AM', '3:00 PM'] },
    { id: 'd608', name: 'Dr. Sharika Gopinath', qualification: 'MDS', slots: ['10:00 AM', '1:00 PM', '4:00 PM'] },
  ],
  7: [
    { id: 'd701', name: 'Dr. Shakuntala. B. S.', qualification: 'MDS', slots: ['9:00 AM', '10:00 AM', '2:00 PM'] },
    { id: 'd702', name: 'Dr. Nagarathna. C', qualification: 'MDS', slots: ['9:30 AM', '11:00 AM', '3:00 PM'] },
    { id: 'd703', name: 'Dr. Umapathy. T', qualification: 'MDS', slots: ['10:00 AM', '12:00 PM', '4:00 PM'] },
    { id: 'd704', name: 'Dr. Jaya. A. R.', qualification: 'MDS', slots: ['9:00 AM', '11:30 AM', '2:30 PM'] },
    { id: 'd705', name: 'Dr. Amrutha Ujjamma B', qualification: 'MDS', slots: ['9:30 AM', '10:30 AM', '3:30 PM'] },
    { id: 'd706', name: 'Dr. Aishwarya. N', qualification: 'MDS', slots: ['10:30 AM', '1:30 PM', '4:30 PM'] },
  ],
  8: [
    { id: 'd801', name: 'Dr. Girish H.C', qualification: 'MDS', slots: ['9:00 AM', '10:00 AM', '2:00 PM'] },
    { id: 'd802', name: 'Dr. Savitha .J.K', qualification: 'MDS', slots: ['10:00 AM', '11:00 AM', '3:00 PM'] },
    { id: 'd803', name: 'Dr. V K Varsha', qualification: 'MDS', slots: ['10:00 AM', '12:00 PM', '4:00 PM'] },
  ],
  9: [
    { id: 'd901', name: 'Dr. C. N. Aruna', qualification: 'MDS', slots: ['9:00 AM', '10:00 AM', '2:00 PM'] },
    { id: 'd902', name: 'Dr. Padma. K. Bhat', qualification: 'MDS', slots: ['9:30 AM', '11:00 AM', '3:00 PM'] },
    { id: 'd903', name: 'Dr. Prasana Kumar Y.S', qualification: 'MDS', slots: ['10:00 AM', '12:00 PM', '4:00 PM'] },
    { id: 'd904', name: 'Dr. Shweta Somasundara. Y', qualification: 'MDS', slots: ['9:00 AM', '11:30 AM', '2:30 PM'] },
    { id: 'd905', name: 'Dr. Jayachandra. M. Y.', qualification: 'MDS', slots: ['9:30 AM', '10:30 AM', '3:30 PM'] },
    { id: 'd906', name: 'Dr. Sushma S G', qualification: 'MDS', slots: ['10:30 AM', '1:30 PM', '4:30 PM'] },
  ],
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
  { name: 'Dr. Poornima. C', dept: 'Oral Medicine', status: 'available', currentPatient: null },
  { name: 'Dr. R Vinaychandra', dept: 'Conservative', status: 'busy', currentPatient: 'Mohan L' },
  { name: 'Dr. Shwetha G S', dept: 'Orthodontics', status: 'busy', currentPatient: 'Ravi Kumar' },
  { name: 'Dr. Mamatha. N. S.', dept: 'Oral Surgery', status: 'available', currentPatient: null },
  { name: 'Dr. Krishna Kumar. U', dept: 'Prosthetics', status: 'break', currentPatient: null },
  { name: 'Dr. Vinaya Kumar. R', dept: 'Periodontology', status: 'available', currentPatient: null },
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
  { title: 'Prevalence of Periodontal Disease in Urban Population of Bangalore', authors: 'Dr. Vinaya Kumar. R, Dr. Savitha S', journal: 'Journal of Indian Society of Periodontology', year: 2024, department: 'Periodontics' },
  { title: 'AI-Based Detection of Oral Lesions Using Deep Learning Models', authors: 'Dr. Girish H.C, Dr. Savitha .J.K', journal: 'Oral Oncology', year: 2024, department: 'Oral Pathology' },
  { title: 'Comparative Study of Root Canal Obturation Techniques', authors: 'Dr. R Vinaychandra, Dr. Geeta I B', journal: 'Journal of Endodontics', year: 2023, department: 'Conservative Dentistry' },
  { title: 'Orthodontic Treatment Outcomes in Mixed Dentition Phase', authors: 'Dr. Shwetha G S', journal: 'American Journal of Orthodontics', year: 2023, department: 'Orthodontics' },
  { title: 'Effectiveness of Silver Diamine Fluoride in Paediatric Patients', authors: 'Dr. Shakuntala. B. S., Dr. Nagarathna. C', journal: 'Paediatric Dentistry Journal', year: 2024, department: 'Paediatric Dentistry' },
  { title: 'Quality of Life Assessment in Edentulous Patients with Implant-Supported Prosthesis', authors: 'Dr. Krishna Kumar. U', journal: 'Journal of Prosthetic Dentistry', year: 2023, department: 'Prosthodontics' },
  { title: 'Digital Radiography vs Conventional Methods: A Diagnostic Accuracy Study', authors: 'Dr. Poornima. C, Dr. Balaji.P', journal: 'Dentomaxillofacial Radiology', year: 2024, department: 'Oral Medicine' },
  { title: 'Surgical Management of Mandibular Fractures: A 5-Year Retrospective Study', authors: 'Dr. Mamatha. N. S., Dr. Madhumathi Singh', journal: 'International Journal of Oral & Maxillofacial Surgery', year: 2023, department: 'Oral Surgery' },
  { title: 'Evaluation of Patient Satisfaction in Public Health Dentistry Outreach', authors: 'Dr. C. N. Aruna, Dr. Padma. K. Bhat', journal: 'Journal of Community Health', year: 2024, department: 'Public Health' },
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
  { name: 'Rajesh K', rating: 5, comment: 'Excellent treatment by Dr. Shwetha G S for my braces. Very professional and caring staff. Highly recommended!', dept: 'Orthodontics' },
  { name: 'Shweta N', rating: 5, comment: 'Got my root canal done here. Painless treatment and very friendly doctors. Clean facility.', dept: 'Conservative Dentistry' },
  { name: 'Amar Singh', rating: 4, comment: 'Good dental hospital with experienced doctors. The appointment booking system is very convenient.', dept: 'Oral Surgery' },
  { name: 'Pooja M', rating: 5, comment: 'Brought my child for dental checkup. Dr. Shakuntala. B. S. was so gentle and patient with kids. Great experience!', dept: 'Paediatric Dentistry' },
];

export const pgSchedule = [
  { doctor: 'Dr. Suma. T (Orth Y1)', shift: 'Morning', time: '8:00 AM - 1:00 PM', dept: 'Orthodontics', cases: 5, status: 'on-duty' },
  { doctor: 'Dr. Krishna Kripal (Perio Y2)', shift: 'Afternoon', time: '1:00 PM - 6:00 PM', dept: 'Periodontics', cases: 7, status: 'on-duty' },
  { doctor: 'Dr. Annapurna Kini (Cons Y1)', shift: 'Morning', time: '8:00 AM - 1:00 PM', dept: 'Conservative', cases: 4, status: 'off-duty' },
  { doctor: 'Dr. Madhumathi Singh (Oral Surg Y2)', shift: 'Full Day', time: '8:00 AM - 6:00 PM', dept: 'Oral Surgery', cases: 3, status: 'on-duty' },
  { doctor: 'Dr. Nagarathna. C (Ped Y2)', shift: 'Afternoon', time: '1:00 PM - 6:00 PM', dept: 'Paediatric', cases: 6, status: 'on-duty' },
];

export const newsItems = [
  { title: 'RRDCH Ranks in Top 10 Dental Colleges of Karnataka', date: '2026-04-10', category: 'Achievement' },
  { title: 'Free Dental Health Camp on April 15 — Open to All', date: '2026-04-08', category: 'Event' },
  { title: 'New Advanced Simulation Lab Inaugurated', date: '2026-04-05', category: 'Infrastructure' },
  { title: 'BDS 2026-27 Admissions Now Open', date: '2026-04-01', category: 'Admissions' },
];

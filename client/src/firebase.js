import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAnalytics } from "firebase/analytics";

// RRDCH Firebase Configuration
const firebaseConfig = {
  apiKey: "AIzaSyD8Jh4jyVkeq12lDV_vcON9FItglI196i4",
  authDomain: "rrdch-55857.firebaseapp.com",
  projectId: "rrdch-55857",
  storageBucket: "rrdch-55857.firebasestorage.app",
  messagingSenderId: "610024142493",
  appId: "1:610024142493:web:c92cfd7c87103df58a0674",
  measurementId: "G-8J7L6PJCS7"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Services
export const db = getFirestore(app);
export const analytics = typeof window !== 'undefined' ? getAnalytics(app) : null;

export default app;


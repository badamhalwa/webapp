import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiLock, FiShield, FiArrowRight } from 'react-icons/fi';
import { Button, Card, FormInput } from '../ui/UIComponents';
import toast from 'react-hot-toast';

const STUDENT_PASSWORD = "RRDCH2026"; // Default password

const StudentGuard = ({ children }) => {
  const [usn, setUsn] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(() => {
    return localStorage.getItem('rrdch-student-auth') === 'true';
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!usn.trim()) {
      toast.error('Please enter your USN.');
      return;
    }
    if (password === STUDENT_PASSWORD) {
      localStorage.setItem('rrdch-student-auth', 'true');
      setIsAuthorized(true);
      toast.success('Access Granted');
    } else {
      toast.error('Incorrect password. Please contact the academic office.');
    }
  };


  if (isAuthorized) {
    return children;
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 bg-gray-50 py-12">
      <motion.div
        initial={{ opacity: 0, scale: 0.95 }}
        animate={{ opacity: 1, scale: 1 }}
        className="w-full max-w-md"
      >
        <Card className="p-8 text-center shadow-2xl border-t-4 border-rrdch-blue">
          <div className="w-16 h-16 bg-blue-50 text-rrdch-blue rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FiLock size={32} />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Student Access Only</h2>
          <p className="text-gray-500 text-sm mb-8">
            This section contains academic records, schedules, and student-only resources. Please enter the academic portal password.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
              id="student-usn"
              label="University Serial Number (USN)"
              type="text"
              placeholder="e.g. 1RR20DS001"
              value={usn}
              onChange={(e) => setUsn(e.target.value.toUpperCase())}
              required
            />
            <FormInput
              id="student-pwd"
              label="Enter Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <Button 
              type="submit" 
              className="w-full justify-center h-12 text-base shadow-lg shadow-blue-100"
            >
              Access Portal <FiArrowRight className="ml-2" />
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <FiShield /> Protected by Vitalis Security Systems
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default StudentGuard;

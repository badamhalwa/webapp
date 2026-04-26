import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { FiLock, FiShield, FiArrowRight } from 'react-icons/fi';
import { Button, Card, FormInput } from '../ui/UIComponents';
import toast from 'react-hot-toast';

const DEMO_USERNAME = "admin";
const DEMO_PASSWORD = "password";

const AdminGuard = ({ children }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isAuthorized, setIsAuthorized] = useState(() => {
    return localStorage.getItem('rrdch-admin-auth') === 'true';
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!username.trim()) {
      toast.error('Please enter your username.');
      return;
    }
    if (username.toLowerCase() === DEMO_USERNAME && password === DEMO_PASSWORD) {
      localStorage.setItem('rrdch-admin-auth', 'true');
      setIsAuthorized(true);
      toast.success('Admin Access Granted');
    } else {
      toast.error('Invalid admin credentials.');
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
        <Card className="p-8 text-center shadow-2xl border-t-4 border-rrdch-red">
          <div className="bg-red-50 text-red-800 text-xs p-3 rounded-lg mb-6 text-left border border-red-100">
            <p className="font-semibold mb-1">Admin Credentials:</p>
            <p>Username: <strong>admin</strong></p>
            <p>Password: <strong>password</strong></p>
          </div>

          <div className="w-16 h-16 bg-red-50 text-rrdch-red rounded-2xl flex items-center justify-center mx-auto mb-6">
            <FiShield size={32} />
          </div>
          
          <h2 className="text-2xl font-bold text-gray-900 mb-2">Admin Portal</h2>
          <p className="text-gray-500 text-sm mb-6">
            Restricted access. Please enter your administrative credentials to proceed.
          </p>

          <form onSubmit={handleSubmit} className="space-y-4">
            <FormInput
              id="admin-username"
              label="Admin ID"
              type="text"
              placeholder="e.g. admin"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
            <FormInput
              id="admin-pwd"
              label="Password"
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            
            <Button 
              type="submit" 
              className="w-full justify-center h-12 text-base shadow-lg shadow-red-100 bg-rrdch-red hover:bg-red-700 text-white"
            >
              Access Portal <FiArrowRight className="ml-2" />
            </Button>
          </form>

          <div className="mt-8 pt-6 border-t border-gray-100">
            <div className="flex items-center justify-center gap-2 text-xs text-gray-400">
              <FiLock /> Secure Institutional Access
            </div>
          </div>
        </Card>
      </motion.div>
    </div>
  );
};

export default AdminGuard;

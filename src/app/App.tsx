import { useState, useEffect } from 'react';
import { LoginPage } from '../app/components/LoginPage';
import { TeacherDashboard } from '../app/components/TeacherDashboard';
import { AdminDashboard } from '../app/components/AdminDashboard';
import { User } from '../types';
import { storage } from '../utils/storage';
import { mockRemarks, mockFeedback } from '../data/mockData';

export default function App() {
  const [currentUser, setCurrentUser] = useState<User | null>(null);

  useEffect(() => {
    // Check for existing session
    const savedUser = storage.getCurrentUser();
    if (savedUser) {
      setCurrentUser(savedUser);
    }

    // Initialize storage with mock data if empty
    const existingRemarks = storage.getRemarks();
    if (existingRemarks.length === 0) {
      mockRemarks.forEach(remark => storage.addRemark(remark));
    }

    const existingFeedback = storage.getFeedback();
    if (existingFeedback.length === 0) {
      mockFeedback.forEach(feedback => storage.addFeedback(feedback));
    }
  }, []);

  const handleLogin = (user: User) => {
    setCurrentUser(user);
    storage.setCurrentUser(user);
  };

  const handleLogout = () => {
    setCurrentUser(null);
    storage.setCurrentUser(null);
  };

  if (!currentUser) {
    return <LoginPage onLogin={handleLogin} />;
  }

  if (currentUser.role === 'admin') {
    return <AdminDashboard user={currentUser} onLogout={handleLogout} />;
  }

  return <TeacherDashboard user={currentUser} onLogout={handleLogout} />;
}


import React from 'react';
import Sidebar from '../components/layout/Sidebar';
import MainContent from '../components/layout/MainContent';
import RightPanel from '../components/layout/RightPanel';
import { auth } from '../services/firebaseConfig';
import { signOut } from 'firebase/auth';

const HomePage: React.FC = () => {
  const handleLogout = async () => {
    try {
      await signOut(auth);
    } catch (error) {
      console.error("Error signing out: ", error);
    }
  };

  return (
    <div className="min-h-screen bg-invox-dark text-white flex">
      <Sidebar onLogout={handleLogout} />
      <MainContent />
      <RightPanel />
    </div>
  );
};

export default HomePage;

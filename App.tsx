
import React, { useState, useEffect } from 'react';
import { onAuthStateChanged, User } from 'firebase/auth';
import { auth } from './services/firebaseConfig';
import HomePage from './pages/HomePage';
import AuthPage from './pages/AuthPage';
import Loader from './components/common/Loader';

const App: React.FC = () => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (currentUser) => {
      setUser(currentUser);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-invox-dark">
        <Loader />
      </div>
    );
  }

  return user ? <HomePage /> : <AuthPage />;
};

export default App;

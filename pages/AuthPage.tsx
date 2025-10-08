
import React, { useState } from 'react';
import LoginForm from '../components/auth/LoginForm';
import SignupForm from '../components/auth/SignupForm';

const AuthPage: React.FC = () => {
  const [isLogin, setIsLogin] = useState(true);

  return (
    <div className="min-h-screen bg-invox-dark text-white flex flex-col items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="text-center mb-10">
            <h1 className="text-5xl font-bold text-invox-red">Invox</h1>
            <p className="text-invox-light-gray mt-2">Fuel Curiosity, Expand Consciousness</p>
        </div>

        <div className="bg-invox-gray p-8 rounded-lg shadow-lg">
          <div className="flex border-b border-gray-700 mb-6">
            <button
              onClick={() => setIsLogin(true)}
              className={`w-1/2 py-3 font-semibold transition-colors duration-300 ${isLogin ? 'text-invox-red border-b-2 border-invox-red' : 'text-gray-400 hover:text-white'}`}
            >
              LOGIN
            </button>
            <button
              onClick={() => setIsLogin(false)}
              className={`w-1/2 py-3 font-semibold transition-colors duration-300 ${!isLogin ? 'text-invox-red border-b-2 border-invox-red' : 'text-gray-400 hover:text-white'}`}
            >
              SIGN UP
            </button>
          </div>

          {isLogin ? <LoginForm /> : <SignupForm />}
        </div>
      </div>
    </div>
  );
};

export default AuthPage;

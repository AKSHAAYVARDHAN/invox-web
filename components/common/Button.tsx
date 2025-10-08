
import React from 'react';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  children: React.ReactNode;
  fullWidth?: boolean;
}

const Button: React.FC<ButtonProps> = ({ children, fullWidth = false, ...props }) => {
  return (
    <button
      className={`
        bg-invox-red text-white font-bold py-3 px-6 rounded-lg 
        transition-transform duration-200 ease-in-out 
        hover:scale-105 active:scale-100
        disabled:bg-red-800 disabled:cursor-not-allowed disabled:scale-100
        ${fullWidth ? 'w-full' : ''}
      `}
      {...props}
    >
      {children}
    </button>
  );
};

export default Button;

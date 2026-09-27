import React from 'react';

interface CardProps {
  children: React.ReactNode;
  className?: string;
  onClick?: () => void;
}

export const Card: React.FC<CardProps> = ({ children, className = '', onClick }) => {
  return (
    <div
      onClick={onClick}
      className={`bg-slate-900 border border-slate-800 rounded-xl p-5 shadow-sm transition-all ${
        onClick ? 'cursor-pointer hover:border-slate-700 hover:shadow-md' : ''
      } ${className}`}
    >
      {children}
    </div>
  );
};

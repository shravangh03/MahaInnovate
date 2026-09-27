import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'info' | 'danger' | 'outline' | 'purple';
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({ children, variant = 'default', className = '' }) => {
  const variants = {
    default: 'bg-slate-800 text-slate-300 border-slate-700',
    success: 'bg-emerald-950/60 text-emerald-400 border-emerald-500/30',
    warning: 'bg-amber-950/60 text-amber-400 border-amber-500/30',
    info: 'bg-blue-950/60 text-blue-400 border-blue-500/30',
    danger: 'bg-rose-950/60 text-rose-400 border-rose-500/30',
    purple: 'bg-purple-950/60 text-purple-400 border-purple-500/30',
    outline: 'bg-transparent text-slate-400 border-slate-700'
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 px-2.5 py-0.5 rounded-full text-[11px] font-semibold border ${variants[variant]} ${className}`}
    >
      {children}
    </span>
  );
};

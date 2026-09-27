'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { Role } from '../../types';
import { Shield, User, PlayCircle, Bell, ChevronDown, Sparkles } from 'lucide-react';

export const Navbar: React.FC = () => {
  const { currentRole, setRole, user, demoUsers } = useAuth();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const roles: Role[] = ['Government Officer', 'Startup', 'Evaluator', 'Admin'];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white px-6 py-3 flex items-center justify-between shadow-md">
      {/* Brand & Title */}
      <div className="flex items-center gap-4">
        <Link href="/" className="flex items-center gap-2.5 group">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-2 rounded-lg text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform">
            <Shield className="w-5 h-5" />
          </div>
          <div>
            <div className="font-bold text-lg tracking-tight flex items-center gap-2">
              MahaInnovate <span className="bg-blue-600/30 text-blue-400 text-xs px-2 py-0.5 rounded-full border border-blue-500/30">SIH MVP</span>
            </div>
            <p className="text-xs text-slate-400 font-medium">GovTech Challenge & Startup Procurement Platform</p>
          </div>
        </Link>
      </div>

      {/* Action Controls */}
      <div className="flex items-center gap-4">
        {/* Quick Demo Walkthrough Button */}
        <Link
          href="/demo-flow"
          className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold px-3.5 py-1.5 rounded-md shadow-md hover:shadow-emerald-500/20 transition-all border border-emerald-400/30"
        >
          <PlayCircle className="w-4 h-4 text-emerald-200 animate-pulse" />
          <span>Interactive Demo (2–5 Min)</span>
        </Link>

        {/* AI Assistant Quick Link */}
        <Link
          href="/ai-assistant"
          className="flex items-center gap-1.5 bg-blue-900/50 hover:bg-blue-800/60 border border-blue-500/30 text-blue-300 hover:text-white text-xs font-medium px-3 py-1.5 rounded-md transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-400" />
          <span>AI Assistant</span>
        </Link>

        {/* Notifications */}
        <button
          className="relative p-2 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800 transition-colors"
          title="Notifications"
        >
          <Bell className="w-4 h-4" />
          <span className="absolute top-1.5 right-1.5 w-2 h-2 bg-blue-500 rounded-full ring-2 ring-slate-900" />
        </button>

        {/* Role Switcher Dropdown */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-2.5 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
          >
            <div className="w-6 h-6 rounded-full bg-slate-700 overflow-hidden border border-slate-600">
              <img src={user.avatar_url} alt={user.full_name} className="w-full h-full object-cover" />
            </div>
            <div className="text-left hidden md:block">
              <div className="font-semibold text-slate-200">{user.full_name}</div>
              <div className="text-[10px] text-blue-400 font-mono font-medium">{currentRole}</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400 ml-1" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-56 bg-slate-800 border border-slate-700 rounded-lg shadow-xl py-1 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-2 border-b border-slate-700/80">
                <p className="text-[11px] uppercase tracking-wider text-slate-400 font-semibold">Switch Demo Role</p>
              </div>
              {roles.map((r) => (
                <button
                  key={r}
                  onClick={() => {
                    setRole(r);
                    setDropdownOpen(false);
                  }}
                  className={`w-full text-left px-3 py-2 text-xs flex items-center justify-between hover:bg-slate-700/60 transition-colors ${
                    currentRole === r ? 'text-blue-400 font-bold bg-blue-950/40' : 'text-slate-300'
                  }`}
                >
                  <span>{r}</span>
                  {currentRole === r && <span className="w-1.5 h-1.5 rounded-full bg-blue-400"></span>}
                </button>
              ))}
            </div>
          )}
        </div>
      </div>
    </header>
  );
};

'use client';

import React from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { Role } from '../../types';
import { Shield, PlayCircle, Bell, ChevronDown, Sparkles, Menu, X } from 'lucide-react';

interface NavbarProps {
  onToggleMobileMenu?: () => void;
  isMobileMenuOpen?: boolean;
}

export const Navbar: React.FC<NavbarProps> = ({ onToggleMobileMenu, isMobileMenuOpen }) => {
  const { currentRole, setRole, user } = useAuth();
  const [dropdownOpen, setDropdownOpen] = React.useState(false);

  const roles: Role[] = ['Government Officer', 'Startup', 'Evaluator', 'Admin'];

  return (
    <header className="sticky top-0 z-40 bg-slate-900/95 backdrop-blur-md border-b border-slate-800 text-white px-3 sm:px-6 py-2.5 flex items-center justify-between shadow-md">
      {/* Left: Mobile Hamburger & Brand Logo */}
      <div className="flex items-center gap-2 sm:gap-3 shrink-0">
        {onToggleMobileMenu && (
          <button
            onClick={onToggleMobileMenu}
            className="p-1.5 text-slate-300 hover:text-white rounded-lg lg:hidden hover:bg-slate-800 transition-colors"
            title="Toggle Navigation Menu"
          >
            {isMobileMenuOpen ? <X className="w-5 h-5 text-blue-400" /> : <Menu className="w-5 h-5" />}
          </button>
        )}

        <Link href="/" className="flex items-center gap-2 group">
          <div className="bg-gradient-to-br from-blue-600 to-indigo-700 p-1.5 sm:p-2 rounded-lg text-white shadow-lg shadow-blue-500/20 group-hover:scale-105 transition-transform shrink-0">
            <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
          </div>
          <div className="flex flex-col">
            <div className="font-bold text-sm sm:text-base md:text-lg tracking-tight flex items-center gap-1.5">
              <span>MahaInnovate</span>
              <span className="hidden sm:inline-block bg-blue-600/30 text-blue-400 text-[10px] md:text-xs px-2 py-0.5 rounded-full border border-blue-500/30 font-normal">
                SIH MVP
              </span>
            </div>
            <p className="text-[11px] text-slate-400 font-medium hidden md:block">
              GovTech Challenge & Startup Procurement Platform
            </p>
          </div>
        </Link>
      </div>

      {/* Right: Action Controls */}
      <div className="flex items-center gap-1.5 sm:gap-3 shrink-0">
        {/* Interactive Demo Button (Desktop & Tablet) */}
        <Link
          href="/demo-flow"
          className="hidden sm:flex items-center gap-1.5 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-semibold px-3 py-1.5 rounded-lg shadow-md transition-all border border-emerald-400/30"
        >
          <PlayCircle className="w-3.5 h-3.5 text-emerald-200 animate-pulse shrink-0" />
          <span>Interactive Demo</span>
        </Link>

        {/* AI Assistant Quick Link (Desktop) */}
        <Link
          href="/ai-assistant"
          className="hidden md:flex items-center gap-1.5 bg-blue-900/50 hover:bg-blue-800/60 border border-blue-500/30 text-blue-300 hover:text-white text-xs font-medium px-3 py-1.5 rounded-lg transition-colors"
        >
          <Sparkles className="w-3.5 h-3.5 text-blue-400 shrink-0" />
          <span>AI Assistant</span>
        </Link>

        {/* Role Switcher & User Avatar */}
        <div className="relative">
          <button
            onClick={() => setDropdownOpen(!dropdownOpen)}
            className="flex items-center gap-1.5 sm:gap-2 bg-slate-800 hover:bg-slate-700/80 border border-slate-700 px-2 sm:px-3 py-1.5 rounded-lg text-xs font-medium transition-all"
          >
            <div className="w-5 h-5 sm:w-6 sm:h-6 rounded-full bg-slate-700 overflow-hidden border border-slate-600 shrink-0">
              <img src={user.avatar_url} alt={user.full_name} className="w-full h-full object-cover" />
            </div>
            <div className="text-left hidden md:block">
              <div className="font-semibold text-slate-200 text-xs leading-tight">{user.full_name}</div>
              <div className="text-[10px] text-blue-400 font-mono font-medium">{currentRole}</div>
            </div>
            <ChevronDown className="w-3.5 h-3.5 text-slate-400" />
          </button>

          {dropdownOpen && (
            <div className="absolute right-0 mt-2 w-52 sm:w-56 bg-slate-800 border border-slate-700 rounded-lg shadow-xl py-1 z-50 animate-in fade-in slide-in-from-top-2">
              <div className="px-3 py-2 border-b border-slate-700/80">
                <p className="text-[10px] uppercase tracking-wider text-slate-400 font-semibold">Switch Portal Role</p>
                <p className="text-xs font-bold text-blue-400 sm:hidden mt-0.5">{currentRole}</p>
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

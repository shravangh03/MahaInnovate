'use client';

import React from 'react';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import {
  LayoutDashboard,
  Target,
  Sparkles,
  Store,
  FileText,
  CheckSquare,
  Rocket,
  BarChart3,
  Award,
  ShoppingCart,
  FileCheck,
  Flame,
  X
} from 'lucide-react';

interface NavItem {
  label: string;
  href: string;
  icon: React.ReactNode;
}

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({ isOpen = false, onClose }) => {
  const pathname = usePathname();
  const { currentRole } = useAuth();

  const getNavItems = (): NavItem[] => {
    switch (currentRole) {
      case 'Government Officer':
        return [
          { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
          { label: 'Challenges', href: '/challenges', icon: <Target className="w-4 h-4" /> },
          { label: 'AI Assistant', href: '/ai-assistant', icon: <Sparkles className="w-4 h-4" /> },
          { label: 'Startup Marketplace', href: '/marketplace', icon: <Store className="w-4 h-4" /> },
          { label: 'Proposals', href: '/proposals', icon: <FileText className="w-4 h-4" /> },
          { label: 'Evaluation', href: '/evaluation', icon: <CheckSquare className="w-4 h-4" /> },
          { label: 'Pilots', href: '/pilots', icon: <Rocket className="w-4 h-4" /> },
          { label: 'KPI Monitoring', href: '/kpis', icon: <BarChart3 className="w-4 h-4" /> },
          { label: 'Validation', href: '/validation', icon: <Award className="w-4 h-4" /> },
          { label: 'Procurement', href: '/procurement', icon: <ShoppingCart className="w-4 h-4" /> },
          { label: 'Reports', href: '/reports', icon: <FileCheck className="w-4 h-4" /> }
        ];

      case 'Startup':
        return [
          { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
          { label: 'Browse Challenges', href: '/challenges', icon: <Target className="w-4 h-4" /> },
          { label: 'Startup Marketplace', href: '/marketplace', icon: <Store className="w-4 h-4" /> },
          { label: 'My Proposals', href: '/proposals', icon: <FileText className="w-4 h-4" /> },
          { label: 'My Pilots', href: '/pilots', icon: <Rocket className="w-4 h-4" /> },
          { label: 'KPI Performance', href: '/kpis', icon: <BarChart3 className="w-4 h-4" /> },
          { label: 'Reports', href: '/reports', icon: <FileCheck className="w-4 h-4" /> }
        ];

      case 'Evaluator':
        return [
          { label: 'Dashboard', href: '/dashboard', icon: <LayoutDashboard className="w-4 h-4" /> },
          { label: 'Proposals to Evaluate', href: '/proposals', icon: <FileText className="w-4 h-4" /> },
          { label: '7-Criteria Evaluation', href: '/evaluation', icon: <CheckSquare className="w-4 h-4" /> },
          { label: 'Pilot Sandbox Audit', href: '/pilots', icon: <Rocket className="w-4 h-4" /> },
          { label: 'Independent Validation', href: '/validation', icon: <Award className="w-4 h-4" /> }
        ];

      case 'Admin':
        return [
          { label: 'Admin Dashboard', href: '/admin', icon: <LayoutDashboard className="w-4 h-4" /> },
          { label: 'Challenges Directory', href: '/challenges', icon: <Target className="w-4 h-4" /> },
          { label: 'Startups Directory', href: '/marketplace', icon: <Store className="w-4 h-4" /> },
          { label: 'Proposals Stream', href: '/proposals', icon: <FileText className="w-4 h-4" /> },
          { label: 'Pilots & Sandboxes', href: '/pilots', icon: <Rocket className="w-4 h-4" /> },
          { label: 'Analytics & Metrics', href: '/admin', icon: <BarChart3 className="w-4 h-4" /> }
        ];
    }
  };

  const navItems = getNavItems();

  const SidebarContent = (
    <div className="flex flex-col justify-between h-full p-4">
      <div className="space-y-6">
        {/* Active Role Tag */}
        <div className="bg-slate-800/80 rounded-lg p-3 border border-slate-700/60">
          <div className="text-[10px] uppercase tracking-wider font-semibold text-slate-400">Current Portal Mode</div>
          <div className="text-xs font-bold text-blue-400 mt-0.5 flex items-center gap-1.5">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            {currentRole}
          </div>
        </div>

        {/* Navigation Section */}
        <div>
          <div className="text-[10px] font-bold uppercase tracking-wider text-slate-500 mb-2 px-3">
            Platform Modules
          </div>
          <nav className="space-y-1">
            {navItems.map((item) => {
              const isActive = pathname === item.href || (item.href !== '/' && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={onClose}
                  className={`flex items-center gap-3 px-3 py-2 rounded-lg text-xs font-medium transition-all ${
                    isActive
                      ? 'bg-blue-600/20 text-blue-400 border border-blue-500/30 font-semibold'
                      : 'hover:bg-slate-800 hover:text-slate-100 text-slate-400'
                  }`}
                >
                  <span className={isActive ? 'text-blue-400' : 'text-slate-400'}>{item.icon}</span>
                  <span>{item.label}</span>
                </Link>
              );
            })}
          </nav>
        </div>
      </div>

      {/* Guided Walkthrough Banner */}
      <div className="bg-gradient-to-br from-slate-800 to-blue-950/60 border border-blue-500/20 rounded-xl p-3.5 mt-6">
        <div className="flex items-center gap-2 text-xs font-bold text-blue-300 mb-1">
          <Flame className="w-4 h-4 text-amber-400 animate-pulse" />
          <span>Primary Demo Scenario</span>
        </div>
        <p className="text-[11px] text-slate-400 leading-tight">
          Clickable 2–5 min Hospital Equipment Predictive Maintenance lifecycle walkthrough.
        </p>
        <Link
          href="/demo-flow"
          onClick={onClose}
          className="mt-3 block text-center text-xs font-semibold bg-blue-600 hover:bg-blue-500 text-white py-1.5 rounded-lg transition-colors shadow"
        >
          Launch Walkthrough →
        </Link>
      </div>
    </div>
  );

  return (
    <>
      {/* Desktop Sidebar */}
      <aside className="hidden lg:flex w-64 bg-slate-900 border-r border-slate-800 text-slate-300 min-h-[calc(100vh-57px)] flex-col shrink-0">
        {SidebarContent}
      </aside>

      {/* Mobile Drawer Overlay */}
      {isOpen && (
        <div className="fixed inset-0 z-50 lg:hidden flex">
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-slate-950/80 backdrop-blur-sm transition-opacity"
            onClick={onClose}
          />

          {/* Drawer Panel */}
          <div className="relative z-50 w-72 bg-slate-900 text-slate-300 h-full border-r border-slate-800 shadow-2xl flex flex-col">
            <div className="p-4 border-b border-slate-800 flex items-center justify-between">
              <span className="text-xs font-bold text-slate-200">Navigation Menu</span>
              <button
                onClick={onClose}
                className="p-1 text-slate-400 hover:text-white rounded-lg hover:bg-slate-800"
              >
                <X className="w-5 h-5" />
              </button>
            </div>
            <div className="flex-1 overflow-y-auto">
              {SidebarContent}
            </div>
          </div>
        </div>
      )}
    </>
  );
};

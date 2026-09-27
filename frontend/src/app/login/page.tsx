'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '../../context/AuthContext';
import { Role } from '../../types';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Shield, UserCheck, ArrowRight, Lock } from 'lucide-react';

export default function LoginPage() {
  const router = useRouter();
  const { setRole, demoUsers } = useAuth();

  const handleQuickLogin = (role: Role) => {
    setRole(role);
    router.push('/dashboard');
  };

  return (
    <div className="max-w-md mx-auto py-12 space-y-6">
      <div className="text-center space-y-2">
        <div className="w-12 h-12 bg-blue-600 rounded-2xl mx-auto flex items-center justify-center text-white shadow-lg shadow-blue-500/30">
          <Shield className="w-6 h-6" />
        </div>
        <h1 className="text-2xl font-extrabold text-white">GovTech Platform Login</h1>
        <p className="text-xs text-slate-400">Select a pre-seeded demo user role to enter the platform instantly.</p>
      </div>

      <Card className="space-y-4">
        <div className="text-xs font-bold text-slate-300 uppercase tracking-wider border-b border-slate-800 pb-2">
          1-Click Demo User Logins
        </div>

        <div className="space-y-2.5">
          {demoUsers.map((u) => (
            <button
              key={u.id}
              onClick={() => handleQuickLogin(u.role)}
              className="w-full flex items-center justify-between bg-slate-950 hover:bg-slate-800/80 border border-slate-800 p-3 rounded-xl text-left transition-all group"
            >
              <div className="flex items-center gap-3">
                <img src={u.avatar_url} alt={u.full_name} className="w-9 h-9 rounded-full object-cover border border-slate-700" />
                <div>
                  <h3 className="text-xs font-bold text-slate-200 group-hover:text-blue-400 transition-colors">{u.full_name}</h3>
                  <p className="text-[11px] text-slate-400">{u.organization}</p>
                </div>
              </div>

              <div className="text-right">
                <Badge variant="info">{u.role}</Badge>
              </div>
            </button>
          ))}
        </div>
      </Card>
    </div>
  );
}

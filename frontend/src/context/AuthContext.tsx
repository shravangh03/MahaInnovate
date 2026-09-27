'use client';

import React, { createContext, useContext, useState, useEffect } from 'react';
import { Profile, Role } from '../types';

interface AuthContextType {
  currentRole: Role;
  setRole: (role: Role) => void;
  user: Profile;
  demoUsers: Profile[];
}

const DEMO_USERS: Profile[] = [
  {
    id: 'a1111111-1111-4111-a111-111111111111',
    full_name: 'Dr. Rajesh Sharma',
    email: 'officer@gov.in',
    role: 'Government Officer',
    organization: 'Health Department',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
  },
  {
    id: 'a2222222-2222-4222-a222-222222222222',
    full_name: 'Aarav Patel',
    email: 'startup@medtech.com',
    role: 'Startup',
    organization: 'MedTech Predictive Systems',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
  },
  {
    id: 'a3333333-3333-4333-a333-333333333333',
    full_name: 'Prof. Sunita Rao',
    email: 'evaluator@iit.ac.in',
    role: 'Evaluator',
    organization: 'National Innovation Institute',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'
  },
  {
    id: 'a4444444-4444-4444-a444-444444444444',
    full_name: 'System Administrator',
    email: 'admin@govtech.gov.in',
    role: 'Admin',
    organization: 'GovTech Procurement Directorate',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
  }
];

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [currentRole, setCurrentRole] = useState<Role>('Government Officer');

  const user = DEMO_USERS.find(u => u.role === currentRole) || DEMO_USERS[0];

  const setRole = (role: Role) => {
    setCurrentRole(role);
    if (typeof window !== 'undefined') {
      localStorage.setItem('govtech_role', role);
    }
  };

  useEffect(() => {
    if (typeof window !== 'undefined') {
      const saved = localStorage.getItem('govtech_role') as Role;
      if (saved && ['Government Officer', 'Startup', 'Evaluator', 'Admin'].includes(saved)) {
        setCurrentRole(saved);
      }
    }
  }, []);

  return (
    <AuthContext.Provider value={{ currentRole, setRole, user, demoUsers: DEMO_USERS }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

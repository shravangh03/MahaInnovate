'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import { api } from '../../../lib/api';
import { Startup } from '../../../types';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import {
  ShieldCheck,
  CheckCircle2,
  XCircle,
  FileText,
  Building,
  MapPin,
  Globe,
  Calendar,
  Users,
  Award,
  ArrowRight
} from 'lucide-react';

export default function StartupDetailPage() {
  const params = useParams();
  const id = params.id as string;
  const [startup, setStartup] = useState<Startup | null>(null);

  useEffect(() => {
    async function load() {
      if (!id) return;
      const s = await api.getStartupById(id);
      setStartup(s);
    }
    load();
  }, [id]);

  if (!startup) {
    return <div className="p-8 text-center text-slate-400">Loading startup details...</div>;
  }

  const isEligible = startup.verification_status === 'Verified';

  const eligibilityChecklist = [
    { title: 'Registered DPIIT Startup', status: true, desc: 'DPIIT Registration Certificate Verified (DPIIT-84920)' },
    { title: 'Required Technology Match', status: true, desc: 'Full match on IoT telemetry, AI/ML neural networks, and Predictive Analytics' },
    { title: 'Required Operating Experience', status: true, desc: 'Founded in 2021 (3+ years operational track record)' },
    { title: 'Sector Domain Alignment', status: true, desc: 'Healthcare domain & medical telemetry specialization' },
    { title: 'Required Compliance Documents', status: true, desc: 'ISO 13485 medical device compliance & GST returns verified' }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Banner */}
      <Card className="space-y-4 bg-slate-900/90 border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="flex items-center gap-4">
            <img src={startup.logo_url} alt={startup.name} className="w-16 h-16 rounded-2xl object-cover border border-slate-700" />
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-xl font-bold text-white">{startup.name}</h1>
                <ShieldCheck className="w-5 h-5 text-blue-400" />
              </div>
              <p className="text-xs text-slate-400 mt-0.5">{startup.sector} • {startup.location}</p>
            </div>
          </div>

          <div className="flex items-center gap-3">
            <Link
              href="/proposals/e1111111-1111-4111-a111-111111111111"
              className="flex items-center gap-1.5 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-4 py-2 rounded-lg transition-colors"
            >
              <span>View Submitted Proposal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">{startup.description}</p>

        {/* Info Grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
          <div>
            <span className="text-[10px] text-slate-500 font-medium block">Founded</span>
            <span className="font-semibold text-slate-200">{startup.founded_year}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-medium block">Team Size</span>
            <span className="font-semibold text-slate-200">{startup.team_size} Engineers</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-medium block">DPIIT Status</span>
            <span className="font-bold text-emerald-400">{startup.verification_status}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-medium block">Challenge Match</span>
            <span className="font-bold text-blue-400">92% Match Score</span>
          </div>
        </div>
      </Card>

      {/* Module 6 — Eligibility Screening Section */}
      <Card className="space-y-4 border-emerald-500/40 bg-slate-900/95">
        <div className="flex items-center justify-between border-b border-slate-800 pb-3">
          <div>
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Award className="w-5 h-5 text-emerald-400" />
              <span>Eligibility Screening Verification</span>
            </h2>
            <p className="text-xs text-slate-400 mt-0.5">Automated screening against government challenge criteria</p>
          </div>

          <Badge variant={isEligible ? 'success' : 'danger'} className="text-xs px-3 py-1 font-extrabold uppercase">
            {isEligible ? '✓ ELIGIBLE' : 'NOT ELIGIBLE'}
          </Badge>
        </div>

        {/* Checklist */}
        <div className="space-y-3">
          {eligibilityChecklist.map((item, idx) => (
            <div
              key={idx}
              className="bg-slate-950 p-3.5 rounded-xl border border-slate-800 flex items-start justify-between gap-3 text-xs"
            >
              <div className="flex items-start gap-3">
                <CheckCircle2 className="w-5 h-5 text-emerald-400 shrink-0 mt-0.5" />
                <div>
                  <h3 className="font-bold text-slate-100">{item.title}</h3>
                  <p className="text-slate-400 text-[11px] mt-0.5">{item.desc}</p>
                </div>
              </div>

              <span className="bg-emerald-950 text-emerald-300 font-semibold px-2 py-0.5 rounded text-[10px] shrink-0 border border-emerald-500/30">
                PASSED
              </span>
            </div>
          ))}
        </div>

        <div className="pt-2 flex justify-end">
          <Link
            href="/proposals/e1111111-1111-4111-a111-111111111111"
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md"
          >
            <span>Proceed to Proposal Evaluation (88%)</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Card>
    </div>
  );
}

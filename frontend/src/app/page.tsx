'use client';

import React from 'react';
import Link from 'next/link';
import {
  Shield,
  Sparkles,
  ArrowRight,
  Target,
  Store,
  CheckCircle2,
  Rocket,
  Award,
  ShoppingCart,
  TrendingUp,
  Building2,
  Zap,
  PlayCircle
} from 'lucide-react';
import { Card } from '../components/ui/Card';
import { Badge } from '../components/ui/Badge';

export default function LandingPage() {
  const steps = [
    { title: '1. Challenge Creation', desc: 'Government specifies public sector pain point.', icon: <Target className="w-5 h-5 text-blue-400" /> },
    { title: '2. AI Analysis', desc: 'AI extracts required IoT/AI tech, KPIs & eligibility.', icon: <Sparkles className="w-5 h-5 text-amber-400" /> },
    { title: '3. Startup Marketplace', desc: 'Match top DPIIT startups with 90%+ match scores.', icon: <Store className="w-5 h-5 text-emerald-400" /> },
    { title: '4. Proposal & Evaluation', desc: '7-criteria transparent scoring (Feasibility, Impact).', icon: <CheckCircle2 className="w-5 h-5 text-purple-400" /> },
    { title: '5. Pilot Sandbox', desc: '6-month live trial with real-time telemetry monitoring.', icon: <Rocket className="w-5 h-5 text-teal-400" /> },
    { title: '6. Independent Validation', desc: 'Audit authority verifies target KPI achievements.', icon: <Award className="w-5 h-5 text-indigo-400" /> },
    { title: '7. Procurement & Scale', desc: 'Statewide procurement approval and scaling.', icon: <ShoppingCart className="w-5 h-5 text-rose-400" /> }
  ];

  return (
    <div className="space-y-12 py-4">
      {/* Hero Section */}
      <div className="text-center max-w-4xl mx-auto space-y-6 pt-6">
        <Badge variant="info" className="px-3.5 py-1 text-xs uppercase tracking-wide">
          <Sparkles className="w-3.5 h-3.5" /> Next-Gen GovTech Procurement Framework
        </Badge>
        <h1 className="text-4xl md:text-5xl font-extrabold tracking-tight text-white leading-tight">
          From Government Challenges to <br className="hidden md:block" />
          <span className="bg-clip-text text-transparent bg-gradient-to-r from-blue-400 via-indigo-300 to-emerald-400">
            Scalable Startup Solutions
          </span>
        </h1>
        <p className="text-slate-400 text-sm md:text-base leading-relaxed max-w-2xl mx-auto">
          An end-to-end AI-assisted platform connecting public sector problem statements with verified DPIIT startups through transparent pilot sandboxes, KPI monitoring, and structured procurement scaling.
        </p>

        <div className="flex flex-wrap items-center justify-center gap-4 pt-2">
          <Link
            href="/demo-flow"
            className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-semibold text-sm px-6 py-3 rounded-xl shadow-lg shadow-blue-500/25 transition-all"
          >
            <PlayCircle className="w-4 h-4 text-blue-200 animate-pulse" />
            <span>Interactive Demo (2–5 Min)</span>
          </Link>
          <Link
            href="/challenges"
            className="flex items-center gap-2 bg-slate-900 hover:bg-slate-800 border border-slate-700 text-slate-200 font-semibold text-sm px-6 py-3 rounded-xl transition-all"
          >
            <span>Explore Challenges</span>
            <ArrowRight className="w-4 h-4 text-slate-400" />
          </Link>
        </div>
      </div>

      {/* Visual Lifecycle Pipeline Diagram */}
      <div className="bg-slate-900/90 border border-slate-800 rounded-2xl p-6 md:p-8 space-y-6 shadow-xl">
        <div className="flex items-center justify-between">
          <div>
            <h2 className="text-lg font-bold text-slate-100 flex items-center gap-2">
              <TrendingUp className="w-5 h-5 text-blue-400" />
              <span>Complete Innovation Procurement Lifecycle</span>
            </h2>
            <p className="text-xs text-slate-400 mt-1">Structured 7-stage pipeline from problem framing to statewide procurement scaling</p>
          </div>
          <Badge variant="success">Stage-1 Prototype</Badge>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-7 gap-3 relative">
          {steps.map((step, idx) => (
            <div
              key={step.title}
              className="bg-slate-950/80 border border-slate-800 rounded-xl p-3.5 space-y-2 hover:border-blue-500/40 transition-all text-center flex flex-col justify-between"
            >
              <div className="p-2 bg-slate-900 rounded-lg w-fit mx-auto border border-slate-800">{step.icon}</div>
              <div>
                <h3 className="text-xs font-bold text-slate-200">{step.title}</h3>
                <p className="text-[11px] text-slate-400 mt-1 leading-tight">{step.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Value Propositions */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <Card className="space-y-3">
          <div className="p-3 bg-blue-950/60 w-fit rounded-xl border border-blue-500/30 text-blue-400">
            <Building2 className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-100">For Government Departments</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Automate problem framing using AI assistant, stream pre-screened startup recommendations, and audit pilot performance with real-time telemetry before committing capital.
          </p>
        </Card>

        <Card className="space-y-3">
          <div className="p-3 bg-emerald-950/60 w-fit rounded-xl border border-emerald-500/30 text-emerald-400">
            <Zap className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-100">For Tech Startups</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Direct access to public sector problem statements, streamlined proposal submission, transparent 7-criteria evaluation, and rapid transition into paid sandbox pilots.
          </p>
        </Card>

        <Card className="space-y-3">
          <div className="p-3 bg-purple-950/60 w-fit rounded-xl border border-purple-500/30 text-purple-400">
            <Award className="w-5 h-5" />
          </div>
          <h3 className="text-base font-bold text-slate-100">For Independent Evaluators</h3>
          <p className="text-xs text-slate-400 leading-relaxed">
            Standardized 7-dimension scoring framework (Problem Fit, Feasibility, Innovation, Cost, Scalability, Readiness, Impact) ensuring objective audit compliance.
          </p>
        </Card>
      </div>
    </div>
  );
}

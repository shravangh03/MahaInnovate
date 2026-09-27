'use client';

import React, { useState } from 'react';
import Link from 'next/link';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import {
  PlayCircle,
  CheckCircle2,
  Sparkles,
  Store,
  FileText,
  Rocket,
  Award,
  ShoppingCart,
  ArrowRight,
  Shield,
  RotateCcw
} from 'lucide-react';

export default function DemoFlowWizardPage() {
  const [activeStep, setActiveStep] = useState(0);

  const steps = [
    {
      id: 1,
      title: 'Step 1: Government Officer Dashboard',
      badge: 'Role: Govt Officer',
      desc: 'Start at the Government Officer dashboard and select the primary demo challenge.',
      targetUrl: '/dashboard',
      actionText: 'Go to Government Dashboard',
      preview: {
        heading: 'Smart Hospital Equipment Predictive Maintenance',
        details: 'Department: Health Department | Sector: Healthcare | Budget: ₹5,00,000 - ₹15,00,000'
      }
    },
    {
      id: 2,
      title: 'Step 2: AI Analyze Challenge',
      badge: 'Module 3 — AI Assistant',
      desc: 'Input raw problem statement "Hospital equipment frequently fails unexpectedly" and run AI Analysis.',
      targetUrl: '/challenges/d1111111-1111-4111-a111-111111111111',
      actionText: 'View AI Challenge Output',
      preview: {
        heading: 'Generated Technologies & KPIs',
        details: 'Category: Predictive Maintenance | Required: IoT, AI/ML | Suggested KPI: Equipment Availability >95%'
      }
    },
    {
      id: 3,
      title: 'Step 3: Startup Marketplace & Matching',
      badge: 'Module 4 & 5 — AI Matching',
      desc: 'View AI recommended startups ranked by match percentage.',
      targetUrl: '/marketplace?sector=Healthcare',
      actionText: 'View MedTech 92% Match',
      preview: {
        heading: 'Top Match: MedTech Predictive Systems (92%)',
        details: 'Verified DPIIT Startup | 24 Engineers | IoT & Health AI Telemetry'
      }
    },
    {
      id: 4,
      title: 'Step 4: Eligibility Screening Checklist',
      badge: 'Module 6 — Eligibility',
      desc: 'Verify startup against DPIIT registration, technology stack, and compliance requirements.',
      targetUrl: '/startups/c1111111-1111-4111-a111-111111111111',
      actionText: 'Check Eligibility Badge',
      preview: {
        heading: 'Eligibility Status: ✓ ELIGIBLE',
        details: 'DPIIT Registered | ISO 13485 Compliance | 3+ Years Operational Experience'
      }
    },
    {
      id: 5,
      title: 'Step 5: 7-Criteria Proposal Evaluation',
      badge: 'Module 7 & 8 — Evaluation',
      desc: 'Inspect proposal details and transparent 7-criteria evaluator scoring breakdown.',
      targetUrl: '/proposals/e1111111-1111-4111-a111-111111111111',
      actionText: 'View 88% Evaluation Score',
      preview: {
        heading: 'Overall Score: 88%',
        details: 'Problem Fit: 9/10 | Tech Feasibility: 9/10 | Innovation: 8/10 | Impact: 9/10'
      }
    },
    {
      id: 6,
      title: 'Step 6: Sandbox Pilot & KPI Telemetry',
      badge: 'Module 9 & 10 — Pilot & KPIs',
      desc: 'Monitor 6-month trial execution on 50 ICU units with real-time Recharts KPI charts.',
      targetUrl: '/kpis',
      actionText: 'Open KPI Telemetry Dashboard',
      preview: {
        heading: 'Overall Pilot Achievement: 91%',
        details: 'Equipment Uptime: 97% (Target 95%) | Downtime Reduction: 35% (Target 30%)'
      }
    },
    {
      id: 7,
      title: 'Step 7: Independent Validation Audit',
      badge: 'Module 11 — Validation',
      desc: 'Review official audit certificate issued by National Health Innovation Audit Authority.',
      targetUrl: '/validation',
      actionText: 'View Audit Certificate',
      preview: {
        heading: 'Audit Result: PASSED (91% Score)',
        details: '14 premature failures prevented | Zero patient care interruptions'
      }
    },
    {
      id: 8,
      title: 'Step 8: Scale-Up Procurement Recommendation',
      badge: 'Module 12 — Procurement',
      desc: 'Transition validated solution into statewide public procurement allocation.',
      targetUrl: '/procurement',
      actionText: 'View Procurement Board',
      preview: {
        heading: 'Status: RECOMMENDED FOR SCALE-UP',
        details: 'Allocation: ₹1,20,00,000 (₹1.2 Cr) | Scope: 45 District Hospitals (2,500 ICU beds)'
      }
    },
    {
      id: 9,
      title: 'Step 9: NLP Executive Summary Synthesis',
      badge: 'Module 13 — NLP Report',
      desc: 'Generate automated textual summary for SIH Stage-1 PPT screening presentation.',
      targetUrl: '/reports',
      actionText: 'Generate Executive Report',
      preview: {
        heading: 'Complete Lifecycle Summary Generated',
        details: 'Exportable formatted summary text ready for slide deck presentation.'
      }
    }
  ];

  return (
    <div className="space-y-6 max-w-4xl mx-auto py-2">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-emerald-950 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="success" className="px-3 py-1">
            <PlayCircle className="w-3.5 h-3.5" /> Interactive 2–5 Minute Presentation Mode
          </Badge>
          <h1 className="text-2xl font-bold text-white mt-1">SIH Prototype Demo Guided Flow</h1>
          <p className="text-xs text-slate-400 mt-1">
            Follow the 9 step-by-step interactive stages demonstrating the complete Government Challenge → Startup → Evaluation → Sandbox → Procurement → Scale lifecycle.
          </p>
        </div>

        <button
          onClick={() => setActiveStep(0)}
          className="flex items-center gap-1.5 bg-slate-800 hover:bg-slate-700 text-slate-300 font-semibold text-xs px-3.5 py-2 rounded-lg transition-colors shrink-0"
        >
          <RotateCcw className="w-3.5 h-3.5" />
          <span>Reset Demo Flow</span>
        </button>
      </div>

      {/* Step Progress Bar */}
      <div className="grid grid-cols-3 sm:grid-cols-9 gap-1 text-center">
        {steps.map((s, idx) => (
          <button
            key={s.id}
            onClick={() => setActiveStep(idx)}
            className={`py-2 px-1 rounded-lg text-[10px] font-bold border transition-all ${
              activeStep === idx
                ? 'bg-blue-600 text-white border-blue-400 shadow'
                : activeStep > idx
                ? 'bg-emerald-950 text-emerald-300 border-emerald-500/40'
                : 'bg-slate-900 text-slate-500 border-slate-800'
            }`}
          >
            Stage {s.id}
          </button>
        ))}
      </div>

      {/* Active Step Card */}
      {(() => {
        const current = steps[activeStep];
        return (
          <Card className="space-y-6 border-blue-500/40 bg-slate-900/95 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div className="flex items-center gap-2">
                <Badge variant="info">{current.badge}</Badge>
                <h2 className="text-lg font-bold text-white">{current.title}</h2>
              </div>

              <span className="text-xs text-slate-400 font-semibold">Stage {activeStep + 1} of 9</span>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{current.desc}</p>

            {/* Stage Preview Box */}
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-1.5 text-xs">
              <div className="font-bold text-emerald-400 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                <span>{current.preview.heading}</span>
              </div>
              <p className="text-slate-400 text-[11px]">{current.preview.details}</p>
            </div>

            {/* Next / Launch Controls */}
            <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
              <button
                onClick={() => setActiveStep(Math.max(0, activeStep - 1))}
                disabled={activeStep === 0}
                className="text-xs text-slate-400 hover:text-slate-200 disabled:opacity-30 font-semibold"
              >
                ← Previous Stage
              </button>

              <div className="flex items-center gap-3">
                <Link
                  href={current.targetUrl}
                  className="flex items-center gap-2 bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-500 hover:to-indigo-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-lg transition-all"
                >
                  <span>{current.actionText}</span>
                  <ArrowRight className="w-4 h-4" />
                </Link>

                {activeStep < steps.length - 1 && (
                  <button
                    onClick={() => setActiveStep(activeStep + 1)}
                    className="flex items-center gap-1 bg-emerald-700 hover:bg-emerald-600 text-white font-semibold text-xs px-4 py-2.5 rounded-xl transition-all"
                  >
                    <span>Next Stage →</span>
                  </button>
                )}
              </div>
            </div>
          </Card>
        );
      })()}
    </div>
  );
}

'use client';

import React, { useState } from 'react';
import { api } from '../../lib/api';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { FileCheck, Sparkles, Copy, Check, Download, ArrowRight } from 'lucide-react';
import Link from 'next/link';

export default function ReportsPage() {
  const [reportType, setReportType] = useState('lifecycle');
  const [generating, setGenerating] = useState(false);
  const [reportText, setReportText] = useState(
    `EXECUTIVE LIFECYCLE REPORT:
Challenge: Smart Hospital Equipment Predictive Maintenance
Top Startup Match: MedTech Predictive Systems (92% Match)
Proposal Evaluation: 88% Score (Problem Fit: 9/10, Tech Feasibility: 9/10, Readiness: 9/10)
Pilot KPI Achievement: 91% Overall (Uptime: 97%, Downtime Reduction: 35%, Prediction Accuracy: 91%)
Independent Audit: PASSED (Zero non-conformances)
Procurement Recommendation: APPROVED for Statewide Rollout (₹1,20,00,000 / ₹1.2 Cr budget allocation).`
  );
  const [copied, setCopied] = useState(false);

  const handleGenerate = async () => {
    setGenerating(true);
    try {
      const data = await api.generateReportAI(reportType, 'd1111111-1111-4111-a111-111111111111');
      setReportText(data.report);
    } catch (e) {
      console.error(e);
    } finally {
      setGenerating(false);
    }
  };

  const handleCopy = () => {
    navigator.clipboard.writeText(reportText);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="info" className="px-3 py-1">
            <Sparkles className="w-3.5 h-3.5" /> NLP Report Generator Module
          </Badge>
          <h1 className="text-2xl font-bold text-white mt-1">Automated Executive Report Synthesis</h1>
          <p className="text-xs text-slate-400 mt-1">
            Generate readable summaries and slide deck exports from live platform data for SIH Stage-1 PPT screening.
          </p>
        </div>
      </div>

      <Card className="space-y-4">
        <div className="flex flex-col sm:flex-row items-center justify-between gap-4 border-b border-slate-800 pb-3 text-xs">
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <label className="font-bold text-slate-300">Report Scope:</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-1.5 text-slate-200 focus:outline-none focus:border-blue-500"
            >
              <option value="lifecycle">End-to-End Lifecycle Report</option>
              <option value="pilot">Pilot Sandbox Performance Summary</option>
              <option value="procurement">Procurement Recommendation Note</option>
            </select>
          </div>

          <button
            onClick={handleGenerate}
            disabled={generating}
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs px-4 py-2 rounded-lg transition-all shadow"
          >
            <Sparkles className="w-4 h-4 text-blue-200" />
            <span>{generating ? 'Synthesizing Report...' : 'Generate NLP Summary'}</span>
          </button>
        </div>

        {/* Report Output Box */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-xs text-slate-400 font-semibold">
            <span>Generated Text Report</span>
            <button
              onClick={handleCopy}
              className="flex items-center gap-1.5 text-blue-400 hover:text-blue-300 transition-colors"
            >
              {copied ? <Check className="w-3.5 h-3.5 text-emerald-400" /> : <Copy className="w-3.5 h-3.5" />}
              <span>{copied ? 'Copied!' : 'Copy Summary'}</span>
            </button>
          </div>

          <textarea
            rows={10}
            readOnly
            value={reportText}
            className="w-full bg-slate-950 border border-slate-800 rounded-xl p-4 font-mono text-xs text-emerald-300 leading-relaxed focus:outline-none"
          />
        </div>

        {/* Footer Actions */}
        <div className="pt-2 flex justify-between items-center border-t border-slate-800">
          <Link href="/admin" className="text-xs text-slate-400 hover:text-slate-200 font-semibold">
            ← Back to Admin Analytics
          </Link>

          <Link
            href="/demo-flow"
            className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2 rounded-xl transition-all"
          >
            <span>Replay Complete 2–5 Min Demo Scenario</span>
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </Card>
    </div>
  );
}

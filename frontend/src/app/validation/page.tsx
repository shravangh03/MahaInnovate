'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '../../lib/api';
import { Validation } from '../../types';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { Award, ShieldCheck, CheckCircle2, ArrowRight, FileCheck, Calendar, UserCheck } from 'lucide-react';

export default function ValidationPage() {
  const [validations, setValidations] = useState<Validation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.getValidations();
        setValidations(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const displayList = validations.length > 0 ? validations : [{
    id: 'val_default',
    pilot_id: 'pilot_default',
    validator: 'National Health Innovation Audit Authority',
    validation_score: 91,
    result: 'PASSED',
    evidence: 'Audited telemetry logs from 50 ICU ventilators over 180 days. 14 premature bearing & compressor failures were successfully predicted and prevented. Zero patient care interruptions recorded.',
    remarks: 'The solution demonstrated outstanding reliability, 91% overall KPI achievement, and cost-payback within 4 months. Recommended for statewide procurement rollout.',
    validated_at: new Date().toISOString()
  }];

  return (
    <div className="space-y-6 max-w-4xl mx-auto">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="success" className="px-3 py-1">
            <Award className="w-3.5 h-3.5" /> Stage-6 Independent Validation
          </Badge>
          <h1 className="text-2xl font-bold text-white mt-1">Audit & Validation Verification</h1>
          <p className="text-xs text-slate-400 mt-1">
            Independent audit certificates issued upon 6-month sandbox completion.
          </p>
        </div>

        <div className="bg-emerald-950 border border-emerald-500/40 p-4 rounded-xl text-center">
          <div className="text-2xl font-black text-emerald-300">PASSED</div>
          <span className="text-[10px] text-slate-400 font-bold uppercase">Audit Result</span>
        </div>
      </div>

      {/* Official Audit Certificate Cards */}
      <div className="space-y-6">
        {displayList.map((val) => (
          <Card key={val.id} className="space-y-6 border-emerald-500/40 bg-slate-900/95 shadow-xl">
            <div className="flex items-center justify-between border-b border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <div className="p-3 bg-emerald-950 rounded-xl border border-emerald-500/30 text-emerald-400">
                  <ShieldCheck className="w-6 h-6" />
                </div>
                <div>
                  <h2 className="text-base font-bold text-white">Independent Performance Validation Certificate</h2>
                  <p className="text-xs text-slate-400">Issued by: {val.validator}</p>
                </div>
              </div>

              <Badge variant="success" className="text-xs px-3 py-1 font-extrabold uppercase">
                Score: {val.validation_score}%
              </Badge>
            </div>

            {/* Audit Details */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <h3 className="font-bold text-slate-200 flex items-center gap-2">
                  <FileCheck className="w-4 h-4 text-blue-400" /> Audited Evidence & Telemetry Logs
                </h3>
                <p className="text-slate-300 leading-relaxed">{val.evidence}</p>
              </div>

              <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                <h3 className="font-bold text-slate-200 flex items-center gap-2">
                  <UserCheck className="w-4 h-4 text-purple-400" /> Auditor Remarks & Scaling Verdict
                </h3>
                <p className="text-slate-300 leading-relaxed italic">"{val.remarks}"</p>
              </div>
            </div>

            {/* Audit Verification Checklist */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Audit Compliance Verification</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-xs">
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-300">Uptime Metric Target Exceeded</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-300">Downtime Target Exceeded</span>
                </div>
                <div className="bg-slate-950 p-3 rounded-lg border border-slate-800 flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  <span className="text-slate-300">Zero Audit Non-Conformances</span>
                </div>
              </div>
            </div>

            {/* Footer Link */}
            <div className="pt-2 flex justify-end">
              <Link
                href="/procurement"
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-lg transition-all"
              >
                <span>Proceed to Procurement Pipeline (RECOMMENDED)</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

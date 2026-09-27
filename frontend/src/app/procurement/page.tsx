'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '../../lib/api';
import { Procurement } from '../../types';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { ShoppingCart, CheckCircle2, ArrowRight, ShieldCheck, DollarSign, Building2, Rocket, FileText } from 'lucide-react';

export default function ProcurementPage() {
  const [procurements, setProcurements] = useState<Procurement[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.getProcurements();
        setProcurements(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  const displayList = procurements.length > 0 ? procurements : [{
    id: 'prc_default',
    pilot_id: 'pilot_default',
    startup_id: 'c1111111-1111-4111-a111-111111111111',
    startup_name: 'MedTech Predictive Systems',
    recommended_budget: 1200000,
    deployment_scope: 'Statewide deployment across 45 District Hospitals (covering 2,500 ICU beds & biomedical equipment units).',
    status: 'Recommended',
    created_at: new Date().toISOString()
  }];

  const stages = [
    { title: '1. Recommended', active: true, desc: 'Validated & recommended by Directorate' },
    { title: '2. Under Procurement', active: false, desc: 'Financial sanction & tender finalization' },
    { title: '3. Approved', active: false, desc: 'State Cabinet procurement approval' },
    { title: '4. Scaled', active: false, desc: 'Statewide rollout execution' }
  ];

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="purple" className="px-3 py-1">
            <ShoppingCart className="w-3.5 h-3.5" /> Stage-7 Scale-Up Procurement
          </Badge>
          <h1 className="text-2xl font-bold text-white mt-1">Statewide Procurement Board</h1>
          <p className="text-xs text-slate-400 mt-1">
            Transitioning validated pilot sandbox solutions into government procurement scale-up contracts.
          </p>
        </div>

        <Link
          href="/reports"
          className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg transition-all"
        >
          <FileText className="w-4 h-4 text-purple-200" />
          <span>Generate NLP Executive Report</span>
        </Link>
      </div>

      {/* Visual Pipeline Board */}
      <Card className="space-y-6 border-purple-500/40 bg-slate-900/95">
        <h2 className="text-sm font-bold text-white uppercase tracking-wider flex items-center gap-2 border-b border-slate-800 pb-3">
          <ShoppingCart className="w-4 h-4 text-purple-400" />
          <span>Procurement Pipeline Stages</span>
        </h2>

        <div className="grid grid-cols-1 sm:grid-cols-4 gap-3">
          {stages.map((stage, idx) => (
            <div
              key={idx}
              className={`p-4 rounded-xl border text-xs space-y-2 text-center transition-all ${
                stage.active
                  ? 'bg-purple-950/80 border-purple-500 text-purple-200 font-bold shadow-lg shadow-purple-950/40'
                  : 'bg-slate-950 border-slate-800 text-slate-400'
              }`}
            >
              <div className="flex items-center justify-center gap-1.5">
                {stage.active && <span className="w-2 h-2 rounded-full bg-purple-400 animate-ping"></span>}
                <span>{stage.title}</span>
              </div>
              <p className="text-[11px] text-slate-400 leading-tight">{stage.desc}</p>
            </div>
          ))}
        </div>
      </Card>

      {/* Recommended Solutions List */}
      <div className="space-y-4">
        {displayList.map((item) => (
          <Card key={item.id} className="space-y-4 border-slate-800">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <Badge variant="purple">{item.status || 'RECOMMENDED FOR SCALE-UP'}</Badge>
                <h3 className="text-base font-bold text-white mt-1">{item.startup_name || 'Innovator Startup'}</h3>
              </div>
              <span className="text-xl font-black text-emerald-400">${(item.recommended_budget || 0).toLocaleString()} Allocation</span>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
              <h4 className="font-semibold text-slate-300 flex items-center gap-2">
                <Building2 className="w-4 h-4 text-blue-400" /> Deployment Scope
              </h4>
              <p className="text-slate-300 leading-relaxed">{item.deployment_scope}</p>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
              <div>
                <span className="text-[10px] text-slate-500 font-semibold uppercase block">Proposal Status</span>
                <span className="font-bold text-indigo-400">Evaluated & Shortlisted</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-semibold uppercase block">Pilot Achievement</span>
                <span className="font-bold text-emerald-400">91% (Target Exceeded)</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-semibold uppercase block">Audit Certificate</span>
                <span className="font-bold text-purple-400">PASSED</span>
              </div>
            </div>

            {/* Footer */}
            <div className="pt-2 flex justify-end">
              <Link
                href="/reports"
                className="flex items-center gap-2 bg-gradient-to-r from-purple-600 to-indigo-600 hover:from-purple-500 hover:to-indigo-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-lg transition-all"
              >
                <span>Export Lifecycle Summary Report</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

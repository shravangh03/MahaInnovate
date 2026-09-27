'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '../../lib/api';
import { Pilot } from '../../types';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import {
  Rocket,
  BarChart3,
  Award,
  ArrowRight,
  MapPin,
  Calendar,
  IndianRupee,
  CheckCircle2
} from 'lucide-react';

export default function PilotsPage() {
  const [pilots, setPilots] = useState<Pilot[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.getPilots();
        setPilots(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Rocket className="w-6 h-6 text-teal-400" />
            <span>Pilot Sandbox Dashboard</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Monitor 6-month trial deployments in public hospital sandboxes with live telemetry KPI tracking.
          </p>
        </div>

        <Link
          href="/kpis"
          className="flex items-center gap-2 bg-gradient-to-r from-teal-600 to-emerald-600 hover:from-teal-500 hover:to-emerald-500 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow transition-all"
        >
          <BarChart3 className="w-4 h-4 text-teal-200" />
          <span>View Real-Time KPI Telemetry Charts</span>
        </Link>
      </div>

      {/* Pilots List */}
      <div className="space-y-6">
        {pilots.map((p) => (
          <Card key={p.id} className="space-y-4 border-teal-500/40 bg-slate-900/95">
            <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b border-slate-800 pb-3">
              <div>
                <div className="flex items-center gap-2">
                  <Badge variant="success">{p.status}</Badge>
                  <span className="text-xs font-semibold text-slate-400">{p.startup_name || 'Startup Sandbox Participant'}</span>
                </div>
                <h2 className="text-base font-bold text-white mt-1">{p.challenge_title || 'Sandbox Pilot Project'}</h2>
              </div>

              <div className="bg-teal-950/80 border border-teal-500/40 px-3.5 py-1.5 rounded-xl text-center">
                <div className="text-xl font-extrabold text-teal-300">{p.overall_achievement || 91}%</div>
                <span className="text-[9px] text-slate-400 font-bold uppercase">KPI Achievement</span>
              </div>
            </div>

            <p className="text-xs text-slate-300 leading-relaxed">{p.objectives}</p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
              <div className="flex items-center gap-1.5 text-slate-300">
                <MapPin className="w-3.5 h-3.5 text-blue-400 shrink-0" />
                <span className="truncate">{p.location || 'Statewide Sandbox'}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <Calendar className="w-3.5 h-3.5 text-amber-400 shrink-0" />
                <span>{p.start_date} to {p.end_date}</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <IndianRupee className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                <span>₹{(p.budget || 0).toLocaleString()} Allocated</span>
              </div>
              <div className="flex items-center gap-1.5 text-slate-300">
                <CheckCircle2 className="w-3.5 h-3.5 text-purple-400 shrink-0" />
                <span>Live Telemetry Connected</span>
              </div>
            </div>

            {/* Live KPI Performance Cards */}
            <div className="space-y-2">
              <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider">Monitored Sandbox KPIs</h3>
              <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                {(p.kpis || []).map((kpi) => (
                  <div key={kpi.id} className="bg-slate-950 p-3 rounded-xl border border-slate-800 space-y-1 text-xs">
                    <div className="flex justify-between items-center text-slate-400 text-[11px]">
                      <span>{kpi.name}</span>
                      <span className="text-emerald-400 font-bold">{kpi.actual_value}{kpi.unit}</span>
                    </div>
                    <div className="w-full h-1.5 bg-slate-900 rounded-full overflow-hidden">
                      <div className="h-full bg-emerald-400 rounded-full" style={{ width: `${Math.min(100, ((kpi.actual_value || 0) / kpi.target_value) * 100)}%` }}></div>
                    </div>
                    <div className="flex justify-between text-[10px] text-slate-500">
                      <span>Target: {kpi.target_value}{kpi.unit}</span>
                      <span>Actual: {kpi.actual_value}{kpi.unit}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Footer */}
            <div className="pt-2 flex items-center justify-between border-t border-slate-800">
              <Link href="/kpis" className="text-xs text-teal-400 hover:text-teal-300 font-semibold">
                Open Full Telemetry Dashboard →
              </Link>
              <Link
                href="/validation"
                className="flex items-center gap-1.5 bg-teal-600 hover:bg-teal-500 text-white font-semibold text-xs px-4 py-2 rounded-lg transition-colors"
              >
                <span>Proceed to Independent Validation</span>
                <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

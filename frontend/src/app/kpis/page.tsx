'use client';

import React from 'react';
import Link from 'next/link';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { BarChart3, TrendingUp, CheckCircle2, ArrowRight, Activity, ShieldCheck } from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line
} from 'recharts';

export default function KPIMonitoringPage() {
  const kpiCards = [
    {
      name: 'Equipment Availability',
      target: 95,
      actual: 97,
      unit: '%',
      achievement: '102%',
      status: 'Target Exceeded',
      desc: 'Operational uptime across 50 ICU ventilators and 10 dialysis machines.'
    },
    {
      name: 'Downtime Reduction',
      target: 30,
      actual: 35,
      unit: '%',
      achievement: '116%',
      status: 'Target Exceeded',
      desc: 'Reduction in unscheduled breakdown hours compared to baseline quarter.'
    },
    {
      name: 'Maintenance Prediction Accuracy',
      target: 85,
      actual: 91,
      unit: '%',
      achievement: '107%',
      status: 'Target Exceeded',
      desc: 'Accuracy of neural acoustic anomaly alerts generated 48h prior to fault.'
    }
  ];

  const chartData = [
    { name: 'Equipment Availability (%)', Target: 95, Actual: 97 },
    { name: 'Downtime Reduction (%)', Target: 30, Actual: 35 },
    { name: 'Prediction Accuracy (%)', Target: 85, Actual: 91 }
  ];

  const telemetryTimeline = [
    { month: 'Month 1', Uptime: 92, AnomalyAlerts: 4 },
    { month: 'Month 2', Uptime: 94, AnomalyAlerts: 6 },
    { month: 'Month 3', Uptime: 95, AnomalyAlerts: 5 },
    { month: 'Month 4', Uptime: 96, AnomalyAlerts: 8 },
    { month: 'Month 5', Uptime: 97, AnomalyAlerts: 7 },
    { month: 'Month 6', Uptime: 97, AnomalyAlerts: 9 }
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Badge variant="success" className="px-3 py-1">
            <Activity className="w-3.5 h-3.5" /> Real-Time Telemetry Stream
          </Badge>
          <h1 className="text-2xl font-bold text-white mt-1 flex items-center gap-2">
            <BarChart3 className="w-6 h-6 text-emerald-400" />
            <span>Pilot Sandbox KPI Monitoring</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Live telemetry KPI performance data for Smart Hospital Equipment Predictive Maintenance Pilot (MedTech).
          </p>
        </div>

        <div className="bg-emerald-950/80 border border-emerald-500/40 px-5 py-2.5 rounded-2xl text-center">
          <div className="text-3xl font-black text-emerald-300">91%</div>
          <span className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Overall Pilot Achievement</span>
        </div>
      </div>

      {/* KPI Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {kpiCards.map((kpi, idx) => (
          <Card key={idx} className="space-y-3 border-emerald-500/30 bg-slate-900/90">
            <div className="flex items-center justify-between">
              <Badge variant="success">{kpi.status}</Badge>
              <span className="text-xs font-extrabold text-emerald-400 bg-emerald-950 px-2 py-0.5 rounded border border-emerald-500/30">
                {kpi.achievement}
              </span>
            </div>

            <h3 className="text-sm font-bold text-white">{kpi.name}</h3>
            <p className="text-[11px] text-slate-400">{kpi.desc}</p>

            <div className="flex items-baseline justify-between pt-2">
              <div>
                <span className="text-[10px] text-slate-500 block uppercase font-semibold">Target</span>
                <span className="text-base font-bold text-slate-300">{kpi.target}{kpi.unit}</span>
              </div>

              <div className="text-right">
                <span className="text-[10px] text-slate-500 block uppercase font-semibold">Actual</span>
                <span className="text-xl font-extrabold text-emerald-400">{kpi.actual}{kpi.unit}</span>
              </div>
            </div>

            {/* Progress Bar */}
            <div className="w-full h-2 bg-slate-950 rounded-full overflow-hidden border border-slate-800">
              <div
                className="h-full bg-gradient-to-r from-teal-400 to-emerald-400 rounded-full"
                style={{ width: `${Math.min(100, (kpi.actual / kpi.target) * 100)}%` }}
              ></div>
            </div>
          </Card>
        ))}
      </div>

      {/* Recharts Comparison Chart Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="space-y-4">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
            <BarChart3 className="w-4 h-4 text-emerald-400" />
            <span>Target vs Actual KPI Achievement</span>
          </h3>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={chartData} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="name" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Bar dataKey="Target" fill="#3b82f6" radius={[4, 4, 0, 0]} />
                <Bar dataKey="Actual" fill="#10b981" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="space-y-4">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
            <TrendingUp className="w-4 h-4 text-blue-400" />
            <span>6-Month Uptime & Anomaly Alert Telemetry Trend</span>
          </h3>

          <div className="h-72 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <LineChart data={telemetryTimeline} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="month" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
                <Legend wrapperStyle={{ fontSize: '11px', paddingTop: '10px' }} />
                <Line type="monotone" dataKey="Uptime" stroke="#10b981" strokeWidth={3} dot={{ r: 4 }} />
                <Line type="monotone" dataKey="AnomalyAlerts" stroke="#f59e0b" strokeWidth={2} dot={{ r: 4 }} />
              </LineChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>

      {/* Navigation Footer */}
      <div className="flex justify-end pt-2">
        <Link
          href="/validation"
          className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-lg transition-all"
        >
          <span>View Independent Validation Certificate (PASSED)</span>
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import { api } from '../../lib/api';
import { Card } from '../../components/ui/Card';
import { MetricsCard } from '../../components/ui/MetricsCard';
import { Badge } from '../../components/ui/Badge';
import {
  LayoutDashboard,
  Target,
  Store,
  FileText,
  Rocket,
  Award,
  ShoppingCart,
  BarChart3,
  PieChart as PieIcon,
  TrendingUp
} from 'lucide-react';
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell
} from 'recharts';

export default function AdminDashboardPage() {
  const [metrics, setMetrics] = useState<any>(null);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.getAdminMetrics();
        setMetrics(data);
      } catch (e) {
        console.error(e);
      }
    }
    load();
  }, []);

  const sectorData = [
    { name: 'Healthcare', value: 2 },
    { name: 'Urban Dev', value: 2 },
    { name: 'Agriculture', value: 1 }
  ];

  const proposalFunnel = [
    { stage: 'Submitted', count: 10 },
    { stage: 'Under Review', count: 6 },
    { stage: 'Shortlisted', count: 3 },
    { stage: 'Pilot Selected', count: 2 }
  ];

  const COLORS = ['#3b82f6', '#10b981', '#f59e0b', '#8b5cf6'];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <Badge variant="purple" className="px-3 py-1">
            <LayoutDashboard className="w-3.5 h-3.5" /> Platform Governance
          </Badge>
          <h1 className="text-2xl font-bold text-white mt-1">Admin Analytics & System Control</h1>
          <p className="text-xs text-slate-400 mt-1">
            Aggregated system metrics, sector distribution, proposal funnels, and procurement pipeline analytics.
          </p>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricsCard
          title="Total Challenges"
          value={metrics?.totalChallenges || 5}
          subtitle="Across 3 Depts"
          icon={<Target className="w-5 h-5 text-blue-400" />}
        />
        <MetricsCard
          title="Total Startups"
          value={metrics?.totalStartups || 8}
          subtitle="DPIIT Verified"
          icon={<Store className="w-5 h-5 text-emerald-400" />}
        />
        <MetricsCard
          title="Active Pilots"
          value={metrics?.activePilots || 1}
          subtitle="91% KPI Avg"
          icon={<Rocket className="w-5 h-5 text-teal-400" />}
        />
        <MetricsCard
          title="Procurements"
          value={metrics?.procurementRecommendations || 1}
          subtitle="$1.2M Allocation"
          icon={<ShoppingCart className="w-5 h-5 text-purple-400" />}
        />
      </div>

      {/* Recharts Analytics Section */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <Card className="space-y-4">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
            <BarChart3 className="w-4 h-4 text-blue-400" />
            <span>Proposal Funnel Stage Breakdown</span>
          </h3>

          <div className="h-64 w-full pt-2">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={proposalFunnel} margin={{ top: 10, right: 10, left: -20, bottom: 0 }}>
                <CartesianGrid strokeDasharray="3 3" stroke="#334155" />
                <XAxis dataKey="stage" stroke="#94a3b8" fontSize={10} tickLine={false} />
                <YAxis stroke="#94a3b8" fontSize={10} tickLine={false} />
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
                <Bar dataKey="count" fill="#8b5cf6" radius={[4, 4, 0, 0]} />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </Card>

        <Card className="space-y-4">
          <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-3">
            <PieIcon className="w-4 h-4 text-emerald-400" />
            <span>Challenges Distribution by Sector</span>
          </h3>

          <div className="h-64 w-full pt-2 flex items-center justify-center">
            <ResponsiveContainer width="100%" height="100%">
              <PieChart>
                <Pie data={sectorData} cx="50%" cy="50%" innerRadius={50} outerRadius={80} paddingAngle={5} dataKey="value" label>
                  {sectorData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip contentStyle={{ backgroundColor: '#0f172a', borderColor: '#334155', borderRadius: '8px', fontSize: '12px' }} />
              </PieChart>
            </ResponsiveContainer>
          </div>
        </Card>
      </div>
    </div>
  );
}

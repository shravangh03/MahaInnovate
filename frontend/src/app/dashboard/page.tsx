'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useAuth } from '../../context/AuthContext';
import { api } from '../../lib/api';
import { Challenge, Proposal, Pilot, Validation } from '../../types';
import { MetricsCard } from '../../components/ui/MetricsCard';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import {
  Target,
  FileText,
  Rocket,
  Award,
  Sparkles,
  ArrowRight,
  CheckCircle2,
  Clock,
  Activity
} from 'lucide-react';

export default function DashboardPage() {
  const { currentRole, user } = useAuth();
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [pilots, setPilots] = useState<Pilot[]>([]);
  const [validations, setValidations] = useState<Validation[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      try {
        const [cList, pList, piList, vList] = await Promise.all([
          api.getChallenges(),
          api.getProposals(),
          api.getPilots(),
          api.getValidations()
        ]);
        setChallenges(cList);
        setProposals(pList);
        setPilots(piList);
        setValidations(vList);
      } catch (e) {
        console.error('Error loading dashboard data:', e);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  return (
    <div className="space-y-6">
      {/* Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-blue-950 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row items-start md:items-center justify-between gap-4">
        <div>
          <div className="flex items-center gap-2 text-xs text-blue-400 font-semibold uppercase tracking-wider">
            <span className="w-2 h-2 rounded-full bg-emerald-400"></span>
            Role: {currentRole}
          </div>
          <h1 className="text-2xl font-extrabold text-white mt-1">Welcome back, {user.full_name}</h1>
          <p className="text-xs text-slate-400 mt-1">
            {user.organization} • SIH GovTech Procurement Portal Overview
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/demo-flow"
            className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white font-semibold text-xs px-4 py-2.5 rounded-lg shadow-md transition-all border border-emerald-400/30"
          >
            <Sparkles className="w-4 h-4 text-emerald-200" />
            <span>Launch Primary Demo Scenario</span>
          </Link>
        </div>
      </div>

      {/* Metrics Row */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <MetricsCard
          title="Active Challenges"
          value={challenges.length}
          subtitle="2 Under AI Analysis"
          icon={<Target className="w-5 h-5 text-blue-400" />}
          trend="+1 this week"
          trendPositive={true}
        />
        <MetricsCard
          title="Submitted Proposals"
          value={proposals.length}
          subtitle="1 Shortlisted for Pilot"
          icon={<FileText className="w-5 h-5 text-indigo-400" />}
          trend="88% Top Score"
          trendPositive={true}
        />
        <MetricsCard
          title="Active Sandbox Pilots"
          value={pilots.length}
          subtitle="91% Overall Achievement"
          icon={<Rocket className="w-5 h-5 text-emerald-400" />}
          trend="Target Exceeded"
          trendPositive={true}
        />
        <MetricsCard
          title="Validated Solutions"
          value={validations.length}
          subtitle="Recommended for Rollout"
          icon={<Award className="w-5 h-5 text-purple-400" />}
          trend="PASSED"
          trendPositive={true}
        />
      </div>

      {/* Main Content Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* Left Column: Primary Demo Challenge Status */}
        <div className="lg:col-span-2 space-y-6">
          <Card className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <div>
                <Badge variant="info">Primary Demo Challenge</Badge>
                <h2 className="text-base font-bold text-slate-100 mt-1">
                  Smart Hospital Equipment Predictive Maintenance
                </h2>
              </div>
              <Link
                href="/challenges/d1111111-1111-4111-a111-111111111111"
                className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
              >
                <span>View Full Lifecycle</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>

            <p className="text-xs text-slate-400 leading-relaxed">
              Develop an intelligent solution for monitoring hospital equipment (ICU ventilators, MRI scanners) and predicting maintenance requirements using IoT sensors and AI.
            </p>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950/80 p-3 rounded-xl border border-slate-800 text-xs">
              <div>
                <span className="text-[10px] text-slate-500 font-medium block">Sector</span>
                <span className="font-semibold text-slate-200">Healthcare</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-medium block">Top Match</span>
                <span className="font-bold text-emerald-400">92% (MedTech)</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-medium block">Pilot Status</span>
                <span className="font-bold text-blue-400">91% KPI Achieved</span>
              </div>
              <div>
                <span className="text-[10px] text-slate-500 font-medium block">Procurement</span>
                <span className="font-bold text-purple-400">RECOMMENDED</span>
              </div>
            </div>

            {/* Lifecycle Mini Bar */}
            <div className="space-y-1.5">
              <div className="flex justify-between text-[11px] font-semibold text-slate-400">
                <span>Lifecycle Progression</span>
                <span className="text-emerald-400">100% Completed</span>
              </div>
              <div className="w-full h-2 bg-slate-800 rounded-full overflow-hidden flex">
                <div className="h-full bg-blue-500 w-1/4"></div>
                <div className="h-full bg-indigo-500 w-1/4"></div>
                <div className="h-full bg-teal-500 w-1/4"></div>
                <div className="h-full bg-emerald-500 w-1/4"></div>
              </div>
            </div>
          </Card>

          {/* Recent Platform Challenges */}
          <Card className="space-y-4">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
                <Target className="w-4 h-4 text-blue-400" />
                <span>Active Government Challenges</span>
              </h3>
              <Link href="/challenges" className="text-xs text-blue-400 hover:text-blue-300 font-semibold">
                View All →
              </Link>
            </div>

            <div className="space-y-3">
              {challenges.map((c) => (
                <div
                  key={c.id}
                  className="bg-slate-950/60 border border-slate-800/80 rounded-xl p-3.5 flex items-center justify-between hover:border-slate-700 transition-all"
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <Badge variant={c.status === 'Published' ? 'info' : 'warning'}>{c.status}</Badge>
                      <span className="text-xs font-semibold text-slate-400">{c.sector}</span>
                    </div>
                    <h4 className="text-xs font-bold text-slate-200">{c.title}</h4>
                  </div>

                  <Link
                    href={`/challenges/${c.id}`}
                    className="text-xs bg-slate-800 hover:bg-slate-700 text-slate-300 px-3 py-1.5 rounded-md font-medium transition-colors"
                  >
                    Details
                  </Link>
                </div>
              ))}
            </div>
          </Card>
        </div>

        {/* Right Column: Quick Action Panel & Activity Log */}
        <div className="space-y-6">
          <Card className="space-y-4">
            <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2">
              <Activity className="w-4 h-4 text-amber-400" />
              <span>Quick Actions</span>
            </h3>

            <div className="space-y-2.5">
              <Link
                href="/ai-assistant"
                className="w-full flex items-center justify-between bg-blue-950/40 hover:bg-blue-900/50 border border-blue-500/30 text-blue-300 p-3 rounded-xl text-xs font-semibold transition-all"
              >
                <span className="flex items-center gap-2">
                  <Sparkles className="w-4 h-4 text-blue-400" />
                  AI Analyze Problem Statement
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/marketplace"
                className="w-full flex items-center justify-between bg-emerald-950/40 hover:bg-emerald-900/50 border border-emerald-500/30 text-emerald-300 p-3 rounded-xl text-xs font-semibold transition-all"
              >
                <span className="flex items-center gap-2">
                  <CheckCircle2 className="w-4 h-4 text-emerald-400" />
                  Match Startups (MedTech 92%)
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>

              <Link
                href="/kpis"
                className="w-full flex items-center justify-between bg-purple-950/40 hover:bg-purple-900/50 border border-purple-500/30 text-purple-300 p-3 rounded-xl text-xs font-semibold transition-all"
              >
                <span className="flex items-center gap-2">
                  <Rocket className="w-4 h-4 text-purple-400" />
                  View Pilot Telemetry & KPIs
                </span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>

          {/* Activity Log */}
          <Card className="space-y-3">
            <h3 className="text-xs font-bold text-slate-400 uppercase tracking-wider">Live Activity Audit Log</h3>

            <div className="space-y-2.5 text-xs">
              <div className="flex items-start gap-2.5 border-l-2 border-emerald-500 pl-3 py-0.5">
                <div>
                  <p className="font-semibold text-slate-200">Validation Passed (91% KPI)</p>
                  <p className="text-[11px] text-slate-500">MedTech Pilot • 2 hours ago</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 border-l-2 border-blue-500 pl-3 py-0.5">
                <div>
                  <p className="font-semibold text-slate-200">Evaluation Score Recorded (88%)</p>
                  <p className="text-[11px] text-slate-500">Evaluator Prof. Sunita Rao • 1 day ago</p>
                </div>
              </div>

              <div className="flex items-start gap-2.5 border-l-2 border-purple-500 pl-3 py-0.5">
                <div>
                  <p className="font-semibold text-slate-200">Procurement Recommended</p>
                  <p className="text-[11px] text-slate-500">Health Dept Directorate • 2 days ago</p>
                </div>
              </div>
            </div>
          </Card>
        </div>
      </div>
    </div>
  );
}

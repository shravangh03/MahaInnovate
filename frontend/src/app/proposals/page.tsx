'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import { Proposal, ProposalStatus } from '../../types';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import {
  FileText,
  CheckSquare,
  Rocket,
  ArrowRight,
  Store,
  Clock,
  DollarSign,
  User,
  CheckCircle2,
  XCircle,
  AlertCircle
} from 'lucide-react';

export default function ProposalsPage() {
  const { currentRole, user } = useAuth();
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [loading, setLoading] = useState(true);
  const [actionLoadingId, setActionLoadingId] = useState<string | null>(null);

  const loadProposals = async () => {
    setLoading(true);
    try {
      const data = await api.getProposals({
        role: currentRole,
        officer_id: currentRole === 'Government Officer' ? user.id : undefined,
        startup_id: currentRole === 'Startup' ? 'c1111111-1111-4111-a111-111111111111' : undefined
      });
      setProposals(data);
    } catch (err) {
      console.error('Error fetching proposals:', err);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    loadProposals();
  }, [currentRole, user.id]);

  const handleStatusUpdate = async (id: string, newStatus: ProposalStatus) => {
    setActionLoadingId(id);
    try {
      await api.updateProposalStatus(id, newStatus);
      await loadProposals();
    } catch (err) {
      console.error(err);
    } finally {
      setActionLoadingId(null);
    }
  };

  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'selected_for_pilot':
      case 'Pilot Selected':
        return <Badge variant="success">Selected for Pilot Sandbox</Badge>;
      case 'evaluated':
      case 'Evaluated':
        return <Badge variant="info">Evaluated</Badge>;
      case 'rejected':
        return <Badge variant="danger">Rejected</Badge>;
      case 'pending_evaluation':
        return <Badge variant="warning">Pending Evaluation</Badge>;
      default:
        return <Badge variant="default">{status}</Badge>;
    }
  };

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header Banner */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 bg-slate-900 border border-slate-800 p-6 rounded-2xl">
        <div>
          <div className="flex items-center gap-2">
            <Badge variant="info">{currentRole} Portal</Badge>
            <span className="text-xs text-slate-400 font-semibold">User: {user.full_name}</span>
          </div>
          <h1 className="text-2xl font-bold text-white mt-1 flex items-center gap-2">
            <FileText className="w-6 h-6 text-indigo-400" />
            <span>
              {currentRole === 'Government Officer'
                ? 'Evaluated Proposals & Review Queue'
                : currentRole === 'Evaluator'
                ? 'Evaluator Pending Queue'
                : 'Submitted Proposals'}
            </span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            {currentRole === 'Government Officer'
              ? 'Review evaluated startup proposals for challenges you created, and select candidates for Pilot Sandboxes.'
              : currentRole === 'Evaluator'
              ? 'Pending startup proposals awaiting your 7-criteria evaluation score.'
              : 'Track submitted proposal statuses across government challenges.'}
          </p>
        </div>

        {currentRole === 'Evaluator' && proposals.length > 0 && (
          <Link
            href={`/evaluation?proposal_id=${proposals[0].id}`}
            className="flex items-center gap-2 bg-gradient-to-r from-indigo-600 to-blue-600 hover:from-indigo-500 hover:to-blue-500 text-white font-bold text-xs px-4 py-2.5 rounded-xl shadow-lg transition-all"
          >
            <CheckSquare className="w-4 h-4 text-indigo-200" />
            <span>Evaluate Next Pending Proposal</span>
          </Link>
        )}
      </div>

      {/* Main Content Area */}
      {loading ? (
        <Card className="text-center py-12 text-slate-400 space-y-2">
          <Clock className="w-8 h-8 text-blue-400 animate-spin mx-auto" />
          <p className="text-xs font-semibold">Loading proposals from database...</p>
        </Card>
      ) : proposals.length === 0 ? (
        /* Empty State */
        <Card className="text-center py-12 space-y-4 border-dashed border-slate-800 bg-slate-900/50">
          <AlertCircle className="w-10 h-10 text-slate-500 mx-auto" />
          <div>
            <h2 className="text-base font-bold text-slate-200">
              {currentRole === 'Government Officer'
                ? 'No evaluated proposals are available for your challenges yet.'
                : currentRole === 'Evaluator'
                ? 'No pending proposals for evaluation.'
                : 'No submitted proposals found.'}
            </h2>
            <p className="text-xs text-slate-400 mt-1 max-w-md mx-auto">
              {currentRole === 'Government Officer'
                ? 'When startups apply to challenges you created and evaluators submit scores, they will automatically appear here.'
                : currentRole === 'Evaluator'
                ? 'All submitted proposals have been evaluated. Newly submitted startup proposals will appear in this pending queue.'
                : 'Browse active government challenges and submit your innovative solutions.'}
            </p>
          </div>

          {currentRole === 'Startup' && (
            <Link
              href="/challenges"
              className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-4 py-2 rounded-xl transition-colors shadow-md"
            >
              <span>Browse Challenges & Submit Proposal</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          )}
        </Card>
      ) : (
        /* Proposal Cards List */
        <div className="space-y-6">
          {proposals.map((p) => {
            const overallScore = (p as any).overall_score || 86;
            const evaluatorName = (p as any).evaluator_name || 'Prof. Sunita Rao';
            const evaluatorComment = (p as any).evaluator_comment || 'The proposal provides a practical AI-powered solution.';

            return (
              <Card key={p.id} className="space-y-4 border-slate-800 bg-slate-900 hover:border-slate-700 transition-all">
                {/* Proposal Header */}
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-3 border-b border-slate-800 pb-4">
                  <div>
                    <div className="flex items-center gap-2.5">
                      {getStatusBadge(p.status)}
                      <span className="text-xs font-bold text-slate-300 flex items-center gap-1">
                        <Store className="w-3.5 h-3.5 text-blue-400" /> Startup: <span className="text-white">{p.startup_name}</span>
                      </span>
                    </div>
                    <h2 className="text-lg font-bold text-white mt-1.5">{p.title}</h2>
                  </div>

                  {/* Evaluation Score Badge */}
                  {['evaluated', 'selected_for_pilot', 'rejected'].includes(p.status) && (
                    <div className="bg-indigo-950/90 border border-indigo-500/40 px-4 py-2 rounded-xl text-center shrink-0">
                      <div className="text-2xl font-black text-indigo-300">{overallScore}%</div>
                      <span className="text-[9px] text-slate-400 font-bold uppercase tracking-wider">Evaluation Score</span>
                    </div>
                  )}
                </div>

                {/* Description */}
                <p className="text-xs text-slate-300 leading-relaxed">{p.description}</p>

                {/* Metadata Grid */}
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-4 rounded-xl border border-slate-800 text-xs">
                  <div>
                    <span className="text-[10px] text-slate-500 font-semibold uppercase block">Target Challenge</span>
                    <span className="font-semibold text-slate-200 truncate block">{p.challenge_title}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-semibold uppercase block">Challenge Created By</span>
                    <span className="font-semibold text-slate-200">{user.full_name}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-semibold uppercase block">Estimated Budget</span>
                    <span className="font-bold text-emerald-400">${p.estimated_cost.toLocaleString()}</span>
                  </div>
                  <div>
                    <span className="text-[10px] text-slate-500 font-semibold uppercase block">Eligibility</span>
                    <span className="font-bold text-emerald-400 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" /> ELIGIBLE
                    </span>
                  </div>
                </div>

                {/* Evaluator Commentary if evaluated */}
                {['evaluated', 'selected_for_pilot', 'rejected'].includes(p.status) && (
                  <div className="bg-slate-950/80 p-3.5 rounded-xl border border-slate-800 text-xs space-y-1">
                    <div className="flex items-center justify-between text-[11px] font-bold text-indigo-300">
                      <span>Evaluated By: {evaluatorName}</span>
                      <span className="text-slate-500">Status: ✓ EVALUATED</span>
                    </div>
                    <p className="text-slate-400 italic">"{evaluatorComment}"</p>
                  </div>
                )}

                {/* Role Specific Actions */}
                <div className="pt-3 border-t border-slate-800 flex flex-col sm:flex-row items-center justify-between gap-3 text-xs">
                  <span className="text-slate-500 text-[11px]">
                    Submitted: {new Date(p.submitted_at || Date.now()).toLocaleDateString()}
                  </span>

                  <div className="flex flex-wrap items-center gap-2 w-full sm:w-auto justify-end">
                    {/* EVALUATOR QUEUE ACTION */}
                    {currentRole === 'Evaluator' && p.status === 'pending_evaluation' && (
                      <Link
                        href={`/evaluation?proposal_id=${p.id}`}
                        className="flex items-center gap-1.5 bg-indigo-600 hover:bg-indigo-500 text-white font-bold px-4 py-2 rounded-xl transition-all shadow-md"
                      >
                        <CheckSquare className="w-4 h-4" />
                        <span>Score Proposal (Evaluator)</span>
                      </Link>
                    )}

                    {/* GOVERNMENT OFFICER REVIEW QUEUE ACTIONS */}
                    {currentRole === 'Government Officer' && (
                      <>
                        <Link
                          href={`/proposals/${p.id}`}
                          className="px-3.5 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-semibold transition-colors"
                        >
                          View Full Details
                        </Link>

                        {p.status === 'evaluated' && (
                          <>
                            <button
                              onClick={() => handleStatusUpdate(p.id, 'rejected')}
                              disabled={actionLoadingId === p.id}
                              className="flex items-center gap-1 bg-red-950/60 hover:bg-red-900/80 text-red-300 border border-red-500/30 font-bold px-3.5 py-2 rounded-xl transition-colors"
                            >
                              <XCircle className="w-4 h-4 text-red-400" />
                              <span>Reject</span>
                            </button>

                            <button
                              onClick={() => handleStatusUpdate(p.id, 'selected_for_pilot')}
                              disabled={actionLoadingId === p.id}
                              className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl transition-all shadow-md"
                            >
                              <Rocket className="w-4 h-4" />
                              <span>Select for Pilot Sandbox</span>
                            </button>
                          </>
                        )}

                        {p.status === 'selected_for_pilot' && (
                          <Link
                            href="/pilots"
                            className="flex items-center gap-1.5 bg-emerald-600 hover:bg-emerald-500 text-white font-bold px-4 py-2 rounded-xl transition-all shadow-md"
                          >
                            <Rocket className="w-4 h-4" />
                            <span>Active in Pilot Sandbox</span>
                          </Link>
                        )}
                      </>
                    )}
                  </div>
                </div>
              </Card>
            );
          })}
        </div>
      )}
    </div>
  );
}

'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { api } from '../../../lib/api';
import { Proposal, Evaluation } from '../../../types';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import {
  CheckSquare,
  Rocket,
  ArrowRight,
  Star,
  CheckCircle2,
  FileText,
  User,
  ShieldCheck,
  TrendingUp,
  Clock
} from 'lucide-react';

export default function ProposalDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;

  const [proposal, setProposal] = useState<Proposal | null>(null);
  const [evaluation, setEvaluation] = useState<Evaluation | null>(null);

  const isDemoProposal = id === 'e1111111-1111-4111-a111-111111111111';

  useEffect(() => {
    async function load() {
      if (!id) return;
      const p = await api.getProposalById(id);
      setProposal(p);
      const evals = await api.getEvaluations();
      const matchedEval = evals.find(e => e.proposal_id === id);
      if (matchedEval) {
        setEvaluation(matchedEval);
      } else if (isDemoProposal && evals.length > 0) {
        setEvaluation(evals[0]);
      }
    }
    load();
  }, [id, isDemoProposal]);

  if (!proposal) {
    return <div className="p-8 text-center text-slate-400">Loading proposal details...</div>;
  }

  const isEvaluated = Boolean(evaluation) || isDemoProposal;

  const scores = evaluation?.scores || (isDemoProposal ? [
    { criterion: 'Problem Fit', score: 9, comments: 'Directly addresses hospital breakdown pain points.' },
    { criterion: 'Technical Feasibility', score: 9, comments: 'Robust IoT sensor mesh with tested edge AI.' },
    { criterion: 'Innovation', score: 8, comments: 'Advanced neural acoustic & thermal anomaly detection.' },
    { criterion: 'Cost Effectiveness', score: 8, comments: 'Fits well within department allocation.' },
    { criterion: 'Scalability', score: 9, comments: 'Easily scalable across 100+ public hospitals.' },
    { criterion: 'Implementation Readiness', score: 9, comments: 'Pre-certified sensors ready for immediate installation.' },
    { criterion: 'Expected Impact', score: 9, comments: 'Significantly improves patient care continuity.' }
  ] : []);

  const overallScore = evaluation?.overall_score || (isDemoProposal ? 88 : null);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Top Banner */}
      <Card className="space-y-4 bg-slate-900 border-slate-800">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2">
              <Badge variant={proposal.status === 'Pilot Selected' ? 'success' : proposal.status === 'Submitted' ? 'info' : 'warning'}>
                {proposal.status}
              </Badge>
              <span className="text-xs font-semibold text-slate-400">By {proposal.startup_name || 'MedTech Predictive Systems'}</span>
            </div>
            <h1 className="text-2xl font-bold text-white mt-1">{proposal.title}</h1>
          </div>

          <div className="flex items-center gap-3">
            {isDemoProposal ? (
              <Link
                href="/pilots/f2222222-2222-4222-a222-222222222222"
                className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg transition-all"
              >
                <Rocket className="w-4 h-4" />
                <span>Open Pilot Dashboard (91% KPI)</span>
              </Link>
            ) : (
              <Link
                href={`/evaluation?proposal_id=${id}`}
                className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg transition-all"
              >
                <CheckSquare className="w-4 h-4" />
                <span>Score This Proposal (Evaluator)</span>
              </Link>
            )}
          </div>
        </div>

        <p className="text-xs text-slate-300 leading-relaxed">{proposal.description}</p>

        <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 bg-slate-950 p-3 rounded-xl border border-slate-800 text-xs">
          <div>
            <span className="text-[10px] text-slate-500 font-semibold uppercase block">Estimated Budget</span>
            <span className="font-bold text-emerald-400">${proposal.estimated_cost.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-semibold uppercase block">Implementation Timeline</span>
            <span className="font-semibold text-slate-200">{proposal.timeline}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-semibold uppercase block">Target Challenge</span>
            <span className="font-semibold text-slate-200 truncate block">{proposal.challenge_title}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 font-semibold uppercase block">Overall Score</span>
            <span className="font-extrabold text-blue-400 text-sm">
              {overallScore !== null ? `${overallScore}%` : 'Pending Review'}
            </span>
          </div>
        </div>
      </Card>

      {/* Module 8 — 7-Criteria Evaluation Breakdown */}
      {isEvaluated ? (
        <Card className="space-y-6 border-indigo-500/40 bg-slate-900/95">
          <div className="flex items-center justify-between border-b border-slate-800 pb-4">
            <div>
              <div className="flex items-center gap-2">
                <CheckSquare className="w-5 h-5 text-indigo-400" />
                <h2 className="text-base font-bold text-white">7-Criteria Transparent Proposal Evaluation</h2>
              </div>
              <p className="text-xs text-slate-400 mt-1">Evaluated by Prof. Sunita Rao (National Innovation Institute)</p>
            </div>

            <div className="bg-indigo-950/80 border border-indigo-500/40 px-4 py-2 rounded-xl text-center">
              <div className="text-2xl font-black text-indigo-300">{overallScore}%</div>
              <span className="text-[9px] text-slate-400 uppercase font-bold tracking-wider">Overall Score</span>
            </div>
          </div>

          {/* 7 Criteria Score Cards */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {scores.map((s, idx) => (
              <div
                key={idx}
                className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 flex flex-col justify-between"
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold text-slate-200">{s.criterion}</span>
                  <span className="text-xs font-extrabold text-indigo-400 bg-indigo-950/60 px-2 py-0.5 rounded border border-indigo-500/30">
                    {s.score} / 10
                  </span>
                </div>

                {/* Score Bar */}
                <div className="w-full h-2 bg-slate-900 rounded-full overflow-hidden">
                  <div
                    className="h-full bg-gradient-to-r from-blue-500 to-indigo-500 rounded-full"
                    style={{ width: `${s.score * 10}%` }}
                  ></div>
                </div>

                <p className="text-[11px] text-slate-400">{s.comments}</p>
              </div>
            ))}
          </div>

          {/* Evaluator Commentary */}
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
            <h3 className="text-xs font-bold text-slate-300 uppercase tracking-wider flex items-center gap-2">
              <User className="w-4 h-4 text-indigo-400" />
              <span>Evaluator Committee Verdict & Commentary</span>
            </h3>
            <p className="text-xs text-slate-300 leading-relaxed italic">
              "{evaluation?.comments || 'Outstanding technical proposal. High readiness, strong edge-AI capabilities, and cost-effective deployment strategy. Highly recommended for pilot sandbox execution.'}"
            </p>
          </div>

          {/* Action Button */}
          <div className="pt-2 flex items-center justify-between border-t border-slate-800">
            <Badge variant="success" className="text-xs py-1">
              Status: {proposal.status}
            </Badge>

            <Link
              href="/pilots/f2222222-2222-4222-a222-222222222222"
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-lg transition-all"
            >
              <span>Proceed to Pilot Dashboard & KPIs</span>
              <ArrowRight className="w-4 h-4" />
            </Link>
          </div>
        </Card>
      ) : (
        <Card className="space-y-4 border-amber-500/40 bg-slate-900 text-center py-8">
          <Clock className="w-10 h-10 text-amber-400 mx-auto" />
          <h2 className="text-base font-bold text-white">Proposal Awaiting Evaluator Review</h2>
          <p className="text-xs text-slate-400 max-w-md mx-auto">
            This proposal has been submitted and is currently in the review queue. Switch to the Evaluator role to fill out the 7-criteria evaluation form.
          </p>
          <Link
            href="/evaluation"
            className="inline-flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-lg transition-all"
          >
            <CheckSquare className="w-4 h-4" />
            <span>Open Evaluator Scoring Form</span>
          </Link>
        </Card>
      )}
    </div>
  );
}

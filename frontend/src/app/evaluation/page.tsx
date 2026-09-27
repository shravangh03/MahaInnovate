'use client';

import React, { useEffect, useState, Suspense } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { api } from '../../lib/api';
import { useAuth } from '../../context/AuthContext';
import { Proposal } from '../../types';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import { CheckSquare, ArrowRight, Store, CheckCircle2 } from 'lucide-react';
import Link from 'next/link';

function EvaluationContent() {
  const router = useRouter();
  const searchParams = useSearchParams();
  const { user } = useAuth();

  const initialPropId = searchParams.get('proposal_id') || searchParams.get('id') || '';

  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [selectedPropId, setSelectedPropId] = useState<string>(initialPropId);
  const [selectedProposal, setSelectedProposal] = useState<Proposal | null>(null);
  const [successMsg, setSuccessMsg] = useState(false);

  const [scores, setScores] = useState({
    problemFit: 9,
    techFeasibility: 9,
    innovation: 8,
    costEffectiveness: 8,
    scalability: 9,
    readiness: 9,
    impact: 9
  });
  const [comments, setComments] = useState(
    'The proposal provides a practical AI-powered platform addressing core challenge requirements. The proposed architecture is technically feasible and has strong deployment potential.'
  );
  const [submitting, setSubmitting] = useState(false);

  useEffect(() => {
    async function load() {
      const list = await api.getProposals({ role: 'Evaluator', status: 'pending_evaluation' });
      setProposals(list);

      const targetId = initialPropId || (list.length > 0 ? list[0].id : '');
      setSelectedPropId(targetId);

      const found = list.find(p => p.id === targetId) || list[0] || null;
      setSelectedProposal(found);
    }
    load();
  }, [initialPropId]);

  const handleSelectChange = (id: string) => {
    setSelectedPropId(id);
    const found = proposals.find(p => p.id === id) || null;
    setSelectedProposal(found);
  };

  const criteriaList = [
    { key: 'problemFit', label: 'Problem Fit', desc: 'Alignment with public sector challenge pain points' },
    { key: 'techFeasibility', label: 'Technical Feasibility', desc: 'Robustness of hardware sensors, edge AI, and software' },
    { key: 'innovation', label: 'Innovation', desc: 'Originality of AI analytics and predictive telemetry' },
    { key: 'costEffectiveness', label: 'Cost Effectiveness', desc: 'Value for money within allocated budget' },
    { key: 'scalability', label: 'Scalability', desc: 'Ease of rollout across public sector deployments' },
    { key: 'readiness', label: 'Implementation Readiness', desc: 'Certification & execution roadmap' },
    { key: 'impact', label: 'Expected Impact', desc: 'Quantifiable operational uptime and outcome improvements' }
  ];

  const totalPoints = Object.values(scores).reduce((a, b) => a + b, 0);
  const overallScorePct = Math.round((totalPoints / 70) * 100);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const propId = selectedPropId || 'e1111111-1111-4111-a111-111111111111';
      const formattedScores = criteriaList.map(c => ({
        criterion: c.label,
        score: (scores as any)[c.key],
        comments: `${c.label} score of ${(scores as any)[c.key]}/10`
      }));

      await api.createEvaluation({
        proposal_id: propId,
        evaluator_id: user.id,
        overall_score: overallScorePct,
        scores: formattedScores,
        comments
      });

      setSuccessMsg(true);
      setTimeout(() => {
        router.push('/proposals');
      }, 1500);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <Badge variant="info">Evaluator Module</Badge>
          <h1 className="text-2xl font-bold text-white mt-1 flex items-center gap-2">
            <CheckSquare className="w-6 h-6 text-indigo-400" />
            <span>7-Criteria Proposal Scoring Interface</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Review and score startup proposals submitted for government challenges. Evaluated proposals automatically forward to Government Officers.
          </p>
        </div>

        <div className="bg-indigo-950 border border-indigo-500/40 p-4 rounded-xl text-center min-w-[140px]">
          <div className="text-3xl font-black text-indigo-300">{overallScorePct}%</div>
          <span className="text-[10px] text-slate-400 font-bold uppercase">Calculated Overall Score</span>
        </div>
      </div>

      {successMsg && (
        <div className="bg-emerald-950/90 border border-emerald-500 p-4 rounded-xl text-center space-y-1">
          <CheckCircle2 className="w-8 h-8 text-emerald-400 mx-auto" />
          <h3 className="text-sm font-bold text-white">Evaluation Submitted Successfully!</h3>
          <p className="text-xs text-slate-300">Proposal status changed to "evaluated" and forwarded to Government Officer review queue.</p>
        </div>
      )}

      {/* Select Proposal Dropdown */}
      <Card className="space-y-3 bg-slate-900 border-slate-800">
        <label className="block text-xs font-bold text-slate-300">
          Select Startup Proposal from Pending Queue to Evaluate:
        </label>
        <select
          value={selectedPropId}
          onChange={(e) => handleSelectChange(e.target.value)}
          className="w-full bg-slate-950 border border-slate-800 rounded-xl px-4 py-2.5 text-xs text-slate-200 focus:outline-none focus:border-indigo-500 font-semibold"
        >
          {proposals.length === 0 ? (
            <option value="">No pending proposals for evaluation</option>
          ) : (
            proposals.map((p) => (
              <option key={p.id} value={p.id}>
                {p.title} — By {p.startup_name || 'Startup'} ({p.challenge_title || 'Government Challenge'})
              </option>
            ))
          )}
        </select>

        {selectedProposal && (
          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
            <div className="flex items-center justify-between text-slate-400">
              <span className="flex items-center gap-1.5 font-bold text-indigo-400">
                <Store className="w-4 h-4" /> Startup: {selectedProposal.startup_name}
              </span>
              <span>Budget: <strong className="text-emerald-400">${selectedProposal.estimated_cost?.toLocaleString()}</strong></span>
            </div>
            <p className="text-slate-300 leading-relaxed">{selectedProposal.description}</p>
          </div>
        )}
      </Card>

      {/* 7-Criteria Form */}
      <Card>
        <form onSubmit={handleSubmit} className="space-y-6 text-xs">
          <div className="space-y-4">
            {criteriaList.map((c) => {
              const val = (scores as any)[c.key];
              return (
                <div key={c.key} className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
                  <div className="flex items-center justify-between">
                    <div>
                      <h3 className="font-bold text-slate-200 text-xs">{c.label}</h3>
                      <p className="text-[11px] text-slate-400">{c.desc}</p>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="font-extrabold text-indigo-400 text-sm">{val} / 10</span>
                    </div>
                  </div>

                  <input
                    type="range"
                    min="1"
                    max="10"
                    value={val}
                    onChange={(e) => setScores({ ...scores, [c.key]: Number(e.target.value) })}
                    className="w-full accent-indigo-500 bg-slate-900"
                  />
                </div>
              );
            })}
          </div>

          <div className="space-y-2">
            <label className="block font-bold text-slate-300">Evaluator Commentary & Official Remarks</label>
            <textarea
              rows={3}
              value={comments}
              onChange={(e) => setComments(e.target.value)}
              className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-slate-200 focus:outline-none focus:border-indigo-500"
            />
          </div>

          <div className="flex justify-end gap-3 pt-2">
            {selectedProposal && (
              <Link
                href={`/proposals/${selectedProposal.id}`}
                className="px-5 py-2.5 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-xl font-bold"
              >
                View Full Proposal Details
              </Link>
            )}
            <button
              type="submit"
              disabled={submitting || proposals.length === 0}
              className="flex items-center gap-2 bg-indigo-600 hover:bg-indigo-500 text-white font-bold text-xs px-6 py-2.5 rounded-xl shadow-lg transition-all"
            >
              <span>{submitting ? 'Submitting Score...' : `Submit Score (${overallScorePct}%)`}</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}

export default function EvaluationPage() {
  return (
    <Suspense fallback={<div className="p-8 text-center text-slate-400">Loading Evaluation Interface...</div>}>
      <EvaluationContent />
    </Suspense>
  );
}

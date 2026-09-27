'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useParams, useRouter } from 'next/navigation';
import { useAuth } from '../../../context/AuthContext';
import { api } from '../../../lib/api';
import { Challenge, StartupMatch, AIAnalysisResult, Proposal } from '../../../types';
import { Card } from '../../../components/ui/Card';
import { Badge } from '../../../components/ui/Badge';
import {
  Target,
  Sparkles,
  Store,
  ArrowRight,
  DollarSign,
  Clock,
  MapPin,
  CheckCircle2,
  ClipboardList,
  ShieldCheck,
  BarChart3,
  Send,
  PlusCircle,
  AlertCircle
} from 'lucide-react';

export default function ChallengeDetailPage() {
  const params = useParams();
  const router = useRouter();
  const id = params.id as string;
  const { currentRole, user } = useAuth();

  const [challenge, setChallenge] = useState<Challenge | null>(null);
  const [matches, setMatches] = useState<StartupMatch[]>([]);
  const [proposals, setProposals] = useState<Proposal[]>([]);
  const [aiAnalysis, setAiAnalysis] = useState<AIAnalysisResult | null>(null);
  const [analyzing, setAnalyzing] = useState(false);

  // Proposal Submission Drawer / Form State for Startups
  const [showApplyModal, setShowApplyModal] = useState(false);
  const [proposalForm, setProposalForm] = useState({
    title: '',
    description: '',
    technology: 'IoT, AI/ML, Predictive Analytics',
    implementation_plan: '',
    expected_outcomes: '',
    estimated_cost: 95000,
    timeline: '6 Months'
  });
  const [submittingProposal, setSubmittingProposal] = useState(false);
  const [submittedSuccess, setSubmittedSuccess] = useState(false);

  const isDemoChallenge = id === 'd1111111-1111-4111-a111-111111111111';

  useEffect(() => {
    async function load() {
      if (!id) return;
      const c = await api.getChallengeById(id);
      setChallenge(c);

      const allProposals = await api.getProposals();
      const matchedProposals = allProposals.filter((p: Proposal) => p.challenge_id === id);
      setProposals(matchedProposals);

      if (isDemoChallenge || currentRole === 'Government Officer' || currentRole === 'Admin') {
        const m = await api.getChallengeMatches(id);
        setMatches(m);
      }
    }
    load();
  }, [id, currentRole, isDemoChallenge]);

  const handleAIAnalyze = async () => {
    if (!challenge) return;
    setAnalyzing(true);
    try {
      const res = await api.analyzeChallengeAI(challenge.description);
      setAiAnalysis(res);
    } finally {
      setAnalyzing(false);
    }
  };

  const handleApplySubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!challenge) return;
    setSubmittingProposal(true);
    try {
      const newProp = await api.createProposal({
        challenge_id: challenge.id,
        startup_id: 'c1111111-1111-4111-a111-111111111111',
        title: proposalForm.title,
        description: proposalForm.description,
        technology: proposalForm.technology,
        implementation_plan: proposalForm.implementation_plan,
        expected_outcomes: proposalForm.expected_outcomes,
        estimated_cost: Number(proposalForm.estimated_cost),
        timeline: proposalForm.timeline,
        startup_name: user.organization || 'Mishti - Krishi Sahayak AI',
        challenge_title: challenge.title,
        challenge_created_by: (challenge as any).created_by || user.id
      });

      setProposals(prev => [newProp, ...prev]);
      setSubmittedSuccess(true);
      setTimeout(() => {
        setShowApplyModal(false);
        setSubmittedSuccess(false);
      }, 1500);
    } catch (err) {
      console.error(err);
    } finally {
      setSubmittingProposal(false);
    }
  };

  if (!challenge) {
    return <div className="p-8 text-center text-slate-400">Loading challenge details...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Top Banner */}
      <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 space-y-4">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div className="flex items-center gap-2">
            <Badge variant="info">{challenge.status}</Badge>
            <span className="text-xs font-semibold text-slate-400">{challenge.sector}</span>
            {!isDemoChallenge && (
              <Badge variant="purple" className="text-[10px]">Newly Published</Badge>
            )}
          </div>

          <div className="flex items-center gap-3">
            <button
              onClick={handleAIAnalyze}
              disabled={analyzing}
              className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white text-xs font-semibold px-4 py-2 rounded-lg shadow transition-all"
            >
              <Sparkles className="w-4 h-4 text-amber-200" />
              <span>{analyzing ? 'Analyzing with AI...' : 'AI Analyze Challenge'}</span>
            </button>

            {currentRole === 'Startup' ? (
              <button
                onClick={() => setShowApplyModal(true)}
                className="flex items-center gap-2 bg-gradient-to-r from-emerald-600 to-teal-600 hover:from-emerald-500 hover:to-teal-500 text-white text-xs font-bold px-4 py-2 rounded-lg shadow transition-all"
              >
                <Send className="w-4 h-4" />
                <span>Apply & Submit Proposal</span>
              </button>
            ) : (
              <Link
                href={`/marketplace?sector=${challenge.sector}`}
                className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors"
              >
                <Store className="w-4 h-4" />
                <span>Find Matching Startups</span>
              </Link>
            )}
          </div>
        </div>

        <h1 className="text-2xl font-extrabold text-white">{challenge.title}</h1>
        <p className="text-xs text-slate-300 leading-relaxed max-w-4xl">{challenge.description}</p>

        {/* Key Metrics */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 bg-slate-950/80 p-4 rounded-xl border border-slate-800 text-xs">
          <div>
            <span className="text-[10px] text-slate-500 block uppercase font-semibold">Budget Range</span>
            <span className="font-bold text-emerald-400">${challenge.budget_min.toLocaleString()} - ${challenge.budget_max.toLocaleString()}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block uppercase font-semibold">Timeline</span>
            <span className="font-semibold text-slate-200">{challenge.timeline}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block uppercase font-semibold">Location Scope</span>
            <span className="font-semibold text-slate-200">{challenge.location}</span>
          </div>
          <div>
            <span className="text-[10px] text-slate-500 block uppercase font-semibold">Submitted Proposals</span>
            <span className="font-bold text-blue-400">
              {isDemoChallenge ? proposals.length || 2 : proposals.length} Proposals
            </span>
          </div>
        </div>
      </div>

      {/* AI Challenge Assistant Output Section */}
      {aiAnalysis && (
        <Card className="space-y-4 border-amber-500/40 bg-slate-900/95 shadow-xl animate-in fade-in">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div className="flex items-center gap-2 text-amber-400 font-bold text-sm">
              <Sparkles className="w-5 h-5 text-amber-400" />
              <span>AI Challenge Assistant Output</span>
            </div>
            <Badge variant="warning">Generated Insight</Badge>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-xs">
            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h3 className="font-bold text-slate-200 flex items-center gap-2">
                <ClipboardList className="w-4 h-4 text-blue-400" /> Problem Summary & Sector
              </h3>
              <p className="text-slate-400 leading-relaxed">{aiAnalysis.problemSummary}</p>
              <div className="pt-2 flex gap-2">
                <span className="bg-blue-950 text-blue-300 font-semibold px-2 py-1 rounded">Category: {aiAnalysis.category}</span>
              </div>
            </div>

            <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2">
              <h3 className="font-bold text-slate-200 flex items-center gap-2">
                <BarChart3 className="w-4 h-4 text-emerald-400" /> Suggested Key Performance Indicators (KPIs)
              </h3>
              <ul className="space-y-1 text-slate-300">
                {aiAnalysis.suggestedKPIs.map((kpi, idx) => (
                  <li key={idx} className="flex items-center gap-2">
                    <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400 shrink-0" />
                    <span>{kpi}</span>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </Card>
      )}

      {/* STARTUP VIEW: Show Requirements & Apply Button (Hide competitor scores!) */}
      {currentRole === 'Startup' ? (
        <Card className="space-y-4 border-emerald-500/40 bg-slate-900">
          <div className="flex items-center justify-between border-b border-slate-800 pb-3">
            <div>
              <h2 className="text-base font-bold text-white flex items-center gap-2">
                <ShieldCheck className="w-5 h-5 text-emerald-400" />
                <span>Startup Application Portal</span>
              </h2>
              <p className="text-xs text-slate-400">Review eligibility criteria and submit your technical proposal.</p>
            </div>

            <button
              onClick={() => setShowApplyModal(true)}
              className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow transition-all"
            >
              <Send className="w-4 h-4" />
              <span>Submit Proposal Now</span>
            </button>
          </div>

          <div className="bg-slate-950 p-4 rounded-xl border border-slate-800 space-y-2 text-xs">
            <h3 className="font-bold text-slate-200">Required Eligibility & Experience:</h3>
            <p className="text-slate-400 leading-relaxed">{challenge.eligibility_criteria}</p>
          </div>

          {proposals.length > 0 && (
            <div className="bg-emerald-950/60 border border-emerald-500/40 p-3 rounded-xl text-xs text-emerald-300 flex items-center gap-2">
              <CheckCircle2 className="w-4 h-4 text-emerald-400" />
              <span>You have submitted {proposals.length} proposal(s) for this challenge. Status: Under Review.</span>
            </div>
          )}
        </Card>
      ) : (
        /* GOVERNMENT / EVALUATOR / ADMIN VIEW */
        <div className="space-y-4">
          <div className="flex items-center justify-between">
            <h2 className="text-base font-bold text-white flex items-center gap-2">
              <Store className="w-5 h-5 text-emerald-400" />
              <span>
                {isDemoChallenge ? 'AI Recommended & Matched Startups' : 'Discovered Candidate Startups'}
              </span>
            </h2>
            <span className="text-xs text-slate-400">
              {isDemoChallenge ? `${matches.length} Startups Ranked` : `${proposals.length} Proposals Submitted`}
            </span>
          </div>

          {!isDemoChallenge && proposals.length === 0 ? (
            <Card className="text-center py-8 space-y-3 border-dashed border-slate-800">
              <AlertCircle className="w-8 h-8 text-amber-400 mx-auto" />
              <h3 className="text-sm font-bold text-slate-200">No Proposals Submitted Yet</h3>
              <p className="text-xs text-slate-400 max-w-md mx-auto">
                This challenge was recently published. As startups apply, their technical proposals and 7-criteria evaluation scores will appear here.
              </p>
              <Link
                href={`/marketplace?sector=${challenge.sector}`}
                className="inline-flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white font-semibold text-xs px-4 py-2 rounded-lg transition-colors"
              >
                <span>Browse Marketplace to Invite Startups</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </Card>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {matches.map((m) => (
                <Card key={m.startup.id} className="space-y-3 hover:border-emerald-500/40 transition-all">
                  <div className="flex items-start justify-between">
                    <div className="flex items-center gap-3">
                      <img src={m.startup.logo_url} alt={m.startup.name} className="w-10 h-10 rounded-lg object-cover border border-slate-800" />
                      <div>
                        <h3 className="text-sm font-bold text-white">{m.startup.name}</h3>
                        <p className="text-xs text-slate-400">{m.startup.sector} • {m.startup.location}</p>
                      </div>
                    </div>

                    <div className="text-right">
                      <div className="text-base font-extrabold text-emerald-400">{m.matchScore}%</div>
                      <span className="text-[10px] text-slate-400 font-semibold">Match Score</span>
                    </div>
                  </div>

                  <p className="text-xs text-slate-300 leading-relaxed">{m.startup.description}</p>

                  {/* Match Reasons */}
                  <div className="bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-[11px] space-y-1">
                    <span className="text-slate-400 font-semibold block">AI Matching Rationale:</span>
                    {m.reasons.map((r, idx) => (
                      <div key={idx} className="text-emerald-400 flex items-center gap-1.5">
                        <CheckCircle2 className="w-3 h-3 text-emerald-400 shrink-0" />
                        <span>{r}</span>
                      </div>
                    ))}
                  </div>

                  <div className="pt-2 flex items-center justify-between border-t border-slate-800/80">
                    <Link
                      href={`/startups/${m.startup.id}`}
                      className="text-xs text-blue-400 hover:text-blue-300 font-semibold flex items-center gap-1"
                    >
                      <span>Check Eligibility</span>
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>

                    <Link
                      href={`/proposals/e1111111-1111-4111-a111-111111111111`}
                      className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white px-3 py-1 rounded-md font-semibold"
                    >
                      View Proposal
                    </Link>
                  </div>
                </Card>
              ))}
            </div>
          )}
        </div>
      )}

      {/* PROPOSAL SUBMISSION MODAL FOR STARTUPS */}
      {showApplyModal && (
        <div className="fixed inset-0 z-50 bg-slate-950/80 backdrop-blur-sm flex items-center justify-center p-4">
          <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 max-w-xl w-full space-y-4 shadow-2xl animate-in fade-in">
            <div className="flex items-center justify-between border-b border-slate-800 pb-3">
              <h3 className="text-base font-bold text-white flex items-center gap-2">
                <Send className="w-5 h-5 text-emerald-400" />
                <span>Submit Technical Proposal</span>
              </h3>
              <button onClick={() => setShowApplyModal(false)} className="text-slate-400 hover:text-slate-200 text-xs">✕ Close</button>
            </div>

            {submittedSuccess ? (
              <div className="bg-emerald-950 p-6 rounded-xl text-center space-y-2 border border-emerald-500/40">
                <CheckCircle2 className="w-10 h-10 text-emerald-400 mx-auto" />
                <h4 className="font-bold text-white text-base">Proposal Submitted Successfully!</h4>
                <p className="text-xs text-slate-300">Your proposal is now queued for 7-criteria evaluator review.</p>
              </div>
            ) : (
              <form onSubmit={handleApplySubmit} className="space-y-4 text-xs">
                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Solution Title</label>
                  <input
                    type="text"
                    required
                    placeholder="e.g., AI-IoT Predictive Telemetry & Anomaly Guard"
                    value={proposalForm.title}
                    onChange={(e) => setProposalForm({ ...proposalForm, title: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div>
                  <label className="block font-semibold text-slate-300 mb-1">Solution Technical Architecture</label>
                  <textarea
                    rows={3}
                    required
                    placeholder="Describe sensors, edge AI algorithms, and telemetry pipeline..."
                    value={proposalForm.description}
                    onChange={(e) => setProposalForm({ ...proposalForm, description: e.target.value })}
                    className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-200 focus:outline-none focus:border-emerald-500"
                  />
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Estimated Cost ($)</label>
                    <input
                      type="number"
                      value={proposalForm.estimated_cost}
                      onChange={(e) => setProposalForm({ ...proposalForm, estimated_cost: Number(e.target.value) })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                  <div>
                    <label className="block font-semibold text-slate-300 mb-1">Timeline</label>
                    <input
                      type="text"
                      value={proposalForm.timeline}
                      onChange={(e) => setProposalForm({ ...proposalForm, timeline: e.target.value })}
                      className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-emerald-500"
                    />
                  </div>
                </div>

                <div className="flex justify-end gap-3 pt-2">
                  <button
                    type="button"
                    onClick={() => setShowApplyModal(false)}
                    className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-semibold"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    disabled={submittingProposal}
                    className="px-5 py-2 bg-emerald-600 hover:bg-emerald-500 text-white rounded-lg font-bold shadow"
                  >
                    {submittingProposal ? 'Submitting...' : 'Submit Proposal'}
                  </button>
                </div>
              </form>
            )}
          </div>
        </div>
      )}
    </div>
  );
}

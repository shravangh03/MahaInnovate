'use client';

import React, { useState, useEffect } from 'react';
import { useSearchParams, useRouter } from 'next/navigation';
import { api } from '../../lib/api';
import { AIAnalysisResult } from '../../types';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import {
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ClipboardList,
  BarChart3,
  ShieldCheck,
  Lightbulb,
  Zap
} from 'lucide-react';

function AIAssistantContent() {
  const searchParams = useSearchParams();
  const router = useRouter();
  const initialPrompt = searchParams.get('prompt') || 'Hospital equipment frequently fails unexpectedly.';

  const [prompt, setPrompt] = useState(initialPrompt);
  const [analyzing, setAnalyzing] = useState(false);
  const [result, setResult] = useState<AIAnalysisResult | null>(null);

  const handleAnalyze = async (inputPrompt: string = prompt) => {
    if (!inputPrompt.trim()) return;
    setAnalyzing(true);
    try {
      const data = await api.analyzeChallengeAI(inputPrompt);
      setResult(data);
    } catch (e) {
      console.error(e);
    } finally {
      setAnalyzing(false);
    }
  };

  useEffect(() => {
    handleAnalyze(initialPrompt);
  }, []);

  return (
    <div className="space-y-6 max-w-5xl mx-auto">
      {/* Header */}
      <div className="bg-gradient-to-r from-slate-900 via-slate-900 to-amber-950/60 border border-slate-800 rounded-2xl p-6 space-y-2">
        <Badge variant="warning" className="px-3 py-1">
          <Sparkles className="w-3.5 h-3.5" /> AI Challenge Assistant Module
        </Badge>
        <h1 className="text-2xl font-extrabold text-white">Public Problem Framing & AI Analysis</h1>
        <p className="text-xs text-slate-400">
          Enter raw government pain points below to automatically generate structured sector categories, required technology stacks, suggested KPIs, and eligibility benchmarks.
        </p>
      </div>

      {/* Input Prompt Section */}
      <Card className="space-y-4 border-amber-500/30">
        <div className="flex items-center justify-between">
          <label className="text-xs font-bold text-slate-200 flex items-center gap-2">
            <Lightbulb className="w-4 h-4 text-amber-400" />
            <span>Raw Government Problem Statement</span>
          </label>
          <button
            onClick={() => {
              setPrompt('Hospital equipment frequently fails unexpectedly.');
              handleAnalyze('Hospital equipment frequently fails unexpectedly.');
            }}
            className="text-[11px] text-amber-400 hover:text-amber-300 font-semibold underline"
          >
            Insert Hospital Demo Example
          </button>
        </div>

        <textarea
          rows={3}
          value={prompt}
          onChange={(e) => setPrompt(e.target.value)}
          placeholder="e.g., Hospital equipment frequently fails unexpectedly..."
          className="w-full bg-slate-950 border border-slate-800 rounded-xl p-3 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-amber-500"
        />

        <div className="flex justify-end">
          <button
            onClick={() => handleAnalyze()}
            disabled={analyzing}
            className="flex items-center gap-2 bg-gradient-to-r from-amber-600 to-orange-600 hover:from-amber-500 hover:to-orange-500 text-white font-bold text-xs px-5 py-2.5 rounded-xl shadow-lg transition-all"
          >
            <Sparkles className="w-4 h-4 text-amber-200" />
            <span>{analyzing ? 'Generating AI Analysis...' : 'Analyze Challenge Statement'}</span>
          </button>
        </div>
      </Card>

      {/* AI Analysis Output */}
      {result && (
        <div className="space-y-6 animate-in fade-in">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <Card className="space-y-1 bg-slate-900/90 border-blue-500/30">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Identified Sector</span>
              <h3 className="text-lg font-extrabold text-blue-400">{result.sector}</h3>
            </Card>

            <Card className="space-y-1 bg-slate-900/90 border-amber-500/30">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Challenge Category</span>
              <h3 className="text-lg font-extrabold text-amber-400">{result.category}</h3>
            </Card>

            <Card className="space-y-1 bg-slate-900/90 border-emerald-500/30">
              <span className="text-[10px] text-slate-400 uppercase font-semibold">Match Score Guarantee</span>
              <h3 className="text-lg font-extrabold text-emerald-400">90%+ DPIIT Alignment</h3>
            </Card>
          </div>

          {/* Details Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Tech Stack & Summary */}
            <Card className="space-y-4">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-2">
                <Zap className="w-4 h-4 text-blue-400" />
                <span>Required Technology Stack</span>
              </h3>

              <div className="flex flex-wrap gap-2">
                {result.requiredTechnologies.map((tech) => (
                  <span
                    key={tech}
                    className="bg-blue-950/80 text-blue-300 border border-blue-500/40 text-xs font-semibold px-3 py-1 rounded-lg"
                  >
                    {tech}
                  </span>
                ))}
              </div>

              <div className="pt-2 space-y-1">
                <h4 className="text-xs font-semibold text-slate-300">Executive Summary:</h4>
                <p className="text-xs text-slate-400 leading-relaxed bg-slate-950 p-3 rounded-lg border border-slate-800">
                  {result.problemSummary}
                </p>
              </div>
            </Card>

            {/* Suggested KPIs */}
            <Card className="space-y-4">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-2">
                <BarChart3 className="w-4 h-4 text-emerald-400" />
                <span>Suggested Key Performance Indicators</span>
              </h3>

              <ul className="space-y-2 text-xs">
                {result.suggestedKPIs.map((kpi, idx) => (
                  <li key={idx} className="flex items-center gap-2.5 bg-slate-950 p-2.5 rounded-lg border border-slate-800">
                    <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                    <span className="text-slate-200 font-medium">{kpi}</span>
                  </li>
                ))}
              </ul>
            </Card>

            {/* Eligibility Benchmarks */}
            <Card className="space-y-4 md:col-span-2">
              <h3 className="text-sm font-bold text-slate-100 flex items-center gap-2 border-b border-slate-800 pb-2">
                <ShieldCheck className="w-4 h-4 text-purple-400" />
                <span>Suggested Startup Eligibility Criteria</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-xs">
                {result.eligibilitySuggestions.map((e, idx) => (
                  <div key={idx} className="flex items-center gap-2 bg-slate-950 p-3 rounded-lg border border-slate-800 text-slate-300">
                    <span className="w-2 h-2 rounded-full bg-purple-400"></span>
                    <span>{e}</span>
                  </div>
                ))}
              </div>

              <div className="pt-4 flex justify-end gap-3 border-t border-slate-800">
                <button
                  onClick={() => router.push(`/marketplace?sector=${result.sector}`)}
                  className="flex items-center gap-2 bg-emerald-600 hover:bg-emerald-500 text-white font-semibold text-xs px-5 py-2.5 rounded-xl transition-all shadow-md"
                >
                  <span>Find Matching Startups (MedTech 92%)</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </Card>
          </div>
        </div>
      )}
    </div>
  );
}

export default function AIAssistantPage() {
  return (
    <React.Suspense fallback={<div className="p-8 text-center text-slate-400">Loading AI Assistant...</div>}>
      <AIAssistantContent />
    </React.Suspense>
  );
}

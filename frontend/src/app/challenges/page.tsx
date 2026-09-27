'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { api } from '../../lib/api';
import { Challenge } from '../../types';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import {
  Target,
  Sparkles,
  Search,
  Plus,
  Filter,
  ArrowRight,
  IndianRupee,
  Clock,
  MapPin,
  Building
} from 'lucide-react';

export default function ChallengesPage() {
  const [challenges, setChallenges] = useState<Challenge[]>([]);
  const [search, setSearch] = useState('');
  const [sectorFilter, setSectorFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.getChallenges(sectorFilter, search);
        setChallenges(data);
      } catch (err) {
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [sectorFilter, search]);

  return (
    <div className="space-y-6">
      {/* Top Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Target className="w-6 h-6 text-blue-400" />
            <span>Government Challenges</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Browse active public sector innovation challenges, post new problem statements, or launch AI challenge analysis.
          </p>
        </div>

        <div className="flex items-center gap-3">
          <Link
            href="/ai-assistant"
            className="flex items-center gap-2 bg-blue-950/60 hover:bg-blue-900/70 border border-blue-500/30 text-blue-300 text-xs font-semibold px-3.5 py-2 rounded-lg transition-colors"
          >
            <Sparkles className="w-4 h-4 text-blue-400" />
            <span>AI Analyze Challenge</span>
          </Link>

          <Link
            href="/challenges/create"
            className="flex items-center gap-2 bg-blue-600 hover:bg-blue-500 text-white text-xs font-semibold px-4 py-2 rounded-lg transition-colors shadow-md shadow-blue-500/20"
          >
            <Plus className="w-4 h-4" />
            <span>Create Challenge</span>
          </Link>
        </div>
      </div>

      {/* Filter & Search Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row gap-4">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search by challenge title or keywords..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-xs text-slate-200 placeholder-slate-500 focus:outline-none focus:border-blue-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <select
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-xs text-slate-300 focus:outline-none focus:border-blue-500"
          >
            <option value="">All Sectors</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Urban Development">Urban Development</option>
            <option value="Agriculture">Agriculture</option>
            <option value="CleanTech">CleanTech</option>
          </select>
        </div>
      </div>

      {/* Challenge Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {challenges.map((c) => (
          <Card key={c.id} className="space-y-4 flex flex-col justify-between hover:border-slate-700 transition-all">
            <div className="space-y-3">
              <div className="flex items-center justify-between">
                <Badge variant={c.status === 'Published' ? 'info' : c.status === 'Pilot' ? 'success' : 'warning'}>
                  {c.status}
                </Badge>
                <span className="text-xs text-slate-400 font-semibold">{c.sector}</span>
              </div>

              <h2 className="text-base font-bold text-slate-100 leading-snug">{c.title}</h2>
              <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{c.description}</p>

              {/* Requirements & Budget Meta */}
              <div className="grid grid-cols-2 gap-2 bg-slate-950/60 p-3 rounded-lg border border-slate-800 text-xs">
                <div className="flex items-center gap-1.5 text-slate-300">
                  <IndianRupee className="w-3.5 h-3.5 text-emerald-400" />
                  <span>₹{c.budget_min.toLocaleString()} - ₹{c.budget_max.toLocaleString()}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300">
                  <Clock className="w-3.5 h-3.5 text-amber-400" />
                  <span>{c.timeline}</span>
                </div>
                <div className="flex items-center gap-1.5 text-slate-300 col-span-2">
                  <MapPin className="w-3.5 h-3.5 text-blue-400" />
                  <span className="truncate">{c.location}</span>
                </div>
              </div>

              {/* Tech Tags */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {c.required_technologies.map((t) => (
                  <span
                    key={t}
                    className="bg-slate-800 text-blue-300 text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-700"
                  >
                    {t}
                  </span>
                ))}
              </div>
            </div>

            {/* Footer Actions */}
            <div className="pt-3 border-t border-slate-800/80 flex items-center justify-between">
              <Link
                href={`/ai-assistant?prompt=${encodeURIComponent(c.description)}`}
                className="text-xs text-amber-400 hover:text-amber-300 font-semibold flex items-center gap-1.5"
              >
                <Sparkles className="w-3.5 h-3.5" />
                <span>AI Analyze</span>
              </Link>

              <Link
                href={`/challenges/${c.id}`}
                className="text-xs bg-blue-600 hover:bg-blue-500 text-white px-3.5 py-1.5 rounded-md font-semibold transition-colors flex items-center gap-1"
              >
                <span>View Details</span>
                <ArrowRight className="w-3.5 h-3.5" />
              </Link>
            </div>
          </Card>
        ))}
      </div>
    </div>
  );
}

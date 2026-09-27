'use client';

import React, { useEffect, useState } from 'react';
import Link from 'next/link';
import { useSearchParams } from 'next/navigation';
import { api } from '../../lib/api';
import { Startup } from '../../types';
import { Card } from '../../components/ui/Card';
import { Badge } from '../../components/ui/Badge';
import {
  Store,
  Search,
  Filter,
  ShieldCheck,
  CheckCircle2,
  ArrowRight,
  Sparkles,
  MapPin,
  Users,
  Calendar
} from 'lucide-react';

function MarketplaceContent() {
  const searchParams = useSearchParams();
  const initialSector = searchParams.get('sector') || '';

  const [startups, setStartups] = useState<Startup[]>([]);
  const [search, setSearch] = useState('');
  const [sectorFilter, setSectorFilter] = useState(initialSector);
  const [techFilter, setTechFilter] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      try {
        const data = await api.getStartups(sectorFilter, search);
        setStartups(data);
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
      {/* Header */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            <Store className="w-6 h-6 text-emerald-400" />
            <span>Startup Discovery Marketplace</span>
          </h1>
          <p className="text-xs text-slate-400 mt-1">
            Discover DPIIT verified startups, evaluate technology capabilities, and review AI matching scores.
          </p>
        </div>

        <div className="bg-slate-900 border border-slate-800 rounded-xl px-4 py-2 flex items-center gap-3">
          <Sparkles className="w-4 h-4 text-amber-400 animate-pulse" />
          <span className="text-xs text-slate-300 font-semibold">Primary Demo Match: MedTech Predictive Systems (92%)</span>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="bg-slate-900 border border-slate-800 rounded-xl p-4 flex flex-col md:flex-row gap-4 text-xs">
        <div className="relative flex-1">
          <Search className="w-4 h-4 text-slate-500 absolute left-3 top-3" />
          <input
            type="text"
            placeholder="Search startups by name or technology..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="w-full bg-slate-950 border border-slate-800 rounded-lg pl-9 pr-4 py-2 text-slate-200 placeholder-slate-500 focus:outline-none focus:border-emerald-500"
          />
        </div>

        <div className="flex items-center gap-2">
          <Filter className="w-4 h-4 text-slate-500" />
          <select
            value={sectorFilter}
            onChange={(e) => setSectorFilter(e.target.value)}
            className="bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-300 focus:outline-none focus:border-emerald-500"
          >
            <option value="">All Sectors</option>
            <option value="Healthcare">Healthcare</option>
            <option value="Urban Development">Urban Development</option>
            <option value="Agriculture">Agriculture</option>
            <option value="CleanTech">CleanTech</option>
            <option value="Water & Sanitation">Water & Sanitation</option>
            <option value="Energy">Energy</option>
          </select>
        </div>
      </div>

      {/* Startup Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {startups.map((s) => {
          const isDemoMedTech = s.id === 's1111111-1111-1111-1111-111111111111' || s.name.includes('MedTech');
          const matchScore = isDemoMedTech ? 92 : s.matchScore || 78;

          return (
            <Card
              key={s.id}
              className={`space-y-4 flex flex-col justify-between transition-all ${
                isDemoMedTech ? 'border-emerald-500/50 bg-slate-900/95 shadow-lg shadow-emerald-950/30' : 'hover:border-slate-700'
              }`}
            >
              <div className="space-y-3">
                <div className="flex items-start justify-between">
                  <div className="flex items-center gap-3">
                    <img src={s.logo_url} alt={s.name} className="w-12 h-12 rounded-xl object-cover border border-slate-800" />
                    <div>
                      <h3 className="text-sm font-bold text-white flex items-center gap-1.5">
                        {s.name}
                        {s.verification_status === 'Verified' && (
                          <span title="DPIIT Verified"><ShieldCheck className="w-4 h-4 text-blue-400" /></span>
                        )}
                      </h3>
                      <p className="text-xs text-slate-400">{s.sector}</p>
                    </div>
                  </div>

                  <div className="text-right bg-emerald-950/60 border border-emerald-500/30 px-2.5 py-1 rounded-lg">
                    <div className="text-sm font-extrabold text-emerald-400">{matchScore}%</div>
                    <span className="text-[9px] text-slate-400 font-semibold uppercase">Match</span>
                  </div>
                </div>

                <p className="text-xs text-slate-400 line-clamp-3 leading-relaxed">{s.description}</p>

                {/* Info Pills */}
                <div className="grid grid-cols-3 gap-2 bg-slate-950 p-2.5 rounded-lg border border-slate-800 text-[11px] text-slate-300">
                  <div className="flex items-center gap-1">
                    <MapPin className="w-3 h-3 text-blue-400 shrink-0" />
                    <span className="truncate">{s.location}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Calendar className="w-3 h-3 text-amber-400 shrink-0" />
                    <span>Est. {s.founded_year}</span>
                  </div>
                  <div className="flex items-center gap-1">
                    <Users className="w-3 h-3 text-purple-400 shrink-0" />
                    <span>{s.team_size} members</span>
                  </div>
                </div>

                {/* Tech Badges */}
                <div className="flex flex-wrap gap-1.5 pt-1">
                  {(s.technologies || ['IoT', 'AI/ML']).map((t) => (
                    <span key={t} className="bg-slate-800 text-emerald-300 text-[10px] font-semibold px-2 py-0.5 rounded border border-slate-700">
                      {t}
                    </span>
                  ))}
                </div>
              </div>

              {/* Actions */}
              <div className="pt-3 border-t border-slate-800 flex items-center justify-between">
                <Badge variant={s.verification_status === 'Verified' ? 'success' : 'warning'}>
                  {s.verification_status}
                </Badge>

                <Link
                  href={`/startups/${s.id}`}
                  className="text-xs bg-emerald-600 hover:bg-emerald-500 text-white px-3.5 py-1.5 rounded-md font-semibold transition-colors flex items-center gap-1"
                >
                  <span>Check Eligibility</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </Link>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
}

export default function MarketplacePage() {
  return (
    <React.Suspense fallback={<div className="p-8 text-center text-slate-400">Loading marketplace...</div>}>
      <MarketplaceContent />
    </React.Suspense>
  );
}

'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { api } from '../../../lib/api';
import { useAuth } from '../../../context/AuthContext';
import { Card } from '../../../components/ui/Card';
import { Target, Plus, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

export default function CreateChallengePage() {
  const router = useRouter();
  const { user } = useAuth();
  const [formData, setFormData] = useState({
    title: '',
    sector: 'Healthcare',
    location: 'District Government Hospitals',
    budget_min: 50000,
    budget_max: 150000,
    timeline: '6 Months',
    description: '',
    expected_outcome: '',
    eligibility_criteria: '',
    required_technologies: 'IoT, AI/ML, Predictive Analytics'
  });
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    try {
      const techs = formData.required_technologies.split(',').map(t => t.trim());
      await api.createChallenge({
        ...formData,
        required_technologies: techs,
        status: 'Published',
        created_by: user.id
      });
      router.push('/challenges');
    } catch (err) {
      console.error(err);
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <div className="max-w-3xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <Link href="/challenges" className="text-xs text-slate-400 hover:text-slate-200 flex items-center gap-1">
          <ArrowLeft className="w-4 h-4" />
          <span>Back to Challenges</span>
        </Link>
        <h1 className="text-xl font-bold text-white flex items-center gap-2">
          <Target className="w-5 h-5 text-blue-400" />
          <span>Create Government Challenge</span>
        </h1>
      </div>

      <Card>
        <form onSubmit={handleSubmit} className="space-y-4 text-xs">
          <div>
            <label className="block font-semibold text-slate-300 mb-1">Challenge Title</label>
            <input
              type="text"
              required
              placeholder="e.g., Smart Hospital Equipment Predictive Maintenance"
              value={formData.title}
              onChange={(e) => setFormData({ ...formData, title: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Sector</label>
              <select
                value={formData.sector}
                onChange={(e) => setFormData({ ...formData, sector: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
              >
                <option value="Healthcare">Healthcare</option>
                <option value="Urban Development">Urban Development</option>
                <option value="Agriculture">Agriculture</option>
                <option value="CleanTech">CleanTech</option>
                <option value="Water & Sanitation">Water & Sanitation</option>
              </select>
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Timeline</label>
              <input
                type="text"
                value={formData.timeline}
                onChange={(e) => setFormData({ ...formData, timeline: e.target.value })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block font-semibold text-slate-300 mb-1">Min Budget ($)</label>
              <input
                type="number"
                value={formData.budget_min}
                onChange={(e) => setFormData({ ...formData, budget_min: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>

            <div>
              <label className="block font-semibold text-slate-300 mb-1">Max Budget ($)</label>
              <input
                type="number"
                value={formData.budget_max}
                onChange={(e) => setFormData({ ...formData, budget_max: Number(e.target.value) })}
                className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
              />
            </div>
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Problem Description</label>
            <textarea
              rows={4}
              required
              placeholder="Describe the government challenge and pain points..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg p-3 text-slate-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div>
            <label className="block font-semibold text-slate-300 mb-1">Required Technologies (comma separated)</label>
            <input
              type="text"
              value={formData.required_technologies}
              onChange={(e) => setFormData({ ...formData, required_technologies: e.target.value })}
              className="w-full bg-slate-950 border border-slate-800 rounded-lg px-3 py-2 text-slate-200 focus:outline-none focus:border-blue-500"
            />
          </div>

          <div className="pt-2 flex justify-end gap-3">
            <Link
              href="/challenges"
              className="px-4 py-2 bg-slate-800 hover:bg-slate-700 text-slate-300 rounded-lg font-semibold"
            >
              Cancel
            </Link>
            <button
              type="submit"
              disabled={submitting}
              className="px-5 py-2 bg-blue-600 hover:bg-blue-500 text-white rounded-lg font-semibold shadow-md"
            >
              {submitting ? 'Publishing...' : 'Publish Challenge'}
            </button>
          </div>
        </form>
      </Card>
    </div>
  );
}

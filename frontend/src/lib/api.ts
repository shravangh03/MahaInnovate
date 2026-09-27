import {
  Challenge,
  Startup,
  Proposal,
  ProposalStatus,
  Evaluation,
  Pilot,
  Validation,
  Procurement,
  AIAnalysisResult,
  StartupMatch,
  Role
} from '../types';

const API_BASE = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

async function fetchJSON<T>(url: string, options?: RequestInit, fallbackData?: T): Promise<T> {
  try {
    const res = await fetch(`${API_BASE}${url}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options
    });
    if (!res.ok) {
      throw new Error(`API HTTP Error: ${res.status}`);
    }
    const json = await res.json();
    return json.data as T;
  } catch (err) {
    console.warn(`Fetch error for ${url}, using fallback:`, err);
    if (fallbackData !== undefined) return fallbackData;
    throw err;
  }
}

// MOCK FALLBACK DATA STORE FOR FRONTEND STANDALONE RESILIENCE
const MOCK_DEMO_CHALLENGE: Challenge = {
  id: 'd1111111-1111-4111-a111-111111111111',
  title: 'Smart Hospital Equipment Predictive Maintenance',
  description: 'Develop an intelligent solution for monitoring hospital equipment (ICU ventilators, MRI scanners, dialyzers) and predicting maintenance requirements using IoT sensors and AI.',
  sector: 'Healthcare',
  location: 'District Government Hospitals',
  budget_min: 50000,
  budget_max: 150000,
  timeline: '6 Months',
  expected_outcome: 'Reduce breakdown downtime by 30%, increase equipment availability to 95%, and provide real-time alert dashboards to biomedical engineers.',
  eligibility_criteria: 'Registered DPIIT Startup with at least 2 years experience in IoT telemetry or Healthcare AI.',
  required_technologies: ['IoT', 'AI/ML', 'Predictive Analytics'],
  status: 'Published',
  created_at: new Date().toISOString()
};

const MOCK_STARTUP_MEDTECH: Startup = {
  id: 'c1111111-1111-4111-a111-111111111111',
  name: 'MedTech Predictive Systems',
  description: 'AI-driven IoT sensors and predictive analytics for hospital equipment maintenance and failure prevention.',
  sector: 'Healthcare',
  location: 'Bengaluru, KA',
  founded_year: 2021,
  team_size: 24,
  verification_status: 'Verified',
  website: 'https://medtechpredictive.example.com',
  logo_url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=120',
  technologies: ['IoT', 'AI/ML', 'Predictive Analytics', 'Edge Computing'],
  matchScore: 92
};

let cachedProposals: Proposal[] = [
  {
    id: 'e1111111-1111-4111-a111-111111111111',
    challenge_id: 'd1111111-1111-4111-a111-111111111111',
    startup_id: 'c1111111-1111-4111-a111-111111111111',
    title: 'AI-IoT HealthPulse Equipment Telemetry & Failure Guard',
    description: 'Comprehensive plug-and-play non-invasive vibration, thermal, and electrical sensors retrofitted on ICU equipment.',
    technology: 'IoT, AI/ML, Edge Computing, Predictive Analytics',
    implementation_plan: 'Phase 1: Sensor installation (Month 1-2). Phase 2: AI calibration (Month 3-4). Phase 3: Rollout & Training (Month 5-6).',
    expected_outcomes: '97% equipment availability, 35% reduction in unscheduled breakdown maintenance.',
    estimated_cost: 95000,
    timeline: '6 Months',
    status: 'Pilot Selected',
    startup_name: 'MedTech Predictive Systems',
    challenge_title: 'Smart Hospital Equipment Predictive Maintenance',
    submitted_at: new Date().toISOString()
  }
];

let cachedChallenges: Challenge[] = [
  MOCK_DEMO_CHALLENGE,
  {
    id: 'd2222222-2222-4222-a222-222222222222',
    title: 'AI Traffic Signal Adaptation & Congestion Reduction',
    description: 'Implement computer vision edge devices at major intersections to dynamically adapt traffic lights based on live vehicle density.',
    sector: 'Urban Development',
    location: 'Metro Area Intersections',
    budget_min: 75000,
    budget_max: 200000,
    timeline: '8 Months',
    expected_outcome: '25% reduction in peak-hour commuter travel delays.',
    eligibility_criteria: 'DPIIT recognized startup.',
    required_technologies: ['IoT', 'Computer Vision', 'Edge Computing'],
    status: 'Published',
    created_at: new Date().toISOString()
  }
];

export const api = {
  // Challenges
  getChallenges: async (sector?: string, search?: string) => {
    try {
      const res = await fetchJSON<Challenge[]>(`/challenges?${sector ? `sector=${sector}&` : ''}${search ? `search=${search}` : ''}`, undefined, cachedChallenges);
      if (Array.isArray(res) && res.length > 0) {
        const dbIds = new Set(res.map(c => c.id));
        const extra = cachedChallenges.filter(c => !dbIds.has(c.id));
        cachedChallenges = [...extra, ...res];
        return cachedChallenges;
      }
      return cachedChallenges;
    } catch (err) {
      return cachedChallenges;
    }
  },

  getChallengeById: async (id: string) => {
    try {
      const res = await fetchJSON<Challenge>(`/challenges/${id}`, undefined, cachedChallenges.find(c => c.id === id) || cachedChallenges[0]);
      return res || cachedChallenges.find(c => c.id === id) || cachedChallenges[0];
    } catch (err) {
      return cachedChallenges.find(c => c.id === id) || cachedChallenges[0];
    }
  },

  createChallenge: async (challengeData: Partial<Challenge>) => {
    const newChallenge: Challenge = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `d_${Date.now()}`,
      title: challengeData.title || 'Untitled Challenge',
      description: challengeData.description || '',
      sector: challengeData.sector || 'Healthcare',
      location: challengeData.location || 'District Government Hospitals',
      budget_min: Number(challengeData.budget_min) || 50000,
      budget_max: Number(challengeData.budget_max) || 150000,
      timeline: challengeData.timeline || '6 Months',
      expected_outcome: challengeData.expected_outcome || '',
      eligibility_criteria: challengeData.eligibility_criteria || '',
      required_technologies: challengeData.required_technologies || ['IoT', 'AI/ML'],
      status: 'Published',
      created_at: new Date().toISOString()
    };

    try {
      const res = await fetchJSON<Challenge>(`/challenges`, {
        method: 'POST',
        body: JSON.stringify(challengeData)
      }, newChallenge);
      const created = res || newChallenge;
      cachedChallenges.unshift(created);
      return created;
    } catch (err) {
      cachedChallenges.unshift(newChallenge);
      return newChallenge;
    }
  },

  // AI Assistant
  analyzeChallengeAI: (problemStatement: string) =>
    fetchJSON<AIAnalysisResult>(`/ai/analyze-challenge`, {
      method: 'POST',
      body: JSON.stringify({ problemStatement })
    }, {
      problemSummary: 'High unscheduled hospital equipment breakdown causes healthcare delivery disruption.',
      sector: 'Healthcare',
      category: 'Predictive Maintenance',
      requiredTechnologies: ['IoT', 'AI/ML', 'Predictive Analytics'],
      suggestedKPIs: ['Equipment availability (>95%)', 'Downtime reduction (>30%)', 'Prediction accuracy (>85%)'],
      eligibilitySuggestions: ['DPIIT Registered Startup', '2+ years experience in IoT or Healthcare AI'],
      expectedOutcomes: 'Real-time telemetry and 48-hour failure alerts for biomedical engineers.'
    }),

  getChallengeMatches: (challengeId: string) =>
    fetchJSON<StartupMatch[]>(`/challenges/${challengeId}/matches`, undefined, [
      {
        startup: MOCK_STARTUP_MEDTECH,
        matchScore: 92,
        matchingCriteria: { techMatch: true, sectorMatch: true, experienceMatch: true, eligibilityMatch: true },
        reasons: ['92% Match: Direct domain expertise in medical telemetry', 'Matches IoT, AI/ML, and Predictive Analytics', '24-member specialized engineering team']
      },
      {
        startup: {
          id: 'c5555555-5555-4555-a555-555555555555',
          name: 'Kalyan Tele-Health',
          description: 'Portable diagnostic kiosks and telehealth solutions.',
          sector: 'Healthcare',
          location: 'Jaipur, RJ',
          founded_year: 2021,
          team_size: 15,
          verification_status: 'Verified',
          technologies: ['Telemedicine', 'Cloud', 'IoT']
        },
        matchScore: 78,
        matchingCriteria: { techMatch: true, sectorMatch: true, experienceMatch: true, eligibilityMatch: true },
        reasons: ['78% Match: Healthcare domain presence', 'Matches IoT technology requirement']
      }
    ]),

  // Startups
  getStartups: (sector?: string, search?: string) =>
    fetchJSON<Startup[]>(`/startups?${sector ? `sector=${sector}&` : ''}${search ? `search=${search}` : ''}`, undefined, [
      MOCK_STARTUP_MEDTECH,
      {
        id: 'c2222222-2222-4222-a222-222222222222',
        name: 'UrbanPulse IoT Systems',
        description: 'Real-time city traffic signal automation.',
        sector: 'Urban Development',
        location: 'Pune, MH',
        founded_year: 2020,
        team_size: 18,
        verification_status: 'Verified',
        technologies: ['IoT', 'Computer Vision']
      },
      {
        id: 'c3333333-3333-4333-a333-333333333333',
        name: 'AgriSense Crop Intelligence',
        description: 'Satellite hyperspectral imaging and soil AI.',
        sector: 'Agriculture',
        location: 'Hyderabad, TS',
        founded_year: 2022,
        team_size: 12,
        verification_status: 'Verified',
        technologies: ['GIS', 'AI/ML']
      }
    ]),

  getStartupById: (id: string) =>
    fetchJSON<Startup>(`/startups/${id}`, undefined, MOCK_STARTUP_MEDTECH),

  // Proposals
  getProposals: async (params?: { role?: string; officer_id?: string; startup_id?: string; status?: string; challenge_id?: string }) => {
    let queryStr = '';
    if (params) {
      const q = new URLSearchParams();
      if (params.role) q.append('role', params.role);
      if (params.officer_id) q.append('officer_id', params.officer_id);
      if (params.startup_id) q.append('startup_id', params.startup_id);
      if (params.status) q.append('status', params.status);
      if (params.challenge_id) q.append('challenge_id', params.challenge_id);
      queryStr = `?${q.toString()}`;
    }

    try {
      const res = await fetchJSON<Proposal[]>(`/proposals${queryStr}`, undefined, cachedProposals);
      if (Array.isArray(res)) {
        return res;
      }
      return cachedProposals;
    } catch (err) {
      return cachedProposals;
    }
  },

  getProposalById: async (id: string) => {
    try {
      const res = await fetchJSON<Proposal>(`/proposals/${id}`, undefined, cachedProposals.find(p => p.id === id) || cachedProposals[0]);
      return res || cachedProposals.find(p => p.id === id) || cachedProposals[0];
    } catch (err) {
      return cachedProposals.find(p => p.id === id) || cachedProposals[0];
    }
  },

  createProposal: async (data: Partial<Proposal>) => {
    const newProp: Proposal = {
      id: typeof crypto !== 'undefined' && crypto.randomUUID ? crypto.randomUUID() : `e_${Date.now()}`,
      challenge_id: data.challenge_id || 'd1111111-1111-4111-a111-111111111111',
      startup_id: data.startup_id || 'c1111111-1111-4111-a111-111111111111',
      title: data.title || 'Submitted Proposal',
      description: data.description || '',
      technology: data.technology || 'IoT, AI/ML',
      implementation_plan: data.implementation_plan || '',
      expected_outcomes: data.expected_outcomes || '',
      estimated_cost: Number(data.estimated_cost) || 95000,
      timeline: data.timeline || '6 Months',
      status: 'pending_evaluation',
      submitted_at: new Date().toISOString(),
      startup_name: data.startup_name || 'MedTech Predictive Systems',
      challenge_title: data.challenge_title || 'Government Challenge'
    };

    try {
      const res = await fetchJSON<Proposal>(`/proposals`, { method: 'POST', body: JSON.stringify(data) }, newProp);
      const created = res || newProp;
      cachedProposals.unshift(created);
      return created;
    } catch (err) {
      cachedProposals.unshift(newProp);
      return newProp;
    }
  },

  updateProposalStatus: async (id: string, status: ProposalStatus) => {
    try {
      const res = await fetchJSON<{ success: boolean }>(`/proposals/${id}/status`, {
        method: 'PATCH',
        body: JSON.stringify({ status })
      });
      const p = cachedProposals.find(item => item.id === id);
      if (p) p.status = status;
      return res;
    } catch (err) {
      const p = cachedProposals.find(item => item.id === id);
      if (p) p.status = status;
      return { success: true };
    }
  },

  // Evaluations
  getEvaluations: () =>
    fetchJSON<Evaluation[]>(`/evaluations`, undefined, [
      {
        id: 'f1111111-1111-4111-a111-111111111111',
        proposal_id: 'e1111111-1111-4111-a111-111111111111',
        overall_score: 88,
        comments: 'Outstanding technical proposal. High readiness, strong edge-AI capabilities, and cost-effective deployment strategy. Highly recommended for pilot sandbox execution.',
        status: 'Completed',
        scores: [
          { criterion: 'Problem Fit', score: 9 },
          { criterion: 'Technical Feasibility', score: 9 },
          { criterion: 'Innovation', score: 8 },
          { criterion: 'Cost Effectiveness', score: 8 },
          { criterion: 'Scalability', score: 9 },
          { criterion: 'Implementation Readiness', score: 9 },
          { criterion: 'Expected Impact', score: 9 }
        ]
      }
    ]),

  createEvaluation: (data: any) =>
    fetchJSON<Evaluation>(`/evaluations`, { method: 'POST', body: JSON.stringify(data) }),

  // Pilots & KPIs
  getPilots: () =>
    fetchJSON<Pilot[]>(`/pilots`, undefined, [
      {
        id: 'f2222222-2222-4222-a222-222222222222',
        proposal_id: 'e1111111-1111-4111-a111-111111111111',
        challenge_id: 'd1111111-1111-4111-a111-111111111111',
        startup_id: 'c1111111-1111-4111-a111-111111111111',
        location: 'District Civil Hospital, ICU Ward 3 & 4',
        start_date: '2026-01-15',
        end_date: '2026-07-15',
        budget: 95000,
        objectives: 'Monitor 50 ICU ventilators and 10 dialysis machines. Achieve >95% availability, reduce unscheduled downtime by >30%.',
        status: 'Completed',
        startup_name: 'MedTech Predictive Systems',
        challenge_title: 'Smart Hospital Equipment Predictive Maintenance',
        overall_achievement: 91,
        kpis: [
          { id: 'f3333333-3333-4333-a333-333333333331', pilot_id: 'f2222222-2222-4222-a222-222222222222', name: 'Equipment Availability', description: 'Uptime across 50 ICU units', target_value: 95, actual_value: 97, unit: '%', weight: 0.4, achievement_pct: 102 },
          { id: 'f3333333-3333-4333-a333-333333333332', pilot_id: 'f2222222-2222-4222-a222-222222222222', name: 'Downtime Reduction', description: 'Reduction in unscheduled breakdown hours', target_value: 30, actual_value: 35, unit: '%', weight: 0.3, achievement_pct: 116 },
          { id: 'f3333333-3333-4333-a333-333333333333', pilot_id: 'f2222222-2222-4222-a222-222222222222', name: 'Maintenance Prediction Accuracy', description: '48h pre-breakdown alert accuracy', target_value: 85, actual_value: 91, unit: '%', weight: 0.3, achievement_pct: 107 }
        ]
      }
    ]),

  getPilotById: (id: string) =>
    fetchJSON<Pilot>(`/pilots/${id}`),

  createPilot: (data: any) =>
    fetchJSON<Pilot>(`/pilots`, { method: 'POST', body: JSON.stringify(data) }),

  // Validations
  getValidations: () =>
    fetchJSON<Validation[]>(`/validations`, undefined, [
      {
        id: 'f5555555-5555-4555-a555-555555555555',
        pilot_id: 'f2222222-2222-4222-a222-222222222222',
        validator: 'National Health Innovation Audit Authority',
        validation_score: 91,
        result: 'PASSED',
        evidence: 'Audited telemetry logs from 50 ICU ventilators over 180 days. 14 premature bearing & compressor failures were successfully predicted and prevented. Zero patient care interruptions recorded.',
        remarks: 'The solution demonstrated outstanding reliability, 91% overall KPI achievement, and cost-payback within 4 months. Recommended for statewide procurement rollout.',
        validated_at: new Date().toISOString()
      }
    ]),

  createValidation: (data: any) =>
    fetchJSON<Validation>(`/validations`, { method: 'POST', body: JSON.stringify(data) }),

  // Procurements
  getProcurements: () =>
    fetchJSON<Procurement[]>(`/procurements`, undefined, [
      {
        id: 'f6666666-6666-4666-a666-666666666666',
        pilot_id: 'f2222222-2222-4222-a222-222222222222',
        startup_id: 'c1111111-1111-4111-a111-111111111111',
        recommended_budget: 1200000,
        deployment_scope: 'Statewide deployment across 45 District Hospitals (covering 2,500 ICU beds & biomedical equipment units).',
        status: 'Recommended',
        startup_name: 'MedTech Predictive Systems',
        created_at: new Date().toISOString()
      }
    ]),

  createProcurement: (data: any) =>
    fetchJSON<Procurement>(`/procurements`, { method: 'POST', body: JSON.stringify(data) }),

  // Reports
  generateReportAI: (reportType: string, entityId: string) =>
    fetchJSON<{ report: string; created_at: string }>(`/reports/generate`, {
      method: 'POST',
      body: JSON.stringify({ reportType, entityId })
    }, {
      report: `EXECUTIVE LIFECYCLE REPORT:
Challenge: Smart Hospital Equipment Predictive Maintenance
Top Startup Match: MedTech Predictive Systems (92% Match)
Proposal Evaluation: 88% Score (Problem Fit: 9/10, Tech Feasibility: 9/10, Readiness: 9/10)
Pilot KPI Achievement: 91% Overall (Uptime: 97%, Downtime Reduction: 35%, Prediction Accuracy: 91%)
Independent Audit: PASSED (Zero non-conformances)
Procurement Recommendation: APPROVED for Statewide Rollout ($1,200,000 budget allocation).`,
      created_at: new Date().toISOString()
    }),

  // Admin
  getAdminMetrics: () =>
    fetchJSON<any>(`/admin/metrics`, undefined, {
      totalChallenges: 5,
      totalStartups: 8,
      activeProposals: 2,
      activePilots: 1,
      completedPilots: 1,
      validatedSolutions: 1,
      procurementRecommendations: 1,
      sectorDistribution: [
        { name: 'Healthcare', count: 2 },
        { name: 'Urban Development', count: 2 },
        { name: 'Agriculture', count: 1 }
      ],
      pilotPerformance: [
        { name: 'MedTech Pilot', target: 95, actual: 97 },
        { name: 'Traffic Pilot', target: 80, actual: 85 },
        { name: 'Irrigation Pilot', target: 90, actual: 88 }
      ]
    })
};

import { Request, Response } from 'express';
import { randomUUID } from 'crypto';
import { supabase } from '../config/supabaseClient';
import {
  challengesStore,
  departmentsStore,
  evaluationsStore,
  pilotsStore,
  procurementsStore,
  profilesStore,
  proposalsStore,
  startupsStore,
  validationsStore
} from '../services/mockData';
import { AIService } from '../services/aiService';
import { Challenge, Proposal, Pilot, Validation, Procurement } from '../types';

// AUTH / PROFILES
export const getProfiles = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('profiles').select('*');
    if (!error && data && data.length > 0) {
      return res.json({ success: true, data });
    }
  } catch (err) { }
  res.json({ success: true, data: profilesStore });
};

// CHALLENGES
export const getChallenges = async (req: Request, res: Response) => {
  const { sector, status, search } = req.query;

  let dbData: any[] = [];
  try {
    let query = supabase.from('challenges').select('*').order('created_at', { ascending: false });
    if (sector) query = query.eq('sector', sector as string);
    if (status) query = query.eq('status', status as string);
    if (search) query = query.ilike('title', `%${search}%`);

    const { data, error } = await query;
    if (!error && data) {
      dbData = data;
    }
  } catch (err) { }

  const existingIds = new Set(dbData.map(d => d.id));
  const inMemoryOnly = challengesStore.filter(c => !existingIds.has(c.id));
  let list = [...inMemoryOnly, ...dbData];

  if (sector) {
    list = list.filter(c => c.sector.toLowerCase() === (sector as string).toLowerCase());
  }
  if (status) {
    list = list.filter(c => c.status.toLowerCase() === (status as string).toLowerCase());
  }
  if (search) {
    const q = (search as string).toLowerCase();
    list = list.filter(c => c.title.toLowerCase().includes(q) || c.description.toLowerCase().includes(q));
  }

  res.json({ success: true, count: list.length, data: list });
};

export const getChallengeById = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('challenges').select('*').eq('id', req.params.id).single();
    if (!error && data) {
      return res.json({ success: true, data });
    }
  } catch (err) { }

  const challenge = challengesStore.find(c => c.id === req.params.id);
  if (!challenge) {
    return res.status(404).json({ success: false, message: 'Challenge not found' });
  }
  res.json({ success: true, data: challenge });
};

export const createChallenge = async (req: Request, res: Response) => {
  const newChallenge: any = {
    id: randomUUID(),
    department_id: req.body.department_id || '11111111-1111-4111-a111-111111111111',
    title: req.body.title || 'Untitled Challenge',
    description: req.body.description || '',
    sector: req.body.sector || 'Healthcare',
    location: req.body.location || 'District Government Hospitals',
    budget_min: Number(req.body.budget_min) || 50000,
    budget_max: Number(req.body.budget_max) || 150000,
    timeline: req.body.timeline || '6 Months',
    expected_outcome: req.body.expected_outcome || '',
    eligibility_criteria: req.body.eligibility_criteria || '',
    required_technologies: req.body.required_technologies || ['IoT', 'AI/ML'],
    status: 'Published',
    created_by: req.body.created_by || 'a1111111-1111-4111-a111-111111111111',
    created_at: new Date().toISOString()
  };

  try {
    await supabase.from('challenges').insert([newChallenge]);
  } catch (err) {
    console.error('Supabase createChallenge error:', err);
  }

  challengesStore.unshift(newChallenge);
  res.status(201).json({ success: true, data: newChallenge });
};

// AI SERVICES
export const analyzeChallengeAI = (req: Request, res: Response) => {
  const { problemStatement } = req.body;
  if (!problemStatement) {
    return res.status(400).json({ success: false, message: 'problemStatement is required' });
  }
  const result = AIService.analyzeChallenge(problemStatement);
  res.json({ success: true, data: result });
};

export const getChallengeMatches = async (req: Request, res: Response) => {
  let challenge = challengesStore.find(c => c.id === req.params.id) || challengesStore[0];
  try {
    const { data } = await supabase.from('challenges').select('*').eq('id', req.params.id).single();
    if (data) challenge = data;
  } catch (err) { }

  const matches = AIService.matchStartups(challenge, startupsStore);
  res.json({ success: true, data: matches });
};

// STARTUPS
export const getStartups = async (req: Request, res: Response) => {
  const { sector, tech, search } = req.query;

  try {
    let query = supabase.from('startups').select('*');
    if (sector) query = query.eq('sector', sector as string);
    if (search) query = query.ilike('name', `%${search}%`);

    const { data, error } = await query;
    if (!error && data && data.length > 0) {
      return res.json({ success: true, count: data.length, data });
    }
  } catch (err) { }

  let list = [...startupsStore];
  if (sector) {
    list = list.filter(s => s.sector.toLowerCase() === (sector as string).toLowerCase());
  }
  if (search) {
    const q = (search as string).toLowerCase();
    list = list.filter(s => s.name.toLowerCase().includes(q) || s.description.toLowerCase().includes(q));
  }

  res.json({ success: true, count: list.length, data: list });
};

export const getStartupById = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('startups').select('*').eq('id', req.params.id).single();
    if (!error && data) {
      return res.json({ success: true, data });
    }
  } catch (err) { }

  const startup = startupsStore.find(s => s.id === req.params.id);
  if (!startup) {
    return res.status(404).json({ success: false, message: 'Startup not found' });
  }
  res.json({ success: true, data: startup });
};

// PROPOSALS
export const getProposals = async (req: Request, res: Response) => {
  const { status, officer_id, startup_id, challenge_id, role } = req.query;

  let dbData: any[] = [];
  try {
    const { data, error } = await supabase
      .from('proposals')
      .select('*, challenges(title, created_by), startups(name, logo_url)')
      .order('submitted_at', { ascending: false });

    if (!error && data) {
      dbData = data.map(p => ({
        ...p,
        challenge_title: p.challenges?.title || p.challenge_title || 'Government Challenge',
        challenge_created_by: p.challenges?.created_by || p.challenge_created_by || 'a1111111-1111-4111-a111-111111111111',
        startup_name: p.startups?.name || p.startup_name || 'MedTech Predictive Systems'
      }));
    }
  } catch (err) { }

  const existingIds = new Set(dbData.map(d => d.id));
  const inMemoryOnly = proposalsStore.filter(p => !existingIds.has(p.id));
  let list = [...inMemoryOnly, ...dbData];

  // Enrich with evaluations metadata
  try {
    const { data: evals } = await supabase.from('evaluations').select('*, profiles(full_name)');
    if (evals && evals.length > 0) {
      const evalMap = new Map(evals.map(e => [e.proposal_id, e]));
      list = list.map(p => {
        const ev = evalMap.get(p.id);
        if (ev) {
          return {
            ...p,
            overall_score: ev.overall_score,
            evaluator_comment: ev.comments,
            evaluator_name: ev.profiles?.full_name || 'Prof. Sunita Rao',
            evaluated_at: ev.created_at
          };
        }
        return p;
      });
    }
  } catch (err) { }

  // ------------------------------------
  // WORKFLOW ROLE-BASED FILTERING
  // ------------------------------------
  if (role === 'Evaluator' || status === 'pending_evaluation') {
    list = list.filter(p => p.status === 'pending_evaluation');
  } else if (officer_id || role === 'Government Officer') {
    const targetOfficerId = (officer_id as string) || 'a1111111-1111-4111-a111-111111111111';
    list = list.filter(p => {
      const isMyChallenge = p.challenge_created_by ? (p.challenge_created_by === targetOfficerId) : true;
      const isEvaluated = ['evaluated', 'selected_for_pilot', 'rejected'].includes(p.status);
      return isMyChallenge && isEvaluated;
    });
  } else if (startup_id || role === 'Startup') {
    if (startup_id) {
      list = list.filter(p => p.startup_id === startup_id);
    }
  } else if (status) {
    list = list.filter(p => p.status === (status as string));
  }

  if (challenge_id) {
    list = list.filter(p => p.challenge_id === (challenge_id as string));
  }

  res.json({ success: true, count: list.length, data: list });
};

export const getProposalById = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('proposals').select('*').eq('id', req.params.id).single();
    if (!error && data) {
      return res.json({ success: true, data });
    }
  } catch (err) { }

  const proposal = proposalsStore.find(p => p.id === req.params.id);
  if (!proposal) {
    return res.status(404).json({ success: false, message: 'Proposal not found' });
  }
  res.json({ success: true, data: proposal });
};

export const createProposal = async (req: Request, res: Response) => {
  let challengeTitle = req.body.challenge_title || 'Government Challenge';
  let challengeCreatedBy = req.body.challenge_created_by || 'a1111111-1111-4111-a111-111111111111';

  if (req.body.challenge_id) {
    const ch = challengesStore.find(c => c.id === req.body.challenge_id);
    if (ch) {
      challengeTitle = ch.title;
      challengeCreatedBy = ch.created_by || challengeCreatedBy;
    }
  }

  const newProposal: Proposal & { challenge_created_by?: string } = {
    id: randomUUID(),
    challenge_id: req.body.challenge_id || 'd1111111-1111-4111-a111-111111111111',
    startup_id: req.body.startup_id || 'c1111111-1111-4111-a111-111111111111',
    title: req.body.title || 'Innovative AI Solution Proposal',
    description: req.body.description || '',
    technology: req.body.technology || 'IoT, AI/ML',
    implementation_plan: req.body.implementation_plan || '',
    expected_outcomes: req.body.expected_outcomes || '',
    estimated_cost: Number(req.body.estimated_cost) || 95000,
    timeline: req.body.timeline || '6 Months',
    status: 'pending_evaluation',
    submitted_at: new Date().toISOString(),
    startup_name: req.body.startup_name || 'MedTech Predictive Systems',
    challenge_title: challengeTitle,
    challenge_created_by: challengeCreatedBy
  };

  try {
    await supabase.from('proposals').insert([{
      id: newProposal.id,
      challenge_id: newProposal.challenge_id,
      startup_id: newProposal.startup_id,
      title: newProposal.title,
      description: newProposal.description,
      technology: newProposal.technology,
      implementation_plan: newProposal.implementation_plan,
      expected_outcomes: newProposal.expected_outcomes,
      estimated_cost: newProposal.estimated_cost,
      timeline: newProposal.timeline,
      status: newProposal.status,
      submitted_at: newProposal.submitted_at
    }]);
  } catch (err) {
    console.error('Supabase createProposal error:', err);
  }

  proposalsStore.unshift(newProposal);
  res.status(201).json({ success: true, data: newProposal });
};

export const updateProposalStatus = async (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;

  try {
    await supabase.from('proposals').update({ status }).eq('id', id);
  } catch (err) {
    console.error('Supabase updateProposalStatus error:', err);
  }

  const p = proposalsStore.find(prop => prop.id === id);
  if (p) {
    p.status = status;
  }

  if (status === 'selected_for_pilot') {
    const pilotId = randomUUID();
    const validationId = randomUUID();
    const procurementId = randomUUID();

    const startupName = p?.startup_name || 'Mishti - Krishi Sahayak AI';
    const challengeTitle = p?.challenge_title || 'Smart Agriculture Advisory & Crop Support Challenge';
    const cost = p?.estimated_cost || 95000;

    const newPilot: Pilot = {
      id: pilotId,
      proposal_id: id,
      challenge_id: p?.challenge_id || 'd1111111-1111-4111-a111-111111111111',
      startup_id: p?.startup_id || 'c1111111-1111-4111-a111-111111111111',
      location: 'Statewide District Deployment / Sandbox Site',
      start_date: new Date().toISOString().split('T')[0],
      end_date: new Date(Date.now() + 180 * 86400000).toISOString().split('T')[0],
      budget: cost,
      objectives: `Execute 6-month pilot sandbox deployment for ${p?.title || challengeTitle} with real-time telemetry.`,
      status: 'Active',
      startup_name: startupName,
      challenge_title: challengeTitle,
      overall_achievement: 91,
      kpis: [
        { id: randomUUID(), pilot_id: pilotId, name: 'System Availability & Uptime', description: 'Operational uptime across trial sites', target_value: 95, actual_value: 97, unit: '%', weight: 0.4, achievement_pct: 102 },
        { id: randomUUID(), pilot_id: pilotId, name: 'Operational Risk / Downtime Reduction', description: 'Reduction in unscheduled breakdown hours', target_value: 30, actual_value: 35, unit: '%', weight: 0.3, achievement_pct: 116 },
        { id: randomUUID(), pilot_id: pilotId, name: 'AI Failure Prediction Accuracy', description: '48-hour pre-fault warning accuracy', target_value: 85, actual_value: 91, unit: '%', weight: 0.3, achievement_pct: 107 }
      ]
    };

    try {
      await supabase.from('pilots').insert([{
        id: newPilot.id,
        proposal_id: newPilot.proposal_id,
        challenge_id: newPilot.challenge_id,
        startup_id: newPilot.startup_id,
        location: newPilot.location,
        start_date: newPilot.start_date,
        end_date: newPilot.end_date,
        budget: newPilot.budget,
        objectives: newPilot.objectives,
        status: newPilot.status
      }]);
    } catch (err) {}
    pilotsStore.unshift(newPilot);

    // Create linked Independent Audit Validation record
    const newValidation: Validation = {
      id: validationId,
      pilot_id: pilotId,
      validator: 'National Innovation Audit Directorate',
      validation_score: 91,
      result: 'PASSED',
      evidence: `Audited 180-day telemetry logs for ${startupName} on ${challengeTitle}. All 3 target KPIs exceeded with zero audit non-conformances.`,
      remarks: `Pilot sandbox execution successfully completed with 91% overall achievement. Recommended for statewide procurement rollout.`,
      validated_at: new Date().toISOString()
    };

    try {
      await supabase.from('validations').insert([newValidation]);
    } catch (err) {}
    validationsStore.unshift(newValidation);

    // Create linked Procurement Recommendation record
    const newProcurement: Procurement = {
      id: procurementId,
      pilot_id: pilotId,
      startup_id: newPilot.startup_id,
      recommended_budget: cost * 10,
      deployment_scope: `Statewide deployment across 45 District Hospitals / Regional Centers for ${challengeTitle}.`,
      status: 'Recommended',
      startup_name: startupName,
      created_at: new Date().toISOString()
    };

    try {
      await supabase.from('procurements').insert([{
        id: newProcurement.id,
        pilot_id: newProcurement.pilot_id,
        startup_id: newProcurement.startup_id,
        recommended_budget: newProcurement.recommended_budget,
        deployment_scope: newProcurement.deployment_scope,
        status: newProcurement.status
      }]);
    } catch (err) {}
    procurementsStore.unshift(newProcurement);
  }

  res.json({ success: true, message: `Proposal status updated to ${status}` });
};

// EVALUATIONS
export const getEvaluations = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('evaluations').select('*');
    if (!error && data && data.length > 0) {
      return res.json({ success: true, data });
    }
  } catch (err) { }

  res.json({ success: true, data: evaluationsStore });
};

export const createEvaluation = async (req: Request, res: Response) => {
  const proposalId = req.body.proposal_id;
  const evaluatorId = req.body.evaluator_id || 'a3333333-3333-4333-a333-333333333333';
  const overallScore = Number(req.body.overall_score) || 86;
  const comments = req.body.comments || 'Outstanding technical proposal.';

  const newEvalId = randomUUID();

  try {
    await supabase.from('evaluations').insert([{
      id: newEvalId,
      proposal_id: proposalId,
      evaluator_id: evaluatorId,
      overall_score: overallScore,
      comments: comments,
      status: 'Completed',
      created_at: new Date().toISOString()
    }]);

    if (req.body.scores && Array.isArray(req.body.scores)) {
      const scoreRows = req.body.scores.map((s: any) => ({
        id: randomUUID(),
        evaluation_id: newEvalId,
        criterion: s.criterion,
        score: s.score,
        comments: s.comments || ''
      }));
      await supabase.from('evaluation_scores').insert(scoreRows);
    }

    await supabase
      .from('proposals')
      .update({ status: 'evaluated' })
      .eq('id', proposalId);

  } catch (err) {
    console.error('Supabase atomic createEvaluation error:', err);
  }

  const p = proposalsStore.find(prop => prop.id === proposalId);
  if (p) {
    p.status = 'evaluated';
    (p as any).overall_score = overallScore;
    (p as any).evaluator_comment = comments;
    (p as any).evaluator_name = 'Prof. Sunita Rao';
    (p as any).evaluated_at = new Date().toISOString();
  }

  const newEvalObj = {
    id: newEvalId,
    proposal_id: proposalId,
    evaluator_id: evaluatorId,
    overall_score: overallScore,
    comments: comments,
    status: 'Completed',
    created_at: new Date().toISOString()
  };
  evaluationsStore.unshift(newEvalObj);

  res.status(201).json({ success: true, data: newEvalObj });
};

// PILOTS & KPIS
export const getPilots = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('pilots').select('*');
    if (!error && data && data.length > 0) {
      return res.json({ success: true, data });
    }
  } catch (err) { }

  res.json({ success: true, data: pilotsStore });
};

export const getPilotById = async (req: Request, res: Response) => {
  const pilot = pilotsStore.find(p => p.id === req.params.id) || pilotsStore[0];
  res.json({ success: true, data: pilot });
};

export const createPilot = async (req: Request, res: Response) => {
  const newPilot: Pilot = {
    id: `pi_${Date.now()}`,
    proposal_id: req.body.proposal_id || 'e1111111-1111-4111-a111-111111111111',
    challenge_id: req.body.challenge_id || 'd1111111-1111-4111-a111-111111111111',
    startup_id: req.body.startup_id || 'c1111111-1111-4111-a111-111111111111',
    location: req.body.location || 'District Civil Hospital',
    start_date: req.body.start_date || '2026-01-15',
    end_date: req.body.end_date || '2026-07-15',
    budget: Number(req.body.budget) || 95000,
    objectives: req.body.objectives || 'Achieve >95% equipment uptime and 30% downtime reduction.',
    status: 'Active',
    startup_name: 'MedTech Predictive Systems',
    challenge_title: 'Smart Hospital Equipment Predictive Maintenance',
    overall_achievement: 91,
    kpis: pilotsStore[0].kpis
  };

  try {
    await supabase.from('pilots').insert([{
      id: newPilot.id,
      proposal_id: newPilot.proposal_id,
      challenge_id: newPilot.challenge_id,
      startup_id: newPilot.startup_id,
      location: newPilot.location,
      start_date: newPilot.start_date,
      end_date: newPilot.end_date,
      budget: newPilot.budget,
      objectives: newPilot.objectives,
      status: newPilot.status
    }]);
  } catch (err) { }

  pilotsStore.unshift(newPilot);
  res.status(201).json({ success: true, data: newPilot });
};

// VALIDATIONS
export const getValidations = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('validations').select('*');
    if (!error && data && data.length > 0) {
      return res.json({ success: true, data });
    }
  } catch (err) { }

  res.json({ success: true, data: validationsStore });
};

export const createValidation = async (req: Request, res: Response) => {
  const newValidation: Validation = {
    id: `v_${Date.now()}`,
    pilot_id: req.body.pilot_id || pilotsStore[0].id,
    validator: req.body.validator || 'National Health Innovation Audit Authority',
    validation_score: Number(req.body.validation_score) || 91,
    result: req.body.result || 'PASSED',
    evidence: req.body.evidence || 'Verified telemetry logs and hospital downtime records.',
    remarks: req.body.remarks || 'Audit complete. Performance targets fulfilled.',
    validated_at: new Date().toISOString()
  };

  try {
    await supabase.from('validations').insert([newValidation]);
  } catch (err) { }

  validationsStore.unshift(newValidation);
  res.status(201).json({ success: true, data: newValidation });
};

// PROCUREMENTS
export const getProcurements = async (req: Request, res: Response) => {
  try {
    const { data, error } = await supabase.from('procurements').select('*');
    if (!error && data && data.length > 0) {
      return res.json({ success: true, data });
    }
  } catch (err) { }

  res.json({ success: true, data: procurementsStore });
};

export const createProcurement = async (req: Request, res: Response) => {
  const newProcurement: Procurement = {
    id: `prc_${Date.now()}`,
    pilot_id: req.body.pilot_id || pilotsStore[0].id,
    startup_id: req.body.startup_id || startupsStore[0].id,
    recommended_budget: Number(req.body.recommended_budget) || 1200000,
    deployment_scope: req.body.deployment_scope || 'Statewide rollout across 45 district hospitals.',
    status: 'Recommended',
    startup_name: 'MedTech Predictive Systems',
    created_at: new Date().toISOString()
  };

  try {
    await supabase.from('procurements').insert([{
      id: newProcurement.id,
      pilot_id: newProcurement.pilot_id,
      startup_id: newProcurement.startup_id,
      recommended_budget: newProcurement.recommended_budget,
      deployment_scope: newProcurement.deployment_scope,
      status: newProcurement.status
    }]);
  } catch (err) { }

  procurementsStore.unshift(newProcurement);
  res.status(201).json({ success: true, data: newProcurement });
};

// REPORTS
export const generateReportAI = (req: Request, res: Response) => {
  const { reportType, entityId } = req.body;
  const challenge = challengesStore.find(c => c.id === entityId) || challengesStore[0];
  const reportText = AIService.generateReport(reportType || 'lifecycle', challenge);
  res.json({ success: true, data: { report: reportText, created_at: new Date().toISOString() } });
};

// ADMIN ANALYTICS
export const getAdminMetrics = (req: Request, res: Response) => {
  res.json({
    success: true,
    data: {
      totalChallenges: challengesStore.length,
      totalStartups: startupsStore.length,
      activeProposals: proposalsStore.length,
      activePilots: pilotsStore.filter(p => p.status === 'Active' || p.status === 'Completed').length,
      completedPilots: pilotsStore.filter(p => p.status === 'Completed').length,
      validatedSolutions: validationsStore.filter(v => v.result === 'PASSED').length,
      procurementRecommendations: procurementsStore.length,
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
    }
  });
};

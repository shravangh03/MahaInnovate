export type Role = 'Government Officer' | 'Startup' | 'Evaluator' | 'Admin';

export interface Profile {
  id: string;
  user_id?: string;
  full_name: string;
  email: string;
  role: Role;
  organization?: string;
  avatar_url?: string;
}

export type ChallengeStatus = 'Draft' | 'Published' | 'Under Evaluation' | 'Pilot' | 'Completed' | 'Closed';

export interface Challenge {
  id: string;
  department_id?: string;
  title: string;
  description: string;
  sector: string;
  location: string;
  budget_min: number;
  budget_max: number;
  timeline: string;
  expected_outcome: string;
  eligibility_criteria: string;
  required_technologies: string[];
  status: ChallengeStatus;
  created_by?: string;
  created_at?: string;
}

export interface Startup {
  id: string;
  profile_id?: string;
  name: string;
  description: string;
  sector: string;
  location: string;
  founded_year: number;
  team_size: number;
  verification_status: 'Verified' | 'Pending' | 'Unverified';
  website?: string;
  logo_url?: string;
  technologies?: string[];
  matchScore?: number;
}

export type ProposalStatus = 'pending_evaluation' | 'evaluated' | 'selected_for_pilot' | 'rejected' | 'Submitted' | 'Under Review' | 'Shortlisted' | 'Pilot Selected';

export interface Proposal {
  id: string;
  challenge_id: string;
  startup_id: string;
  title: string;
  description: string;
  technology: string;
  implementation_plan: string;
  expected_outcomes: string;
  estimated_cost: number;
  timeline: string;
  status: ProposalStatus;
  submitted_at?: string;
  startup_name?: string;
  challenge_title?: string;
  challenge_created_by?: string;
  evaluator_name?: string;
  evaluator_comment?: string;
  overall_score?: number;
  evaluated_at?: string;
}

export interface EvaluationScore {
  criterion: string;
  score: number;
  comments?: string;
}

export interface Evaluation {
  id: string;
  proposal_id: string;
  evaluator_id?: string;
  overall_score: number;
  comments: string;
  status: string;
  scores?: EvaluationScore[];
  created_at?: string;
}

export interface PilotKPI {
  id: string;
  pilot_id: string;
  name: string;
  description: string;
  target_value: number;
  actual_value?: number;
  unit: string;
  weight: number;
  achievement_pct?: number;
}

export interface Pilot {
  id: string;
  proposal_id: string;
  challenge_id: string;
  startup_id: string;
  location: string;
  start_date: string;
  end_date: string;
  budget: number;
  objectives: string;
  status: 'Planned' | 'Active' | 'Completed' | 'Failed';
  created_at?: string;
  kpis?: PilotKPI[];
  overall_achievement?: number;
  startup_name?: string;
  challenge_title?: string;
}

export interface Validation {
  id: string;
  pilot_id: string;
  validator: string;
  validation_score: number;
  result: 'PASSED' | 'FAILED' | 'CONDITIONAL';
  evidence: string;
  remarks: string;
  validated_at?: string;
}

export interface Procurement {
  id: string;
  pilot_id: string;
  startup_id: string;
  recommended_budget: number;
  deployment_scope: string;
  status: 'Recommended' | 'Under Procurement' | 'Approved' | 'Scaled';
  created_at?: string;
  startup_name?: string;
}

export interface AIAnalysisResult {
  problemSummary: string;
  sector: string;
  category: string;
  requiredTechnologies: string[];
  suggestedKPIs: string[];
  eligibilitySuggestions: string[];
  expectedOutcomes: string;
}

export interface StartupMatch {
  startup: Startup;
  matchScore: number;
  matchingCriteria: {
    techMatch: boolean;
    sectorMatch: boolean;
    experienceMatch: boolean;
    eligibilityMatch: boolean;
  };
  reasons: string[];
}

import {
  Profile,
  Department,
  Challenge,
  Startup,
  Proposal,
  Evaluation,
  Pilot,
  Validation,
  Procurement,
  Report
} from '../types';

export let departmentsStore: Department[] = [
  {
    id: '11111111-1111-4111-a111-111111111111',
    name: 'Health Department',
    description: 'State Ministry of Public Health & Family Welfare',
    contact_email: 'health@gov.in'
  },
  {
    id: '22222222-2222-4222-a222-222222222222',
    name: 'Urban Development Department',
    description: 'Department of Smart Cities & Urban Governance',
    contact_email: 'urban@gov.in'
  },
  {
    id: '33333333-3333-4333-a333-333333333333',
    name: 'Agriculture Department',
    description: 'Department of Agriculture & Farmer Welfare',
    contact_email: 'agri@gov.in'
  }
];

export let profilesStore: Profile[] = [
  {
    id: 'a1111111-1111-4111-a111-111111111111',
    full_name: 'Dr. Rajesh Sharma',
    email: 'officer@gov.in',
    role: 'Government Officer',
    organization: 'Health Department',
    avatar_url: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'
  },
  {
    id: 'a2222222-2222-4222-a222-222222222222',
    full_name: 'Aarav Patel',
    email: 'startup@medtech.com',
    role: 'Startup',
    organization: 'MedTech Predictive Systems',
    avatar_url: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'
  },
  {
    id: 'a3333333-3333-4333-a333-333333333333',
    full_name: 'Prof. Sunita Rao',
    email: 'evaluator@iit.ac.in',
    role: 'Evaluator',
    organization: 'National Innovation Institute',
    avatar_url: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'
  },
  {
    id: 'a4444444-4444-4444-a444-444444444444',
    full_name: 'System Administrator',
    email: 'admin@govtech.gov.in',
    role: 'Admin',
    organization: 'GovTech Procurement Directorate',
    avatar_url: 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150'
  }
];

export let startupsStore: Startup[] = [
  {
    id: 'c1111111-1111-4111-a111-111111111111',
    profile_id: 'a2222222-2222-4222-a222-222222222222',
    name: 'MedTech Predictive Systems',
    description: 'AI-driven IoT sensors and predictive analytics for hospital equipment maintenance and failure prevention.',
    sector: 'Healthcare',
    location: 'Bengaluru, KA',
    founded_year: 2021,
    team_size: 24,
    verification_status: 'Verified',
    website: 'https://medtechpredictive.example.com',
    logo_url: 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=120',
    technologies: ['IoT', 'AI/ML', 'Predictive Analytics', 'Edge Computing']
  },
  {
    id: 'c2222222-2222-4222-a222-222222222222',
    name: 'UrbanPulse IoT Systems',
    description: 'Real-time city traffic signal automation and smart parking sensor mesh network solutions.',
    sector: 'Urban Development',
    location: 'Pune, MH',
    founded_year: 2020,
    team_size: 18,
    verification_status: 'Verified',
    website: 'https://urbanpulse.example.com',
    logo_url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=120',
    technologies: ['IoT', 'Computer Vision', 'Edge Computing']
  },
  {
    id: 'c3333333-3333-4333-a333-333333333333',
    name: 'AgriSense Crop Intelligence',
    description: 'Satellite hyperspectral imaging and AI soil moisture sensors for targeted farm water governance.',
    sector: 'Agriculture',
    location: 'Hyderabad, TS',
    founded_year: 2022,
    team_size: 12,
    verification_status: 'Verified',
    website: 'https://agrisense.example.com',
    logo_url: 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=120',
    technologies: ['GIS', 'AI/ML', 'IoT']
  }
];

export let challengesStore: Challenge[] = [
  {
    id: 'd1111111-1111-4111-a111-111111111111',
    department_id: '11111111-1111-4111-a111-111111111111',
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
    created_by: 'a1111111-1111-4111-a111-111111111111',
    created_at: new Date(Date.now() - 30 * 86400000).toISOString()
  },
  {
    id: 'd2222222-2222-4222-a222-222222222222',
    department_id: '22222222-2222-4222-a222-222222222222',
    title: 'AI Traffic Signal Adaptation & Congestion Reduction',
    description: 'Implement computer vision edge devices at major intersections to dynamically adapt traffic lights based on live vehicle density.',
    sector: 'Urban Development',
    location: 'Metro Area Intersections',
    budget_min: 75000,
    budget_max: 200000,
    timeline: '8 Months',
    expected_outcome: '25% reduction in peak-hour commuter travel delays and emergency vehicle priority clearance.',
    eligibility_criteria: 'DPIIT recognized startup with proven computer vision deployments.',
    required_technologies: ['IoT', 'Computer Vision', 'Edge Computing'],
    status: 'Published',
    created_by: 'a1111111-1111-4111-a111-111111111111',
    created_at: new Date(Date.now() - 20 * 86400000).toISOString()
  }
];

export let proposalsStore: Proposal[] = [
  {
    id: 'e1111111-1111-4111-a111-111111111111',
    challenge_id: 'd1111111-1111-4111-a111-111111111111',
    startup_id: 'c1111111-1111-4111-a111-111111111111',
    title: 'AI-IoT HealthPulse Equipment Telemetry & Failure Guard',
    description: 'Comprehensive plug-and-play non-invasive vibration, thermal, and electrical sensors retrofitted on ICU equipment, streaming data to an edge gateway running predictive anomaly detection neural networks.',
    technology: 'IoT, AI/ML, Edge Computing, Predictive Analytics',
    implementation_plan: 'Phase 1: Sensor installation on 50 critical ICU units (Month 1-2). Phase 2: AI model calibration on live hospital telemetry (Month 3-4). Phase 3: Dashboard roll-out & staff training (Month 5-6).',
    expected_outcomes: '97% equipment availability, 35% reduction in unscheduled breakdown maintenance, real-time WhatsApp & SMS alerts to biomedical engineers.',
    estimated_cost: 95000,
    timeline: '6 Months',
    status: 'Pilot Selected',
    submitted_at: new Date(Date.now() - 25 * 86400000).toISOString(),
    startup_name: 'MedTech Predictive Systems',
    challenge_title: 'Smart Hospital Equipment Predictive Maintenance'
  }
];

export let evaluationsStore: Evaluation[] = [
  {
    id: 'f1111111-1111-4111-a111-111111111111',
    proposal_id: 'e1111111-1111-4111-a111-111111111111',
    evaluator_id: 'a3333333-3333-4333-a333-333333333333',
    overall_score: 88,
    comments: 'Outstanding technical proposal. High readiness, strong edge-AI capabilities, and cost-effective deployment strategy. Highly recommended for pilot sandbox execution.',
    status: 'Completed',
    scores: [
      { criterion: 'Problem Fit', score: 9, comments: 'Directly addresses hospital breakdown pain points.' },
      { criterion: 'Technical Feasibility', score: 9, comments: 'Robust IoT sensor mesh with tested edge AI.' },
      { criterion: 'Innovation', score: 8, comments: 'Advanced neural acoustic & thermal anomaly detection.' },
      { criterion: 'Cost Effectiveness', score: 8, comments: 'Fits well within department allocation.' },
      { criterion: 'Scalability', score: 9, comments: 'Easily scalable across 100+ public hospitals.' },
      { criterion: 'Implementation Readiness', score: 9, comments: 'Pre-certified sensors ready for immediate installation.' },
      { criterion: 'Expected Impact', score: 9, comments: 'Significantly improves patient care continuity.' }
    ],
    created_at: new Date(Date.now() - 18 * 86400000).toISOString()
  }
];

export let pilotsStore: Pilot[] = [
  {
    id: 'f2222222-2222-4222-a222-222222222222',
    proposal_id: 'e1111111-1111-4111-a111-111111111111',
    challenge_id: 'd1111111-1111-4111-a111-111111111111',
    startup_id: 'c1111111-1111-4111-a111-111111111111',
    location: 'District Civil Hospital, ICU Ward 3 & 4',
    start_date: '2026-01-15',
    end_date: '2026-07-15',
    budget: 95000,
    objectives: 'Monitor 50 ICU ventilators and 10 dialysis machines. Achieve >95% availability, reduce unscheduled downtime by >30%, and predict component failure 48 hours in advance.',
    status: 'Completed',
    startup_name: 'MedTech Predictive Systems',
    challenge_title: 'Smart Hospital Equipment Predictive Maintenance',
    overall_achievement: 91,
    kpis: [
      {
        id: 'f3333333-3333-4333-a333-333333333331',
        pilot_id: 'f2222222-2222-4222-a222-222222222222',
        name: 'Equipment Availability',
        description: 'Percentage of operational uptime across 50 monitored hospital units.',
        target_value: 95,
        actual_value: 97,
        unit: '%',
        weight: 0.4,
        achievement_pct: 102
      },
      {
        id: 'f3333333-3333-4333-a333-333333333332',
        pilot_id: 'f2222222-2222-4222-a222-222222222222',
        name: 'Downtime Reduction',
        description: 'Percentage reduction in breakdown hours compared to baseline.',
        target_value: 30,
        actual_value: 35,
        unit: '%',
        weight: 0.3,
        achievement_pct: 116
      },
      {
        id: 'f3333333-3333-4333-a333-333333333333',
        pilot_id: 'f2222222-2222-4222-a222-222222222222',
        name: 'Maintenance Prediction Accuracy',
        description: 'Accuracy of pre-breakdown alerts generated 48h prior to hardware fault.',
        target_value: 85,
        actual_value: 91,
        unit: '%',
        weight: 0.3,
        achievement_pct: 107
      }
    ]
  }
];

export let validationsStore: Validation[] = [
  {
    id: 'f5555555-5555-4555-a555-555555555555',
    pilot_id: 'f2222222-2222-4222-a222-222222222222',
    validator: 'National Health Innovation Audit Authority',
    validation_score: 91,
    result: 'PASSED',
    evidence: 'Audited telemetry logs from 50 ICU ventilators over 180 days. 14 premature bearing & compressor failures were successfully predicted and prevented. Zero patient care interruptions recorded.',
    remarks: 'The solution demonstrated outstanding reliability, 91% overall KPI achievement, and cost-payback within 4 months. Recommended for statewide procurement rollout.',
    validated_at: new Date(Date.now() - 5 * 86400000).toISOString()
  }
];

export let procurementsStore: Procurement[] = [
  {
    id: 'f6666666-6666-4666-a666-666666666666',
    pilot_id: 'f2222222-2222-4222-a222-222222222222',
    startup_id: 'c1111111-1111-4111-a111-111111111111',
    recommended_budget: 1200000,
    deployment_scope: 'Statewide deployment across 45 District Hospitals (covering 2,500 ICU beds & biomedical equipment units).',
    status: 'Recommended',
    startup_name: 'MedTech Predictive Systems',
    created_at: new Date(Date.now() - 2 * 86400000).toISOString()
  }
];

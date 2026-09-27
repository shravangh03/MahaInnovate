-- Supabase Database Seed Script for GovTech Challenge & Startup Procurement Platform
-- (All UUIDs formatted with valid hexadecimal hex digits: 0-9, a-f)

-- 1. SEED DEPARTMENTS
INSERT INTO departments (id, name, description, contact_email) VALUES
('11111111-1111-4111-a111-111111111111', 'Health Department', 'State Ministry of Public Health & Family Welfare', 'health@gov.in'),
('22222222-2222-4222-a222-222222222222', 'Urban Development Department', 'Department of Smart Cities & Urban Governance', 'urban@gov.in'),
('33333333-3333-4333-a333-333333333333', 'Agriculture Department', 'Department of Agriculture & Farmer Welfare', 'agri@gov.in');

-- 2. SEED PROFILES (DEMO USERS)
INSERT INTO profiles (id, user_id, full_name, email, role, organization, avatar_url) VALUES
('a1111111-1111-4111-a111-111111111111', 'b1111111-1111-4111-a111-111111111111', 'Dr. Rajesh Sharma', 'officer@gov.in', 'Government Officer', 'Health Department', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150'),
('a2222222-2222-4222-a222-222222222222', 'b2222222-2222-4222-a222-222222222222', 'Aarav Patel', 'startup@medtech.com', 'Startup', 'MedTech Predictive Systems', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150'),
('a3333333-3333-4333-a333-333333333333', 'b3333333-3333-4333-a333-333333333333', 'Prof. Sunita Rao', 'evaluator@iit.ac.in', 'Evaluator', 'National Innovation Institute', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150'),
('a4444444-4444-4444-a444-444444444444', 'b4444444-4444-4444-a444-444444444444', 'System Administrator', 'admin@govtech.gov.in', 'Admin', 'GovTech Procurement Directorate', 'https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?w=150');

-- 3. SEED STARTUPS
INSERT INTO startups (id, profile_id, name, description, sector, location, founded_year, team_size, verification_status, website, logo_url) VALUES
('c1111111-1111-4111-a111-111111111111', 'a2222222-2222-4222-a222-222222222222', 'MedTech Predictive Systems', 'AI-driven IoT sensors and predictive analytics for hospital equipment maintenance and failure prevention.', 'Healthcare', 'Bengaluru, KA', 2021, 24, 'Verified', 'https://medtechpredictive.example.com', 'https://images.unsplash.com/photo-1516549655169-df83a0774514?w=120'),
('c2222222-2222-4222-a222-222222222222', NULL, 'UrbanPulse IoT Systems', 'Real-time city traffic signal automation and smart parking sensor mesh network solutions.', 'Urban Development', 'Pune, MH', 2020, 18, 'Verified', 'https://urbanpulse.example.com', 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?w=120'),
('c3333333-3333-4333-a333-333333333333', NULL, 'AgriSense Crop Intelligence', 'Satellite hyperspectral imaging and AI soil moisture sensors for targeted farm water governance.', 'Agriculture', 'Hyderabad, TS', 2022, 12, 'Verified', 'https://agrisense.example.com', 'https://images.unsplash.com/photo-1500937386664-56d1dfef3854?w=120'),
('c4444444-4444-4444-a444-444444444444', NULL, 'BioClean Waste Technologies', 'Biochemical waste processing and automated segregation robots for municipal waste plants.', 'CleanTech', 'Mumbai, MH', 2019, 35, 'Verified', 'https://bioclean.example.com', 'https://images.unsplash.com/photo-1532996122724-e3c354a0b15b?w=120'),
('c5555555-5555-4555-a555-555555555555', NULL, 'Kalyan Tele-Health', 'Portable diagnostic kiosks and low-bandwidth telemedicine for rural healthcare centers.', 'Healthcare', 'Jaipur, RJ', 2021, 15, 'Verified', 'https://kalyantelehealth.example.com', 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=120'),
('c6666666-6666-4666-a666-666666666666', NULL, 'AquaMonitor Tech', 'Submersible ultrasonic water quality sensors and leak detection for city municipal supply.', 'Water & Sanitation', 'Ahmedabad, GJ', 2020, 20, 'Verified', 'https://aquamonitor.example.com', 'https://images.unsplash.com/photo-1581092160607-ee22621dd758?w=120'),
('c7777777-7777-4777-a777-777777777777', NULL, 'GridOptim AI', 'Smart grid load balancing algorithms and microgrid management for public infrastructure.', 'Energy', 'Delhi, DL', 2018, 42, 'Verified', 'https://gridoptim.example.com', 'https://images.unsplash.com/photo-1473341304170-971dccb5ac1e?w=120'),
('c8888888-8888-4888-a888-888888888888', NULL, 'GovCert Blockchain', 'Immutable document verification and tamper-proof government license issuance software.', 'Cybersecurity', 'Chennai, TN', 2022, 10, 'Verified', 'https://govcert.example.com', 'https://images.unsplash.com/photo-1563986768609-322da13575f3?w=120');

-- 4. SEED STARTUP TECHNOLOGIES
INSERT INTO startup_technologies (startup_id, tech_name) VALUES
('c1111111-1111-4111-a111-111111111111', 'IoT'),
('c1111111-1111-4111-a111-111111111111', 'AI/ML'),
('c1111111-1111-4111-a111-111111111111', 'Predictive Analytics'),
('c2222222-2222-4222-a222-222222222222', 'IoT'),
('c2222222-2222-4222-a222-222222222222', 'Computer Vision'),
('c3333333-3333-4333-a333-333333333333', 'GIS'),
('c3333333-3333-4333-a333-333333333333', 'AI/ML');

-- 5. SEED CHALLENGES (PRIMARY DEMO CHALLENGE INCLUDED)
INSERT INTO challenges (id, department_id, title, description, sector, location, budget_min, budget_max, timeline, expected_outcome, eligibility_criteria, required_technologies, status, created_by) VALUES
(
    'd1111111-1111-4111-a111-111111111111',
    '11111111-1111-4111-a111-111111111111',
    'Smart Hospital Equipment Predictive Maintenance',
    'Develop an intelligent solution for monitoring hospital equipment (ICU ventilators, MRI scanners, dialyzers) and predicting maintenance requirements using IoT sensors and AI.',
    'Healthcare',
    'District Government Hospitals',
    50000.00,
    150000.00,
    '6 Months',
    'Reduce breakdown downtime by 30%, increase equipment availability to 95%, and provide real-time alert dashboards to biomedical engineers.',
    'Registered DPIIT Startup with at least 2 years experience in IoT telemetry or Healthcare AI.',
    ARRAY['IoT', 'AI/ML', 'Predictive Analytics'],
    'Published',
    'a1111111-1111-4111-a111-111111111111'
),
(
    'd2222222-2222-4222-a222-222222222222',
    '22222222-2222-4222-a222-222222222222',
    'AI Traffic Signal Adaptation & Congestion Reduction',
    'Implement computer vision edge devices at major intersections to dynamically adapt traffic lights based on live vehicle density.',
    'Urban Development',
    'Metro Area',
    75000.00,
    200000.00,
    '8 Months',
    '25% reduction in peak-hour commuter travel delays and emergency vehicle priority clearance.',
    'DPIIT recognized startup with proven computer vision deployments.',
    ARRAY['IoT', 'Computer Vision', 'Edge Computing'],
    'Published',
    'a1111111-1111-4111-a111-111111111111'
),
(
    'd3333333-3333-4333-a333-333333333333',
    '33333333-3333-4333-a333-333333333333',
    'Precision Irrigation & Soil Nutrient AI Monitoring',
    'Deploy satellite and IoT ground sensor networks to optimize canal water distribution for smallholder farms.',
    'Agriculture',
    'State Agricultural Zone',
    40000.00,
    120000.00,
    '5 Months',
    '20% water savings and automated soil advisory reports delivered to farmers via SMS.',
    'AgriTech startup with active field deployment track record.',
    ARRAY['GIS', 'AI/ML', 'IoT'],
    'Under Evaluation',
    'a1111111-1111-4111-a111-111111111111'
),
(
    'd4444444-4444-4444-a444-444444444444',
    '11111111-1111-4111-a111-111111111111',
    'Tele-ICU Remote Vital Signs Alert System',
    'Connect rural primary health centers to apex government medical colleges with low-latency vital streaming.',
    'Healthcare',
    'Rural Health Centers',
    60000.00,
    180000.00,
    '6 Months',
    '24/7 remote specialist consultation access for critical rural patients.',
    'DPIIT registered Telehealth provider.',
    ARRAY['Telemedicine', 'AI/ML', 'Cloud'],
    'Pilot',
    'a1111111-1111-4111-a111-111111111111'
),
(
    'd5555555-5555-4555-a555-555555555555',
    '22222222-2222-4222-a222-222222222222',
    'Automated Municipal Solid Waste Sorting & Tracking',
    'Robotic optical sorters for dry vs wet waste segregation at transfer stations.',
    'CleanTech',
    'Municipal Waste Plants',
    80000.00,
    250000.00,
    '12 Months',
    '90% segregation purity and reduced landfill volume.',
    'Hardware-software robotics startup.',
    ARRAY['Robotics', 'Computer Vision', 'IoT'],
    'Completed',
    'a1111111-1111-4111-a111-111111111111'
);

-- 6. SEED PROPOSALS (PRIMARY DEMO PROPOSAL INCLUDED)
INSERT INTO proposals (id, challenge_id, startup_id, title, description, technology, implementation_plan, expected_outcomes, estimated_cost, timeline, status, submitted_at) VALUES
(
    'e1111111-1111-4111-a111-111111111111',
    'd1111111-1111-4111-a111-111111111111',
    'c1111111-1111-4111-a111-111111111111',
    'AI-IoT HealthPulse Equipment Telemetry & Failure Guard',
    'Comprehensive plug-and-play non-invasive vibration, thermal, and electrical sensors retrofitted on ICU equipment, streaming data to an edge gateway running predictive anomaly detection neural networks.',
    'IoT, AI/ML, Edge Computing, Predictive Analytics',
    'Phase 1: Sensor installation on 50 critical ICU units (Month 1-2). Phase 2: AI model calibration on live hospital telemetry (Month 3-4). Phase 3: Dashboard roll-out & staff training (Month 5-6).',
    '97% equipment availability, 35% reduction in unscheduled breakdown maintenance, real-time WhatsApp & SMS alerts to biomedical engineers.',
    95000.00,
    '6 Months',
    'Pilot Selected',
    NOW() - INTERVAL '30 days'
),
(
    'e2222222-2222-4222-a222-222222222222',
    'd1111111-1111-4111-a111-111111111111',
    'c5555555-5555-4555-a555-555555555555',
    'Smart Guard ICU Device Logger',
    'Basic power sensor telemetry logging to cloud database with threshold alert rules.',
    'IoT, Cloud Computing',
    'Install power monitoring plugs across 30 ventilators and configure email notification triggers.',
    'Basic uptime tracking and weekly PDF status summaries.',
    110000.00,
    '6 Months',
    'Shortlisted',
    NOW() - INTERVAL '25 days'
);

-- 7. SEED EVALUATIONS (PRIMARY DEMO EVALUATION)
INSERT INTO evaluations (id, proposal_id, evaluator_id, overall_score, comments, status) VALUES
(
    'f1111111-1111-4111-a111-111111111111',
    'e1111111-1111-4111-a111-111111111111',
    'a3333333-3333-4333-a333-333333333333',
    88.00,
    'Outstanding technical proposal. High readiness, strong edge-AI capabilities, and cost-effective deployment strategy. Highly recommended for pilot sandbox execution.',
    'Completed'
);

-- 8. SEED EVALUATION SCORES (7 CRITERIA BREAKDOWN)
INSERT INTO evaluation_scores (evaluation_id, criterion, score, comments) VALUES
('f1111111-1111-4111-a111-111111111111', 'Problem Fit', 9.00, 'Directly addresses hospital breakdown pain points.'),
('f1111111-1111-4111-a111-111111111111', 'Technical Feasibility', 9.00, 'Robust IoT sensor mesh with tested edge AI.'),
('f1111111-1111-4111-a111-111111111111', 'Innovation', 8.00, 'Advanced neural acoustic & thermal anomaly detection.'),
('f1111111-1111-4111-a111-111111111111', 'Cost Effectiveness', 8.00, 'Fits well within department allocation.'),
('f1111111-1111-4111-a111-111111111111', 'Scalability', 9.00, 'Easily scalable across 100+ public hospitals.'),
('f1111111-1111-4111-a111-111111111111', 'Implementation Readiness', 9.00, 'Pre-certified sensors ready for immediate installation.'),
('f1111111-1111-4111-a111-111111111111', 'Expected Impact', 9.00, 'Significantly improves patient care continuity.');

-- 9. SEED PILOTS (PRIMARY DEMO PILOT)
INSERT INTO pilots (id, proposal_id, challenge_id, startup_id, location, start_date, end_date, budget, objectives, status) VALUES
(
    'f2222222-2222-4222-a222-222222222222',
    'e1111111-1111-4111-a111-111111111111',
    'd1111111-1111-4111-a111-111111111111',
    'c1111111-1111-4111-a111-111111111111',
    'District Civil Hospital, ICU Ward 3 & 4',
    '2026-01-15',
    '2026-07-15',
    95000.00,
    'Monitor 50 ICU ventilators and 10 dialysis machines. Achieve >95% availability, reduce unscheduled downtime by >30%, and predict component failure 48 hours in advance.',
    'Completed'
);

-- 10. SEED PILOT KPIS
INSERT INTO pilot_kpis (id, pilot_id, name, description, target_value, unit, weight) VALUES
('f3333333-3333-4333-a333-333333333331', 'f2222222-2222-4222-a222-222222222222', 'Equipment Availability', 'Percentage of operational uptime across 50 monitored hospital units.', 95.00, '%', 0.40),
('f3333333-3333-4333-a333-333333333332', 'f2222222-2222-4222-a222-222222222222', 'Downtime Reduction', 'Percentage reduction in breakdown hours compared to previous quarter baseline.', 30.00, '%', 0.30),
('f3333333-3333-4333-a333-333333333333', 'f2222222-2222-4222-a222-222222222222', 'Maintenance Prediction Accuracy', 'Accuracy of pre-breakdown alerts generated 48h prior to hardware fault.', 85.00, '%', 0.30);

-- 11. SEED KPI MEASUREMENTS
INSERT INTO kpi_measurements (id, kpi_id, actual_value, measurement_date, notes) VALUES
('f4444444-4444-4444-a444-444444444441', 'f3333333-3333-4333-a333-333333333331', 97.00, '2026-06-30', 'Target 95% exceeded. Equipment availability achieved 97%.'),
('f4444444-4444-4444-a444-444444444442', 'f3333333-3333-4333-a333-333333333332', 35.00, '2026-06-30', 'Target 30% exceeded. Unscheduled downtime reduced by 35%.'),
('f4444444-4444-4444-a444-444444444443', 'f3333333-3333-4333-a333-333333333333', 91.00, '2026-06-30', 'Target 85% exceeded. Prediction accuracy verified at 91%.');

-- 12. SEED VALIDATION (PRIMARY DEMO VALIDATION)
INSERT INTO validations (id, pilot_id, validator, validation_score, result, evidence, remarks, validated_at) VALUES
(
    'f5555555-5555-4555-a555-555555555555',
    'f2222222-2222-4222-a222-222222222222',
    'National Health Innovation Audit Authority',
    91.00,
    'PASSED',
    'Audited telemetry logs from 50 ICU ventilators over 180 days. 14 premature bearing & compressor failures were successfully predicted and prevented. Zero patient care interruptions recorded.',
    'The solution demonstrated outstanding reliability, 91% overall KPI achievement, and cost-payback within 4 months. Recommended for statewide procurement rollout.',
    NOW() - INTERVAL '5 days'
);

-- 13. SEED PROCUREMENT (PRIMARY DEMO PROCUREMENT)
INSERT INTO procurements (id, pilot_id, startup_id, recommended_budget, deployment_scope, status) VALUES
(
    'f6666666-6666-4666-a666-666666666666',
    'f2222222-2222-4222-a222-222222222222',
    'c1111111-1111-4111-a111-111111111111',
    1200000.00,
    'Statewide deployment across 45 District Hospitals (covering 2,500 ICU beds & biomedical equipment units).',
    'Recommended'
);

-- 14. SEED REPORTS
INSERT INTO reports (id, report_type, related_entity_id, content) VALUES
(
    'f7777777-7777-4777-a777-777777777777',
    'Lifecycle Summary',
    'd1111111-1111-4111-a111-111111111111',
    'EXECUTIVE SUMMARY: The Smart Hospital Equipment Predictive Maintenance challenge received 18 startup inquiries and 2 shortlisted proposals. MedTech Predictive Systems was selected for pilot sandbox execution at District Civil Hospital. During the 6-month trial, the pilot achieved an overall 91% KPI achievement score (Equipment Uptime: 97%, Downtime Reduction: 35%). Independent validation passed with zero audit non-conformances. Procurement of ₹1.2 Cr is RECOMMENDED for statewide hospital rollout.'
);

-- 15. SEED NOTIFICATIONS
INSERT INTO notifications (id, user_id, title, message, type) VALUES
('f8888888-8888-4888-a888-888888888888', 'a1111111-1111-4111-a111-111111111111', 'Pilot Validation Passed', 'MedTech Predictive Systems pilot validation has passed with a 91% KPI score.', 'success');

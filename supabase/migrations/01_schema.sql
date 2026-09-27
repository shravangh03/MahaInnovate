-- Supabase Database Schema Migration for GovTech Challenge & Startup Procurement Platform

-- Enable UUID extension
CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. PROFILES TABLE
CREATE TABLE IF NOT EXISTS profiles (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID UNIQUE,
    full_name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    role TEXT NOT NULL CHECK (role IN ('Government Officer', 'Startup', 'Evaluator', 'Admin')),
    organization TEXT,
    avatar_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. DEPARTMENTS TABLE
CREATE TABLE IF NOT EXISTS departments (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    description TEXT,
    contact_email TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 3. CHALLENGES TABLE
CREATE TABLE IF NOT EXISTS challenges (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    department_id UUID REFERENCES departments(id) ON DELETE SET NULL,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    sector TEXT NOT NULL,
    location TEXT NOT NULL,
    budget_min NUMERIC(15, 2) NOT NULL,
    budget_max NUMERIC(15, 2) NOT NULL,
    timeline TEXT NOT NULL,
    expected_outcome TEXT NOT NULL,
    eligibility_criteria TEXT NOT NULL,
    required_technologies TEXT[] NOT NULL DEFAULT '{}',
    status TEXT NOT NULL CHECK (status IN ('Draft', 'Published', 'Under Evaluation', 'Pilot', 'Completed', 'Closed')) DEFAULT 'Published',
    created_by UUID REFERENCES profiles(id) ON DELETE SET NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. CHALLENGE REQUIREMENTS TABLE
CREATE TABLE IF NOT EXISTS challenge_requirements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    challenge_id UUID REFERENCES challenges(id) ON DELETE CASCADE,
    criterion_name TEXT NOT NULL,
    required_value TEXT NOT NULL,
    weight NUMERIC(5, 2) DEFAULT 1.0
);

-- 5. STARTUPS TABLE
CREATE TABLE IF NOT EXISTS startups (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    profile_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT NOT NULL,
    sector TEXT NOT NULL,
    location TEXT NOT NULL,
    founded_year INT NOT NULL,
    team_size INT NOT NULL,
    verification_status TEXT CHECK (verification_status IN ('Verified', 'Pending', 'Unverified')) DEFAULT 'Verified',
    website TEXT,
    logo_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 6. STARTUP TECHNOLOGIES TABLE
CREATE TABLE IF NOT EXISTS startup_technologies (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    startup_id UUID REFERENCES startups(id) ON DELETE CASCADE,
    tech_name TEXT NOT NULL
);

-- 7. PROPOSALS TABLE
CREATE TABLE IF NOT EXISTS proposals (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    challenge_id UUID REFERENCES challenges(id) ON DELETE CASCADE,
    startup_id UUID REFERENCES startups(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    description TEXT NOT NULL,
    technology TEXT NOT NULL,
    implementation_plan TEXT NOT NULL,
    expected_outcomes TEXT NOT NULL,
    estimated_cost NUMERIC(15, 2) NOT NULL,
    timeline TEXT NOT NULL,
    status TEXT NOT NULL CHECK (status IN ('pending_evaluation', 'evaluated', 'selected_for_pilot', 'rejected', 'Submitted', 'Under Review', 'Shortlisted', 'Pilot Selected')) DEFAULT 'pending_evaluation',
    submitted_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 8. EVALUATIONS TABLE
CREATE TABLE IF NOT EXISTS evaluations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    proposal_id UUID REFERENCES proposals(id) ON DELETE CASCADE,
    evaluator_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    overall_score NUMERIC(5, 2) NOT NULL,
    comments TEXT,
    status TEXT DEFAULT 'Completed',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 9. EVALUATION SCORES TABLE
CREATE TABLE IF NOT EXISTS evaluation_scores (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    evaluation_id UUID REFERENCES evaluations(id) ON DELETE CASCADE,
    criterion TEXT NOT NULL,
    score NUMERIC(5, 2) NOT NULL,
    comments TEXT
);

-- 10. PILOTS TABLE
CREATE TABLE IF NOT EXISTS pilots (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    proposal_id UUID REFERENCES proposals(id) ON DELETE CASCADE,
    challenge_id UUID REFERENCES challenges(id) ON DELETE CASCADE,
    startup_id UUID REFERENCES startups(id) ON DELETE CASCADE,
    location TEXT NOT NULL,
    start_date TEXT NOT NULL,
    end_date TEXT NOT NULL,
    budget NUMERIC(15, 2) NOT NULL,
    objectives TEXT NOT NULL,
    status TEXT CHECK (status IN ('Planned', 'Active', 'Completed', 'Failed')) DEFAULT 'Active',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 11. PILOT KPIS TABLE
CREATE TABLE IF NOT EXISTS pilot_kpis (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pilot_id UUID REFERENCES pilots(id) ON DELETE CASCADE,
    name TEXT NOT NULL,
    description TEXT,
    target_value NUMERIC(10, 2) NOT NULL,
    unit TEXT NOT NULL,
    weight NUMERIC(5, 2) DEFAULT 1.0
);

-- 12. KPI MEASUREMENTS TABLE
CREATE TABLE IF NOT EXISTS kpi_measurements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    kpi_id UUID REFERENCES pilot_kpis(id) ON DELETE CASCADE,
    actual_value NUMERIC(10, 2) NOT NULL,
    measurement_date TEXT NOT NULL,
    notes TEXT
);

-- 13. VALIDATIONS TABLE
CREATE TABLE IF NOT EXISTS validations (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pilot_id UUID REFERENCES pilots(id) ON DELETE CASCADE,
    validator TEXT NOT NULL,
    validation_score NUMERIC(5, 2) NOT NULL,
    result TEXT CHECK (result IN ('PASSED', 'FAILED', 'CONDITIONAL')) DEFAULT 'PASSED',
    evidence TEXT NOT NULL,
    remarks TEXT NOT NULL,
    validated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 14. PROCUREMENTS TABLE
CREATE TABLE IF NOT EXISTS procurements (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    pilot_id UUID REFERENCES pilots(id) ON DELETE CASCADE,
    startup_id UUID REFERENCES startups(id) ON DELETE CASCADE,
    recommended_budget NUMERIC(15, 2) NOT NULL,
    deployment_scope TEXT NOT NULL,
    status TEXT CHECK (status IN ('Recommended', 'Under Procurement', 'Approved', 'Scaled')) DEFAULT 'Recommended',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 15. REPORTS TABLE
CREATE TABLE IF NOT EXISTS reports (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    report_type TEXT NOT NULL,
    related_entity_id UUID,
    content TEXT NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 16. NOTIFICATIONS TABLE
CREATE TABLE IF NOT EXISTS notifications (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE CASCADE,
    title TEXT NOT NULL,
    message TEXT NOT NULL,
    type TEXT DEFAULT 'info',
    is_read BOOLEAN DEFAULT FALSE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 17. ACTIVITY LOGS TABLE
CREATE TABLE IF NOT EXISTS activity_logs (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    user_id UUID REFERENCES profiles(id) ON DELETE SET NULL,
    action TEXT NOT NULL,
    entity_type TEXT NOT NULL,
    entity_id UUID,
    metadata JSONB DEFAULT '{}'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- INDEXES FOR PERFORMANCE
CREATE INDEX IF NOT EXISTS idx_challenges_sector ON challenges(sector);
CREATE INDEX IF NOT EXISTS idx_challenges_status ON challenges(status);
CREATE INDEX IF NOT EXISTS idx_startups_sector ON startups(sector);
CREATE INDEX IF NOT EXISTS idx_proposals_challenge ON proposals(challenge_id);
CREATE INDEX IF NOT EXISTS idx_proposals_startup ON proposals(startup_id);
CREATE INDEX IF NOT EXISTS idx_pilots_status ON pilots(status);

-- ENABLE ROW LEVEL SECURITY
ALTER TABLE profiles ENABLE ROW LEVEL SECURITY;
ALTER TABLE challenges ENABLE ROW LEVEL SECURITY;
ALTER TABLE startups ENABLE ROW LEVEL SECURITY;
ALTER TABLE proposals ENABLE ROW LEVEL SECURITY;
ALTER TABLE evaluations ENABLE ROW LEVEL SECURITY;
ALTER TABLE pilots ENABLE ROW LEVEL SECURITY;
ALTER TABLE validations ENABLE ROW LEVEL SECURITY;
ALTER TABLE procurements ENABLE ROW LEVEL SECURITY;

-- PUBLIC / DEMO ACCESS RLS POLICIES (Allows read/write for MVP demo)
CREATE POLICY "Public read profiles" ON profiles FOR SELECT USING (true);
CREATE POLICY "Public read challenges" ON challenges FOR SELECT USING (true);
CREATE POLICY "Public insert challenges" ON challenges FOR INSERT WITH CHECK (true);
CREATE POLICY "Public update challenges" ON challenges FOR UPDATE USING (true);
CREATE POLICY "Public read startups" ON startups FOR SELECT USING (true);
CREATE POLICY "Public read proposals" ON proposals FOR SELECT USING (true);
CREATE POLICY "Public insert proposals" ON proposals FOR INSERT WITH CHECK (true);
CREATE POLICY "Public read evaluations" ON evaluations FOR SELECT USING (true);
CREATE POLICY "Public read pilots" ON pilots FOR SELECT USING (true);
CREATE POLICY "Public read validations" ON validations FOR SELECT USING (true);
CREATE POLICY "Public read procurements" ON procurements FOR SELECT USING (true);

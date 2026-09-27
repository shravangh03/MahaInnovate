# GovTech Challenge & Startup Procurement Platform (SIH Stage-1 Prototype)

A modern, clickable MVP platform demonstrating the complete lifecycle of public sector technology innovation procurement:

**Government Challenge → AI-Assisted Challenge Analysis → Startup Marketplace & Matching → Eligibility Screening → Proposal Submission → 7-Criteria Proposal Evaluation → Pilot Sandbox Trial → Real-time KPI Telemetry → Independent Validation Audit → Scale-Up Procurement Recommendation**.

---

## Tech Stack Overview

- **Frontend**: Next.js 14 (App Router, TypeScript, Tailwind CSS, Lucide React, Recharts).
- **Backend**: Node.js + Express.js API (TypeScript REST controllers).
- **Database**: Supabase PostgreSQL database schema with 17 relational tables, indexes, triggers, and Row Level Security (RLS) policies.
- **AI Engine**: Extensible AI service abstraction (`aiService.ts`) with deterministic logic for out-of-the-box offline presentation execution.

---

## 2–5 Minute Primary Demonstration Scenario

**Scenario**: *"Smart Hospital Equipment Predictive Maintenance"*

1. **Login as Government Officer** (or toggle role using top Navbar dropdown).
2. Open **"Smart Hospital Equipment Predictive Maintenance"** challenge.
3. Click **"AI Analyze Challenge"** -> view generated IoT/AI tech requirements & suggested KPIs.
4. Click **"Find Matching Startups"** -> inspect **MedTech Predictive Systems (92% Match Score)**.
5. Click **"Check Eligibility"** -> view green **ELIGIBLE** badge checklist.
6. Open Proposal -> review 7-criteria transparent score breakdown (**88% Overall Score**).
7. Click **"Select for Pilot Sandbox"** -> open **Pilot Dashboard**.
8. View **Real-Time KPI Monitoring Charts** (Recharts) showing **91% KPI Achievement**.
9. Click **"View Validation"** -> display **PASSED** audit certificate.
10. Open **Procurement Board** -> display **RECOMMENDED FOR SCALE-UP** ($1.2M budget).
11. Click **"Generate NLP Summary Report"** -> export executive presentation summary.

---

## Installation & Setup

### 1. Backend Setup
```bash
cd backend
npm install
npm run dev
```
Backend API will run on `http://localhost:5000/api`.

### 2. Frontend Setup
```bash
cd frontend
npm install
npm run dev
```
Frontend Web Application will run on `http://localhost:3000`.

### 3. Database Schema & Seeding
Database schema migrations and seed scripts are located in:
- `/supabase/migrations/01_schema.sql`
- `/supabase/seed.sql`

To execute on a live Supabase instance, copy and run the SQL commands into your Supabase SQL Editor.

---

## Project Structure

```
/MahaInnovate
├── /frontend               # Next.js 14 App Router application
│   ├── /src/app            # Next.js App Router pages (all 14 modules)
│   ├── /src/components     # Enterprise UI primitives & Navbar/Sidebar
│   ├── /src/context        # AuthContext with 1-click Role Switcher
│   ├── /src/lib            # API client with offline fallback resilience
│   └── /src/types          # Shared TypeScript interfaces
├── /backend                # Express.js + TypeScript REST server
│   ├── /src/controllers    # REST API Controllers
│   ├── /src/services       # AI Service abstraction & Mock data store
│   ├── /src/routes         # API Route definitions
│   └── /src/types          # Domain TypeScript models
├── /supabase               # Database migrations & SQL seed data
│   ├── /migrations/01_schema.sql
│   └── seed.sql
├── README.md               # Quickstart & Demo Guide
├── ARCHITECTURE.md         # System Architecture & Lifecycle Diagram
└── DATABASE.md             # ERD & Schema Reference
```

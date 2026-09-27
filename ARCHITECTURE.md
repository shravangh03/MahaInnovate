# System Architecture & Lifecycle Design

## 1. High-Level System Architecture

```
┌─────────────────────────────────────────────────────────────────┐
│                      Next.js 14 Frontend                        │
│   (TypeScript, Tailwind CSS, Lucide React, Recharts, Components)│
└────────────────────────────────┬────────────────────────────────┘
                                 │ REST API Calls / Client Fetch
┌────────────────────────────────▼────────────────────────────────┐
│                   Node.js + Express API Backend                 │
│    (TypeScript Controllers, AI Service Mocking, Seed Drivers)   │
└────────────────────────────────┬────────────────────────────────┘
                                 │ Supabase Client / SQL Queries
┌────────────────────────────────▼────────────────────────────────┐
│               Supabase Backend & PostgreSQL DB                  │
│    (Auth, PostgreSQL Tables, RLS Policies, Database Triggers)   │
└─────────────────────────────────────────────────────────────────┘
```

---

## 2. 7-Stage Innovation Procurement Lifecycle Data Flow

1. **Government Challenge**: Posted by Government Officer with sector, budget, and timeline.
2. **AI Challenge Assistant**: Raw problem statement parsed by `aiService.ts` into structured categories, required tech, and KPIs.
3. **Startup Discovery & Matching**: `aiService.matchStartups` computes similarity scores (MedTech 92% match).
4. **Eligibility & Proposal Submission**: Startup verified against DPIIT standards; proposal submitted.
5. **7-Criteria Evaluation**: Evaluator reviews proposal across 7 criteria generating an 88% overall score.
6. **Sandbox Pilot & Real-time KPIs**: 6-month trial streams telemetry data showing 91% overall KPI achievement.
7. **Validation & Procurement Scale-Up**: Audit passed -> recommended for statewide procurement ($1.2M budget).

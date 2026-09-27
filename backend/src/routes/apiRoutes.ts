import { Router } from 'express';
import {
  getProfiles,
  getChallenges,
  getChallengeById,
  createChallenge,
  analyzeChallengeAI,
  getChallengeMatches,
  getStartups,
  getStartupById,
  getProposals,
  getProposalById,
  createProposal,
  updateProposalStatus,
  getEvaluations,
  createEvaluation,
  getPilots,
  getPilotById,
  createPilot,
  getValidations,
  createValidation,
  getProcurements,
  createProcurement,
  generateReportAI,
  getAdminMetrics
} from '../controllers/apiControllers';

const router = Router();

// Auth / Profiles
router.get('/auth/profiles', getProfiles);

// Challenges
router.get('/challenges', getChallenges);
router.get('/challenges/:id', getChallengeById);
router.post('/challenges', createChallenge);
router.get('/challenges/:id/matches', getChallengeMatches);

// AI Assistant
router.post('/ai/analyze-challenge', analyzeChallengeAI);

// Startups Marketplace
router.get('/startups', getStartups);
router.get('/startups/:id', getStartupById);

// Proposals
router.get('/proposals', getProposals);
router.get('/proposals/:id', getProposalById);
router.post('/proposals', createProposal);
router.patch('/proposals/:id/status', updateProposalStatus);

// Evaluations
router.get('/evaluations', getEvaluations);
router.post('/evaluations', createEvaluation);

// Pilots & KPIs
router.get('/pilots', getPilots);
router.get('/pilots/:id', getPilotById);
router.post('/pilots', createPilot);

// Validations
router.get('/validations', getValidations);
router.post('/validations', createValidation);

// Procurements
router.get('/procurements', getProcurements);
router.post('/procurements', createProcurement);

// NLP Reports
router.post('/reports/generate', generateReportAI);

// Admin Analytics
router.get('/admin/metrics', getAdminMetrics);

export default router;

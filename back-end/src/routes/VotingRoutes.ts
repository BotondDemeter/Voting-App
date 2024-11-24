// routes/VotingRoutes.ts

import express from 'express';
import VotingController from '../controllers/VotingController';

const app = express.Router();
const votingController = new VotingController();

app.post('/create', (req, res) => votingController.createNewVoting(req, res));

app.get('/active', (req, res) => votingController.getActiveVotings(req, res));

app.patch('/inactive/:id', (req, res) => votingController.setVotingInactive(req, res));

app.post('/vote/:votingId/:candidateId', (req, res) => votingController.voteForCandidate(req, res));

app.get('/history/:userId', (req, res) => votingController.getUsersVotingHistory(req, res));

export default app;
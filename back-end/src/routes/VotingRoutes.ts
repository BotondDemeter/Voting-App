// routes/VotingRoutes.ts

import express from 'express';
import VotingController from '../controllers/VotingController';

const app = express.Router();
const votingController = new VotingController();

// Route to create a new voting
app.post('/create', (req, res) => votingController.createNewVoting(req, res));

// Route to get all active votings
app.get('/active', (req, res) => votingController.getActiveVotings(req, res));

// Route to set a voting to inactive
app.patch('/inactive/:id', (req, res) => votingController.setVotingInactive(req, res));

export default app;

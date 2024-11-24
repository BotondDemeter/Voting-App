// ./controllers/VotingController 
import { Request, Response } from 'express';
import VotingService from '../services/VotingService';
import { IVoting } from '../models/VotingInterfaces';

const votingService = new VotingService();

class VotingController {
    public async createNewVoting(req: Request, res: Response): Promise<void> {
        try {
            const votingData: IVoting = req.body;
            const newVoting = await votingService.createNewVoting(votingData);
            res.status(201).json({ message: 'Voting created successfully', data: newVoting });
        } catch (error: any) {
            res.status(500).json({ message: 'Failed to create voting', error: error.message });
        }
    }

    public async getActiveVotings(req: Request, res: Response): Promise<void> {
        try {
            const activeVotings = await votingService.getActiveVotings();
            res.status(200).json({ data: activeVotings });
        } catch (error: any) {
            res.status(500).json({ message: 'Failed to retrieve active votings', error: error.message });
        }
    }

    public async setVotingInactive(req: Request, res: Response): Promise<void> {
        try {
            const { id } = req.params;
            const updatedVoting = await votingService.setVotingInactive(id);
            if (updatedVoting) {
                res.status(200).json({ message: 'Voting set to inactive', data: updatedVoting });
            } else {
                res.status(404).json({ message: 'Voting not found' });
            }
        } catch (error: any) {
            res.status(500).json({ message: 'Failed to set voting inactive', error: error.message });
        }
    }

    public async voteForCandidate(req: Request, res: Response): Promise<void> {
        try {
            const { votingId, candidateId } = req.params;
            const { userId } = req.body; // Assuming userId is sent in the request body

            const updatedVoting = await votingService.voteForCandidate(userId, votingId, candidateId);
            if (updatedVoting) {
                res.status(200).json({ message: 'Vote registered successfully', data: updatedVoting });
            } else {
                res.status(404).json({ message: 'Voting or candidate not found' });
            }
        } catch (error: any) {
            res.status(500).json({ message: 'Failed to register vote', error: error.message });
        }
    }

    public async getUsersVotingHistory(req: Request, res: Response): Promise<void> {
        try {
            const { userId } = req.params;

            const userVotingHistory = await votingService.getUsersVotingHistory(userId);
            res.status(200).json({ data: userVotingHistory });
        } catch (error: any) {
            res.status(500).json({ message: 'Failed to retrieve user voting history', error: error.message });
        }
    }
}

export default VotingController;
// services/VotingService.ts

import VotingModel from '../models/Voting';
import { IVoting } from '../models/VotingInterfaces';

class VotingService {
    // Method to create a new voting
    public async createNewVoting(votingData: IVoting): Promise<IVoting> {
        const voting = new VotingModel(votingData);
        return await voting.save();
    }

    // Method to get all active votings
    public async getActiveVotings(): Promise<IVoting[]> {
        return await VotingModel.find({ isActive: true });
    }

    // Method to set a voting to inactive
    public async setVotingInactive(votingId: string): Promise<IVoting | null> {
        return await VotingModel.findByIdAndUpdate(votingId, { isActive: false }, { new: true });
    }
}

export default VotingService;

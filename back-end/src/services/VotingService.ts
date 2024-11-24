// services/VotingService.ts

import VotingModel from '../models/Voting';
import { IVoting } from '../models/VotingInterfaces';

class VotingService {
    public async createNewVoting(votingData: IVoting): Promise<IVoting | null> {
        try {
            const voting = new VotingModel(votingData);
            return await voting.save();
        } catch (error) {
            console.error('Error creating new voting:', error);
            throw new Error('Failed to create a new voting.');
        }
    }

    public async getActiveVotings(): Promise<IVoting[]> {
        try {
            return await VotingModel.find({ isActive: true });
        } catch (error) {
            console.error('Error fetching active votings:', error);
            throw new Error('Failed to fetch active votings.');
        }
    }

    public async setVotingInactive(votingId: string): Promise<IVoting | null> {
        try {
            return await VotingModel.findByIdAndUpdate(
                votingId,
                { isActive: false },
                { new: true }
            );
        } catch (error) {
            console.error('Error setting voting to inactive:', error);
            throw new Error('Failed to set voting to inactive.');
        }
    }

    public async voteForCandidate(
        userId: string,
        votingId: string,
        candidateId: string
    ): Promise<IVoting | null> {
        try {
            const voting = await VotingModel.findById(votingId);

            if (!voting) {
                throw new Error('Voting not found.');
            }

            if (voting.voters.includes(userId)) {
                throw new Error('User has already voted in this voting.');
            }

            const updatedVoting = await VotingModel.findOneAndUpdate(
                { _id: votingId, 'candidates._id': candidateId },
                {
                    $inc: { 'candidates.$.votes': 1, totalVotes: 1 },
                    $addToSet: { voters: userId }, // Add userId to the voters array
                },
                { new: true }
            );

            if (!updatedVoting) {
                throw new Error('Candidate not found.');
            }

            return updatedVoting;
        } catch (error) {
            console.error('Error voting for candidate:', error);
            throw new Error('Failed to vote for the candidate.');
        }
    }

    public async getUsersVotingHistory(userId: string): Promise<IVoting[]> {
        try {
            return await VotingModel.find({ voters: userId });
        } catch (error) {
            console.error('Error fetching user voting history:', error);
            throw new Error('Failed to fetch user voting history.');
        }
    }
}

export default VotingService;
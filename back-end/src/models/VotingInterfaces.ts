// models/VotingInterfaces.ts

import { Document } from 'mongoose';

export interface ICandidate {
    name: string;
    description?: string;
    party?: string | null;
    votes: number;
}

export interface IVoting extends Document {
    name: string;
    description?: string;
    isActive: boolean;
    region: 'City' | 'Country';
    regionName: string;
    candidates: ICandidate[];
    totalVotes: number;
    startDate: Date;
    endDate: Date;
    createdAt: Date;
}

// models/VotingInterfaces.ts

import { Document, Types } from 'mongoose';

export interface ICandidate {
    _id?: Types.ObjectId; 
    name: string;
    description?: string;
    party?: string | null;
    votes: number;
}

export interface IVoting extends Document {
    _id: string;
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
    voters: string[];
}

// models/Voting.ts

import mongoose, { Schema, Model } from 'mongoose';
import { IVoting, ICandidate } from './VotingInterfaces';

// Candidate Schema
const CandidateSchema = new Schema<ICandidate>(
    {
        _id: { type: Schema.Types.ObjectId, default: () => new mongoose.Types.ObjectId() },
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        party: {
            type: String,
            required: false,
            default: null,
        },
        votes: {
            type: Number,
            default: 0,
        },
    },
    { _id: false } 
);

// Voting Schema
const VotingSchema = new Schema<IVoting>(
    {
        name: {
            type: String,
            required: true,
        },
        description: {
            type: String,
            required: false,
        },
        isActive: {
            type: Boolean,
            default: true,
        },
        region: {
            type: String,
            required: true,
            enum: ['City', 'Country'], 
        },
        regionName: {
            type: String,
            required: true,
        },
        candidates: {
            type: [CandidateSchema],
            required: true,
        },
        totalVotes: {
            type: Number,
            default: 0,
        },
        startDate: {
            type: Date,
            required: true,
        },
        endDate: {
            type: Date,
            required: true,
        },
        createdAt: {
            type: Date,
            default: Date.now,
        },
        voters: { type: [String], default: [] },
    },
    { collection: 'voting' } 
);

const VotingModel: Model<IVoting> = mongoose.model<IVoting>('Voting', VotingSchema);
export default VotingModel;

import mongoose, { Schema, Model } from 'mongoose';

export interface ICounty extends mongoose.Document {
    _id: string;
    name: string;
}

const CountySchema = new mongoose.Schema<ICounty>({
    name: { type: String, required: true },
},
{collection : 'county'}

);

export const County: Model<ICounty> = mongoose.model<ICounty>('County', CountySchema);
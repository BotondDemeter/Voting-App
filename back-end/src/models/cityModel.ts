import mongoose, { Schema, Model } from 'mongoose';

export interface ICity extends mongoose.Document{
    _id: string,
    name: string
}

const CitySchema = new mongoose.Schema<ICity>({
    name: { type: String, required: true },
},
{collection : 'city'}

);

export const City: Model<ICity> = mongoose.model<ICity>('City', CitySchema);    
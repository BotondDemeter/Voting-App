import { City } from "../models/cityModel";
import { ICity } from "../models/cityModel";

export class CityService {
    public async getAllCities(): Promise<ICity[]> {
        try {
            return await City.find();
        } catch (error) {
            console.error('Error fetching cities:', error);
            throw new Error('Failed to fetch cities.');
        }
    }

    public async insertCity(city: ICity): Promise<ICity> {
        try {

            const existingCity = await City.findOne({ name: city.name });

            if (existingCity) {
                throw new Error('City with this name already exists.');
            }

            return await City.create(city);
        } catch (error) {
            console.error('Error inserting city:', error);
            throw new Error('Failed to insert city.');
        }
    }

}
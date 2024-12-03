
import { County } from "../models/countyModel";
import { ICounty } from "../models/countyModel";

export class CountyService {

    public async getAllCounties(): Promise<ICounty[]> {
        try {
            return await County.find();
        } catch (error) {
            console.error('Error fetching counties:', error);
            throw new Error('Failed to fetch counties.');
        }
    }
    

    public async insertCounty(county: ICounty): Promise<ICounty> {
        try {

            const existingCounty = await County.findOne({ name: county.name });

            if (existingCounty) {
                throw new Error('County with this name already exists.');
            }

            return await County.create(county);
        } catch (error) {
            console.error('Error inserting county:', error);
            throw new Error('Failed to insert county.');
        }
    }
}

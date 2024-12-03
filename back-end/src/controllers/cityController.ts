import { Request, Response, NextFunction } from 'express';
import { City } from '../models/cityModel';
import { CityService} from '../services/cityServices';

const cityService = new CityService();

class CityController {
    async getAllCities(req: Request, res: Response, next: NextFunction) {
        try {
            const cities = await cityService.getAllCities();
            res.json(cities);
        } catch (error) {
            console.error('Error fetching cities:', error);
            next(error);
        }
    }

    async insertCity(req: Request, res: Response, next: NextFunction) {
        try {
            const city = req.body;
            const insertedCity = await cityService.insertCity(city);
            res.json(insertedCity);
        } catch (error) {
            console.error('Error inserting city:', error);
            next(error);
        }
    }
}   

export const cityController = new CityController();
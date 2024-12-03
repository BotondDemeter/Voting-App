import { Request, Response, NextFunction } from 'express';
import { County } from '../models/countyModel';
import { CountyService} from '../services/countyService';

const countyService = new CountyService();

class CountyController {
    async getAllCounties(req: Request, res: Response, next: NextFunction) {
        try {
            const counties = await countyService.getAllCounties();
            res.json(counties);
        } catch (error) {
            console.error('Error fetching counties:', error);
            next(error);
        }
    }

    async insertCounty(req: Request, res: Response, next: NextFunction) {
        try {
            const county = req.body;
            const insertedCounty = await countyService.insertCounty(county);
            res.json(insertedCounty);
        } catch (error) {
            console.error('Error inserting county:', error);
            next(error);
        }
    }

}

export const countyController = new CountyController();
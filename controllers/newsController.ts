import { Request, Response } from 'express';
import { NewsService } from '../services/newServices';
const newsService = new NewsService();


export const fetchAndStoreNews = async (req: Request, res: Response): Promise<void> => {

    try {
        const { sources } = req.body;
        const articles = await newsService.fetchAndStoreNewsBySource(sources);
         res.status(200).json(articles);
    } catch (error) {
        if (error instanceof Error && error.message === 'No valid news sources provided.') {
            res.status(400).json({ error: error.message });
        } else {
            res.status(500).json({ error: 'Failed to fetch and store news' });
        }
    }
};

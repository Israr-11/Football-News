import { Request, Response } from 'express';
import { NewsService } from '../services/newServices';

export class NewsController {
    private newsService: NewsService;

    constructor() {
        this.newsService = new NewsService();
    }

    async getAllNews(req: Request, res: Response): Promise<void> {
        try {
            const articles = await this.newsService.fetchAllNews();
            res.status(200).json(articles);
        } catch (error) {
            res.status(500).json({ error: 'Failed to fetch news' });
        }
    }

    async getNewsBySource(req: Request, res: Response): Promise<void> {
        try {
            const sourceId = req.params.informationId;
            const articles = await this.newsService.fetchNewsBySource(sourceId);
            res.status(200).json(articles);
        } catch (error) {
            if (error instanceof Error && error.message === 'News source not found') {
                res.status(404).json({ error: error.message });
            } else {
                res.status(500).json({ error: 'Failed to fetch news' });
            }
        }
    }
}

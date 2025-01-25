import { Router } from 'express';
import { NewsController } from '../controllers/newsController';

const router = Router();
const newsController = new NewsController();

router.get('/news', (req, res) => newsController.getAllNews(req, res));
router.get('/news/:informationId', (req, res) => newsController.getNewsBySource(req, res));

export default router;

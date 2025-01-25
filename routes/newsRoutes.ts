import { Router } from 'express';
import {fetchAndStoreNews} from '../controllers/newsController';

const router = Router();

router.post('/news', (req, res) => fetchAndStoreNews(req, res));
// router.get('/news', (req, res) => newsController.getAllNews(req, res));
// router.get('/news/:informationId', (req, res) => newsController.getNewsBySource(req, res));

export default router;

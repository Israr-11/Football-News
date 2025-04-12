import { Router } from 'express';
import {fetchAndStoreNews} from '../controllers/newsController';

const router = Router();
//Router for the news
router.post('/news', (req, res) => fetchAndStoreNews(req, res));

export default router;

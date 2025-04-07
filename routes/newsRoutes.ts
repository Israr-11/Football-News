import { Router } from 'express';
import {fetchAndStoreNews} from '../controllers/newsController';

const router = Router();

router.post('/news', (req, res) => fetchAndStoreNews(req, res));

export default router;

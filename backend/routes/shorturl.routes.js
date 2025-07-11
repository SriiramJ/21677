import express from 'express';
import {
  createShortUrl,
  getShortUrlStats,
  redirectToOriginalUrl
} from '../controllers/shorturl.controller.js';

const router = express.Router();

router.post('/', createShortUrl);
router.get('/stats', getShortUrlStats);
router.get('/:code', redirectToOriginalUrl);

export default router;

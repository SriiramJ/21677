import ShortUrl from '../models/shorturl.model.js';
import  {log}  from 'logging-middleware';
import { isValidUrl } from '../utils/validateUrl.js';
import { nanoid } from 'nanoid';

export const createShortUrl = async (req, res) => {
  try {
    const { url, validity = 30, shortcode } = req.body;

    if (!isValidUrl(url)) {
      log('backend', 'error', 'handler', 'Invalid URL format');
      return res.status(400).json({ error: 'Invalid URL' });
    }

    let shortCode = shortcode || nanoid(5);

    const exists = await ShortUrl.findOne({ shortCode });
    if (exists) {
      log('backend', 'error', 'handler', 'Shortcode collision');
      return res.status(409).json({ error: 'Shortcode already in use' });
    }

    const expiry = new Date(Date.now() + validity * 60 * 1000);

    const newEntry = await ShortUrl.create({
      originalUrl: url,
      shortCode,
      expiry
    });

    log('backend', 'info', 'controller', `Shortened URL created: ${shortCode}`);
    res.status(201).json({
      shortLink: `${process.env.BASE_URL}/${shortCode}`,
      expiry: expiry.toISOString()
    });
  } catch (err) {
    log('backend', 'fatal', 'controller', `Create failed: ${err.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const getShortUrlStats = async (req, res) => {
  try {
    const urls = await ShortUrl.find({});
    const stats = urls.map(u => ({
      shortUrl: `${process.env.BASE_URL}/${u.shortCode}`,
      createdAt: u.createdAt,
      expiry: u.expiry,
      clicks: u.clickCount
    }));
    log('backend', 'info', 'controller', 'Statistics retrieved');
    res.status(200).json(stats);
  } catch (err) {
    log('backend', 'fatal', 'controller', `Stats fetch failed: ${err.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

export const redirectToOriginalUrl = async (req, res) => {
  try {
    const { code } = req.params;
    const entry = await ShortUrl.findOne({ shortCode: code });

    if (!entry) {
      log('backend', 'warn', 'handler', 'Shortcode not found');
      return res.status(404).json({ error: 'Shortcode not found' });
    }

    if (new Date() > entry.expiry) {
      log('backend', 'warn', 'handler', 'Shortcode expired');
      return res.status(410).json({ error: 'Short URL expired' });
    }

    entry.clickCount++;
    await entry.save();

    log('backend', 'info', 'controller', `Redirected: ${code}`);
    res.redirect(entry.originalUrl);
  } catch (err) {
    log('backend', 'fatal', 'controller', `Redirect error: ${err.message}`);
    res.status(500).json({ error: 'Internal Server Error' });
  }
};

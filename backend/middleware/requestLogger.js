import { log } from 'logging-middleware';

export const requestLogger = (req, res, next) => {
  log('backend', 'debug', 'middleware', `Incoming ${req.method} request to ${req.originalUrl}`);
  next();
};

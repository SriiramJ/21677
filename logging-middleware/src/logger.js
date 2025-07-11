// src/logger.js
import axios from 'axios';
import { AUTH_TOKEN } from './config.js';

/**
 * @param {'frontend'|'backend'} stack - Frontend or Backend
 * @param {'debug'|'info'|'warn'|'error'|'fatal'} level - Log level
 * @param {string} pkg
 * @param {string} message
 */
export async function log(stack, level, pkg, message) {
  const validStacks = ['frontend', 'backend'];
  const validLevels = ['debug', 'info', 'warn', 'error', 'fatal'];
  const backendPkgs = ['cache', 'controller', 'cron_job', 'db', 'domain', 'handler', 'repository', 'route', 'service'];
  const frontendPkgs = ['api', 'component', 'hook', 'page', 'state', 'style'];
  const sharedPkgs = ['auth', 'config', 'middleware', 'utils'];

  const allowedPkgs = stack === 'backend'
    ? [...backendPkgs, ...sharedPkgs]
    : [...frontendPkgs, ...sharedPkgs];

  if (!validStacks.includes(stack)) {
    return console.warn(`Invalid stack "${stack}"`);
  }
  if (!validLevels.includes(level)) {
    return console.warn(`Invalid level "${level}"`);
  }
  if (!allowedPkgs.includes(pkg)) {
    return console.warn(`Invalid package "${pkg}" for stack "${stack}"`);
  }

  const payload = {
    stack,
    level,
    package: pkg,
    message
  };

  try {
    const res = await axios.post('http://20.244.56.144/evaluation-service/logs', payload, {
      headers: {
        Authorization: AUTH_TOKEN
      }
    });
    if (res.status === 200) {
      console.log('Log created:', res.data.logID);
    } else {
      console.warn('Logging failed with status:', res.status);
    }
  } catch (err) {
    console.error('Logging error:', err.response?.data || err.message);
  }
}

import axios from 'axios';
import { log } from 'logging-middleware';

const baseURL = import.meta.env.VITE_API_BASE_URL;

export const createShortUrls = async (payloads) => {
  try {
    const promises = payloads.map(data => axios.post(baseURL, data));
    const res = await Promise.all(promises);
    log("frontend", "info", "api", "Short URLs created successfully");
    return res.map(r => r.data);
  } catch (err) {
    log("frontend", "error", "api", `API call failed: ${err.message}`);
    throw err;
  }
};

export const fetchStats = async () => {
  try {
    const res = await axios.get(`${baseURL}/stats`);
    log("frontend", "info", "api", "Fetched statistics");
    return res.data;
  } catch (err) {
    log("frontend", "error", "api", `Failed to fetch stats: ${err.message}`);
    throw err;
  }
};

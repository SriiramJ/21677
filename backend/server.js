import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import bodyParser from 'body-parser';
import connectDB from './config/db.js';
import urlRoutes from './routes/shorturl.routes.js';
import { errorHandler } from './middleware/errorHandler.js';
import { requestLogger } from './middleware/requestLogger.js';

dotenv.config();
connectDB();

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(requestLogger);  // Logs all incoming requests

app.use('/shorturls', urlRoutes);

app.use(errorHandler);  // Handles uncaught errors

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

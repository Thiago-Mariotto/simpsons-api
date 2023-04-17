import express from 'express';
import errorHandler from './middlewares/ErrorHandler';
import { characterRoute } from './routes';

const app = express();
app.use(express.json());
app.get('/health', (_req, res) => res.status(200).end());
app.use('/characters', characterRoute);
app.use(errorHandler);

export default app;
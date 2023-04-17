import express from 'express';
import errorHandler from './middlewares/ErrorHandler';
import { castCharacterRouter, castRouter, characterRouter } from './routes';

const app = express();
app.use(express.json());
app.get('/health', (_req, res) => res.status(200).end());
app.use('/characters', characterRouter);
app.use('/casts', castRouter);
app.use('/castCharacters', castCharacterRouter);
app.use(errorHandler);

export default app;
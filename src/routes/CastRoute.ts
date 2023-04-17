// src/routes/cast.ts
import { Router } from 'express';
import { create, find, list } from '../controllers/Cast';
const castRouter = Router();
castRouter.get('/', list);
castRouter.get('/:id', find);
castRouter.post('/', create);
export default castRouter;
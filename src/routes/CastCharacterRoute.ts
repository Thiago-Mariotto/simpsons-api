// src/routes/castCharacter.ts
import { Router } from 'express';
import { create, find, list } from '../controllers/CastCharacter';
const castCharacterRouter = Router();
castCharacterRouter.get('/', list);
castCharacterRouter.get('/search', find);
castCharacterRouter.post('/', create);
export default castCharacterRouter;
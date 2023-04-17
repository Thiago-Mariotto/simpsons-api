import express from 'express';
import { create, find, list } from '../controllers/Character';
const characterRoute = express.Router();

characterRoute.post('/', create);
characterRoute.get('/', list);
characterRoute.get('/:id', find);

export default characterRoute;
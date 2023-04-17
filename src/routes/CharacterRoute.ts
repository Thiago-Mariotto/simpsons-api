import express from 'express';
import { create } from '../controllers/Character';
const characterRoute = express.Router();

characterRoute.post('/', create);

export default characterRoute;
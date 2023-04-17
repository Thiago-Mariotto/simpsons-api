import { NextFunction, Request, Response } from 'express';
import BadRequest from '../errors/BadRequest';
import NotFound from '../errors/NotFound';
import CastInterface from '../interfaces/ICast';
import { CastService } from '../services/Cast';

export async function create(req: Request, res: Response, next: NextFunction) {
  const { name } = req.body as CastInterface;
  const castService = new CastService();
  try {
    if (name === undefined) {
      throw new BadRequest('Você precisa enviar o nome da pessoa atriz');
    }
    await castService.create({ name });
    res.status(201).send();
  } catch (err) {
    next(err);
  }
}

export async function find(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const castService = new CastService();
  try {
    if (id === undefined) throw new BadRequest('Você precisa enviar o id da pesquisa');
    const obj = await castService.find(parseInt(id, 10));
    if (!obj) throw new NotFound('Pessoa atriz não encontrada');
    return res.status(200).json(obj);
  } catch (err) {
    next(err);
  }
}

export async function list(_req: Request, res: Response, next: NextFunction) {
  const castService = new CastService();
  try {
    const castList = await castService.list();
    return res.json(castList);
  } catch (err) {
    next(err);
  }
}
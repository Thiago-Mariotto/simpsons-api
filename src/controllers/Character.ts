/* eslint-disable no-console */
import { NextFunction, Request, Response } from 'express';
import BadRequest from '../errors/BadRequest';
import NotFound from '../errors/NotFound';
import CharacterService from '../services/Character';


export async function create(req: Request, res: Response, next: NextFunction) {
  const { name } = req.body;
  const characterService = new CharacterService();

  try {
    if (!name) throw new BadRequest('Name é requerido');
    await characterService.create({ name });
    return res.status(201).send('Created');
  } catch (err) {
    next(err);
  }
}

export async function find(req: Request, res: Response, next: NextFunction) {
  const { id } = req.params;
  const characterService = new CharacterService();
  try {
    if (id === undefined) throw new BadRequest('Você precisa enviar o id da pesquisa');
    const obj = await characterService.find(parseInt(id, 10));
    if (!obj) throw new NotFound('Pessoa não encontrada');
    return res.status(200).json(obj);
  } catch (err) {
    next(err);
  }
}

export async function list(_req: Request, res: Response, next: NextFunction) {
  const characterService = new CharacterService();
  try {
    const characterList = await characterService.list();
    return res.json(characterList);
  } catch (err) {
    next(err);
  }
}
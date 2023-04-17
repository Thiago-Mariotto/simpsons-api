/* eslint-disable no-console */
import { NextFunction, Request, Response } from 'express';
import BadRequest from '../errors/BadRequest';
import CharacterService from '../services/Character';


export async function create(req: Request, res: Response, next: NextFunction) {
  const { name } = req.body;
  const characterService = new CharacterService();

  try {
    if (!name) throw new BadRequest('Name é requerido');
    await characterService.create({ name });
    return res.status(201).send('Created');
  } catch (err) {
    console.log('Erro ao cadastrar character', err);
    next(err);
  }
}
import { NextFunction, Request, Response } from 'express';
import BadRequest from '../errors/BadRequest';
import CastCharacterInterface from '../interfaces/ICastCharacter';
import { CastCharacterService } from '../services/CastCharacter';

export async function create(req: Request, res: Response, next: NextFunction) {
  const { castId, characterId } = req.body as CastCharacterInterface;
  const castCharacterService = new CastCharacterService();
  try {
    if (castId === undefined || characterId === undefined) {
      throw new BadRequest('Você precisa enviar o castId e characterId');
    }
    await castCharacterService.create({ castId, characterId });
    res.status(201).send();
  } catch (err) {
    next(err);
  }
}

export async function find(req: Request, res: Response, next: NextFunction) {
  const castCharacterService = new CastCharacterService();
  try {
    const { castId, characterId } = req.query;
    if (castId) {
      const cast = await castCharacterService.findByCast(parseInt(castId as string, 10));
      return res.status(200).json(cast);
    }
    if (characterId) {
      const character = await castCharacterService
        .findByCharacter(parseInt(characterId as string, 10));
      return res.status(200).json(character);
    }
  } catch (err) {
    next(err);
  }
}

export async function list(_req: Request, res: Response, next: NextFunction) {
  const castCharacterService = new CastCharacterService();
  try {
    const castCharacterList = await castCharacterService.list();
    return res.json(castCharacterList);
  } catch (err) {
    next(err);
  }
}
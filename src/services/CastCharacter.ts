import BadRequest from '../errors/BadRequest';
import CastCharacter from '../interfaces/ICastCharacter';
import CastCharacterModel from '../models/CastCharacter';
import { ComplexModel } from '../models/IModel';
import Service from './Service';

export class CastCharacterService extends Service<CastCharacter> {
  constructor(model: ComplexModel<CastCharacter> = new CastCharacterModel()) {
    super(model);
  }

  async create(obj: CastCharacter): Promise<void> {
    if (!obj.castId && !obj.characterId) {
      throw new BadRequest('Obrigatorio passar castId e characterId');
    }
    return super.create(obj);
  }

  async findByCast(id: number): Promise<CastCharacter | null> {
    return (this.model as ComplexModel<CastCharacter>).findByCast(id)
  }

  async findByCharacter(id: number): Promise<CastCharacter | null> {
    return (this.model as ComplexModel<CastCharacter>).findByCharacter(id)
  }
}
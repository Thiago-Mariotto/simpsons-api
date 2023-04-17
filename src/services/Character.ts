import BadRequest from '../errors/BadRequest';
import ICharacter from '../interfaces/ICharacter';
import CharacterModel from '../models/Character';
import { SimpleModel } from '../models/IModel';
import Service from './Service';

export default class CharacterService extends Service<ICharacter> {
  private MIN_LENGTH = 3;
  constructor(model: SimpleModel<ICharacter> = new CharacterModel()) {
    super(model);
  }

  async create(data: ICharacter): Promise<void> {
    if (data.name.length < this.MIN_LENGTH)
      throw new BadRequest('O nome do character precisa ter no minimo 3 caracteres');
    super.create(data);
  }
}
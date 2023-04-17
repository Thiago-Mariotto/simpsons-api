import BadRequest from '../errors/BadRequest';
import Cast from '../interfaces/ICast';
import CastModel from '../models/Cast';
import { SimpleModel } from '../models/IModel';
import Service from './Service';

export class CastService extends Service<Cast> {
  private MIN_LENGTH = 3;
  constructor(model: SimpleModel<Cast> = new CastModel()) {
    super(model);
  }

  async create(obj: Cast): Promise<void> {
    if (obj.name.length < this.MIN_LENGTH) {
      throw new BadRequest('O nome precisa ter pelo menos 3 caracteres');
    }
    return super.create(obj);
  }
}
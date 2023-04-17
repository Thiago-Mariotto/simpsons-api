import { ComplexModel, Model, SimpleModel } from '../models/IModel';

export default abstract class Service<T> {
  protected model: Model<T> | SimpleModel<T> | ComplexModel<T>

  constructor(model: Model<T> | SimpleModel<T> | ComplexModel<T>) {
    this.model = model;
  }

  async create(obj: T): Promise<void> {
    await this.model.create(obj);
  }

  async list(): Promise<T[]> {
    return await this.model.list() as T[];
  }

  async find(id: number): Promise<T | null> {
    return await this.model.find(id) as T;
  }

  async update(id: number, obj: T): Promise<void> {
    const model = this.model as Model<T>;
    if (model.update === undefined) {
      throw new Error('Não é possível atualizar este item');
    }
    await model.update(id, obj);
  }

  async delete(id: number): Promise<void> {
    const model = this.model as Model<T>;
    if (model.delete === undefined) {
      throw new Error('Não é possível deletar este item');
    }
    await model.delete(id);
  }
}
import { Model, SimpleModel } from './IModel';

type Identified<T> = T & {
  id: number;
};

export class SimpleMemoryModel<T> implements SimpleModel<T> {
  protected memory: Identified<T>[] = [];
  protected idCounter = 0;

  async create(obj: T) {
    this.memory.push({ ...obj, id: this.idCounter });
    this.idCounter++;
  }

  async find(id: number): Promise<T | null> {
    return this.memory.find((item) => item.id === id) || null;
  }

  async list(): Promise<T[]> {
    return [ ...this.memory ];
  }
}

export class MemoryModel<T> extends SimpleMemoryModel<T> implements Model<T>{
  async update(id: number, obj: T): Promise<void> {
    this.memory = this.memory.map(
      (item) => item.id === id ? { ...obj, id: id } : item
    );
  }

  async delete(id: number): Promise<void> {
    this.memory = this.memory.filter((item) => item.id !== id);
  }
}
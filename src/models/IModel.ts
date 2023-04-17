export interface SimpleModel<T> {
  create(obj: T): Promise<void>;
  list(): Promise<T[]>;
  find(id: number): Promise<T | null>;
}

export interface Model<T> extends SimpleModel<T> {
  update(id: number, obj: T): Promise<void>;
  delete(id: number): Promise<void>;
}

export interface ComplexModel<T> extends SimpleModel<T> {
  findByCast(id: number): Promise<T | null>;
  findByCharacter(id: number): Promise<T | null>;
}
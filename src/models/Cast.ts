import { RowDataPacket } from 'mysql2';
import conn from '../database/Connection';
import Cast from '../interfaces/ICast';
import { SimpleModel } from './IModel';
const DATABASE = 'cartoon';

export default class CastModel implements SimpleModel<Cast> {
  constructor(private tableName: string = 'Casts',
    private connection = conn) { }

  async create(obj: Cast) {
    await this.connection.execute(
      `INSERT INTO ${DATABASE}.${this.tableName}(
        name
      ) VALUES (?);`,
      [obj.name]
    );
  }

  async list() {
    const result = await this.connection.execute(
      `SELECT id, name
      FROM ${DATABASE}.${this.tableName};`
    );
    const [casts] = result;
    return casts as Cast[];
  }

  async find(id: number): Promise<Cast | null> {
    const result = await this.connection.execute(
      `SELECT id, name
      FROM ${DATABASE}.${this.tableName} as C WHERE C.id = ?;`, [id]
    );
    const [casts] = result as RowDataPacket[];
    return casts[0] as Cast;
  }
}
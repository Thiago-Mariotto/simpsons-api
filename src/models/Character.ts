import { RowDataPacket } from 'mysql2';
import connection from '../database/Connection';
import ICharacter from '../interfaces/ICharacter';
import { SimpleModel } from './IModel';

export default class CharacterModel implements SimpleModel<ICharacter> {
  constructor(private conn = connection) { }

  async create(obj: ICharacter): Promise<void> {
    await this.conn.execute('INSERT Characters (name) VALUES (?);', [obj.name]);
  }

  async list(): Promise<ICharacter[]> {
    const [result] = await this.conn.execute('SELECT * FROM cartoon.Characters');
    return result as ICharacter[];
  }

  async find(id: number): Promise<ICharacter | null> {
    const result = await this.conn.execute('SELECT * FROM cartoon.Characters WHERE id = ?', [id])
    console.log('result do find character:', result);
    const [character] = result as RowDataPacket[];
    return character[0] as ICharacter;
  }
}
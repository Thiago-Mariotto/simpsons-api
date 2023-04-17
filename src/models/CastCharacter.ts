import { RowDataPacket } from 'mysql2';
import connection from '../database/Connection';
import ICastCharacter from '../interfaces/ICastCharacter';
import { ComplexModel } from './IModel';

export default class CastCharacter implements ComplexModel<ICastCharacter> {
  constructor(private conn = connection) { }
  async find(id: number): Promise<ICastCharacter | null> {
    const [result] = await this.conn.execute(
      'SELECT * FROM cartoon.Cast_Character WHERE id = ?', [id]
    );

    return result as ICastCharacter;
  }

  async findByCast(id: number): Promise<ICastCharacter | null> {
    const result = await this.conn.execute(
      `SELECT CA.name, CH.name FROM cartoon.Cast_Characters AS CC
        INNER JOIN cartoon.Casts AS CA ON CA.id = CC.cast_id
        INNER JOIN cartoon.Characters AS CH ON CH.id = CC.character_id
        WHERE CC.cast_id = ?
      `, [id]
    );

    const [castCharacter] = result as RowDataPacket[];
    return castCharacter[0] as ICastCharacter;
  }

  async findByCharacter(id: number): Promise<ICastCharacter | null> {
    const result = await this.conn.execute(
      `SELECT Ca.name AS cast, Ch.name AS 'character' FROM cartoon.Cast_Characters AS CC
      JOIN cartoon.Casts AS Ca ON Ca.id = CC.cast_id
      JOIN cartoon.Characters AS Ch ON Ch.id = CC.character_id
      WHERE Ch.id = ?;`, [id]
    );
    const [castCharacters] = result as RowDataPacket[];
    return castCharacters[0] as ICastCharacter;
  }

  async create(obj: ICastCharacter) {
    await this.conn.execute(
      `INSERT INTO cartoon.CastCharacters(
        cast_id, character_id
      ) VALUES (?, ?);`,
      [obj.castId, obj.characterId]
    );
  }

  async list(): Promise<ICastCharacter[]> {
    const result = await this.conn.execute<(RowDataPacket)[]>(
      `SELECT Ca.name AS cast, Ch.name AS 'character' FROM cartoon.Cast_Characters AS CC
      JOIN cartoon.Casts AS Ca ON Ca.id = CC.cast_id
      JOIN cartoon.Characters AS Ch ON Ch.id = CC.character_id;`
    );
    const [castCharacters] = result;
    return castCharacters as ICastCharacter[];
  }

}
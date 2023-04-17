import 'jest';
import request from 'supertest';
import app from '../../src/App';
import connection from '../../src/database/Connection';
import { executeQueries, readQueries } from '../../src/database/queryUtils';

describe('App', () => {
  it('deve retornar 404 ao acessar uma pagina invalida', async () => {
    const result = await request(app).get('/invalid');
    expect(result.status).toEqual(404);
  });
  it('deve retornar 500 caso nao tenha database', async () => {
    await executeQueries(connection, readQueries('dropDatabase.sql'));
    await connection.end();
    console.error = jest.fn();

    const result = await request(app).get('/casts');
    expect(result.status).toEqual(500);
  });
});
/* eslint-disable max-lines-per-function */
import request from 'supertest';
import app from '../../src/App';
import connection from '../../src/database/Connection';
import { executeQueries, readQueries } from '../../src/database/queryUtils';

const dropQuery = readQueries('dropDatabase.sql');

describe('Cast', () => {
  beforeEach(async () => {
    await executeQueries(connection, dropQuery);
    await executeQueries(connection);
  });
  afterAll(async () => {
    await executeQueries(connection, dropQuery);
    await connection.end();
  });

  it('deve criar um novo cast', async () => {
    const result = await request(app).post('/casts').send({ name: 'Tatiana' });
    expect(result.status).toEqual(201);
  });

  it('deve retornar 400 ao criar cast invalido', async () => {
    const result = await request(app).post('/casts').send();
    expect(result.status).toEqual(400);
  });

  it('deve listar um cast', async () => {
    const result = await request(app).get('/casts');
    expect(result.status).toEqual(200);
    expect(result.body).toEqual([{ id: 198, name: 'Dan Castellaneta' }]);
  });

  it('deve listar dois cast', async () => {
    await request(app).post('/casts').send({ name: 'cast1' });
    await request(app).post('/casts').send({ name: 'cast2' });

    const result = await request(app).get('/casts');
    expect(result.body).toEqual(expect.arrayContaining([
      expect.objectContaining({ name: 'cast1' }),
      expect.objectContaining({ name: 'cast2' }),
    ]));
  });

  it('deve encontrar um cast', async () => {
    await request(app).post('/casts').send({ name: 'cast1' });
    const result = await request(app).get('/casts/199');
    expect(result.status).toEqual(200);
    expect(result.body).toEqual({ id: 199, name: 'cast1' });
  });

  it('deve retornar 404 quando nao encontrar um cast', async () => {
    await request(app).post('/casts').send({ name: 'cast1' });
    const result = await request(app).get('/casts/0');
    expect(result.status).toEqual(404);
  });
});
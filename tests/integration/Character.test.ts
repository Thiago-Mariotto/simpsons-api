import supertest from 'supertest';
import App from '../../src/App';

describe('## POST /characters', function () {
  test('Deve criar um novo character', async function () {
    const response = await supertest(App)
      .post('/characters')
      .send({ name: 'Liza Simpsons' });

    expect(response.status).toEqual(201);
  });

  test('Não deve criar um character com nome menor que 3 caracteres', async function () {
    const response = await supertest(App)
      .post('/characters')
      .send({ name: 'Zé' });

    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual('O nome do character precisa ter no minimo 3 caracteres');
  });

  test('Não deve criar um character sem o campo "name"', async function () {
    const response = await supertest(App)
      .post('/characters')
      .send('Zé');

    expect(response.status).toEqual(400);
    expect(response.body.message).toEqual('Name é requerido');
  });
});
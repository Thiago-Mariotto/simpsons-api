/* eslint-disable max-lines-per-function */
import Cast from '../../src/interfaces/ICast';
import { SimpleMemoryModel } from '../../src/models/MemoryModel';
import { CastService } from '../../src/services/Cast';

let memoryModel: SimpleMemoryModel<Cast>;
let castService: CastService;

describe('Cast', () => {
  beforeEach(() => {
    memoryModel = new SimpleMemoryModel();
    castService = new CastService(memoryModel);
  });

  describe('Create', () => {
    it('deve criar um novo cast', async () => {
      await castService.create({
        name: 'zambs'
      });

      const expected = { name: 'zambs' };
      expect(await castService.list()).toEqual(
        expect.arrayContaining([expect.objectContaining(expected)])
      );
    });

    it(
      'deve gerar um erro ao tentar criar um novo cast com nome inválido',
      async () => {
        await expect(
          async () => await castService.create({ name: 'Ad' })
        ).rejects.toHaveProperty(
          'message',
          'O nome precisa ter pelo menos 3 caracteres'
        );
      }
    );
  });

  describe('Find', () => {
    it('deve encontrar um cast existente', async () => {
      await castService.create({
        name: 'zambs'
      });

      const expected = { name: 'zambs' };
      expect(await castService.find(0)).toEqual(
        expect.objectContaining(expected)
      );
    });

    it('não deveria encontrar um cast inexistente', async () => {
      await castService.create({
        name: 'John'
      });
      expect(await castService.find(1)).toEqual(null);
    });
  });
});
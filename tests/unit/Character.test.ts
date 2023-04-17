/* eslint-disable max-lines-per-function */
import Character from '../../src/interfaces/ICharacter';
import { MemoryModel } from '../../src/models/MemoryModel';
import CharacterService from '../../src/services/Character';

let memoryModel: MemoryModel<Character>;
let characterService: CharacterService;

describe('Character', () => {
  beforeEach(() => {
    memoryModel = new MemoryModel();
    characterService = new CharacterService(memoryModel);
  });

  describe('Create', () => {
    it('deve criar um novo character', async () => {
      const expected = {
        name: 'Ada'
      };
      await characterService.create(expected);
      expect(await characterService.list()).toEqual(
        expect.arrayContaining([expect.objectContaining(expected)])
      );
    });

    it(
      'deve gerar um erro ao tentar criar um novo character com nome inválido',
      async () => {
        await expect(
          async () => await characterService.create({
            name: ''
          })
        ).rejects.toHaveProperty(
          'message',
          'O nome do character precisa ter no minimo 3 caracteres'
        );
      }
    );
  });

  describe('Find', () => {
    beforeEach(async () => {
      await characterService.create({
        name: 'Ada'
      });
    });
    it('deve encontrar um personagem existente', async () => {
      const expected = {
        name: 'Ada'
      };
      expect(await characterService.find(0)).toEqual(
        expect.objectContaining(expected)
      );
    });

    it('não deve encontrar um personagem inexistente', async () => {
      expect(await characterService.find(1)).toEqual(null);
    });
  });
});
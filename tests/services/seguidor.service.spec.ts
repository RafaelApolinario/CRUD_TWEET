import { create } from 'domain';
import { Seguidor } from '../../src/models/seguidor.model'
import { SeguidorService } from '../../src/services';
import { prismaMock } from '../config/prisma.mock';

describe('Testes unitários para o service de Seguidor', () => {
    function createSut() {
        return new SeguidorService();
    }

    test('Deve retornar um objeto de sucesso quando houver inserido o Seguidor ao Usuario', async () => {
        prismaMock.seguidores.create.mockResolvedValue({
            id: 'any_id',
            seguidorId: 'any_id',
            usuarioId: 'any_id',
            criadoEm: new Date(),
            atualizadoEm: new Date()            
        });
        const sut = createSut();

        const result = await sut.criar({
            seguidorId: 'any_seguidor_Id',
        }, 'any_usuario_id')

        expect(result).toBeTruthy();
        expect(result.ok).toBe(true);
        expect(result.code).toBe(201);
        expect(result.mensagem).toBe('Seguindo!');
        const seguidorInstance = await result.dados;

        expect(seguidorInstance).toBeInstanceOf(Seguidor);
    });

    test('Deve retornar um objeto de sucesso quando houver deletado o Seguidor ao Usuario', async () => {
        prismaMock.seguidores.delete.mockResolvedValue({
            id: 'any_id',
            seguidorId: 'any_id',
            usuarioId: 'any_id',
            criadoEm: new Date(),
            atualizadoEm: new Date()   
        });

        const sut = createSut();
        const result = await sut.deletar('any_id');

        expect(result).toBeTruthy();
        expect(result.ok).toBe(true);
        expect(result.code).toBe(200);
        expect(result.mensagem).toBe('Seguidor excluido');
        const seguidorInstance = await result.dados;

        expect(seguidorInstance).toBeInstanceOf(Seguidor);

    })
})
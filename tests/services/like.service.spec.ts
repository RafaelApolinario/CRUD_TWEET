import { Like } from '../../src/models/like.model'
import { LikeService } from '../../src/services';
import { prismaMock } from '../config/prisma.mock';

describe('Testes unitários para o service de Alunos', () => {
    function createSut() {
        return new LikeService();
    }

    test('Deve retornar um objeto de sucesso quando houver inserido o like no Tweet', async () => {
        prismaMock.likes.create.mockResolvedValue({
            id: 'any_id',
            usuarioId: 'any_id',
            tweetId: 'any_id',
            criadoEm: new Date(),
            atualizadoEm: new Date()
        });
        const sut = createSut();

        const result = await sut.criar({
            tweetId: 'any_tweet_id'
        }, 'any_usuario_id');
        
        expect(result).toBeTruthy();
        expect(result.ok).toBe(true);
        expect(result.code).toBe(201);
        expect(result.mensagem).toBe('Like criado!');
        expect(result.dados).toBeUndefined();
        expect(result.dados).toBeInstanceOf(Like);
    })
})
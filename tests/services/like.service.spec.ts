import { create } from 'domain';
import { Like } from '../../src/models/like.model'
import { LikeService } from '../../src/services';
import { prismaMock } from '../config/prisma.mock';

describe('Testes unitários para o service de Like', () => {
    function createSut() {
        return new LikeService();
    }

    test('Deve retornar um objeto de sucesso quando houver inserido o like no Tweet', async () => {
        prismaMock.likes.create.mockResolvedValue({
            id: 'any_id',
            usuarioId: 'any_id',
            tweetId: 'any_id',
            criadoEm: new Date(),
            atualizadoEm: new Date(),
            replyId: 'any_id'
        });
        const sut = createSut();

        const result = await sut.criar({
            tweetId: 'any_tweet_id',
            isReply: false,
        }, 'any_usuario_id')

        expect(result).toBeTruthy();
        expect(result.ok).toBe(true);
        expect(result.code).toBe(201);
        expect(result.mensagem).toBe('Like criado!');
        const likeInstance = await result.dados;

        expect(likeInstance).toBeInstanceOf(Like);
    });

    test('Deve retornar um objeto de sucesso quando houver deletado o like no Tweet', async () => {
        prismaMock.likes.delete.mockResolvedValue({
            id: 'any_id',
            usuarioId: 'any_id',
            tweetId: 'any_id',
            criadoEm: new Date(),
            atualizadoEm: new Date(),
            replyId: 'any_id'
        });

        const sut = createSut();
        const result = await sut.deletar('any_id');

        expect(result).toBeTruthy();
        expect(result.ok).toBe(true);
        expect(result.code).toBe(200);
        expect(result.mensagem).toBe('Like excluido');
        const likeInstance = await result.dados;

        expect(likeInstance).toBeInstanceOf(Like);

    })
})
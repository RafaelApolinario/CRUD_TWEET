import { create } from 'domain';
import { Tweet } from '../../src/models/tweet.model'
import { TweetService } from '../../src/services';
import { prismaMock } from '../config/prisma.mock';

describe('Testes unitários para o service de tweet', () => {
    function createSut() {
        return new TweetService();
    }

    test('Deve retornar um objeto de sucesso quando houver criado um Tweet', async () => {
        prismaMock.tweets.create.mockResolvedValue({
            id: 'any_id',
            content: 'any_content',
            type: 'any_type',
            usuarioId: 'any_id',
            criadoEm: new Date(),
            atualizadoEm: new Date(),
            replies: undefined,
            likes: undefined
        });
        const sut = createSut();

        const result = await sut.criar({
            type: 'any_tweet_id',
            content: 'any_content',
        }, 'any_usuario_id')

        expect(result).toBeTruthy();
        expect(result.ok).toBe(true);
        expect(result.code).toBe(201);
        expect(result.mensagem).toBe('Tweet criado!');
        const tweetInstance = await result.dados;

        expect(tweetInstance).toBeInstanceOf(Tweet);
    });

    test('Deve retornar um objeto de sucesso quando houver deletado um Tweet', async () => {
        prismaMock.tweets.delete.mockResolvedValue({
            id: 'any_id',
            content: 'any_content',
            type: 'any_type',
            usuarioId: 'any_id',
            criadoEm: new Date(),
            atualizadoEm: new Date(),
            replies: undefined,
            likes: undefined
        });

        const sut = createSut();
        const result = await sut.deletar('any_id');

        expect(result).toBeTruthy();
        expect(result.ok).toBe(true);
        expect(result.code).toBe(200);
        expect(result.mensagem).toBe('Tweet excluido');
        const tweetInstance = await result.dados;

        expect(tweetInstance).toBeInstanceOf(Tweet);

    })

    test('Deve retornar um objeto de sucesso quando houver atualizado um Tweet', async () => {
        prismaMock.tweets.update.mockResolvedValue({
            id: 'any_id',
            content: 'any_content',
            type: 'any_type',
            usuarioId: 'any_id',
            criadoEm: new Date(),
            atualizadoEm: new Date(),
            replies: undefined,
            likes: undefined
        });

        const sut = createSut();
        const result = await sut.deletar('any_id');

        expect(result).toBeTruthy();
        expect(result.ok).toBe(true);
        expect(result.code).toBe(200);
        expect(result.mensagem).toBe('Tweet atualizado');
        const tweetInstance = await result.dados;

        expect(tweetInstance).toBeInstanceOf(Tweet);

    })
})
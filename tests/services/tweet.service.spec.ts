import { create } from 'domain';
import { Tweet } from '../../src/models/tweet.model'
import { TweetService } from '../../src/services';
import { prismaMock } from '../config/prisma.mock';

describe('Testes unitários para o service de tweet', () => {
    function createSut() {
        return new TweetService();
    }
    //CRIAR
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
    //DELETAR
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
    //ATUALIZAR
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
        const result = await sut.atualizar({ content: 'any_content' }, 'any_id');

        expect(result).toBeTruthy();
        expect(result.ok).toBe(true);
        expect(result.code).toBe(200);
        expect(result.mensagem).toBe('Tweet atualizado');
        const tweetInstance = await result.dados;

        expect(tweetInstance).toBeInstanceOf(Tweet);

    })

    // LISTAR TODOS
    test('Deve retornar um objeto de erro quando não houver tweet cadastrado na base de dados', async () => {
        prismaMock.tweets.findMany.mockResolvedValue([]);

        const sut = createSut();

        const result = await sut.listar('id_any');

        expect(result).toBeTruthy();
        expect(result.ok).toBe(false);
        expect(result.code).toBe(404);
        expect(result.mensagem).toBe('Não foram encontrados tweets criados no sistema.');
        expect(result.dados).toBeUndefined();
    });

    // LISTAR TODOS
    test('Deve retornar um objeto se houver tweet cadastrado na base de dados', async () => {
        prismaMock.tweets.findMany.mockResolvedValue([{
            id: 'any_id',
            content: 'any_content',
            type: 'any_type',
            usuarioId: 'any_id',
            criadoEm: new Date(),
            atualizadoEm: new Date()
        }]);

        const sut = createSut();

        const result = await sut.listar('id_any');

        expect(result).toBeTruthy();
        expect(result.ok).toBe(true);
        expect(result.code).toBe(200);
        expect(result.mensagem).toBe('Tweets listados com sucesso');
        expect(result.dados).toBeInstanceOf(Array);
    });

    //LISTAR POR ID
    test('Deve retornar um objeto de erro quando não houver tweet cadastrado na base de dados', async () => {
        prismaMock.tweets.findUnique.mockResolvedValue(null);

        const sut = createSut();

        const result = await sut.listarPorID('any_id');

        expect(result).toBeTruthy();
        expect(result.ok).toBe(false);
        expect(result.code).toBe(404);
        expect(result.mensagem).toBe('Tweet não encontrado');
        expect(result.dados).toBeUndefined();
    });

    //LISTAR POR ID
    test('Deve retornar um objeto quando houver tweet cadastrado na base de dados', async () => {
        prismaMock.tweets.findUnique.mockResolvedValue({
            id: 'any_id',
            content: 'any_content',
            type: 'any_type',
            usuarioId: 'any_id',
            criadoEm: new Date(),
            atualizadoEm: new Date()
        });

        const sut = createSut();

        const result = await sut.listarPorID('any_id');

        expect(result).toBeTruthy();
        expect(result.ok).toBe(true);
        expect(result.code).toBe(200);
        expect(result.mensagem).toBe('usuario encontrado');
        expect(result.dados).toBeInstanceOf(Tweet);
    });
})
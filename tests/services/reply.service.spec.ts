import { create } from 'domain';
import { Reply } from '../../src/models/reply.model'
import { ReplyService } from '../../src/services';
import { prismaMock } from '../config/prisma.mock';

describe('Testes unitários para o service de Reply', () => {
    function createSut() {
        return new ReplyService();
    }

    test('Deve retornar um objeto de sucesso quando houver inserido o Reply do Tweet', async () => {
        prismaMock.reply.create.mockResolvedValue({
            likes: undefined,
            id: 'any_id',
            content: 'any_content',
            tweetsId: 'any_id',
            usuariosId: 'any_id',
            criadoEm: new Date(),
            atualizadoEm: new Date()
        });
        const sut = createSut();

        const result = await sut.criar({
            tweetId: 'any_tweet_id',
            content: 'any_content',
        }, 'any_usuario_id')

        expect(result).toBeTruthy();
        expect(result.ok).toBe(true);
        expect(result.code).toBe(201);
        expect(result.mensagem).toBe('Reply criado!');
        const ReplyInstance = await result.dados;

        expect(ReplyInstance).toBeInstanceOf(Reply);
    });

    test('Deve retornar um objeto de sucesso quando houver deletado o Reply no Tweet', async () => {
        prismaMock.reply.delete.mockResolvedValue({
            id: 'any_id',
            content: 'any_content',
            tweetsId: 'any_id',
            usuariosId: 'any_id',
            criadoEm: new Date(),
            atualizadoEm: new Date()
        });

        const sut = createSut();
        const result = await sut.deletar('any_id');

        expect(result).toBeTruthy();
        expect(result.ok).toBe(true);
        expect(result.code).toBe(200);
        expect(result.mensagem).toBe('Reply excluido');
        const ReplyInstance = await result.dados;

        expect(ReplyInstance).toBeInstanceOf(Reply);

    })

    test('Deve retornar um objeto de sucesso quando houver atualizado o Reply no Tweet', async () => {
        prismaMock.reply.update.mockResolvedValue({
            id: 'any_id',
            content: 'any_content',
            tweetsId: 'any_id',
            usuariosId: 'any_id',
            criadoEm: new Date(),
            atualizadoEm: new Date()
        });

        const sut = createSut();
        const result = await sut.atualizar({ content: 'any_content' }, 'any_id');

        expect(result).toBeTruthy();
        expect(result.ok).toBe(true);
        expect(result.code).toBe(200);
        expect(result.mensagem).toBe('Reply atualizado');
        const ReplyInstance = await result.dados;

        expect(ReplyInstance).toBeInstanceOf(Reply);

    })
})
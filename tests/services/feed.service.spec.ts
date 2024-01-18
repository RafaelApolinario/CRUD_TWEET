import { create } from 'domain';
import { FeedService } from '../../src/services';
import { prismaMock } from '../config/prisma.mock';

describe('Testes unitários para o service de feed', () => {
    function createSut() {
        return new FeedService();
    }
    test('Deve retornar um objeto se houver conteudo no feed', async () => {
        prismaMock.usuarios.findMany.mockResolvedValue([{
            id: 'any_id',
            nome: 'any_nome',
            usuario: 'any_usuario',
            email: 'any_email',
            senha: 'any_senha',
            auth_token: 'any_auth_token',
            criadoEm: new Date(),
            atualizadoEm: new Date()
        }]);

        prismaMock.tweets.findMany.mockResolvedValue([{
            id: 'any_id',
            content: 'any_content',
            type: 'any_type',
            usuarioId: 'any_user_id',
            atualizadoEm: new Date(),
            criadoEm: new Date()
        }])

        const sut = createSut();

        const result = await sut.listar('any_id');

        expect(result).toBeTruthy();
        expect(result.ok).toBe(true);
        expect(result.code).toBe(200);
        expect(result.mensagem).toBe('Tweets listados com sucesso');
        expect(result.dados).toBeInstanceOf(Array);
    });

    test('Deve retornar um array vazio se não houver conteúdo no feed', async () => {
        prismaMock.usuarios.findMany.mockResolvedValue([]);
        prismaMock.tweets.findMany.mockResolvedValue([]);
    
        const sut = createSut();
        const result = await sut.listar('any_id');
    
        expect(result).toBeTruthy();
        expect(result.ok).toBe(true);
        expect(result.code).toBe(200);
        expect(result.mensagem).toBe('Tweets listados com sucesso');
        expect(result.dados).toEqual([]);
    });
    
})
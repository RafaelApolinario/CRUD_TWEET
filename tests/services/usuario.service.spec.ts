import { create } from 'domain';
import { Usuario } from '../../src/models/usuario.model'
import { UsuarioService } from '../../src/services';
import { prismaMock } from '../config/prisma.mock';
import { BcryptAdapter, JWTAdapter } from '../../src/adapters';

describe('Testes unitários para o service de Usuario', () => {
    function createSut() {
        return new UsuarioService();
    }
    //LOGIN 
    test('eve retornar um objeto de erro quando o email informado não tiver cadastrado no DB', async () => {
        prismaMock.usuarios.findUnique.mockResolvedValue(null);

        const sut = createSut();

        const result = await sut.login({
            email: 'any_email',
            senha: 'any_senha'
        })

        expect(result).toBeTruthy();
        expect(result.ok).toBe(false);
        expect(result.code).toBe(401);
        expect(result.mensagem).toBe('Credenciais inválidas');
        expect(result.dados).toBeUndefined();
    });
    //LOGIN SENHA OU EMAIL ERRADO
    test('Deve retornar um objeto de erro quando a senha informada for inválida', async () => {
        prismaMock.usuarios.findUnique.mockResolvedValue({
            id: 'any_id',
            nome: 'any_nome',
            usuario: 'any_usuario',
            email: 'any_email',
            senha: 'any_senha',
            auth_token: 'any_auth_token',
            criadoEm: new Date(),
            atualizadoEm: new Date()
        });

        jest.spyOn(BcryptAdapter.prototype, 'compararHash').mockResolvedValue(false);
        const sut = createSut();

        const result = await sut.login({
            email: 'any_email',
            senha: 'any_senha'
        })

        expect(result).toBeTruthy();
        expect(result.ok).toBe(false);
        expect(result.code).toBe(401);
        expect(result.mensagem).toBe('Credenciais inválidas');
        expect(result.dados).toBeUndefined();
    });

    test('Deve retornar um objeto de sucesso quando a senha e o email informado for válido', async () => {
        prismaMock.usuarios.findUnique.mockResolvedValue({
            id: 'any_id',
            nome: 'any_nome',
            usuario: 'any_usuario',
            email: 'any_email',
            senha: 'any_senha',
            auth_token: 'any_auth_token',
            criadoEm: new Date(),
            atualizadoEm: new Date()
        });

        jest.spyOn(BcryptAdapter.prototype, 'compararHash').mockResolvedValue(true);
        jest.spyOn(JWTAdapter.prototype, 'gerarToken').mockReturnValue('any_token');

        const sut = createSut();

        const result = await sut.login({
            email: 'any_email',
            senha: 'any_senha'
        })
        console.log(result)
        
        expect(result).toBeTruthy();
        expect(result.ok).toBe(true);
        expect(result.code).toBe(200);
        expect(result.mensagem).toBe('Login efetuado');
        expect(result.dados).toBeDefined();
        expect(result.dados).toHaveProperty('token');
        expect(result.dados?.token).toBe('any_token');
        expect(result.dados).toHaveProperty('usuario');
        expect(result.dados?.usuario).toBeDefined();
        expect(result.dados?.usuario).toHaveProperty('id');

    });

    //ERRO CADASTRAR
    test('Deve retornar um erro quando não houver cadastrado um Usuario', async () => {
        prismaMock.usuarios.findUnique.mockResolvedValue({
            id: 'any_id',
            nome: 'any_nome',
            usuario: 'any_usuario',
            email: 'any_email',
            senha: 'any_senha',
            auth_token: 'any_auth_token',
            criadoEm: new Date(),
            atualizadoEm: new Date()
        });

        const sut = createSut();

        const result = await sut.cadastrar({
            nome: 'any_nome',
            usuario: 'any_usuario',
            email: 'any_email',
            senha: 'any_senha'
        })

        expect(result).toBeTruthy();
        expect(result.ok).toBe(false);
        expect(result.code).toBe(400);
        expect(result.mensagem).toBe('E-mail já cadastrado');
    });
    //CADASTRAR
    test('Deve retornar um objeto de sucesso quando houver cadastrado um Usuario', async () => {
        prismaMock.usuarios.findUnique.mockResolvedValue(null);
        prismaMock.usuarios.create.mockResolvedValue({
            id: 'any_id',
            nome: 'any_nome',
            usuario: 'any_usuario',
            email: 'any_email',
            senha: 'any_senha',
            auth_token: 'any_auth_token',
            criadoEm: new Date(),
            atualizadoEm: new Date()
        })

        jest.spyOn(BcryptAdapter.prototype, 'gerarHash').mockResolvedValue('any_hash')

        const sut = createSut();

        const result = await sut.cadastrar({
            nome: 'any_nome',
            usuario: 'any_usuario',
            email: 'any_email',
            senha: 'any_senha'
        })

        expect(result).toBeTruthy();
        expect(result.ok).toBe(true);
        expect(result.code).toBe(201);
        expect(result.mensagem).toBe('Usuario cadastrado!');
        expect(result.dados).toBeDefined();
    });
    //DELETAR
    test('Deve retornar um objeto de sucesso quando houver deletado um usuario', async () => {
        prismaMock.usuarios.delete.mockResolvedValue({
            id: 'any_id',
            nome: 'any_nome',
            usuario: 'any_usuario',
            email: 'any_email',
            senha: 'any_senha',
            auth_token: 'any_auth_token',
            criadoEm: new Date(),
            atualizadoEm: new Date()
        });

        const sut = createSut();
        const result = await sut.deletar('any_id');

        expect(result).toBeTruthy();
        expect(result.ok).toBe(true);
        expect(result.code).toBe(200);
        expect(result.mensagem).toBe('usuario excluido');
        const tweetInstance = await result.dados;

        expect(tweetInstance).toBeInstanceOf(Usuario);

    })
    //ATUALIZAR
    test('Deve retornar um objeto de sucesso quando houver atualizado um usuario', async () => {
        prismaMock.usuarios.update.mockResolvedValue({
            id: 'any_id',
            nome: 'any_nome',
            usuario: 'any_usuario',
            email: 'any_email',
            senha: 'any_senha',
            auth_token: 'any_auth_token',
            criadoEm: new Date(),
            atualizadoEm: new Date()
        });

        const sut = createSut();
        const result = await sut.atualizar({ idUsuario: 'any_id' });

        expect(result).toBeTruthy();
        expect(result.ok).toBe(true);
        expect(result.code).toBe(200);
        expect(result.mensagem).toBe('Usuario atualizado');
        const tweetInstance = await result.dados;

        expect(tweetInstance).toBeInstanceOf(Usuario);

    })

    // LISTAR TODOS
    test('Deve retornar um objeto de erro quando não houver usuario cadastrado na base de dados', async () => {
        prismaMock.usuarios.findMany.mockResolvedValue([]);

        const sut = createSut();

        const result = await sut.listar();

        expect(result).toBeTruthy();
        expect(result.ok).toBe(false);
        expect(result.code).toBe(404);
        expect(result.mensagem).toBe('Não foram encontrados usuarios cadastrados no sistema.');
        expect(result.dados).toBeUndefined();
    });

    // LISTAR TODOS
    test('Deve retornar um objeto se houver usuario cadastrado na base de dados', async () => {
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

        const sut = createSut();

        const result = await sut.listar();

        expect(result).toBeTruthy();
        expect(result.ok).toBe(true);
        expect(result.code).toBe(200);
        expect(result.mensagem).toBe('Usuarios listados com sucesso');
        expect(result.dados).toBeInstanceOf(Array);
    });

    //LISTAR POR ID
    test('Deve retornar um objeto de erro quando não houver usuario cadastrado na base de dados', async () => {
        prismaMock.usuarios.findUnique.mockResolvedValue(null);

        const sut = createSut();

        const result = await sut.listarPorID('any_id');

        expect(result).toBeTruthy();
        expect(result.ok).toBe(false);
        expect(result.code).toBe(404);
        expect(result.mensagem).toBe('usuario não encontrado');
        expect(result.dados).toBeUndefined();
    });

    //LISTAR POR ID
    test('Deve retornar um objeto quando houver tweet cadastrado na base de dados', async () => {
        prismaMock.usuarios.findUnique.mockResolvedValue({
            id: 'any_id',
            nome: 'any_nome',
            usuario: 'any_usuario',
            email: 'any_email',
            senha: 'any_senha',
            auth_token: 'any_auth_token',
            criadoEm: new Date(),
            atualizadoEm: new Date()
        });

        const sut = createSut();

        const result = await sut.listarPorID('any_id');

        expect(result).toBeTruthy();
        expect(result.ok).toBe(true);
        expect(result.code).toBe(200);
        expect(result.mensagem).toBe('usuario encontrado');
        expect(result.dados).toBeInstanceOf(Promise);
    });
})
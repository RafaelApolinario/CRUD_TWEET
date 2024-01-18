import {
  Tweets as TweetsPrisma,
  Usuarios as UsuariosPrisma,
} from "@prisma/client";
import { randomUUID } from "crypto";
import repository from "../database/prisma.connection";
import {
  AtualizarUsuarioDTO,
  CadastrarUsuarioDTO,
  LoginDTO,
  ResponseDTO,
} from "../dtos";
import { Tweet, Usuario } from "../models";
import { envs } from "../envs";
import { BcryptAdapter, JWTAdapter } from "../adapters";
import { hash } from "bcrypt";

export class UsuarioService {
  public async cadastrar(dados: CadastrarUsuarioDTO): Promise<ResponseDTO> {
    const usuarioExiste = await repository.usuarios.findUnique({
      where: { email: dados.email },
    });

    if (usuarioExiste) {
      return {
        code: 400,
        ok: false,
        mensagem: "E-mail já cadastrado",
      };
    }

    // ENCRIPTOGRAFAR A SENHA
    const bcrypt = new BcryptAdapter(Number(envs.BCRYPT_SALT));
    const hash = await bcrypt.gerarHash(dados.senha);

    const usuarioDB = await repository.usuarios.create({
      data: {
        nome: dados.nome,
        usuario: dados.usuario,
        email: dados.email,
        senha: hash,
      },
    });

    return {
      code: 201,
      ok: true,
      mensagem: "Usuario cadastrado!",
      dados: this.mapToModel({ ...usuarioDB, tweets: null }),
    };
  }

  public async login(dados: LoginDTO): Promise<ResponseDTO> {
    const usuarioEncontrado = await repository.usuarios.findUnique({
      where: {
        email: dados.email,
      },
    });

    if (!usuarioEncontrado) {
      return {
        code: 401,
        ok: false,
        mensagem: "Credenciais inválidas",
      };
    }

    const bcrypt = new BcryptAdapter(envs.BCRYPT_SALT);
    const hashSenha = await bcrypt.compararHash(dados.senha, usuarioEncontrado.senha);

    if (!hashSenha) {
      return {
        code: 401,
        ok: false,
        mensagem: "Credenciais inválidas",
        dados: undefined
      };
    }
    const usuario = {
      id: usuarioEncontrado.id,
      nome: usuarioEncontrado.nome,
      email: usuarioEncontrado.email
    }
    const jwt = new JWTAdapter(envs.JWT_SECRET_KEY, envs.JWT_EXPIRE_IN);
    const token = jwt.gerarToken(usuario);

    return {
      code: 200,
      ok: true,
      mensagem: "Login efetuado",
      dados: { token, usuario },
    };
  }

  public async listar(): Promise<ResponseDTO> {
    const usuarioDB = await repository.usuarios.findMany({
      orderBy: { nome: "desc" },
      include: { tweets: true },
    });

    console.log("Resultado bruto da consulta ao banco de dados:", usuarioDB);

    if (!usuarioDB.length) {
      return {
        code: 404,
        ok: false,
        mensagem: "Não foram encontrados usuarios cadastrados no sistema.",
      };
    }

    return {
      code: 200,
      ok: true,
      mensagem: "Usuarios listados com sucesso",
      dados: usuarioDB.map((usuario) => this.mapToModel(usuario)),
    };
  }

  public async listarPorID(id: string): Promise<ResponseDTO> {
    const usuarioDB = await repository.usuarios.findUnique({
      where: {
        id: id,
      },
      include: {
        tweets: true,
      },
    });

    if (!usuarioDB) {
      return {
        code: 404,
        ok: false,
        mensagem: "usuario não encontrado",
      };
    }

    return {
      code: 200,
      ok: true,
      mensagem: "usuario encontrado",
      dados: this.mapToModel(usuarioDB),
    };
  }

  public async deletar(id: string): Promise<ResponseDTO> {
    const usuarioExcluido = await repository.usuarios.delete({
      where: { id: id },
      include: { tweets: true },
    });

    return {
      code: 200,
      ok: true,
      mensagem: "usuario excluido",
      dados: this.mapToModel(usuarioExcluido),
    };
  }

  public async atualizar(dados: AtualizarUsuarioDTO): Promise<ResponseDTO> {
    const usuarioAtualizado = await repository.usuarios.update({
      where: { id: dados.idUsuario },
      data: {
        nome: dados.nome,
        usuario: dados.usuario,
        senha: dados.senha,
      },
      include: { tweets: true },
    });

    return {
      code: 200,
      ok: true,
      mensagem: "Usuario atualizado",
      dados: this.mapToModel(usuarioAtualizado),
    };
  }

  private async mapToModel(
    UsuarioDB: UsuariosPrisma & { tweets: TweetsPrisma[] | null }
  ): Promise<Usuario> {
    const tweetsUsuario = UsuarioDB?.tweets
      ? UsuarioDB.tweets.map(
          (tweetDB) => new Tweet(tweetDB.id, tweetDB.content, tweetDB.type)
        )
      : undefined;

    return new Usuario(
      UsuarioDB.id,
      UsuarioDB.nome,
      UsuarioDB.usuario,
      UsuarioDB.email,
      UsuarioDB.senha,
      tweetsUsuario
    );
  }
}

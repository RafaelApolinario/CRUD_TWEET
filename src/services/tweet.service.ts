import {
  Likes as LikesPrisma,
  Reply as ReplyPrisma,
  Tweets as TweetsPrisma,
} from "@prisma/client";
import repository from "../database/prisma.connection";
import { AtualizarTweetDTO, ResponseDTO } from "../dtos";
import { CriarTweetDTO } from "../dtos/criar-tweet.dto";
import { Tweet } from "../models";
import { Like } from "../models/like.model";
import { Reply } from "../models/reply.model";

export class TweetService {
  public async criar(
    dados: CriarTweetDTO,
    usuarioId: string
  ): Promise<ResponseDTO> {
    const tweetDB = await repository.tweets.create({
      data: {
        content: dados.content,
        type: dados.type,
        usuarioId: usuarioId,
      },
      include: {
        likes: true,
        replies: true,
      },
    });

    return {
      code: 201,
      ok: true,
      mensagem: "Tweet criado!",
      dados: this.mapToModel({ ...tweetDB }),
    };
  }

  public async listar(idUsuario: string): Promise<ResponseDTO> {
    const tweetsDB = await repository.tweets.findMany({
      where: { usuarioId: idUsuario },
      orderBy: { criadoEm: "desc" },
      include: {
        likes: true,
        replies: true,
      },
    });

    if (!tweetsDB.length) {
      return {
        code: 404,
        ok: false,
        mensagem: "Não foram encontrados tweets criados no sistema.",
      };
    }

    return {
      code: 200,
      ok: true,
      mensagem: "Tweets listados com sucesso",
      dados: tweetsDB.map((a) => this.mapToModel(a)),
    };
  }

  public async listarPorID(id: string): Promise<ResponseDTO> {
    const tweetDB = await repository.tweets.findUnique({
      where: {
        id: id,
      },
      include: {
        likes: true,
        replies: true,
      },
    });

    if (!tweetDB) {
      return {
        code: 404,
        ok: false,
        mensagem: "Tweet não encontrado",
      };
    }

    return {
      code: 200,
      ok: true,
      mensagem: "usuario encontrado",
      dados: this.mapToModel(tweetDB),
    };
  }

  public async atualizar(
    dados: AtualizarTweetDTO,
    idTweet: string
  ): Promise<ResponseDTO> {
    const tweetAtualizado = await repository.tweets.update({
      where: { id: idTweet },
      data: { content: dados.content },
      include: {
        likes: true,
        replies: true,
      },
    });

    return {
      code: 200,
      ok: true,
      mensagem: "Tweet atualizado",
      dados: this.mapToModel(tweetAtualizado),
    };
  }

  public async deletar(id: string): Promise<ResponseDTO> {
    const tweetExcluido = await repository.tweets.delete({
      where: { id: id },
      include: {
        likes: true,
        replies: true,
      },
    });

    return {
      code: 200,
      ok: true,
      mensagem: "Tweet excluido",
      dados: this.mapToModel(tweetExcluido),
    };
  }

  private mapToModel(
    TweetDB: TweetsPrisma & { likes: LikesPrisma[] | null } & {
      replies: ReplyPrisma[] | null;
    }
  ): Tweet {
    const likesTweet = TweetDB?.likes
      ? TweetDB.likes.map((LikesDB) => new Like(LikesDB.id))
      : undefined;
    const repliesTweet = TweetDB?.replies
      ? TweetDB.replies.map(
          (ReplyDB) => new Reply(ReplyDB.id, ReplyDB.content, likesTweet)
        )
      : undefined;

    return new Tweet(
      TweetDB.id,
      TweetDB.content,
      TweetDB.type,
      likesTweet,
      repliesTweet
    );
  }
}

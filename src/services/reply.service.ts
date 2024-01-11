import { Likes as LikesPrisma, Tweets as TweetsPrisma } from "@prisma/client";
import repository from "../database/prisma.connection";
import { AtualizarTweetDTO, CriarReplyDTO, ResponseDTO } from "../dtos";
import { Tweet } from "../models";
import { Like } from "../models/like.model";

export class ReplyService {
  private mapToModel(
    TweetDB: TweetsPrisma & { likes: LikesPrisma[] | null }
  ): Tweet {
    const likesTweet = TweetDB?.likes
      ? TweetDB.likes.map((LikesDB) => new Like(LikesDB.id))
      : undefined;

    return new Tweet(TweetDB.id, TweetDB.content, TweetDB.type, likesTweet);
  }

  public async criar(
    dados: CriarReplyDTO,
    usuarioId: string
  ): Promise<ResponseDTO> {
    const tweetDB = await repository.tweets.create({
      data: {
        content: dados.content,
        type: dados.type,
        usuario: { connect: { id: usuarioId } },
        replies: { connect: { id: dados.tweetId } },
      },
      include: {
        likes: true,
        replies: true,
      },
    });

    return {
      code: 201,
      ok: true,
      mensagem: "Reply criado!",
      dados: this.mapToModel({ ...tweetDB }),
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
      mensagem: "Reply atualizado",
      dados: this.mapToModel(tweetAtualizado),
    };
  }

  public async deletar(id: string): Promise<ResponseDTO> {
    const Reply = await repository.tweets.delete({
      where: { id: id },
      include: {
        likes: true,
        replies: true,
      },
    });

    return {
      code: 200,
      ok: true,
      mensagem: "Reply excluido",
      dados: this.mapToModel(Reply),
    };
  }
}

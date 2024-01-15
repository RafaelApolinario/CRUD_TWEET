import { Likes as LikesPrisma, Reply as ReplyPrisma } from "@prisma/client";
import repository from "../database/prisma.connection";
import { AtualizarTweetDTO, CriarReplyDTO, ResponseDTO } from "../dtos";
import { Like } from "../models/like.model";
import { Reply } from "../models/reply.model";

export class ReplyService {
  private mapToModel(
    ReplyDB: ReplyPrisma & { likes: LikesPrisma[] | null }
  ): Reply {
    const likesTweet = ReplyDB?.likes
      ? ReplyDB.likes.map((LikesDB) => new Like(LikesDB.id))
      : undefined;

    return new Reply(ReplyDB.id, ReplyDB.content, likesTweet);
  }

  public async criar(
    dados: CriarReplyDTO,
    usuarioId: string
  ): Promise<ResponseDTO> {
    const replyDB = await repository.reply.create({
      data: {
        content: dados.content,
        tweetsId: dados.tweetId,
        usuariosId: usuarioId,
      },
      include: {},
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

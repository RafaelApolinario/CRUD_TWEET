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
      include: {
        likes: true,
      },
    });

    return {
      code: 201,
      ok: true,
      mensagem: "Reply criado!",
      dados: this.mapToModel({ ...replyDB }),
    };
  }

  public async atualizar(
    dados: AtualizarTweetDTO,
    idTweet: string
  ): Promise<ResponseDTO> {
    const replyAtualizado = await repository.reply.update({
      where: { id: idTweet },
      data: { content: dados.content },
      include: {
        likes: true,
      },
    });

    return {
      code: 200,
      ok: true,
      mensagem: "Reply atualizado",
      dados: this.mapToModel(replyAtualizado),
    };
  }

  public async deletar(id: string): Promise<ResponseDTO> {
    const reply = await repository.reply.delete({
      where: { id: id },
      include: {
        likes: true,
      },
    });

    return {
      code: 200,
      ok: true,
      mensagem: "Reply excluido",
      dados: this.mapToModel(reply),
    };
  }
}

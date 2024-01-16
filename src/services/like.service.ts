import { Likes as LikesPrisma } from "@prisma/client";
import repository from "../database/prisma.connection";
import { CriarLikeDTO, ResponseDTO } from "../dtos";
import { Like } from "../models/like.model";

export class LikeService {
  
  public async criar(
    dados: CriarLikeDTO,
    usuarioId: string
  ): Promise<ResponseDTO> {
    let likeDB;

    if (dados.isReply) {
      likeDB = await repository.likes.create({
        data: {
          usuarioId: usuarioId,
          replyId: dados.tweetId,
        },
      });
    } else {
      likeDB = await repository.likes.create({
        data: {
          usuarioId: usuarioId,
          tweetId: dados.tweetId,
        },
      });
    }

    return {
      code: 201,
      ok: true,
      mensagem: "Like criado!",
      dados: this.mapToModel({ ...likeDB }),
    };
  }
  
  public async deletar(id: string): Promise<ResponseDTO> {
    const likeExcluido = await repository.likes.delete({
      where: { id: id },
    });
    
    return {
      code: 200,
      ok: true,
      mensagem: "Like excluido",
      dados: this.mapToModel(likeExcluido),
    };
  }
  
  private async mapToModel(LikeDB: LikesPrisma): Promise<Like> {
    return new Like(LikeDB.id);
  }
}

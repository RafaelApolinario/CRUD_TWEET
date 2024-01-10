import { Tweets as TweetsPrisma } from "@prisma/client";
import { Likes as LikesPrisma } from "@prisma/client";
import repository from "../database/prisma.connection";
import { CriarReplieDTO, ResponseDTO } from "../dtos";
import { Tweet } from "../models";
import { Like } from "../models/like.model";

export class RepliesService {
  private mapToModel(
    TweetDB: TweetsPrisma & { likes: LikesPrisma[] | null }
  ): Tweet {
    const likesTweet = TweetDB?.likes
      ? TweetDB.likes.map((LikesDB) => new Like(
        LikesDB.id))
      : undefined;

    return new Tweet(TweetDB.id, TweetDB.content, TweetDB.type, likesTweet);
  }

  public async criar(
    dados: CriarReplieDTO,
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
        replies: true
      },
    });

    return {
      code: 201,
      ok: true,
      mensagem: "Replies criado!",
      dados: this.mapToModel({ ...tweetDB }),
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
}

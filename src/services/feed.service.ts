import { Tweets } from "@prisma/client";
import repository from "../database/prisma.connection";
import { ResponseDTO } from "../dtos";

export class FeedService {
  public async listar(idUsuario: string): Promise<ResponseDTO> {
    const seguidoresDB = await repository.usuarios.findMany({
      where: {
        seguindo: {
          some: {
            usuarioId: idUsuario,
          },
        },
      },
      orderBy: { criadoEm: "desc" },
      include: {
        tweets: true,
      },
    });

    const tweetsUsuario = await repository.tweets.findMany({
      where: {
        usuarioId: idUsuario,
      },
    });

    const tweetsFeed: Tweets[] = tweetsUsuario;

    seguidoresDB.forEach((seguidor) => {
      seguidor.tweets.forEach((tweet) => {
        tweetsFeed.push(tweet);
      });
    });

    tweetsFeed.sort((a, b) => b.criadoEm.getTime() - a.criadoEm.getTime());

    return {
      code: 200,
      ok: true,
      mensagem: "Tweets listados com sucesso",
      dados: tweetsFeed,
    };
  }
}

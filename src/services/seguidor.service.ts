import { Seguidores as SeguidoresPrisma } from "@prisma/client";
import repository from "../database/prisma.connection";
import { ResponseDTO, SeguirDTO } from "../dtos";
import { Seguidor } from "../models";

export class SeguidorService {
  private async mapToModel(SeguidoresDB: SeguidoresPrisma): Promise<Seguidor> {
    return new Seguidor(SeguidoresDB.id);
  }

  public async criar(
    dados: SeguirDTO,
    usuarioId: string
  ): Promise<ResponseDTO> {
    const SeguidoresDB = await repository.seguidores.create({
      data: {
        // usuario: { connect: { id: usuarioId } },
        // seguidor: { connect: { id: dados.seguidorId } },
        seguidorId: dados.seguidorId,
        usuarioId: usuarioId,
      },
    });

    return {
      code: 201,
      ok: true,
      mensagem: "Seguindo!",
      dados: this.mapToModel({ ...SeguidoresDB }),
    };
  }

  public async deletar(id: string): Promise<ResponseDTO> {
    const seguidorExcluido = await repository.seguidores.delete({
      where: { id: id },
    });

    return {
      code: 200,
      ok: true,
      mensagem: "Seguidor excluido",
      dados: this.mapToModel(seguidorExcluido),
    };
  }
}

import { Request, Response } from "express";
import { SeguidorService } from "../services";

export class SeguidorController {
  public async criar(req: Request, res: Response) {
    try {
      const usuarioId = req.params;
      const { seguidorId } = req.body;

      const service = new SeguidorService();
      const response = await service.criar({ seguidorId }, usuarioId.id);

      return res.status(response.code).json(response);
    } catch (error: any) {
      return res.status(500).json({
        code: 500,
        ok: false,
        mensagem: error.toString(),
      });
    }
  }

  public async deletar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const service = new SeguidorService();

      const response = await service.deletar(id);

      return res.status(response.code).json(response);
    } catch (error: any) {
      return res.status(500).json({
        code: 500,
        ok: false,
        mensagem: error.toString(),
      });
    }
  }
}

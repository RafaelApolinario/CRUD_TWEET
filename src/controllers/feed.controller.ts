import { Request, Response } from "express";
import { FeedService } from "../services";

export class FeedController {
  public async listar(req: Request, res: Response) {
    try {
      const { id } = req.authUsuario;

      const service = new FeedService();
      const response = await service.listar(id);

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

import { Request, Response } from "express";
import { RepliesService } from "../services";

export class RepliesController {
  public async criar(req: Request, res: Response) {
    try {
      const { content, type } = req.body;
      const usuarioID = req.params;

      const service = new RepliesService();
      const response = await service.criar({ content, type }, usuarioID.id);

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

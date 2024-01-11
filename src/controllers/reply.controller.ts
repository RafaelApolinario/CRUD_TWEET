import { Request, Response } from "express";
import { ReplyService } from "../services";

export class RepliesController {
  public async criar(req: Request, res: Response) {
    try {
      const { content, type, tweetId } = req.body;
      const usuarioID = req.params;

      const service = new ReplyService();
      const response = await service.criar(
        { content, type, tweetId },
        usuarioID.id
      );

      return res.status(response.code).json(response);
    } catch (error: any) {
      return res.status(500).json({
        code: 500,
        ok: false,
        mensagem: error.toString(),
      });
    }
  }

  public async atualizar(req: Request, res: Response) {
    try {
      const { content } = req.body;
      const { id } = req.params;

      const service = new ReplyService();
      const response = await service.atualizar({ content }, id);

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
      const service = new ReplyService();

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

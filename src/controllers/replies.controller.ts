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

  public async listar(_: Request, res: Response) {
    try {
      const service = new RepliesService();
      const response = await service.listar();

      return res.status(response.code).json(response);
    } catch (error: any) {
      return res.status(500).json({
        code: 500,
        ok: false,
        mensagem: error.toString(),
      });
    }
  }

  public async listPorID(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const service = new RepliesService();

      const response = await service.listarPorID(id);

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

      const service = new RepliesService();
      const response = await service.atualizar(
        {
          content,
        },
        id
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

  public async deletar(req: Request, res: Response) {
    try {
      const { id } = req.params;
      const service = new RepliesService();

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

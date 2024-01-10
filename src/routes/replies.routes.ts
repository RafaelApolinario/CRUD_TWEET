import { Router } from "express";
import { RepliesController } from "../controllers/replies.controller";
import { Auth, ValidarFormatoId, VerificarIdUsuario } from "../middlewares";

export function replieRoutes() {
  const router = Router();
  const controller = new RepliesController();
  const validarFormatoId = new ValidarFormatoId();
  const verificarIdUsuario = new VerificarIdUsuario();
  const auth = new Auth();

  //CRIAR
  router.post(
    "/:id",
    [auth.validar, validarFormatoId.validar, verificarIdUsuario.validar],
    controller.criar
  );

  return router;
}

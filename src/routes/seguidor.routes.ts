import { Router } from "express";
import { SeguidorController } from "../controllers";
import { Auth, ValidarFormatoId } from "../middlewares";

export function SeguidorRoutes() {
  const router = Router();
  const controller = new SeguidorController();
  const validarFormatoId = new ValidarFormatoId();
  const auth = new Auth();

  //CRIAR
  router.post(
    "/:id",
    [auth.validar, validarFormatoId.validar],
    controller.criar
  );
  //DELETAR
  router.delete(
    "/:id",
    [auth.validar, validarFormatoId.validar],
    controller.deletar
  );

  return router;
}

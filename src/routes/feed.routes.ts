import { Router } from "express";
import { FeedController } from "../controllers/feed.controller";
import { Auth } from "../middlewares";

export function FeedRoutes() {
  const router = Router();
  const controller = new FeedController();
  const auth = new Auth();

  //LISTAR TODOS
  router.get("/", [auth.validar], controller.listar);

  return router;
}

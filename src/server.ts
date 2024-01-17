import cors from "cors";
import "dotenv/config";
import express, { Request, Response } from "express";
import { docsRoute } from "./docs/config-swagger";
import { envs } from "./envs";
import { likeRoutes, replyRoutes, tweetRoutes, usuarioRoutes } from "./routes";
import { FeedRoutes } from "./routes/feed.routes";
import { SeguidorRoutes } from "./routes/seguidor.routes";

const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cors());

app.get("/", (req: Request, res: Response) => {
  res.status(200).json("Atividade final de módulo - Banco de Dados II");
});

app.use("/usuarios", usuarioRoutes());
app.use("/tweets", tweetRoutes());
app.use("/likes", likeRoutes());
app.use("/replies", replyRoutes());
app.use("/seguidores", SeguidorRoutes());
app.use("/feed", FeedRoutes());
app.use("/docs", docsRoute());

app.listen(envs.PORT, () => console.log(`Server is up in port ${envs.PORT}`));

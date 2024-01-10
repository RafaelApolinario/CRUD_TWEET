import cors from "cors";
import "dotenv/config";
import express, { Request, Response } from "express";
import { likeRoutes, tweetRoutes, usuarioRoutes } from "./routes";
import { envs } from "./envs";
import { docsRoute } from "./docs/config-swagger";

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
// app.use("/replies", repliRoutes())
app.use("/docs", docsRoute())


app.listen(envs.PORT, () =>
  console.log(`Server is up in port ${envs.PORT}`)
);

import { Router } from "express";
import { UsuarioController } from "../controllers";
import { CadastroUsuario, Login, Auth, ValidarFormatoId, VerificarIdUsuario } from "../middlewares"

export function usuarioRoutes() {
  const router = Router();
  const controller = new UsuarioController();
  const cadastroUsuario = new CadastroUsuario();
  const validarFormatoId = new ValidarFormatoId();
  const verificarIdUsuario = new VerificarIdUsuario();
  const login = new Login();
	const auth = new Auth();

  //CADASTRAR
  router.post("/", [cadastroUsuario.validar], controller.cadastrar);
  //MOSTRAR
  router.get("/", [auth.validar], controller.listar); // PARAMOS AQUI, NAO FUNCIONOU

  router.get('/:id', [auth.validar, validarFormatoId.validar], controller.listPorID);
  //ATUALIZAR
  router.put('/:id', [auth.validar, validarFormatoId.validar, verificarIdUsuario.validar], controller.atualizar);  //DELETAR
  router.delete("/:id", [auth.validar, validarFormatoId.validar, verificarIdUsuario.validar], controller.deletar);
  //LOGIN
  router.delete("/login");
  //LOGOUT
  router.delete("/logout");
  router.post('/login', [login.validar], controller.login);
	router.post('/logout', [auth.validar], controller.logout);


  return router;
}

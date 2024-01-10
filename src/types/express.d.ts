declare namespace Express {
    interface Request {
      authUsuario: {
        id: string;
        nome: string;
        email: string;
      };
    }
  }
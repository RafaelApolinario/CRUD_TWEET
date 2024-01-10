import { NextFunction, Request, Response } from 'express';
import { UsuarioService } from '../services';
import { JWTAdapter } from '../adapters';
import { envs } from '../envs';
import { JsonWebTokenError } from 'jsonwebtoken';

export class Auth {
	public async validar(req: Request, res: Response, next: NextFunction) {
		const token = req.headers.authorization;

		if (!token) {
			return res.status(401).json({
				code: 401,
				ok: false,
				mensagem: 'Token é obrigatório',
			});
		}

		try {
			const jwt = new JWTAdapter(envs.JWT_SECRET_KEY, envs.JWT_EXPIRE_IN);
			const usuarioAutenticado = jwt.decodificarToken(token);

			if (!usuarioAutenticado) {
				return res.status(401).json({
					code: 401,
					ok: false,
					mensagem: 'Token inválido',
				});
			}

			req.authUsuario = usuarioAutenticado;

			return next();
		} catch (erro: any) {
			if (erro instanceof JsonWebTokenError) {
				return res.status(401).json({
					code: 401,
					ok: false,
					mensagem: 'Token invalido ou expirado',
				});
			}
		}

		return res.status(500).json({
			code: 500,
			ok: false,
			mensagem: 'Ops! Deu algo errado no servidor',
		});
	}
}

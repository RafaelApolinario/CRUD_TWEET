import bcrypt from "bcrypt";

export class BcryptAdapter {
    private _salt: number;

    constructor(salt: number) {
        this._salt = salt;
    }

    public async gerarHash(senha: string): Promise<string>{
        const hash = await bcrypt.hash(senha, this._salt);
        return hash;
        //recebe a senha e retorna encriptografada
    }

    public async compararHash(senha: string, hash: string): Promise<boolean>{
        const corresponde = await bcrypt.compare(senha, hash);
        return corresponde;

    }
}
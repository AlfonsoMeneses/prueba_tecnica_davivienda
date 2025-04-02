
import jwt from 'jsonwebtoken';

export class JwtAdapter {
    
    constructor(private readonly secret: string) {}

    //Generar token
    sign(payload: any, duration: number = 3600): string {
        return jwt.sign(payload, this.secret, {expiresIn:duration});
    }

    //Validación del token
    verify(token: string): any {
        return jwt.verify(token, this.secret);
    }

    //Obtener data del token
    get(token:string):any{

        //Obteniendo la data del token
        const value = this.verify(token);

        //Validación de la data
        const tokenInfo = typeof value === 'string' ? JSON.parse(value) : value;

        if (!tokenInfo.data) {
            throw "Token invalid";
        }

        //Devolviendo el valor que fue encriptado
        return tokenInfo.data;     
    }
}
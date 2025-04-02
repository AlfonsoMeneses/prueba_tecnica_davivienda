
import jwt from 'jsonwebtoken';

export class JwtAdapter {
    
    constructor(private readonly secret: string) {}

    //Generar token
    sign(payload: any): string {
        return jwt.sign(payload, this.secret);
    }

    //Validación del token
    verify(token: string): any {
        return jwt.verify(token, this.secret);
    }

    //Obtener data del token
    get(token:string):any{
        //Obteniendo la data del token
        return  this.verify(token);
    }
}
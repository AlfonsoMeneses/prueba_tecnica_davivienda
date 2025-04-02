import { Request, Response, NextFunction } from "express";

import { adapterDependencies } from "../../dependency-injection/adapters.dependency";


export const authMiddleware = (req: Request, res: Response, next: NextFunction) => {
    
    const jwt = adapterDependencies.JwtAdapter;

    const token = req.header("Authorization")?.replace("Bearer ", "");

    if (!token) {
        res.status(401).json({ message: "Unauthorized: No token provided" });
        return
    }

    try {

        //Obteniendo los datos del token
        const autentication = jwt.get(token);

        //Agregando datos de autenticacion al body
        req.body.user_autentication = {
            user_id: autentication.id ?? 0,
            user_role: autentication.user_role ?? 0
        }
        
        next();
    } catch (error) {
        res.status(401).json({ message: "Unauthorized: Invalid token" });
        return 
    }
};  
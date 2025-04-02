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
        
        const user_autentication = {
            user_id: autentication.id ?? 0,
            user_role: autentication.user_role ?? 0
        };

        //Agregando datos de autenticacion al body
        if (!req.body) {
            req.body = {
                user_autentication:user_autentication
            }
        }
        else{
            req.body.user_autentication = user_autentication
        }
       
        
        next();
    } catch (error) {
        console.log(error)
        res.status(401).json({ message: "Unauthorized: Invalid token" });
        return 
    }
};  
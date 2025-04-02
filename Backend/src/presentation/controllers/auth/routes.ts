import { Router } from 'express';
import { AuthController } from './auth.controller';
//import { authMiddleware } from '../../middlewares/auth/auth.middleware';

export class AuthRoutes {

    static get routes(): Router {

        const router = Router();
        
        const controller = new AuthController();
        
        /** Definir las rutas */ 
        //Login
        router.post('/login', controller.loginUser );    

        // Registrar un usuario
        router.post('/register', controller.registerUser ); 

        //Enviar las rutas
        return router;

      }

}
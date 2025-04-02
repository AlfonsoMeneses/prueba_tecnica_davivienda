//Express
import { Router } from 'express';

//Rutas
import { AuthRoutes } from './controllers/auth/routes';
//import { UserRoutes } from './controllers/user/routes';


export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        // Definir las rutas

        //Auth
        router.use('/auth',AuthRoutes.routes);

        //Users
        //router.use('/users', UserRoutes.routes);

        //Enviando todas las rutas
        return router;
    }

}
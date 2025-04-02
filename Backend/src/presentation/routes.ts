//Express
import { Router } from 'express';

//Rutas
import { AuthRoutes } from './controllers/auth/routes';
import { ProductRoutes } from './controllers/products/routes';


export class AppRoutes {

    static get routes(): Router {

        const router = Router();

        // Definir las rutas

        //Auth
        router.use('/auth',AuthRoutes.routes);

        //Productos
        router.use('/products', ProductRoutes.routes);

        //Enviando todas las rutas
        return router;
    }

}
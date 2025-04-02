import { Router } from 'express';
import { ProductController } from './product.controller';
import { authMiddleware } from '../../middlewares/auth.middleware';
import { RoleMiddleware } from '../../middlewares/role.middleware';

export class ProductRoutes {

    static get routes(): Router {

        const router = Router();
        
        const controller = new ProductController();
        
        /** Definir las rutas */ 
        //Crear 
        router.get('/',authMiddleware, RoleMiddleware.shouldBeAnInternal, controller.getAll);

        // Consultar
        router.post('/',authMiddleware, RoleMiddleware.shouldBeAnInternal, controller.create);

        //Editar
        router.put('/:id',authMiddleware,  RoleMiddleware.shouldBeAnInternal,controller.update);

        //Eliminar
        router.delete('/:id',authMiddleware,  RoleMiddleware.shouldBeAnInternal, controller.delete);

        //Enviar las rutas
        return router;

      }

}
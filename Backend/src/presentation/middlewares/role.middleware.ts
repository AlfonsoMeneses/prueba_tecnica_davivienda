import { Request, Response, NextFunction } from "express";
import { RolesEnum } from "../../domain/enums/role.enum";


export class RoleMiddleware{

    private static getRolesToValidate(req: Request):string[]{
        const {user_autentication} = req.body;

        if (!user_autentication || !user_autentication.roles) {
            return [];
        }

        return user_autentication.roles;
    }

    private static isValidRoles(roles:string[],rolesToValidate:string[]):boolean{
        const role = rolesToValidate.find(rolToVal => roles.find(rol => rol == rolToVal));
        return !role ? false : true;
    }

    private static forbiddenResponse(res: Response){
        res.status(403).json({ message: "Forbidden" });
        return;
    }

    private static validateRoles(lstRoles:string[],req: Request, res: Response, next: NextFunction){
        //validación roles 
        const rolesToValidate: string[] = RoleMiddleware.getRolesToValidate(req);
        
        //si el usuario no tiene roles
        if(rolesToValidate.length == 0){
            RoleMiddleware.forbiddenResponse(res);
            return;
        }

        //validando los permisos
        const validate = RoleMiddleware.isValidRoles(lstRoles,rolesToValidate);
        
        //si los roles del usuario no son permitidos se envia respuesta de "no permitido"
        if (!validate) {
            res.status(403).json({ message: "Forbidden" });   
            return;
        }

        //roles permitidos
        next();

    }

    static shouldBeAnInternal(req: Request, res: Response, next: NextFunction){

        //agregando lista de roles con permitidos
        const lstRoles:string[] = [RolesEnum.INTERNAL];

        RoleMiddleware.validateRoles(lstRoles,req,res, next);

    }


    static shouldBeAClient(req: Request, res: Response, next: NextFunction){
        //agregando lista de roles con permitidos
        const lstRoles:string[] = [RolesEnum.CLIENT];

        RoleMiddleware.validateRoles(lstRoles,req,res, next);

    }
}
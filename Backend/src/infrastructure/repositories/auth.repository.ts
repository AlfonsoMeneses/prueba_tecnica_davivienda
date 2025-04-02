import { Mapper } from "../../common/mapper";
import { Role } from "../../domain/entities";

import { User } from "../../domain/entities/user";

import { AppDataSource } from "../typeorm/data-source";

import { RoleModel } from "../typeorm/models/role.model";
import { UserModel } from "../typeorm/models/user.model";


export class AuthRepository  {
    
    
    private userRepository;
    
    
    constructor(){
        this.userRepository = AppDataSource.getRepository(UserModel);
    }
   

    //Obtener Usuario por ID
    async findById(id: number): Promise<User | null> {

        //Consulta el usuario por id
        const user = await this.userRepository.findOne({
            where:{id, is_active:true},
            relations: ['userRole']
        });

        //Validación usuario
        if (!user) {
            return null;
        }
        
        //Mappeando
        return Mapper.mapper(User, user);
    }

    /** Obtener Usuario por email */
    async findByEmail(email: string): Promise<User|null>{

        //Consultar usuario
        const user = await this.userRepository.findOne({
            where: {email, is_active: true},
            relations: ['userRole']
        });

        //Validación usuario
        if (!user) {
            return null;
        }

        
        //Mappeando
        const findUser = Mapper.mapper(User, user);
        findUser.role = Mapper.mapper(Role,user.userRole);
        
        //Enviando usuario
        return findUser;
    }

    /** Registrar un usuario */
    async registerUser(user: User):Promise<User> {
        
        //Creando usuario con los datos enviados
        const newUser = this.userRepository.create({
            email: user.email,
            password: user.password,
            name: user.name,
            last_name: user.last_name,
            userRole: {id: user.role.id} as RoleModel
        });

        //Insertando datos del usuario la BD
        const userRegisted =   await this.userRepository.save(newUser);

        //Enviando usuario registrado
        return Mapper.mapper(User, userRegisted);
    }

}
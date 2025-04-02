//Domain
import { User } from "../domain/entities/";
import { AuthService } from "../domain/interfaces/services/auth.service";

//Repositories
import { AuthRepository, RoleRepository } from "../infrastructure/repositories";

//Exceptions
import { BussinesException } from "../domain/exceptions/bussines.exception";

//Enums
import {RolesEnum} from '../domain/enums/role.enum';

//Adapters
import { JwtAdapter } from "../adapters/jwt_adapter";
import { EncryptionAdapter } from "../adapters/encryption.adapter";


//Config
import { envs } from "../config/envs";





export class AuthServiceImpl implements AuthService {
  
  //JWT Adapter
  private jwtAdapter = JwtAdapter;

  private authRepository: AuthRepository = new AuthRepository();
  private roleRepository: RoleRepository = new RoleRepository();

  private encryptionAdapter = new EncryptionAdapter();
  //Controlador
  constructor() {}
  
  /** Registro de un usuario */
  async registerUser(user: User): Promise<User> {

    //Validación si ya existe un usuario con el email enviado
    const userExists = await this.authRepository.findByEmail(user.email);

    //Si existe
    if (userExists) {
      //Generar el error
      throw BussinesException.badRequest('User already exists');
    }

    //Generar encriptación de la password
    user.password = this.encryptionAdapter.hash(user.password);
    
    //Obteniendo el tipo de usuario Externo
    const userRole = await this.roleRepository.findByCode(RolesEnum.CLIENT);

    //Validando el tipo de usuario
    if (!userRole) {
      throw BussinesException.badRequest('User role not found');
    }

    //Agregando el tipo de usuario al objeto
    user.role = {
      id: userRole.id
    } 

    //Generando el registro del usuario
    const newUser = await this.authRepository.registerUser(user);

    //Enviando los datos del nuevo usuario
    return newUser;
  }


  /** Login de usuario */
  async loginUser(email: string, password: string): Promise<User> {

    //Obteniendo los datos del usuario por email
    const user = await this.authRepository.findByEmail(email);

    //Validando si existe el usuario
    if (!user) {
      //Generando el error 
      throw BussinesException.badRequest("User doesn't exist");
    }

    //Validando la password
    const validate = this.encryptionAdapter.compare(password, user.password);

    //Si no es valida la password
    if (!validate) {
      //Enviando el error
      throw BussinesException.badRequest('Invalid password');
    }

    //Enviando el error
    return user;
  }


}
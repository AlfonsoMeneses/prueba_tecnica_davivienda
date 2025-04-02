

import { AuthService } from "../../../domain/interfaces/services/auth.service";

import { UserDto,LoginDto,UserLoginDto } from "../dtos";

import { Mapper } from "../../../common/mapper";
import { envs } from "../../../config/envs";
import { RoleDto } from "../../roles/dtos/role.dto";

import { JwtAdapter } from "../../../adapters/jwt_adapter";

export class LoginUseCase {
    
    private jwtAdapter: JwtAdapter = new JwtAdapter(envs.JWT_SEED);

    constructor(private authService: AuthService) {}
  
    async loginUser(login: LoginDto): Promise<UserLoginDto> {

      //Extrayendo datos del login
      const { email, password } = login;  

      //Invocando la función de login
      const user = await this.authService.loginUser(email, password);
        
      //Generando PayLoad
      const payload = {
        id: user.id,
        email: user.email,
        user_role: user.role.code
      };

      console.log("Payload", payload);
      
      //Generando Token
      const jwt = this.jwtAdapter.sign(payload, envs.JWT_LOGIN_DURATION);

      //Generando Data de respuesta
      const resp:UserLoginDto = {
        user: Mapper.mapper(UserDto, user, true),
        token: jwt
      };

      //Mapeando el tipo de usuario y roles
      resp.user.role = Mapper.mapper(RoleDto, user.role, true);
      
      //Enviando data
      return resp;
    }
}
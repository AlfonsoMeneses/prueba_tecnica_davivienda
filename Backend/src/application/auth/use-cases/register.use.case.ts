
import { Mapper } from "../../../common/mapper";
import { User } from "../../../domain/entities/user";
import { AuthService } from "../../../domain/interfaces/services/auth.service";

import { RegisterDto } from "../dtos/register.dto";

import { UserDto } from "../dtos/user.dto";

export class RegisterUseCase {
    
    constructor(private authService: AuthService) {}
  
    async registerUser(registerUser: RegisterDto): Promise<UserDto> {
      
      const userToRegister = Mapper.mapper(User, registerUser);
      
      const newUser = await this.authService.registerUser(userToRegister);

      return Mapper.mapper(UserDto, newUser, true);
    }
}
import { UserDto } from "./user.dto";


export class UserLoginDto {
    user:UserDto;
    token:string;
}
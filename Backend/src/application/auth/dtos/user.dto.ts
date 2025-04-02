import { Expose } from "class-transformer";
import { RoleDto } from "../../roles/dtos/role.dto";

export class UserDto {
    @Expose() id: number;
    @Expose() email: string;
    @Expose() name: string;
    @Expose() last_name: string;
    password: string;
    @Expose() role: RoleDto;
}
import { Role } from "../../domain/entities/";

import { AppDataSource } from "../typeorm/data-source";
import { RoleModel } from "../typeorm/models/role.model";

export class RoleRepository{

    private roleRepository = AppDataSource.getRepository(RoleModel);

    async findAll(): Promise<Role[]> {
        return await this.roleRepository.find({where: {is_active: true}});
    }
    
    async findById(id: number): Promise<Role|null> {
        return await this.roleRepository.findOne({where: {id}});
    }

    async findByCode(code: string): Promise<Role|null> {
        return await this.roleRepository.findOne({where: {code:code}});
    }
    
}
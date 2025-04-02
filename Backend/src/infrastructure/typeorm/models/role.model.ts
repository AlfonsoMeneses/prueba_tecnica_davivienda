import { BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Entity} from "typeorm";
import { UserModel } from "./user.model";

@Entity({ name: "roles", schema: "prueba_tecnica" })
export class RoleModel extends BaseEntity{

    @PrimaryGeneratedColumn({name: 'id_role'})
    id: number; // Identificador del Rol

    @Column({ unique: true, length: 15, nullable: false })
    code: string; // Código del Rol

    @Column({ length:45, nullable: false })
    name: string; // Nombre del Rol

    @CreateDateColumn({ type: 'timestamp',  nullable: false })
    created_at: Date;// Fecha de creación

    @UpdateDateColumn({ type: 'timestamp' , nullable: false })
    updated_at: Date; // Fecha de actualización

    @Column({ type: "boolean", nullable: false, default: true })
    is_active: boolean; // Valor que indica si el registro esta activo o no

    @OneToMany(() => UserModel, (user) => user.userRole)
    users: UserModel[];
}
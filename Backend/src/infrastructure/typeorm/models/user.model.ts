

import { Entity, PrimaryGeneratedColumn, Column, BaseEntity, CreateDateColumn, UpdateDateColumn, ManyToOne, JoinColumn, JoinTable, ManyToMany, OneToMany } from "typeorm";
import { RoleModel } from "./role.model";
//import { UserTypeModel } from "./user.type.model";
//import { RoleModel } from "./role.model";
//import { UserRoleModel } from "./user.role.model";

@Entity({ name: "users", schema: "prueba_tecnica" })
export class UserModel extends BaseEntity {
  @PrimaryGeneratedColumn({name: 'id_user'})
  id: number;

  @Column({ unique: true, length: 150, nullable: false })
  email: string;

  @Column({ length: 45, nullable: false  })
  name: string;

  @Column({ length: 45, nullable: false  })
  last_name: string;

  @Column({length:150, nullable: false })
  password: string;

  @CreateDateColumn({ type: 'timestamp',  nullable: false })
  created_at: Date;

  @Column({ type: "boolean", nullable: true , default: true})
  is_active: boolean;

  @ManyToOne(() => RoleModel, (roleModel) => roleModel.users)
  @JoinColumn({ name: "role_id" }) 
  userRole: RoleModel;

 
}
  
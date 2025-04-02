import { BaseEntity, PrimaryGeneratedColumn, Column, CreateDateColumn, UpdateDateColumn, OneToMany, Entity} from "typeorm";


@Entity({ name: "products", schema: "prueba_tecnica" })
export class ProductModel extends BaseEntity{

    @PrimaryGeneratedColumn({name: 'id_product'})
    id: number; // Identificador 

    @Column({ length:45, nullable: false })
    name: string; // Nombre 

    @Column({ length:100, nullable: true })
    description: string; // Descripción

    @Column({ type:'decimal', nullable: false })
    price: string; // Valor del producto 

    @Column({ type:'int', nullable: false })
    stock: string; // Cantidad 

    @CreateDateColumn({ type: 'timestamp',  nullable: false })
    created_at: Date;// Fecha de creación

    @UpdateDateColumn({ type: 'timestamp' , nullable: false })
    updated_at: Date; // Fecha de actualización

    @Column({ type: "boolean", nullable: false, default: true })
    is_active: boolean;

}
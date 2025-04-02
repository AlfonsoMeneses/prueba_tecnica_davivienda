import { Mapper } from "../../common/mapper";
import { Product } from "../../domain/entities/product/product";
import { ProductFilters } from "../../domain/entities/product/product.filter";
import { QueryResponse } from "../../domain/entities/queries/query.response";

import { AppDataSource } from "../typeorm/data-source";
import { ProductModel } from "../typeorm/models/product.model";




export class ProductRepository{
    
    private repository = AppDataSource.getRepository(ProductModel);
        
        
    constructor(){}

    async findById(id: number): Promise<Product|null> {
        return await this.repository.findOne({where: {id, is_active:true}});
    }

    //Obtener los productos por filtros y paginación
    async getAll(filters:ProductFilters):Promise<QueryResponse<Product>>{

        //Creando filtros
        const queryFilters = {
            is_active: true,
            id:  filters.id && filters.id > 0 ? filters.id : undefined,
            name: filters.name ?? undefined
        };

       
        //Realizando la consulta con los filtros y paginación
        const [lstProducts, total] = await this.repository.findAndCount({
            where: queryFilters,
            skip: (filters.page -1) * filters.pageSize,
            take: filters.pageSize,
        });

        //Mappeando a la entidad 'User'
        const response = Mapper.mapperArray(Product, lstProducts);

        //Creando objeto para enviar
        const queryResponse:QueryResponse<Product> = {
            data: response,
            pagination:{
                page: filters.page,
                pageSize: filters.pageSize,
                total,
                totalPage:Math.ceil(total / filters.pageSize)
            }
        };

        //Enviando datos de la consulta
        return queryResponse;
    }

    //Creando un producto
    async create(product: Product): Promise<Product> {

          
        //Creando producto con los datos enviados
        const newProduct = this.repository.create({
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock
        });


        //Insertando datos en la BD
        const userRegisted =   await this.repository.save(newProduct);

        //Enviando producto registrado
        return Mapper.mapper(Product, userRegisted);
    }
    
    //Actualizando datos 
    async update(product: Product): Promise<Product> {
        
        //ID  
        const id= {id: product.id};

        //Datos para actualizar
        const updateData = {
            name: product.name,
            description: product.description,
            price: product.price,
            stock: product.stock,
            updated_at: new Date()
        }

        //Actualizando datos  
        const productUpdated = await this.repository.update(id, updateData);

        if (productUpdated.affected == 0) {
            throw new Error('Could not update the user data!')
        }
        
        //Enviando  registrado
        return product;
    }

    //Eliminando usuario
    async delete(product: Product): Promise<void> {

         //ID  
         const id= {id: product.id};

         //Datos para actualizar
         const deleteData = {
            is_active:false,
            updated_at: new Date()
         }

        //Eliminando producto (active = false)
        const response = await this.repository.update(id,deleteData);

        //Validando la actualización
        if (response.affected == 0) {
            throw new Error("Not product to delete.");
        }
    }
}
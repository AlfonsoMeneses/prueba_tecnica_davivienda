import { Product } from "../domain/entities/product/product";
import { ProductFilters } from "../domain/entities/product/product.filter";
import { QueryResponse } from "../domain/entities/queries/query.response";
import { BussinesException } from "../domain/exceptions/bussines.exception";
import { ProductService } from "../domain/interfaces/services/product.service";

import { ProductRepository } from "../infrastructure/repositories/product.repository";

export class ProductServiceImpl implements ProductService{
   
    private productRepository: ProductRepository = new ProductRepository();
    
    async getAll(filters: ProductFilters): Promise<QueryResponse<Product>> {
        return await this.productRepository.getAll(filters);
    }

    async create(product: Product): Promise<Product> {
        return await this.productRepository.create(product);
    }

    async update(product: Product): Promise<Product> {
        
        const productToDelete = await this.productRepository.findById(product.id);

        if (!productToDelete) {
            throw BussinesException.badRequest('Product does not exist');
        }

        return await this.productRepository.update(product);
    }

    async delete(product: Product): Promise<void> {

        const productToDelete = await this.productRepository.findById(product.id);

        if (!productToDelete) {
            throw BussinesException.badRequest('Product does not exist');
        }

        return await this.productRepository.delete(product);
    }

    
}

import { Mapper } from "../../../common/mapper";
import { Product } from "../../../domain/entities/product/product";
import { ProductService } from "../../../domain/interfaces/services/product.service";
import { CreateProductDto } from "../dtos/create.product.dto";
import { ProductDto } from "../dtos/product.dto";

export class DeleteUseCase{
    
    constructor(private productService:ProductService){}

    async Delete(id: number): Promise<void> {
          
        const product: Product = new Product();
        product.id = id;

        await this.productService.delete(product);
    }
}
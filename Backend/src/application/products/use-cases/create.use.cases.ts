import { Mapper } from "../../../common/mapper";
import { Product } from "../../../domain/entities/product/product";
import { ProductService } from "../../../domain/interfaces/services/product.service";
import { CreateProductDto } from "../dtos/create.product.dto";
import { ProductDto } from "../dtos/product.dto";

export class CreateUseCase{
    
    constructor(private productService:ProductService){}

    async Create(product: CreateProductDto): Promise<ProductDto> {
          
        const userToCreate = Mapper.mapper(Product, product);

        const newProduct = await this.productService.create(userToCreate);

        return Mapper.mapper(ProductDto, newProduct, true);
    }
}
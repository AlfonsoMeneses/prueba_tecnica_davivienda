import { Mapper } from "../../../common/mapper";
import { Product } from "../../../domain/entities/product/product";
import { ProductService } from "../../../domain/interfaces/services/product.service";
import { CreateProductDto } from "../dtos/create.product.dto";
import { ProductDto } from "../dtos/product.dto";
import { UpdateProductDto } from "../dtos/update.product.dto";

export class UpdateUseCase{
    
    constructor(private productService:ProductService){}

    async Update(product: UpdateProductDto): Promise<ProductDto> {
          
        const userToCreate = Mapper.mapper(Product, product);

        const newProduct = await this.productService.update(userToCreate);

        return Mapper.mapper(ProductDto, newProduct, true);
    }
}
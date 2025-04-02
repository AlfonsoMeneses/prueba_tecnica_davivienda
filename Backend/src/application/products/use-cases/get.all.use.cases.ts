//DTOs
import {FilterDto} from '../dtos/filter.dto';

//Mapper 
import { Mapper } from "../../../common/mapper";
import { ProductService } from '../../../domain/interfaces/services/product.service';
import { QueryResponseDto } from '../../common/dtos/query.response..dto';
import { ProductFilters } from '../../../domain/entities/product/product.filter';
import { ProductDto } from '../dtos/product.dto';
import { PaginationDto } from '../../common/dtos/pagination.dto';




export class GetAllUseCase{
    
    constructor(private productService:ProductService){}

    async GetAll(filters: FilterDto): Promise<QueryResponseDto<ProductDto>> {
          
        const queryFilters = Mapper.mapper(ProductFilters, filters);
        
        const lstProducts = await this.productService.getAll(queryFilters);

        const queryResponse:QueryResponseDto<ProductDto> = {
            data: Mapper.mapperArray(ProductDto, lstProducts.data, true),
            pagination: Mapper.mapper(PaginationDto, lstProducts.pagination)
        }
        
        return queryResponse;
    }
}
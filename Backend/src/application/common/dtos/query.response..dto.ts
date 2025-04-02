import { PaginationDto } from "./pagination.dto"

export class QueryResponseDto<T>{
    data:T[]
    pagination:PaginationDto
}
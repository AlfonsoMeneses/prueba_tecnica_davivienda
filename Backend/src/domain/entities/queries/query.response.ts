import { Pagination } from "./pagination"

export class QueryResponse<T>{
    data:T[]
    pagination:Pagination
}
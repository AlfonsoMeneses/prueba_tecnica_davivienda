import { Product } from "../../entities/product/product";
import { ProductFilters } from "../../entities/product/product.filter";
import { QueryResponse } from "../../entities/queries/query.response";

export interface ProductService{
    getAll(filters:ProductFilters):Promise<QueryResponse<Product>>;
    create(product:Product):Promise<Product>;
    update(product:Product):Promise<Product>;
    delete(product: Product):Promise<void>;
}
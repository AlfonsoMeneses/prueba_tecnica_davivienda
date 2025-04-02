import { Expose } from "class-transformer";

export class ProductDto{
    @Expose() id: number; // Identificador 
    @Expose() name: string; // Nombre 
    @Expose() description: string; // Descripción
    @Expose() price: string; // Valor del producto 
    @Expose() stock: string; 
}
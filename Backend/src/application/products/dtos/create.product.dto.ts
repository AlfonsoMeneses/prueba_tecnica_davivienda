
//DTO
export class CreateProductDto{

    private constructor(public name: string,
                        public description: string,
                        public price: number, 
                        public stock: number,
                      ) {}
    
    static create(object: { [key: string]: any }): [string?, CreateProductDto?] {
        
        const {  name, description, price, stock } = object;
    
        //Validando que los campos no esten vacios
        if (!name) return ["Missing name"];
        if (!description) return ["Missing description"];        
        if (!price) return ["Missing price"];
        if (!stock) return ["Missing stock"];
        
    
        return [undefined, new CreateProductDto(name,description,price, stock)];
    }
}

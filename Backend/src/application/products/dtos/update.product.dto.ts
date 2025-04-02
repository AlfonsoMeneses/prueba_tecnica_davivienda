//DTO
export class UpdateProductDto{

    private constructor(public id: number,
                        public name: string,
                        public description: string,
                        public price: number, 
                        public stock: number,
                      ) {}
    
    static create(object: { [key: string]: any }): [string?, UpdateProductDto?] {
        
        const { id, name, description, price, stock } = object;
    
        //Validando que los campos no esten vacios
        if (!name) return ["Missing name"];
        if (!description) return ["Missing description"];        
        if (!price) return ["Missing price"];
        if (!stock) return ["Missing stock"];

        const nId = Number(id);

        if(!nId){
            return ["Product does not exist!"];
        }
        
    
        return [undefined, new UpdateProductDto(nId,name,description,price, stock)];
    }
}

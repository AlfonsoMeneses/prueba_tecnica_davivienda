export class FilterDto{

    private constructor(public id: number|undefined,
                        public name: string,
                        public page: number,
                        public pageSize: number
                        ) {}
        
        static create(object: { [key: string]: any }): [string?, FilterDto?] {
            
            const { id, name, page, pageSize } = object;

            const productId = Number(id) > 0 ? Number(id) : undefined; 
            
            
            const pagination ={
                page: Number(page) > 0 ? Number(page) : 1,  
                pageSize: Number(pageSize) > 0 ? Number(pageSize) : 10,
            };

            return [undefined, new FilterDto(productId, name, pagination.page, pagination.pageSize)];
        }
}
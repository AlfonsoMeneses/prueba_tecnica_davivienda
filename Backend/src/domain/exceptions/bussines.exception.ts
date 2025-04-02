

export class BussinesException extends Error {
    constructor(
        public readonly statusCode: number,
        public readonly message: string,
      ){
        super(message);
      }
    
      static badRequest(message: string) {
        return new BussinesException(400, message);
      }
    
      static unauthorized(message: string) {
        return new BussinesException(401, message);
      }
    
      static forbidden(message: string) {
        return new BussinesException(403, message);
      }
    
      static notFound(message: string) {
        return new BussinesException(404, message);
      }
    
      static internalServer(message: string) {
        return new BussinesException(500, message);
      }
}
import { regularExps } from '../../../common/regular-exp';


export class RegisterDto {
   
    private constructor(public name: string,
                        public last_name: string,
                        public email: string, 
                        public password: string) {}

    static create(object: { [key: string]: any }): [string?, RegisterDto?] {
        
        const { email, name, last_name, password } = object;
    
        //Validando que los campos no esten vacios
        if (!name) return ["Missing name"];
        if (!last_name) return ["Missing last name"];
        
        if (!email) return ["Missing email"];
        if (!regularExps.email.test(email)) return ["Email is not valid"];
        if (!password) return ["Missing password"];
        if (password.length < 6) return ["Password too short"];
    
        return [undefined, new RegisterDto(name,last_name,email, password)];
      }

}
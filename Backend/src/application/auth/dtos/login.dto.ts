import { regularExps } from "../../../common/regular-exp";


export class LoginDto {
  
  private constructor(public email: string, public password: string) {}

  static create(object: { [key: string]: any }): [string|null, LoginDto|null] {
    
    const { email, password } = object;

       
    if (!email) return ["Missing email",null];
    if (!regularExps.email.test(email)) return ["Email is not valid",null];
    if (!password) return ["Missing password",null];
    if (password.length < 6) return ["Password too short",null];

    return [null, new LoginDto(email, password)];
  }
}
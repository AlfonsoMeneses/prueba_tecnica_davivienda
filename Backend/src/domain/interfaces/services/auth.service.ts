import { User } from "../../entities/";


export interface AuthService {
    loginUser(email: string, password: string): Promise<User>;
    registerUser(user:User): Promise<User>;
}
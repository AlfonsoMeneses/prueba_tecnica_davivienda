//Use Case
import { LoginUseCase } from "./login.use.case";
import { RegisterUseCase } from "./register.use.case";

//Dependency Service
import { servicesDependencies } from "../../../dependency-injection/services.dependency"

const loginUseCase = new LoginUseCase(servicesDependencies.AuthService);
const registerUseCase = new RegisterUseCase(servicesDependencies.AuthService);

export const authUseCase = {
    loginUseCase,
    registerUseCase,
}
//Interfaces
import { AuthService } from "../domain/interfaces/services/";

//Servicios
import { AuthServiceImpl } from "../services/auth.service.impl";

const authServiceImpl: AuthService = new AuthServiceImpl();

export const servicesDependencies = {
  AuthService: authServiceImpl,
};

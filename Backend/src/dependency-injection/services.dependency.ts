//Interfaces
import { AuthService } from "../domain/interfaces/services/";
import { ProductService } from "../domain/interfaces/services/product.service";

//Servicios
import { AuthServiceImpl } from "../services/auth.service.impl";
import { ProductServiceImpl } from "../services/product.service.impl";

const authServiceImpl: AuthService = new AuthServiceImpl();
const productServiceImpl: ProductService = new ProductServiceImpl();

export const servicesDependencies = {
  AuthService: authServiceImpl,
  ProductService: productServiceImpl,
};

//Express
import { Request, Response } from "express";

//DTOs
import { LoginDto, RegisterDto } from "../../../application/auth/dtos/index";

//Use Cases
import { authUseCase } from "../../../application/auth/use-cases/index"

//Manejo errores
import { handlerError } from "../../../errors/handler.error";

export class AuthController {

  private handleError = handlerError;
  // DI
  constructor() {}

  //Login
  loginUser = (req: Request, res: Response)=>{
    
    //Generando el DTO con los datos
    const [error, loginDto] = LoginDto.create(req.body);

    //Validación en la creación del DTO
    if (error){
      res.status(400).json({ error });
      return;
    } 

    //Ejecución del use case
    authUseCase.loginUseCase.loginUser(loginDto!)
                 .then((user) => {
                     res.json(user);
                  })
                 .catch((error) => {
                     this.handleError(error, res)
                  });
  };

  //Registro de un usuario
  registerUser = (req: Request, res: Response) => {
    
    //Generando el DTO con los datos
    const [error, registerDto] = RegisterDto.create(req.body);

    //Validación en la creación del DTO
    if (error){
      res.status(400).json({ error });
      return;
    } 

    //Ejecución del use case
    authUseCase.registerUseCase.registerUser(registerDto!)
                    .then((user) => {
                      res.json(user);
                    })
                    .catch((error) => {
                      this.handleError(error, res)
                    });

  };


}

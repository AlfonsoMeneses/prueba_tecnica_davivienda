//Express
import { Request, Response } from "express";

import { FilterDto } from "../../../application/products/dtos/filter.dto";
import { handlerError } from "../../../errors/handler.error";
import { productUseCase } from "../../../application/products/use-cases";
import { CreateProductDto } from "../../../application/products/dtos/create.product.dto";
import { UpdateProductDto } from "../../../application/products/dtos/update.product.dto";

export class ProductController {

  private handleError = handlerError;
  // DI
  constructor() {}

  getAll = (req: Request, res: Response) => {
    
    //Generando el DTO con los datos del query
    const [error, filtersDto] = FilterDto.create(req.query);

    //Validando la generación del DTO
    if (error) {
        res.status(400).json({ error });
        return;
    }
  
    //Ejecutando la función del use case
    productUseCase.getAllUseCase.GetAll(filtersDto!)
                            .then((users) => {
                                res.json(users);
                            })
                            .catch((error) => {
                                this.handleError(error, res);
                            });
  };

  create = (req: Request, res: Response)=>{
    
    //Generando el DTO con los datos del body
    const [error, createDto] = CreateProductDto.create(req.body);

    //Validando la generación del DTO
    if (error) {
      res.status(400).json({ error });
      return;
    }

    //Ejecutando la función del use case
    productUseCase.createUseCase
      .Create(createDto!)
      .then((user) => {
        res.json(user);
      })
      .catch((error) => {
        this.handleError(error, res);
      });

  };

  update = (req: Request, res: Response)=>{
    
    //Obteniendo el ID del usuario
    const {id} = req.params;
    req.body.id = id;
    
    //Generando el DTO con los datos del body
    const [error, updateDto] = UpdateProductDto.create(req.body);

    //Validando la generación del DTO
    if (error) {
      res.status(400).json({ error });
      return;
    }

    //Ejecutando la función del use case
    productUseCase.updateUseCase
      .Update(updateDto!)
      .then((user) => {
        res.json(user);
      })
      .catch((error) => {
        this.handleError(error, res);
      });

  };

  delete = (req: Request, res: Response)=>{
    
    
    const {id} = req.params;



    //Ejecutando la función del use case
    productUseCase.deleteUseCase.Delete(Number(id))
                          .then((user) => {
                            res.json({status:true});
                          })
                          .catch((error) => {
                            this.handleError(error, res);
                          });
    
  };
  
}
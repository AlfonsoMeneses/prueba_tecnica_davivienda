//Express
import { Response } from "express";

//Exceptions
import { BussinesException } from "../domain/exceptions/bussines.exception";


export const handlerError = (error: unknown, res: Response ) => {

    if ( error instanceof BussinesException ) {
      return res.status(error.statusCode).json({ error: error.message });
    }

    console.log(`${ error }`);
    return res.status(500).json({ error: 'Internal server error' })
} 
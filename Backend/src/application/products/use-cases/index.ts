

//Dependency Service
import { servicesDependencies } from "../../../dependency-injection/services.dependency"
import { CreateUseCase } from "./create.use.cases";
import { DeleteUseCase } from "./delete.use.cases";

import { GetAllUseCase } from "./get.all.use.cases";
import { UpdateUseCase } from "./update.use.cases";

const getAllUseCase = new GetAllUseCase(servicesDependencies.ProductService);
const createUseCase = new CreateUseCase(servicesDependencies.ProductService);
const updateUseCase = new UpdateUseCase(servicesDependencies.ProductService);
const deleteUseCase = new DeleteUseCase(servicesDependencies.ProductService);

export const productUseCase = {
    getAllUseCase,
    createUseCase,
    updateUseCase,
    deleteUseCase,
}
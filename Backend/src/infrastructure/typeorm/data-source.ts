import { DataSource } from "typeorm";
import {databaseConfig} from "../../config/database.config";

import {entities} from "./models/index";


export const AppDataSource = new DataSource({
    type: 'postgres', 
    host: databaseConfig.HOST,
    port: databaseConfig.PORT,
    username: databaseConfig.USER_NAME ,
    password: databaseConfig.PASSWORD ,
    database: databaseConfig.DATABASE,
    synchronize: false,
    logging: ['error','warn'],
    entities: entities, 
  });
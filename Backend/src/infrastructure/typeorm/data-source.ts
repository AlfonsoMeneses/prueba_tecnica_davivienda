import { DataSource } from "typeorm";
import {databaseConfig} from "../../config/database.config";

//import {entities} from "./models/index";


export const AppDataSource = new DataSource({
    type: 'postgres', // 👈 Usa la variable de entorno TYPE
    host: databaseConfig.HOST,
    port: databaseConfig.PORT,
    username: databaseConfig.USER_NAME ,
    password: databaseConfig.PASSWORD ,
    database: databaseConfig.DATABASE,
    synchronize: false,
    logging: ['error','warn'],
    entities: [], // 👈 Agrega todas tus entidades aquí

  });
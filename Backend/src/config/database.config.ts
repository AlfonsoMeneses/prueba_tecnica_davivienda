import 'dotenv/config';
import { get } from 'env-var';


export const databaseConfig = {

    HOST: get('DB_HOST').required().asString(),
    PORT: get('DB_PORT').required().asPortNumber(),
    USER_NAME: get('DB_USER').required().asString(), 
    PASSWORD: get('DB_PASSWORD').required().asString(),
    DATABASE: get('DB_NAME').required().asString(),
}
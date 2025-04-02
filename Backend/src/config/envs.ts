import 'dotenv/config';
import { get } from 'env-var';


export const envs = {
  PORT: get('PORT').required().asPortNumber(),
  JWT_SEED: get('JWT_SEED').required().asString(),
  JWT_LOGIN_DURATION:get('JWT_LOGIN_DURATION').required().asInt(),
}
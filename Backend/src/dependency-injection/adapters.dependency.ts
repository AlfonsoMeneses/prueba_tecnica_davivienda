
import { JwtAdapter } from "../adapters/jwt_adapter";

import { envs } from "../config/envs";


export const adapterDependencies = {
  JwtAdapter: new JwtAdapter(envs.JWT_SEED),
};

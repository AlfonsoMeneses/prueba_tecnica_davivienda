import { Role } from "./";


export class User {
  id: number;
  email: string;
  name: string;
  last_name: string;
  password: string;
  role:Role;
  created_at: Date;
  is_active: boolean;
}
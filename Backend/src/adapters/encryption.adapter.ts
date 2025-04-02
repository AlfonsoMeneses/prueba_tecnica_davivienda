import { compareSync, genSaltSync, hashSync } from 'bcryptjs';

export class EncryptionAdapter  {
   hash(password: string){
    const salt = genSaltSync();
    return hashSync(password, salt)
  }

  compare(password: string, hashedPassword: string){
    return compareSync(password, hashedPassword);
  }
}
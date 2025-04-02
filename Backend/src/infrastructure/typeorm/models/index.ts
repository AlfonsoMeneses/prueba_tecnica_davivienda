import { BaseEntity } from 'typeorm'
import { UserModel } from './user.model'

import { RoleModel } from './role.model'

export const entities: typeof BaseEntity[] = [
    UserModel,
    RoleModel
]
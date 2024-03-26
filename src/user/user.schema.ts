import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

import { Role } from '@prisma/client'
const roleEnum = z.nativeEnum(Role)

const UserProfileSchema = z.object({
    id: z.string(),
    name: z.string(),
    surname: z.string(),
    email: z.string(),
})

const UserData = z.object({
    id: z.string(),
    name: z.string(),
    surname: z.string(),
    email: z.string(),
    password: z.string(),
    role: roleEnum,
    createdAt: z.string(),
    updatedAt: z.string(),
    avatar: z.string()
})

const ManyUsersSchema = z.array(UserData)

export class ManyUsersDto extends createZodDto(ManyUsersSchema) {}
export class UserProfileDto extends createZodDto(UserProfileSchema) {}



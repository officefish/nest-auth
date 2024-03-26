import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'

import { AppModule } from '@/app/app.module'
import { faker } from '@faker-js/faker'

import { describe, test, beforeAll, afterAll, expect, expectTypeOf } from 'vitest'

import request from 'supertest'
import { PrismaService } from '@/prisma.service'
import { AuthService } from '@/auth/auth.service'
import { User } from '@prisma/client'
import { AuthModule } from '@/auth/auth.module'
import { JwtModule, JwtService } from '@nestjs/jwt'
import { ConfigModule } from '@nestjs/config'

// import {
//   FastifyAdapter,
//   NestFastifyApplication,
// } from '@nestjs/platform-fastify'

//const url = '/healthcheck'
const contentType = 'application/json; charset=utf-8'
const API_PREFIX = '/api/v1'
const MODULE = 'auth'

interface FakeNewUser {
  email: string
  name?: string
  password: string
}

interface IUserMin {
  name: string
  email: string
}

interface IAuthResponse {
  accessToken: string
  refreshToken: string
  user: IUserMin
}


describe('Auth Module Service tests.', () => {
  let app: INestApplication
  let prisma: PrismaService
  let auth: AuthService

  beforeAll(async () => {
  
    const moduleRef = await Test.createTestingModule({
        imports: [
          AppModule,
          AuthModule,
        ],
        providers: [
          PrismaService,
          //JwtService,
          AuthService,
        ],
    })
      .compile();
    
    app = moduleRef.createNestApplication();
    app.setGlobalPrefix(API_PREFIX);
    await app.init();

    prisma = await moduleRef.get<PrismaService>(PrismaService)
    auth = await moduleRef.get<AuthService>(AuthService)
  })

  test.skip('Success register new user service', async () => {

    const newUserData = {
      email: faker.internet.email(),
      password: `${faker.internet.password()}`,
      name: faker.person.fullName(),
    } satisfies FakeNewUser

    const response = await auth.register(newUserData)
    expectTypeOf(response).toMatchTypeOf<IAuthResponse>()

     // destroy fakeUser after test
    const where = { email: newUserData.email,}
    let prismaUser = await prisma.user.findUnique({ where })

    expectTypeOf(prismaUser).toMatchTypeOf<User>()

    const dsettings = prisma.settings.deleteMany({ where: {userId: prismaUser.id} })
    const dnotifications = prisma.notifications.deleteMany({ where: {userId: prismaUser.id} })
    const duser = prisma.user.delete({ where })
    await prisma.$transaction([ dsettings, dnotifications, duser ])
    
    prismaUser = await prisma.user.findUnique({ where })
    expect(prismaUser).toBe(null)
  })

  afterAll(async () => {
    //await app.getHttpServer().close()
    if (app) 
      await app.close()
  })
})

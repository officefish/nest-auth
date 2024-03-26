import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'

import { AppModule } from '@/app/app.module'
import { faker } from '@faker-js/faker'

import { describe, test, beforeAll, afterAll, expect, expectTypeOf } from 'vitest'

import request from 'supertest'
import { PrismaService } from '@/prisma.service'

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


describe('Auth Module Controller tests.', () => {
  let app: INestApplication
  let prisma: PrismaService

  beforeAll(async () => {
  
    const moduleRef = await Test.createTestingModule({
        imports: [AppModule],
        providers: [
          PrismaService,
        ],
    })
      .compile();
    
    app = moduleRef.createNestApplication();
    app.setGlobalPrefix(API_PREFIX);
    await app.init();

    prisma = await moduleRef.get<PrismaService>(PrismaService)
  })

  test('[POST] /register Success request', async () => {

    const newUser = {
      email: faker.internet.email(),
      password: `${faker.internet.password()}`,
      name: faker.person.fullName(),
    } satisfies FakeNewUser

    const payload = {
        ...newUser, 
    }

    const response = await request(app.getHttpServer())
      .post(`${API_PREFIX}/${MODULE}/register`)
      .send({...payload})
     
    expect(response.statusCode).toBe(201)
    expect(response.headers['content-type']).toBe(contentType)

    const json = response.body
    expectTypeOf(json).toMatchTypeOf<IAuthResponse>()

     // destroy fakeUser after test
    const where = { email: newUser.email,}
    let prismaUser = await prisma.user.findUnique({ where })

    const dsettings = prisma.settings.deleteMany({ where: {userId: prismaUser.id} })
    const dnotifications = prisma.notifications.deleteMany({ where: {userId: prismaUser.id} })
    const duser = prisma.user.delete({ where })
    await prisma.$transaction([ dsettings, dnotifications, duser ])
    
    prismaUser = await prisma.user.findUnique({ where })
    expect(prismaUser).toBe(null)
  })

  test('[POST] /login Success request', async () => {

    const newUser = {
      email: faker.internet.email(),
      password: `${faker.internet.password()}`,
    } satisfies FakeNewUser

    const payload = {
        ...newUser, 
    }

    let response = await request(app.getHttpServer())
      .post(`${API_PREFIX}/${MODULE}/register`)
      .send({...payload})
     
    expect(response.statusCode).toBe(201)
    expect(response.headers['content-type']).toBe(contentType)

    response = await request(app.getHttpServer())
      .post(`${API_PREFIX}/${MODULE}/login`)
      .send({...payload})
     
    expect(response.statusCode).toBe(201)
    expect(response.headers['content-type']).toBe(contentType)

    const json = response.body
    expectTypeOf(json).toMatchTypeOf<IAuthResponse>()

     // destroy fakeUser after test
    const where = { email: newUser.email,}
    let prismaUser = await prisma.user.findUnique({ where })

    const dsettings = prisma.settings.deleteMany({ where: {userId: prismaUser.id} })
    const dnotifications = prisma.notifications.deleteMany({ where: {userId: prismaUser.id} })
    const duser = prisma.user.delete({ where })
    await prisma.$transaction([ dsettings, dnotifications, duser ])
    
    prismaUser = await prisma.user.findUnique({ where })
    expect(prismaUser).toBe(null)
  })

  test('[POST] /access-token Success request', async () => {

    const newUser = {
      email: faker.internet.email(),
      password: `${faker.internet.password()}`,
    } satisfies FakeNewUser

    const payload = {
        ...newUser, 
    }

    let response = await request(app.getHttpServer())
      .post(`${API_PREFIX}/${MODULE}/register`)
      .send({...payload})
     
    expect(response.statusCode).toBe(201)
    expect(response.headers['content-type']).toBe(contentType)
    let json = response.body
    expectTypeOf(json).toMatchTypeOf<IAuthResponse>()

    payload['refreshToken'] = json.refreshToken

    response = await request(app.getHttpServer())
      .post(`${API_PREFIX}/${MODULE}/login/access-token`)
      .send({...payload})
     
    expect(response.statusCode).toBe(201)
    expect(response.headers['content-type']).toBe(contentType)

    json = response.body
    expectTypeOf(json).toMatchTypeOf<IAuthResponse>()

     // destroy fakeUser after test
    const where = { email: newUser.email,}
    let prismaUser = await prisma.user.findUnique({ where })

    const dsettings = prisma.settings.deleteMany({ where: {userId: prismaUser.id} })
    const dnotifications = prisma.notifications.deleteMany({ where: {userId: prismaUser.id} })
    const duser = prisma.user.delete({ where })
    await prisma.$transaction([ dsettings, dnotifications, duser ])
    
    prismaUser = await prisma.user.findUnique({ where })
    expect(prismaUser).toBe(null)
  })

  afterAll(async () => {
    //await app.getHttpServer().close()
    await app.close()
  })
})

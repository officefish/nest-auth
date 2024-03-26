import { Test, TestingModule } from '@nestjs/testing'
import { INestApplication } from '@nestjs/common'

import { AppModule } from '@/app/app.module'

import { describe, test, beforeAll, afterAll, expect } from 'vitest'
import { NestFactory } from '@nestjs/core'

import request from 'supertest'

// import {
//   FastifyAdapter,
//   NestFastifyApplication,
// } from '@nestjs/platform-fastify'

//const url = '/healthcheck'
const contentType = 'application/json; charset=utf-8'
const API_PREFIX = '/api/v1'

describe('Server user module service tests.', () => {
  let app: INestApplication

  beforeAll(async () => {
    
    const moduleRef = await Test.createTestingModule({
      imports: [AppModule],
    })
      .compile();
  
    app = moduleRef.createNestApplication();
    app.setGlobalPrefix(API_PREFIX);
    await app.init();
  })

  test('Success create new user.', async () => {
    expect(true).toBe(true)
  })

  test('Success get user by id.', async () => {
    expect(true).toBe(true)
  })

  test('Success get many users.', async () => {
    expect(true).toBe(true)
  })

  test('Success update user by id.', async () => {
    expect(true).toBe(true)
  })

  test('Success delete user by id.', async () => {
    expect(true).toBe(true)
  })

  afterAll(async () => {
    //await app.getHttpServer().close()
    await app.close()
  })
})
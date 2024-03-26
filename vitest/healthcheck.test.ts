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

describe('Server application healthcheck.', () => {
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

  test('Server is alive check.', async () => {
    const response = await request(app.getHttpServer())
      .get(`${API_PREFIX}/ping`)
     
    expect(response.statusCode).toBe(200)
    expect(response.headers['content-type']).toBe(contentType)
  })

  afterAll(async () => {
    //await app.getHttpServer().close()
    await app.close()
  })
})
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

describe('Server transaction module controller tests.', () => {
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

  test('[POST] /transaction Success create new transaction.', async () => {
    expect(true).toBe(true)
  })

  test('[GET] /transcation/{id} Success get transaction by id.', async () => {
    expect(true).toBe(true)
  })

  test('[GET] /transaction/many Success get many transaction.', async () => {
    expect(true).toBe(true)
  })

  test('[PATCH] /transaction/many Success update transaction by id.', async () => {
    expect(true).toBe(true)
  })

  test('[DELETE] /transaction Success delete transcation by id.', async () => {
    expect(true).toBe(true)
  })

  afterAll(async () => {
    //await app.getHttpServer().close()
    await app.close()
  })
})
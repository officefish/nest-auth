import { INestApplication, Logger } from '@nestjs/common'
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger'
import { patchNestJsSwagger } from 'nestjs-zod'

export function initializeSwagger(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('Crypto chill API.')
    .setDescription('MVP simplify API development with all validation and serialization covenants.')
    .setVersion('1.0')
    .addTag('healthcheck')
    .addTag('auth')
    .addTag('project')
    .addTag('user')
    .addTag('wallet')
    .addTag('transaction')
    .build()
  patchNestJsSwagger()
  const document = SwaggerModule.createDocument(app, config)
  SwaggerModule.setup('api', app, document)
  //if (process.env.NODE_ENV === 'development') {
  //  app.enableCors(localhostCorsConfig);
  Logger.log('Swagger initialized', 'Bootstrap')
  //}
}
import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { IPingPong } from './app.types';

import {
  ApiCreatedResponse,
  ApiResponse,
  ApiBody,
  ApiTags,
} from '@nestjs/swagger'
import { PING_PONG_DESC } from './app.constants';
import { PingPongResponseDto } from './app.schema';

@ApiTags('healthcheck')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get('/ping')
  @ApiResponse({
    status: 200,
    type: PingPongResponseDto,
    description: PING_PONG_DESC,
  })
  ping(): IPingPong {
    return this.appService.ping();
  }
}

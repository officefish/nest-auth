import { Injectable } from '@nestjs/common';
import { IPingPong } from './app.types';

@Injectable()
export class AppService {
  ping(): IPingPong {
    return {ping:"pong"};
  }
}

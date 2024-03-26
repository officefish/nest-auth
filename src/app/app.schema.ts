import { createZodDto } from 'nestjs-zod'
import { z } from 'nestjs-zod/z'

const ping = {
  ping:  z.literal('pong'),
}

const PingPongSchema = z.object({
    ...ping,
  })
  
  export class PingPongResponseDto extends createZodDto(PingPongSchema) {}


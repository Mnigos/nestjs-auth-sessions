import * as dotenv from 'dotenv'
dotenv.config()
import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { InternalServerErrorException } from '@nestjs/common'

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      cors: true,
    })
    await app.listen(process.env.PORT || 3000)
  } catch {
    throw new InternalServerErrorException()
  }
}
bootstrap()

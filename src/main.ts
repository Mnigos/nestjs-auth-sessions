import * as dotenv from 'dotenv'
dotenv.config()
import { NestFactory } from '@nestjs/core'
import { InternalServerErrorException } from '@nestjs/common'
import * as passport from 'passport'
import * as session from 'express-session'

import { AppModule } from './app.module'

async function bootstrap() {
  try {
    const app = await NestFactory.create(AppModule, {
      cors: true,
    })

    app.use(
      session({
        name: 'connect.sid',
        secret: process.env.JWT_SECRET,
        resave: false,
        saveUninitialized: false,
        cookie: {
          secure: false,
          httpOnly: false,
          maxAge: 1000 * 60 * 60 * 30 * 24,
        },
      })
    )
    app.use(passport.initialize())
    app.use(passport.session())

    await app.listen(process.env.PORT || 3000)
  } catch {
    throw new InternalServerErrorException()
  }
}
bootstrap()

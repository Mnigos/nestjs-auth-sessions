import { Controller, Get, Request, Post, UseGuards } from '@nestjs/common'

import { LocalAuthGuard } from './local-auth.guard'

@Controller('auth')
export class AuthController {
  @UseGuards(LocalAuthGuard)
  @Post('login')
  login(): { success: boolean } {
    return { success: true }
  }

  @Get('logout')
  logout(@Request() request): { success: boolean } {
    request.logout()

    return { success: true }
  }
}

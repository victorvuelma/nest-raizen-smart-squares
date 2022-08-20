import {
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { CustomerAuthGuard } from './guards/auth.guard';
import { AuthService } from './service/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private _authService: AuthService) {}

  @UseGuards(CustomerAuthGuard)
  @Post('customer')
  @HttpCode(HttpStatus.OK)
  async customer(@Request() req) {
    return this._authService.login(req.user);
  }
}

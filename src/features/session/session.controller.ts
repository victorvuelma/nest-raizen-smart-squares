import {
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthenticatedUser } from '../auth/dto/jwt-payload.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { SessionService } from './services/session.service';

@Controller('session')
export class SessionController {
  constructor(private readonly _sessionService: SessionService) {}

  @UseGuards(JwtAuthGuard)
  @Post('start/:bicycleCode')
  @HttpCode(HttpStatus.CREATED)
  getProfile(@Request() req, @Param('bicycleCode') bicycleCode: string) {
    const user = req.user as AuthenticatedUser;

    return this._sessionService.start({
      customerId: user.customerId,
      bicycleCode,
    });
  }
}

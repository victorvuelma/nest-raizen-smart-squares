import {
  Controller,
  Delete,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthenticatedUserDto } from '../auth/dto/authenticated-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { SessionService } from './services/session.service';

@Controller('session')
export class SessionController {
  constructor(private readonly _sessionService: SessionService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/:bicycleCode')
  @HttpCode(HttpStatus.CREATED)
  startSession(@Request() req, @Param('bicycleCode') bicycleCode: string) {
    const user = req.user as AuthenticatedUserDto;

    return this._sessionService.start({
      customerId: user.customerId,
      bicycleCode,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/')
  @HttpCode(HttpStatus.GONE)
  endSession(@Request() req) {
    const user = req.user as AuthenticatedUserDto;

    return this._sessionService.endCustomerSession({
      customerId: user.customerId,
    });
  }
}

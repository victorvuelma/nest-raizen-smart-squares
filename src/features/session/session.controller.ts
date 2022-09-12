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
import { FastifyRequest } from 'fastify';

import { AuthenticatedProfileDto } from '../auth/dto/authenticated-profile.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { SessionService } from './services/session.service';

@Controller('session')
export class SessionController {
  constructor(private readonly _sessionService: SessionService) {}

  @UseGuards(JwtAuthGuard)
  @Post('/:bicycleCode')
  @HttpCode(HttpStatus.CREATED)
  startSession(
    @Request() req: FastifyRequest,
    @Param('bicycleCode') bicycleCode: string,
  ) {
    const user = req['user'] as AuthenticatedProfileDto;

    return this._sessionService.start({
      customerId: user.id,
      bicycleCode,
    });
  }

  @UseGuards(JwtAuthGuard)
  @Delete('/')
  @HttpCode(HttpStatus.GONE)
  endSession(@Request() req: FastifyRequest) {
    const user = req['user'] as AuthenticatedProfileDto;

    return this._sessionService.endCustomerSession({
      customerId: user.id,
    });
  }
}

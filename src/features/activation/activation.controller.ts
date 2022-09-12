import {
  Controller,
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
import { ActivationService } from './services/activation.service';

@Controller('customer')
export class ActivationController {
  constructor(private readonly _activationService: ActivationService) {}

  @UseGuards(JwtAuthGuard)
  @Post('activate/:offerId')
  @HttpCode(HttpStatus.CREATED)
  activateOffer(
    @Request() req: FastifyRequest,
    @Param('offerId') offerId: string,
  ) {
    const customer = req['user'] as AuthenticatedProfileDto;

    return this._activationService.activate({
      customerId: customer.id,
      offerId,
    });
  }
}

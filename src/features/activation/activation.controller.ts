import {
  Controller,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';

import { AuthenticatedUserDto } from '../auth/dto/authenticated-user.dto';
import { JwtAuthGuard } from '../auth/guards/jwt.guard';
import { ActivationService } from './services/activation.service';

@Controller('customer')
export class ActivationController {
  constructor(private readonly _activationService: ActivationService) {}

  @UseGuards(JwtAuthGuard)
  @Post('activate/:offerId')
  @HttpCode(HttpStatus.CREATED)
  getProfile(@Request() req, @Param('offerId') offerId: string) {
    const user = req.user as AuthenticatedUserDto;

    return this._activationService.activate({
      customerId: user.customerId,
      offerId,
    });
  }
}

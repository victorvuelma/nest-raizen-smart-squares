import { Controller, Get } from '@nestjs/common';

import { BicycleService } from './services/bicycle.service';

@Controller('bicycle')
export class BicycleController {
  constructor(private readonly _bicycleService: BicycleService) {}

  @Get('')
  async find() {
    const bicycles = await this._bicycleService.find();

    return bicycles;
  }
}

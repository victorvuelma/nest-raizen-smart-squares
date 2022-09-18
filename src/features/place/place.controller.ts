import { Controller, Get } from '@nestjs/common';

import { PlaceService } from './services/place.service';

@Controller('place')
export class PlaceController {
  constructor(private readonly _placeService: PlaceService) {}

  @Get('')
  async find() {
    const places = await this._placeService.find();

    return places;
  }
}

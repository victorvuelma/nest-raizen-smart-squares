import { Injectable } from '@nestjs/common';

import { PlaceMapper } from '../mappers/place.mapper';
import { PlaceModel } from '../models/place.model';
import { PlaceRepository } from '../repository/place.repository';

@Injectable()
export class PlaceService {
  constructor(
    private _placeMapper: PlaceMapper,
    private _placeRepository: PlaceRepository,
  ) {}

  async find(): Promise<Array<PlaceModel>> {
    const places = await this._placeRepository.find({
      where: { active: true },
    });

    const placeModels = this._placeMapper.mapper.mapArray<PlaceModel>(
      places,
      PlaceModel,
    );

    return placeModels;
  }
}

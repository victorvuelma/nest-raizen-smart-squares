import { createMap } from '@automapper/core';
import { Injectable } from '@nestjs/common';

import { MapperService } from '../../../common/infra/mapper/mapper.service';
import { PlaceModel } from '../models/place.model';

@Injectable()
export class PlaceMapper {
  get mapper() {
    return this._mapperService.mapper;
  }

  constructor(private _mapperService: MapperService) {
    createMap(this._mapperService.mapper, PlaceModel, PlaceModel);
  }
}

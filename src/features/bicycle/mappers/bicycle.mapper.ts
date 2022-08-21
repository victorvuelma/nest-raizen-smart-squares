import { createMap } from '@automapper/core';
import { Injectable } from '@nestjs/common';

import { MapperService } from '../../../common/infra/mapper/mapper.service';
import { BicycleModel } from '../models/bicycle.model';

@Injectable()
export class BicycleMapper {
  get mapper() {
    return this._mapperService.mapper;
  }

  constructor(private _mapperService: MapperService) {
    createMap(this._mapperService.mapper, BicycleModel, BicycleModel);
  }
}

import { createMap } from '@automapper/core';
import { Injectable } from '@nestjs/common';

import { MapperService } from '../../../common/infra/mapper/mapper.service';
import { ActivationModel } from '../models/activation.model';

@Injectable()
export class ActivationMapper {
  get mapper() {
    return this._mapperService.mapper;
  }

  constructor(private _mapperService: MapperService) {
    createMap(this._mapperService.mapper, ActivationModel, ActivationModel);
  }
}

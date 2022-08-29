import { createMap } from '@automapper/core';
import { Injectable } from '@nestjs/common';

import { MapperService } from '../../../common/infra/mapper/mapper.service';
import { SessionModel } from '../models/session.model';
import { SessionDetailModel } from '../models/session-detail.model';

@Injectable()
export class SessionMapper {
  get mapper() {
    return this._mapperService.mapper;
  }

  constructor(private _mapperService: MapperService) {
    createMap(this._mapperService.mapper, SessionModel, SessionModel);

    createMap(
      this._mapperService.mapper,
      SessionDetailModel,
      SessionDetailModel,
    );
  }
}

import { createMap, forMember, fromValue, mapFrom } from '@automapper/core';
import { Injectable } from '@nestjs/common';

import { MapperService } from '../../../common/infra/mapper/mapper.service';
import { PartnerModel } from '../../partner/models/partner.model';
import { OfferModel } from '../models/offer.model';

@Injectable()
export class OfferMapper {
  get mapper() {
    return this._mapperService.mapper;
  }

  constructor(private _mapperService: MapperService) {
    createMap(
      this._mapperService.mapper,
      OfferModel,
      OfferModel,
      forMember(
        (d) => d.partner,
        mapFrom((s) => _mapperService.mapper.map(s.partner, PartnerModel)),
      ),
    );
  }
}

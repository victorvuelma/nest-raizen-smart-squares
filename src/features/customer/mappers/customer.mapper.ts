import { createMap } from '@automapper/core';
import { Injectable } from '@nestjs/common';
import { Customer } from '@prisma/client';

import { MapperService } from '../../../common/infra/mapper/mapper.service';
import { CustomerModel } from '../models/customer.model';

@Injectable()
export class CustomerMapper {
  get mapper() {
    return this._mapperService.mapper;
  }

  constructor(private _mapperService: MapperService) {
    createMap(this._mapperService.mapper, CustomerModel, CustomerModel);
  }
}

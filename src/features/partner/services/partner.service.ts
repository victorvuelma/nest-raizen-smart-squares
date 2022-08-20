import { Injectable } from '@nestjs/common';

import { PartnerMapper } from '../mappers/partner.mapper';
import { PartnerModel } from '../models/partner.model';
import { PartnerRepository } from '../repository/partner.repository';

@Injectable()
export class PartnerService {
  constructor(
    private _partnerMapper: PartnerMapper,
    private _partnerRepository: PartnerRepository,
  ) {}

  async find(): Promise<Array<PartnerModel>> {
    const partners = await this._partnerRepository.find({
      where: { active: true },
    });

    const partnerModels = this._partnerMapper.mapper.mapArray<PartnerModel>(
      partners,
      PartnerModel,
    );

    return partnerModels;
  }
}

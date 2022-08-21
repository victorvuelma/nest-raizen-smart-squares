import { BadRequestException, Injectable } from '@nestjs/common';

import { BicycleMapper } from '../mappers/bicycle.mapper';
import { BicycleModel } from '../models/bicycle.model';
import { BicycleRepository } from '../repository/bicycle.repository';

@Injectable()
export class BicycleService {
  constructor(
    private _bicycleMapper: BicycleMapper,
    private _bicycleRepository: BicycleRepository,
  ) {}

  async get(bicycleId: string): Promise<BicycleModel> {
    const bicycle = await this._bicycleRepository.get({
      id: bicycleId,
    });
    if (!bicycle) {
      throw new BadRequestException('Bicycle not found');
    }

    const bicycleModel = this._bicycleMapper.mapper.map(bicycle, BicycleModel);

    return bicycleModel;
  }

  async fromCode(code: string): Promise<BicycleModel> {
    const bicycle = await this._bicycleRepository.get({
      code: code,
    });
    if (!bicycle) {
      throw new BadRequestException('Bicycle not found');
    }

    const bicycleModel = this._bicycleMapper.mapper.map(bicycle, BicycleModel);

    return bicycleModel;
  }

  async find(): Promise<Array<BicycleModel>> {
    const bicycles = await this._bicycleRepository.find({
      where: { active: true },
    });

    const bicycleModels = this._bicycleMapper.mapper.mapArray<BicycleModel>(
      bicycles,
      BicycleModel,
    );

    return bicycleModels;
  }
}

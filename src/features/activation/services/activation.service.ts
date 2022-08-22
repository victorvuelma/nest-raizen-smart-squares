import { BadRequestException, Injectable } from '@nestjs/common';
import { v4 as uuidV4 } from 'uuid';

import { PrismaService } from '../../../common/infra/database/prisma.service';
import { CustomerRepository } from '../../customer/repository/customer.repository';
import { CustomerService } from '../../customer/services/customer.service';
import { OfferService } from '../../offer/services/offer.service';
import { ActivateOfferDto } from '../dtos/activate-offer.dto';
import { ActivationMapper } from '../mappers/activation.mapper';
import { ActivationModel } from '../models/activation.model';
import { ActivationRepository } from '../repository/activation.repository';
import { ActivationValidator } from '../validators/activation.validator';

@Injectable()
export class ActivationService {
  constructor(
    private _prismaService: PrismaService,
    private _customerService: CustomerService,
    private _customerRepository: CustomerRepository,
    private _offerService: OfferService,
    private _activationMapper: ActivationMapper,
    private _activationRepository: ActivationRepository,
    private _activationValidator: ActivationValidator,
  ) {}

  async activate(data: Partial<ActivateOfferDto>): Promise<ActivationModel> {
    const activate = this._activationValidator.validateActivate(data);

    const customer = await this._customerService.get(activate.customerId);
    const offer = await this._offerService.get(activate.offerId);

    if (customer.points < offer.cost) {
      throw new BadRequestException(
        'Customer doesnt have needed points to activate',
      );
    }

    const code = uuidV4().substring(0, 8).toUpperCase();

    const createActivation = this._activationRepository.create({
      offer: { connect: { id: activate.offerId } },
      customer: { connect: { id: customer.id } },
      code: code,
    });
    const decreaseCustomerPoints = this._customerRepository.update({
      where: { id: customer.id },
      data: { points: { decrement: offer.cost } },
    });

    const [activation] = await this._prismaService.$transaction([
      createActivation,
      decreaseCustomerPoints,
    ]);

    const activationModel = this._activationMapper.mapper.map(
      activation,
      ActivationModel,
    );

    return activationModel;
  }
}

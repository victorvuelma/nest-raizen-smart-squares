import { classes } from '@automapper/classes';
import { createMapper } from '@automapper/core';
import { Injectable } from '@nestjs/common';

@Injectable()
export class MapperService {
  mapper = createMapper({
    strategyInitializer: classes(),
  });
}

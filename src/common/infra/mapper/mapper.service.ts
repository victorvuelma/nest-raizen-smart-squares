import { Injectable } from '@nestjs/common';

import { classes } from '@automapper/classes';
import { createMapper } from '@automapper/core';

@Injectable()
export class MapperService {
  mapper = createMapper({
    strategyInitializer: classes(),
  });
}

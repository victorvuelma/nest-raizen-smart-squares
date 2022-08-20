import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

import { ApiConfigService } from '../api-config/api-config.service';

@Injectable()
export class BcryptService {
  constructor(private _apiConfig: ApiConfigService) {}

  async hash(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, this._apiConfig.bcryptRounds);

    return hash;
  }

  async compare(password: string, hash: string): Promise<boolean> {
    const match = await bcrypt.compare(password, hash);

    return match;
  }
}

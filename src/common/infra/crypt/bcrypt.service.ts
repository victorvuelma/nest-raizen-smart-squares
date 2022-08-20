import { Injectable } from '@nestjs/common';
import * as bcrypt from 'bcrypt';

@Injectable()
export class BcryptService {
  async hash(password: string): Promise<string> {
    const hash = await bcrypt.hash(password, 10);

    return hash;
  }

  async compare(password: string, hash: string): Promise<boolean> {
    const match = await bcrypt.compare(password, hash);

    return match;
  }
}

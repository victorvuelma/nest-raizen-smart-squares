import { Injectable } from '@nestjs/common';

import { SocketIoGateway } from '../../../common/infra/websocket/socketio.gateway';
import { SessionDetailModel } from '../models/session-detail.model';

@Injectable()
export class SessionGateway {
  constructor(private readonly _socketIoGateway: SocketIoGateway) {}

  async notifySessionUpdate(session: SessionDetailModel): Promise<void> {
    this._socketIoGateway.emitTo(session.customerId, 'session-update', {
      cycles: session.cycles,
      potency: session.potency,
      points: session.points,
    });
  }

  async notifySessionClose(session: SessionDetailModel): Promise<void> {
    this._socketIoGateway.emitTo(session.customerId, 'session-close', {
      cycles: session.cycles,
      potency: session.potency,
      points: session.points,
    });
  }
}

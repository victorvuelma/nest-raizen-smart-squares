import { CACHE_MANAGER, Inject } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Cache } from 'cache-manager';
import * as duration from 'duration-fns';
import { Namespace, Socket } from 'socket.io';

import {
  AuthenticatedSocket,
  AuthSocketMiddleware,
} from '../../auth/gateway/auth.middleware';
import { SessionDetailModel } from '../models/session-detail.model';

@WebSocketGateway({
  namespace: '/sessions',
})
export class SessionGateway
  implements
    OnGatewayInit,
    OnGatewayConnection<AuthenticatedSocket>,
    OnGatewayDisconnect<AuthenticatedSocket>
{
  @WebSocketServer()
  private readonly _server!: Namespace;

  constructor(
    @Inject(CACHE_MANAGER) private _cache: Cache,
    private _jwtService: JwtService,
  ) {}

  afterInit(server: Namespace) {
    const authMiddleware = AuthSocketMiddleware(this._jwtService);
    server.use(authMiddleware);
  }

  handleConnection(client: AuthenticatedSocket) {
    this._cache.set(this._customerKey(client.user.customerId), client.id, {
      ttl: duration.toSeconds({ hours: 1 }),
    });
  }

  handleDisconnect(client: AuthenticatedSocket) {
    this._cache.del(this._customerKey(client.user.customerId));
  }

  sendKeepAlive(): void {
    this._server.sockets.forEach((client) => client.emit('keep-alive', true));
  }

  private async getCustomerSocket(
    customerId: string,
  ): Promise<Socket | undefined> {
    const socketId = await this._cache.get<string>(
      this._customerKey(customerId),
    );
    if (!socketId) {
      return undefined;
    }

    return this._server.sockets.get(socketId);
  }

  async notifySessionUpdate(session: SessionDetailModel): Promise<void> {
    const customerSocket = await this.getCustomerSocket(session.customerId);

    customerSocket?.emit('session-update', {
      cycles: session.cycles,
      potency: session.potency,
      points: session.points,
    });
  }

  private _customerKey(customerId: string) {
    return `customer_socket:${customerId}`;
  }
}

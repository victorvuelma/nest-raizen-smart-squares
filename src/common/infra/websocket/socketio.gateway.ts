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
import { Namespace, Server, Socket } from 'socket.io';

import {
  AuthenticatedSocket,
  AuthSocketMiddleware,
} from '../../../features/auth/gateway/auth.middleware';

@WebSocketGateway()
export class SocketIoGateway
  implements
    OnGatewayInit,
    OnGatewayConnection<AuthenticatedSocket>,
    OnGatewayDisconnect<AuthenticatedSocket>
{
  @WebSocketServer()
  private readonly _server!: Server;

  constructor(
    @Inject(CACHE_MANAGER) private _cache: Cache,
    private _jwtService: JwtService,
  ) {}

  afterInit(server: Namespace) {
    const authMiddleware = AuthSocketMiddleware(this._jwtService);
    server.use(authMiddleware);
  }

  handleConnection(client: AuthenticatedSocket) {
    if (!client.connected) {
      return;
    }

    this._cache.set(this._customerKey(client.user.id), client.id, {
      ttl: duration.toSeconds({ hours: 1 }),
    });

    client.join('sessions');
  }

  handleDisconnect(client: AuthenticatedSocket) {
    this._cache.del(this._customerKey(client.user.id));
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

    return this._server.sockets.sockets.get(socketId);
  }

  private _customerKey(customerId: string) {
    return `customer_socket:${customerId}`;
  }

  async emitTo(customerId: string, event: string, args: any) {
    const customerSocket = await this.getCustomerSocket(customerId);

    customerSocket?.emit(event, args);
  }
}

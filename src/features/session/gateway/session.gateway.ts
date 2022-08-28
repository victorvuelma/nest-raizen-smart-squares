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
import { Namespace } from 'socket.io';

import {
  AuthenticatedSocket,
  AuthSocketMiddleware,
} from '../../auth/gateway/auth.middleware';

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
    this._cache.set(this._customerKey(client.user.customerId), client.id);
  }

  handleDisconnect(client: AuthenticatedSocket) {
    this._cache.del(this._customerKey(client.user.customerId));
  }

  sendKeepAlive(): void {
    this._server.sockets.forEach((client) => client.emit('keep-alive', true));
  }

  private _customerKey(customerId: string) {
    return `customer_socket:${customerId}`;
  }
}

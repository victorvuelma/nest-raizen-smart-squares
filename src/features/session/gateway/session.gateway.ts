import { JwtService } from '@nestjs/jwt';
import {
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';

import {
  AuthenticatedSocket,
  AuthSocketMiddleware,
} from '../../auth/middleware/auth.wsmiddleware';

@WebSocketGateway({
  namespace: '/sessions',
})
export class SessionGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server!: Server;

  constructor(private _jwtService: JwtService) {}

  afterInit(server: Server) {
    const authMiddleware = AuthSocketMiddleware(this._jwtService);
    server.use(authMiddleware);
  }

  handleWatch(client: AuthenticatedSocket) {
    throw new Error('Method not implemented.');
  }

  handleDisconnect(client: AuthenticatedSocket) {
    throw new Error('Method not implemented.');
  }
}

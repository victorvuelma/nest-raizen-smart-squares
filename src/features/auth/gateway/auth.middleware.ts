import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';

import { AuthenticatedUserDto } from '../dto/authenticated-user.dto';

export interface AuthenticatedSocket extends Socket {
  user: AuthenticatedUserDto;
}

export type SocketMiddleware = (
  socket: Socket,
  next: (err?: Error) => void,
) => void;

export const AuthSocketMiddleware = (
  jwtService: JwtService,
): SocketMiddleware => {
  return async (socket: Socket, next) => {
    try {
      const jwtToken =
        socket.handshake.auth.jwt ?? socket.handshake.headers['authorization'];

      const authenticatedUser = jwtService.verify(
        jwtToken,
      ) as AuthenticatedUserDto;

      const authSocket = socket as AuthenticatedSocket;
      authSocket.user = authenticatedUser;

      return next();
    } catch (error) {
      next({
        name: 'Unauthorizaed',
        message: 'Failed to authenticated user.',
      });
    }
  };
};

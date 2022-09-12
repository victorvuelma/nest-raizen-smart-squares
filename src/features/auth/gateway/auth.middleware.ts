import { JwtService } from '@nestjs/jwt';
import { Socket } from 'socket.io';

import { AuthenticatedProfileDto } from '../dto/authenticated-profile.dto';
import { AuthenticatedSessionDto } from '../dto/authenticated-session.dto';

export interface AuthenticatedSocket extends Socket {
  user: AuthenticatedProfileDto;
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

      const authenticatedSession = jwtService.verify(
        jwtToken,
      ) as AuthenticatedSessionDto;

      const authSocket = socket as AuthenticatedSocket;
      authSocket.user = authenticatedSession.profile;

      return next();
    } catch (error) {
      next({
        name: 'Unauthorizaed',
        message: 'Failed to authenticated user.',
      });
    }
  };
};

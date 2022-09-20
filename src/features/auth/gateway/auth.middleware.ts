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
  isDevelopment: boolean,
): SocketMiddleware => {
  return async (socket: Socket, next) => {
    const tokenPayload: string | undefined =
      socket.handshake?.auth?.token ??
      (isDevelopment && socket.handshake.headers['authorization']);
    if (!tokenPayload) {
      return next(new Error('Authentication token not provided.'));
    }

    const [method, token] = tokenPayload.split(' ');
    if (method !== 'Bearer') {
      return next(new Error('Invalid authentication method.'));
    }

    try {
      const authenticatedSession = (await jwtService.verifyAsync(
        token,
      )) as AuthenticatedSessionDto;

      const authSocket = socket as AuthenticatedSocket;
      authSocket.user = authenticatedSession.profile;

      return next();
    } catch (error) {
      return next(new Error('Authentication fails.'));
    }
  };
};

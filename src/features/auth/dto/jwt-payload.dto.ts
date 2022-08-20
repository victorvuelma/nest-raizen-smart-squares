export class AuthJwtPayload {
  sub: string;

  username: string;
  email: string;

  name: string;

  constructor(sub: string, username: string, name: string, email: string) {
    this.sub = sub;
    this.username = username;
    this.name = name;
    this.email = email;
  }
}

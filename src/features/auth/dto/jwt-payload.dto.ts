export class AuthenticatedUser {
  sub: string;

  customerId: string;

  username: string;
  email: string;

  name: string;

  constructor(
    sub: string,
    customerId: string,
    username: string,
    email: string,
    name: string,
  ) {
    this.sub = sub;
    this.customerId = customerId;
    this.username = username;
    this.email = email;
    this.name = name;
  }
}

export class CloseSessionDto {
  sessionId: string;

  points: number;

  constructor(sessionId: string, points: number) {
    this.sessionId = sessionId;
    this.points = points;
  }
}

import { createBullBoard } from '@bull-board/api';
import { BullAdapter } from '@bull-board/api/bullAdapter';
import { FastifyAdapter as BullFastifyAdapter } from '@bull-board/fastify';
import { Injectable } from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { Queue } from 'bull';

@Injectable()
export class BullBoardService {
  private _bullboard;

  constructor(_adapter: HttpAdapterHost<FastifyAdapter>) {
    const bullBoardAdapter = new BullFastifyAdapter();

    this._bullboard = createBullBoard({
      queues: [],
      serverAdapter: bullBoardAdapter,
    });
    bullBoardAdapter.setBasePath('/queues/');

    _adapter.httpAdapter.register(bullBoardAdapter.registerPlugin() as any, {
      prefix: '/queues',
      basePath: '',
    });
  }

  addQueue(queue: Queue): void {
    return this._bullboard.addQueue(new BullAdapter(queue));
  }
}

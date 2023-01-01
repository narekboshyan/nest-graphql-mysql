import { Inject, Injectable } from '@nestjs/common';
import { REQUEST } from '@nestjs/core';
import { Request } from 'express';
import { Transaction } from 'sequelize';

export interface IRequest extends Request {
  transaction: Transaction;
}

@Injectable()
export class RequestService {
  req: IRequest;

  constructor(@Inject(REQUEST) private request: any) {
    this.req = request.req;
  }

  getTransaction(): Transaction {
    return this.req.transaction;
  }
}
